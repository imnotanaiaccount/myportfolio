import { motion } from 'framer-motion';
import React from 'react'; // Added missing import for React
import projects from '../data/projects';

export default function Examples() {
  return (
    <section className="py-32 bg-facebook-bg dark:bg-dark-bg relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-5xl md:text-6xl font-black text-facebook dark:text-facebook font-nunito mb-12 text-center">Client Projects</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map(project => (
            <div key={project.name} className="rounded-2xl shadow-lg bg-white dark:bg-dark-card p-6 flex flex-col">
              <img src={project.screenshot} alt={project.name} className="rounded-xl mb-4 w-full aspect-video object-cover" />
              <div className="flex items-center gap-3 mb-2">
                {project.logo && <img src={project.logo} alt="" className="w-10 h-10 rounded-full" />}
                <h3 className="text-xl font-bold">{project.name}</h3>
              </div>
              <p className="text-facebook-dark dark:text-dark-muted mb-2">{project.description}</p>
              <div className="flex gap-2 mb-2 flex-wrap">
                {project.tech.map(t => (
                  <span key={t} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">{t}</span>
                ))}
              </div>
              {project.testimonial && (
                <blockquote className="italic text-sm text-gray-600 dark:text-gray-400 mb-2">"{project.testimonial}"</blockquote>
              )}
              {project.client && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{project.client}</div>
              )}
              <a href={project.url} target="_blank" rel="noopener" className="inline-block mt-auto px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">View Live Site</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 