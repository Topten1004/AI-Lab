import type { BehavioralMetrics } from '@/types/attentionResponse'

export const generateBehavioralMetrics = (): BehavioralMetrics => {
  return {
    stability: Math.round((0.5 + Math.random() * 0.5) * 100) / 100,
    variability: Math.round((0.2 + Math.random() * 0.6) * 100) / 100,
    deviation: Math.round((0.1 + Math.random() * 0.4) * 100) / 100,
    reactivity: Math.round((0.3 + Math.random() * 0.7) * 100) / 100,
  }
}

export const formatMetrics = (metrics: BehavioralMetrics): string => {
  const parts: string[] = []
  if (metrics.stability !== undefined) parts.push(`stability:${metrics.stability.toFixed(2)}`)
  if (metrics.variability !== undefined) parts.push(`variability:${metrics.variability.toFixed(2)}`)
  if (metrics.deviation !== undefined) parts.push(`deviation:${metrics.deviation.toFixed(2)}`)
  if (metrics.reactivity !== undefined) parts.push(`reactivity:${metrics.reactivity.toFixed(2)}`)
  return parts.join(' | ')
}

