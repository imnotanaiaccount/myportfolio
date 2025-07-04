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
            <a href="#services" className="font-semibold text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-300 transition-colors duration-150 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300">Services</a>
            <a href="#examples" className="font-semibold text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-300 transition-colors duration-150 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300">Work</a>
            <a href="#contact" className="font-semibold text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-300 transition-colors duration-150 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300">Contact</a>
            <button className="bg-white/90 dark:bg-neutral-900 text-blue-700 dark:text-blue-200 font-semibold rounded-xl shadow-md border border-neutral-200 dark:border-neutral-800 px-5 py-2 ml-4 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300">Menu</button>
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