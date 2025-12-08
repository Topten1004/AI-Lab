export interface MetricDataPoint {
  timestamp: number
  value: number
}

export interface BehavioralMetricsData {
  stability: MetricDataPoint[]
  variability: MetricDataPoint[]
  deviation: MetricDataPoint[]
  reactivity: MetricDataPoint[]
}

export interface MetricStats {
  current: number
  average: number
  min: number
  max: number
  trend: 'up' | 'down' | 'stable'
}

export interface MetricsPanelData {
  stability: MetricStats
  variability: MetricStats
  deviation: MetricStats
  reactivity: MetricStats
}

