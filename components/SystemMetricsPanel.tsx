'use client'

import { useSystemMetrics } from '@/hooks/useSystemMetrics'

export default function SystemMetricsPanel() {
  const { uptime, totalExperiments, activeModels, systemHealth, formatUptime } = useSystemMetrics()

  const getHealthColor = (health: number): string => {
    if (health >= 98) return 'text-lab-accent'
    if (health >= 95) return 'text-lab-warning'
    return 'text-red-500'
  }

  const getHealthBarColor = (health: number): string => {
    if (health >= 98) return 'bg-lab-accent'
    if (health >= 95) return 'bg-lab-warning'
    return 'bg-red-500'
  }

  return (
    <div className="lab-border rounded-lg p-4 bg-lab-surface">
      <div className="mb-3">
        <h3 className="text-sm font-mono text-lab-accent mb-1">
          System Performance
        </h3>
        <div className="text-xs text-lab-text/50">
          Real-time facility metrics
        </div>
      </div>
      
      <div className="space-y-3">
        {/* Uptime */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-lab-text/70">Uptime</span>
          <span className="text-xs font-mono text-lab-text">{formatUptime(uptime)}</span>
        </div>
        
        {/* Total Experiments */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-lab-text/70">Experiments</span>
          <span className="text-xs font-mono text-lab-accent">{totalExperiments.toLocaleString()}</span>
        </div>
        
        {/* Active Models */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-lab-text/70">Active Models</span>
          <span className="text-xs font-mono text-lab-text">{activeModels}</span>
        </div>
        
        {/* System Health */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-lab-text/70">System Health</span>
            <span className={`text-xs font-mono ${getHealthColor(systemHealth)}`}>
              {systemHealth.toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-lab-text/10 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${getHealthBarColor(systemHealth)}`}
              style={{ width: `${systemHealth}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

