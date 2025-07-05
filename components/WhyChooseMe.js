import React from 'react';
import { motion } from 'framer-motion';

const reasons = [
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
      </svg>
    ),
    title: "Premium, Detail-Driven Design",
    desc: "Every pixel matters. I craft experiences that are both beautiful and functional, with attention to every detail."
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
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
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
      </svg>
    ),
    title: "Seamless Automation",
    desc: "Save you time with intelligent workflows that handle repetitive tasks and streamline operations."
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
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
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
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
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: "Fast Delivery",
    desc: "Quick turnaround times without compromising quality. Get your project delivered on time, every time."
  },
];

export default function WhyChooseMe() {
  return (
    <section id="why-choose-me" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-12 border border-white/10 shadow-xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent text-center leading-tight">
          Why Choose <span className="font-extrabold">Riva</span>?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed text-center mb-6 sm:mb-8 px-4">
          More than just a developer—I'm your strategic partner in <span className="font-bold text-blue-400">digital success</span> and <span className="font-bold text-blue-400">business growth</span>.
        </p>
        
        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/30 transition-all duration-300"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                {reason.icon}
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm sm:text-base mb-1 sm:mb-2">{reason.title}</h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Key Points */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
          <li className="flex items-center gap-2 sm:gap-3">
            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-cyan-400 inline-block flex-shrink-0"></span>
            <span className="text-gray-300 text-sm sm:text-base">10+ years of experience delivering results</span>
          </li>
          <li className="flex items-center gap-2 sm:gap-3">
            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-cyan-400 inline-block flex-shrink-0"></span>
            <span className="text-gray-300 text-sm sm:text-base">Proven track record with startups & enterprises</span>
          </li>
          <li className="flex items-center gap-2 sm:gap-3">
            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-cyan-400 inline-block flex-shrink-0"></span>
            <span className="text-gray-300 text-sm sm:text-base">Cutting-edge design & technology</span>
          </li>
          <li className="flex items-center gap-2 sm:gap-3">
            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-cyan-400 inline-block flex-shrink-0"></span>
            <span className="text-gray-300 text-sm sm:text-base">Personalized, hands-on approach</span>
          </li>
        </ul>
      </div>
    </section>
  );
} 