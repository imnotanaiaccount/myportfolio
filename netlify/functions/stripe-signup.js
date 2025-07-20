const Stripe = require('stripe');
const crypto = require('crypto');
const fs = require('fs').promises;
const { SupabaseClient } = require('@supabase/supabase-js');

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
  maxNetworkRetries: 3,
});

// Initialize Supabase
const supabase = new SupabaseClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Storage for signups
const SIGNUPS_FILE = '/tmp/signups.json';

// Optimized pricing strategy
const STRIPE_PLANS = {
  trial: {
    id: 'trial',
    name: 'Free Trial',
    price: 0,
    leads: 5,
    duration: '1 month',
    taxRate: 0,
    stripePriceId: null
  },
  starter: {
    id: 'starter',
    name: 'Starter Plan',
    price: 597,
    leads: 15,
    duration: 'per month',
    taxRate: 0.08,
    stripePriceId: process.env.STRIPE_STARTER_PRICE_ID
  },
  pro: {
    id: 'pro',
    name: 'Pro Plan',
    price: 1197,
    leads: 35,
    duration: 'per month',
    taxRate: 0.08,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID
  }
};

// Security configuration
const SECURITY_CONFIG = {
  MAX_REQUESTS_PER_IP: 3,
  RATE_LIMIT_WINDOW: 15 * 60 * 1000,
  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_LENGTH: 254,
  MAX_BUSINESS_LENGTH: 100,
  MAX_PHONE_LENGTH: 20,
  MAX_WEBSITE_LENGTH: 200,
  MAX_IDEAL_CLIENT_LENGTH: 500
};

// Rate limiting storage
const rateLimitStore = new Map();

// Rate limiting function
function checkRateLimit(clientIP) {
  const now = Date.now();
  const windowStart = now - SECURITY_CONFIG.RATE_LIMIT_WINDOW;
  
  if (!rateLimitStore.has(clientIP)) {
    rateLimitStore.set(clientIP, []);
  }
  
  const requests = rateLimitStore.get(clientIP);
  const validRequests = requests.filter(timestamp => timestamp > windowStart);
  rateLimitStore.set(clientIP, validRequests);
  
  if (validRequests.length >= SECURITY_CONFIG.MAX_REQUESTS_PER_IP) {
    return false;
  }
  
  validRequests.push(now);
  return true;
}

// Input sanitization
function sanitizeInput(input, maxLength = 100) {
  if (!input || typeof input !== 'string') return '';
  
  let sanitized = input.replace(/[\x00-\x1F\x7F]/g, '');
  sanitized = sanitized.trim();
  
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  return sanitized;
}

// Validate email format
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= SECURITY_CONFIG.MAX_EMAIL_LENGTH;
}

// Calculate totals with profit analysis
function calculateTotals(plan) {
  const subtotal = plan.price;
  const taxRate = plan.taxRate;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;
  
  // Profit analysis
  const stripeFee = total * 0.029 + 0.30;
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
}

// Generate order confirmation
function generateOrderConfirmation(signup, plan, totals, stripeData = null) {
  const orderId = crypto.randomBytes(8).toString('hex').toUpperCase();
  const confirmationNumber = `RIVA-${Date.now().toString().slice(-8)}`;
  
  return {
    orderId,
    confirmationNumber,
    customerName: signup.name,
    customerEmail: signup.email,
    plan: plan.name,
    leads: plan.leads,
    duration: plan.duration,
    subtotal: totals.subtotal,
    taxAmount: totals.taxAmount,
    total: totals.total,
    currency: 'USD',
    date: new Date().toISOString(),
    status: signup.isTrial ? 'trial_active' : 'payment_completed',
    stripeCustomerId: stripeData?.customerId,
    stripeSubscriptionId: stripeData?.subscriptionId,
    profitMargin: totals.profitMargin,
    netProfit: totals.netProfit
  };
}

