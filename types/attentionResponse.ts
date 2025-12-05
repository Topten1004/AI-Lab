export interface Stimulus {
  id: number
  x: number
  y: number
  type: 'pattern' | 'signal'
  detected: boolean
  timestamp: number
}

export interface LogEntry {
  id: number
  timestamp: string
  message: string
  type: 'stimulus' | 'detection' | 'miss' | 'status'
}

