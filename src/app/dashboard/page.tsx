'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { getLatestResult } from '@/actions/queries/getLatestResult'

export default function DashboardPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadResult() {
      const { data: authData } = await supabase.auth.getUser()
      const user_id = authData?.user?.id
      if (!user_id) return

      const { data, error } = await getLatestResult(user_id)
      if (!error) setResult(data)
      setLoading(false)
    }

    loadResult()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {loading && <p>Loading your latest result...</p>}

      {result ? (
        <div>
          <h2 className="text-xl font-bold">You are a {result.mushroom_name} {result.mushroom_emoji}</h2>
          <p className="text-sm italic text-gray-500">{result.mushroom_description}</p>
          <p>Spore Chaos: {result.spore_chaos}</p>
          <p>Light Affinity: {result.light_affinity}</p>
          <p>Earthiness: {result.earthiness}</p>
          <p>Social Cluster: {result.social_cluster}</p>
          <p>Mystique Level: {result.mystique_level}</p>
        </div>
      ) : (
        !loading && <p>No result found. Try taking the quiz!</p>
      )}
    </div>
  )
}




