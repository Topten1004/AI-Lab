import type { Stimulus } from '@/types/reactionTime'

export const generateReactionStimulus = (id: number): Stimulus => {
  return {
    id,
    timestamp: Date.now(),
    reactionTime: null,
    responded: false,
  }
}

