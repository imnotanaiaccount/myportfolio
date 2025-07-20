import React, { useRef, useEffect } from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const parallax = (index) => ({
  transform: `translateY(${index * 8}px)`
});

  const testimonials = [
    {
    name: 'Jimmie Jackson',
    business: 'Jackson Investment Solutions (Real Estate Investor/Wholesaler)',
    quote: 'Riva generated 17 motivated seller leads in my first month. We closed $120,000+ in new deals and the site converts like crazy. Highly recommend for any investor who wants real results.',
    metrics: '17 leads in 30 days | $120k+ closed | 100% exclusive',
    projectUrl: 'https://jacksoninvestmentsolutions2.netlify.app/'
  },
  {
    name: 'Sarah L.',
    business: 'GreenScape Pros (Landscaping)',
    quote: 'We booked 6 new landscaping clients in 2 weeks. Every lead was ready to hire and our average project value jumped to $3,500. Riva is hands-off and delivers real ROI.',
    metrics: '6 new clients | $21k in new business | 40% higher close rate',
    projectUrl: 'https://demo-landscaping-site.netlify.app/'
  },
  {
    name: 'Mike R.',
    business: 'CleanPro Solutions (Commercial Cleaning)',
    quote: 'We landed a $24,000 contract from our first 3 leads. The quality is unmatched—every lead was pre-verified and ready to buy. Riva is a game changer for B2B.',
    metrics: '$24k contract | 3 locations | Lead score: 10/10',
    projectUrl: 'https://demo-cleaning-site.netlify.app/'
  },
  {
    name: 'Lisa P.',
    business: 'HomeFix Masters (Home Services)',
    quote: 'I secured 2 new jobs in 10 days and stopped wasting time on bad leads. Riva’s system only sends people who are ready to hire. My close rate is up 60%.',
    metrics: '2 jobs in 10 days | $4k in new work | 60%+ close rate',
    projectUrl: 'https://demo-homeservices-site.netlify.app/'
  },
];

export default function Testimonials() {
  // For swipeable carousel on mobile (basic, non-library)
  const containerRef = useRef(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let isDown = false, startX, scrollLeft;
    el.addEventListener('mousedown', (e) => {
      isDown = true;
      el.classList.add('grabbing');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    });
    el.addEventListener('mouseleave', () => { isDown = false; el.classList.remove('grabbing'); });
    el.addEventListener('mouseup', () => { isDown = false; el.classList.remove('grabbing'); });
    el.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2;
      el.scrollLeft = scrollLeft - walk;
    });
    // Touch events
    let touchStartX, touchScrollLeft;
    el.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX;
      touchScrollLeft = el.scrollLeft;
    });
    el.addEventListener('touchmove', (e) => {
      if (touchStartX == null) return;
      const x = e.touches[0].pageX;
      const walk = (x - touchStartX) * 2;
      el.scrollLeft = touchScrollLeft - walk;
    });
    el.addEventListener('touchend', () => { touchStartX = null; });
  }, []);

  return (
    <section id="testimonials" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-black space-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight">
            Results <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">That Matter</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed px-4">
            Real business owners. Real revenue. Real growth.
          </p>
        </div>
        {/* Swipeable carousel on mobile */}
        <div
          ref={containerRef}
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 overflow-x-auto md:overflow-visible snap-x"
          style={{scrollSnapType: 'x mandatory'}}
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border text-left shadow-lg transition-transform duration-500 ease-out group overflow-hidden ${
                idx === 0 ? 'border-2 border-blue-400/70 animate-glow-card' : 'border border-blue-400/30'
              } hover:scale-105 hover:shadow-2xl hover:border-purple-400/60 snap-center`}
              style={{
                ...parallax(idx),
                background: 'linear-gradient(135deg, rgba(24,28,48,0.82) 0%, rgba(40,44,74,0.72) 100%)',
                boxShadow: idx === 0
                  ? '0 0 24px 4px rgba(0,122,255,0.18), 0 2px 16px 0 rgba(0,0,0,0.10)'
                  : '0 2px 16px 0 rgba(0,0,0,0.10)'
              }}
            >
              {/* Removed per-card animated gradient overlay for seamless background */}
              {/* Top Rated Badge */}
              {idx === 0 && (
                <div className="absolute -top-4 left-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg animate-pulse z-10">
                  Top Rated
                </div>
              )}
              <div className="flex items-center mb-4 relative z-10">
                <FaQuoteLeft className="text-blue-400 text-2xl mr-2" />
                <span className="font-bold text-white text-lg">{t.name}</span>
                <span className="ml-2 text-blue-300 text-sm">({t.business})</span>
          </div>
              <blockquote className="italic text-gray-300 mb-4 relative z-10">"{t.quote}"</blockquote>
              <div className="text-xs text-green-400 font-semibold mb-2 relative z-10">{t.metrics}</div>
              {t.projectUrl && <a href={t.projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-xs font-semibold mt-2 inline-block relative z-10">View Project</a>}
            </div>
          ))}
        </div>
        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">
              Try Riva Free for Your First Month (Up to 5 Qualified Leads)
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto px-4">
              Experience premium, pre-qualified leads—risk-free. Limited to new clients. No credit card required to start.
            </p>
            <a 
              href="#signup" 
              className="btn-apple-primary inline-flex items-center px-8 py-4 text-white font-bold text-lg rounded-full hover:scale-105"
            >
              Unlock My Free Month
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 