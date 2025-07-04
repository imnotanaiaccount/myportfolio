import { motion } from 'framer-motion';
import React from 'react'; // Added missing import for React
import projects from '../data/projects';

export default function Examples() {
  return (
    <section className="py-32 bg-riva-blue dark:bg-riva-dark-blue relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-riva-blue mb-6 font-sans">
          Riva in Action
        </h2>
        <p className="text-xl text-riva-blue max-w-3xl mx-auto leading-relaxed">
          See how we've helped businesses like yours achieve <span className="font-bold text-riva-blue">real results</span> and <span className="font-bold text-riva-blue">measurable growth</span>
        </p>
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map(project => (
            <div key={project.name} className="rounded-2xl shadow-lg bg-riva-light-blue dark:bg-riva-dark-card p-6 flex flex-col">
              <img src={project.screenshot} alt={project.name} className="rounded-xl mb-4 w-full aspect-video object-cover" />
              <div className="flex items-center gap-3 mb-2">
                {project.logo && <img src={project.logo} alt="" className="w-10 h-10 rounded-full" />}
                <h3 className="text-xl font-bold">{project.name}</h3>
              </div>
              <p className="text-riva-blue-dark dark:text-riva-muted mb-2">{project.description}</p>
              <div className="flex gap-2 mb-2 flex-wrap">
                {project.tech.map(t => (
                  <span key={t} className="px-3 py-1 bg-riva-blue-light text-riva-blue-dark rounded-full text-xs font-semibold">{t}</span>
                ))}
              </div>
              {project.testimonial && (
                <blockquote className="italic text-sm text-riva-blue-dark dark:text-riva-muted mb-2">"{project.testimonial}"</blockquote>
              )}
              {project.client && (
                <div className="text-xs text-riva-blue-light dark:text-riva-muted mb-2">{project.client}</div>
              )}
              <a href={project.url} target="_blank" rel="noopener" className="inline-block mt-auto px-5 py-2 bg-riva-blue text-white rounded-lg font-semibold hover:bg-riva-blue-dark transition">View Live Site</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 