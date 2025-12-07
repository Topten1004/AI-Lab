export const TIMER_STORAGE_KEY = 'session-timer-start'
export const TIMER_PAUSED_KEY = 'session-timer-paused'
export const TIMER_PAUSED_TIME_KEY = 'session-timer-paused-time'

export const getStoredStartTime = (): number | null => {
  if (typeof window === 'undefined') return null
  
  const stored = localStorage.getItem(TIMER_STORAGE_KEY)
  if (!stored) return null
  
  return parseInt(stored, 10)
}

export const setStoredStartTime = (startTime: number): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(TIMER_STORAGE_KEY, startTime.toString())
}

export const clearStoredStartTime = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(TIMER_STORAGE_KEY)
  localStorage.removeItem(TIMER_PAUSED_KEY)
  localStorage.removeItem(TIMER_PAUSED_TIME_KEY)
}

export const getPausedState = (): boolean => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(TIMER_PAUSED_KEY) === 'true'
}

export const setPausedState = (paused: boolean): void => {
  if (typeof window === 'undefined') return
  if (paused) {
    localStorage.setItem(TIMER_PAUSED_KEY, 'true')
    localStorage.setItem(TIMER_PAUSED_TIME_KEY, Date.now().toString())
  } else {
    localStorage.removeItem(TIMER_PAUSED_KEY)
    localStorage.removeItem(TIMER_PAUSED_TIME_KEY)
  }
}

export const getPausedTime = (): number | null => {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(TIMER_PAUSED_TIME_KEY)
  if (!stored) return null
  return parseInt(stored, 10)
}

export const calculateElapsedTime = (startTime: number, pausedTime: number | null): number => {
  if (pausedTime) {
    return Math.floor((pausedTime - startTime) / 1000)
  }
  const now = Date.now()
  return Math.floor((now - startTime) / 1000)
}

