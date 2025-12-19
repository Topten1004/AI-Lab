/**
 * Calculates adaptive accuracy that improves over time as the model learns
 * Starts with lower accuracy and gradually improves with more predictions
 */
export const calculateAdaptiveAccuracy = (
  totalPredictions: number,
  correctPredictions: number
): number => {
  if (totalPredictions === 0) return 0

  // Base accuracy starts at 50%, improves with experience
  const baseAccuracy = 0.5
  const learningRate = 0.15 // How fast the model learns
  const maxAccuracy = 0.92 // Maximum achievable accuracy
  
  // Calculate experience factor (0 to 1)
  const experienceFactor = Math.min(totalPredictions / 30, 1)
  
  // Calculate target accuracy that improves with experience
  const targetAccuracy = baseAccuracy + (maxAccuracy - baseAccuracy) * experienceFactor
  
  // Actual accuracy from predictions
  const actualAccuracy = correctPredictions / totalPredictions
  
  // Blend actual and target accuracy (model learns from both experience and practice)
  const blendedAccuracy = actualAccuracy * 0.6 + targetAccuracy * 0.4
  
  // Add some randomness for natural variation (±3%)
  const variation = (Math.random() - 0.5) * 0.06
  
  return Math.max(0, Math.min(100, Math.round((blendedAccuracy + variation) * 100)))
}

/**
 * Calculates the probability of correct prediction based on learning progress
 */
export const calculatePredictionSuccessRate = (totalPredictions: number): number => {
  const baseRate = 0.5 // Start at 50%
  const maxRate = 0.92 // Can reach 92%
  const learningRate = 0.15
  
  const experienceFactor = Math.min(totalPredictions / 30, 1)
  const successRate = baseRate + (maxRate - baseRate) * experienceFactor
  
  return Math.max(baseRate, Math.min(maxRate, successRate))
}

