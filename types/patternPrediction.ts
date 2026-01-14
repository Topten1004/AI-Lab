export interface SequenceElement {
  id: number
  value: string
  predicted: boolean
  correct: boolean | null
}

export interface LogEntry {
  id: number
  timestamp: string
  message: string
  type: 'sequence' | 'prediction' | 'correct' | 'incorrect' | 'status' | 'adaptation' | 'metric' | 'anomaly' | 'performance' | 'stability' | 'variability'
  experimentId?: string
  metrics?: {
    stability?: number
    variability?: number
    deviation?: number
    reactivity?: number
  }
}

