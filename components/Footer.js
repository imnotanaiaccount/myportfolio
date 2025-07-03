export default function Footer() {
  return (
    <footer className="w-full bg-white/95 dark:bg-dark-card/95 rounded-t-3xl shadow-2xl border-t border-facebook/10 dark:border-dark-border mt-16 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="text-facebook dark:text-facebook text-2xl font-extrabold tracking-tight font-nunito">
              Instagrow Media
            </div>
            <p className="text-facebook-light dark:text-dark-muted text-sm leading-relaxed">
              Elevating businesses with elegant, modern digital solutions. Minimal. Powerful. Unforgettable.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-facebook-dark dark:text-dark-text">Services</h3>
            <div className="space-y-2 text-sm">
              <a href="#services" className="block text-facebook-light dark:text-dark-muted hover:text-facebook dark:hover:text-facebook transition-colors duration-200">Website Design</a>
              <a href="#services" className="block text-facebook-light dark:text-dark-muted hover:text-facebook dark:hover:text-facebook transition-colors duration-200">Automation</a>
              <a href="#services" className="block text-facebook-light dark:text-dark-muted hover:text-facebook dark:hover:text-facebook transition-colors duration-200">Analytics</a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-facebook-dark dark:text-dark-text">Company</h3>
            <div className="space-y-2 text-sm">
              <a href="#about" className="block text-facebook-light dark:text-dark-muted hover:text-facebook dark:hover:text-facebook transition-colors duration-200">About</a>
              <a href="#contact" className="block text-facebook-light dark:text-dark-muted hover:text-facebook dark:hover:text-facebook transition-colors duration-200">Contact</a>
              <a href="#examples" className="block text-facebook-light dark:text-dark-muted hover:text-facebook dark:hover:text-facebook transition-colors duration-200">Portfolio</a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-facebook-dark dark:text-dark-text">Connect</h3>
            <div className="space-y-2 text-sm">
              <a href="mailto:your@email.com" className="block text-facebook-light dark:text-dark-muted hover:text-facebook dark:hover:text-facebook transition-colors duration-200">Email</a>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener" className="block text-facebook-light dark:text-dark-muted hover:text-facebook dark:hover:text-facebook transition-colors duration-200">LinkedIn</a>
              <a href="tel:+1234567890" className="block text-facebook-light dark:text-dark-muted hover:text-facebook dark:hover:text-facebook transition-colors duration-200">Phone</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-facebook/10 dark:border-dark-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-facebook-light dark:text-dark-muted text-sm">
            &copy; {new Date().getFullYear()} Joshua Hawley · Instagrow Media. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-facebook-light dark:text-dark-muted hover:text-facebook dark:hover:text-facebook transition-colors duration-200">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-facebook-light dark:text-dark-muted hover:text-facebook dark:hover:text-facebook transition-colors duration-200">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
            <a href="#" className="text-facebook-light dark:text-dark-muted hover:text-facebook dark:hover:text-facebook transition-colors duration-200">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 