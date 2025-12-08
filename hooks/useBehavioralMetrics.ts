'use client'

import { useState, useEffect, useRef } from 'react'
import type { BehavioralMetricsData, MetricsPanelData } from '@/types/behavioralMetrics'
import { calculateMetricStats, generateChartData } from '@/lib/behavioralMetrics/calculateMetricStats'
import { generateBehavioralMetrics } from '@/lib/textLog/generateMetrics'

export const useBehavioralMetrics = () => {
  const [metricsData, setMetricsData] = useState<BehavioralMetricsData>({
    stability: [],
    variability: [],
    deviation: [],
    reactivity: [],
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const updateMetrics = () => {
      const metrics = generateBehavioralMetrics()
      const now = Date.now()

      setMetricsData((prev) => ({
        stability: [...prev.stability, { timestamp: now, value: metrics.stability || 0 }].slice(-50),
        variability: [...prev.variability, { timestamp: now, value: metrics.variability || 0 }].slice(-50),
        deviation: [...prev.deviation, { timestamp: now, value: metrics.deviation || 0 }].slice(-50),
        reactivity: [...prev.reactivity, { timestamp: now, value: metrics.reactivity || 0 }].slice(-50),
      }))
    }

    // Initial metrics
    updateMetrics()

    // Update every 3-5 seconds
    intervalRef.current = setInterval(() => {
      updateMetrics()
    }, 3000 + Math.random() * 2000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const chartData = {
    stability: generateChartData(metricsData.stability),
    variability: generateChartData(metricsData.variability),
    deviation: generateChartData(metricsData.deviation),
    reactivity: generateChartData(metricsData.reactivity),
  }

  const stats: MetricsPanelData = {
    stability: calculateMetricStats(metricsData.stability),
    variability: calculateMetricStats(metricsData.variability),
    deviation: calculateMetricStats(metricsData.deviation),
    reactivity: calculateMetricStats(metricsData.reactivity),
  }

  return {
    chartData,
    stats,
  }
}

