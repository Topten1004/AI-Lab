import type { LogEntry } from '@/types/reactionTime'
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
  recentReactionTimes?: number[]
  currentReactionTime?: number
  expectedReactionTime?: number
  changeEvents?: number
}

export const generateReactionTimeLogMessage = (
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
    messageType = messages[1] // stimulus
  } else if (rand < 0.65) {
    messageType = messages[2] // reaction
  } else if (rand < 0.88) {
    messageType = messages[3] // latency
  } else if (rand < 0.94) {
    messageType = messages[4] // metric
  } else if (rand < 0.97) {
    messageType = messages[5] // anomaly
  } else {
    messageType = messages[6] // performance
  }

  const template = messageType.templates[
    Math.floor(Math.random() * messageType.templates.length)
  ]

  const reactionTime = messageType.type === 'latency' || messageType.type === 'reaction'
    ? Math.round(200 + Math.random() * 800)
    : options.currentReactionTime

  // Calculate metrics if data is available
  let metrics: LogEntry['metrics'] | undefined
  if (options.recentReactionTimes && options.recentReactionTimes.length > 0) {
    const baseline = options.expectedReactionTime || 500
    const stability = calculateStability(options.recentReactionTimes, baseline)
    const variability = calculateVariability(options.recentReactionTimes)
    const deviation = options.currentReactionTime && options.expectedReactionTime
      ? calculateDeviation(
          options.currentReactionTime,
          options.expectedReactionTime,
          options.recentReactionTimes
        )
      : undefined
    const reactivity = options.recentReactionTimes && options.changeEvents !== undefined
      ? calculateReactivity(options.recentReactionTimes, options.changeEvents)
      : undefined

    metrics = {
      stability,
      variability,
      deviation,
      reactivity,
    }
  }

  // Enhance message with metrics if it's a metric type
  let finalMessage = reactionTime ? `${template}: ${reactionTime}ms` : template
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
    reactionTime,
    experimentId: options.experimentId,
    metrics,
  }
}

