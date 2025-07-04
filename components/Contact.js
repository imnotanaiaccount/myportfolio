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
    <section id="contact" className="py-24 bg-facebook-bg dark:bg-dark-bg relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-facebook/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-facebook-light/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-full mx-auto px-4 md:px-8">
        {/* Header */}
        <div
          className="text-center mb-20"
        >
          <h2 
            className="text-5xl md:text-6xl font-black text-blue-600 dark:text-cyan-400 mb-6 font-nunito"
          >
            Get Your Free Growth Strategy Session
          </h2>
          <p 
            className="text-xl md:text-2xl text-facebook-dark dark:text-dark-text max-w-3xl mx-auto leading-relaxed"
          >
            Share your vision and let our experts map out a custom plan to skyrocket your results. <span className='font-bold text-blue-600 dark:text-cyan-400'>No obligation. 100% confidential. Limited spots available.</span>
          </p>
        </div>

        <div className="flex flex-col items-center mb-20">
          {/* Contact Form - Centered and Full Width */}
          <div
            className="w-full max-w-3xl"
          >
            <div className="w-full bg-white/95 dark:bg-dark-card/95 rounded-3xl p-8 shadow-2xl backdrop-blur-md border border-white/30 dark:border-dark-border mx-auto">
              <h3 className="text-2xl font-bold text-blue-600 dark:text-cyan-400 mb-6">Start Your Project</h3>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"/></svg>
                <span className="text-green-600 font-semibold text-sm">100% Privacy & No Spam</span>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* All other fields first */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-facebook-dark dark:text-dark-text mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 bg-white/90 dark:bg-neutral-900 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-blue-900 dark:text-blue-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 text-base ${
                        validationErrors.firstName ? 'border-red-300 dark:border-red-600' : 'border-neutral-200 dark:border-neutral-800'
                      }`}
                      placeholder="Your first name"
                      maxLength={30}
                    />
                    {validationErrors.firstName && (
                      <div className="text-red-600 text-sm mt-1">{validationErrors.firstName}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-facebook-dark dark:text-dark-text mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 bg-white/90 dark:bg-neutral-900 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-blue-900 dark:text-blue-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 text-base ${
                        validationErrors.email ? 'border-red-300 dark:border-red-600' : 'border-neutral-200 dark:border-neutral-800'
                      }`}
                      placeholder="your@email.com"
                      maxLength={100}
                    />
                    {validationErrors.email && (
                      <div className="text-red-600 text-sm mt-1">{validationErrors.email}</div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-facebook-dark dark:text-dark-text mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/90 dark:bg-neutral-900 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-blue-900 dark:text-blue-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 text-base ${
                        validationErrors.phone ? 'border-red-300 dark:border-red-600' : 'border-neutral-200 dark:border-neutral-800'
                      }`}
                      placeholder="+1 (555) 123-4567"
                      maxLength={20}
                    />
                    {validationErrors.phone && (
                      <div className="text-red-600 text-sm mt-1">{validationErrors.phone}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-facebook-dark dark:text-dark-text mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/90 dark:bg-neutral-900 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-blue-900 dark:text-blue-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 text-base ${
                        validationErrors.company ? 'border-red-300 dark:border-red-600' : 'border-neutral-200 dark:border-neutral-800'
                      }`}
                      placeholder="Your company name"
                      maxLength={50}
                    />
                    {validationErrors.company && (
                      <div className="text-red-600 text-sm mt-1">{validationErrors.company}</div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-facebook-dark dark:text-dark-text mb-2">
                      Project Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/90 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-blue-900 dark:text-blue-100 transition-all duration-200 text-base"
                    >
                      <option value="">Select a project type</option>
                      <option value="web-development">Web Development</option>
                      <option value="mobile-app">Mobile App Development</option>
                      <option value="ui-ux-design">UI/UX Design</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="cloud-solutions">Cloud Solutions</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-facebook-dark dark:text-dark-text mb-2">
                      Project Budget <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/90 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-blue-900 dark:text-blue-100 transition-all duration-200 text-base"
                    >
                      <option value="">Select budget range</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k+">$100,000+</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-facebook-dark dark:text-dark-text mb-2">
                    Project Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 bg-white/90 dark:bg-neutral-900 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-blue-900 dark:text-blue-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 resize-none text-base ${
                      validationErrors.description ? 'border-red-300 dark:border-red-600' : 'border-neutral-200 dark:border-neutral-800'
                    }`}
                    placeholder="Tell us about your project goals, requirements, and timeline..."
                    maxLength={1000}
                  ></textarea>
                  {validationErrors.description && (
                    <div className="text-red-600 text-sm mt-1">{validationErrors.description}</div>
                  )}
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {formData.description.length}/1000 characters
                  </div>
                </div>
                {/* Move Service Selection and Business Type to the bottom */}
                {/* Service Selection - Integrated into the form */}
                <div>
                  <label className="block text-sm font-semibold text-facebook-dark dark:text-dark-text mb-2">
                    Which services do you need? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-2">
                    {services.map((service, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setSelectedServices((prev) =>
                            prev.includes(service.name)
                              ? prev.filter((s) => s !== service.name)
                              : [...prev, service.name]
                          );
                          setServiceError('');
                          if (validationErrors.services) {
                            setValidationErrors(prev => ({ ...prev, services: '' }));
                          }
                        }}
                        className={`px-3 sm:px-5 py-2 rounded-full font-semibold border transition-all duration-200 shadow-sm flex items-center gap-1 sm:gap-2 text-sm sm:text-base
                          ${selectedServices.includes(service.name)
                            ? 'bg-blue-600 text-white border-blue-600 scale-105'
                            : 'bg-white dark:bg-neutral-900 text-facebook-dark dark:text-dark-text border-facebook/20 dark:border-dark-border hover:bg-blue-50 dark:hover:bg-blue-900/30'}
                        `}
                        aria-pressed={selectedServices.includes(service.name)}
                        aria-label={service.name}
                      >
                        <span className="text-lg sm:text-xl">{service.icon}</span>
                        {service.name}
                      </button>
                    ))}
                  </div>
                  {(serviceError || validationErrors.services) && (
                    <div className="text-red-600 text-sm font-semibold mb-2">{serviceError || validationErrors.services}</div>
                  )}
                  {selectedServices.length > 0 && (
                    <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                      {selectedServices.map((service, i) => (
                        <span key={i} className="px-2 sm:px-3 py-1 rounded-full bg-blue-600 text-white text-xs sm:text-sm font-semibold">
                          {service}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {/* Business Type Autofill/Autosuggest */}
                <div className="relative z-20">
                  <label className="block text-sm font-semibold text-facebook-dark dark:text-dark-text mb-2">
                    Your Business Type
                  </label>
                  <input
                    type="text"
                    name="businessType"
                    autoComplete="off"
                    value={businessType}
                    onChange={handleBusinessTypeChange}
                    onFocus={handleBusinessTypeFocus}
                    onBlur={handleBusinessTypeBlur}
                    onKeyDown={handleBusinessTypeKeyDown}
                    className="w-full px-4 py-3 bg-white/90 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-blue-900 dark:text-blue-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 text-base"
                    placeholder="e.g. Real Estate, Ecommerce, Artist, etc."
                    aria-autocomplete="list"
                    aria-expanded={showSuggestions}
                    aria-activedescendant={highlightedIndex >= 0 ? `bt-suggestion-${highlightedIndex}` : undefined}
                  />
                  {showSuggestions && (
                    <ul className="absolute z-30 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl mt-1 w-full shadow-lg max-h-60 overflow-y-auto">
                      {businessTypeSuggestions.length > 0 ? (
                        businessTypeSuggestions.map((suggestion, i) => (
                          <li
                            key={i}
                            id={`bt-suggestion-${i}`}
                            className={`px-4 py-3 cursor-pointer select-none text-base ${highlightedIndex === i ? 'bg-blue-100 dark:bg-blue-900/30 font-bold' : ''}`}
                            onMouseDown={() => {
                              setBusinessType(suggestion);
                              setShowSuggestions(false);
                            }}
                            onMouseEnter={() => setHighlightedIndex(i)}
                            aria-selected={highlightedIndex === i}
                          >
                            {suggestion}
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-3 text-gray-500 select-none text-base">No matches found</li>
                      )}
                    </ul>
                  )}
                </div>
                {submitStatus && (
                  <div className={`p-4 rounded-xl text-center ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                      : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                  }`}>
                    {submitStatus.message}
                  </div>
                )}
                <button 
                  type="submit" 
                  disabled={isSubmitting || isValidating}
                  className={`w-full font-semibold text-base sm:text-lg py-4 rounded-xl shadow-md transition-all duration-200 ${
                    isSubmitting || isValidating
                      ? 'bg-gray-300 dark:bg-neutral-800 text-gray-500 cursor-not-allowed' 
                      : 'bg-white/90 dark:bg-neutral-900 text-blue-700 dark:text-blue-200 border border-neutral-200 dark:border-neutral-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : isValidating ? 'Validating...' : 'Get My Free Strategy Session'}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information and Stats - Adjusted Row (removed Services Offered) */}
          <div
            className="w-full max-w-4xl flex flex-col md:flex-row gap-8 mt-12"
          >
            {/* Contact Details */}
            <div className="flex-1 min-w-0 bg-white/95 dark:bg-dark-card/95 rounded-3xl p-8 shadow-2xl backdrop-blur-md border border-white/30 dark:border-dark-border flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold text-facebook-dark dark:text-dark-text mb-6">Get In Touch</h3>
              <div className="space-y-6 w-full">
                <div>
                  <p className="font-semibold text-facebook-dark dark:text-dark-text">Email</p>
                  <a href="mailto:hello@instagrowmedia.com" className="text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-300 font-medium transition-colors duration-150">
                    hello@instagrowmedia.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-facebook-dark dark:text-dark-text">Phone</p>
                  <a href="tel:+16163031433" className="text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-300 font-medium transition-colors duration-150">
                    616-303-1433
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-facebook-dark dark:text-dark-text">Text</p>
                  <a href="sms:+16163031433" className="text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-300 font-medium transition-colors duration-150">
                    616-303-1433
                  </a>
                </div>
              </div>
            </div>
            {/* Quick Stats */}
            <div className="flex-1 min-w-0 bg-white/95 dark:bg-dark-card/95 rounded-3xl p-8 shadow-2xl backdrop-blur-md border border-white/30 dark:border-dark-border flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold text-facebook-dark dark:text-dark-text mb-6">Why Choose Us</h3>
              <div className="space-y-4 w-full">
                <div className="text-center p-4 bg-facebook/10 dark:bg-facebook-darkest/30 rounded-xl">
                  <div className="text-2xl font-black text-facebook dark:text-facebook">500+</div>
                  <div className="text-sm text-facebook-dark dark:text-dark-text">Projects Completed</div>
                </div>
                <div className="text-center p-4 bg-facebook/10 dark:bg-facebook-darkest/30 rounded-xl">
                  <div className="text-2xl font-black text-facebook dark:text-facebook">24/7</div>
                  <div className="text-sm text-facebook-dark dark:text-dark-text">Support Available</div>
                </div>
                <div className="text-center p-4 bg-facebook/10 dark:bg-facebook-darkest/30 rounded-xl">
                  <div className="text-2xl font-black text-facebook dark:text-facebook">10+ Years</div>
                  <div className="text-sm text-facebook-dark dark:text-dark-text">Years of Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value-Driven Sections: Give, Give, Give */}
        <div
          className="mb-20"
        >
          {/* 1. What You Get With Instagrow Media */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-facebook-dark dark:text-dark-text mb-8 text-center">What You Get With Instagrow Media</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-6 shadow-xl border border-white/30 dark:border-dark-border flex flex-col items-center">
                <ChartBarIcon className="w-10 h-10 text-blue-600 mb-3" />
                <div className="font-bold mb-1">Conversion-Optimized Website</div>
                <div className="text-facebook-dark dark:text-dark-muted text-center">Custom design focused on turning visitors into leads and sales.</div>
              </div>
              <div className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-6 shadow-xl border border-white/30 dark:border-dark-border flex flex-col items-center">
                <ChartBarIcon className="w-10 h-10 text-blue-600 mb-3" />
                <div className="font-bold mb-1">Ongoing Analytics & Reports</div>
                <div className="text-facebook-dark dark:text-dark-muted text-center">Track growth, performance, and ROI with clear, actionable insights.</div>
              </div>
              <div className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-6 shadow-xl border border-white/30 dark:border-dark-border flex flex-col items-center">
                <UserGroupIcon className="w-10 h-10 text-blue-600 mb-3" />
                <div className="font-bold mb-1">Dedicated Support & Strategy</div>
                <div className="text-facebook-dark dark:text-dark-muted text-center">Personalized guidance and support from our expert team, every step.</div>
              </div>
              <div className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-6 shadow-xl border border-white/30 dark:border-dark-border flex flex-col items-center">
                <RocketLaunchIcon className="w-10 h-10 text-blue-600 mb-3" />
                <div className="font-bold mb-1">SEO, Speed & Mobile Optimization</div>
                <div className="text-facebook-dark dark:text-dark-muted text-center">Your site loads fast, ranks high, and looks perfect on every device.</div>
              </div>
              <div className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-6 shadow-xl border border-white/30 dark:border-dark-border flex flex-col items-center">
                <ChartBarIcon className="w-10 h-10 text-blue-600 mb-3" />
                <div className="font-bold mb-1">Launch & Growth Roadmap</div>
                <div className="text-facebook-dark dark:text-dark-muted text-center">Clear plan for launch, growth, and ongoing success—no guesswork.</div>
              </div>
              <div className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-6 shadow-xl border border-white/30 dark:border-dark-border flex flex-col items-center">
                <ShieldCheckIcon className="w-10 h-10 text-blue-600 mb-3" />
                <div className="font-bold mb-1">100% Privacy & Security</div>
                <div className="text-facebook-dark dark:text-dark-muted text-center">Your data and ideas are protected—always confidential, always secure.</div>
              </div>
            </div>
          </div>

          {/* 2. Our Proven Process */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-facebook-dark dark:text-dark-text mb-8 text-center">Our Proven Process</h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center">
                <MagnifyingGlassIcon className="w-10 h-10 text-blue-600 mb-2" />
                <div className="font-bold">1. Discovery & Strategy</div>
                <div className="text-facebook-dark dark:text-dark-muted text-center text-sm">We learn your goals, market, and vision to craft a winning plan.</div>
              </div>
              <div className="w-8 h-1 bg-blue-200 dark:bg-blue-900/30 md:rotate-0 rotate-90" />
              <div className="flex flex-col items-center">
                <PaintBrushIcon className="w-10 h-10 text-blue-600 mb-2" />
                <div className="font-bold">2. Design & Prototyping</div>
                <div className="text-facebook-dark dark:text-dark-muted text-center text-sm">Modern, user-focused design—see your vision before we build.</div>
              </div>
              <div className="w-8 h-1 bg-blue-200 dark:bg-blue-900/30 md:rotate-0 rotate-90" />
              <div className="flex flex-col items-center">
                <ComputerDesktopIcon className="w-10 h-10 text-blue-600 mb-2" />
                <div className="font-bold">3. Development & Launch</div>
                <div className="text-facebook-dark dark:text-dark-muted text-center text-sm">Fast, secure, scalable builds—launched with zero stress.</div>
              </div>
              <div className="w-8 h-1 bg-blue-200 dark:bg-blue-900/30 md:rotate-0 rotate-90" />
              <div className="flex flex-col items-center">
                <ChartBarIcon className="w-10 h-10 text-blue-600 mb-2" />
                <div className="font-bold">4. Ongoing Growth & Support</div>
                <div className="text-facebook-dark dark:text-dark-muted text-center text-sm">We’re with you for the long haul—support, updates, and growth.</div>
              </div>
            </div>
          </div>

          {/* 3. Real Results for Real Businesses */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-facebook-dark dark:text-dark-text mb-8 text-center">Real Results for Real Businesses</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-6 shadow-xl border border-white/30 dark:border-dark-border flex flex-col items-center">
                <ChartBarIcon className="w-10 h-10 text-blue-600 mb-3" />
                <div className="font-bold mb-1">+312% More Leads</div>
                <div className="text-facebook-dark dark:text-dark-muted text-center">In just 60 days for a real estate firm—measurable, rapid growth.</div>
              </div>
              <div className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-6 shadow-xl border border-white/30 dark:border-dark-border flex flex-col items-center">
                <ShoppingCartIcon className="w-10 h-10 text-blue-600 mb-3" />
                <div className="font-bold mb-1">2x Online Sales</div>
                <div className="text-facebook-dark dark:text-dark-muted text-center">Doubled sales for a local retailer with a new digital strategy.</div>
              </div>
              <div className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-6 shadow-xl border border-white/30 dark:border-dark-border flex flex-col items-center">
                <ArrowTrendingUpIcon className="w-10 h-10 text-blue-600 mb-3" />
                <div className="font-bold mb-1">#1 on Google</div>
                <div className="text-facebook-dark dark:text-dark-muted text-center">Ranked #1 for 7+ keywords—SEO that delivers real results.</div>
              </div>
            </div>
          </div>

          {/* 4. Why Clients Choose Us (Expanded) */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-facebook-dark dark:text-dark-text mb-8 text-center">Why Clients Choose Us</h3>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-6 shadow-xl border border-white/30 dark:border-dark-border flex flex-col items-center">
                <StarIcon className="w-10 h-10 text-blue-600 mb-3" />
                <div className="font-bold mb-1">5-Star Client Reviews</div>
                <div className="text-facebook-dark dark:text-dark-muted text-center">Clients love our work, our process, and our results.</div>
              </div>
              <div className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-6 shadow-xl border border-white/30 dark:border-dark-border flex flex-col items-center">
                <CheckCircleIcon className="w-10 h-10 text-blue-600 mb-3" />
                <div className="font-bold mb-1">100% Satisfaction Guarantee</div>
                <div className="text-facebook-dark dark:text-dark-muted text-center">We’re not happy until you are—guaranteed.</div>
              </div>
              <div className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-6 shadow-xl border border-white/30 dark:border-dark-border flex flex-col items-center">
                <MagnifyingGlassIcon className="w-10 h-10 text-blue-600 mb-3" />
                <div className="font-bold mb-1">Transparent Pricing</div>
                <div className="text-facebook-dark dark:text-dark-muted text-center">No hidden fees, no surprises—just clear, honest pricing.</div>
              </div>
              <div className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-6 shadow-xl border border-white/30 dark:border-dark-border flex flex-col items-center">
                <ArrowUpOnSquareIcon className="w-10 h-10 text-blue-600 mb-3" />
                <div className="font-bold mb-1">Fast Turnaround & Support</div>
                <div className="text-facebook-dark dark:text-dark-muted text-center">Quick delivery and ongoing support, whenever you need us.</div>
              </div>
            </div>
          </div>

          {/* 5. Free Resources & Insights */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-facebook-dark dark:text-dark-text mb-8 text-center">Free Resources & Insights</h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
              <div className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-6 shadow-xl border border-white/30 dark:border-dark-border flex-1 flex flex-col items-center mb-6 md:mb-0">
                <InboxIcon className="w-10 h-10 text-blue-600 mb-3" />
                <div className="font-bold mb-1">Website Growth Checklist</div>
                <div className="text-facebook-dark dark:text-dark-muted text-center mb-3">Download our proven checklist to boost your site’s results.</div>
                <a href="#" className="text-blue-700 dark:text-blue-200 font-semibold underline hover:text-blue-900 dark:hover:text-blue-300">Download Free</a>
              </div>
              <div className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-6 shadow-xl border border-white/30 dark:border-dark-border flex-1 flex flex-col items-center mb-6 md:mb-0">
                <MagnifyingGlassIcon className="w-10 h-10 text-blue-600 mb-3" />
                <div className="font-bold mb-1">Free Homepage Audit</div>
                <div className="text-facebook-dark dark:text-dark-muted text-center mb-3">Get a personalized audit and actionable tips—no strings attached.</div>
                <a href="#" className="text-blue-700 dark:text-blue-200 font-semibold underline hover:text-blue-900 dark:hover:text-blue-300">Request Audit</a>
              </div>
              <div className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-6 shadow-xl border border-white/30 dark:border-dark-border flex-1 flex flex-col items-center">
                <InboxIcon className="w-10 h-10 text-blue-600 mb-3" />
                <div className="font-bold mb-1">Growth Tips Newsletter</div>
                <div className="text-facebook-dark dark:text-dark-muted text-center mb-3">Monthly insights to help you grow—delivered to your inbox.</div>
                <a href="#" className="text-blue-700 dark:text-blue-200 font-semibold underline hover:text-blue-900 dark:hover:text-blue-300">Subscribe Free</a>
              </div>
            </div>
          </div>

          {/* 6. Still Have Questions? */}
          <div className="mb-8 text-center">
            <h3 className="text-3xl font-bold text-facebook-dark dark:text-dark-text mb-4">Still Have Questions?</h3>
            <p className="text-lg text-facebook-dark dark:text-dark-muted mb-6">Not ready to start? Book a free call or chat with our team—no pressure, just value.</p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a href="#" className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 hover:text-white transition-all text-lg">Book a Free Strategy Call</a>
              <a href="#" className="px-8 py-4 rounded-xl bg-white dark:bg-neutral-900 text-blue-700 dark:text-blue-200 border border-blue-600 dark:border-blue-400 font-bold shadow-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all text-lg">Live Chat</a>
              <a href="#faq" className="px-8 py-4 rounded-xl bg-white dark:bg-neutral-900 text-blue-700 dark:text-blue-200 border border-blue-600 dark:border-blue-400 font-bold shadow-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all text-lg">See FAQ</a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-facebook-dark dark:text-dark-text mb-4">Frequently Asked Questions</h3>
            <p className="text-lg text-facebook-dark dark:text-dark-muted">Get answers to common questions about our services and process</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-6 shadow-xl backdrop-blur-md border border-white/30 dark:border-dark-border"
              >
                <h4 className="text-lg font-semibold text-facebook dark:text-facebook mb-3">{faq.question}</h4>
                <p className="text-facebook-dark dark:text-dark-muted leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-facebook-dark dark:text-dark-text mb-12">What Our Clients Say</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-6 shadow-xl backdrop-blur-md border border-white/30 dark:border-dark-border"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-facebook-dark dark:text-dark-text mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-bold text-facebook dark:text-facebook">{testimonial.name}</div>
                  <div className="text-sm text-facebook-dark dark:text-dark-muted">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meet Your Expert (Personal Trust Section) */}
        <div className="mb-20 max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8 bg-white/95 dark:bg-dark-card/95 rounded-3xl p-8 shadow-2xl border border-white/30 dark:border-dark-border">
          <img src="/joshua-h.jpg" alt="Joshua H" className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-blue-600 dark:border-cyan-400" />
          <div>
            <h3 className="text-2xl font-bold text-facebook-dark dark:text-dark-text mb-2">Meet Your Expert</h3>
            <p className="text-lg text-facebook-dark dark:text-dark-muted mb-2">Hi, I'm Joshua H. With 10+ years of experience building high-converting digital solutions, I personally oversee every project to ensure you get real results—no outsourcing, no surprises.</p>
            <p className="text-base text-facebook-light dark:text-dark-muted">My mission: to help you grow with honesty, transparency, and world-class execution. Let's build something amazing together.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 