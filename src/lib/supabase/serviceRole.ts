import { createClient } from '@supabase/supabase-js'

export function createServiceRoleClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-supabase-url.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'mock-service-role-key',
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  )
}
