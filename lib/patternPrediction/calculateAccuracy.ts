import type { SequenceElement } from '@/types/patternPrediction'

export const calculateAccuracy = (
  sequence: SequenceElement[],
  newElement: SequenceElement,
  isCorrect: boolean
): number => {
  const allPredictions = [...sequence, { ...newElement, predicted: true, correct: isCorrect }]
    .filter(s => s.predicted && s.correct !== null)
  const correctCount = allPredictions.filter(s => s.correct).length
  return allPredictions.length > 0
    ? Math.round((correctCount / allPredictions.length) * 100)
    : (isCorrect ? 100 : 0)
}

