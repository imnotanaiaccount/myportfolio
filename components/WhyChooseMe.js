import React from 'react';
import { motion } from 'framer-motion';

const reasons = [
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
      </svg>
    ),
    title: "Premium, Detail-Driven Design",
    desc: "Every pixel matters. I craft experiences that are both beautiful and functional, with attention to every detail."
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="12" y1="20" x2="12" y2="10"/>
        <line x1="18" y1="20" x2="18" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="16"/>
      </svg>
    ),
    title: "Results-Focused Approach",
    desc: "Turn visitors into loyal clients with conversion-optimized designs and strategic user experience."
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
      </svg>
    ),
    title: "Seamless Automation",
    desc: "Save you time with intelligent workflows that handle repetitive tasks and streamline operations."
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <circle cx="12" cy="16" r="1"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: "Trusted Technology Stack",
    desc: "Built with modern, scalable technologies that ensure performance, security, and future-proof solutions."
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Personalized Service",
    desc: "Collaborative approach with ongoing support and strategic consulting to keep you ahead of the competition."
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: "Fast Delivery",
    desc: "Quick turnaround times without compromising quality. Get your project delivered on time, every time."
  },
];

export default function WhyChooseMe() {
  return (
    <section id="why-choose-me" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/10 shadow-xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-riva-blue via-riva-violet to-riva-teal bg-clip-text text-transparent text-center">
          Why Choose <span className="font-extrabold">Riva</span>?
        </h2>
        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed text-center mb-8">
          More than just a developer—I'm your strategic partner in <span className="font-bold text-riva-blue">digital success</span> and <span className="font-bold text-riva-blue">business growth</span>.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <li className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-riva-teal inline-block"></span>
            <span className="text-white/80">10+ years of experience delivering results</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-riva-teal inline-block"></span>
            <span className="text-white/80">Proven track record with startups & enterprises</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-riva-teal inline-block"></span>
            <span className="text-white/80">Cutting-edge design & technology</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-riva-teal inline-block"></span>
            <span className="text-white/80">Personalized, hands-on approach</span>
          </li>
        </ul>
      </div>
    </section>
  );
} 