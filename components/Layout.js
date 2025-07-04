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
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-white font-sans">
              <span className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 text-white font-extrabold shadow-lg border border-white/20">R</span>
              <span className="hidden sm:inline font-bold text-white">Riva</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-white/90 hover:text-white transition-colors duration-200 font-medium">Services</a>
              <a href="#examples" className="text-white/90 hover:text-white transition-colors duration-200 font-medium">Work</a>
              <a href="#contact" className="text-white/90 hover:text-white transition-colors duration-200 font-medium">Contact</a>
            </div>
            
            <a href="#contact" className="px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-bold rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 border border-white/20">
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