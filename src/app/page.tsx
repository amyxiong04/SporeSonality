'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to SporeSonality 🍄</h1>
      <p className="text-center mb-8 max-w-md">
        A whimsical personality quiz where you journey through a magical forest to discover your inner mushroom.
      </p>
      <Link
        href="/quiz"
        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg text-lg transition"
      >
        Start the Quiz
      </Link>
    </main>
  )
}
