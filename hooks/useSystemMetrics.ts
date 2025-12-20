'use client'

import { useState, useEffect, useRef } from 'react'

interface SystemMetrics {
  uptime: number
  totalExperiments: number
  activeModels: number
  systemHealth: number
  lastUpdate: number
}

export const useSystemMetrics = () => {
  const startTimeRef = useRef(Date.now())
  const [metrics, setMetrics] = useState<SystemMetrics>({
    uptime: 0,
    totalExperiments: 0,
    activeModels: 0,
    systemHealth: 100,
    lastUpdate: Date.now(),
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const uptime = Math.floor((now - startTimeRef.current) / 1000) // seconds
      
      // Simulate dynamic metrics
      const activeModels = 8 // 2 models per room × 4 rooms
      const totalExperiments = Math.floor(uptime / 5) + Math.floor(Math.random() * 10) // Increases over time
      
      // System health varies slightly (95-100%)
      const systemHealth = 95 + Math.random() * 5
      
      setMetrics({
        uptime,
        totalExperiments,
        activeModels,
        systemHealth: Math.round(systemHealth * 10) / 10,
        lastUpdate: now,
      })
    }, 1000) // Update every second

    return () => clearInterval(interval)
  }, [])

  const formatUptime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`
    } else {
      return `${secs}s`
    }
  }

  return {
    ...metrics,
    formatUptime,
  }
}

