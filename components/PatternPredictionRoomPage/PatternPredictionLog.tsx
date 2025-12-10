'use client'

import { usePatternPredictionLog } from '@/hooks/usePatternPredictionLog'
import { getPatternPredictionLogColor } from '@/lib/patternPredictionLog/getPatternPredictionLogColor'

interface PatternPredictionLogProps {
  isFocused: boolean
}

export default function PatternPredictionLog({ isFocused }: PatternPredictionLogProps) {
  const { logs, logEndRef, scrollContainerRef } = usePatternPredictionLog(isFocused)

  return (
    <div className="lab-border rounded-lg p-4 bg-lab-bg h-[400px] flex flex-col">
      <div className="mb-3 pb-2 border-b border-lab-border">
        <h3 className="text-sm font-mono text-lab-text/70">
          Observation Log
        </h3>
      </div>
      
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto space-y-1 text-xs font-mono">
        {logs.map((log, index) => (
          <div 
            key={log.id} 
            className="leading-relaxed hover:bg-lab-surface/30 transition-all px-1 rounded opacity-0 animate-[fadeIn_0.3s_ease-in_forwards]"
            style={{ animationDelay: `${Math.min(index * 10, 200)}ms` }}
          >
            <span className="text-lab-text/40">[{log.timestamp}]</span>{' '}
            <span className={getPatternPredictionLogColor(log.type)}>
              {log.message}
            </span>
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  )
}

