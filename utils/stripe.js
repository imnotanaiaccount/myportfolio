import { loadStripe } from '@stripe/stripe-js';

// Stripe configuration
export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Optimized pricing strategy for maximum profit
export const STRIPE_PLANS = {
  trial: {
    id: 'trial',
    name: 'Free Trial',
    price: 0,
    leads: 5,
    duration: '1 month',
    taxRate: 0,
    stripePriceId: null, // No Stripe price for trial
    description: 'Up to 5 qualified leads (volume may vary)',
    features: [
      'Up to 5 pre-qualified leads (volume may vary)',
      'No credit card required',
      'Full lead details & contact info',
      'Email & phone support',
      'Cancel anytime'
    ],
    popular: false,
    buttonText: 'Start Free Trial'
  },
  starter: {
    id: 'starter',
    name: 'Starter Plan',
    price: 597, // Increased from $497 for better profit margin
    leads: 15,
    duration: 'per month',
    taxRate: 0.08,
    stripePriceId: process.env.STRIPE_STARTER_PRICE_ID,
    description: 'Up to 15 qualified leads per month (volume may vary)',
    features: [
      'Up to 15 pre-qualified leads per month (volume may vary)',
      'Priority lead delivery',
      'Full lead details & contact info',
      'Email & phone support',
      'Lead scoring & filtering',
      'Cancel anytime'
    ],
    popular: true,
    buttonText: 'Start Starter Plan'
  },
  pro: {
    id: 'pro',
    name: 'Pro Plan',
    price: 1197, // Increased from $997 for better profit margin
    leads: 35,
    duration: 'per month',
    taxRate: 0.08,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
    description: 'Up to 35 qualified leads per month (volume may vary)',
    features: [
      'Up to 35 pre-qualified leads per month (volume may vary)',
      'Priority lead delivery',
      'Full lead details & contact info',
      'Dedicated account manager',
      'Advanced lead scoring',
      'Custom lead criteria',
      'Cancel anytime'
    ],
    popular: false,
    buttonText: 'Start Pro Plan'
  },
  payperlead: {
    id: 'payperlead',
    name: 'Pay-Per-Lead',
    price: 35, // $35 per lead
    leads: 1,
    duration: 'per lead',
    taxRate: 0.08,
    stripePriceId: process.env.STRIPE_PAYPERLEAD_PRICE_ID,
    description: 'Buy leads one at a time. No subscription required. Volume may vary.',
    features: [
      '1 pre-qualified lead (as available)',
      'Full lead details & contact info',
      'No subscription required',
      'Email & phone support',
      'Cancel anytime'
    ],
    popular: false,
    buttonText: 'Order Lead'
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 0, // Custom pricing
    leads: 'Unlimited',
    duration: 'Custom',
    taxRate: 0.08,
    stripePriceId: null, // Handled via contact
    description: 'Unlimited leads (as available), custom integrations, dedicated support.',
    features: [
      'Unlimited pre-qualified leads (as available)',
      'Custom integrations',
      'Dedicated account manager',
      'White-glove onboarding',
      'Custom AI workflows',
      'Priority support',
      'Custom pricing & terms'
    ],
    popular: false,
    buttonText: 'Contact Us'
  }
};

// Calculate optimized totals with profit margins
export const calculateTotals = (plan, state = null) => {
  const subtotal = plan.price;
  const taxRate = plan.taxRate;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;
  
  // Profit analysis
  const stripeFee = total * 0.029 + 0.30; // 2.9% + 30¢
  const netProfit = total - stripeFee;
  const profitMargin = (netProfit / total) * 100;
  
  return {
    subtotal: Math.round(subtotal * 100) / 100,
    taxRate: taxRate,
    taxAmount: Math.round(taxAmount * 100) / 100,
    total: Math.round(total * 100) / 100,
    stripeFee: Math.round(stripeFee * 100) / 100,
    netProfit: Math.round(netProfit * 100) / 100,
    profitMargin: Math.round(profitMargin * 100) / 100
  };
};

// Security and validation functions
export const validateStripePayment = (paymentMethod) => {
  const errors = [];
  
  if (!paymentMethod) {
    errors.push('Payment method is required');
  }
  
  if (paymentMethod && paymentMethod.type !== 'card') {
    errors.push('Only card payments are accepted');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Customer metadata for tracking
export const createCustomerMetadata = (customerData) => ({
  business_name: customerData.business || 'N/A',
  website: customerData.website || 'N/A',
  lead_goal: customerData.leadGoal || 'N/A',
  ideal_client: customerData.idealClient || 'N/A',
  signup_source: 'riva_website',
  signup_date: new Date().toISOString()
});

// Subscription metadata
export const createSubscriptionMetadata = (plan, customerData) => ({
  plan_type: plan.id,
  leads_per_month: plan.leads,
  customer_name: customerData.name,
  customer_email: customerData.email,
  business_name: customerData.business || 'N/A',
  subscription_start: new Date().toISOString()
}); 