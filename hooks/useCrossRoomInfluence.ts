'use client'

import { useState, useEffect, useRef } from 'react'
import type { RoomId } from '@/types/roomFocus'
import type { InfluenceEvent, RoomActivity } from '@/lib/crossRoomInfluence/calculateInfluence'
import { shouldTriggerInfluence, generateInfluenceEvent } from '@/lib/crossRoomInfluence/calculateInfluence'

interface CrossRoomInfluenceConfig {
  attentionActivity: number
  reactionActivity: number
  patternActivity: number
  conflictActivity: number
}

const ROOM_PAIRS: Array<[RoomId, RoomId]> = [
  ['attention', 'reaction'],
  ['reaction', 'pattern'],
  ['pattern', 'conflict'],
  ['conflict', 'attention'],
  ['attention', 'pattern'],
  ['reaction', 'conflict'],
]

export const useCrossRoomInfluence = (config: CrossRoomInfluenceConfig) => {
  const [activeInfluences, setActiveInfluences] = useState<InfluenceEvent[]>([])
  
  const getRoomActivity = (room: RoomId): RoomActivity => {
    const activityMap = {
      attention: config.attentionActivity,
      reaction: config.reactionActivity,
      pattern: config.patternActivity,
      conflict: config.conflictActivity,
    }
    
    return {
      room,
      activityLevel: activityMap[room],
      lastEvent: Date.now(),
    }
  }

  useEffect(() => {
    const checkInterval = setInterval(() => {
      // Check each room pair for potential influence
      ROOM_PAIRS.forEach(([sourceRoom, targetRoom]) => {
        const sourceActivity = getRoomActivity(sourceRoom)
        const targetActivity = getRoomActivity(targetRoom)
        
        if (shouldTriggerInfluence(sourceActivity, targetActivity)) {
          const newInfluence = generateInfluenceEvent(
            sourceRoom,
            targetRoom,
            sourceActivity.activityLevel
          )
          
          setActiveInfluences(prev => {
            // Remove expired influences
            const active = prev.filter(
              inf => Date.now() - inf.timestamp < inf.duration
            )
            return [...active, newInfluence]
          })
        }
      })
      
      // Clean up expired influences
      setActiveInfluences(prev =>
        prev.filter(inf => Date.now() - inf.timestamp < inf.duration)
      )
    }, 2000) // Check every 2 seconds

    return () => clearInterval(checkInterval)
  }, [config.attentionActivity, config.reactionActivity, config.patternActivity, config.conflictActivity])

  return {
    activeInfluences,
  }
}

