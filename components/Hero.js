import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Main Content */}
      <div className="container-premium relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full glass mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">Taking on new clients</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
            <span className="text-white">Digital solutions that</span>
            <br />
            <span className="gradient-text-futuristic">make you money</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            We build websites, apps, and digital tools that turn visitors into customers. No fancy jargon, just results that grow your business.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <a 
              href="#contact" 
              className="btn-apple-primary text-lg px-12 py-6"
            >
              Get Your Free Quote
              <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a 
              href="#portfolio" 
              className="btn-apple-secondary text-lg px-12 py-6"
            >
              See Our Work
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="glass p-6 rounded-2xl">
              <div className="text-3xl font-bold text-white mb-2">$2M+</div>
              <div className="text-gray-300 text-sm">Made for Clients</div>
            </div>
            <div className="glass p-6 rounded-2xl">
              <div className="text-3xl font-bold text-white mb-2">3x</div>
              <div className="text-gray-300 text-sm">More Sales</div>
            </div>
            <div className="glass p-6 rounded-2xl">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-300 text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 