import type { Stimulus } from '@/types/reactionTime'

export const filterOldReactionStimuli = (
  stimuli: Stimulus[],
  maxAge: number = 10000
): Stimulus[] => {
  return stimuli.filter(s => Date.now() - s.timestamp < maxAge)
}

