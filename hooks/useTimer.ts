'use client'

import { useState, useEffect, useRef } from 'react'
import { formatTimer } from '@/lib/timer/formatTimer'
import { initializeTimer } from '@/lib/timer/getStoredTimer'
import type { TimerState } from '@/types/timer'

export const useTimer = () => {
  const [totalSeconds, setTotalSeconds] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!initializedRef.current) {
      const initialSeconds = initializeTimer()
      setTotalSeconds(initialSeconds)
      initializedRef.current = true
    }

    intervalRef.current = setInterval(() => {
      setTotalSeconds((prev) => prev + 1)
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const timer: TimerState = formatTimer(totalSeconds)

  return timer
}

