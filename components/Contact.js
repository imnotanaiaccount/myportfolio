import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
    newsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Use Netlify function instead of Next.js API route
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: result.message });
        setFormData({
          name: '',
          email: '',
          projectType: '',
          message: '',
          newsletter: false
        });
      } else {
        setSubmitStatus({ type: 'error', message: result.error || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="container-premium relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            <span className="text-sm font-medium text-gray-300">Get In Touch</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">Ready to</span>
            <br />
            <span className="gradient-text-futuristic">grow your business?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Tell us about your project. We'll get back to you within 24 hours with a custom quote.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Project Type */}
            <div>
              <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                Project Type *
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
                className="w-full"
              >
                <option value="">Select a project type</option>
                <option value="Website">Website</option>
                <option value="Web App">Web App</option>
                <option value="Mobile App">Mobile App</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Branding">Branding</option>
                <option value="Marketing">Marketing</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Project Details *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full"
                placeholder="Describe your project goals, timeline, budget, and any specific requirements..."
              />
            </div>

            {/* Newsletter */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                className="mr-3"
              />
              <label htmlFor="newsletter" className="text-sm text-gray-300">
                Subscribe to our newsletter for tips and updates
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-apple-primary w-full text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>

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