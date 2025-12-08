export interface Stimulus {
  id: number
  x: number
  y: number
  type: 'pattern' | 'signal'
  detected: boolean
  timestamp: number
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
  type: 'stimulus' | 'detection' | 'miss' | 'status' | 'metric' | 'analysis' | 'adaptation' | 'anomaly'
  metrics?: BehavioralMetrics
  details?: string
}

