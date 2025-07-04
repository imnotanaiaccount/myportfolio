import React, { useState, useEffect } from 'react';
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Abstract SVG Motif (flowing lines) */}
      <svg className="absolute inset-0 w-full h-full -z-10 pointer-events-none" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity:0.1}}>
        <path d="M0 700 Q 360 600 720 700 T 1440 700" stroke="#3B82F6" strokeWidth="80" fill="none" />
        <path d="M0 400 Q 360 500 720 400 T 1440 400" stroke="#8B5CF6" strokeWidth="60" fill="none" />
        <path d="M0 200 Q 360 300 720 200 T 1440 200" stroke="#06B6D4" strokeWidth="40" fill="none" />
      </svg>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-white font-sans">
              <span className="rounded-xl bg-gradient-to-r from-riva-blue to-riva-violet px-3 py-2 text-white font-extrabold shadow-lg">R</span>
              <span className="hidden sm:inline font-bold text-white">Riva</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-white/80 hover:text-white transition-colors duration-200">Services</a>
              <a href="#examples" className="text-white/80 hover:text-white transition-colors duration-200">Work</a>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors duration-200">Contact</a>
            </div>
            
            <a href="#contact" className="px-6 py-2 bg-gradient-to-r from-riva-blue via-riva-violet to-riva-teal text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Get Started
            </a>
          </div>
        </div>
      </nav>
      
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
} 