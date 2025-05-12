'use client'

import { useRouter } from 'next/navigation'
import { useQuizState } from '@/lib/useQuizState'

const questions = [
  {
    text: 'You find a glowing mushroom ring in the forest. What do you do?',
    options: [
      { text: 'Dance in it wildly.', traits: { spore_chaos: 2, mystique_level: 1 } },
      { text: 'Sketch it carefully.', traits: { light_affinity: 2, earthiness: 1 } },
      { text: 'Sit quietly inside and reflect.', traits: { mystique_level: 2, social_cluster: 1 } },
    ],
  },
  {
    text: 'A squirrel offers you a golden acorn.',
    options: [
      { text: 'Eat it right away!', traits: { spore_chaos: 2, social_cluster: 1 } },
      { text: 'Store it in a hidden nook.', traits: { earthiness: 2, light_affinity: 1 } },
      { text: 'Ask the squirrel for its origin.', traits: { mystique_level: 2 } },
    ],
  },
  {
    text: 'You’re lost in the woods. What’s your plan?',
    options: [
      { text: 'Whistle and hope someone hears you.', traits: { social_cluster: 2, spore_chaos: 1 } },
      { text: 'Climb a tree and look around.', traits: { light_affinity: 2, spore_chaos: 1 } },
      { text: 'Consult the moss and listen to the wind.', traits: { mystique_level: 2, earthiness: 1 } },
    ],
  },
  {
    text: 'At a forest party, you are...',
    options: [
      { text: 'Leading the mushroom conga line.', traits: { spore_chaos: 2, social_cluster: 2 } },
      { text: 'Roasting herbs near the fire.', traits: { earthiness: 2 } },
      { text: 'Discussing stars with a badger.', traits: { mystique_level: 2, light_affinity: 1 } },
    ],
  },
  {
    text: 'A mysterious voice offers you a secret.',
    options: [
      { text: 'Accept without hesitation.', traits: { mystique_level: 2, spore_chaos: 1 } },
      { text: 'Decline politely but curiously.', traits: { light_affinity: 2 } },
      { text: 'Take notes for later.', traits: { earthiness: 2, light_affinity: 1 } },
    ],
  },
  {
    text: 'You stumble upon a hidden mushroom library.',
    options: [
      { text: 'Start reading everything.', traits: { light_affinity: 2, mystique_level: 1 } },
      { text: 'Sniff the pages to detect spores.', traits: { spore_chaos: 2 } },
      { text: 'Ask if anyone else knows about it.', traits: { social_cluster: 2 } },
    ],
  },
  {
    text: 'Pick a potion ingredient:',
    options: [
      { text: 'Moonwater from a crystal vial.', traits: { mystique_level: 2 } },
      { text: 'Fresh forest moss.', traits: { earthiness: 2 } },
      { text: 'Glowroot harvested under starlight.', traits: { light_affinity: 2, mystique_level: 1 } },
    ],
  },
  {
    text: 'Your mushroom house needs a roommate. You pick...',
    options: [
      { text: 'A chaotic raccoon who collects trinkets.', traits: { spore_chaos: 2, social_cluster: 1 } },
      { text: 'A quiet owl who reads poetry.', traits: { light_affinity: 2, mystique_level: 1 } },
      { text: 'A beetle who tends the garden.', traits: { earthiness: 2 } },
    ],
  },
]

function getMushroomId(traits: ReturnType<typeof useQuizState>['traits']): number {
  if (traits.spore_chaos > traits.light_affinity &&
      traits.spore_chaos > traits.mystique_level &&
      traits.spore_chaos > traits.earthiness &&
      traits.spore_chaos > traits.social_cluster) return 1 // Fly Agaric

  if (traits.light_affinity >= traits.spore_chaos &&
      traits.light_affinity >= traits.mystique_level &&
      traits.light_affinity >= traits.earthiness &&
      traits.light_affinity >= traits.social_cluster) return 2 // Oyster

  if (traits.mystique_level >= traits.spore_chaos &&
      traits.mystique_level >= traits.light_affinity &&
      traits.mystique_level >= traits.earthiness &&
      traits.mystique_level >= traits.social_cluster) return 3 // Morel

  return 4 // Puffball
}

export default function QuizPage() {
  const router = useRouter()
  const { currentStep, traits, answerQuestion, back, reset } = useQuizState(questions.length)

  const current = questions[currentStep]

  if (currentStep >= questions.length) {
    const mushroomId = getMushroomId(traits)

    return (
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">✨ Quiz Complete!</h1>
        <p className="mb-6">Ready to discover your mushroom essence?</p>

        <button
          className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700"
          onClick={() => {
            const query = new URLSearchParams({
              mushroom_id: mushroomId.toString(),
              spore_chaos: traits.spore_chaos.toString(),
              light_affinity: traits.light_affinity.toString(),
              earthiness: traits.earthiness.toString(),
              social_cluster: traits.social_cluster.toString(),
              mystique_level: traits.mystique_level.toString(),
            }).toString()

            router.push(`/result?${query}`)
          }}
        >
          View My Result 🍄
        </button>

        <div className="mt-6">
          <button
            onClick={reset}
            className="text-sm underline text-gray-500 hover:text-gray-700"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">{current.text}</h2>
      <div className="flex flex-col gap-4">
        {current.options.map((opt, i) => (
          <button
            key={i}
            className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
            onClick={() => answerQuestion(i, opt.traits)}
          >
            {opt.text}
          </button>
        ))}
      </div>
      {currentStep > 0 && (
        <button onClick={back} className="mt-6 text-sm underline text-gray-500">
          ← Go Back
        </button>
      )}
    </div>
  )
}

