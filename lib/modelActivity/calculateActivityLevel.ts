/**
 * Calculates activity level based on recent state changes and active time
 */
export const calculateActivityLevel = (
  activeTime: number,
  totalTime: number
): number => {
  if (totalTime === 0) return 0
  return Math.min(100, Math.round((activeTime / totalTime) * 100))
}

/**
 * Determines activity status based on level
 */
export const getActivityStatus = (level: number): 'high' | 'medium' | 'low' | 'idle' => {
  if (level >= 70) return 'high'
  if (level >= 40) return 'medium'
  if (level >= 10) return 'low'
  return 'idle'
}

/**
 * Gets color for activity level
 */
export const getActivityColor = (status: 'high' | 'medium' | 'low' | 'idle'): string => {
  switch (status) {
    case 'high':
      return 'text-lab-accent'
    case 'medium':
      return 'text-lab-warning'
    case 'low':
      return 'text-lab-text/60'
    case 'idle':
      return 'text-lab-text/30'
  }
}

