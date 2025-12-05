import type { SequenceElement } from '@/types/patternPrediction'

export const generateSequenceElement = (
  id: number,
  value: string
): SequenceElement => {
  return {
    id,
    value,
    predicted: false,
    correct: null,
  }
}

