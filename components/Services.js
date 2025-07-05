import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    {
      title: "Web Development",
      description: "Custom, responsive websites and web applications built with modern technologies.",
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

  return (
    <section id="services" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight">
            The <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">AI core</span> behind scalable growth
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed px-4">
            Digital solutions aren't here to overwhelm you—they're here to work for you. Effortlessly integrate the right tools into your process, supercharging productivity and growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10"
            >
              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500 text-blue-400">
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">{service.title}</h3>
                <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">{service.description}</p>
                <div className="space-y-2 sm:space-y-3">
                  {service.features.slice(0, 4).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 mr-2 sm:mr-3 mt-1.5 sm:mt-2 flex-shrink-0"></span>
                      <span className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Technologies */}
                <div className="mt-6 sm:mt-8">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Pricing */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Starting at</span>
                    <span className="text-lg sm:text-xl font-bold text-white">{service.pricing.basic}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 