// Store signup securely
async function storeSignup(data, clientIP, event, orderConfirmation) {
  const signup = {
    id: crypto.randomBytes(8).toString('hex'),
    timestamp: new Date().toISOString(),
    name: data.name,
    business: data.business,
    email: data.email,
    phone: data.phone,
    website: data.website,
    idealClient: data.idealClient,
    leadGoal: data.leadGoal,
    selectedPlan: data.selectedPlan,
    isTrial: data.isTrial,
    clientIP,
    userAgent: event.headers['user-agent'] || 'Unknown',
    status: data.isTrial ? 'trial_active' : 'payment_completed',
    orderConfirmation,
    stripeData: {
      customerId: orderConfirmation.stripeCustomerId,
      subscriptionId: orderConfirmation.stripeSubscriptionId
    }
  };
  
  try {
    // Ensure the file exists
    try {
      await fs.access(SIGNUPS_FILE);
    } catch {
      await fs.writeFile(SIGNUPS_FILE, '[]');
    }
    
    // Read existing signups
    const fileContent = await fs.readFile(SIGNUPS_FILE, 'utf8');
    let signups = [];
    
    try {
      signups = JSON.parse(fileContent);
    } catch (parseError) {
      console.error('Error parsing signups file, starting fresh:', parseError);
      signups = [];
    }
    
    // Add new signup to the beginning
    signups.unshift(signup);
    
    // Write back to file
    await fs.writeFile(SIGNUPS_FILE, JSON.stringify(signups, null, 2));
    
    console.log(`Signup stored successfully. Total signups: ${signups.length}`);
    return signup;
  } catch (error) {
    console.error('Error storing signup:', error);
    throw error;
  }
}

// Create Stripe customer
async function createStripeCustomer(customerData) {
  try {
    const customer = await stripe.customers.create({
      email: customerData.email,
      name: customerData.name,
      phone: customerData.phone || undefined,
      metadata: {
        business_name: customerData.business || 'N/A',
        website: customerData.website || 'N/A',
        lead_goal: customerData.leadGoal || 'N/A',
        ideal_client: customerData.idealClient || 'N/A',
        signup_source: 'riva_website',
        signup_date: new Date().toISOString()
      }
    });
    
    console.log('Stripe customer created:', customer.id);
    return customer;
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    throw error;
  }
}

// Create Stripe subscription
async function createStripeSubscription(customer, plan, paymentMethodId) {
  try {
    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });

    // Set as default payment method
    await stripe.customers.update(customer.id, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: plan.stripePriceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        plan_type: plan.id,
        leads_per_month: plan.leads,
        customer_name: customer.name,
        customer_email: customer.email,
        business_name: customer.metadata.business_name,
        subscription_start: new Date().toISOString()
      }
    });

    console.log('Stripe subscription created:', subscription.id);
    return subscription;
  } catch (error) {
    console.error('Error creating Stripe subscription:', error);
    throw error;
  }
}

// Process trial signup
async function processTrialSignup(customerData, clientIP, event) {
  const plan = STRIPE_PLANS.trial;
  const totals = calculateTotals(plan);
  
  // Create Stripe customer for trial
  const customer = await createStripeCustomer(customerData);
  
  // Generate order confirmation
  const orderConfirmation = generateOrderConfirmation(
    customerData, 
    plan, 
    totals, 
    { customerId: customer.id }
  );
  
  // Store signup
  const signup = await storeSignup(customerData, clientIP, event, orderConfirmation);
  
  return {
    success: true,
    customer,
    orderConfirmation,
    signup
  };
}

// Process paid signup
async function processPaidSignup(customerData, paymentMethodId, clientIP, event) {
  const plan = STRIPE_PLANS[customerData.selectedPlan];
  const totals = calculateTotals(plan);
  
  // Create Stripe customer
  const customer = await createStripeCustomer(customerData);
  
  // Create subscription
  const subscription = await createStripeSubscription(customer, plan, paymentMethodId);
  
  // Generate order confirmation
  const orderConfirmation = generateOrderConfirmation(
    customerData, 
    plan, 
    totals, 
    { 
      customerId: customer.id,
      subscriptionId: subscription.id
    }
  );
  
  // Store signup
  const signup = await storeSignup(customerData, clientIP, event, orderConfirmation);
  
  return {
    success: true,
    customer,
    subscription,
    orderConfirmation,
    signup
  };
}

