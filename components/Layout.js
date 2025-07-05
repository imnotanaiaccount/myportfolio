import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Layout({ children, currentPage = 'home' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    if (currentPage === 'home') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Futuristic Background */}
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
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 100%)'
          }}
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
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%)'
          }}
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, rgba(255, 0, 128, 0.05) 50%, transparent 100%)'
          }}
        />
      </div>

      {/* Advanced Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo with Holographic Effect */}
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span 
                className="rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-white font-extrabold shadow-lg border border-white/20 holographic-glow"
                style={{
                  background: 'linear-gradient(135deg, var(--neon-blue) 0%, var(--neon-purple) 50%, var(--neon-cyan) 100%)'
                }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0, 212, 255, 0.3)",
                    "0 0 40px rgba(168, 85, 247, 0.5)",
                    "0 0 20px rgba(0, 212, 255, 0.3)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                R
              </motion.span>
              <span className="text-xl sm:text-2xl font-bold text-white">Riva</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {currentPage === 'home' ? (
                <>
                  <motion.button
                    onClick={() => scrollToSection('services')}
                    className="group relative text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    Services
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full"
                      whileHover={{ width: "100%" }}
                    />
                  </motion.button>
                  <motion.button
                    onClick={() => scrollToSection('examples')}
                    className="group relative text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    Our Work
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full"
                      whileHover={{ width: "100%" }}
                    />
                  </motion.button>
                  <motion.button
                    onClick={() => scrollToSection('about')}
                    className="group relative text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    About
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full"
                      whileHover={{ width: "100%" }}
                    />
                  </motion.button>
                  <motion.button
                    onClick={() => scrollToSection('contact')}
                    className="group relative text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    Contact
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full"
                      whileHover={{ width: "100%" }}
                    />
                  </motion.button>
                </>
              ) : (
                <>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">
                    Home
                  </Link>
                </>
              )}
              
              <motion.a
                href="#contact"
                className="btn-apple px-6 py-2.5 sm:px-8 sm:py-3 text-white font-semibold rounded-full text-sm sm:text-base"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(0, 212, 255, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg glass border border-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <motion.span
                  animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-white rounded-full transition-all duration-300"
                />
                <motion.span
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-6 h-0.5 bg-white rounded-full mt-1 transition-all duration-300"
                />
                <motion.span
                  animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-white rounded-full mt-1 transition-all duration-300"
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-white/10"
            >
              <div className="px-4 py-6 space-y-4">
                {currentPage === 'home' ? (
                  <>
                    <motion.button
                      onClick={() => scrollToSection('services')}
                      className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300 font-medium py-2"
                      whileHover={{ x: 10 }}
                    >
                      Services
                    </motion.button>
                    <motion.button
                      onClick={() => scrollToSection('examples')}
                      className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300 font-medium py-2"
                      whileHover={{ x: 10 }}
                    >
                      Our Work
                    </motion.button>
                    <motion.button
                      onClick={() => scrollToSection('about')}
                      className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300 font-medium py-2"
                      whileHover={{ x: 10 }}
                    >
                      About
                    </motion.button>
                    <motion.button
                      onClick={() => scrollToSection('contact')}
                      className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300 font-medium py-2"
                      whileHover={{ x: 10 }}
                    >
                      Contact
                    </motion.button>
                  </>
                ) : (
                  <Link href="/" className="block text-gray-300 hover:text-white transition-colors duration-300 font-medium py-2">
                    Home
                  </Link>
                )}
                
                <motion.a
                  href="#contact"
                  className="btn-apple w-full px-6 py-3 text-white font-semibold rounded-full"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(0, 212, 255, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Advanced Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 btn-apple text-white rounded-full hover:scale-110 transition-all duration-300 holographic-glow"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 30px rgba(0, 212, 255, 0.6)"
            }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{
                y: [0, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </motion.svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
} 