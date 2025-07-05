import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CEO, TechFlow Analytics",
      company: "Fortune 500 Tech Company",
      content: "Joshua transformed our entire digital infrastructure. The analytics platform he built processes 10M+ data points daily and has given us insights that drove 500% ROI in the first year. His attention to detail and technical expertise are unmatched.",
      rating: 5,
      image: "/sarah-chen.jpg",
      results: ["500% ROI", "10M+ daily data points", "99.9% uptime"]
    },
    {
      name: "Marcus Rodriguez",
      role: "Founder & CEO",
      company: "GreenEats",
      content: "Working with Joshua was a game-changer for our sustainable food delivery startup. He built our mobile app from scratch, and within 6 months, we had 50K+ active users. The user experience is incredible, and our carbon footprint tracking feature has helped us reduce emissions by 40%.",
      rating: 5,
      image: "/marcus-rodriguez.jpg",
      results: ["50K+ active users", "40% carbon reduction", "4.8/5 app rating"]
    },
    {
      name: "Dr. Emily Watson",
      role: "Director of Technology",
      company: "HealthTech Connect",
      content: "Joshua delivered a HIPAA-compliant telemedicine platform that now serves 100+ healthcare providers. His understanding of healthcare regulations and ability to build secure, scalable solutions is exceptional. Our providers love the platform, and we've achieved 95% user satisfaction.",
      rating: 5,
      image: "/emily-watson.jpg",
      results: ["100+ providers", "HIPAA compliant", "95% satisfaction"]
    },
    {
      name: "Alex Thompson",
      role: "VP of Product",
      company: "FinFlow Banking",
      content: "The AI-powered financial insights Joshua implemented have revolutionized how our users manage money. Users are saving 25% more and investing 3x smarter. His expertise in machine learning and financial technology is world-class.",
      rating: 5,
      image: "/alex-thompson.jpg",
      results: ["25% more savings", "3x smarter investing", "200K+ users"]
    },
    {
      name: "Dr. Lisa Park",
      role: "Education Director",
      company: "EduTech Learning",
      content: "Our AI-powered learning platform serves 500K+ students and has improved performance by 60%. Joshua's understanding of educational technology and machine learning created a truly personalized learning experience. The platform is revolutionary.",
      rating: 5,
      image: "/lisa-park.jpg",
      results: ["500K+ students", "60% performance improvement", "90% completion rate"]
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight">
            What Our <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Clients Say</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed px-4">
            Don't just take our word for it. Here's what industry leaders say about working with Riva.
          </p>
        </div>

        <div className="relative">
          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 ${
                  index === activeIndex ? 'ring-2 ring-purple-400/50' : ''
                }`}
              >
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  {/* Rating */}
                  <div className="flex mb-4 sm:mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <blockquote className="text-sm sm:text-base lg:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed italic">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Results */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-xs sm:text-sm font-semibold text-blue-400 mb-2 sm:mb-3 uppercase tracking-wide">Key Results</h4>
                    <div className="space-y-1.5 sm:space-y-2">
                      {testimonial.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-start">
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 mr-2 sm:mr-3 mt-1.5 sm:mt-2 flex-shrink-0"></span>
                          <span className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Author */}
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg mr-3 sm:mr-4">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm sm:text-base">{testimonial.name}</div>
                      <div className="text-xs sm:text-sm text-gray-400">{testimonial.role}</div>
                      <div className="text-xs text-gray-500">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-3 sm:space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex space-x-1.5 sm:space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-purple-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              Trusted by Industry Leaders
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Join hundreds of satisfied clients who've transformed their businesses with Riva.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-blue-400 mb-1 sm:mb-2">100%</div>
                <div className="text-gray-300 text-xs sm:text-sm font-medium">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-purple-400 mb-1 sm:mb-2">50+</div>
                <div className="text-gray-300 text-xs sm:text-sm font-medium">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-cyan-400 mb-1 sm:mb-2">10+</div>
                <div className="text-gray-300 text-xs sm:text-sm font-medium">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-blue-400 mb-1 sm:mb-2">24/7</div>
                <div className="text-gray-300 text-xs sm:text-sm font-medium">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 