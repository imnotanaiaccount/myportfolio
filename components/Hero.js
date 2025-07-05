import { motion } from 'framer-motion';

export default function Hero() {
  const technologies = [
    "React", "Next.js", "Node.js", "TypeScript", "Python", "AWS", "Docker", "MongoDB", "PostgreSQL", "GraphQL", "Tailwind CSS", "Framer Motion"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0">
        {/* Advanced Gradient Orbs */}
        <motion.div 
          className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 100%)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(6, 182, 212, 0.2) 50%, transparent 100%)'
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 lg:w-[800px] lg:h-[800px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, rgba(255, 0, 128, 0.1) 50%, transparent 100%)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Holographic Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Advanced Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 sm:w-2 sm:h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `hsl(${Math.random() * 360}, 70%, 60%)`,
                boxShadow: `0 0 ${Math.random() * 10 + 5}px hsl(${Math.random() * 360}, 70%, 60%)`
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 1, 0.2],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Holographic Rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px]"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="absolute inset-0 border border-cyan-400/20 rounded-full" />
          <div className="absolute inset-8 border border-purple-400/20 rounded-full" />
          <div className="absolute inset-16 border border-blue-400/20 rounded-full" />
        </motion.div>
      </div>

      <div className="container-premium relative z-10 text-center max-w-7xl mx-auto">
        {/* Futuristic Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center glass rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-8 sm:mb-12 border border-white/20 holographic-glow"
        >
          <motion.div 
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mr-2 sm:mr-3"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span className="text-xs sm:text-sm font-medium text-white">Trusted by Fortune 500 Companies</span>
        </motion.div>
        
        {/* Hero Title with Advanced Effects */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 leading-tight"
        >
          <span className="gradient-text-futuristic">Ready to Transform</span>
          <br />
          <motion.span 
            className="text-white"
            animate={{
              textShadow: [
                "0 0 20px rgba(255, 255, 255, 0.5)",
                "0 0 40px rgba(0, 212, 255, 0.8)",
                "0 0 20px rgba(255, 255, 255, 0.5)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Your Business?
          </motion.span>
        </motion.h1>
        
        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed px-4"
        >
          Get more leads, increase sales, and grow your business with a website and marketing system that works for you 24/7. 
          <span className="text-cyan-400 font-semibold"> Average 340% increase in conversions.</span>
        </motion.p>
        
        {/* CTA Buttons with Advanced Effects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 sm:mb-20 px-4"
        >
          <motion.a 
            href="#contact" 
            className="btn-apple-primary group text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 rounded-full relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(0, 212, 255, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Get Started Today</span>
            <motion.svg 
              className="w-4 h-4 sm:w-5 sm:h-5 ml-2 inline group-hover:translate-x-1 transition-transform relative z-10" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{
                x: [0, 5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </motion.a>
          <motion.a 
            href="#examples" 
            className="btn-apple-secondary group text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 rounded-full relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">See Our Work</span>
            <motion.svg 
              className="w-4 h-4 sm:w-5 sm:h-5 ml-2 inline group-hover:translate-x-1 transition-transform relative z-10" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </motion.svg>
          </motion.a>
        </motion.div>

        {/* Technology Stack with Advanced Effects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-12 sm:mb-16 px-4"
        >
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-400 mb-6 sm:mb-8 uppercase tracking-wide">Built with Modern Technologies</h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1 + index * 0.05 }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)"
                }}
                className="glass px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-gray-300 border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Premium Testimonial Preview with Holographic Effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 max-w-4xl mx-auto px-4 holographic-glow"
        >
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            {[...Array(5)].map((_, i) => (
              <motion.svg 
                key={i} 
                className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </div>
          <blockquote className="text-sm sm:text-base lg:text-lg text-gray-300 mb-4 sm:mb-6 italic leading-relaxed">
            "Joshua transformed our digital presence completely. Our conversion rates increased by 340% in just 3 months!"
          </blockquote>
          <div className="text-center">
            <div className="font-semibold text-white text-sm sm:text-base">Sarah Chen</div>
            <div className="text-xs sm:text-sm text-gray-400">CEO, TechFlow Analytics</div>
          </div>
        </motion.div>
      </div>

      {/* Advanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-cyan-400/50 rounded-full flex justify-center relative overflow-hidden"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-0.5 h-2 sm:h-3 bg-cyan-400 rounded-full mt-1.5 sm:mt-2"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 to-transparent"
            animate={{
              y: [0, 20, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
} 