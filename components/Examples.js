import { motion } from 'framer-motion';
import React from 'react'; // Added missing import for React
import projects from '../data/projects';

export default function Examples() {
  return (
    <section id="examples" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Riva in <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Action</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how we've helped businesses like yours achieve <span className="font-bold text-blue-400">real results</span> and <span className="font-bold text-blue-400">measurable growth</span>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-300 group hover:scale-105">
              <div className="mb-4 group-hover:scale-110 transition-transform text-blue-400">
                {/* Example image or icon here */}
                {project.logo && <img src={project.logo} alt="" className="w-10 h-10 rounded-full" />}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">{project.name}</h3>
              <p className="text-gray-300 mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech && project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold">{tech}</span>
                ))}
              </div>
              {project.testimonial && (
                <blockquote className="italic text-sm text-gray-400 mb-2">"{project.testimonial}"</blockquote>
              )}
              {project.client && (
                <div className="text-xs text-gray-500 mb-2">{project.client}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 