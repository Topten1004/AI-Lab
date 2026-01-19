/**
 * Calculates NOESIS deviation metric
 * Measures how far the model's behavior deviates from expected patterns
 * Higher values indicate more deviation
 */
export const calculateDeviation = (
  currentValue: number,
  expectedValue: number,
  historicalValues: number[]
): number => {
  // Calculate deviation from expected value
  const absoluteDeviation = Math.abs(currentValue - expectedValue)
  
  // Calculate historical average
  const historicalMean = historicalValues.length > 0
    ? historicalValues.reduce((sum, val) => sum + val, 0) / historicalValues.length
    : expectedValue

  // Calculate standard deviation of historical values
  const variance = historicalValues.length > 0
    ? historicalValues.reduce((sum, val) => {
        const diff = val - historicalMean
        return sum + (diff * diff)
      }, 0) / historicalValues.length
    : 0
  const stdDev = Math.sqrt(variance)

  // Normalize deviation (0-100 scale)
  // Use expected value as baseline for normalization
  const normalizedDeviation = expectedValue > 0
    ? (absoluteDeviation / expectedValue) * 100
    : absoluteDeviation

  // Factor in historical variance
  const adjustedDeviation = stdDev > 0
    ? normalizedDeviation * (1 + (stdDev / expectedValue) * 0.3)
    : normalizedDeviation

  return Math.round(Math.min(100, adjustedDeviation))
}

