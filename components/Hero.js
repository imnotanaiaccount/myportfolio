import React, { useState, useEffect } from 'react';
import { FaStar, FaEye, FaEnvelope } from 'react-icons/fa';
import LeadCard from './LeadCard';

const sampleLead = {
  name: 'John D.',
  service: 'Roofing',
  urgency: 'High',
  score: 9,
  notes: 'Requested quote, verified phone, $12k est. project',
  value: '$12,000',
  contact: 'demo@rivaleads.com',
};

const calendlyUrl = 'https://calendly.com/joshhawleyofficial/30min';

const Hero = () => {
  useEffect(() => {
    if (!window.Calendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openCalendly = (e) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: calendlyUrl });
    } else {
      window.open(calendlyUrl, '_blank');
    }
  };

  const [expanded, setExpanded] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden space-bg">
      <div className="container-premium relative z-10 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center mt-28 md:mt-36">
          {/* Headline with premium, cohesive gradient accent */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 md:mb-10 leading-tight drop-shadow-xl" style={{textShadow: '0 4px 32px rgba(0,0,0,0.28)'}}>
            Struggling with inconsistent leads?
          </h1>
          <span className="block mt-2 mb-8 md:mb-10 text-3xl md:text-5xl font-bold gradient-text-futuristic animate-gradient-x" style={{letterSpacing: '-0.01em'}}>
            Experience premium, pre-qualified leads—risk-free.
          </span>
          <p className="text-lg md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Start your risk-free 1-month trial—get up to 5 exclusive, pre-qualified leads and see real results before you commit.
          </p>

          {/* CTA Buttons: Main Conversion Path */}
          <div className="mb-10 flex flex-wrap gap-4 justify-center items-center">
            <a 
              href="#signup?plan=trial" 
              className="btn-apple-primary text-lg px-12 py-6"
            >
              Start My 1-Month Trial
              <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#signup?plan=starter"
              className="btn-apple-paid text-lg px-12 py-6"
            >
              Get Started Now
            </a>
          </div>
          {/* Subtle text link for 'See How It Works' */}
          <div className="mb-12 flex justify-center">
            <a href="#how-it-works" className="text-base font-semibold text-gray-300 hover:text-white underline underline-offset-4 transition-colors duration-200">
              See How It Works
            </a>
          </div>
          {/* Support CTAs: Book a Call, Live Chat */}
          <div className="mb-16 flex flex-wrap gap-4 justify-center items-center">
            <button
              onClick={openCalendly}
              className="btn-apple-leadmagnet-solid text-base px-8 py-4"
              type="button"
            >
              Book a Call
            </button>
            <a
              href="#contact" className="btn-apple-leadmagnet-solid text-base px-8 py-4"
            >
              Live Chat
            </a>
          </div>
        </div>
      </div>
      {/* Removed per-section animated gradient overlay for seamless background */}
    </section>
  );
};

export default Hero;
// Add to styles/globals.css:
// .animate-float-star { animation: float-star 3.5s ease-in-out infinite alternate; }
// @keyframes float-star { 0% { transform: translateY(0); } 100% { transform: translateY(18px); } }
// .animate-gradient-x { animation: gradient-shift 8s ease-in-out infinite; } 
// .space-bg { background: transparent !important; } 