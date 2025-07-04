import { motion } from 'framer-motion';

export default function FeaturedProject() {
  return (
    <section className="py-32 bg-facebook-bg dark:bg-dark-bg relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-10 right-10 w-64 h-64 bg-facebook/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.1, 1, 1.1],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-10 left-10 w-48 h-48 bg-facebook-light/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card p-16 perspective-3d"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-5xl md:text-6xl font-black text-facebook dark:text-facebook font-nunito mb-4">
                    Featured Project
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-facebook to-facebook-light rounded-full"></div>
                </motion.div>

                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold text-facebook-dark dark:text-dark-text"
                >
                  Jackson Investment Solutions
                </motion.h3>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-xl text-facebook-light dark:text-dark-muted leading-relaxed"
                >
                  A modern, conversion-focused real estate platform built for maximum trust and lead generation. 
                  Designed and developed with seamless user experience, mobile-first performance, and business growth in mind.
                </motion.p>
              </div>

              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-wrap gap-3">
                  {['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'].map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 bg-facebook/10 dark:bg-facebook-darkest/60 text-facebook dark:text-white rounded-full text-sm font-semibold hover:bg-facebook-lighter/40 dark:hover:bg-facebook-dark hover:text-white transition-all duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a 
                    href="https://jacksoninvestmentsolutions2.netlify.app/" 
                    target="_blank" 
                    rel="noopener"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-block px-7 py-3 bg-white/90 dark:bg-neutral-900 text-blue-700 dark:text-blue-200 font-semibold text-base rounded-xl shadow-md border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    View Project
                  </motion.a>
                  <motion.a 
                    href="#contact" 
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-facebook/10 dark:bg-facebook-darkest/70 text-facebook dark:text-white font-semibold text-center hover:bg-facebook-lighter/50 dark:hover:bg-facebook-dark hover:text-white transition-all duration-300 border border-facebook/20"
                  >
                    Similar Project
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-dark-card border border-facebook/10 dark:border-dark-border"
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: 2
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gradient-to-r from-facebook/10 to-facebook-light/10 dark:from-facebook/20 dark:to-facebook-light/20 px-6 py-4 border-b border-facebook/10 dark:border-dark-border">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-4 h-4 rounded-full bg-red-500"></div>
                      <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-sm text-facebook-light dark:text-dark-muted font-medium ml-4">
                      jacksoninvestmentsolutions.com
                    </span>
                  </div>
                </div>
                
                <motion.div 
                  className="aspect-video bg-gradient-to-br from-facebook/5 to-facebook/10 dark:from-facebook/10 dark:to-facebook/20 flex items-center justify-center relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center space-y-6 p-8">
                    <motion.div 
                      className="text-8xl"
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      🏠
                    </motion.div>
                    <div>
                      <p className="text-facebook dark:text-facebook font-bold text-xl mb-2">Live Preview</p>
                      <p className="text-sm text-facebook-light dark:text-dark-muted">
                        Modern real estate platform with advanced features
                      </p>
                    </div>
                  </div>
                  
                  {/* Floating UI Elements */}
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30"
                  />
                  <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-4 left-4 w-12 h-12 bg-facebook/20 rounded-lg backdrop-blur-sm border border-facebook/30"
                  />
                </motion.div>
              </motion.div>
              
              {/* Floating Performance Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -top-6 -right-6 bg-white dark:bg-dark-card rounded-2xl p-6 shadow-2xl border border-facebook/10 dark:border-dark-border"
              >
                <div className="text-center space-y-2">
                  <div className="text-xs text-facebook-light dark:text-dark-muted font-semibold">Performance</div>
                  <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto"></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.7 }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-dark-card rounded-2xl p-4 shadow-2xl border border-facebook/10 dark:border-dark-border"
              >
                <div className="text-center space-y-1">
                  <div className="text-2xl font-black text-facebook dark:text-facebook">⚡</div>
                  <div className="text-xs text-facebook-light dark:text-dark-muted font-semibold">Fast</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 