exports.handler = async (event, context) => {
  // Security headers
  const headers = {
    'Access-Control-Allow-Origin': 'https://rivaofficial.netlify.app',
    'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Get client IP for rate limiting
  const clientIP = event.headers['client-ip'] || 
                  event.headers['x-forwarded-for']?.split(',')[0] || 
                  event.headers['x-real-ip'] || 
                  'unknown';

  try {
    // Rate limiting check
    if (!checkRateLimit(clientIP)) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({ 
          error: 'Too many signup attempts. Please try again later.',
          message: 'Rate limit exceeded'
        })
      };
    }

    // Validate Content-Type
    const contentType = event.headers['content-type'] || '';
    if (!contentType.includes('application/json')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid content type' })
      };
    }

    // Parse and validate JSON
    let parsedBody;
    try {
      parsedBody = JSON.parse(event.body);
    } catch (parseError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON format' })
      };
    }

    // Extract and sanitize data
    const data = {
      name: sanitizeInput(parsedBody.name, SECURITY_CONFIG.MAX_NAME_LENGTH),
      business: sanitizeInput(parsedBody.business, SECURITY_CONFIG.MAX_BUSINESS_LENGTH),
      email: sanitizeInput(parsedBody.email, SECURITY_CONFIG.MAX_EMAIL_LENGTH).toLowerCase(),
      phone: sanitizeInput(parsedBody.phone, SECURITY_CONFIG.MAX_PHONE_LENGTH),
      website: sanitizeInput(parsedBody.website, SECURITY_CONFIG.MAX_WEBSITE_LENGTH),
      idealClient: sanitizeInput(parsedBody.idealClient, SECURITY_CONFIG.MAX_IDEAL_CLIENT_LENGTH),
      leadGoal: sanitizeInput(parsedBody.leadGoal, 10),
      selectedPlan: parsedBody.selectedPlan,
      isTrial: parsedBody.isTrial,
      paymentMethodId: parsedBody.paymentMethodId
    };

    // Validate required fields
    if (!data.name || !data.email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Name and email are required' })
      };
    }

    // Validate email format
    if (!validateEmail(data.email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }

    // Validate plan
    const plan = STRIPE_PLANS[data.selectedPlan];
    if (!plan) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid plan selected' })
      };
    }

    // Process signup based on type
    let result;
    if (data.isTrial) {
      // Prevent duplicate free trials by email or IP
      const { data: existingTrials, error: trialCheckError } = await supabase
        .from('submissions')
        .select('id')
        .eq('plan', 'trial')
        .or(`email.eq.${data.email},clientIP.eq.${clientIP}`);
      if (trialCheckError) {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Error checking for existing trials' })
        };
      }
      if (existingTrials && existingTrials.length > 0) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'A free trial has already been used with this email or IP address.' })
        };
      }
      result = await processTrialSignup(data, clientIP, event);
    } else {
      // Only require payment method for paid plans
      if (!data.paymentMethodId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Payment method is required for paid plans' })
        };
      }
      result = await processPaidSignup(data, data.paymentMethodId, clientIP, event);
    }

    // Log successful signup (without sensitive data)
    console.log('Signup successful:', {
      name: data.name,
      email: data.email,
      plan: plan.name,
      isTrial: data.isTrial,
      orderId: result.orderConfirmation.orderId,
      total: result.orderConfirmation.total,
      profitMargin: result.orderConfirmation.profitMargin,
      netProfit: result.orderConfirmation.netProfit,
      clientIP,
      signupId: result.signup.id
    });

    // Success response
    const message = data.isTrial 
      ? `Welcome to Riva! Your free trial is now active. You'll receive up to ${plan.leads} qualified leads in your first month. Check your email for next steps.`
      : `Welcome to Riva! Your ${plan.name} is now active. You'll receive up to ${plan.leads} qualified leads monthly. Check your email for next steps.`;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message,
        success: true,
        signupId: result.signup.id,
        orderConfirmation: result.orderConfirmation,
        plan: plan.name,
        isTrial: data.isTrial,
        leads: plan.leads,
        totals: calculateTotals(plan),
        stripeData: {
          customerId: result.customer.id,
          subscriptionId: result.subscription?.id
        }
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    
    // Handle Stripe-specific errors
    if (error.type === 'StripeCardError') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Payment failed',
          message: error.message
        })
      };
    }
    
    if (error.type === 'StripeInvalidRequestError') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid payment information',
          message: 'Please check your payment details and try again.'
        })
      };
    }
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: 'Something went wrong. Please try again later.'
      })
    };
  }
}; 