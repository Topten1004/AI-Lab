import type { MetricDataPoint, MetricStats } from '@/types/behavioralMetrics'

export const calculateMetricStats = (dataPoints: MetricDataPoint[]): MetricStats => {
  if (dataPoints.length === 0) {
    return {
      current: 0,
      average: 0,
      min: 0,
      max: 0,
      trend: 'stable',
    }
  }

  const values = dataPoints.map((point) => point.value)
  const current = values[values.length - 1]
  const average = values.reduce((sum, val) => sum + val, 0) / values.length
  const min = Math.min(...values)
  const max = Math.max(...values)

  // Calculate trend (compare last 5 points with previous 5 points)
  let trend: 'up' | 'down' | 'stable' = 'stable'
  if (dataPoints.length >= 10) {
    const recent = values.slice(-5).reduce((sum, val) => sum + val, 0) / 5
    const previous = values.slice(-10, -5).reduce((sum, val) => sum + val, 0) / 5
    const diff = recent - previous
    if (diff > 0.05) trend = 'up'
    else if (diff < -0.05) trend = 'down'
  }

  return {
    current: Math.round(current * 100) / 100,
    average: Math.round(average * 100) / 100,
    min: Math.round(min * 100) / 100,
    max: Math.round(max * 100) / 100,
    trend,
  }
}

export const generateChartData = (dataPoints: MetricDataPoint[], maxPoints: number = 20): MetricDataPoint[] => {
  if (dataPoints.length <= maxPoints) {
    return dataPoints
  }
  return dataPoints.slice(-maxPoints)
}

