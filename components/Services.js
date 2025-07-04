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
    { number: "5+", label: "Years Experience", icon: "🏆" },
    { number: "24/7", label: "Support Available", icon: "🛡️" },
    { number: "20+", label: "Technologies Mastered", icon: "⚡" },
    { number: "100%", label: "On-time Delivery", icon: "⏰" }
  ];

  return (
    <section id="services" className="py-24 bg-facebook-bg dark:bg-dark-bg relative overflow-hidden">
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
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-facebook dark:text-facebook mb-6 font-nunito"
          >
            Our Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-xl md:text-2xl text-facebook-dark dark:text-dark-text max-w-4xl mx-auto leading-relaxed"
          >
            Comprehensive digital solutions that drive <span className="font-bold text-facebook dark:text-facebook">measurable results</span> and <span className="font-bold text-facebook dark:text-facebook">business growth</span>. From concept to deployment, we handle every aspect of your digital transformation.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
              className="text-center p-6 bg-white/80 dark:bg-dark-card/80 rounded-2xl backdrop-blur-sm border border-white/30 dark:border-dark-border shadow-xl"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-2xl font-black text-facebook dark:text-facebook">{stat.number}</div>
              <div className="text-sm font-semibold text-facebook-dark dark:text-dark-text">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="bg-white/90 dark:bg-dark-card/90 rounded-3xl p-8 shadow-2xl backdrop-blur-md border border-white/30 dark:border-dark-border hover:shadow-3xl transition-all duration-300"
            >
              {/* Service Header */}
              <div className="flex items-start gap-6 mb-8">
                <div className="p-4 bg-facebook/10 dark:bg-facebook-darkest/30 rounded-2xl text-facebook dark:text-facebook">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-facebook-dark dark:text-dark-text mb-3">{service.title}</h3>
                  <p className="text-facebook-dark dark:text-dark-muted leading-relaxed">{service.description}</p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-facebook dark:text-facebook mb-4">What's Included:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-facebook dark:bg-facebook rounded-full"></div>
                      <span className="text-sm text-facebook-dark dark:text-dark-text">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-facebook dark:text-facebook mb-4">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech, j) => (
                    <span key={j} className="px-3 py-1 bg-facebook/10 dark:bg-facebook-darkest/30 text-facebook dark:text-facebook rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="border-t border-facebook/20 dark:border-dark-border pt-6">
                <h4 className="text-lg font-semibold text-facebook dark:text-facebook mb-4">Pricing:</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-facebook/5 dark:bg-facebook-darkest/20 rounded-xl">
                    <div className="text-sm font-medium text-facebook-dark dark:text-dark-text">Basic</div>
                    <div className="text-lg font-bold text-facebook dark:text-facebook">{service.pricing.basic}</div>
                  </div>
                  <div className="text-center p-3 bg-facebook/10 dark:bg-facebook-darkest/40 rounded-xl">
                    <div className="text-sm font-medium text-facebook-dark dark:text-dark-text">Pro</div>
                    <div className="text-lg font-bold text-facebook dark:text-facebook">{service.pricing.pro}</div>
                  </div>
                  <div className="text-center p-3 bg-facebook/15 dark:bg-facebook-darkest/60 rounded-xl">
                    <div className="text-sm font-medium text-facebook-dark dark:text-dark-text">Enterprise</div>
                    <div className="text-lg font-bold text-facebook dark:text-facebook">{service.pricing.enterprise}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl font-bold text-facebook-dark dark:text-dark-text mb-6"
          >
            Ready to Transform Your Business?
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-facebook-dark dark:text-dark-muted mb-8 max-w-2xl mx-auto"
          >
            Let's discuss your project requirements and create a custom solution that drives results.
          </motion.p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block px-8 py-4 bg-white/90 dark:bg-neutral-900 text-blue-700 dark:text-blue-200 font-semibold text-lg rounded-xl shadow-md border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Start Your Project
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
} 