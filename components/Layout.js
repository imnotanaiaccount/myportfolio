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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-riva-blue/10 to-riva-violet/20 text-riva-dark">
      {/* Abstract SVG Motif (flowing lines) */}
      <svg className="absolute inset-0 w-full h-full -z-10 pointer-events-none" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity:0.13}}>
        <path d="M0 700 Q 360 600 720 700 T 1440 700" stroke="#3B82F6" strokeWidth="80" fill="none" />
        <path d="M0 400 Q 360 500 720 400 T 1440 400" stroke="#8B5CF6" strokeWidth="40" fill="none" />
        <path d="M0 200 Q 360 100 720 200 T 1440 200" stroke="#06B6D4" strokeWidth="30" fill="none" />
      </svg>
      {/* Navigation Bar */}
      <header className="sticky top-0 z-30 w-full bg-white/70 backdrop-blur-md border-b border-riva-blue/10 shadow-lg">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-5">
          <Link href="/" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight font-sans">
            <span className="rounded-xl px-3 py-2 font-extrabold shadow-md bg-gradient-to-r from-riva-blue via-riva-violet to-riva-teal bg-clip-text text-transparent">Riva</span>
          </Link>
          <div className="flex items-center gap-8">
            <a href="#services" className="font-semibold text-riva-blue hover:text-riva-violet transition-colors duration-150 rounded-lg px-3 py-2">Services</a>
            <a href="#examples" className="font-semibold text-riva-blue hover:text-riva-violet transition-colors duration-150 rounded-lg px-3 py-2">Work</a>
            <a href="#contact" className="font-semibold text-riva-blue hover:text-riva-violet transition-colors duration-150 rounded-lg px-3 py-2">Contact</a>
            <button className="bg-gradient-to-r from-riva-blue via-riva-violet to-riva-teal px-6 py-2 rounded-full font-medium text-white shadow-lg hover:scale-105 transition-all ml-4">Get Started</button>
          </div>
        </nav>
      </header>
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
} 