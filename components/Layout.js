import React from 'react';

const Layout = ({ children }) => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Living Background Elements */}
      <div className="living-background">
        <div className="living-orb"></div>
        <div className="living-orb"></div>
        <div className="living-orb"></div>
        <div className="living-orb"></div>
        <div className="living-orb"></div>
      </div>
      
      {/* Subtle Grid Pattern */}
      <div className="living-grid"></div>
      
      {/* Floating Particles */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="container-premium">
          <div className="flex items-center justify-between">
            <button 
              onClick={scrollToContact}
              className="text-2xl font-bold gradient-text-futuristic hover:opacity-80 transition-opacity duration-300 cursor-pointer"
            >
              Riva
            </button>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">Services</a>
              <a href="#portfolio" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">Portfolio</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};

export default Layout; 