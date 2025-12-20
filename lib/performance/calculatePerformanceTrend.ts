export type PerformanceTrend = 'improving' | 'stable' | 'declining'

export const calculatePerformanceTrend = (
  current: number,
  previous: number
): PerformanceTrend => {
  const diff = current - previous
  if (Math.abs(diff) < 2) return 'stable'
  return diff > 0 ? 'improving' : 'declining'
}

export const getTrendIcon = (trend: PerformanceTrend): string => {
  switch (trend) {
    case 'improving':
      return '↑'
    case 'declining':
      return '↓'
    case 'stable':
      return '→'
  }
}

export const getTrendColor = (trend: PerformanceTrend): string => {
  switch (trend) {
    case 'improving':
      return 'text-lab-accent'
    case 'declining':
      return 'text-red-500'
    case 'stable':
      return 'text-lab-text/50'
  }
}

