import { motion } from 'framer-motion';

export default function Hero() {
  const testimonials = [
    { name: "Sarah Chen", role: "CEO, TechFlow", content: "Joshua transformed our digital presence completely. Our conversion rates increased by 340% in just 3 months!", rating: 5 },
    { name: "Marcus Rodriguez", role: "Founder, GreenEats", content: "The level of attention to detail and user experience design is unmatched. Our app now has 50K+ active users!", rating: 5 },
    { name: "Dr. Emily Watson", role: "Director, HealthTech", content: "Professional, innovative, and delivers beyond expectations. Our platform now serves 100+ healthcare providers.", rating: 5 }
  ];

  const achievements = [
    { number: "50+", label: "Projects Delivered", icon: "🚀" },
    { number: "100%", label: "Client Satisfaction", icon: "⭐" },
    { number: "5+", label: "Years Experience", icon: "🏆" },
    { number: "24/7", label: "Support Available", icon: "🛡️" }
  ];

  const technologies = [
    "React", "Next.js", "Node.js", "TypeScript", "Python", "AWS", "Docker", "MongoDB", "PostgreSQL", "GraphQL", "Tailwind CSS", "Framer Motion"
  ];

  // Enhanced particle system
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <section className="min-h-screen bg-gradient-to-br from-facebook via-facebook-light to-facebook-lighter dark:from-facebook-darkest dark:via-facebook-dark dark:to-facebook relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-facebook-lighter/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-facebook-lighter to-facebook-light rounded-full blur-xl"
        />
        
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.8, 0.4],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-facebook to-facebook-light rounded-full blur-lg"
        />
      </div>

      {/* Enhanced Particle System */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            animate={{
              y: [-20, -100, -20],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
            className="absolute text-white/30 text-xs font-mono"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              fontSize: `${particle.size}px`,
            }}
          >
            {technologies[particle.id % technologies.length]}
          </motion.div>
        ))}
      </div>

      {/* Floating Technology Icons with enhanced animations */}
      <div className="absolute inset-0">
        {technologies.map((tech, i) => (
          <motion.div
            key={tech}
            animate={{
              y: [-20, -100, -20],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 0.6, 0],
              rotate: [0, 360, 720],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
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

      {/* Geometric shapes for visual interest */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 right-10 w-20 h-20 border-2 border-white/10 rounded-full"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
          className="absolute bottom-10 left-10 w-16 h-16 border-2 border-white/10 transform rotate-45"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-20"
      >
        {/* Enhanced Main Content with glassmorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/95 dark:bg-dark-card/95 rounded-3xl p-16 mb-12 shadow-2xl backdrop-blur-md border border-white/30 dark:border-dark-border relative overflow-hidden"
        >
          {/* Subtle animated background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #1877f2 0%, transparent 50%),
                                radial-gradient(circle at 75% 75%, #42a5f5 0%, transparent 50%)`,
              backgroundSize: '100px 100px, 150px 150px',
              animation: 'float 20s ease-in-out infinite'
            }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative z-10 mb-10"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-6xl md:text-8xl font-black tracking-tight text-facebook dark:text-facebook mb-8 font-nunito drop-shadow-lg relative"
            >
              <span className="relative">
                Ready to Dominate Your Market?
                <motion.div
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 bg-clip-text text-transparent opacity-20"
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                />
              </span>
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-blue-400 dark:text-cyan-300 mb-6 font-nunito"
            >
              Instagrow Media: Your Growth Engine for 2024
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-2xl md:text-3xl text-facebook-dark dark:text-dark-text mb-12 font-nunito max-w-3xl mx-auto leading-relaxed"
            >
              We build <span className='font-bold text-blue-600 dark:text-cyan-400'>high-converting websites</span>, <span className='font-bold text-blue-600 dark:text-cyan-400'>automated funnels</span>, and <span className='font-bold text-blue-600 dark:text-cyan-400'>magnetic brands</span> for ambitious businesses. <span className='font-extrabold text-blue-600 dark:text-cyan-400'>Book your free strategy call now—slots fill fast!</span>
            </motion.p>

            {/* Enhanced Achievement Stats with hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            >
              {achievements.map((achievement, i) => (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.05 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: "0 20px 40px rgba(24, 119, 242, 0.2)"
                  }}
                  className="text-center p-4 bg-facebook/10 dark:bg-facebook-darkest/30 rounded-2xl backdrop-blur-sm border border-facebook/20 hover:border-facebook/40 transition-all duration-300 cursor-pointer"
                >
                  <motion.div 
                    className="text-3xl mb-2"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  >
                    {achievement.icon}
                  </motion.div>
                  <div className="text-2xl font-black text-facebook dark:text-facebook">{achievement.number}</div>
                  <div className="text-sm font-semibold text-facebook-dark dark:text-dark-text">{achievement.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10"
          >
            <motion.a 
                href="#contact" 
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-white/90 dark:bg-neutral-900 text-blue-700 dark:text-blue-200 font-semibold text-lg rounded-xl shadow-md hover:shadow-lg border border-neutral-200 dark:border-neutral-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <span className="relative z-10">Claim My Free Strategy Call</span>
              </motion.a>
            <motion.a 
              href="#services" 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-2xl bg-white/80 dark:bg-facebook-darkest/80 text-blue-600 dark:text-cyan-300 font-bold text-lg border-2 border-blue-200 dark:border-cyan-700 hover:bg-blue-50 dark:hover:bg-cyan-900 hover:text-blue-700 dark:hover:text-cyan-200 transition-all duration-300 shadow-xl"
            >
              See How We Grow Brands
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Enhanced Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="bg-white/95 dark:bg-dark-card/95 rounded-2xl p-8 shadow-2xl backdrop-blur-md border border-white/30 dark:border-dark-border mb-8"
        >
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
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
                transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  boxShadow: "0 10px 30px rgba(24, 119, 242, 0.15)"
                }}
                className="bg-facebook/5 dark:bg-facebook-darkest/20 p-6 rounded-2xl border border-facebook/10 hover:border-facebook/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.svg 
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.3 + i * 0.05 }}
                      className="w-5 h-5 text-yellow-400 fill-current" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </motion.svg>
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
          transition={{ duration: 0.5, delay: 1.4 }}
          className="text-center"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/60 text-sm font-medium"
          >
            Trusted by 500+ businesses worldwide
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </section>
  );
} 