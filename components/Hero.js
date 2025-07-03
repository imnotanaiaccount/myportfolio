import { motion } from 'framer-motion';

export default function Hero() {
  const testimonials = [
    { name: "Sarah Chen", role: "CEO, TechFlow", content: "Joshua transformed our digital presence completely. Our conversion rates increased by 340% in just 3 months!", rating: 5 },
    { name: "Marcus Rodriguez", role: "Founder, GreenEats", content: "The level of attention to detail and user experience design is unmatched. Our app now has 50K+ active users!", rating: 5 },
    { name: "Dr. Emily Watson", role: "Director, HealthTech", content: "Professional, innovative, and delivers beyond expectations. Our platform now serves 100+ healthcare providers.", rating: 5 }
  ];

  const achievements = [
    { number: "500+", label: "Projects Delivered", icon: "🚀" },
    { number: "98%", label: "Client Satisfaction", icon: "⭐" },
    { number: "15+", label: "Years Experience", icon: "🏆" },
    { number: "24/7", label: "Support Available", icon: "🛡️" }
  ];

  const technologies = [
    "React", "Next.js", "Node.js", "TypeScript", "Python", "AWS", "Docker", "MongoDB", "PostgreSQL", "GraphQL", "Tailwind CSS", "Framer Motion"
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-facebook via-facebook-light to-facebook-lighter dark:from-facebook-darkest dark:via-facebook-dark dark:to-facebook relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-facebook-lighter/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating Technology Icons */}
      <div className="absolute inset-0">
        {technologies.map((tech, i) => (
          <motion.div
            key={tech}
            animate={{
              y: [-20, -100, -20],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute text-white/20 text-sm font-mono"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {tech}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-20"
      >
        {/* Enhanced Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="bg-white/95 dark:bg-dark-card/95 rounded-3xl p-16 mb-12 shadow-2xl backdrop-blur-md border border-white/30 dark:border-dark-border"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-10"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-6xl md:text-8xl font-black tracking-tight text-facebook dark:text-facebook mb-8 font-nunito drop-shadow-lg"
            >
              Joshua Hawley
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-3xl md:text-4xl font-bold text-facebook-light dark:text-facebook mb-6 font-nunito"
            >
              Founder, Instagrow Media
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="text-2xl md:text-3xl text-facebook-dark dark:text-dark-text mb-12 font-nunito max-w-4xl mx-auto leading-relaxed"
            >
              Elevating businesses with <span className="font-bold text-facebook dark:text-facebook">elegant</span>, <span className="font-bold text-facebook dark:text-facebook">modern</span> digital solutions.<br />
              <span className="font-extrabold text-facebook dark:text-facebook">Minimal. Powerful. Unforgettable.</span>
            </motion.p>

            {/* Achievement Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            >
              {achievements.map((achievement, i) => (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.5 + i * 0.1 }}
                  className="text-center p-4 bg-facebook/10 dark:bg-facebook-darkest/30 rounded-2xl backdrop-blur-sm border border-facebook/20"
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <div className="text-2xl font-black text-facebook dark:text-facebook">{achievement.number}</div>
                  <div className="text-sm font-semibold text-facebook-dark dark:text-dark-text">{achievement.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a 
              href="#contact" 
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(24, 119, 242, 0.3)",
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-facebook dark:bg-facebook-darkest text-white font-black text-xl rounded-2xl shadow-2xl hover:shadow-3xl hover:bg-facebook-lighter dark:hover:bg-facebook-dark transition-all duration-300"
            >
              Request Consultation
            </motion.a>
            
            <motion.a 
              href="#services" 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-2xl bg-facebook/10 dark:bg-facebook-darkest/80 text-facebook dark:text-white font-bold text-lg backdrop-blur-sm border-2 border-facebook/30 dark:border-facebook-darkest/60 hover:bg-facebook-lighter/60 dark:hover:bg-facebook-dark hover:text-white transition-all duration-300 shadow-xl"
            >
              Explore Services
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Enhanced Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-8 shadow-2xl backdrop-blur-md border border-white/30 dark:border-dark-border mb-8"
        >
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="text-2xl font-bold text-facebook-dark dark:text-dark-text mb-8 text-center"
          >
            What Our Clients Say
          </motion.h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.9 + i * 0.2 }}
                className="bg-facebook/5 dark:bg-facebook-darkest/20 p-6 rounded-2xl border border-facebook/10"
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

        {/* Enhanced Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-8 shadow-2xl backdrop-blur-md border border-white/30 dark:border-dark-border"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="text-facebook-dark dark:text-dark-text font-semibold mb-6 text-lg text-center"
          >
            Trusted by industry leaders worldwide
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.9 }}
            className="flex flex-wrap justify-center items-center gap-8 text-facebook-light dark:text-dark-muted"
          >
            <motion.div
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex items-center gap-3 bg-facebook/10 dark:bg-facebook/20 px-4 py-3 rounded-xl backdrop-blur-sm border border-facebook/20 transition-all duration-300"
            >
              <div className="w-8 h-8 bg-facebook/20 dark:bg-facebook/30 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="text-facebook dark:text-facebook">
                  <polyline points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
                </svg>
              </div>
              <span className="font-semibold text-facebook-dark dark:text-dark-text">500+ Projects</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex items-center gap-3 bg-facebook/10 dark:bg-facebook/20 px-4 py-3 rounded-xl backdrop-blur-sm border border-facebook/20 transition-all duration-300"
            >
              <div className="w-8 h-8 bg-facebook/20 dark:bg-facebook/30 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="text-facebook dark:text-facebook">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                </svg>
              </div>
              <span className="font-semibold text-facebook-dark dark:text-dark-text">5-Star Reviews</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex items-center gap-3 bg-facebook/10 dark:bg-facebook/20 px-4 py-3 rounded-xl backdrop-blur-sm border border-facebook/20 transition-all duration-300"
            >
              <div className="w-8 h-8 bg-facebook/20 dark:bg-facebook/30 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="text-facebook dark:text-facebook">
                  <polyline points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
                </svg>
              </div>
              <span className="font-semibold text-facebook-dark dark:text-dark-text">99.9% Uptime</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex items-center gap-3 bg-facebook/10 dark:bg-facebook/20 px-4 py-3 rounded-xl backdrop-blur-sm border border-facebook/20 transition-all duration-300"
            >
              <div className="w-8 h-8 bg-facebook/20 dark:bg-facebook/30 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="text-facebook dark:text-facebook">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <span className="font-semibold text-facebook-dark dark:text-dark-text">Award Winner</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-facebook/50 dark:border-facebook rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-facebook dark:bg-facebook rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
} 