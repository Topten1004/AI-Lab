import type { LogEntry } from '@/types/behavioralConflict'
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
  recentPowerValues?: number[]
  currentPower?: number
  expectedPower?: number
  changeEvents?: number
}

export const generateBehavioralConflictLogMessage = (
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

  const rand = Math.random()
  let messageType: MessageTemplate
  
  if (rand < 0.08) {
    messageType = messages[0] // status
  } else if (rand < 0.35) {
    messageType = messages[1] // domination
  } else if (rand < 0.55) {
    messageType = messages[2] // adaptation
  } else if (rand < 0.75) {
    messageType = messages[3] // conflict
  } else if (rand < 0.88) {
    messageType = messages[4] // balance
  } else if (rand < 0.94) {
    messageType = messages[5] // metric
  } else if (rand < 0.97) {
    messageType = messages[6] // anomaly
  } else {
    messageType = messages[7] // performance
  }

  const template = messageType.templates[
    Math.floor(Math.random() * messageType.templates.length)
  ]

  // Calculate metrics if data is available
  let metrics: LogEntry['metrics'] | undefined
  if (options.recentPowerValues && options.recentPowerValues.length > 0) {
    const baseline = options.expectedPower || 50
    const stability = calculateStability(options.recentPowerValues, baseline)
    const variability = calculateVariability(options.recentPowerValues)
    const deviation = options.currentPower && options.expectedPower
      ? calculateDeviation(
          options.currentPower,
          options.expectedPower,
          options.recentPowerValues
        )
      : undefined
    const reactivity = options.recentPowerValues && options.changeEvents !== undefined
      ? calculateReactivity([], options.changeEvents) // Use empty array for reactivity calculation
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

