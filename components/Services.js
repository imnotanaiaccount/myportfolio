import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    {
      title: "Web Development",
      description: "Custom, responsive websites and web applications built with modern technologies.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        "Responsive Design & Mobile Optimization",
        "SEO Optimization & Performance",
        "E-commerce Integration",
        "Content Management Systems",
        "API Development & Integration",
        "Database Design & Management",
        "Security Implementation",
        "Analytics & Tracking Setup"
      ],
      pricing: {
        basic: "$5,000",
        pro: "$12,000",
        enterprise: "Custom"
      },
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS"]
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android platforms.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        "Native iOS & Android Development",
        "Cross-platform React Native Apps",
        "Push Notifications & Analytics",
        "App Store Optimization",
        "Offline Functionality",
        "Biometric Authentication",
        "Real-time Synchronization",
        "Performance Optimization"
      ],
      pricing: {
        basic: "$8,000",
        pro: "$20,000",
        enterprise: "Custom"
      },
      technologies: ["React Native", "Swift", "Kotlin", "Firebase", "AWS", "Flutter"]
    },
    {
      title: "UI/UX Design",
      description: "User-centered design solutions that create engaging and intuitive experiences.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      features: [
        "User Research & Personas",
        "Wireframing & Prototyping",
        "Visual Design & Branding",
        "User Testing & Iteration",
        "Design Systems & Style Guides",
        "Accessibility Compliance",
        "Interactive Prototypes",
        "Design-to-Development Handoff"
      ],
      pricing: {
        basic: "$3,500",
        pro: "$8,000",
        enterprise: "Custom"
      },
      technologies: ["Figma", "Sketch", "Adobe XD", "InVision", "Principle", "Framer"]
    },
    {
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies to grow your online presence and reach.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      features: [
        "Search Engine Optimization (SEO)",
        "Pay-Per-Click Advertising (PPC)",
        "Social Media Marketing",
        "Content Marketing Strategy",
        "Email Marketing Campaigns",
        "Analytics & Performance Tracking",
        "Conversion Rate Optimization",
        "Brand Awareness Campaigns"
      ],
      pricing: {
        basic: "$2,000/month",
        pro: "$5,000/month",
        enterprise: "Custom"
      },
      technologies: ["Google Ads", "Facebook Ads", "Google Analytics", "Mailchimp", "HubSpot", "SEMrush"]
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and DevOps solutions for modern applications.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      features: [
        "AWS/Azure/GCP Infrastructure",
        "Container Orchestration (Kubernetes)",
        "CI/CD Pipeline Setup",
        "Monitoring & Logging",
        "Auto-scaling & Load Balancing",
        "Database Optimization",
        "Security & Compliance",
        "Disaster Recovery Planning"
      ],
      pricing: {
        basic: "$3,000/month",
        pro: "$8,000/month",
        enterprise: "Custom"
      },
      technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "Prometheus"]
    },
    {
      title: "Consulting & Strategy",
      description: "Strategic technology consulting to help your business make informed decisions.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      features: [
        "Technology Stack Assessment",
        "Digital Transformation Strategy",
        "Product Roadmap Planning",
        "Team Structure & Hiring",
        "Performance Optimization",
        "Security Audits",
        "Scalability Planning",
        "Vendor Selection & Management"
      ],
      pricing: {
        basic: "$150/hour",
        pro: "$300/hour",
        enterprise: "Custom"
      },
      technologies: ["Architecture Design", "Project Management", "Agile Methodologies", "Risk Assessment"]
    }
  ];

  const stats = [
    { number: "50+", label: "Projects Completed", icon: "🚀" },
    { number: "100%", label: "Client Satisfaction", icon: "⭐" },
    { number: "10+", label: "Years Experience", icon: "🏆" },
    { number: "24/7", label: "Support Available", icon: "🛡️" },
    { number: "20+", label: "Technologies Mastered", icon: "⚡" },
    { number: "100%", label: "On-time Delivery", icon: "⏰" }
  ];

  return (
    <section id="services" className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-8">
            The <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">AI core</span> behind scalable growth
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
            Digital solutions aren't here to overwhelm you—they're here to work for you. Effortlessly integrate the right tools into your process, supercharging productivity and growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10"
            >
              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-500 text-blue-400">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">{service.description}</p>
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 mr-3 inline-block"></span>
                      <span className="text-sm text-gray-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Pricing Section */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-white/5 rounded-xl">
                      <div className="text-xs font-medium text-gray-400 mb-1">Basic</div>
                      <div className="text-lg font-bold text-blue-400">{service.pricing.basic}</div>
                    </div>
                    <div className="text-center p-3 bg-white/10 rounded-xl">
                      <div className="text-xs font-medium text-gray-400 mb-1">Pro</div>
                      <div className="text-lg font-bold text-purple-400">{service.pricing.pro}</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-xl">
                      <div className="text-xs font-medium text-gray-400 mb-1">Enterprise</div>
                      <div className="text-lg font-bold text-cyan-400">{service.pricing.enterprise}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="text-center mb-20">
          <h3 className="text-3xl md:text-5xl font-black mb-8">
            Proven <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Results</span>
          </h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
            Our track record speaks for itself. Here's what we've achieved for our clients.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-32">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.number}</div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Transform Your Business?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and see how our expertise can help you achieve your goals. Get a free consultation and project estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="#contact" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 border border-white/20 group"
              >
                Get Free Consultation
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a 
                href="#examples" 
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold text-lg rounded-full hover:bg-white/20 transition-all duration-300 group"
              >
                View Our Work
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 