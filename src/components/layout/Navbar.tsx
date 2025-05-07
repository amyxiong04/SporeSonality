'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser()
      setLoggedIn(!!data?.user)
    }
    checkAuth()

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      setLoggedIn(event === 'SIGNED_IN')
      if (event === 'SIGNED_OUT') {
        router.push('/') // Redirect to home on logout
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setLoggedIn(false)
  }

  return (
    <nav className="w-full p-4 bg-zinc-900 text-white flex justify-between items-center">
      <Link href="/" className="text-lg font-bold">🍄 SporeSonality</Link>

      <div className="space-x-4">
        <Link href="/quiz" className="hover:underline">Take the Quiz</Link>

        {loggedIn ? (
          <>
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <button onClick={handleLogout} className="hover:underline">Log Out</button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className="hover:underline">Log In</Link>
            <Link href="/auth/signup" className="hover:underline">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}
