import React, { useState, useRef } from 'react';
import { businessTypes, filterBusinessTypes } from '../data/businessTypes';
// 1. Import Heroicons at the top
import { CheckCircleIcon, ChartBarIcon, RocketLaunchIcon, UserGroupIcon, LockClosedIcon, MagnifyingGlassIcon, PaintBrushIcon, ComputerDesktopIcon, ArrowTrendingUpIcon, StarIcon, ShieldCheckIcon, CurrencyDollarIcon, ShoppingCartIcon, ArrowUpOnSquareIcon, InboxIcon } from '@heroicons/react/24/solid';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceError, setServiceError] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [businessTypeSuggestions, setBusinessTypeSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const debounceTimeout = useRef();
  const [validationErrors, setValidationErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);

  // 2. Update the services array to use Heroicons instead of emoji
  const services = [
    { name: 'More Sales', icon: <CurrencyDollarIcon className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: 'More Leads', icon: <UserGroupIcon className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: 'Improve Brand Awareness', icon: <ArrowTrendingUpIcon className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: 'Automate My Business', icon: <RocketLaunchIcon className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: 'Improve Customer Experience', icon: <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: 'Launch a New Product or Service', icon: <PaintBrushIcon className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: 'Grow My Audience', icon: <ChartBarIcon className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: 'Other (Describe Above)', icon: <MagnifyingGlassIcon className="w-4 h-4 sm:w-5 sm:h-5" /> }
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
      answer: "We work with modern technologies including React, Next.js, Node.js, Python, AWS, and more. We choose the best tech stack for each project based on your specific needs and goals."
    },
    {
      question: "How do you handle project communication?",
      answer: "We maintain transparent communication throughout the project with regular updates, progress reports, and dedicated project management tools. You'll always know exactly where your project stands."
    }
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight">
            Ready to <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Get Started?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed px-4">
            Let's discuss your project and create something amazing together. Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-white mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                        validationErrors.firstName 
                          ? 'border-red-400 bg-red-400/10' 
                          : 'border-white/20 bg-white/10 focus:border-blue-400/50 focus:bg-white/15'
                      }`}
                      placeholder="John"
                      required
                    />
                    {validationErrors.firstName && (
                      <p className="text-red-400 text-sm mt-1">{validationErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-white mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                        validationErrors.lastName 
                          ? 'border-red-400 bg-red-400/10' 
                          : 'border-white/20 bg-white/10 focus:border-blue-400/50 focus:bg-white/15'
                      }`}
                      placeholder="Doe"
                      required
                    />
                    {validationErrors.lastName && (
                      <p className="text-red-400 text-sm mt-1">{validationErrors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                        validationErrors.email 
                          ? 'border-red-400 bg-red-400/10' 
                          : 'border-white/20 bg-white/10 focus:border-blue-400/50 focus:bg-white/15'
                      }`}
                      placeholder="john@company.com"
                      required
                    />
                    {validationErrors.email && (
                      <p className="text-red-400 text-sm mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                        validationErrors.phone 
                          ? 'border-red-400 bg-red-400/10' 
                          : 'border-white/20 bg-white/10 focus:border-blue-400/50 focus:bg-white/15'
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {validationErrors.phone && (
                      <p className="text-red-400 text-sm mt-1">{validationErrors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Company and Business Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-white mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                        validationErrors.company 
                          ? 'border-red-400 bg-red-400/10' 
                          : 'border-white/20 bg-white/10 focus:border-blue-400/50 focus:bg-white/15'
                      }`}
                      placeholder="Your Company"
                    />
                    {validationErrors.company && (
                      <p className="text-red-400 text-sm mt-1">{validationErrors.company}</p>
                    )}
                  </div>
                  <div className="relative">
                    <label htmlFor="businessType" className="block text-sm font-semibold text-white mb-2">
                      Business Type
                    </label>
                    <input
                      type="text"
                      id="businessType"
                      value={businessType}
                      onChange={handleBusinessTypeChange}
                      onFocus={handleBusinessTypeFocus}
                      onBlur={handleBusinessTypeBlur}
                      onKeyDown={handleBusinessTypeKeyDown}
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 focus:border-blue-400/50 focus:bg-white/15 transition-all duration-300"
                      placeholder="e.g., E-commerce, SaaS, Agency"
                    />
                    {showSuggestions && businessTypeSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                        {businessTypeSuggestions.map((suggestion, index) => (
                          <button
                            key={suggestion}
                            type="button"
                            className={`w-full px-4 py-3 text-left text-sm transition-colors duration-200 ${
                              index === highlightedIndex 
                                ? 'bg-blue-500/20 text-white' 
                                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                            } ${index === 0 ? 'rounded-t-xl' : ''} ${index === businessTypeSuggestions.length - 1 ? 'rounded-b-xl' : ''}`}
                            onClick={() => {
                              setBusinessType(suggestion);
                              setShowSuggestions(false);
                            }}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Services Selection */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-4">
                    What are you looking to achieve? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {services.map((service) => (
                      <button
                        key={service.name}
                        type="button"
                        onClick={() => {
                          setSelectedServices(prev => 
                            prev.includes(service.name)
                              ? prev.filter(s => s !== service.name)
                              : [...prev, service.name]
                          );
                          if (serviceError) setServiceError('');
                        }}
                        className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl border transition-all duration-300 ${
                          selectedServices.includes(service.name)
                            ? 'border-blue-400/50 bg-blue-400/10 text-white'
                            : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-blue-400">{service.icon}</span>
                        <span className="text-sm font-medium">{service.name}</span>
                      </button>
                    ))}
                  </div>
                  {validationErrors.services && (
                    <p className="text-red-400 text-sm mt-2">{validationErrors.services}</p>
                  )}
                </div>

                {/* Project Details */}
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-white mb-2">
                    Tell us about your project *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 resize-none ${
                      validationErrors.description 
                        ? 'border-red-400 bg-red-400/10' 
                        : 'border-white/20 bg-white/10 focus:border-blue-400/50 focus:bg-white/15'
                    }`}
                    placeholder="Describe your project goals, requirements, and any specific features you need..."
                    required
                  />
                  {validationErrors.description && (
                    <p className="text-red-400 text-sm mt-1">{validationErrors.description}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isValidating}
                  className="btn-apple-primary w-full py-4 text-white font-semibold rounded-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending Message...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus && (
                  <div className={`p-4 rounded-xl border ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-400/10 border-green-400/30 text-green-400' 
                      : 'bg-red-400/10 border-red-400/30 text-red-400'
                  }`}>
                    {submitStatus.message}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Contact Info & FAQs */}
          <div className="order-1 lg:order-2 space-y-8 sm:space-y-12">
            {/* Contact Information */}
            <div className="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
                Get in Touch
              </h3>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <InboxIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Email</h4>
                    <p className="text-gray-300">hello@riva.com</p>
                    <p className="text-sm text-gray-400">We'll respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ShieldCheckIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Secure & Confidential</h4>
                    <p className="text-gray-300">Your information is protected</p>
                    <p className="text-sm text-gray-400">We never share your data</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <StarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Free Consultation</h4>
                    <p className="text-gray-300">No obligation, no pressure</p>
                    <p className="text-sm text-gray-400">Let's discuss your project</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
                Frequently Asked Questions
              </h3>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
                    <h4 className="text-lg font-semibold text-white mb-3">{faq.question}</h4>
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 