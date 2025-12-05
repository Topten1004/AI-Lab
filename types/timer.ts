export interface TimerState {
  hours: number
  minutes: number
  seconds: number
  totalSeconds: number
}

export interface TimerConfig {
  startTime?: number
  paused?: boolean
}

