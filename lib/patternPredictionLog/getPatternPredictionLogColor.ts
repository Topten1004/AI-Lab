import type { LogEntry } from '@/types/patternPrediction'

export const getPatternPredictionLogColor = (type: LogEntry['type']): string => {
  switch (type) {
    case 'sequence':
      return 'text-lab-accent'
    case 'prediction':
      return 'text-lab-warning'
    case 'correct':
      return 'text-lab-accent'
    case 'incorrect':
      return 'text-red-500'
    case 'status':
      return 'text-lab-text/50'
    default:
      return 'text-lab-text'
  }
}

