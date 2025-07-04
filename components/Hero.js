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
          <span className="text-sm font-medium text-riva-blue">Your Growth Engine for the Future</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-riva-blue via-riva-violet to-riva-teal bg-clip-text text-transparent">
          Ready to <span className="bg-gradient-to-r from-riva-violet to-riva-teal bg-clip-text text-transparent">Grow</span> Your Business?
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20 shadow-lg">
          We build high-converting websites, automated funnels, and magnetic brands for ambitious businesses. Scale smarter, not harder, with AI-powered solutions and a proven process.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="bg-gradient-to-r from-riva-blue via-riva-violet to-riva-teal px-8 py-4 rounded-full font-semibold text-lg text-white shadow-lg hover:scale-105 transition-all flex items-center group">
            Book Free Strategy Call
          </button>
          <button className="border border-white/30 hover:border-white/50 px-8 py-4 rounded-full font-semibold text-lg text-white transition-all flex items-center group">
            Watch Demo
          </button>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-riva-violet mb-2">340%</div>
            <div className="text-white/80">Conversion Increase</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-riva-violet mb-2">50K+</div>
            <div className="text-white/80">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-riva-violet mb-2">100+</div>
            <div className="text-white/80">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-riva-violet mb-2">2-4 Weeks</div>
            <div className="text-white/80">Average Delivery</div>
          </div>
        </div>
      </div>
    </section>
  );
} 