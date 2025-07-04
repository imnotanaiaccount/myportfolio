import { motion } from 'framer-motion';

export default function Hero() {
  const testimonials = [
    { name: "Sarah Chen", role: "CEO, TechFlow", content: "Joshua transformed our digital presence completely. Our conversion rates increased by 340% in just 3 months!", rating: 5 },
    { name: "Marcus Rodriguez", role: "Founder, GreenEats", content: "The level of attention to detail and user experience design is unmatched. Our app now has 50K+ active users!", rating: 5 },
    { name: "Dr. Emily Watson", role: "Director, HealthTech", content: "Professional, innovative, and delivers beyond expectations. Our platform now serves 100+ healthcare providers.", rating: 5 }
  ];

  const achievements = [
    { number: "50+", label: "Projects Delivered", icon: "🚀" },
    { number: "100%", label: "Client Satisfaction", icon: "⭐" },
    { number: "10+", label: "Years Experience", icon: "🏆" },
    { number: "24/7", label: "Support Available", icon: "🛡️" }
  ];

  const technologies = [
    "React", "Next.js", "Node.js", "TypeScript", "Python", "AWS", "Docker", "MongoDB", "PostgreSQL", "GraphQL", "Tailwind CSS", "Framer Motion"
  ];

  // Enhanced particle system
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <section className="pt-40 pb-32 px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-40 left-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute bottom-40 right-40 w-5 h-5 bg-cyan-400 rounded-full animate-bounce delay-1500"></div>
      </div>
      
      <div className="text-center max-w-6xl mx-auto">
        <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-12 border border-white/20 shadow-lg">
          <span className="text-sm font-semibold text-blue-300">Your Growth Engine for the Future</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Ready to Transform
          </span>
          <br />
          <span className="text-white">Your Business?</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
          Get more leads, increase sales, and grow your business with a website and marketing system that works for you 24/7.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <a href="#contact" className="px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 border border-white/20">
            Get Started Today
          </a>
          <a href="#examples" className="px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold text-xl rounded-full hover:bg-white/20 transition-all duration-300 shadow-lg">
            See Our Work
          </a>
        </div>
        
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-4xl md:text-5xl font-black text-blue-400 mb-3">50+</div>
            <div className="text-gray-300 text-sm font-medium">Projects Delivered</div>
          </div>
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-4xl md:text-5xl font-black text-purple-400 mb-3">100%</div>
            <div className="text-gray-300 text-sm font-medium">Client Satisfaction</div>
          </div>
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-4xl md:text-5xl font-black text-cyan-400 mb-3">10+</div>
            <div className="text-gray-300 text-sm font-medium">Years Experience</div>
          </div>
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-4xl md:text-5xl font-black text-blue-400 mb-3">24/7</div>
            <div className="text-gray-300 text-sm font-medium">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
} 