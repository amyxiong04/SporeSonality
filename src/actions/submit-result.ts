'use server'

import { ServerActionResult } from '@/hooks/useServerAction'
import { sql } from '@/lib/db'
import { z } from 'zod'

const QuizResultSchema = z.object({
  user_id: z.string().uuid().optional().nullable(),  // ✅ allow undefined
  mushroom_id: z.number(),
  spore_chaos: z.number(),
  light_affinity: z.number(),
  earthiness: z.number(),
  social_cluster: z.number(),
  mystique_level: z.number(),
})

export type QuizResultForm = z.infer<typeof QuizResultSchema>

export async function submitQuizResult(
  result: QuizResultForm
): Promise<ServerActionResult<null>> {
  const safeInput = {
    ...result,
    user_id: result.user_id ?? null, // ✅ ensure null if undefined
  }

  const parsed = QuizResultSchema.safeParse(safeInput)

  if (!parsed.success) {
    return { data: null, error: parsed.error.issues[0]?.message ?? 'Invalid data' }
  }

  try {
    console.log('📥 SQL insert values:', parsed.data)

    await sql`
      INSERT INTO quiz_results (
        user_id,
        mushroom_id,
        spore_chaos,
        light_affinity,
        earthiness,
        social_cluster,
        mystique_level
      ) VALUES (
        ${parsed.data.user_id},
        ${parsed.data.mushroom_id},
        ${parsed.data.spore_chaos},
        ${parsed.data.light_affinity},
        ${parsed.data.earthiness},
        ${parsed.data.social_cluster},
        ${parsed.data.mystique_level}
      )
    `
    return { data: null }
  } catch (err: any) {
    console.error('❌ Error inserting quiz result:', err.message || err)
    return { data: null, error: err.message || 'Failed to insert quiz result' }
  }
}

