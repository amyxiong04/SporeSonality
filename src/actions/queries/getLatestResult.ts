'use server'

import { sql } from '@/lib/db'

export async function getLatestResult(user_id: string) {
  try {
    const rows = await sql`
      SELECT 
        qr.*, 
        m.name as mushroom_name,
        m.emoji as mushroom_emoji,
        m.description as mushroom_description
      FROM quiz_results qr
      JOIN mushrooms m ON qr.mushroom_id = m.id
      WHERE qr.user_id = ${user_id}
      ORDER BY qr.created_at DESC
      LIMIT 1;
    `

    if (rows.length === 0) {
      return { data: null, error: 'No result found' }
    }

    return { data: rows[0], error: null }
  } catch (err: any) {
    console.error('Error fetching latest result:', err.message || err)
    return { data: null, error: 'Failed to fetch result' }
  }
}

