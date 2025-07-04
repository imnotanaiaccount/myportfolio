import React from 'react';
import { businessTypes, filterBusinessTypes } from '../data/businessTypes';
// 1. Import Heroicons at the top
import { CheckCircleIcon, ChartBarIcon, RocketLaunchIcon, UserGroupIcon, LockClosedIcon, MagnifyingGlassIcon, PaintBrushIcon, ComputerDesktopIcon, ArrowTrendingUpIcon, StarIcon, ShieldCheckIcon, CurrencyDollarIcon, ShoppingCartIcon, ArrowUpOnSquareIcon, InboxIcon } from '@heroicons/react/24/solid';

export default function Contact() {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState(null);
  const [selectedServices, setSelectedServices] = React.useState([]);
  const [serviceError, setServiceError] = React.useState('');
  const [businessType, setBusinessType] = React.useState('');
  const [businessTypeSuggestions, setBusinessTypeSuggestions] = React.useState([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const debounceTimeout = React.useRef();
  const [validationErrors, setValidationErrors] = React.useState({});
  const [isValidating, setIsValidating] = React.useState(false);

  // 2. Update the services array to use Heroicons instead of emoji
  const services = [
    { name: 'More Sales', icon: <CurrencyDollarIcon className="w-5 h-5" /> },
    { name: 'More Leads', icon: <UserGroupIcon className="w-5 h-5" /> },
    { name: 'Improve Brand Awareness', icon: <ArrowTrendingUpIcon className="w-5 h-5" /> },
    { name: 'Automate My Business', icon: <RocketLaunchIcon className="w-5 h-5" /> },
    { name: 'Improve Customer Experience', icon: <CheckCircleIcon className="w-5 h-5" /> },
    { name: 'Launch a New Product or Service', icon: <PaintBrushIcon className="w-5 h-5" /> },
    { name: 'Grow My Audience', icon: <ChartBarIcon className="w-5 h-5" /> },
    { name: 'Other (Describe Above)', icon: <MagnifyingGlassIcon className="w-5 h-5" /> }
  ];

  // Validation patterns
  const validationPatterns = {
    firstName: { pattern: /^[a-zA-Z\s'-]{2,30}$/, message: 'First name must be 2-30 characters, letters only' },
    lastName: { pattern: /^[a-zA-Z\s'-]{2,30}$/, message: 'Last name must be 2-30 characters, letters only' },
    email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' },
    phone: { pattern: /^[\+]?[1-9][\d]{0,15}$/, message: 'Please enter a valid phone number' },
    company: { pattern: /^[a-zA-Z0-9\s&'-]{0,50}$/, message: 'Company name must be 50 characters or less' },
    description: { pattern: /^[\s\S]{10,1000}$/, message: 'Project description must be 10-1000 characters' }
  };

  const validateField = (name, value) => {
    if (!validationPatterns[name]) return '';
    
    if (name === 'phone' && !value) return ''; // Phone is optional
    if (name === 'company' && !value) return ''; // Company is optional
    
    if (!validationPatterns[name].pattern.test(value)) {
      return validationPatterns[name].message;
    }
    return '';
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Validate required fields
    Object.keys(validationPatterns).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    });

    // Validate services
    if (selectedServices.length === 0) {
      errors.services = 'Please select at least one service';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (name === 'businessType') {
      setBusinessType(value);
      if (value.length > 0) {
        setBusinessTypeSuggestions(filterBusinessTypes(value, 15));
      } else {
        setBusinessTypeSuggestions([]);
      }
    }
  };

  const handleBusinessTypeChange = (e) => {
    const value = e.target.value;
    setBusinessType(value);
    setHighlightedIndex(-1);
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setBusinessTypeSuggestions(filterBusinessTypes(value, 15));
      setShowSuggestions(true);
    }, 120);
  };

  const handleBusinessTypeFocus = () => {
    setBusinessTypeSuggestions(filterBusinessTypes(businessType, 15));
    setShowSuggestions(true);
  };

  const handleBusinessTypeBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100); // allow click
  };

  const handleBusinessTypeKeyDown = (e) => {
    if (!showSuggestions) return;
    if (e.key === 'ArrowDown') {
      setHighlightedIndex(idx => Math.min(idx + 1, businessTypeSuggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex(idx => Math.max(idx - 1, 0));
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && businessTypeSuggestions[highlightedIndex]) {
        setBusinessType(businessTypeSuggestions[highlightedIndex]);
        setShowSuggestions(false);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsValidating(true);
    
    if (!validateForm()) {
      setIsValidating(false);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    setServiceError('');
    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, services: selectedServices, businessType })
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: result.message });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          budget: '',
          description: ''
        });
        setSelectedServices([]); // Clear selected services on successful submission
        setBusinessType('');
        setValidationErrors({});
      } else {
        setSubmitStatus({ type: 'error', message: result.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
      setIsValidating(false);
    }
  };

  const faqs = [
    {
      question: "What is your typical project timeline?",
      answer: "Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications can take 3-6 months. We provide detailed timelines during our initial consultation."
    },
    {
      question: "Do you provide ongoing support after launch?",
      answer: "Yes! We offer comprehensive support packages including maintenance, updates, security monitoring, and 24/7 technical support to ensure your project continues to perform optimally."
    },
    {
      question: "What technologies do you specialize in?",
      answer: "We work with modern technologies including React, Next.js, Node.js, Python, AWS, and more. We choose the best tech stack based on your specific project requirements and goals."
    },
    {
      question: "How do you handle project communication?",
      answer: "We use transparent communication channels including weekly progress reports, regular video calls, and project management tools to keep you informed throughout the development process."
    },
    {
      question: "What is your pricing structure?",
      answer: "We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. Pricing depends on project scope, complexity, and timeline requirements."
    },
    {
      question: "Do you provide hosting and domain services?",
      answer: "Yes, we offer comprehensive hosting solutions with AWS, including domain management, SSL certificates, CDN setup, and performance optimization to ensure your site runs smoothly."
    }
  ];

  const testimonials = [
    {
      name: "Alex Thompson",
      role: "CEO, StartupXYZ",
      content: "Joshua delivered our MVP in record time. The quality exceeded our expectations and we've seen 300% growth in user engagement.",
      rating: 5
    },
    {
      name: "Maria Rodriguez",
      role: "Marketing Director, TechCorp",
      content: "The digital marketing campaign Joshua created increased our leads by 450%. His strategic approach and attention to detail are unmatched.",
      rating: 5
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/10 shadow-xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-riva-blue via-riva-violet to-riva-teal bg-clip-text text-transparent text-center">
          Get in Touch with <span className="font-extrabold">Riva</span>
        </h2>
        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed text-center mb-8">
          Ready to unlock more sales, leads, and brand growth? Book your free strategy call today.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Form fields here, styled with glassmorphism and accent borders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} className="bg-white/20 border border-riva-blue/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:ring-2 focus:ring-riva-blue outline-none" required />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} className="bg-white/20 border border-riva-blue/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:ring-2 focus:ring-riva-blue outline-none" required />
          </div>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="bg-white/20 border border-riva-blue/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:ring-2 focus:ring-riva-blue outline-none w-full" required />
          <textarea name="description" placeholder="Tell us about your project goals, requirements, and timeline..." value={formData.description} onChange={handleInputChange} className="bg-white/20 border border-riva-blue/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:ring-2 focus:ring-riva-blue outline-none w-full" rows={5} required />
          <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-riva-blue via-riva-violet to-riva-teal text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform">Send Message</button>
        </form>
        <div className="mt-10 text-center text-white/80">
          Or email us directly at <a href="mailto:hello@riva.com" className="text-riva-blue underline hover:text-riva-violet transition">hello@riva.com</a>
        </div>
      </div>
    </section>
  );
} 