import { readFileSync } from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'

// Service role is required for schema changes
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use only in server code
)

export async function initializeSchema() {
  const sql = readFileSync(path.join(process.cwd(), 'src/sql/schema.sql'), 'utf-8')

  const { error } = await supabase.rpc('execute_sql', { sql })
  if (error) throw new Error('Failed to initialize schema: ' + error.message)
}
