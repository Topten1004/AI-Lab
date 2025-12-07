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
import type { TimerState, TimerControls } from '@/types/timer'

export const useTimer = () => {
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const initializedRef = useRef(false)
  const startTimeRef = useRef<number | null>(null)
  const pausedTimeRef = useRef<number | null>(null)

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

      if (storedStartTime) {
        startTimeRef.current = storedStartTime
        setIsPaused(storedPaused)
        pausedTimeRef.current = storedPausedTime
        updateTimer()
      } else {
        const newStartTime = Date.now()
        startTimeRef.current = newStartTime
        setStoredStartTime(newStartTime)
        setTotalSeconds(0)
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
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    updateTimer()
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
  }

  return { timer, controls }
}

