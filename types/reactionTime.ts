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
  type: 'stimulus' | 'reaction' | 'latency' | 'status'
  reactionTime?: number
}

