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

