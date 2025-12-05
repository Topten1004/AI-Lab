import type { Stimulus } from '@/types/attentionResponse'

export const filterOldStimuli = (
  stimuli: Stimulus[],
  maxAge: number = 8000
): Stimulus[] => {
  return stimuli.filter(s => Date.now() - s.timestamp < maxAge)
}

