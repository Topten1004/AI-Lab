import type { LogEntry } from '@/types/attentionResponse'
import { generateBehavioralMetrics, formatMetrics } from './generateMetrics'

interface MessageTemplate {
  type: LogEntry['type']
  templates: string[]
  includeMetrics?: boolean
  includeDetails?: boolean
}

export const generateLogMessage = (messages: MessageTemplate[]): LogEntry => {
  const now = new Date()
  const timestamp = now.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  // Expanded weighted random selection with new types
  const rand = Math.random()
  let messageType: MessageTemplate
  
  if (rand < 0.08) {
    messageType = messages.find(m => m.type === 'status') || messages[0]
  } else if (rand < 0.15) {
    messageType = messages.find(m => m.type === 'metric') || messages[0]
  } else if (rand < 0.20) {
    messageType = messages.find(m => m.type === 'analysis') || messages[0]
  } else if (rand < 0.25) {
    messageType = messages.find(m => m.type === 'adaptation') || messages[0]
  } else if (rand < 0.27) {
    messageType = messages.find(m => m.type === 'anomaly') || messages[0]
  } else if (rand < 0.45) {
    messageType = messages.find(m => m.type === 'stimulus') || messages[1]
  } else if (rand < 0.80) {
    messageType = messages.find(m => m.type === 'detection') || messages[2]
  } else {
    messageType = messages.find(m => m.type === 'miss') || messages[3]
  }

  const template = messageType.templates[
    Math.floor(Math.random() * messageType.templates.length)
  ]

  const metrics = messageType.includeMetrics ? generateBehavioralMetrics() : undefined
  const metricsText = metrics ? ` [${formatMetrics(metrics)}]` : ''
  
  const details = messageType.includeDetails 
    ? ` | intensity:${(Math.random() * 100).toFixed(1)}% | confidence:${(60 + Math.random() * 40).toFixed(1)}%`
    : ''

  return {
    id: 0, // Will be set by hook
    timestamp,
    message: `${template}${metricsText}${details}`,
    type: messageType.type,
    metrics,
    details: details || undefined,
  }
}

