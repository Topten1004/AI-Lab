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
    <div className="flex items-center gap-3">
      <div className="w-2 h-[400px] bg-lab-text/10 overflow-hidden flex items-end relative">
        <div
          className={`w-full transition-all duration-500 ${getStatusBarColor(detectionRate)}`}
          style={{ height: `${Math.min(100, Math.max(0, detectionRate))}%` }}
        />
      </div>
      <div className="flex flex-col items-center gap-2 h-[400px] justify-between">
        <div className="flex items-center gap-1.5 w-16 justify-center">
          <span className={`text-sm font-mono ${getStatusColor(detectionRate)}`}>
            {Math.round(detectionRate)}%
          </span>
          <span className={`text-xs ${getTrendColor(trend)}`}>
            {getTrendIcon(trend)}
          </span>
        </div>
        <span className="text-xs text-lab-text/50 whitespace-nowrap" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
          Detection Rate
        </span>
      </div>
    </div>
  )
}

