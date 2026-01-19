/**
 * Calculates NOESIS reactivity metric
 * Measures how quickly the model responds to changes in environment
 * Higher values indicate more reactive behavior
 */
export const calculateReactivity = (
  responseTimes: number[],
  changeEvents: number
): number => {
  if (responseTimes.length === 0) return 40

  // Calculate average response time
  const avgResponseTime = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length

  // Faster response = higher reactivity
  // Normalize: 0ms = 100 reactivity, 1000ms = 0 reactivity
  const maxResponseTime = 1000
  const reactivityFromSpeed = Math.max(0, Math.min(100, 100 - (avgResponseTime / maxResponseTime) * 100))

  // Factor in frequency of responses to changes
  const changeFrequency = Math.min(100, changeEvents * 10)
  const reactivityFromFrequency = changeFrequency * 0.3

  // Combine both factors
  const reactivity = reactivityFromSpeed * 0.7 + reactivityFromFrequency

  return Math.round(Math.min(100, reactivity))
}

