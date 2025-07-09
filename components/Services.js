import React from 'react';

const Services = () => {
  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Website Design & Development",
      description: "Custom websites that look great and make you money. Built to convert visitors into customers.",
      features: ["Looks Great on All Devices", "Fast Loading", "Easy to Use", "Gets You More Sales"]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      title: "Online Stores",
      description: "Complete online stores that sell your products 24/7. Easy to manage and grow your business.",
      features: ["Secure Payments", "Easy Product Management", "Order Tracking", "Customer Accounts"]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Custom Web Apps",
      description: "Web apps that do exactly what you need. Automate tasks and make your business run smoother.",
      features: ["Custom Features", "User Logins", "Data Management", "Works Everywhere"]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Speed Up Your Site",
      description: "Make your existing website faster and better. Improve user experience and get more sales.",
      features: ["Faster Loading", "Better Rankings", "Smoother Experience", "More Conversions"]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Track Your Success",
      description: "See exactly how your website is performing. Know what's working and what needs improvement.",
      features: ["Visitor Analytics", "Sales Tracking", "User Behavior", "Improvement Tips"]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
        </svg>
      ),
      title: "Ongoing Support",
      description: "Keep your website running smoothly. Updates, security, and help when you need it.",
      features: ["24/7 Monitoring", "Security Updates", "Regular Backups", "Quick Help"]
    }
  ];

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      <div className="container-premium relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass mb-8">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
            <span className="text-sm font-medium text-gray-300">What We Do</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">Services that</span>
            <br />
            <span className="gradient-text-futuristic">grow your business</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From simple websites to complex apps, we build solutions that help your business succeed online.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div key={index} className="group">
              <div className="glass-strong p-8 rounded-3xl h-full transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-blue-400 group-hover:text-purple-400 transition-colors duration-300">
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="glass-strong p-12 rounded-3xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How We Work
            </h3>
            <p className="text-xl text-gray-300">
              Simple process, great results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Talk",
                description: "We discuss your goals and what you want to achieve with your website."
              },
              {
                step: "02",
                title: "Plan",
                description: "We create a clear plan with design ideas, features, and timeline for your project."
              },
              {
                step: "03",
                title: "Build",
                description: "We build your website or app, keeping you updated and making sure you're happy."
              },
              {
                step: "04",
                title: "Launch",
                description: "Your project goes live, and we help you get the most out of it."
              }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{phase.step}</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{phase.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="glass-strong p-12 rounded-3xl max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to get started?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's talk about your project and see how we can help grow your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="#contact" className="btn-apple-primary text-lg px-12 py-6">
                Get Your Free Quote
                <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#portfolio" className="btn-apple-secondary text-lg px-12 py-6">
                See Our Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 