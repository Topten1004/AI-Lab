import type { Stimulus } from '@/types/reactionTime'

export const calculateAverageReactionTime = (
  stimuli: Stimulus[],
  newReactionTime: number
): number => {
  const allTimes = [...stimuli, { id: 0, timestamp: 0, reactionTime: newReactionTime, responded: true }]
    .filter(s => s.reactionTime !== null)
    .map(s => s.reactionTime!)
  return allTimes.length > 0 
    ? Math.round(allTimes.reduce((a, b) => a + b, 0) / allTimes.length)
    : newReactionTime
}

