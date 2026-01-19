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
    <div className="flex items-center gap-3">
      <div className="w-2 h-[400px] bg-lab-text/10 overflow-hidden flex items-end relative">
        <div
          className={`w-full transition-all duration-500 ${getStatusBarColor(balanceScore)}`}
          style={{ height: `${Math.min(100, Math.max(0, balanceScore))}%` }}
        />
      </div>
      <div className="flex flex-col items-center gap-2 h-[400px] justify-between">
        <div className="flex items-center gap-1.5 w-16 justify-center">
          <span className={`text-sm font-mono ${getStatusColor(balanceScore)}`}>
            {Math.round(balanceScore)}%
          </span>
          <span className={`text-xs ${getTrendColor(trend)}`}>
            {getTrendIcon(trend)}
          </span>
        </div>
        <span className="text-xs text-lab-text/50 whitespace-nowrap" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
          Balance Score
        </span>
      </div>
    </div>
  )
}

