import React, { useEffect, useState } from 'react';
import { 
  Brain, 
  Shield, 
  Code2, 
  Database, 
  Globe, 
  Terminal,
  Github, 
  Linkedin, 
  Mail, 
  Rocket,
  Award,
  BookOpen,
  Download,
  ArrowRight,
  X,
  CloudCog,
  Cpu,
  PenTool,
  Train,
  ExternalLink,
  MapPin,
  Phone
} from 'lucide-react';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const [selectedInternshipDoc, setSelectedInternshipDoc] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const profileImages = [
    '/images/profile/rohit-kumar-profile.png',
    '/images/profile/rf.jpg'
  ];

  // State for redirect modal
  const [redirectModal, setRedirectModal] = useState<{
    show: boolean;
    websiteName: string;
    websiteUrl: string;
  }>({
    show: false,
    websiteName: '',
    websiteUrl: ''
  });

  // State for CV download modal
  const [cvDownloadModal, setCvDownloadModal] = useState(false);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);
  const [formSubmitError, setFormSubmitError] = useState('');

  // Function to handle website redirection
  const handleWebsiteRedirect = (
    websiteName: string, 
    websiteUrl: string, 
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    // Prevent default link behavior
    event.preventDefault();
    event.stopPropagation();

    // Set modal state
    setRedirectModal({
      show: true,
      websiteName,
      websiteUrl
    });

    // Automatically redirect after 15 seconds
    const redirectTimer = setTimeout(() => {
      // Explicitly open the URL
      const newWindow = window.open(websiteUrl, '_blank', 'noopener,noreferrer');
      
      // Fallback mechanism if window.open fails
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // If popup is blocked, try alternative method
        window.location.href = websiteUrl;
      }

      // Reset modal state
      setRedirectModal({ show: false, websiteName: '', websiteUrl: '' });
    }, 15000);

    // Cleanup function to clear timeout if component unmounts
    return () => clearTimeout(redirectTimer);
  };

  // Function to handle CV download
  const handleCvDownload = () => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    
    // Set PDF path
    link.href = '/downloads/rohit-kumar-cv.pdf';
    
    // Set download attributes
    link.setAttribute('download', 'Rohit-Kumar-Professional-CV.pdf');
    
    // Make link invisible
    link.style.display = 'none';
    
    // Append to body
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Remove link from document
    document.body.removeChild(link);

    // Show download modal
    setCvDownloadModal(true);

    // Automatically close modal after 5 seconds
    setTimeout(() => {
      setCvDownloadModal(false);
    }, 5000);
  };

  // Contact Form Handler
  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Google Sheets Submission Handler
  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormSubmitError('');
    setFormSubmitSuccess(false);

    try {
      // Google Apps Script Web App URL
      const GOOGLE_SHEETS_APP_URL = 'https://script.google.com/macros/s/AKfycbxCzKGiXZU-7ArW_1JucPsSbJXM0s0Hr9UsP1QVLzzo_SWk6_YR1BDppeSKtd6lQOqO/exec';
      
      // Create FormData to send data
      const formData = new URLSearchParams();
      formData.append('name', contactForm.name);
      formData.append('email', contactForm.email);
      formData.append('message', contactForm.message);

      // Detailed logging
      console.log('Submitting form data:', {
        name: contactForm.name,
        email: contactForm.email,
        message: contactForm.message
      });

      // Use fetch with proper CORS handling
      const response = await fetch(GOOGLE_SHEETS_APP_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for cross-origin requests
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
      });

      // Since no-cors mode doesn't allow reading the response,
      // we'll assume success if no network error occurs
      setFormSubmitSuccess(true);
      
      // Reset form after submission
      setContactForm({
        name: '',
        email: '',
        message: ''
      });

      // Optional: Show success message
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Form submission error:', error);
      setFormSubmitError('Failed to submit form. Please try again.');
      
      // Optional: Show error message
      alert('Failed to send message. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const ContactForm = () => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      
      // Prevent default behavior that might cause scrolling
      e.preventDefault();
      e.stopPropagation();
      
      // Update form state
      setContactForm(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // Prevent default form submission
      e.stopPropagation(); // Stop event from bubbling up
      
      // Directly call form submission handler
      handleContactFormSubmit(e);
    };

    return (
      <section id="contact" className="py-20 bg-[#0A0F1C]">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto bg-[#121826] p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Contact Me</h2>
            <form 
              onSubmit={handleSubmit} 
              className="space-y-6"
              // Prevent default form behaviors
              onKeyDown={(e) => {
                // Prevent default key behaviors that might cause scrolling
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-[#1E2433] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  // Prevent automatic scrolling on input
                  onFocus={(e) => {
                    e.target.scrollIntoView({ 
                      behavior: 'auto', 
                      block: 'nearest' 
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-[#1E2433] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                  onFocus={(e) => {
                    e.target.scrollIntoView({ 
                      behavior: 'auto', 
                      block: 'nearest' 
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 bg-[#1E2433] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your message..."
                  onFocus={(e) => {
                    e.target.scrollIntoView({ 
                      behavior: 'auto', 
                      block: 'nearest' 
                    });
                  }}
                ></textarea>
              </div>
              {formSubmitError && (
                <div className="text-red-500 text-sm text-center">
                  {formSubmitError}
                </div>
              )}
              {formSubmitSuccess && (
                <div className="text-green-500 text-sm text-center">
                  Message sent successfully!
                </div>
              )}
              <button
                type="submit"
                disabled={formSubmitting}
                className={`
                  w-full 
                  py-3 
                  rounded-lg 
                  text-white 
                  font-semibold 
                  transition-all 
                  duration-300 
                  ${formSubmitting 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  }
                `}
              >
                {formSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % profileImages.length
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(imageInterval);
  }, []);

  const certifications = [
    { 
      title: 'University of Michigan - Python Data Structures', 
      pdfPath: '/certificates/python data-struc.pdf' 
    },
    { 
      title: 'University of Michigan - HTML5', 
      pdfPath: '/certificates/um-html5.pdf' 
    },
    { 
      title: 'IBM - Cybersecurity Tools & Cyber Attacks', 
      pdfPath: '/certificates/ibm-cybersecurity.pdf' 
    },
    { 
      title: 'IBM - Python for Data Science', 
      pdfPath: '/certificates/ibm-python-data-science.pdf' 
    },
    { 
      title: 'Google - Python', 
      pdfPath: '/certificates/google-python.pdf' 
    },
    { 
      title: 'University of Michigan - Python for Everybody', 
      pdfPath: '/certificates/um-python-for-everybody.pdf' 
    },
    { 
      title: 'Google - Data Analytics Professional', 
      pdfPath: '/certificates/google-data-analytics.pdf' 
    },
    { 
      title: 'IBM - Machine Learning Specialist', 
      pdfPath: '/certificates/ibm-machine-learning.pdf' 
    }
  ];

  const internshipDocuments = [
    { 
      title: 'ISRO Internship Documentation', 
      pdfPath: '/certificates/isro-internship-document.pdf'
    }
  ];

  const openCertificateModal = (pdfPath: string) => {
    console.log('Opening Certificate:', pdfPath);
    setSelectedCertificate(pdfPath);
  };

  const closeCertificateModal = () => {
    console.log('Closing Certificate Modal');
    setSelectedCertificate(null);
  };

  const openInternshipDocModal = (pdfPath: string) => {
    setSelectedInternshipDoc(pdfPath);
  };

  const closeInternshipDocModal = () => {
    setSelectedInternshipDoc(null);
  };

  useEffect(() => {
    console.log('Selected Certificate:', selectedCertificate);
  }, [selectedCertificate]);

  const SocialMediaMarketingSection = () => {
    const marketingSlogans = [
      "Results-Driven Digital Marketing | Customized Ads for Maximum Reach",
      "Targeted Advertising That Delivers Real Results", 
      "Expert Digital Marketing | Reaching the Right Audience, Every Time",
      "Maximize Your Brand's Impact with Precision Advertising",
      "Strategic Social Media Marketing for Guaranteed Success"
    ];

    const marketingFeatures = [
      {
        title: 'Customized Ad Campaigns',
        description: 'Tailored strategies for maximum audience engagement',
        icon: <PenTool className="w-10 h-10 text-blue-400" />,
        gradient: 'from-blue-500 to-purple-600'
      },
      {
        title: 'Audience Targeting',
        description: 'Precise targeting based on behavior and demographics',
        icon: <CloudCog className="w-10 h-10 text-green-400" />,
        gradient: 'from-green-500 to-teal-600'
      },
      {
        title: 'Performance Analytics',
        description: 'Comprehensive insights and conversion tracking',
        icon: <Cpu className="w-10 h-10 text-red-400" />,
        gradient: 'from-red-500 to-orange-600'
      }
    ];

    const socialPlatforms = [
      { 
        name: 'Facebook', 
        icon: <Globe className="w-12 h-12 text-blue-600" />,
        color: 'bg-blue-500/10',
        textColor: 'text-blue-400'
      },
      { 
        name: 'Instagram', 
        icon: <Rocket className="w-12 h-12 text-pink-500" />,
        color: 'bg-pink-500/10',
        textColor: 'text-pink-400'
      },
      { 
        name: 'LinkedIn', 
        icon: <Linkedin className="w-12 h-12 text-blue-800" />,
        color: 'bg-blue-500/10',
        textColor: 'text-blue-500'
      },
      { 
        name: 'Twitter/X', 
        icon: <X className="w-12 h-12 text-black" />,
        color: 'bg-gray-500/10',
        textColor: 'text-gray-600'
      }
    ];

    return (
      <section id="digital-marketing" className="py-20 bg-[#0A0F1C] relative overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 
          opacity-50 animate-pulse"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-reverse"></div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold mb-4 
              text-transparent bg-clip-text 
              bg-gradient-to-r from-blue-400 to-purple-600 
              animate-text-shimmer">
              Digital Marketing Mastery
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Transforming Digital Landscapes with Precision, Innovation, and Strategic Insight
            </p>
          </div>

          {/* Marketing Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {marketingFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-3xl opacity-30 group-hover:opacity-50 transition duration-1000 blur-xl"></div>
                
                <div className="relative bg-[#121b2e] p-8 rounded-3xl 
                  border border-blue-500/20 
                  transform transition-all duration-500 
                  group-hover:scale-[1.05] 
                  group-hover:border-blue-500/50">
                  <div className="flex items-center mb-6">
                    <div className={`p-4 rounded-full bg-gradient-to-r ${feature.gradient} mr-6`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Marketing Slogans Carousel */}
          <div className="bg-[#121b2e] rounded-3xl p-12 mb-16 
            border border-blue-500/20 
            relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 
              bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 
              animate-slide"></div>
            
            <h3 className="text-3xl font-bold text-center mb-8 
              text-transparent bg-clip-text 
              bg-gradient-to-r from-blue-400 to-purple-600">
              Marketing Mantras
            </h3>
            
            <div className="space-y-6">
              {marketingSlogans.map((slogan, index) => (
                <div 
                  key={index} 
                  className="bg-[#0A0F1C] p-6 rounded-xl 
                    text-center text-gray-300 
                    hover:bg-blue-900/20 
                    transition-colors 
                    border-l-4 border-blue-500"
                >
                  "{slogan}"
                </div>
              ))}
            </div>
          </div>

          {/* Social Platforms Showcase */}
          <div className="grid md:grid-cols-4 gap-8">
            {socialPlatforms.map((platform, index) => (
              <div 
                key={index} 
                className={`${platform.color} p-8 rounded-3xl 
                  flex flex-col items-center 
                  transform transition-all duration-500 
                  hover:scale-110 
                  hover:shadow-2xl`}
              >
                <div className={`p-4 rounded-full ${platform.color} mb-6`}>
                  {platform.icon}
                </div>
                <span className={`text-xl font-bold ${platform.textColor}`}>
                  {platform.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-[#0A0F1C]/90 backdrop-blur-sm z-50 border-b border-blue-500/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded blur opacity-20 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative">
                <span className="text-blue-400">{'<'}</span>
                RK
                <span className="text-blue-400">{'/>'}</span>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="hover:text-blue-400 transition-all duration-300 hover:scale-105">About</a>
              <a href="#expertise" className="hover:text-blue-400 transition-all duration-300 hover:scale-105">Expertise</a>
              <a href="#experience" className="hover:text-blue-400 transition-all duration-300 hover:scale-105">Experience</a>
              <a href="#projects" className="hover:text-blue-400 transition-all duration-300 hover:scale-105">Projects</a>
              <a href="#contact" className="hover:text-blue-400 transition-all duration-300 hover:scale-105">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Original Profile Section */}
      <section className="min-h-screen relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 pt-32 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              {/* Profile Image */}
              <div className="flex justify-center md:justify-end">
                <div className="relative w-80 h-80">
                  <div className="absolute inset-[-6px] bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
                  <div className="relative z-10 w-full h-full bg-[#0A0F1C] rounded-full p-1">
                    <img 
                      key={currentImageIndex}
                      src={profileImages[currentImageIndex]} 
                      alt="Rohit Kumar - Founder of Viper Imagination"
                      className="w-full h-full object-cover object-[center_30%] 
                      rounded-full 
                      transform transition-all duration-500 
                      animate-fade-in
                      hover:scale-105 
                      hover:brightness-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 
                    opacity-0 hover:opacity-100 
                    transition-opacity duration-300 
                    rounded-full 
                    flex items-end justify-center 
                    p-4 text-white text-sm text-center">
                    Rohit Kumar
                  </div>
                </div>
              </div>

              {/* Hero Content */}
              <div className="flex flex-col justify-center space-y-6 text-center md:text-left">
                <div className="mb-6 overflow-hidden">
                  <h1 className={`text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text transition-all duration-1000 transform ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                  }`}>
                    Rohit Kumar
                  </h1>
                </div>
                <div className={`transition-all duration-1000 delay-500 transform ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}>
                  <p className="text-xl text-blue-300 mb-4">AI & Machine Learning Engineer</p>
                  <p className="text-lg text-gray-400 mb-8 max-w-2xl">
                    Crafting intelligent solutions at the intersection of AI, Machine Learning, 
                    and Cybersecurity. Turning complex problems into elegant solutions.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <a 
                      href="#contact" 
                      className="group relative px-8 py-3 rounded-lg font-medium overflow-hidden"
                    >
                      <div className="absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-blue-600 to-cyan-500"></div>
                      <div className="relative flex items-center gap-2">
                        Get in Touch
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </a>
                    <a 
                      href="#" 
                      onClick={handleCvDownload}
                      className="group px-8 py-3 rounded-lg font-medium border border-blue-400/30 hover:border-blue-400 transition-all duration-300 flex items-center gap-2"
                    >
                      Download CV
                      <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Introduction Card Section */}
      <section className="py-20 bg-[#0A0F1C] flex items-center justify-center">
        <div className="w-full max-w-4xl px-6">
          <div className="relative bg-gradient-to-br from-[#121b2e] to-[#0A0F1C] 
            rounded-3xl border border-blue-500/20 
            shadow-2xl overflow-hidden 
            transform transition-all duration-500 
            hover:scale-[1.02] hover:shadow-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 opacity-50 pointer-events-none"></div>
            
            <div className="relative z-10 p-12 text-center">
              <div className="mb-8">
                <h1 className="text-5xl font-bold mb-4 
                  bg-gradient-to-r from-blue-400 to-cyan-300 
                  text-transparent bg-clip-text">
                  Rohit Kumar
                </h1>
                <h2 className="text-3xl text-gray-400 mb-2">
                  Known as Vishkarnraj
                </h2>
                <p className="text-xl text-gray-500 mb-6">
                  Founder & Creative Director at 
                  <span className="ml-2 font-bold 
                    bg-gradient-to-r from-blue-400 to-cyan-300 
                    text-transparent bg-clip-text">
                    Viper Imagination
                  </span>
                </p>
              </div>

              <div className="flex justify-center space-x-6 mb-8">
                <div className="bg-blue-500/10 p-4 rounded-xl hover:bg-blue-500/20 transition-colors">
                  <Code2 className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <span className="text-gray-300">Technology</span>
                </div>
                <div className="bg-cyan-500/10 p-4 rounded-xl hover:bg-cyan-500/20 transition-colors">
                  <PenTool className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                  <span className="text-gray-300">Design</span>
                </div>
                <div className="bg-purple-500/10 p-4 rounded-xl hover:bg-purple-500/20 transition-colors">
                  <Cpu className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <span className="text-gray-300">Innovation</span>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  Innovative technologist and creative problem solver passionate about pushing 
                  the boundaries of technology and design. Dedicated to transforming complex 
                  challenges into elegant, impactful solutions that drive meaningful progress.
                </p>
              </div>

              <div className="flex justify-center space-x-4">
                <a 
                  href="https://linkedin.com/in/rohitkumar-vishkarnraj" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-3 rounded-full 
                    bg-gradient-to-r from-blue-600 to-cyan-500 
                    text-white font-semibold
                    hover:from-blue-700 hover:to-cyan-600
                    transition-all duration-300
                    flex items-center space-x-2"
                >
                  <Linkedin className="w-5 h-5" /> Connect on LinkedIn
                </a>
                <a 
                  href="mailto:contact@viperdimension.com"
                  className="px-8 py-3 rounded-full 
                    border border-blue-400/30 
                    text-blue-300
                    hover:bg-blue-500/10
                    transition-all duration-300
                    flex items-center space-x-2"
                >
                  <Mail className="w-5 h-5" /> Send Email
                </a>
              </div>
            </div>

            {/* Decorative Elements */}
            <div 
              className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full 
              transform -translate-x-1/2 -translate-y-1/2 
              animate-pulse"
            ></div>
            <div 
              className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full 
              transform translate-x-1/2 translate-y-1/2 
              animate-pulse"
            ></div>
          </div>
        </div>
      </section>

      {/* Professional Journey Section */}
      <section id="experience" className="py-20 bg-[#0A0F1C] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-transparent opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold mb-16 text-center 
            bg-gradient-to-r from-blue-400 to-cyan-300 
            text-transparent bg-clip-text">
            Professional Journey
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* UIDAI Project */}
            <div className="bg-[#121b2e] rounded-3xl p-8 
              border border-blue-500/20 
              shadow-xl 
              transform transition-all duration-500 
              hover:scale-[1.02] hover:shadow-2xl 
              group">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-blue-300 mb-2 group-hover:text-blue-200 transition-colors">
                    Data Fetch Module Developer
                  </h3>
                  <p className="text-lg text-gray-400 mb-1">
                    UIDAI (Unique Identification Authority of India)
                  </p>
                  <p className="text-sm text-gray-500">
                    2022-2023 | Government Project
                  </p>
                </div>
                <div className="opacity-50 group-hover:opacity-100 transition-opacity">
                  <Database className="w-12 h-12 text-blue-400" />
                </div>
              </div>

              <ul className="text-gray-400 space-y-3 mb-6 list-disc list-inside">
                <li>Developed an advanced Data Fetch Module for secure user data retrieval</li>
                <li>Implemented multi-factor authentication using Biometric, Mobile, Aadhaar, and Email</li>
                <li>Ensured robust data security and privacy compliance</li>
              </ul>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm">
                  Data Security
                </span>
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-sm">
                  Authentication
                </span>
                <span className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm">
                  Government Tech
                </span>
              </div>
            </div>

            {/* AWS & Data Analytics */}
            <div className="bg-[#121b2e] rounded-3xl p-8 
              border border-blue-500/20 
              shadow-xl 
              transform transition-all duration-500 
              hover:scale-[1.02] hover:shadow-2xl 
              group">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-blue-300 mb-2 group-hover:text-blue-200 transition-colors">
                    Cloud Data Analytics Specialist
                  </h3>
                  <p className="text-lg text-gray-400 mb-1">
                    AWS Cloud Solutions
                  </p>
                  <p className="text-sm text-gray-500">
                    2021-2022 | Cloud Computing
                  </p>
                </div>
                <div className="opacity-50 group-hover:opacity-100 transition-opacity">
                  <CloudCog className="w-12 h-12 text-cyan-400" />
                </div>
              </div>

              <ul className="text-gray-400 space-y-3 mb-6 list-disc list-inside">
                <li>Specialized in data refining, structuring, and advanced analytics on AWS</li>
                <li>Optimized data processing workflows for maximum efficiency</li>
                <li>Developed scalable cloud-based data solutions</li>
              </ul>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm">
                  AWS
                </span>
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-sm">
                  Data Analytics
                </span>
                <span className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm">
                  Cloud Computing
                </span>
              </div>
            </div>

            {/* Metro Rail Project */}
            <div className="bg-[#121b2e] rounded-3xl p-8 
              border border-blue-500/20 
              shadow-xl 
              transform transition-all duration-500 
              hover:scale-[1.02] hover:shadow-2xl 
              group">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-blue-300 mb-2 group-hover:text-blue-200 transition-colors">
                    Vendor Management System Developer
                  </h3>
                  <p className="text-lg text-gray-400 mb-1">
                    UPMRC (Uttar Pradesh Metro Rail Corporation)
                  </p>
                  <p className="text-sm text-gray-500">
                    2020-2021 | Transportation Technology
                  </p>
                </div>
                <div className="opacity-50 group-hover:opacity-100 transition-opacity">
                  <Train className="w-12 h-12 text-blue-400" />
                </div>
              </div>

              <ul className="text-gray-400 space-y-3 mb-6 list-disc list-inside">
                <li>Designed and implemented a comprehensive Vendor & Transaction Management System</li>
                <li>Automated purchases, sales, and data modification processes</li>
                <li>Significantly improved operational efficiency and workflow management</li>
              </ul>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm">
                  System Automation
                </span>
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-sm">
                  Transaction Management
                </span>
                <span className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm">
                  Enterprise Software
                </span>
              </div>
            </div>

            {/* Robotics & AI Solutions */}
            <div className="bg-[#121b2e] rounded-3xl p-8 
              border border-blue-500/20 
              shadow-xl 
              transform transition-all duration-500 
              hover:scale-[1.02] hover:shadow-2xl 
              group">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-blue-300 mb-2 group-hover:text-blue-200 transition-colors">
                    AI & Robotics Solutions Architect
                  </h3>
                  <p className="text-lg text-gray-400 mb-1">
                    Advanced Technological Solutions
                  </p>
                  <p className="text-sm text-gray-500">
                    2019-2020 | AI & Robotics
                  </p>
                </div>
                <div className="opacity-50 group-hover:opacity-100 transition-opacity">
                  <Cpu className="w-12 h-12 text-purple-400" />
                </div>
              </div>

              <ul className="text-gray-400 space-y-3 mb-6 list-disc list-inside">
                <li>Developed advanced AI models and robotics algorithms</li>
                <li>Created IoT-based automation solutions for real-time problem-solving</li>
                <li>Integrated intelligent systems across various technological domains</li>
              </ul>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm">
                  AI Development
                </span>
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-sm">
                  Robotics
                </span>
                <span className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm">
                  IoT Automation
                </span>
              </div>
            </div>

            {/* Cybersecurity Solutions Specialist */}
            <div className="bg-[#121b2e] rounded-3xl p-8 
              border border-blue-500/20 
              shadow-xl 
              transform transition-all duration-500 
              hover:scale-[1.02] hover:shadow-2xl 
              group">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-blue-300 mb-2 group-hover:text-blue-200 transition-colors">
                    Cybersecurity Solutions Architect
                  </h3>
                  <p className="text-lg text-gray-400 mb-1">
                    Enterprise Security Solutions
                  </p>
                  <p className="text-sm text-gray-500">
                    2022-2023 | Cybersecurity & Data Protection
                  </p>
                </div>
                <div className="opacity-50 group-hover:opacity-100 transition-opacity">
                  <Shield className="w-12 h-12 text-red-400" />
                </div>
              </div>

              <ul className="text-gray-400 space-y-3 mb-6 list-disc list-inside">
                <li>Implemented end-to-end encryption and multi-layer authentication systems</li>
                <li>Developed secure coding practices to prevent cyber threats and data breaches</li>
                <li>Conducted comprehensive security audits and vulnerability assessments</li>
              </ul>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-500/10 text-red-300 rounded-full text-sm">
                  Cybersecurity
                </span>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm">
                  Data Encryption
                </span>
                <span className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm">
                  Threat Prevention
                </span>
              </div>
            </div>

            {/* Full-Stack Development Specialist */}
            <div className="bg-[#121b2e] rounded-3xl p-8 
              border border-blue-500/20 
              shadow-xl 
              transform transition-all duration-500 
              hover:scale-[1.02] hover:shadow-2xl 
              group">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-blue-300 mb-2 group-hover:text-blue-200 transition-colors">
                    Full-Stack Development Expert
                  </h3>
                  <p className="text-lg text-gray-400 mb-1">
                    Enterprise Software Solutions
                  </p>
                  <p className="text-sm text-gray-500">
                    2021-2022 | Web & Mobile Development
                  </p>
                </div>
                <div className="opacity-50 group-hover:opacity-100 transition-opacity">
                  <Code2 className="w-12 h-12 text-green-400" />
                </div>
              </div>

              <ul className="text-gray-400 space-y-3 mb-6 list-disc list-inside">
                <li>Developed highly responsive, feature-rich websites and mobile applications</li>
                <li>Integrated advanced technologies including AI, machine learning, and IoT</li>
                <li>Optimized application performance and user experience across multiple platforms</li>
              </ul>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-500/10 text-green-300 rounded-full text-sm">
                  Full-Stack Development
                </span>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm">
                  AI Integration
                </span>
                <span className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm">
                  Performance Optimization
                </span>
              </div>
            </div>

            {/* Advanced Technology Integration */}
            <div className="bg-[#121b2e] rounded-3xl p-8 
              border border-blue-500/20 
              shadow-xl 
              transform transition-all duration-500 
              hover:scale-[1.02] hover:shadow-2xl 
              group">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-blue-300 mb-2 group-hover:text-blue-200 transition-colors">
                    Technology Integration Specialist
                  </h3>
                  <p className="text-lg text-gray-400 mb-1">
                    Innovative Tech Solutions
                  </p>
                  <p className="text-sm text-gray-500">
                    2020-2021 | Emerging Technologies
                  </p>
                </div>
                <div className="opacity-50 group-hover:opacity-100 transition-opacity">
                  <Cpu className="w-12 h-12 text-cyan-400" />
                </div>
              </div>

              <ul className="text-gray-400 space-y-3 mb-6 list-disc list-inside">
                <li>Pioneered integration of AI, machine learning, cloud computing, and IoT</li>
                <li>Developed automation solutions to enhance software efficiency</li>
                <li>Created scalable, future-ready technological ecosystems</li>
              </ul>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-sm">
                  Technology Integration
                </span>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm">
                  AI & Automation
                </span>
                <span className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm">
                  Emerging Tech
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Marketing Section */}
      <SocialMediaMarketingSection />

      {/* Expertise Section */}
      <section id="expertise" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-transparent"></div>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
            Technical Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Brain className="w-8 h-8 mb-4 text-blue-400" />, 
                title: 'AI & Machine Learning', 
                desc: 'Deep Learning, Neural Networks, Computer Vision' 
              },
              { 
                icon: <Shield className="w-8 h-8 mb-4 text-blue-400" />, 
                title: 'Cybersecurity', 
                desc: 'Network Security, Cryptography, Ethical Hacking' 
              },
              { 
                icon: <Code2 className="w-8 h-8 mb-4 text-blue-400" />, 
                title: 'Programming', 
                desc: 'C, C++, Java, Python, JavaScript' 
              },
              { 
                icon: <Globe className="w-8 h-8 mb-4 text-blue-400" />, 
                title: 'Web Development', 
                desc: 'React, Next.js, Django, Node.js' 
              },
              { 
                icon: <Database className="w-8 h-8 mb-4 text-blue-400" />, 
                title: 'Databases', 
                desc: 'SQL, MongoDB, PostgreSQL' 
              },
              { 
                icon: <Terminal className="w-8 h-8 mb-4 text-blue-400" />, 
                title: 'Tools & Technologies', 
                desc: 'Git, Docker, AWS, Linux' 
              }
            ].map((skill, index) => (
              <div 
                key={index} 
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-[#0A0F1C] p-8 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
                  {skill.icon}
                  <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                  <p className="text-gray-400">{skill.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
            Experience & Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-[#0A0F1C] p-8 rounded-xl border border-blue-500/10 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <Rocket className="w-8 h-8 text-blue-400 mr-3" />
                  <h3 className="text-xl font-bold">ISRO Internship</h3>
                </div>
                <p className="text-blue-300 mb-4">Geoprocessing and Satellite Data Analysis</p>
                <ul className="text-gray-400 space-y-4 flex-grow">
                  <li className="flex items-start group/item hover:text-blue-300 transition-colors">
                    <Code2 className="w-5 h-5 mr-2 mt-1 group-hover/item:text-blue-400" />
                    <span>Developed automated geoprocessing workflows using Python</span>
                  </li>
                  <li className="flex items-start group/item hover:text-blue-300 transition-colors">
                    <Globe className="w-5 h-5 mr-2 mt-1 group-hover/item:text-blue-400" />
                    <span>Implemented advanced satellite data analysis algorithms</span>
                  </li>
                  <li className="flex items-start group/item hover:text-blue-300 transition-colors">
                    <Database className="w-5 h-5 mr-2 mt-1 group-hover/item:text-blue-400" />
                    <span>Created geospatial data visualization tools</span>
                  </li>
                  <li className="flex items-start group/item hover:text-blue-300 transition-colors">
                    <Terminal className="w-5 h-5 mr-2 mt-1 group-hover/item:text-blue-400" />
                    <span>Utilized GIS technologies for spatial analysis</span>
                  </li>
                  <li className="flex items-start group/item hover:text-blue-300 transition-colors">
                    <Brain className="w-5 h-5 mr-2 mt-1 group-hover/item:text-blue-400" />
                    <span>Applied machine learning techniques to satellite imagery</span>
                  </li>
                  <li className="flex items-start group/item hover:text-blue-300 transition-colors">
                    <CloudCog className="w-5 h-5 mr-2 mt-1 group-hover/item:text-blue-400" />
                    <span>Optimized geospatial data processing pipelines for improved efficiency and scalability</span>
                  </li>
                  <li className="flex items-start group/item hover:text-blue-300 transition-colors">
                    <Globe className="w-5 h-5 mr-2 mt-1 group-hover/item:text-blue-400" />
                    <span>Integrated multiple satellite data sources for comprehensive analysis and decision-making</span>
                  </li>
                  <li className="flex items-start group/item hover:text-blue-300 transition-colors">
                    <Code2 className="w-5 h-5 mr-2 mt-1 group-hover/item:text-blue-400" />
                    <span>Developed custom algorithms for feature extraction and object detection in satellite images</span>
                  </li>
                  <li className="flex items-start group/item hover:text-blue-300 transition-colors">
                    <Terminal className="w-5 h-5 mr-2 mt-1 group-hover/item:text-blue-400" />
                    <span>Conducted spatial pattern analysis to derive actionable insights for environmental monitoring</span>
                  </li>
                  <li className="flex items-start group/item hover:text-blue-300 transition-colors">
                    <Brain className="w-5 h-5 mr-2 mt-1 group-hover/item:text-blue-400" />
                    <span>Collaborated with cross-functional teams to deliver real-time geospatial data solutions</span>
                  </li>
                  <li className="flex items-start group/item hover:text-blue-300 transition-colors">
                    <Award className="w-5 h-5 text-blue-400" />
                    <span>Demonstrated expertise in cloud computing platforms (e.g., AWS, Google Cloud) for large-scale satellite data processing</span>
                  </li>
                </ul>
                <div className="mt-6 flex justify-center">
                  <button 
                    onClick={() => openInternshipDocModal(internshipDocuments[0].pdfPath)}
                    className="relative overflow-hidden group/button px-8 py-3 rounded-full 
                      bg-gradient-to-r from-blue-600 to-cyan-500 
                      text-white font-semibold text-sm
                      transform transition-all duration-300 
                      hover:-translate-y-1 hover:shadow-lg
                      flex items-center space-x-2
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    <span className="transition-transform group-hover/button:translate-x-0.5">
                      View Certification
                    </span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover/button:opacity-100 transition-all" />
                  </button>
                </div>
              </div>
            </div>

            {/* Certifications Section */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-[#0A0F1C] p-8 rounded-xl border border-blue-500/10 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <Award className="w-8 h-8 text-blue-400 mr-3" />
                  <h3 className="text-xl font-bold">Certifications</h3>
                </div>
                <ul className="text-gray-400 space-y-4 flex-grow">
                  {certifications.map((cert, index) => (
                    <li 
                      key={index} 
                      className="flex items-center justify-between group/item transition-colors bg-gradient-to-r from-[#0A0F1C] to-[#121b2e] hover:from-[#121b2e] hover:to-[#1a2640] rounded-xl p-4 mb-3 border border-blue-500/10 hover:border-blue-500/30 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <BookOpen className="w-7 h-7 text-blue-500 group-hover/item:text-blue-400 transition-colors transform group-hover/item:scale-110" />
                        <span className="text-gray-300 group-hover/item:text-white text-[15px] font-medium transition-colors">
                          {cert.title}
                        </span>
                      </div>
                      <button 
                        onClick={() => openCertificateModal(cert.pdfPath)}
                        className="relative overflow-hidden group/button px-6 py-2.5 rounded-full 
                          bg-gradient-to-r from-blue-600 to-cyan-500 
                          text-white font-semibold text-sm
                          transform transition-all duration-300 
                          hover:-translate-y-1 hover:shadow-lg
                          flex items-center space-x-2
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      >
                        <span className="transition-transform group-hover/button:translate-x-0.5">
                          Verify Certificate
                        </span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover/button:opacity-100 transition-all" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Digital Creations */}
      <section id="digital-creations" className="py-20 bg-[#0A0F1C] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent opacity-50"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6
              bg-gradient-to-r from-blue-400 to-cyan-300 
              text-transparent bg-clip-text">
              My Digital Creations
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Explore Websites and Digital Solutions I've Crafted
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            {[ 
              { 
                name: "Viper Imagination", 
                link: "https://viperimagination.com/",
                description: "Personal Portfolio and Showcase Platform"
              },
              { 
                name: "Tech Solutions Platform", 
                link: "https://techsolutionsplatform.com/",
                description: "Innovative Technology Solutions Hub"
              },
              { 
                name: "Bite", 
                link: "https://bitetoothpastebits.com/",
                description: "Innovative oral care solution"
              },
              { 
                name: "Zeuss", 
                link: "https://getzeuss.com/",
                description: "Cutting-edge technology platform"
              },
              { 
                name: "Crate&Barrel", 
                link: "https://www.crateandbarrel.com/",
                description: "Premium home furnishings retailer"
              },
              { 
                name: "Allbirds", 
                link: "https://www.allbirds.com/",
                description: "Sustainable footwear brand"
              },
              { 
                name: "Vitra", 
                link: "https://www.vitra.com/en-as/home",
                description: "Design-driven furniture company"
              },
              { 
                name: "AYO", 
                link: "https://goayo.com/",
                description: "Innovative wellness solution"
              },
              { 
                name: "POTION", 
                link: "https://sendpotion.com/",
                description: "Advanced communication platform"
              },
              { 
                name: "NineHertz", 
                link: "https://theninehertz.com/",
                description: "Technology and development services"
              }
            ].map((creation, index) => (
              <div 
                key={index} 
                className="bg-[#121b2e] rounded-3xl p-6 
                  border border-blue-500/20 
                  shadow-xl 
                  transform transition-all duration-500 
                  hover:scale-[1.02] hover:shadow-2xl 
                  flex items-center justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-blue-300 mb-2">
                    {creation.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {creation.description}
                  </p>
                </div>
                <a 
                  href={creation.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(event) => handleWebsiteRedirect(creation.name, creation.link, event)}
                  className="inline-flex items-center px-6 py-2 
                  bg-gradient-to-r from-blue-500 to-cyan-500 
                  text-white font-bold rounded-full 
                  hover:from-blue-600 hover:to-cyan-600 
                  transition-all duration-300 
                  transform hover:scale-105"
                >
                  <ExternalLink className="mr-2 w-4 h-4" /> Visit
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Hire Me Section */}
      <section id="hire-me" className="py-20 bg-[#0A0F1C] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent opacity-50"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6
              bg-gradient-to-r from-blue-400 to-cyan-300 
              text-transparent bg-clip-text">
              Why Hire Me?
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Transform Your Tech Vision into Cutting-Edge Reality
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Expertise Card 1 */}
            <div className="bg-[#121b2e] rounded-3xl p-8 
              border border-blue-500/20 
              shadow-xl 
              transform transition-all duration-500 
              hover:scale-105 hover:shadow-2xl 
              group">
              <div className="text-center">
                <Code2 className="mx-auto w-16 h-16 text-blue-400 mb-6 opacity-70 group-hover:opacity-100 transition-all" />
                <h3 className="text-2xl font-bold text-blue-300 mb-4">
                  Complex Software Mastery
                </h3>
                <p className="text-gray-400 mb-6">
                  Crafting intelligent, high-performance solutions that solve real-world problems efficiently.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm">
                    AI Solutions
                  </span>
                  <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-sm">
                    Performance Optimization
                  </span>
                </div>
              </div>
            </div>

            {/* Expertise Card 2 */}
            <div className="bg-[#121b2e] rounded-3xl p-8 
              border border-blue-500/20 
              shadow-xl 
              transform transition-all duration-500 
              hover:scale-105 hover:shadow-2xl 
              group">
              <div className="text-center">
                <Shield className="mx-auto w-16 h-16 text-red-400 mb-6 opacity-70 group-hover:opacity-100 transition-all" />
                <h3 className="text-2xl font-bold text-blue-300 mb-4">
                  Uncompromising Cybersecurity
                </h3>
                <p className="text-gray-400 mb-6">
                  Implementing state-of-the-art encryption and protection techniques to safeguard your digital assets.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-red-500/10 text-red-300 rounded-full text-sm">
                    Data Encryption
                  </span>
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm">
                    Threat Prevention
                  </span>
                </div>
              </div>
            </div>

            {/* Expertise Card 3 */}
            <div className="bg-[#121b2e] rounded-3xl p-8 
              border border-blue-500/20 
              shadow-xl 
              transform transition-all duration-500 
              hover:scale-105 hover:shadow-2xl 
              group">
              <div className="text-center">
                <Cpu className="mx-auto w-16 h-16 text-purple-400 mb-6 opacity-70 group-hover:opacity-100 transition-all" />
                <h3 className="text-2xl font-bold text-blue-300 mb-4">
                  Future-Ready Innovation
                </h3>
                <p className="text-gray-400 mb-6">
                  Integrating AI, automation, IoT, and cloud computing to drive technological advancement.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-green-500/10 text-green-300 rounded-full text-sm">
                    Emerging Tech
                  </span>
                  <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-sm">
                    Tech Integration
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Whether you're a startup, enterprise, or government institution, I transform tech challenges into success stories.
            </p>
            <a 
              href="mailto:contact@viperdimension.com" 
              className="inline-flex items-center px-8 py-4 
              bg-gradient-to-r from-blue-500 to-cyan-500 
              text-white font-bold rounded-full 
              hover:from-blue-600 hover:to-cyan-600 
              transition-all duration-300 
              transform hover:scale-105 
              hover:shadow-xl"
            >
              <Mail className="mr-3 w-5 h-5" /> Let's Build Something Extraordinary
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'AI-Powered Image Recognition',
                desc: 'Deep learning model for real-time object detection and classification',
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800',
                tags: ['Python', 'TensorFlow', 'OpenCV']
              },
              {
                title: 'Cybersecurity Analysis Tool',
                desc: 'Network security monitoring and threat detection system',
                image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
                tags: ['Python', 'Java', 'Network Security']
              }
            ].map((project, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/80 to-transparent p-8 flex flex-col justify-end transform">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section id="contact" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#121b2e] rounded-3xl p-8 
              border border-blue-500/20 
              shadow-xl 
              transform transition-all duration-500 
              hover:scale-[1.02] hover:shadow-2xl">
              <div className="flex items-center mb-6">
                <MapPin className="w-12 h-12 text-blue-400 mr-4" />
                <div>
                  <h3 className="text-xl font-bold text-blue-300">Address</h3>
                  <p className="text-gray-400">Jhansi, Uttar Pradesh, India 284002</p>
                </div>
              </div>
            </div>

            <div className="bg-[#121b2e] rounded-3xl p-8 
              border border-blue-500/20 
              shadow-xl 
              transform transition-all duration-500 
              hover:scale-[1.02] hover:shadow-2xl">
              <div className="flex items-center mb-6">
                <Phone className="w-12 h-12 text-green-400 mr-4" />
                <div>
                  <h3 className="text-xl font-bold text-green-300">Contact Numbers</h3>
                  <p className="text-gray-400">+91 9305996556</p>
                  <p className="text-gray-400">+91 8318342490</p>
                </div>
              </div>
            </div>

            <div className="bg-[#121b2e] rounded-3xl p-8 
              border border-blue-500/20 
              shadow-xl 
              transform transition-all duration-500 
              hover:scale-[1.02] hover:shadow-2xl">
              <div className="flex items-center mb-6">
                <Mail className="w-12 h-12 text-red-400 mr-4" />
                <div>
                  <h3 className="text-xl font-bold text-red-300">Email Address</h3>
                  <p className="text-gray-400">rk28198@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative bg-[#0A0F1C] rounded-2xl border-2 border-blue-500/30 w-[95%] max-w-5xl h-[95%] max-h-[900px] overflow-hidden flex flex-col shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 opacity-50 pointer-events-none"></div>
            
            <div className="relative z-10 p-12 text-center">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-blue-300 mb-4">
                  Certificate Verification
                </h2>
              </div>
              <div className="flex-grow relative overflow-hidden">
                <iframe 
                  src={selectedCertificate} 
                  className="w-full h-full"
                  title="Certificate"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    filter: 'contrast(1) brightness(1)'
                  }}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-70"></div>
            </div>
          </div>
        </div>
      )}

      {/* Internship Document Modal */}
      {selectedInternshipDoc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative bg-[#0A0F1C] rounded-2xl border-2 border-blue-500/30 w-[95%] max-w-5xl h-[95%] max-h-[900px] overflow-hidden flex flex-col shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 opacity-50 pointer-events-none"></div>
            
            <div className="relative z-10 p-12 text-center">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-blue-300 mb-4">
                  ISRO Internship Document
                </h2>
              </div>
              <div className="flex-grow relative overflow-hidden">
                <iframe 
                  src={selectedInternshipDoc} 
                  className="w-full h-full"
                  title="Internship Document"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    filter: 'contrast(1) brightness(1)'
                  }}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-70"></div>
            </div>
          </div>
        </div>
      )}

      {/* CV Download Modal */}
      {cvDownloadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A0F1C] p-8 rounded-2xl max-w-md w-full text-center 
            border border-blue-500/30 shadow-2xl 
            transform transition-all duration-500 
            animate-fade-in relative">
            {/* Close button */}
            <button 
              onClick={() => setCvDownloadModal(false)}
              className="absolute top-4 right-4 bg-red-500/20 text-red-300 p-2 rounded-full 
              hover:bg-red-500/30 transition-colors group"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            </button>

            <div className="flex justify-center mb-6">
              <img 
                src="/images/profile/rohit-kumar-profile.png" 
                alt="Viper Imagination Logo" 
                className="w-24 h-24 rounded-full border-4 border-blue-500/50"
              />
            </div>
            <h2 className="text-2xl font-bold text-blue-300 mb-4">
              CV Downloaded Successfully
            </h2>
            <p className="text-gray-400 mb-6">
              Your CV has been downloaded successfully. 
              Please check your downloads folder for the file.
            </p>
            <div className="flex justify-center items-center space-x-4">
              <div className="animate-pulse text-cyan-500 font-semibold">
                Thank you for your interest!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Redirect Modal */}
      {redirectModal.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A0F1C] p-8 rounded-2xl max-w-md w-full text-center 
            border border-blue-500/30 shadow-2xl 
            transform transition-all duration-500 
            animate-fade-in relative">
            {/* Close button */}
            <button 
              onClick={() => {
                // Open the website immediately if user wants to close early
                window.open(redirectModal.websiteUrl, '_blank', 'noopener,noreferrer');
                setRedirectModal({ show: false, websiteName: '', websiteUrl: '' });
              }}
              className="absolute top-4 right-4 bg-red-500/20 text-red-300 p-2 rounded-full 
              hover:bg-red-500/30 transition-colors group"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            </button>

            <div className="flex justify-center mb-6">
              <img 
                src="/images/profile/rohit-kumar-profile.png" 
                alt="Viper Imagination Logo" 
                className="w-24 h-24 rounded-full border-4 border-blue-500/50"
              />
            </div>
            <h2 className="text-2xl font-bold text-blue-300 mb-4">
              Viper Imagination Secure Redirect
            </h2>
            <p className="text-gray-400 mb-6">
              You are being redirected to {redirectModal.websiteName}, 
              a website developed, secured, and managed by Viper Imagination. 
              We ensure top-notch digital experiences with robust security 
              and performance optimization.
            </p>
            <div className="flex justify-center items-center space-x-4">
              <div className="animate-pulse text-cyan-500 font-semibold">
                Redirecting in 15 seconds...
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;