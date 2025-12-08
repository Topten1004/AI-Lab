export interface Stimulus {
  id: number
  timestamp: number
  reactionTime: number | null
  responded: boolean
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
  type: 'stimulus' | 'reaction' | 'latency' | 'status' | 'metric' | 'analysis' | 'adaptation' | 'anomaly'
  reactionTime?: number
  metrics?: BehavioralMetrics
  details?: string
}

