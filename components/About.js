import { motion } from 'framer-motion';

export default function About() {
  const team = [
    {
      name: "Joshua Riva",
      role: "Founder & Lead Developer",
      bio: "Full-stack developer with 10+ years of experience building scalable web applications and digital solutions. Passionate about creating technology that drives real business results.",
      image: "/api/placeholder/300/300",
      skills: ["React", "Node.js", "Python", "AWS", "Architecture"],
      experience: "10+ years",
      projects: "50+ delivered"
    },
    {
      name: "Alex Chen",
      role: "Senior UI/UX Designer",
      bio: "Creative designer focused on user-centered design principles. Specializes in creating intuitive interfaces that enhance user experience and drive conversions.",
      image: "/api/placeholder/300/300",
      skills: ["Figma", "Sketch", "Prototyping", "User Research", "Branding"],
      experience: "8+ years",
      projects: "30+ designed"
    },
    {
      name: "Sarah Kim",
      role: "Digital Marketing Strategist",
      bio: "Results-driven marketer with expertise in growth strategies, SEO, and conversion optimization. Helps businesses scale their digital presence effectively.",
      image: "/api/placeholder/300/300",
      skills: ["SEO", "PPC", "Analytics", "CRO", "Content Strategy"],
      experience: "6+ years",
      projects: "25+ campaigns"
    }
  ];

  const values = [
    {
      title: "Quality First",
      description: "We never compromise on quality. Every project is built to the highest standards with attention to detail.",
      icon: "✨"
    },
    {
      title: "Client Success",
      description: "Your success is our success. We're committed to delivering solutions that drive real business results.",
      icon: "🎯"
    },
    {
      title: "Innovation",
      description: "We stay ahead of the curve with cutting-edge technologies and modern development practices.",
      icon: "🚀"
    },
    {
      title: "Transparency",
      description: "Clear communication and honest feedback throughout every project phase.",
      icon: "🔍"
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight">
            Meet the <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Team</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed px-4">
            We're a small, focused team of experts passionate about creating digital solutions that drive real business growth.
          </p>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-20 sm:mb-24 lg:mb-32">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-blue-400/50 transition-all duration-500 hover:scale-105"
            >
              {/* Member Image */}
              <div className="mb-6 sm:mb-8">
                <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-white/20 flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>

              {/* Member Info */}
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-blue-400 font-semibold mb-3 sm:mb-4">{member.role}</p>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">{member.bio}</p>
                
                {/* Experience Stats */}
                <div className="flex justify-center gap-6 sm:gap-8 mb-6 sm:mb-8">
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-white">{member.experience}</div>
                    <div className="text-xs sm:text-sm text-gray-400">Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-white">{member.projects}</div>
                    <div className="text-xs sm:text-sm text-gray-400">Projects</div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide text-center">Key Skills</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {member.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-12 sm:mb-16 text-white">
            Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Values</span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">{value.title}</h4>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 