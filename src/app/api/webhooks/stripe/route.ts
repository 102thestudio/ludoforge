import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { createServiceRoleClient } from '@/lib/supabase/serviceRole'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = (await headers()).get('stripe-signature') || ''

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  const supabase = createServiceRoleClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId
        const stripeCustomerId = session.customer as string

        if (userId) {
          // Update user plan to PRO and save stripe ID
          const { error } = await supabase
            .from('users')
            .update({
              plan: 'PRO',
              stripe_id: stripeCustomerId,
              updated_at: new Date().toISOString()
            })
            .eq('id', userId)

          if (error) throw error
          console.log(`User ${userId} successfully upgraded to PRO.`)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const stripeCustomerId = subscription.customer as string

        // Downgrade user back to FREE
        const { error } = await supabase
          .from('users')
          .update({
            plan: 'FREE',
            updated_at: new Date().toISOString()
          })
          .eq('stripe_id', stripeCustomerId)

        if (error) throw error
        console.log(`Customer ${stripeCustomerId} subscription cancelled, downgraded to FREE.`)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error('Webhook database update error:', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
