import type { LogEntry } from '@/types/reactionTime'

export const getReactionTimeLogColor = (type: LogEntry['type']): string => {
  switch (type) {
    case 'stimulus':
      return 'text-lab-accent'
    case 'reaction':
      return 'text-lab-warning'
    case 'latency':
      return 'text-lab-accent'
    case 'status':
      return 'text-lab-text/50'
    case 'metric':
      return 'text-cyan-400'
    case 'anomaly':
      return 'text-orange-500'
    case 'performance':
      return 'text-green-400'
    case 'stability':
      return 'text-blue-400'
    case 'variability':
      return 'text-purple-400'
    default:
      return 'text-lab-text'
  }
}

