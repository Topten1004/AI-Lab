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
    default:
      return 'text-lab-text'
  }
}

