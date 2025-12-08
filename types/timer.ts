export interface TimerState {
  hours: number
  minutes: number
  seconds: number
  totalSeconds: number
  isPaused: boolean
}

export interface Lap {
  id: string
  time: number
  lapTime: number
  timestamp: number
}

export interface TimerControls {
  pause: () => void
  resume: () => void
  reset: () => void
  toggle: () => void
  recordLap: () => void
  clearLaps: () => void
}

export interface TimerStats {
  fastestLap: number | null
  slowestLap: number | null
  averageLapTime: number | null
  totalLaps: number
}

