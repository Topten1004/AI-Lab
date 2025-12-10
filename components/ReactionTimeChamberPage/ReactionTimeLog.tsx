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
      <div className="mb-3 pb-2 border-b border-lab-border flex items-center justify-between">
        <h3 className="text-sm font-mono text-lab-text/70">
          Observation Log
        </h3>
        <span className="text-xs font-mono text-lab-text/40">
          {logs.length} entries
        </span>
      </div>
      
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto space-y-1 text-xs font-mono">
        {logs.map((log, index) => {
          const isNewest = index === logs.length - 1
          return (
            <div 
              key={log.id} 
              className={`leading-relaxed hover:bg-lab-surface/30 transition-all px-1 rounded opacity-0 animate-[fadeIn_0.3s_ease-in_forwards] ${
                isNewest ? 'border-l-2 border-lab-accent/50 pl-2' : ''
              }`}
              style={{ animationDelay: `${Math.min(index * 10, 200)}ms` }}
            >
              <span className="text-lab-text/40">[{log.timestamp}]</span>{' '}
              <span className={getReactionTimeLogColor(log.type)}>
                {log.message}
              </span>
            </div>
          )
        })}
        <div ref={logEndRef} />
      </div>
    </div>
  )
}

