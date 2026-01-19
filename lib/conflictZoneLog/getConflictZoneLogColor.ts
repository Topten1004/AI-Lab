import type { LogEntry } from '@/types/conflictZone'

export const getConflictZoneLogColor = (type: LogEntry['type']): string => {
  switch (type) {
    case 'domination':
      return 'text-lab-accent'
    case 'adaptation':
      return 'text-lab-warning'
    case 'conflict':
      return 'text-red-500'
    case 'balance':
      return 'text-lab-text/70'
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

