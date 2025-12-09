'use client'

import { useBehavioralConflictLog } from '@/hooks/useBehavioralConflictLog'
import { getBehavioralConflictLogColor } from '@/lib/behavioralConflictLog/getBehavioralConflictLogColor'

interface BehavioralConflictLogProps {
  isFocused: boolean
}

export default function BehavioralConflictLog({ isFocused }: BehavioralConflictLogProps) {
  const { logs, logEndRef, scrollContainerRef } = useBehavioralConflictLog(isFocused)

  return (
    <div className="lab-border rounded-lg p-4 bg-lab-bg h-[400px] flex flex-col">
      <div className="mb-3 pb-2 border-b border-lab-border">
        <h3 className="text-sm font-mono text-lab-text/70">
          Observation Log
        </h3>
      </div>
      
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto space-y-1 text-xs font-mono">
        {logs.map((log) => (
          <div key={log.id} className="leading-relaxed hover:bg-lab-surface/30 transition-colors px-1 rounded">
            <span className="text-lab-text/40">[{log.timestamp}]</span>{' '}
            <span className={getBehavioralConflictLogColor(log.type)}>
              {log.message}
            </span>
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  )
}

