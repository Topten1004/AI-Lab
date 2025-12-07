'use client'

import { useState, useEffect, useRef } from 'react'
import { formatTimer } from '@/lib/timer/formatTimer'
import {
  getStoredStartTime,
  setStoredStartTime,
  clearStoredStartTime,
  getPausedState,
  setPausedState,
  getPausedTime,
  calculateElapsedTime,
} from '@/lib/timer/manageTimerStorage'
import { getStoredLaps, saveLaps, clearStoredLaps } from '@/lib/timer/manageLaps'
import type { TimerState, TimerControls, Lap } from '@/types/timer'

export const useTimer = () => {
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [laps, setLaps] = useState<Lap[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const initializedRef = useRef(false)
  const startTimeRef = useRef<number | null>(null)
  const pausedTimeRef = useRef<number | null>(null)
  const lastLapTimeRef = useRef<number>(0)

  const updateTimer = () => {
    if (!startTimeRef.current) return
    
    const pausedTime = isPaused ? pausedTimeRef.current : null
    const elapsed = calculateElapsedTime(startTimeRef.current, pausedTime)
    setTotalSeconds(elapsed)
  }

  useEffect(() => {
    if (!initializedRef.current) {
      const storedStartTime = getStoredStartTime()
      const storedPaused = getPausedState()
      const storedPausedTime = getPausedTime()
      const storedLaps = getStoredLaps()

      if (storedStartTime) {
        startTimeRef.current = storedStartTime
        setIsPaused(storedPaused)
        pausedTimeRef.current = storedPausedTime
        setLaps(storedLaps)
        if (storedLaps.length > 0) {
          lastLapTimeRef.current = storedLaps[storedLaps.length - 1].time
        }
        updateTimer()
      } else {
        const newStartTime = Date.now()
        startTimeRef.current = newStartTime
        setStoredStartTime(newStartTime)
        setTotalSeconds(0)
        setLaps([])
        lastLapTimeRef.current = 0
      }
      initializedRef.current = true
    }

    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        updateTimer()
      }, 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused])

  const pause = () => {
    if (isPaused || !startTimeRef.current) return
    
    const pausedTime = Date.now()
    pausedTimeRef.current = pausedTime
    setIsPaused(true)
    setPausedState(true)
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const resume = () => {
    if (!isPaused || !startTimeRef.current || !pausedTimeRef.current) return
    
    const pausedDuration = Date.now() - pausedTimeRef.current
    startTimeRef.current = startTimeRef.current + pausedDuration
    setStoredStartTime(startTimeRef.current)
    
    pausedTimeRef.current = null
    setIsPaused(false)
    setPausedState(false)
    updateTimer()
  }

  const reset = () => {
    const newStartTime = Date.now()
    startTimeRef.current = newStartTime
    pausedTimeRef.current = null
    setIsPaused(false)
    setTotalSeconds(0)
    setStoredStartTime(newStartTime)
    setPausedState(false)
    setLaps([])
    lastLapTimeRef.current = 0
    clearStoredLaps()
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    updateTimer()
  }

  const recordLap = () => {
    if (isPaused || totalSeconds === 0) return
    
    const lapTime = totalSeconds - lastLapTimeRef.current
    const newLap: Lap = {
      id: `lap-${Date.now()}-${Math.random()}`,
      time: totalSeconds,
      lapTime,
      timestamp: Date.now(),
    }
    
    const updatedLaps = [...laps, newLap]
    setLaps(updatedLaps)
    saveLaps(updatedLaps)
    lastLapTimeRef.current = totalSeconds
  }

  const clearLaps = () => {
    setLaps([])
    lastLapTimeRef.current = 0
    clearStoredLaps()
  }

  const toggle = () => {
    if (isPaused) {
      resume()
    } else {
      pause()
    }
  }

  const timer: TimerState = {
    ...formatTimer(totalSeconds),
    isPaused,
  }

  const controls: TimerControls = {
    pause,
    resume,
    reset,
    toggle,
    recordLap,
    clearLaps,
  }

  return { timer, controls, laps }
}

