export default function Footer() {
  return (
    <footer className="w-full py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm border-t border-white/10 shadow-xl mt-16 sm:mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-sans mb-3 sm:mb-4">
              Riva
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-sm mx-auto md:mx-0">
              Elevating businesses with modern, high-conversion digital solutions. Minimal. Powerful. Unforgettable.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-center">
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <div className="space-y-2 sm:space-y-3">
              <a href="#services" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">Services</a>
              <a href="#examples" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">Our Work</a>
              <a href="#about" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">About</a>
              <a href="#contact" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">Contact</a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Get in Touch</h4>
            <div className="space-y-2 sm:space-y-3">
              <p className="text-gray-300 text-sm">hello@riva.com</p>
              <p className="text-gray-300 text-sm">Available 24/7</p>
              <p className="text-gray-300 text-sm">Worldwide Service</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/10">
          <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} Joshua Hawley · Riva. All rights reserved.
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 