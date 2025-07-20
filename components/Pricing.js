// All pricing and plan data is sourced from STRIPE_PLANS in utils/stripe.js. This is the single source of truth for pricing.
import React from 'react';
import { STRIPE_PLANS } from '../utils/stripe';

export default function Pricing() {
  // Convert STRIPE_PLANS object to array and sort for display order
  const plans = [
    STRIPE_PLANS.trial,
    STRIPE_PLANS.starter,
    STRIPE_PLANS.pro,
    STRIPE_PLANS.payperlead,
    STRIPE_PLANS.enterprise
  ];

  const scrollToSignup = () => {
    const el = document.getElementById('signup');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlanClick = (planId) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedPlan', planId);
      scrollToSignup();
    }
  };

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-black space-bg">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Pricing & Plans</h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto font-light mb-6">
          Choose the plan that fits your business. Upgrade, downgrade, or cancel anytime. No hidden fees.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
        {plans.map((plan, idx) => (
          <div
            key={plan.id}
            className={`rounded-3xl p-8 shadow-xl border-2 ${plan.popular ? 'border-blue-400 animate-glow-card ring-2 ring-blue-400/30 bg-white/10' : 'border-white/10 bg-white/5'} flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200`}
            onClick={() => handlePlanClick(plan.id)}
            tabIndex={0}
            role="button"
            aria-label={`Select ${plan.name}`}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handlePlanClick(plan.id)}
          >
            <h2 className="text-2xl font-bold mb-2 text-white">{plan.name}</h2>
            <div className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {plan.price === 0 ? (plan.id === 'trial' ? 'Free' : 'Custom') : `$${plan.price}${plan.duration === 'per month' ? '/mo' : plan.duration === 'per lead' ? '/lead' : ''}`}
            </div>
            <ul className="text-gray-300 text-base mb-6 space-y-2 text-left">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 inline-block"></span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="w-full mt-auto">
              <button
                className={`w-full py-4 text-lg font-bold rounded-full ${plan.id === 'enterprise' ? 'btn-apple-primary' : plan.id === 'payperlead' ? 'btn-apple-paid' : plan.id === 'trial' ? 'btn-apple-leadmagnet-solid' : 'btn-apple-primary'} ${plan.popular ? 'scale-105' : ''}`}
                onClick={e => { e.stopPropagation(); handlePlanClick(plan.id); }}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 