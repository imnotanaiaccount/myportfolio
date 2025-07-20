import React, { useState, useEffect } from 'react';
import { validateEmail, validatePhone, validateUrl, formatPhoneNumber, formatUrl } from '../utils/validation';

const initialForm = {
  name: '',
  business: '',
  email: '',
  phone: '',
  website: '',
  projectType: '',
  hearAbout: '',
  idealClient: '',
  leadGoal: '',
  message: '',
};

const initialErrors = {
  name: '',
  email: '',
  phone: '',
  website: '',
  projectType: '',
  message: '',
};

const calendlyUrl = 'https://calendly.com/joshhawleyofficial/30min';

const Contact = () => {
  useEffect(() => {
    if (!window.Calendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openCalendly = (e) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: calendlyUrl });
    } else {
      window.open(calendlyUrl, '_blank');
    }
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return validateEmail(value);
      case 'phone':
        return validatePhone(value);
      case 'website':
        return validateUrl(value);
      case 'name':
        return value.trim() ? { isValid: true, message: '' } : { isValid: false, message: 'Name is required' };
      case 'projectType':
        return value ? { isValid: true, message: '' } : { isValid: false, message: 'Please select a project type' };
      case 'message':
        return value.trim() ? { isValid: true, message: '' } : { isValid: false, message: 'Message is required' };
      default:
        return { isValid: true, message: '' };
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = type === 'checkbox' ? checked : value;

    // Apply formatting for specific fields
    if (name === 'phone') {
      processedValue = formatPhoneNumber(value);
    } else if (name === 'website') {
      processedValue = formatUrl(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Real-time validation for email, phone, and website
    if (['email', 'phone', 'website'].includes(name)) {
      const validation = validateField(name, processedValue);
      if (!validation.isValid) {
        setErrors(prev => ({
          ...prev,
          [name]: validation.message
        }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const validation = validateField(name, value);
    
    if (!validation.isValid) {
      setErrors(prev => ({
        ...prev,
        [name]: validation.message
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = { ...initialErrors };
    let isValid = true;

    // Validate required fields
    ['name', 'email', 'projectType', 'message'].forEach(field => {
      const validation = validateField(field, formData[field]);
      if (!validation.isValid) {
        newErrors[field] = validation.message;
        isValid = false;
      }
    });

    // Validate optional fields if they have content
    if (formData.phone) {
      const phoneValidation = validatePhone(formData.phone);
      if (!phoneValidation.isValid) {
        newErrors.phone = phoneValidation.message;
        isValid = false;
      }
    }

    if (formData.website) {
      const urlValidation = validateUrl(formData.website);
      if (!urlValidation.isValid) {
        newErrors.website = urlValidation.message;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Process form data for submission
    const submissionData = {
      ...formData,
      email: formData.email.trim(),
      website: formData.website ? validateUrl(formData.website).url : '',
      phone: formData.phone ? formData.phone.trim() : ''
    };

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });
      const result = await response.json();
      if (response.ok) {
        setSubmitStatus({ type: 'success', message: result.message });
        setFormData(initialForm);
        setErrors(initialErrors);
      } else {
        setSubmitStatus({ type: 'error', message: result.error || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add budget options for enterprise leads
  const BUDGET_OPTIONS = [
    '',
    '<$5,000',
    '$5,000 – $10,000',
    '$10,000 – $25,000',
    '$25,000+',
    'Not sure',
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-black space-bg">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight">
            Contact <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Riva</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed px-4 mb-6">
            Ready to get started or have a question? Reach out below.
          </p>
          <button
            onClick={openCalendly}
            className="btn-apple-leadmagnet-solid text-lg px-8 py-4 mb-4"
            type="button"
          >
            Book a Call Instantly
          </button>
        </div>
        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name (required) */}
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full peer min-h-[48px] ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                placeholder="Your Name *"
                aria-label="Your Name"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            {/* Email (required) */}
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full peer min-h-[48px] ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                placeholder="Email Address *"
                aria-label="Email Address"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            {/* Project Type (required, no floating label) */}
            <div className="relative">
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full peer min-h-[48px] text-gray-400 ${errors.projectType ? 'border-red-500 focus:border-red-500' : ''}`}
                aria-label="Project Type"
              >
                <option value="" disabled>Select a project type *</option>
                <option value="Website">Website</option>
                <option value="Web App">Web App</option>
                <option value="Mobile App">Mobile App</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Branding">Branding</option>
                <option value="Marketing">Marketing</option>
                <option value="Other">Other</option>
              </select>
              {errors.projectType && (
                <p className="text-red-400 text-sm mt-1">{errors.projectType}</p>
              )}
            </div>
            {/* Message (required) */}
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                rows={4}
                className={`w-full peer min-h-[48px] ${errors.message ? 'border-red-500 focus:border-red-500' : ''}`}
                placeholder="Tell us about your project *"
                aria-label="Project Details"
              />
              {errors.message && (
                <p className="text-red-400 text-sm mt-1">{errors.message}</p>
              )}
            </div>
            {/* Optional fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                id="business"
                name="business"
                value={formData.business}
                onChange={handleChange}
                className="w-full peer min-h-[44px]"
                placeholder="Business Name (optional)"
                aria-label="Business Name"
              />
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full peer min-h-[44px] ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="Phone (optional)"
                  aria-label="Phone"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full peer min-h-[44px] ${errors.website ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="Website (optional) - e.g., riva.com"
                  aria-label="Website"
                />
                {errors.website && (
                  <p className="text-red-400 text-sm mt-1">{errors.website}</p>
                )}
              </div>
              <input
                type="text"
                id="idealClient"
                name="idealClient"
                value={formData.idealClient}
                onChange={handleChange}
                className="w-full peer min-h-[44px]"
                placeholder="Describe Your Ideal Client (optional)"
                aria-label="Ideal Client"
              />
              <select
                id="hearAbout"
                name="hearAbout"
                value={formData.hearAbout}
                onChange={handleChange}
                className="w-full peer min-h-[44px] text-gray-400"
                aria-label="How did you hear about us?"
              >
                <option value="" disabled>How did you hear about us? (optional)</option>
                <option value="Referral">Referral</option>
                <option value="Google Search">Google Search</option>
                <option value="Social Media">Social Media</option>
                <option value="Ad">Ad</option>
                <option value="Other">Other</option>
              </select>
              <select
                id="leadGoal"
                name="leadGoal"
                value={formData.leadGoal}
                onChange={handleChange}
                className="w-full peer min-h-[44px] text-gray-400"
                aria-label="Monthly Lead Goal"
              >
                <option value="" disabled>Monthly Lead Goal (optional)</option>
                <option value="1-5">1-5</option>
                <option value="6-15">6-15</option>
                <option value="16-30">16-30</option>
                <option value="31+">31+</option>
              </select>
              {/* Add budget options for enterprise leads */}
              <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                Estimated Budget (optional)
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white mb-4"
              >
                {BUDGET_OPTIONS.map((option, idx) => (
                  <option key={idx} value={option}>{option || 'Select a range'}</option>
                ))}
              </select>
            </div>
            {/* Trust Messaging */}
            <div className="text-center text-xs text-gray-400 mt-2 mb-4">
              We never share your info. Response within 1 business hour.
            </div>
            {/* CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-apple-primary w-full text-lg py-5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
            {/* Satisfaction Guarantee Badge */}
            <div className="flex items-center justify-center mt-4 mb-2">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 font-semibold text-sm shadow-sm">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                100% Satisfaction Guarantee
              </span>
            </div>
            {/* Status Message */}
            {submitStatus && (
              <div className={`p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                  : 'bg-red-500/20 border border-red-500/30 text-red-300'
              }`}>
                {submitStatus.message}
              </div>
            )}
          </form>
        </div>
        {/* Contact Info */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="glass p-6 rounded-2xl">
              <div className="text-2xl font-bold text-white mb-2">24 Hours</div>
              <div className="text-gray-300 text-sm">Response Time</div>
            </div>
            <div className="glass p-6 rounded-2xl">
              <div className="text-2xl font-bold text-white mb-2">Free Quote</div>
              <div className="text-gray-300 text-sm">No Obligation</div>
            </div>
            <div className="glass p-6 rounded-2xl">
              <div className="text-2xl font-bold text-white mb-2">100% Secure</div>
              <div className="text-gray-300 text-sm">Data Protected</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
// Add to styles/globals.css:
// .floating-label { position: absolute; left: 20px; top: 20px; color: #aaa; pointer-events: none; transition: 0.2s; font-size: 16px; }
// .peer:focus ~ .floating-label, .peer:not(:placeholder-shown) ~ .floating-label { top: 2px; left: 16px; font-size: 13px; color: #7dd3fc; } 