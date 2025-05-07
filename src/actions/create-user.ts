'use server'

import bcrypt from 'bcryptjs'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use only in server-side files
)

export async function createUserEntry({
  id,
  email,
  displayName,
  password
}: {
  id: string
  email: string
  displayName: string
  password: string
}) {
  const password_hash = await bcrypt.hash(password, 10)

  const { error } = await supabase.from('users').insert([
    {
      id,
      email,
      display_name: displayName,
      password_hash
    }
  ])

  if (error) throw new Error(error.message)
}
