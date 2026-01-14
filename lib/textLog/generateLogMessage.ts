import type { LogEntry } from '@/types/attentionResponse'
import { calculateStability } from '@/lib/behavioralMetrics/calculateStability'
import { calculateVariability } from '@/lib/behavioralMetrics/calculateVariability'
import { calculateDeviation } from '@/lib/behavioralMetrics/calculateDeviation'
import { calculateReactivity } from '@/lib/behavioralMetrics/calculateReactivity'

interface MessageTemplate {
  type: LogEntry['type']
  templates: string[]
}

interface GenerateLogMessageOptions {
  experimentId?: string
  recentDetectionRates?: number[]
  recentResponseTimes?: number[]
  currentDetectionRate?: number
  expectedDetectionRate?: number
  changeEvents?: number
}

export const generateLogMessage = (
  messages: MessageTemplate[],
  options: GenerateLogMessageOptions = {}
): LogEntry => {
  const now = new Date()
  const timestamp = now.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  // Enhanced weighted random selection with dynamic variation
  const rand = Math.random()
  let messageType: MessageTemplate
  
  // Expanded weights to include new log types
  if (rand < 0.08) {
    messageType = messages[0] // status
  } else if (rand < 0.35) {
    messageType = messages[1] // stimulus
  } else if (rand < 0.70) {
    messageType = messages[2] // detection
  } else if (rand < 0.85) {
    messageType = messages[3] // miss
  } else if (rand < 0.92) {
    messageType = messages[4] // metric
  } else if (rand < 0.96) {
    messageType = messages[5] // anomaly
  } else {
    messageType = messages[6] // performance
  }

  const template = messageType.templates[
    Math.floor(Math.random() * messageType.templates.length)
  ]

  // Calculate metrics if data is available
  let metrics: LogEntry['metrics'] | undefined
  if (options.recentDetectionRates && options.recentDetectionRates.length > 0) {
    const baseline = options.expectedDetectionRate || 70
    const stability = calculateStability(options.recentDetectionRates, baseline)
    const variability = calculateVariability(options.recentDetectionRates)
    const deviation = options.currentDetectionRate && options.expectedDetectionRate
      ? calculateDeviation(
          options.currentDetectionRate,
          options.expectedDetectionRate,
          options.recentDetectionRates
        )
      : undefined
    const reactivity = options.recentResponseTimes && options.changeEvents !== undefined
      ? calculateReactivity(options.recentResponseTimes, options.changeEvents)
      : undefined

    metrics = {
      stability,
      variability,
      deviation,
      reactivity,
    }
  }

  // Enhance message with metrics if it's a metric type
  let finalMessage = template
  if (messageType.type === 'metric' && metrics) {
    const metricParts: string[] = []
    if (metrics.stability !== undefined) metricParts.push(`Stability: ${metrics.stability}%`)
    if (metrics.variability !== undefined) metricParts.push(`Variability: ${metrics.variability}%`)
    if (metrics.deviation !== undefined) metricParts.push(`Deviation: ${metrics.deviation}%`)
    if (metrics.reactivity !== undefined) metricParts.push(`Reactivity: ${metrics.reactivity}%`)
    if (metricParts.length > 0) {
      finalMessage = `${template} [${metricParts.join(', ')}]`
    }
  }

  return {
    id: 0, // Will be set by hook
    timestamp,
    message: finalMessage,
    type: messageType.type,
    experimentId: options.experimentId,
    metrics,
  }
}

