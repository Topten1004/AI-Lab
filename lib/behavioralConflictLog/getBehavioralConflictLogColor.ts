import type { LogEntry } from '@/types/behavioralConflict'

export const getBehavioralConflictLogColor = (type: LogEntry['type']): string => {
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
    default:
      return 'text-lab-text'
  }
}

