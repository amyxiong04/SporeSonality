'use client'

import { useQuizState } from '@/lib/useQuizState'

const questions = [
  {
    text: 'You find a glowing mushroom ring in the forest. What do you do?',
    options: [
      {
        text: 'Dance in it!',
        traits: { spore_chaos: 2, mystique_level: 1 }
      },
      {
        text: 'Carefully document it.',
        traits: { light_affinity: 2, earthiness: 1 }
      }
    ]
  },
  {
    text: 'A squirrel offers you a golden acorn.',
    options: [
      {
        text: 'Eat it on the spot.',
        traits: { spore_chaos: 1, social_cluster: 2 }
      },
      {
        text: 'Save it and study its properties.',
        traits: { mystique_level: 2, earthiness: 1 }
      }
    ]
  }
]

function getMushroomType(traits: ReturnType<typeof useQuizState>['traits']) {
  const total = Object.values(traits).reduce((a, b) => a + b, 0)

  if (traits.spore_chaos > 3) return 'Fly Agaric 🍄'
  if (traits.light_affinity > 3) return 'Oyster 🌼'
  if (traits.mystique_level > 3) return 'Morel 🌙'
  return 'Puffball 💨'
}

export default function QuizPage() {
  const { currentStep, traits, answerQuestion, back, reset } = useQuizState(questions.length)

  const current = questions[currentStep]

  if (currentStep >= questions.length) {
    const result = getMushroomType(traits)

    return (
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">You are a {result}</h1>
        <p className="mb-6">Your mushroom essence has been revealed.</p>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          onClick={reset}
        >
          Restart Quiz
        </button>
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


