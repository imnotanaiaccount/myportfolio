import { motion } from 'framer-motion';
import React from 'react';
import projects from '../data/projects';

export default function Examples() {
  return (
    <section id="examples" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight">
            Riva in <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Action</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed px-4">
            See how we've helped businesses achieve <span className="font-bold text-blue-400">real results</span> and <span className="font-bold text-blue-400">measurable growth</span> across diverse industries
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10"
            >
              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500 text-blue-400">
                  {project.logo && <img src={project.logo} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl" />}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">{project.name}</h3>
                <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">{project.description}</p>
                
                {/* Results Section */}
                {project.results && (
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-xs sm:text-sm font-semibold text-blue-400 mb-2 sm:mb-3 uppercase tracking-wide">Key Results</h4>
                    <div className="space-y-1.5 sm:space-y-2">
                      {project.results.slice(0, 3).map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-start">
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 mr-2 sm:mr-3 mt-1.5 sm:mt-2 flex-shrink-0"></span>
                          <span className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Tech Stack */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-xs sm:text-sm font-semibold text-purple-400 mb-2 sm:mb-3 uppercase tracking-wide">Technologies</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tech && project.tech.slice(0, 4).map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold border border-blue-500/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Testimonial */}
                {project.testimonial && (
                  <div className="mb-4 p-3 sm:p-4 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10">
                    <blockquote className="italic text-xs sm:text-sm text-gray-300 mb-2 leading-relaxed">
                      "{project.testimonial}"
                    </blockquote>
                    {project.client && (
                      <div className="text-xs text-gray-400 font-medium">{project.client}</div>
                    )}
                  </div>
                )}
                
                {/* View Project Button */}
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-apple-primary inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 text-white text-xs sm:text-sm font-semibold rounded-full group-hover:scale-105"
                >
                  View Project
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Let's create something extraordinary together. Your next success story starts here.
            </p>
            <a 
              href="#contact" 
              className="btn-apple-primary inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 text-white font-bold text-sm sm:text-lg rounded-full group-hover:scale-105"
            >
              Start Your Project
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 