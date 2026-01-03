/**
 * Calculates prediction confidence score based on:
 * - Learning progress (more experience = higher confidence)
 * - Pattern familiarity (how well the model knows the current pattern)
 * - Recent accuracy (recent success increases confidence)
 * - Pattern stability (confidence drops when pattern changes)
 */
export const calculateConfidence = (
  totalPredictions: number,
  recentAccuracy: number,
  patternAge: number, // How long current pattern has been active
  isPatternNew: boolean
): number => {
  // Base confidence starts low, improves with experience
  const baseConfidence = 0.45
  
  // Learning factor: confidence grows with total predictions (0 to 1)
  const learningFactor = Math.min(totalPredictions / 25, 1)
  
  // Pattern familiarity: confidence increases the longer we've seen this pattern
  const patternFamiliarity = Math.min(patternAge / 10, 1)
  
  // Accuracy influence: recent accuracy affects confidence
  const accuracyInfluence = recentAccuracy / 100
  
  // Pattern change penalty: confidence drops when pattern is new
  const patternPenalty = isPatternNew ? 0.3 : 1.0
  
  // Calculate confidence (0 to 1)
  const confidence = (
    baseConfidence * 0.2 +
    learningFactor * 0.3 +
    patternFamiliarity * 0.2 +
    accuracyInfluence * 0.3
  ) * patternPenalty
  
  // Add natural variation (±5%)
  const variation = (Math.random() - 0.5) * 0.1
  
  return Math.max(0, Math.min(100, Math.round((confidence + variation) * 100)))
}

/**
 * Gets confidence level category for display
 */
export const getConfidenceLevel = (confidence: number): 'high' | 'medium' | 'low' => {
  if (confidence >= 75) return 'high'
  if (confidence >= 50) return 'medium'
  return 'low'
}

/**
 * Gets confidence color for visualization
 */
export const getConfidenceColor = (confidence: number): string => {
  if (confidence >= 75) return 'text-lab-accent'
  if (confidence >= 50) return 'text-lab-warning'
  return 'text-red-500'
}

/**
 * Gets confidence background color for bars
 */
export const getConfidenceBgColor = (confidence: number): string => {
  if (confidence >= 75) return 'bg-lab-accent'
  if (confidence >= 50) return 'bg-lab-warning'
  return 'bg-red-500'
}

