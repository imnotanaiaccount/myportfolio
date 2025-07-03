import { motion } from 'framer-motion';

const reasons = [
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
      </svg>
    ),
    title: "Premium, Detail-Driven Design",
    desc: "Every pixel matters. I craft experiences that are both beautiful and functional, with attention to every detail."
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="12" y1="20" x2="12" y2="10"/>
        <line x1="18" y1="20" x2="18" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="16"/>
      </svg>
    ),
    title: "Results-Focused Approach",
    desc: "Turn visitors into loyal clients with conversion-optimized designs and strategic user experience."
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
      </svg>
    ),
    title: "Seamless Automation",
    desc: "Save you time with intelligent workflows that handle repetitive tasks and streamline operations."
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <circle cx="12" cy="16" r="1"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: "Trusted Technology Stack",
    desc: "Built with modern, scalable technologies that ensure performance, security, and future-proof solutions."
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Personalized Service",
    desc: "Collaborative approach with ongoing support and strategic consulting to keep you ahead of the competition."
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: "Fast Delivery",
    desc: "Quick turnaround times without compromising quality. Get your project delivered on time, every time."
  },
];

export default function WhyChooseMe() {
  return (
    <section id="why" className="py-24 bg-facebook-bg dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-facebook dark:text-facebook mb-6 font-nunito">
            Why Choose Instagrow Media?
          </h2>
          <p className="text-xl text-facebook-light dark:text-dark-muted max-w-3xl mx-auto leading-relaxed">
            More than just a developer - I'm your strategic partner in digital success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/95 dark:bg-dark-card/95 rounded-3xl p-8 shadow-2xl backdrop-blur-md border border-white/30 dark:border-dark-border hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="mb-6 p-4 bg-facebook/10 dark:bg-facebook/20 rounded-2xl w-fit text-facebook dark:text-facebook group-hover:bg-facebook/20 dark:group-hover:bg-facebook/30 transition-all duration-300">
                {reason.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-facebook-dark dark:text-dark-text">
                {reason.title}
              </h3>
              
              <p className="text-facebook-light dark:text-dark-muted leading-relaxed">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 bg-white/95 dark:bg-dark-card/95 rounded-3xl p-12 shadow-2xl backdrop-blur-md border border-white/30 dark:border-dark-border"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-facebook dark:text-facebook mb-2">50+</div>
              <div className="text-facebook-light dark:text-dark-muted font-medium">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-facebook dark:text-facebook mb-2">100%</div>
              <div className="text-facebook-light dark:text-dark-muted font-medium">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-facebook dark:text-facebook mb-2">24/7</div>
              <div className="text-facebook-light dark:text-dark-muted font-medium">Support Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-facebook dark:text-facebook mb-2">5+</div>
              <div className="text-facebook-light dark:text-dark-muted font-medium">Years Experience</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 