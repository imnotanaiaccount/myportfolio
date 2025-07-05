import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children }) {
  const [dark, setDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if we're on the main page
  const isMainPage = router.pathname === '/';

  const navItems = [
    { href: isMainPage ? '#services' : '/#services', label: 'Services' },
    { href: isMainPage ? '#examples' : '/#examples', label: 'Work' },
    { href: isMainPage ? '#about' : '/#about', label: 'About' },
    { href: isMainPage ? '#contact' : '/#contact', label: 'Contact' }
  ];

  const handleNavClick = (href) => {
    if (href.startsWith('/#')) {
      // Navigate to main page and scroll to section
      router.push(href);
    } else if (href.startsWith('#')) {
      // Scroll to section on current page
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      {/* Abstract SVG Motif (enhanced) */}
      <svg className="absolute inset-0 w-full h-full -z-10 pointer-events-none" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity:0.15}}>
        <path d="M0 700 Q 360 600 720 700 T 1440 700" stroke="#3B82F6" strokeWidth="80" fill="none" />
        <path d="M0 400 Q 360 500 720 400 T 1440 400" stroke="#8B5CF6" strokeWidth="60" fill="none" />
        <path d="M0 200 Q 360 300 720 200 T 1440 200" stroke="#06B6D4" strokeWidth="40" fill="none" />
        <path d="M0 800 Q 360 750 720 800 T 1440 800" stroke="#3B82F6" strokeWidth="30" fill="none" />
      </svg>
      
      {/* Enhanced Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/20 shadow-2xl' 
          : 'bg-black/30 backdrop-blur-xl'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-extrabold tracking-tight text-white font-sans">
              <span className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-2 sm:px-4 sm:py-3 text-white font-extrabold shadow-lg border border-white/20">R</span>
              <span className="font-bold text-white">Riva</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button 
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-white/90 hover:text-white transition-colors duration-200 font-medium relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>
            
            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <button 
                onClick={() => handleNavClick(isMainPage ? '#contact' : '/#contact')}
                className="btn-apple px-6 py-2.5 sm:px-8 sm:py-3 text-white font-semibold rounded-full text-sm sm:text-base"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-black/90 backdrop-blur-xl border-t border-white/20"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="block w-full text-left text-white/90 hover:text-white transition-colors duration-200 font-medium py-3 border-b border-white/10 last:border-b-0"
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                  className="pt-4"
                >
                  <button 
                    onClick={() => handleNavClick(isMainPage ? '#contact' : '/#contact')}
                    className="btn-apple w-full px-6 py-3 text-white font-semibold rounded-full"
                  >
                    Get Started
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Main Content */}
      <main className="relative z-10 pt-16 sm:pt-20">
        {children}
      </main>

      {/* Back to Top Button */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 p-3 btn-apple text-white rounded-full hover:scale-110 transition-all duration-300"
            aria-label="Back to top"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
} 