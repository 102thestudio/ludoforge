import Stripe from 'stripe'

// Fallback to a mock key during the build step if STRIPE_SECRET_KEY is not defined.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_secret_key_ludoforge', {
  apiVersion: '2025-01-27' as any,
})
