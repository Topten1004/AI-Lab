import type { TimerState } from '@/types/timer'

export const formatTimer = (totalSeconds: number): TimerState => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return {
    hours,
    minutes,
    seconds,
    totalSeconds,
  }
}

export const formatTimerDisplay = (timer: TimerState): string => {
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0')
  }

  return `${formatNumber(timer.hours)}:${formatNumber(timer.minutes)}:${formatNumber(timer.seconds)}`
}

