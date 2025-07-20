import React, { useState } from 'react';
import { FaStar, FaBolt, FaDollarSign, FaHome, FaUserTie, FaEye, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';
import LeadCard from './LeadCard';

const serviceIcon = (service) => {
  if (/real estate/i.test(service)) return <FaHome className="text-blue-400 mr-1" />;
  if (/cleaning/i.test(service)) return <FaBolt className="text-green-400 mr-1" />;
  if (/landscaping/i.test(service)) return <FaUserTie className="text-green-500 mr-1" />;
  return <FaStar className="text-purple-400 mr-1" />;
};

const urgencyIcon = (urgency) => {
  if (/featured/i.test(urgency)) return <FaStar className="text-yellow-400 mr-1 animate-pulse" />;
  if (/high/i.test(urgency)) return <FaBolt className="text-red-400 mr-1 animate-pulse" />;
  return <FaBolt className="text-gray-400 mr-1" />;
};

const valueIcon = <FaDollarSign className="text-green-400 mr-1" />;

const parallax = (index) => ({
  transform: `translateY(${index * 8}px)`
});

const leads = [
  {
    name: 'Jackson Investment Solutions',
    service: 'Real Estate Investor/Wholesaler',
    urgency: 'Featured Project',
    score: 10,
    notes: 'Generated 17 motivated seller leads in 30 days. $120k+ in new deals closed. Custom site built for conversion.',
    value: '$120,000+ closed',
    contact: 'info@jacksoninvestmentsolutions.com',
    projectUrl: 'https://jacksoninvestmentsolutions2.netlify.app/'
  },
  {
    name: 'Sarah L.',
    service: 'Landscaping',
    urgency: 'High',
    score: 9,
    notes: 'Booked 6 new clients in 2 weeks. $3,500 avg. project value. Ready to hire, verified address.',
    value: '$21,000 in new business',
    contact: 'sarah@greenscapepros.com',
    projectUrl: 'https://demo-landscaping-site.netlify.app/'
  },
  {
    name: 'Mike R.',
    service: 'Commercial Cleaning',
    urgency: 'High',
    score: 10,
    notes: 'Closed $24k contract from first 3 leads. 3 locations, verified business, urgent request.',
    value: '$24,000 contract',
    contact: 'mike@cleanprosolutions.com',
    projectUrl: 'https://demo-cleaning-site.netlify.app/'
  },
  {
    name: 'Lisa P.',
    service: 'Home Services',
    urgency: 'Medium',
    score: 8,
    notes: 'Secured 2 new jobs in 10 days. $2,000 est. project, ready-to-hire, verified address.',
    value: '$4,000 in new jobs',
    contact: 'lisa@homefixmasters.com',
    projectUrl: 'https://demo-homeservices-site.netlify.app/'
  },
];

export default function LeadExamples() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  return (
    <section id="lead-examples" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-black space-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight">
            See Real <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Lead Examples</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed px-4">
            Every lead is pre-validated, scored, and ready to close. Here’s what you can expect:
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-16">
          {leads.map((lead, index) => (
            <LeadCard
              key={index}
              lead={lead}
              expanded={expandedIndex === index}
              onExpand={() => setExpandedIndex(expandedIndex === index ? null : index)}
              onClose={() => setExpandedIndex(null)}
              isHero={false}
            />
          ))}
        </div>
        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">
              Try Riva Risk-Free for Your First Month (Up to 5 Qualified Leads)
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto px-4">
              Experience premium, pre-qualified leads—no contracts, no risk. Limited to new clients. No credit card required to start.
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center mb-4">
              <a 
                href="#signup?plan=trial" 
                className="btn-apple-primary inline-flex items-center px-8 py-4 text-white font-bold text-lg rounded-full hover:scale-105"
              >
                Start My 1-Month Trial
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#signup?plan=starter"
                className="btn-apple-paid inline-flex items-center px-8 py-4 text-white font-bold text-lg rounded-full hover:scale-105"
              >
                Get Started Now
              </a>
            </div>
            <span className="block text-xs text-gray-400 mt-3">Limited to new clients. Up to 5 leads in your first month. No credit card required to start.</span>
          </div>
        </div>
      </div>
    </section>
  );
} 