/**
 * Generates a unique experiment ID for tracking log sessions
 * Format: EXP-{timestamp}-{random}
 */
export const generateExperimentId = (): string => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `EXP-${timestamp}-${random}`
}

