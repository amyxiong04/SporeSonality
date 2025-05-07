'use client'

import { useState } from 'react'

export type TraitScores = {
  spore_chaos: number
  light_affinity: number
  earthiness: number
  social_cluster: number
  mystique_level: number
}

export const defaultTraits: TraitScores = {
  spore_chaos: 0,
  light_affinity: 0,
  earthiness: 0,
  social_cluster: 0,
  mystique_level: 0,
}

export function useQuizState(totalQuestions = 2) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [traits, setTraits] = useState<TraitScores>(defaultTraits)

  const next = () => setCurrentStep((prev) => prev + 1)
  const back = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  const answerQuestion = (choice: number, traitDeltas: Partial<TraitScores>) => {
    setAnswers((prev) => [...prev, choice])
    setTraits((prev) => {
      const updated = { ...prev }
      for (const key in traitDeltas) {
        const k = key as keyof TraitScores
        updated[k] += traitDeltas[k] ?? 0
      }
      return updated
    })
    next()
  }

  const reset = () => {
    setCurrentStep(0)
    setAnswers([])
    setTraits(defaultTraits)
  }

  return {
    currentStep,
    answers,
    traits,
    next,
    back,
    answerQuestion,
    reset, 
  }
}
