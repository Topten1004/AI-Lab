export const getStoredTimer = (): number => {
  if (typeof window === 'undefined') return 0
  
  const stored = localStorage.getItem('session-timer-start')
  if (!stored) return 0
  
  const startTime = parseInt(stored, 10)
  const now = Date.now()
  const elapsedSeconds = Math.floor((now - startTime) / 1000)
  
  return elapsedSeconds
}

export const initializeTimer = (): number => {
  if (typeof window === 'undefined') return 0
  
  const stored = localStorage.getItem('session-timer-start')
  if (stored) {
    return getStoredTimer()
  }
  
  const startTime = Date.now()
  localStorage.setItem('session-timer-start', startTime.toString())
  return 0
}

