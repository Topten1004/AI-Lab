import type { Lap } from '@/types/timer'

const LAPS_STORAGE_KEY = 'session-timer-laps'

export const getStoredLaps = (): Lap[] => {
  if (typeof window === 'undefined') return []
  
  const stored = localStorage.getItem(LAPS_STORAGE_KEY)
  if (!stored) return []
  
  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

export const saveLaps = (laps: Lap[]): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(LAPS_STORAGE_KEY, JSON.stringify(laps))
}

export const clearStoredLaps = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(LAPS_STORAGE_KEY)
}

