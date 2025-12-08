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

