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
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center">
        <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
          <span className="text-sm font-medium text-blue-300">Your Growth Engine for the Future</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Ready to <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Transform</span> Your Business?
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
          Get more leads, increase sales, and grow your business with a website and marketing system that works for you 24/7.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a href="#contact" className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Get Started Today
          </a>
          <a href="#examples" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg rounded-full hover:bg-white/20 transition-all duration-300">
            See Our Work
          </a>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">50+</div>
            <div className="text-gray-300 text-sm">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">100%</div>
            <div className="text-gray-300 text-sm">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">10+</div>
            <div className="text-gray-300 text-sm">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">24/7</div>
            <div className="text-gray-300 text-sm">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
} 