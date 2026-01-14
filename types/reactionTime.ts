export interface Stimulus {
  id: number
  timestamp: number
  reactionTime: number | null
  responded: boolean
}

export interface LogEntry {
  id: number
  timestamp: string
  message: string
  type: 'stimulus' | 'reaction' | 'latency' | 'status' | 'metric' | 'anomaly' | 'performance' | 'stability' | 'variability'
  reactionTime?: number
  experimentId?: string
  metrics?: {
    stability?: number
    variability?: number
    deviation?: number
    reactivity?: number
  }
}

