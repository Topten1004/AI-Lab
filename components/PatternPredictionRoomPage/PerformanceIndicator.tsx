'use client'

import { useState, useEffect, useRef } from 'react'
import { usePatternPrediction } from '@/hooks/usePatternPrediction'
import { calculatePerformanceTrend, getTrendIcon, getTrendColor } from '@/lib/performance/calculatePerformanceTrend'

export default function PerformanceIndicator() {
  const { accuracy } = usePatternPrediction()
  const [trend, setTrend] = useState<'improving' | 'stable' | 'declining'>('stable')
  const previousAccuracyRef = useRef(accuracy)

  useEffect(() => {
    const newTrend = calculatePerformanceTrend(accuracy, previousAccuracyRef.current)
    setTrend(newTrend)
    previousAccuracyRef.current = accuracy
  }, [accuracy])

  const getStatusColor = (acc: number): string => {
    if (acc >= 85) return 'text-lab-accent'
    if (acc >= 70) return 'text-lab-warning'
    return 'text-red-500'
  }

  const getStatusBarColor = (acc: number): string => {
    if (acc >= 85) return 'bg-lab-accent'
    if (acc >= 70) return 'bg-lab-warning'
    return 'bg-red-500'
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-lab-text/50">Accuracy</span>
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-mono ${getStatusColor(accuracy)}`}>
              {Math.round(accuracy)}%
            </span>
            <span className={`text-xs ${getTrendColor(trend)}`}>
              {getTrendIcon(trend)}
            </span>
          </div>
        </div>
        <div className="w-full h-2 bg-lab-text/10 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${getStatusBarColor(accuracy)}`}
            style={{ width: `${Math.min(100, Math.max(0, accuracy))}%` }}
          />
        </div>
      </div>
    </div>
  )
}

