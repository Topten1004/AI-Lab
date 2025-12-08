export interface ConflictState {
  modelAPower: number
  modelBPower: number
  dominance: 'A' | 'B' | 'balanced'
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
  type: 'domination' | 'adaptation' | 'conflict' | 'balance' | 'status' | 'metric' | 'analysis' | 'anomaly'
  metrics?: BehavioralMetrics
  details?: string
}

