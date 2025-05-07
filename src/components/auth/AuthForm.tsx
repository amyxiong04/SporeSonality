'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { createUserEntry } from '@/actions/create-user' 

type AuthFormProps = {
  type: 'login' | 'signup'
}

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    try {
      if (type === 'signup') {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) throw error

        const userId = data.user?.id
        if (userId) {
          // 🔐 Insert into your custom users table using server action
          await createUserEntry({
            id: userId,
            email,
            displayName: displayName || email.split('@')[0],
            password,
          })
        }

        router.push('/dashboard')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center">
        {type === 'login' ? 'Log In' : 'Sign Up'}
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {type === 'signup' && (
        <input
          type="text"
          placeholder="Display Name"
          className="w-full px-4 py-2 border rounded"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button type="submit" className="w-full bg-black text-white py-2 rounded">
        {type === 'login' ? 'Log In' : 'Sign Up'}
      </button>

      <p className="text-sm text-center">
        {type === 'login' ? (
          <>Don't have an account? <Link href="/auth/signup" className="underline">Sign up</Link></>
        ) : (
          <>Already have an account? <Link href="/auth/login" className="underline">Log in</Link></>
        )}
      </p>
    </form>
  )
}


