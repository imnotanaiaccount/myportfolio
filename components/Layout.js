import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Layout({ children }) {
  const [dark, setDark] = useState(false);
  
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-facebook-bg dark:bg-dark-bg transition-colors duration-300">
      <header className="sticky top-0 z-30 w-full bg-white/95 dark:bg-dark-card/95 backdrop-blur-md border-b border-facebook/10 dark:border-dark-border shadow-lg">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-6">
          <Link href="/" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-facebook dark:text-facebook font-nunito">
            <span className="rounded-xl bg-facebook/10 dark:bg-facebook/20 px-3 py-2 text-facebook font-extrabold shadow-md">IM</span>
            <span className="hidden sm:inline font-bold text-facebook-light dark:text-facebook">Instagrow Media</span>
          </Link>
          
          <div className="flex items-center gap-8">
            <a href="#services" className="hover:text-facebook-lighter dark:hover:text-facebook-lighter font-semibold text-facebook dark:text-dark-text transition-colors duration-150">Services</a>
            <a href="#examples" className="hover:text-facebook-lighter dark:hover:text-facebook-lighter font-semibold text-facebook dark:text-dark-text transition-colors duration-150">Work</a>
            <a href="#contact" className="hover:text-facebook-lighter dark:hover:text-facebook-lighter font-semibold text-facebook dark:text-dark-text transition-colors duration-150">Contact</a>
            <button
              aria-label="Toggle dark mode"
              className="ml-4 p-3 rounded-xl bg-facebook/10 dark:bg-facebook/20 hover:bg-facebook/20 dark:hover:bg-facebook/30 transition-all duration-200 shadow-md"
              onClick={() => setDark((d) => !d)}
            >
              {dark ? (
                <svg width="20" height="20" fill="none" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
              ) : (
                <svg width="20" height="20" fill="none" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95-1.41-1.41M6.46 6.46 5.05 5.05m12.02 0-1.41 1.41M6.46 17.54l-1.41 1.41"/></svg>
              )}
            </button>
          </div>
        </nav>
      </header>
      
      <AnimatePresence mode="wait">
        <motion.main
          key={typeof window !== 'undefined' ? window.location.pathname : ''}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
} 