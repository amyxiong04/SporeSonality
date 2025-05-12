'use client'

import { useState } from 'react'

export type ServerActionResult<T> = {
  data: T | null
  error?: string
}

export function useServerAction<TParams, TResult>(
  action: (params: TParams) => Promise<ServerActionResult<TResult>>
) {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = async (params: TParams): Promise<ServerActionResult<TResult>> => {
    setIsPending(true)
    setError(null)

    const result = await action(params)

    if (result.error) {
      setError(result.error)
    }

    setIsPending(false)
    return result
  }

  return { execute, isPending, error }
}
