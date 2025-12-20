'use client'

import { useState, useEffect, useRef } from 'react'
import { useReactionTime } from '@/hooks/useReactionTime'
import { calculatePerformanceTrend, getTrendIcon, getTrendColor } from '@/lib/performance/calculatePerformanceTrend'

export default function PerformanceIndicator() {
  const { averageReactionTime } = useReactionTime()
  const [trend, setTrend] = useState<'improving' | 'stable' | 'declining'>('stable')
  const previousTimeRef = useRef(averageReactionTime)

  // Convert reaction time to efficiency (lower time = higher efficiency)
  const efficiency = averageReactionTime > 0 ? Math.max(0, 100 - (averageReactionTime / 20)) : 0

  useEffect(() => {
    const newTrend = calculatePerformanceTrend(efficiency, previousTimeRef.current)
    setTrend(newTrend)
    previousTimeRef.current = efficiency
  }, [efficiency])

  const getStatusColor = (eff: number): string => {
    if (eff >= 85) return 'text-lab-accent'
    if (eff >= 70) return 'text-lab-warning'
    return 'text-red-500'
  }

  const getStatusBarColor = (eff: number): string => {
    if (eff >= 85) return 'bg-lab-accent'
    if (eff >= 70) return 'bg-lab-warning'
    return 'bg-red-500'
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-lab-text/50">Response Efficiency</span>
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-mono ${getStatusColor(efficiency)}`}>
              {Math.round(efficiency)}%
            </span>
            <span className={`text-xs ${getTrendColor(trend)}`}>
              {getTrendIcon(trend)}
            </span>
          </div>
        </div>
        <div className="w-full h-2 bg-lab-text/10 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${getStatusBarColor(efficiency)}`}
            style={{ width: `${Math.min(100, Math.max(0, efficiency))}%` }}
          />
        </div>
      </div>
    </div>
  )
}

