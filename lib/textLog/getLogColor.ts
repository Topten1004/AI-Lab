import type { LogEntry } from '@/types/attentionResponse'

export const getLogColor = (type: LogEntry['type']): string => {
  switch (type) {
    case 'stimulus':
      return 'text-lab-accent'
    case 'detection':
      return 'text-lab-accent'
    case 'miss':
      return 'text-lab-warning'
    case 'status':
      return 'text-lab-text/50'
    default:
      return 'text-lab-text'
  }
}

