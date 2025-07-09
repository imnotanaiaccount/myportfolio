import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm border-t border-white/10 shadow-xl mt-16 sm:mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Signup */}
        <div className="mb-10 text-center">
          <h3 className="text-lg font-semibold text-white mb-2">Subscribe to Our Newsletter</h3>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white focus:border-blue-400/50 focus:bg-white/15 transition-all duration-300 w-full sm:w-auto"
              required
            />
            <button type="submit" className="btn-apple-primary px-6 py-2 rounded-full">Subscribe</button>
          </form>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Mobile Apps</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">UI/UX Design</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Digital Marketing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="mailto:hello@riva.com" className="text-gray-300 hover:text-white transition-colors">hello@riva.com</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Get Quote</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Schedule Call</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/10">
          <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} Joshua Hawley · Riva. All rights reserved.
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm">
              Terms of Use
            </Link>
          </div>
        </div>
        <div className="mt-10 flex justify-center gap-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.48C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.966 0-1.75-.79-1.75-1.76s.784-1.76 1.75-1.76 1.75.79 1.75 1.76-.784 1.76-1.75 1.76zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.058 0 14.009-7.514 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
} 