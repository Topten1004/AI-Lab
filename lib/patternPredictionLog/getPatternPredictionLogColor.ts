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
    case 'adaptation':
      return 'text-lab-accent/80'
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

