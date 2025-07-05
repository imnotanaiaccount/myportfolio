import { useState, useRef } from 'react';
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
      question: "What is your pricing structure?",
      answer: "Our pricing is project-based and depends on complexity, features, and timeline. We provide detailed quotes after understanding your requirements. Most projects range from $5,000 to $50,000+."
    },
    {
      question: "Do you work with international clients?",
      answer: "Absolutely! We work with clients worldwide and have experience with various time zones and cultural considerations. We use modern collaboration tools to ensure smooth communication."
    }
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight">
            Ready to <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Transform</span> Your Business?
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed px-4">
            Let's discuss your project and see how our expertise can help you achieve your goals. Get a free consultation and project estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white">Get Your Free Consultation</h3>
              
              {submitStatus && (
                <div className={`mb-6 p-4 rounded-xl ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-500/20 border border-green-400/50 text-green-300' 
                    : 'bg-red-500/20 border border-red-400/50 text-red-300'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                        validationErrors.firstName ? 'border-red-400' : 'border-white/20'
                      }`}
                      placeholder="John"
                    />
                    {validationErrors.firstName && (
                      <p className="text-red-400 text-xs mt-1">{validationErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                        validationErrors.lastName ? 'border-red-400' : 'border-white/20'
                      }`}
                      placeholder="Doe"
                    />
                    {validationErrors.lastName && (
                      <p className="text-red-400 text-xs mt-1">{validationErrors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                        validationErrors.email ? 'border-red-400' : 'border-white/20'
                      }`}
                      placeholder="john@example.com"
                    />
                    {validationErrors.email && (
                      <p className="text-red-400 text-xs mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                        validationErrors.phone ? 'border-red-400' : 'border-white/20'
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {validationErrors.phone && (
                      <p className="text-red-400 text-xs mt-1">{validationErrors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Company & Business Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company (Optional)</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                        validationErrors.company ? 'border-red-400' : 'border-white/20'
                      }`}
                      placeholder="Your Company"
                    />
                    {validationErrors.company && (
                      <p className="text-red-400 text-xs mt-1">{validationErrors.company}</p>
                    )}
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Business Type</label>
                    <input
                      type="text"
                      value={businessType}
                      onChange={handleBusinessTypeChange}
                      onFocus={handleBusinessTypeFocus}
                      onBlur={handleBusinessTypeBlur}
                      onKeyDown={handleBusinessTypeKeyDown}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="e.g., E-commerce, SaaS, Agency"
                    />
                    {showSuggestions && businessTypeSuggestions.length > 0 && (
                      <div className="absolute z-50 w-full mt-1 bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                        {businessTypeSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            className={`w-full px-4 py-3 text-left text-sm hover:bg-white/10 transition-colors duration-200 ${
                              index === highlightedIndex ? 'bg-white/10' : ''
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
                  <label className="block text-sm font-medium text-gray-300 mb-3 sm:mb-4">What are your main goals? *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {services.map((service, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setSelectedServices(prev => 
                            prev.includes(service.name)
                              ? prev.filter(s => s !== service.name)
                              : [...prev, service.name]
                          );
                          if (serviceError) setServiceError('');
                        }}
                        className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl border transition-all duration-300 text-left ${
                          selectedServices.includes(service.name)
                            ? 'bg-blue-500/20 border-blue-400/50 text-blue-300'
                            : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {service.icon}
                        </div>
                        <span className="text-sm font-medium">{service.name}</span>
                      </button>
                    ))}
                  </div>
                  {validationErrors.services && (
                    <p className="text-red-400 text-xs mt-2">{validationErrors.services}</p>
                  )}
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none ${
                      validationErrors.description ? 'border-red-400' : 'border-white/20'
                    }`}
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                  />
                  {validationErrors.description && (
                    <p className="text-red-400 text-xs mt-1">{validationErrors.description}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Sending...' : 'Get Free Consultation'}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & FAQs */}
          <div className="order-1 lg:order-2 space-y-8 sm:space-y-12">
            {/* Contact Info */}
            <div className="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white">Get in Touch</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <InboxIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email</h4>
                    <p className="text-gray-300">hello@riva.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <StarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Response Time</h4>
                    <p className="text-gray-300">Within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <ShieldCheckIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">100% Confidential</h4>
                    <p className="text-gray-300">Your information is secure</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white">Frequently Asked Questions</h3>
              <div className="space-y-4 sm:space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-white/10 pb-4 sm:pb-6 last:border-b-0">
                    <h4 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">{faq.question}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
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