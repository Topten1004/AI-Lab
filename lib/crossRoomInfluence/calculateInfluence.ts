import type { RoomId } from '@/types/roomFocus'

export interface InfluenceEvent {
  sourceRoom: RoomId
  targetRoom: RoomId
  type: 'boost' | 'disrupt' | 'sync'
  intensity: number
  duration: number
  timestamp: number
}

export interface RoomActivity {
  room: RoomId
  activityLevel: number // 0-1
  lastEvent: number
}

/**
 * Calculates if a cross-room influence should occur based on activity levels
 */
export const shouldTriggerInfluence = (
  sourceActivity: RoomActivity,
  targetActivity: RoomActivity
): boolean => {
  // Trigger influence if source room has high activity (>0.7) and target is active
  if (sourceActivity.activityLevel > 0.7 && targetActivity.activityLevel > 0.3) {
    // 15% chance per check
    return Math.random() < 0.15
  }
  return false
}

/**
 * Generates an influence event between rooms
 */
export const generateInfluenceEvent = (
  sourceRoom: RoomId,
  targetRoom: RoomId,
  sourceActivity: number
): InfluenceEvent => {
  const influenceTypes: ('boost' | 'disrupt' | 'sync')[] = ['boost', 'disrupt', 'sync']
  const type = influenceTypes[Math.floor(Math.random() * influenceTypes.length)]
  
  // Intensity based on source activity (0.3 to 0.8)
  const intensity = 0.3 + (sourceActivity * 0.5)
  
  // Duration: 3-8 seconds
  const duration = 3000 + Math.random() * 5000
  
  return {
    sourceRoom,
    targetRoom,
    type,
    intensity,
    duration,
    timestamp: Date.now(),
  }
}

/**
 * Calculates the influence modifier for a target room
 */
export const calculateInfluenceModifier = (
  activeInfluences: InfluenceEvent[]
): number => {
  if (activeInfluences.length === 0) return 1.0
  
  let modifier = 1.0
  
  activeInfluences.forEach(influence => {
    const elapsed = Date.now() - influence.timestamp
    if (elapsed < influence.duration) {
      const remaining = 1 - (elapsed / influence.duration)
      const effect = influence.intensity * remaining
      
      switch (influence.type) {
        case 'boost':
          modifier += effect * 0.1 // +10% max boost
          break
        case 'disrupt':
          modifier -= effect * 0.05 // -5% max disruption
          break
        case 'sync':
          modifier += (Math.random() - 0.5) * effect * 0.05 // ±5% sync variation
          break
      }
    }
  })
  
  return Math.max(0.5, Math.min(1.5, modifier)) // Clamp between 0.5 and 1.5
}

