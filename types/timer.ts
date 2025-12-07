export interface TimerState {
  hours: number
  minutes: number
  seconds: number
  totalSeconds: number
  isPaused: boolean
}

export interface TimerControls {
  pause: () => void
  resume: () => void
  reset: () => void
  toggle: () => void
}

