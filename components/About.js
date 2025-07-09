import React from 'react';

const teamMembers = [
  {
    name: 'Joshua Hawley',
    role: 'Founder & Lead Developer',
    bio: 'Full-stack developer with 8+ years building digital solutions that drive business growth.',
    image: '/team/joshua.jpg', // You can add actual team photos here
    skills: ['React', 'Node.js', 'Python', 'AWS']
  },
  {
    name: 'Sarah Chen',
    role: 'UI/UX Designer',
    bio: 'Creative designer focused on user-centered design that converts visitors into customers.',
    image: '/team/sarah.jpg',
    skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping']
  },
  {
    name: 'Mike Rodriguez',
    role: 'Marketing Strategist',
    bio: 'Growth expert who helps businesses scale through data-driven digital marketing.',
    image: '/team/mike.jpg',
    skills: ['SEO', 'Google Ads', 'Analytics', 'Content Strategy']
  }
];

export default function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="container-premium relative z-10">
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
            {teamMembers.map((member, index) => (
              <div key={index} className="glass p-8 rounded-3xl text-center group hover:scale-105 transition-transform duration-300">
                {/* Profile Image */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                {/* Member Info */}
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-blue-400 font-medium mb-4">{member.role}</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{member.bio}</p>
                
                {/* Skills */}
                <div className="flex flex-wrap justify-center gap-2">
                  {member.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Company Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="glass p-6 rounded-2xl">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-300 text-sm">Projects Completed</div>
            </div>
            <div className="glass p-6 rounded-2xl">
              <div className="text-3xl font-bold text-white mb-2">8+</div>
              <div className="text-gray-300 text-sm">Years Experience</div>
            </div>
            <div className="glass p-6 rounded-2xl">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-gray-300 text-sm">Client Satisfaction</div>
            </div>
            <div className="glass p-6 rounded-2xl">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-300 text-sm">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 