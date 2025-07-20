import { FaUserCheck, FaMagic, FaHandshake } from 'react-icons/fa';

const steps = [
  {
    step: '1',
    icon: <FaUserCheck className="text-blue-400 text-3xl mb-2 animate-float-star" />,
    title: 'Tell Us Who You Want',
    description: 'Describe your ideal client or project. We use AI + human expertise to target your perfect prospects.'
  },
  {
    step: '2',
    icon: <FaMagic className="text-purple-400 text-3xl mb-2 animate-float-star" />,
    title: 'We Deliver Qualified Leads',
    description: 'You get exclusive, pre-validated leads—scored, summarized, and delivered instantly to your inbox or CRM.'
  },
  {
    step: '3',
    icon: <FaHandshake className="text-cyan-400 text-3xl mb-2 animate-float-star" />,
    title: 'You Close More Deals',
    description: 'Reach out, win the business, and grow. No contracts, no risk—first leads are free.'
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden bg-black space-bg">
      <div className="container-premium relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            <span className="text-sm font-medium text-gray-300">How It Works</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">Get Consistent, Qualified Leads</span>
            <br />
            <span className="gradient-text-futuristic">in 3 Simple Steps</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            No more chasing, cold calling, or wasted ad spend. Riva brings you ready-to-close prospects—so you can focus on what you do best.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {steps.map((phase, index) => (
            <div
              key={index}
              className={`text-center glass-strong border border-blue-400/20 rounded-2xl p-10 shadow-lg animate-fade-in`}
              style={{ animationDelay: `${index * 160}ms` }}
            >
              <div className="flex flex-col items-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-3 animate-glow-card">
                  <span className="text-2xl font-bold text-white">{phase.step}</span>
                </div>
                {phase.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{phase.title}</h4>
              <p className="text-gray-300 text-base leading-relaxed">{phase.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-10">
          <div className="glass-strong p-10 rounded-3xl max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '600ms' }}>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to see real results in your first month?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto">
              Start your 1-month trial and get up to 5 exclusive, pre-qualified leads—no contracts, no risk.
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center mb-4">
              <a href="#signup?plan=trial" className="btn-apple-primary text-lg px-12 py-6">
                Start My 1-Month Trial
                <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#signup?plan=starter"
                className="btn-apple-paid text-lg px-12 py-6"
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
};

export default HowItWorks; 