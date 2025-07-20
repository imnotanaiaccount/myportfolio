import React, { useState, useEffect } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { validateEmail, validatePhone, validateUrl, formatPhoneNumber, formatUrl } from '../utils/validation';
import { STRIPE_PLANS, calculateTotals } from '../utils/stripe';

// Load Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Stripe card element styling
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#ffffff',
      '::placeholder': {
        color: '#9ca3af',
      },
      backgroundColor: 'transparent',
    },
    invalid: {
      color: '#ef4444',
    },
  },
};

// Payment form component
const PaymentForm = ({ formData, setFormData, errors, setErrors, handleSubmit, isSubmitting, selectedPlan, totals, showPayment }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = type === 'checkbox' ? checked : value;

    // Apply formatting for specific fields
    if (name === 'phone') {
      processedValue = formatPhoneNumber(value);
    } else if (name === 'website') {
      processedValue = formatUrl(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Show payment fields for paid plans
    if (name === 'selectedPlan') {
      setFormData(prev => ({ ...prev, showPayment: value !== 'trial' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const validation = validateField(name, value);
    
    if (!validation.isValid) {
      setErrors(prev => ({
        ...prev,
        [name]: validation.message
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return validateEmail(value);
      case 'phone':
        return validatePhone(value);
      case 'website':
        return validateUrl(value);
      case 'name':
        return value.trim() ? { isValid: true, message: '' } : { isValid: false, message: 'Name is required' };
      case 'agreeToTerms':
        return value ? { isValid: true, message: '' } : { isValid: false, message: 'You must agree to the terms' };
      default:
        return { isValid: true, message: '' };
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate required fields
    ['name', 'email'].forEach(field => {
      const validation = validateField(field, formData[field]);
      if (!validation.isValid) {
        newErrors[field] = validation.message;
        isValid = false;
      }
    });

    // Validate payment fields if required
    if (showPayment) {
      // Validate Stripe card element
      if (elements) {
        const cardElement = elements.getElement(CardElement);
        if (cardElement) {
          const { error } = cardElement;
          if (error) {
            newErrors.card = error.message;
            isValid = false;
          }
        }
      }
      
      // Validate terms agreement
      const termsValidation = validateField('agreeToTerms', formData.agreeToTerms);
      if (!termsValidation.isValid) {
        newErrors.agreeToTerms = termsValidation.message;
        isValid = false;
      }
    } else {
      // For trial, only need to agree to terms
      const termsValidation = validateField('agreeToTerms', formData.agreeToTerms);
      if (!termsValidation.isValid) {
        newErrors.agreeToTerms = termsValidation.message;
        isValid = false;
      }
    }

    // Validate optional fields if they have content
    if (formData.phone) {
      const phoneValidation = validatePhone(formData.phone);
      if (!phoneValidation.isValid) {
        newErrors.phone = phoneValidation.message;
        isValid = false;
      }
    }

    if (formData.website) {
      const urlValidation = validateUrl(formData.website);
      if (!urlValidation.isValid) {
        newErrors.website = urlValidation.message;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (showPayment && stripe && elements) {
      // Create payment method for paid plans
      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || undefined,
          },
        });

        if (error) {
          setErrors(prev => ({
            ...prev,
            card: error.message
          }));
          return;
        }

        // Submit with payment method
        await handleSubmit(paymentMethod.id);
      }
    } else {
      // Submit trial without payment
      await handleSubmit(null);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-5">
      {/* Basic Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`w-full peer min-h-[48px] ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
            placeholder="Your Name *"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`w-full peer min-h-[48px] ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
            placeholder="Email Address *"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          id="business"
          name="business"
          value={formData.business}
          onChange={handleChange}
          className="w-full peer min-h-[44px]"
          placeholder="Business Name (optional)"
        />
        
        <div className="relative">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full peer min-h-[44px] ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
            placeholder="Phone (optional)"
          />
          {errors.phone && (
            <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full peer min-h-[44px] ${errors.website ? 'border-red-500 focus:border-red-500' : ''}`}
            placeholder="Website (optional)"
          />
          {errors.website && (
            <p className="text-red-400 text-sm mt-1">{errors.website}</p>
          )}
        </div>
        
        <select
          id="leadGoal"
          name="leadGoal"
          value={formData.leadGoal}
          onChange={handleChange}
          className="w-full peer min-h-[44px] text-gray-400"
        >
          <option value="" disabled>Monthly Lead Goal (optional)</option>
          <option value="1-5">1-5</option>
          <option value="6-15">6-15</option>
          <option value="16-30">16-30</option>
          <option value="31+">31+</option>
        </select>
      </div>

      <textarea
        id="idealClient"
        name="idealClient"
        value={formData.idealClient}
        onChange={handleChange}
        rows={3}
        className="w-full peer min-h-[48px]"
        placeholder="Describe your ideal client (optional)"
      />

      {/* Payment Information - Only show for paid plans */}
      {showPayment && (
        <div className="border-t border-white/10 pt-6 mt-6">
          <h4 className="text-lg font-semibold text-white mb-4">Payment Information</h4>
          
          <div className="relative">
            <div className={`w-full peer min-h-[48px] p-3 border rounded-lg ${errors.card ? 'border-red-500' : 'border-white/20'}`}>
              <CardElement options={cardElementOptions} />
            </div>
            {errors.card && (
              <p className="text-red-400 text-sm mt-1">{errors.card}</p>
            )}
          </div>
        </div>
      )}

      {/* Terms Agreement */}
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="agreeToTerms"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleChange}
          className="mt-1"
        />
        <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
          I agree to the{' '}
          <a href="/terms-of-use" target="_blank" className="text-blue-400 hover:text-blue-300 underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy-policy" target="_blank" className="text-blue-400 hover:text-blue-300 underline">
            Privacy Policy
          </a>
          *
        </label>
      </div>
      {errors.agreeToTerms && (
        <p className="text-red-400 text-sm mt-1">{errors.agreeToTerms}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !stripe}
        className="btn-apple-primary w-full text-lg py-5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Processing...
          </span>
        ) : (
          `${selectedPlan.buttonText} ${showPayment ? `- $${totals.total}` : ''}`
        )}
      </button>
    </form>
  );
};

// Main SignupForm component
const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    website: '',
    idealClient: '',
    leadGoal: '',
    selectedPlan: 'trial',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  const selectedPlan = STRIPE_PLANS[formData.selectedPlan];
  const totals = calculateTotals(selectedPlan);
  const showPayment = formData.selectedPlan !== 'trial';

  // On mount, read selected plan from localStorage (if present)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPlan = localStorage.getItem('selectedPlan');
      let plan = 'trial';
      if (storedPlan && STRIPE_PLANS[storedPlan]) {
        plan = storedPlan;
        localStorage.removeItem('selectedPlan');
      }
      setFormData(prev => ({ ...prev, selectedPlan: plan }));
    }
  }, []);

  const handleSubmit = async (paymentMethodId) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setOrderConfirmation(null);

    // Process form data for submission
    const submissionData = {
      ...formData,
      email: formData.email.trim(),
      website: formData.website ? validateUrl(formData.website).url : '',
      phone: formData.phone ? formData.phone.trim() : '',
      paymentMethodId
    };

    try {
      const response = await fetch('/.netlify/functions/stripe-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });
      const result = await response.json();
      if (response.ok) {
        setSubmitStatus({ type: 'success', message: result.message });
        setOrderConfirmation(result.orderConfirmation);
        setFormData({
          name: '',
          business: '',
          email: '',
          phone: '',
          website: '',
          idealClient: '',
          leadGoal: '',
          selectedPlan: 'trial',
          agreeToTerms: false
        });
        setErrors({});
      } else {
        setSubmitStatus({ type: 'error', message: result.error || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Order confirmation component
  const OrderConfirmation = ({ confirmation }) => (
    <div className="glass-strong p-8 rounded-2xl border border-green-500/30">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h3>
        <p className="text-gray-300">Thank you for choosing Riva</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Order ID:</span>
          <span className="text-white font-mono">{confirmation.orderId}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Confirmation #:</span>
          <span className="text-white font-mono">{confirmation.confirmationNumber}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Plan:</span>
          <span className="text-white">{confirmation.plan}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Leads:</span>
          <span className="text-white">{confirmation.leads} per month</span>
        </div>
        {confirmation.subtotal > 0 && (
          <>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Subtotal:</span>
              <span className="text-white">${confirmation.subtotal}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Tax:</span>
              <span className="text-white">${confirmation.taxAmount}</span>
            </div>
            <div className="border-t border-white/20 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">Total:</span>
                <span className="text-white font-bold text-lg">${confirmation.total}</span>
              </div>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <div className="flex justify-between items-center text-sm">
                <span className="text-blue-300">Your Profit Margin:</span>
                <span className="text-blue-300 font-bold">{confirmation.profitMargin}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-blue-300">Net Profit:</span>
                <span className="text-blue-300 font-bold">${confirmation.netProfit}</span>
              </div>
            </div>
          </>
        )}
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Date:</span>
          <span className="text-white">{new Date(confirmation.date).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-blue-300 text-sm">
          A confirmation email has been sent to <strong>{confirmation.customerEmail}</strong> with your login details and next steps.
        </p>
      </div>
    </div>
  );

  // If order confirmation is shown, display it instead of the form
  if (orderConfirmation) {
    return (
      <section id="signup" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-black space-bg">
        <div className="max-w-2xl mx-auto">
          <OrderConfirmation confirmation={orderConfirmation} />
        </div>
      </section>
    );
  }

  return (
    <section id="signup" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-black space-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight">
            Sign Up <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">for Your Plan</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Complete the form below to get started. All plans include pre-qualified leads and full support.
          </p>
        </div>

        {/* Signup/payment form for the selected plan only */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-strong p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              {selectedPlan.buttonText}
            </h3>
            
            {/* Order Summary for Paid Plans */}
            {showPayment && (
              <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <h4 className="text-lg font-semibold text-white mb-3">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Plan:</span>
                    <span className="text-white">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Subtotal:</span>
                    <span className="text-white">${totals.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Tax ({(totals.taxRate * 100)}%):</span>
                    <span className="text-white">${totals.taxAmount}</span>
                  </div>
                  <div className="border-t border-white/20 pt-2">
                    <div className="flex justify-between font-bold">
                      <span className="text-white">Total:</span>
                      <span className="text-white text-lg">${totals.total}</span>
                    </div>
                  </div>
                  <div className="bg-blue-500/10 p-2 rounded text-xs">
                    <div className="flex justify-between">
                      <span className="text-blue-300">Stripe Fee:</span>
                      <span className="text-blue-300">${totals.stripeFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">Your Profit:</span>
                      <span className="text-blue-300 font-bold">${totals.netProfit}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {selectedPlan.id === 'enterprise' ? (
              <div className="glass-strong p-8 rounded-2xl text-center">
                <h3 className="text-2xl font-bold text-white mb-6">Custom Enterprise Plan</h3>
                <p className="text-gray-300 mb-6">Contact us for a custom quote and unlimited leads, integrations, and dedicated support.</p>
                <a href="#contact" className="btn-apple-primary w-full py-4 text-lg font-bold rounded-full">Contact Us</a>
              </div>
            ) : (
              <Elements stripe={stripePromise}>
                <PaymentForm
                  formData={formData}
                  setFormData={setFormData}
                  errors={errors}
                  setErrors={setErrors}
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  selectedPlan={selectedPlan}
                  totals={totals}
                  showPayment={showPayment}
                />
              </Elements>
            )}

            {/* Status Message */}
            {submitStatus && (
              <div className={`p-4 rounded-lg mt-4 ${
                submitStatus.type === 'success' 
                  ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                  : 'bg-red-500/20 border border-red-500/30 text-red-300'
              }`}>
                {submitStatus.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm; 