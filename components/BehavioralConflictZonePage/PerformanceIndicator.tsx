'use client'

import { useState, useEffect, useRef } from 'react'
import { useBehavioralConflict } from '@/hooks/useBehavioralConflict'
import { calculatePerformanceTrend, getTrendIcon, getTrendColor } from '@/lib/performance/calculatePerformanceTrend'

export default function PerformanceIndicator() {
  const { currentDominance } = useBehavioralConflict()
  const [trend, setTrend] = useState<'improving' | 'stable' | 'declining'>('stable')
  const previousBalanceRef = useRef(50)

  // Balance score: 100 when balanced, lower when imbalanced
  const balanceScore = currentDominance === 'balanced' ? 100 : 50

  useEffect(() => {
    const newTrend = calculatePerformanceTrend(balanceScore, previousBalanceRef.current)
    setTrend(newTrend)
    previousBalanceRef.current = balanceScore
  }, [balanceScore])

  const getStatusColor = (score: number): string => {
    if (score >= 80) return 'text-lab-accent'
    if (score >= 60) return 'text-lab-warning'
    return 'text-red-500'
  }

  const getStatusBarColor = (score: number): string => {
    if (score >= 80) return 'bg-lab-accent'
    if (score >= 60) return 'bg-lab-warning'
    return 'bg-red-500'
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-lab-text/50">Balance Score</span>
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-mono ${getStatusColor(balanceScore)}`}>
              {Math.round(balanceScore)}%
            </span>
            <span className={`text-xs ${getTrendColor(trend)}`}>
              {getTrendIcon(trend)}
            </span>
          </div>
        </div>
        <div className="w-full h-2 bg-lab-text/10 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${getStatusBarColor(balanceScore)}`}
            style={{ width: `${Math.min(100, Math.max(0, balanceScore))}%` }}
          />
        </div>
      </div>
    </div>
  )
}

