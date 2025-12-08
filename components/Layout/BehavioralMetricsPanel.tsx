'use client'

import { useBehavioralMetrics } from '@/hooks/useBehavioralMetrics'

export default function BehavioralMetricsPanel() {
  const { chartData, stats } = useBehavioralMetrics()

  const MetricChart = ({ 
    data, 
    stats, 
    label, 
    color 
  }: { 
    data: Array<{ timestamp: number; value: number }>
    stats: { current: number; average: number; min: number; max: number; trend: 'up' | 'down' | 'stable' }
    label: string
    color: string
  }) => {
    if (data.length === 0) return null

    const maxValue = Math.max(...data.map((d) => d.value), 1)
    const minValue = Math.min(...data.map((d) => d.value), 0)
    const range = maxValue - minValue || 1

    const points = data.map((point, index) => {
      const x = (index / (data.length - 1 || 1)) * 100
      const y = 100 - ((point.value - minValue) / range) * 100
      return `${x},${y}`
    }).join(' ')

    const trendIcon = stats.trend === 'up' ? '↑' : stats.trend === 'down' ? '↓' : '→'
    const trendColor = stats.trend === 'up' ? 'text-lab-accent' : stats.trend === 'down' ? 'text-red-400' : 'text-lab-text/50'

    return (
      <div className="lab-border rounded-lg p-4 bg-lab-surface/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${color}`}></div>
            <span className="text-xs font-mono text-lab-text/70 uppercase tracking-wider">{label}</span>
          </div>
          <div className={`text-xs font-mono ${trendColor}`}>{trendIcon}</div>
        </div>
        
        <div className="relative h-24 mb-2">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              points={points}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className={color}
              vectorEffect="non-scaling-stroke"
            />
            <defs>
              <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon
              points={`0,100 ${points} 100,100`}
              fill={`url(#gradient-${label})`}
              className={color}
              opacity="0.2"
            />
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
          <div>
            <div className="text-lab-text/40">Current</div>
            <div className={`${color} font-bold`}>{stats.current.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-lab-text/40">Avg</div>
            <div className="text-lab-text/60">{stats.average.toFixed(2)}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="lab-border rounded-lg p-4 bg-lab-surface">
      <div className="mb-4 pb-3 border-b border-lab-border">
        <h3 className="text-sm font-mono text-lab-accent uppercase tracking-wider">
          Behavioral Metrics Panel
        </h3>
        <p className="text-xs text-lab-text/50 mt-1">
          Real-time model behavior measurements
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <MetricChart
          data={chartData.stability}
          stats={stats.stability}
          label="Stability"
          color="text-lab-accent"
        />
        <MetricChart
          data={chartData.variability}
          stats={stats.variability}
          label="Variability"
          color="text-lab-cyan"
        />
        <MetricChart
          data={chartData.deviation}
          stats={stats.deviation}
          label="Deviation"
          color="text-lab-warning"
        />
        <MetricChart
          data={chartData.reactivity}
          stats={stats.reactivity}
          label="Reactivity"
          color="text-lab-purple"
        />
      </div>
    </div>
  )
}

