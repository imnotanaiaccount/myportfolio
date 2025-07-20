import React, { useState } from 'react';
import { FaQuestionCircle, FaShieldAlt, FaUserCheck, FaRocket, FaCreditCard, FaCheckCircle, FaStar } from 'react-icons/fa';

const faqs = [
  {
    icon: <FaUserCheck className="text-blue-400 text-xl mr-2" />,
    q: 'Are the leads really exclusive to my business?',
    a: 'Yes. Every lead is AI-validated, scored, and manually checked for exclusivity. We never resell leads to multiple clients—your leads are yours alone.'
  },
  {
    icon: <FaStar className="text-yellow-400 text-xl mr-2" />,
    q: 'How do you ensure lead quality?',
    a: 'We use a combination of AI, human review, and direct verification to ensure every lead is real, ready to buy, and a good fit for your business.'
  },
  {
    icon: <FaRocket className="text-purple-400 text-xl mr-2" />,
    q: 'What happens after my free trial?',
    a: 'You’ll get a seamless upgrade prompt. You can choose pay-per-lead or a subscription plan—no contracts, cancel anytime.'
  },
  {
    icon: <FaCreditCard className="text-green-400 text-xl mr-2" />,
    q: 'Do I need a credit card to start?',
    a: 'No credit card is required for your free trial. You only pay if you choose to continue after your trial.'
  },
  {
    icon: <FaShieldAlt className="text-cyan-400 text-xl mr-2" />,
    q: 'Is my data secure and private?',
    a: 'All data is encrypted and never shared. We follow strict privacy and security protocols.'
  },
  {
    icon: <FaQuestionCircle className="text-yellow-400 text-xl mr-2" />,
    q: 'What types of businesses do you serve?',
    a: 'We help all service businesses—contractors, landscapers, real estate, B2B, and more. If you want more clients, we can help.'
  },
  {
    icon: <FaCheckCircle className="text-green-400 text-xl mr-2" />,
    q: 'What if I don’t close any leads?',
    a: 'You only pay for results. Your first leads are free, and there are no contracts or commitments. If you’re not satisfied, you don’t pay.'
  },
  {
    icon: <FaUserCheck className="text-blue-400 text-xl mr-2" />,
    q: 'How fast will I get leads?',
    a: 'Most clients receive their first lead within 24 hours of signup. Speed depends on your industry and targeting.'
  },
  {
    icon: <FaRocket className="text-purple-400 text-xl mr-2" />,
    q: 'Is there support if I have questions?',
    a: 'Yes! You get a dedicated account manager and fast support via email or phone. We’re here to help you succeed.'
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-black space-bg">
      {/* Removed per-section animated gradient overlay for seamless background */}
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight">
            Frequently Asked <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed px-4">
            Everything you need to know before getting started.
          </p>
        </div>
        <div className="space-y-6">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white/10 border border-blue-400/20 rounded-xl p-6 transition-all duration-400 cursor-pointer glass group animate-fade-in ${open === idx ? 'shadow-lg ring-2 ring-blue-400/40' : ''}`}
              style={{ animationDelay: `${idx * 120}ms` }}
              onClick={() => setOpen(open === idx ? null : idx)}
            >
              <div className="flex items-center mb-2">
                {item.icon}
                <div className={`font-bold text-white text-lg transition-colors duration-300 ${open === idx ? 'text-blue-300 underline' : ''}`}>{item.q}</div>
              </div>
              <div
                className={`text-gray-300 text-base overflow-hidden transition-all duration-400 ${open === idx ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}
                style={{ minHeight: open === idx ? 40 : 0 }}
              >
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 