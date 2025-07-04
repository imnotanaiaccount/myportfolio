export default function Footer() {
  return (
    <footer className="w-full py-10 px-4 sm:px-6 lg:px-8 bg-white/10 backdrop-blur-sm border-t border-white/10 shadow-xl mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-2xl font-extrabold bg-gradient-to-r from-riva-blue via-riva-violet to-riva-teal bg-clip-text text-transparent font-sans">
          Riva
        </div>
        <p className="text-white/80 text-sm leading-relaxed text-center md:text-left">
          Elevating businesses with modern, high-conversion digital solutions. Minimal. Powerful. Unforgettable.
        </p>
        <div className="text-white/60 text-sm text-center md:text-right">
          &copy; {new Date().getFullYear()} Joshua Hawley · Riva. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 