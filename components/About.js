import { motion } from 'framer-motion';

export default function About() {
  const team = [
    {
      name: "Joshua Riva",
      role: "Founder & Lead Developer",
      bio: "Full-stack developer with 10+ years of experience building scalable web applications and mobile apps. Expert in React, Node.js, and cloud architecture.",
      image: "/joshua-riva.jpg",
      skills: ["React", "Node.js", "AWS", "Mobile Development"],
      experience: "10+ years",
      projects: "50+ delivered"
    },
    {
      name: "Sarah Kim",
      role: "Senior UI/UX Designer",
      bio: "Award-winning designer specializing in user experience and interface design. Creates intuitive, beautiful, and conversion-focused designs.",
      image: "/sarah-kim.jpg",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      experience: "8+ years",
      projects: "100+ designs"
    },
    {
      name: "Marcus Chen",
      role: "DevOps Engineer",
      bio: "Cloud infrastructure specialist with expertise in AWS, Docker, and Kubernetes. Ensures scalable, secure, and high-performance deployments.",
      image: "/marcus-chen.jpg",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      experience: "6+ years",
      projects: "200+ deployments"
    }
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We stay ahead of technology trends to deliver cutting-edge solutions that give our clients a competitive advantage.",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Quality Assurance",
      description: "Every project undergoes rigorous testing and quality checks to ensure flawless performance and user experience.",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Client Partnership",
      description: "We work as an extension of your team, understanding your business goals and delivering solutions that drive real results.",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Continuous Support",
      description: "Our relationship doesn't end at launch. We provide ongoing support, maintenance, and optimization to ensure long-term success.",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
        </svg>
      )
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description: "We dive deep into your business goals, target audience, and technical requirements to create a comprehensive strategy.",
      duration: "1-2 weeks"
    },
    {
      step: "02",
      title: "Design & Prototyping",
      description: "Our design team creates wireframes, prototypes, and visual designs that align with your brand and user needs.",
      duration: "2-3 weeks"
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "We build your solution using modern technologies, with continuous testing and quality assurance throughout.",
      duration: "4-8 weeks"
    },
    {
      step: "04",
      title: "Launch & Support",
      description: "We deploy your project and provide ongoing support, monitoring, and optimization for continued success.",
      duration: "Ongoing"
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Team Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight">
            Meet the <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Team</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed px-4">
            Our experienced team combines technical expertise with creative vision to deliver exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-24 lg:mb-32">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10"
            >
              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl lg:text-2xl mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">{member.name}</h3>
                <p className="text-blue-400 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{member.role}</p>
                <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">{member.bio}</p>
                
                <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mb-4">
                  {member.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold border border-blue-500/30">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div className="text-center">
                    <div className="text-blue-400 font-bold">{member.experience}</div>
                    <div className="text-gray-400">Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-400 font-bold">{member.projects}</div>
                    <div className="text-gray-400">Projects</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 sm:mb-8 leading-tight">
            Our <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Values</span>
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 sm:mb-16 px-4">
            The principles that guide everything we do and every solution we create.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-24 lg:mb-32">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group text-center bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-105"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500">
                {value.icon}
              </div>
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">{value.title}</h4>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 sm:mb-8 leading-tight">
            Our <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Process</span>
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 sm:mb-16 px-4">
            A proven methodology that ensures your project is delivered on time, on budget, and exceeds expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {process.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-105"
            >
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 text-2xl sm:text-3xl font-black text-blue-400/30 group-hover:text-blue-400 transition-colors duration-300">
                {step.step}
              </div>
              
              <div className="mb-4 sm:mb-6">
                <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">{step.title}</h4>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{step.description}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-400">Duration</span>
                <span className="text-sm sm:text-base font-semibold text-purple-400">{step.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 