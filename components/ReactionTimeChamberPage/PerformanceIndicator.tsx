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
    <div className="flex items-center gap-3">
      <div className="w-2 h-[400px] bg-lab-text/10 overflow-hidden flex items-end relative">
        <div
          className={`w-full transition-all duration-500 ${getStatusBarColor(efficiency)}`}
          style={{ height: `${Math.min(100, Math.max(0, efficiency))}%` }}
        />
      </div>
      <div className="flex flex-col items-center gap-2 h-[400px] justify-between">
        <div className="flex items-center gap-1.5 w-16 justify-center">
          <span className={`text-sm font-mono ${getStatusColor(efficiency)}`}>
            {Math.round(efficiency)}%
          </span>
          <span className={`text-xs ${getTrendColor(trend)}`}>
            {getTrendIcon(trend)}
          </span>
        </div>
        <span className="text-xs text-lab-text/50 whitespace-nowrap" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
          Response Efficiency
        </span>
      </div>
    </div>
  )
}

