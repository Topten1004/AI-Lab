'use client'

import { useReactionTimeLog } from '@/hooks/useReactionTimeLog'
import { getReactionTimeLogColor } from '@/lib/reactionTimeLog/getReactionTimeLogColor'

interface ReactionTimeLogProps {
  isFocused: boolean
}

export default function ReactionTimeLog({ isFocused }: ReactionTimeLogProps) {
  const { logs, logEndRef, scrollContainerRef } = useReactionTimeLog(isFocused)

  return (
    <div className="lab-border rounded-lg p-4 bg-lab-bg h-[400px] flex flex-col">
      <div className="mb-3 pb-2 border-b border-lab-border">
        <h3 className="text-sm font-mono text-lab-text/70">
          Observation Log
        </h3>
      </div>
      
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto space-y-1 text-xs font-mono">
        {logs.map((log) => (
          <div key={log.id} className="leading-relaxed">
            <span className="text-lab-text/40">[{log.timestamp}]</span>{' '}
            <span className={getReactionTimeLogColor(log.type)}>
              {log.message}
            </span>
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  )
}

