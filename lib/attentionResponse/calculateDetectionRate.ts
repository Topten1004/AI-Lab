import type { Stimulus } from '@/types/attentionResponse'

export const calculateDetectionRate = (
  stimuli: Stimulus[],
  willDetect: boolean
): number => {
  const total = stimuli.length + 1
  const detected = stimuli.filter(s => s.detected).length + (willDetect ? 1 : 0)
  return Math.round((detected / total) * 100)
}

