const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const socialMediaManager = require('./socialMediaUtils');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Social Media Marketing Routes
app.post('/api/social-media/post', async (req, res) => {
  try {
    const { platform, content } = req.body;
    await socialMediaManager.postToSocialMedia(platform, content);
    res.status(200).json({ message: 'Post successful', platform, content });
  } catch (error) {
    res.status(500).json({ message: 'Failed to post', error: error.message });
  }
});

app.get('/api/social-media/analytics/:platform', async (req, res) => {
  try {
    const { platform } = req.params;
    const analytics = await socialMediaManager.getAnalytics(platform);
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch analytics', error: error.message });
  }
});

// Catch-all route to serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
