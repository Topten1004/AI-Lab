'use client'

import { useState, useEffect, useRef } from 'react'
import { useAttentionResponse } from '@/hooks/useAttentionResponse'
import { calculatePerformanceTrend, getTrendIcon, getTrendColor } from '@/lib/performance/calculatePerformanceTrend'

export default function PerformanceIndicator() {
  const { detectionRate } = useAttentionResponse()
  const [trend, setTrend] = useState<'improving' | 'stable' | 'declining'>('stable')
  const previousRateRef = useRef(detectionRate)

  useEffect(() => {
    const newTrend = calculatePerformanceTrend(detectionRate, previousRateRef.current)
    setTrend(newTrend)
    previousRateRef.current = detectionRate
  }, [detectionRate])

  const getStatusColor = (rate: number): string => {
    if (rate >= 80) return 'text-lab-accent'
    if (rate >= 60) return 'text-lab-warning'
    return 'text-red-500'
  }

  const getStatusBarColor = (rate: number): string => {
    if (rate >= 80) return 'bg-lab-accent'
    if (rate >= 60) return 'bg-lab-warning'
    return 'bg-red-500'
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-lab-text/50">Detection Rate</span>
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-mono ${getStatusColor(detectionRate)}`}>
              {Math.round(detectionRate)}%
            </span>
            <span className={`text-xs ${getTrendColor(trend)}`}>
              {getTrendIcon(trend)}
            </span>
          </div>
        </div>
        <div className="w-full h-2 bg-lab-text/10 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${getStatusBarColor(detectionRate)}`}
            style={{ width: `${Math.min(100, Math.max(0, detectionRate))}%` }}
          />
        </div>
      </div>
    </div>
  )
}

