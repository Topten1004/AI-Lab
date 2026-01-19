/**
 * Calculates NOESIS stability metric
 * Measures how consistent the model's behavior is over time
 * Higher values indicate more stable behavior
 */
export const calculateStability = (
  recentValues: number[],
  baseline: number
): number => {
  if (recentValues.length === 0) return 50

  // Calculate variance from baseline
  const variance = recentValues.reduce((sum, val) => {
    const diff = Math.abs(val - baseline)
    return sum + (diff * diff)
  }, 0) / recentValues.length

  // Convert variance to stability score (0-100)
  // Lower variance = higher stability
  const maxVariance = baseline * 2 // Assume max variance is 2x baseline
  const stability = Math.max(0, Math.min(100, 100 - (variance / maxVariance) * 100))

  return Math.round(stability)
}

