import type { Stimulus } from '@/types/attentionResponse'

export const generateStimulus = (id: number): Stimulus => {
  return {
    id,
    x: Math.random() * 80 + 10, // 10-90%
    y: Math.random() * 80 + 10,
    type: Math.random() > 0.5 ? 'pattern' : 'signal',
    detected: false,
    timestamp: Date.now(),
  }
}

