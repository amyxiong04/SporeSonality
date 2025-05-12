'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useServerAction } from '@/hooks/useServerAction'
import { submitQuizResult } from '@/actions/submit-result'
import { supabase } from '@/lib/supabase'

type Mushroom = {
  id: number
  name: string
  emoji: string
  description: string
}

export default function ResultPage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [mushroom, setMushroom] = useState<Mushroom | null>(null)

  // Parse traits from URL
  const mushroom_id = Number(searchParams.get('mushroom_id'))
  const spore_chaos = Number(searchParams.get('spore_chaos'))
  const light_affinity = Number(searchParams.get('light_affinity'))
  const earthiness = Number(searchParams.get('earthiness'))
  const social_cluster = Number(searchParams.get('social_cluster'))
  const mystique_level = Number(searchParams.get('mystique_level'))

  const { execute, isPending, error } = useServerAction(submitQuizResult)

  useEffect(() => {
    async function saveAndLoadResult() {
      setStatus('saving')

      const { data: authData } = await supabase.auth.getUser()
      const rawUserId = authData?.user?.id
      const user_id =
        typeof rawUserId === 'string' && /^[0-9a-fA-F-]{36}$/.test(rawUserId)
          ? rawUserId
          : null

      // Validate numeric values
      const allValid = [mushroom_id, spore_chaos, light_affinity, earthiness, social_cluster, mystique_level].every(
        (val) => typeof val === 'number' && !isNaN(val)
      )

      if (!allValid) {
        console.error('Invalid query params')
        setStatus('error')
        return
      }

      // Save quiz result to DB
      const result = await submitQuizResult({
        user_id,
        mushroom_id,
        spore_chaos,
        light_affinity,
        earthiness,
        social_cluster,
        mystique_level,
      })

      if (result.error) {
        console.error('Insert failed:', result.error)
        setStatus('error')
        return
      }

      // Fetch mushroom details for display
      const { data: mushData, error: mushErr } = await supabase
        .from('mushrooms')
        .select('*')
        .eq('id', mushroom_id)
        .single()

      if (mushErr || !mushData) {
        console.error('Failed to fetch mushroom info:', mushErr)
        setStatus('error')
        return
      }

      setMushroom(mushData)
      setStatus('success')
    }

    saveAndLoadResult()
  }, [
    mushroom_id,
    spore_chaos,
    light_affinity,
    earthiness,
    social_cluster,
    mystique_level,
  ])

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Your Mushroom Personality 🍄</h1>

      {status === 'saving' && <p>Saving your result...</p>}

      {status === 'success' && mushroom && (
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">
            {mushroom.name} {mushroom.emoji}
          </h2>
          <p className="text-gray-600 italic">{mushroom.description}</p>
        </div>
      )}

      {status === 'error' && (
        <div className="text-red-600">
          Something went wrong while saving your result or loading the mushroom info.
        </div>
      )}
    </div>
  )
}




