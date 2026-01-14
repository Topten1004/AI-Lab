import type { LogEntry } from '@/types/patternPrediction'
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
  recentAccuracies?: number[]
  recentResponseTimes?: number[]
  currentAccuracy?: number
  expectedAccuracy?: number
  changeEvents?: number
}

export const generatePatternPredictionLogMessage = (
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
  
  if (rand < 0.06) {
    messageType = messages[0] // status
  } else if (rand < 0.20) {
    messageType = messages[1] // sequence
  } else if (rand < 0.40) {
    messageType = messages[2] // prediction
  } else if (rand < 0.70) {
    messageType = messages[3] // correct
  } else if (rand < 0.85) {
    messageType = messages[4] // incorrect
  } else if (rand < 0.92) {
    messageType = messages[5] // adaptation
  } else if (rand < 0.96) {
    messageType = messages[6] // metric
  } else if (rand < 0.98) {
    messageType = messages[7] // anomaly
  } else {
    messageType = messages[8] // performance
  }

  const template = messageType.templates[
    Math.floor(Math.random() * messageType.templates.length)
  ]

  // Calculate metrics if data is available
  let metrics: LogEntry['metrics'] | undefined
  if (options.recentAccuracies && options.recentAccuracies.length > 0) {
    const baseline = options.expectedAccuracy || 75
    const stability = calculateStability(options.recentAccuracies, baseline)
    const variability = calculateVariability(options.recentAccuracies)
    const deviation = options.currentAccuracy && options.expectedAccuracy
      ? calculateDeviation(
          options.currentAccuracy,
          options.expectedAccuracy,
          options.recentAccuracies
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

