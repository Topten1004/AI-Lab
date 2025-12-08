export interface SequenceElement {
  id: number
  value: string
  predicted: boolean
  correct: boolean | null
}

export interface BehavioralMetrics {
  stability?: number
  variability?: number
  deviation?: number
  reactivity?: number
}

export interface LogEntry {
  id: number
  timestamp: string
  message: string
  type: 'sequence' | 'prediction' | 'correct' | 'incorrect' | 'status' | 'metric' | 'analysis' | 'adaptation' | 'anomaly'
  metrics?: BehavioralMetrics
  details?: string
}

