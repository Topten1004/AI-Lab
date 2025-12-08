import type { Lap } from '@/types/timer'

export interface TimerStats {
  fastestLap: number | null
  slowestLap: number | null
  averageLapTime: number | null
  totalLaps: number
}

export const calculateTimerStats = (laps: Lap[]): TimerStats => {
  if (laps.length === 0) {
    return {
      fastestLap: null,
      slowestLap: null,
      averageLapTime: null,
      totalLaps: 0,
    }
  }

  const lapTimes = laps.map((lap) => lap.lapTime)
  const fastestLap = Math.min(...lapTimes)
  const slowestLap = Math.max(...lapTimes)
  const totalLapTime = lapTimes.reduce((sum, time) => sum + time, 0)
  const averageLapTime = Math.round(totalLapTime / laps.length)

  return {
    fastestLap,
    slowestLap,
    averageLapTime,
    totalLaps: laps.length,
  }
}

