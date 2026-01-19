/**
 * Calculates NOESIS variability metric
 * Measures how much the model's behavior changes over time
 * Higher values indicate more variable behavior
 */
export const calculateVariability = (
  recentValues: number[]
): number => {
  if (recentValues.length < 2) return 30

  // Calculate coefficient of variation
  const mean = recentValues.reduce((sum, val) => sum + val, 0) / recentValues.length
  if (mean === 0) return 0

  const variance = recentValues.reduce((sum, val) => {
    const diff = val - mean
    return sum + (diff * diff)
  }, 0) / recentValues.length

  const stdDev = Math.sqrt(variance)
  const coefficientOfVariation = (stdDev / mean) * 100

  // Normalize to 0-100 scale
  const variability = Math.min(100, coefficientOfVariation * 2)

  return Math.round(variability)
}

