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
    <div className="flex items-center gap-3">
      <div className="w-2 h-[400px] bg-lab-text/10 overflow-hidden flex items-end relative">
        <div
          className={`w-full transition-all duration-500 ${getStatusBarColor(accuracy)}`}
          style={{ height: `${Math.min(100, Math.max(0, accuracy))}%` }}
        />
      </div>
      <div className="flex flex-col items-center gap-2 h-[400px] justify-between">
        <div className="flex items-center gap-1.5 w-16 justify-center">
          <span className={`text-sm font-mono ${getStatusColor(accuracy)}`}>
            {Math.round(accuracy)}%
          </span>
          <span className={`text-xs ${getTrendColor(trend)}`}>
            {getTrendIcon(trend)}
          </span>
        </div>
        <span className="text-xs text-lab-text/50 whitespace-nowrap" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
          Accuracy
        </span>
      </div>
    </div>
  )
}

