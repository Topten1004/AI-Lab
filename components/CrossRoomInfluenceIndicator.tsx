'use client'

import { useCrossRoomInfluence } from '@/hooks/useCrossRoomInfluence'
import { useAttentionResponse } from '@/hooks/useAttentionResponse'
import { useReactionTime } from '@/hooks/useReactionTime'
import { usePatternPrediction } from '@/hooks/usePatternPrediction'
import { useBehavioralConflict } from '@/hooks/useBehavioralConflict'
import type { InfluenceEvent } from '@/lib/crossRoomInfluence/calculateInfluence'

const getRoomName = (room: string): string => {
  const names: Record<string, string> = {
    attention: 'Attention',
    reaction: 'Reaction',
    pattern: 'Pattern',
    conflict: 'Conflict',
  }
  return names[room] || room
}

const getInfluenceTypeLabel = (type: InfluenceEvent['type']): string => {
  const labels = {
    boost: 'Boost',
    disrupt: 'Disrupt',
    sync: 'Sync',
  }
  return labels[type]
}

const getInfluenceTypeColor = (type: InfluenceEvent['type']): string => {
  const colors = {
    boost: 'text-lab-accent',
    disrupt: 'text-red-500',
    sync: 'text-lab-warning',
  }
  return colors[type]
}

export default function CrossRoomInfluenceIndicator() {
  const { detectionRate } = useAttentionResponse()
  const { averageReactionTime } = useReactionTime()
  const { accuracy } = usePatternPrediction()
  const { currentDominance } = useBehavioralConflict()
  
  // Calculate activity levels (0-1) based on current metrics
  const attentionActivity = Math.min(detectionRate / 100, 1)
  const reactionActivity = averageReactionTime > 0 ? Math.min(1 - (averageReactionTime / 2000), 1) : 0.5
  const patternActivity = Math.min(accuracy / 100, 1)
  const conflictActivity = currentDominance === 'balanced' ? 0.5 : 0.7
  
  const { activeInfluences } = useCrossRoomInfluence({
    attentionActivity,
    reactionActivity,
    patternActivity,
    conflictActivity,
  })

  if (activeInfluences.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {activeInfluences.map((influence, idx) => {
        const elapsed = Date.now() - influence.timestamp
        const remaining = Math.max(0, influence.duration - elapsed)
        const progress = 1 - (elapsed / influence.duration)
        
        if (remaining <= 0) return null
        
        return (
          <div
            key={`${influence.sourceRoom}-${influence.targetRoom}-${influence.timestamp}-${idx}`}
            className="lab-border rounded-lg p-3 bg-lab-surface shadow-lg min-w-[200px] animate-in fade-in slide-in-from-right"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-mono text-lab-text/70">
                Cross-Room Influence
              </div>
              <div className={`text-xs font-mono ${getInfluenceTypeColor(influence.type)}`}>
                {getInfluenceTypeLabel(influence.type)}
              </div>
            </div>
            
            <div className="text-xs text-lab-text/90 mb-2">
              {getRoomName(influence.sourceRoom)} → {getRoomName(influence.targetRoom)}
            </div>
            
            <div className="w-full h-1 bg-lab-text/10 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  influence.type === 'boost' ? 'bg-lab-accent' :
                  influence.type === 'disrupt' ? 'bg-red-500' :
                  'bg-lab-warning'
                }`}
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

