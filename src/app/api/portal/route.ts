import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()

  // Get user session
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get user details from database to fetch Stripe Customer ID
  const { data: userData, error } = await supabase
    .from('users')
    .select('stripe_id')
    .eq('id', user.id)
    .single()

  if (error || !userData?.stripe_id) {
    return NextResponse.json({ error: 'No active subscription or customer profile found.' }, { status: 400 })
  }

  try {
    const origin = request.headers.get('origin') || 'http://localhost:3000'

    // Create Billing Portal Session
    const session = await stripe.billingPortal.sessions.create({
      customer: userData.stripe_id,
      return_url: `${origin}/dashboard`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Stripe Customer Portal Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
