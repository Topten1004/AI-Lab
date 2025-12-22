'use client'

import { useState, useEffect, useRef } from 'react'

export interface ModelActivity {
  activityLevel: number
  status: 'high' | 'medium' | 'low' | 'idle'
  activeTime: number
  totalTime: number
}

export const useModelActivity = (
  isActive: boolean,
  windowSize: number = 30000 // 30 seconds window
) => {
  const [activity, setActivity] = useState<ModelActivity>({
    activityLevel: 0,
    status: 'idle',
    activeTime: 0,
    totalTime: 0,
  })
  const activeTimeRef = useRef(0)
  const startTimeRef = useRef(Date.now())
  const lastActiveRef = useRef(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const elapsed = now - startTimeRef.current

      // Track active time
      if (isActive) {
        if (!lastActiveRef.current) {
          // Just became active
          lastActiveRef.current = true
        }
        activeTimeRef.current += 100 // Add 100ms for this interval
      } else {
        lastActiveRef.current = false
      }

      // Reset window if exceeded
      if (elapsed > windowSize) {
        startTimeRef.current = now - windowSize
        activeTimeRef.current = isActive ? 100 : 0
      }

      const totalTime = Math.min(elapsed, windowSize)
      const activityLevel = totalTime > 0 
        ? Math.min(100, Math.round((activeTimeRef.current / totalTime) * 100))
        : 0

      const status = activityLevel >= 70 ? 'high' 
        : activityLevel >= 40 ? 'medium'
        : activityLevel >= 10 ? 'low'
        : 'idle'

      setActivity({
        activityLevel,
        status,
        activeTime: activeTimeRef.current,
        totalTime,
      })
    }, 100) // Update every 100ms

    return () => clearInterval(interval)
  }, [isActive, windowSize])

  return activity
}

