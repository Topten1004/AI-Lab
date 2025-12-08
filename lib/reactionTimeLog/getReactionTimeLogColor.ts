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
    case 'analysis':
      return 'text-blue-400'
    case 'adaptation':
      return 'text-purple-400'
    case 'anomaly':
      return 'text-red-400'
    default:
      return 'text-lab-text'
  }
}

