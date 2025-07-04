import React from 'react';
import { motion } from 'framer-motion';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
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
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          budget: '',
          description: ''
        });
      } else {
        setSubmitStatus({ type: 'error', message: result.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
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

  const services = [
    { name: "Web Development", icon: "🌐", description: "Custom websites and web applications" },
    { name: "Mobile Apps", icon: "📱", description: "iOS and Android applications" },
    { name: "UI/UX Design", icon: "🎨", description: "User experience and interface design" },
    { name: "Digital Marketing", icon: "📈", description: "SEO, PPC, and social media marketing" },
    { name: "Cloud Solutions", icon: "☁️", description: "AWS, Azure, and DevOps services" },
    { name: "Consulting", icon: "💡", description: "Technology strategy and consulting" }
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

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-black text-facebook dark:text-facebook mb-6 font-nunito"
          >
            Let's Work Together
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-facebook-dark dark:text-dark-text max-w-4xl mx-auto leading-relaxed"
          >
            Ready to transform your business with cutting-edge digital solutions? Let's discuss your project and create something extraordinary together.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/95 dark:bg-dark-card/95 rounded-3xl p-8 shadow-2xl backdrop-blur-md border border-white/30 dark:border-dark-border">
              <h3 className="text-2xl font-bold text-facebook-dark dark:text-dark-text mb-6">Start Your Project</h3>
              
                             <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-facebook-dark dark:text-dark-text mb-2">
                      First Name *
                    </label>
                                         <input
                       type="text"
                       name="firstName"
                       value={formData.firstName}
                       onChange={handleInputChange}
                       required
                       className="w-full px-4 py-3 bg-white/50 dark:bg-dark-card/50 border border-facebook/20 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-facebook dark:focus:ring-facebook transition-all duration-300"
                       placeholder="Your first name"
                     />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-facebook-dark dark:text-dark-text mb-2">
                      Last Name *
                    </label>
                                         <input
                       type="text"
                       name="lastName"
                       value={formData.lastName}
                       onChange={handleInputChange}
                       required
                       className="w-full px-4 py-3 bg-white/50 dark:bg-dark-card/50 border border-facebook/20 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-facebook dark:focus:ring-facebook transition-all duration-300"
                       placeholder="Your last name"
                     />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-facebook-dark dark:text-dark-text mb-2">
                      Email *
                    </label>
                                         <input
                       type="email"
                       name="email"
                       value={formData.email}
                       onChange={handleInputChange}
                       required
                       className="w-full px-4 py-3 bg-white/50 dark:bg-dark-card/50 border border-facebook/20 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-facebook dark:focus:ring-facebook transition-all duration-300"
                       placeholder="your@email.com"
                     />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-facebook-dark dark:text-dark-text mb-2">
                      Phone
                    </label>
                                         <input
                       type="tel"
                       name="phone"
                       value={formData.phone}
                       onChange={handleInputChange}
                       className="w-full px-4 py-3 bg-white/50 dark:bg-dark-card/50 border border-facebook/20 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-facebook dark:focus:ring-facebook transition-all duration-300"
                       placeholder="+1 (555) 123-4567"
                     />
                  </div>
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
                     className="w-full px-4 py-3 bg-white/50 dark:bg-dark-card/50 border border-facebook/20 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-facebook dark:focus:ring-facebook transition-all duration-300"
                     placeholder="Your company name"
                   />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-facebook-dark dark:text-dark-text mb-2">
                    Project Type *
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 dark:bg-dark-card/50 border border-facebook/20 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-facebook dark:focus:ring-facebook transition-all duration-300"
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
                    Project Budget *
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 dark:bg-dark-card/50 border border-facebook/20 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-facebook dark:focus:ring-facebook transition-all duration-300"
                  >
                    <option value="">Select budget range</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k+">$100,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-facebook-dark dark:text-dark-text mb-2">
                    Project Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-dark-card/50 border border-facebook/20 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-facebook dark:focus:ring-facebook transition-all duration-300 resize-none"
                    placeholder="Tell us about your project goals, requirements, and timeline..."
                  ></textarea>
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

                <motion.button 
                  type="submit" 
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full font-bold text-lg py-4 rounded-2xl shadow-xl transition-all duration-300 ${
                    isSubmitting 
                      ? 'bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed' 
                      : 'bg-facebook dark:bg-facebook-darkest text-white hover:shadow-2xl hover:bg-facebook-lighter dark:hover:bg-facebook-dark hover:-translate-y-1'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="bg-white/95 dark:bg-dark-card/95 rounded-3xl p-8 shadow-2xl backdrop-blur-md border border-white/30 dark:border-dark-border">
              <h3 className="text-2xl font-bold text-facebook-dark dark:text-dark-text mb-6">Get In Touch</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="font-semibold text-facebook-dark dark:text-dark-text">Email</p>
                  <a href="mailto:joshhawleyofficial@gmail.com" className="text-facebook hover:text-facebook-lighter dark:hover:text-facebook-lighter transition-colors duration-200">
                    joshhawleyofficial@gmail.com
                  </a>
                </div>
                
                <div>
                  <p className="font-semibold text-facebook-dark dark:text-dark-text">Phone</p>
                  <a href="tel:+16163031433" className="text-facebook hover:text-facebook-lighter dark:hover:text-facebook-lighter transition-colors duration-200">
                    616-303-1433
                  </a>
                </div>
                
                <div>
                  <p className="font-semibold text-facebook-dark dark:text-dark-text">LinkedIn</p>
                  <a href="https://www.linkedin.com/in/thejoshhawley/" target="_blank" rel="noopener" className="text-facebook hover:text-facebook-lighter dark:hover:text-facebook-lighter transition-colors duration-200">
                    @thejoshhawley
                  </a>
                </div>
              </div>
            </div>

            {/* Services Offered */}
            <div className="bg-white/95 dark:bg-dark-card/95 rounded-3xl p-8 shadow-2xl backdrop-blur-md border border-white/30 dark:border-dark-border">
              <h3 className="text-2xl font-bold text-facebook-dark dark:text-dark-text mb-6">Services Offered</h3>
              
              <div className="space-y-4">
                {services.map((service, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-2xl">{service.icon}</div>
                    <div>
                      <div className="font-semibold text-facebook-dark dark:text-dark-text">{service.name}</div>
                      <div className="text-sm text-facebook-dark dark:text-dark-muted">{service.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/95 dark:bg-dark-card/95 rounded-3xl p-8 shadow-2xl backdrop-blur-md border border-white/30 dark:border-dark-border">
              <h3 className="text-2xl font-bold text-facebook-dark dark:text-dark-text mb-6">Why Choose Us</h3>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-facebook/10 dark:bg-facebook-darkest/30 rounded-xl">
                  <div className="text-2xl font-black text-facebook dark:text-facebook">500+</div>
                  <div className="text-sm text-facebook-dark dark:text-dark-text">Projects Completed</div>
                </div>
                <div className="text-center p-4 bg-facebook/10 dark:bg-facebook-darkest/30 rounded-xl">
                  <div className="text-2xl font-black text-facebook dark:text-facebook">98%</div>
                  <div className="text-sm text-facebook-dark dark:text-dark-text">Client Satisfaction</div>
                </div>
                <div className="text-center p-4 bg-facebook/10 dark:bg-facebook-darkest/30 rounded-xl">
                  <div className="text-2xl font-black text-facebook dark:text-facebook">24/7</div>
                  <div className="text-sm text-facebook-dark dark:text-dark-text">Support Available</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-facebook-dark dark:text-dark-text mb-4">Frequently Asked Questions</h3>
            <p className="text-lg text-facebook-dark dark:text-dark-muted">Get answers to common questions about our services and process</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-6 shadow-xl backdrop-blur-md border border-white/30 dark:border-dark-border"
              >
                <h4 className="text-lg font-semibold text-facebook dark:text-facebook mb-3">{faq.question}</h4>
                <p className="text-facebook-dark dark:text-dark-muted leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-facebook-dark dark:text-dark-text mb-12">What Our Clients Say</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 + i * 0.2 }}
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 