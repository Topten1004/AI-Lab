import type { SequenceElement } from '@/types/patternPrediction'

export const limitSequenceLength = (
  sequence: SequenceElement[],
  maxLength: number = 8
): SequenceElement[] => {
  return sequence.length > maxLength ? sequence.slice(-maxLength) : sequence
}

