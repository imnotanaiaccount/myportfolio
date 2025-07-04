import { motion } from 'framer-motion';
import React from 'react'; // Added missing import for React

export default function Examples() {
  const projects = [
    {
      title: "TechFlow E-commerce Platform",
      category: "E-commerce",
      description: "A <span className='font-bold text-facebook dark:text-facebook'>billion-dollar</span> e-commerce platform that achieved <span className='font-bold text-facebook dark:text-facebook'>340%</span> conversion increase and <span className='font-bold text-facebook dark:text-facebook'>60%</span> cart abandonment reduction.",
      image: "/api/placeholder/600/400",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "AWS", "Tailwind CSS"],
      metrics: {
        conversion: "+340%",
        performance: "98/100",
        users: "50K+",
        revenue: "+$2.5M"
      },
      features: [
        "Advanced product filtering & search",
        "AI-powered recommendations",
        "Real-time inventory management",
        "Multi-payment gateway integration",
        "Advanced analytics dashboard",
        "Mobile-first responsive design"
      ],
      challenge: "The client needed a scalable e-commerce platform that could handle 10,000+ products while maintaining fast load times and high conversion rates.",
      solution: "Built a custom Next.js application with server-side rendering, implemented advanced caching strategies, and integrated AI-powered product recommendations.",
      results: "Achieved 340% increase in conversion rates, 98/100 performance score, and $2.5M in additional revenue within 6 months."
    },
    {
      title: "HealthTech Patient Portal",
      category: "Healthcare",
      description: "<span className='font-bold text-facebook dark:text-facebook'>Elite</span> HIPAA-compliant patient portal serving <span className='font-bold text-facebook dark:text-facebook'>100+</span> healthcare providers with <span className='font-bold text-facebook dark:text-facebook'>premium</span> real-time scheduling.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Node.js", "MongoDB", "AWS", "Docker", "HIPAA"],
      metrics: {
        providers: "100+",
        patients: "25K+",
        appointments: "500K+",
        satisfaction: "4.9/5"
      },
      features: [
        "HIPAA-compliant data encryption",
        "Real-time appointment scheduling",
        "Secure medical record access",
        "Telemedicine integration",
        "Automated reminders",
        "Multi-provider support"
      ],
      challenge: "Creating a secure, scalable platform that meets strict HIPAA compliance requirements while providing an intuitive user experience for both patients and healthcare providers.",
      solution: "Developed a microservices architecture with end-to-end encryption, implemented comprehensive audit trails, and created role-based access controls.",
      results: "Successfully serves 100+ healthcare providers, 25,000+ patients, and maintains 99.9% uptime with 4.9/5 user satisfaction rating."
    },
    {
      title: "GreenEats Food Delivery App",
      category: "Mobile App",
      description: "<span className='font-bold text-facebook dark:text-facebook'>Sophisticated</span> cross-platform food delivery app with <span className='font-bold text-facebook dark:text-facebook'>50K+</span> active users, featuring <span className='font-bold text-facebook dark:text-facebook'>elite</span> real-time tracking.",
      image: "/api/placeholder/600/400",
      technologies: ["React Native", "Firebase", "Google Maps", "Stripe", "AWS", "Redux"],
      metrics: {
        users: "50K+",
        orders: "200K+",
        restaurants: "500+",
        rating: "4.8/5"
      },
      features: [
        "Real-time order tracking",
        "Multi-restaurant ordering",
        "Sustainable packaging options",
        "AI-powered delivery optimization",
        "In-app payments & tipping",
        "Restaurant analytics dashboard"
      ],
      challenge: "Building a scalable food delivery platform that could handle thousands of concurrent orders while providing real-time tracking and optimizing delivery routes.",
      solution: "Created a React Native app with Firebase backend, implemented real-time location tracking, and developed an AI-powered delivery optimization system.",
      results: "Achieved 50,000+ active users, 200,000+ orders processed, and 4.8/5 app store rating with 95% customer retention rate."
    },
    {
      title: "FinTech Investment Dashboard",
      category: "Finance",
      description: "<span className='font-bold text-facebook dark:text-facebook'>Billion-dollar</span> investment portfolio management platform with <span className='font-bold text-facebook dark:text-facebook'>AI-powered</span> insights and <span className='font-bold text-facebook dark:text-facebook'>elite</span> automated trading.",
      image: "/api/placeholder/600/400",
      technologies: ["Vue.js", "Python", "PostgreSQL", "Redis", "AWS", "Machine Learning"],
      metrics: {
        users: "10K+",
        portfolios: "15K+",
        trades: "1M+",
        returns: "+15%"
      },
      features: [
        "Real-time market data integration",
        "AI-powered investment recommendations",
        "Automated portfolio rebalancing",
        "Advanced risk analytics",
        "Multi-exchange trading",
        "Comprehensive reporting"
      ],
      challenge: "Developing a secure, high-performance platform that could process real-time market data and provide AI-powered investment insights while maintaining regulatory compliance.",
      solution: "Built a microservices architecture with real-time data streaming, implemented machine learning models for investment recommendations, and ensured SOC 2 compliance.",
      results: "Serves 10,000+ users managing 15,000+ portfolios, processed 1M+ trades, and achieved 15% average portfolio returns."
    },
    {
      title: "EduTech Learning Platform",
      category: "Education",
      description: "<span className='font-bold text-facebook dark:text-facebook'>Premium</span> online learning platform with <span className='font-bold text-facebook dark:text-facebook'>100K+</span> students, featuring <span className='font-bold text-facebook dark:text-facebook'>elite</span> interactive courses and <span className='font-bold text-facebook dark:text-facebook'>AI-powered</span> tutoring.",
      image: "/api/placeholder/600/400",
      technologies: ["Angular", "Django", "PostgreSQL", "Redis", "AWS", "TensorFlow"],
      metrics: {
        students: "100K+",
        courses: "500+",
        completion: "85%",
        satisfaction: "4.7/5"
      },
      features: [
        "Interactive video lessons",
        "AI-powered tutoring system",
        "Progress tracking & analytics",
        "Peer-to-peer learning",
        "Mobile-responsive design",
        "Certificate generation"
      ],
      challenge: "Creating an engaging learning platform that could scale to serve 100,000+ students while providing personalized learning experiences and maintaining high completion rates.",
      solution: "Developed an Angular frontend with Django backend, implemented AI-powered tutoring algorithms, and created comprehensive analytics for student progress tracking.",
      results: "Successfully serves 100,000+ students across 500+ courses with 85% completion rate and 4.7/5 student satisfaction rating."
    },
    {
      title: "RealEstate Property Management",
      category: "Real Estate",
      description: "<span className='font-bold text-facebook dark:text-facebook'>Elite</span> property management system handling <span className='font-bold text-facebook dark:text-facebook'>1,000+</span> properties with <span className='font-bold text-facebook dark:text-facebook'>sophisticated</span> automated rent collection.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS", "IoT"],
      metrics: {
        properties: "1,000+",
        tenants: "2,500+",
        revenue: "$5M+",
        efficiency: "+40%"
      },
      features: [
        "Automated rent collection",
        "Maintenance request tracking",
        "Tenant portal & communication",
        "Financial reporting & analytics",
        "IoT device integration",
        "Document management"
      ],
      challenge: "Building a comprehensive property management system that could handle 1,000+ properties while automating rent collection, maintenance tracking, and tenant communication.",
      solution: "Created a React-based platform with Node.js backend, integrated Stripe for automated payments, and implemented IoT sensors for property monitoring.",
      results: "Manages 1,000+ properties with 2,500+ tenants, processes $5M+ in annual revenue, and improved operational efficiency by 40%."
    }
  ];

  const categories = ["All", "E-commerce", "Healthcare", "Mobile App", "Finance", "Education", "Real Estate"];
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="examples" className="py-24 bg-white dark:bg-dark-bg relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-facebook/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-facebook-light/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-facebook dark:text-facebook mb-6 font-nunito"
          >
            Elite Portfolio
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-xl md:text-2xl text-facebook-dark dark:text-dark-text max-w-4xl mx-auto leading-relaxed"
          >
            Discover our <span className="font-bold text-facebook dark:text-facebook">billion-dollar</span> portfolio of <span className="font-bold text-facebook dark:text-facebook">elite</span> projects. Each masterpiece demonstrates our <span className="font-bold text-facebook dark:text-facebook">unparalleled</span> commitment to innovation, excellence, and measurable success.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-facebook dark:bg-facebook-darkest text-white shadow-xl'
                  : 'bg-facebook/10 dark:bg-facebook-darkest/30 text-facebook dark:text-facebook hover:bg-facebook/20 dark:hover:bg-facebook-darkest/50'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="bg-white/90 dark:bg-dark-card/90 rounded-3xl shadow-2xl backdrop-blur-md border border-white/30 dark:border-dark-border overflow-hidden hover:shadow-3xl transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-64 bg-gradient-to-br from-facebook/20 to-facebook-light/20 dark:from-facebook-darkest/30 dark:to-facebook-dark/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl text-facebook dark:text-facebook opacity-20">
                    {project.category === "E-commerce" && "🛒"}
                    {project.category === "Healthcare" && "🏥"}
                    {project.category === "Mobile App" && "📱"}
                    {project.category === "Finance" && "💰"}
                    {project.category === "Education" && "📚"}
                    {project.category === "Real Estate" && "🏠"}
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-facebook/10 dark:bg-facebook-darkest/60 text-facebook dark:text-white rounded-full text-sm font-semibold">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-facebook-dark dark:text-dark-text mb-4">{project.title}</h3>
                <p className="text-facebook-dark dark:text-dark-muted mb-6 leading-relaxed">{project.description}</p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key} className="text-center p-3 bg-facebook/5 dark:bg-facebook-darkest/20 rounded-xl">
                      <div className="text-lg font-bold text-facebook dark:text-facebook">{value}</div>
                      <div className="text-xs text-facebook-dark dark:text-dark-muted capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-facebook dark:text-facebook mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, j) => (
                      <span key={j} className="px-2 py-1 bg-facebook/10 dark:bg-facebook-darkest/30 text-facebook dark:text-facebook rounded text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-facebook dark:text-facebook mb-3">Key Features:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {project.features.slice(0, 4).map((feature, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-facebook dark:bg-facebook rounded-full"></div>
                        <span className="text-xs text-facebook-dark dark:text-dark-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Case Study Details */}
                <div className="border-t border-facebook/20 dark:border-dark-border pt-6">
                  <details className="group">
                    <summary className="cursor-pointer text-sm font-semibold text-facebook dark:text-facebook hover:text-facebook-dark dark:hover:text-facebook-light transition-colors">
                      View Case Study
                    </summary>
                    <div className="mt-4 space-y-4 text-sm">
                      <div>
                        <h5 className="font-semibold text-facebook-dark dark:text-dark-text mb-2">Challenge:</h5>
                        <p className="text-facebook-dark dark:text-dark-muted">{project.challenge}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-facebook-dark dark:text-dark-text mb-2">Solution:</h5>
                        <p className="text-facebook-dark dark:text-dark-muted">{project.solution}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-facebook-dark dark:text-dark-text mb-2">Results:</h5>
                        <p className="text-facebook-dark dark:text-dark-muted">{project.results}</p>
                      </div>
                    </div>
                  </details>
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
            Ready to Start Your Project?
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-facebook-dark dark:text-dark-muted mb-8 max-w-2xl mx-auto"
          >
            Let's create something amazing together. Our team is ready to bring your vision to life with the same level of excellence shown in these projects.
          </motion.p>
          <motion.a 
            href="#contact" 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-facebook dark:bg-facebook-darkest text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-facebook-lighter dark:hover:bg-facebook-dark hover:-translate-y-1 transition-all duration-300"
          >
            Get Your Custom Solution
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
} 