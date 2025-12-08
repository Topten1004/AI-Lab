import type { LogEntry } from '@/types/patternPrediction'
import { generateBehavioralMetrics, formatMetrics } from './generateMetrics'

interface MessageTemplate {
  type: LogEntry['type']
  templates: string[]
  includeMetrics?: boolean
  includeDetails?: boolean
}

export const generatePatternPredictionLogMessage = (messages: MessageTemplate[]): LogEntry => {
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
    messageType = messages.find(m => m.type === 'status') || messages[0]
  } else if (rand < 0.15) {
    messageType = messages.find(m => m.type === 'metric') || messages[0]
  } else if (rand < 0.20) {
    messageType = messages.find(m => m.type === 'analysis') || messages[0]
  } else if (rand < 0.25) {
    messageType = messages.find(m => m.type === 'adaptation') || messages[0]
  } else if (rand < 0.27) {
    messageType = messages.find(m => m.type === 'anomaly') || messages[0]
  } else if (rand < 0.40) {
    messageType = messages.find(m => m.type === 'sequence') || messages[1]
  } else if (rand < 0.55) {
    messageType = messages.find(m => m.type === 'prediction') || messages[2]
  } else if (rand < 0.85) {
    messageType = messages.find(m => m.type === 'correct') || messages[3]
  } else {
    messageType = messages.find(m => m.type === 'incorrect') || messages[4]
  }

  const template = messageType.templates[
    Math.floor(Math.random() * messageType.templates.length)
  ]

  const metrics = messageType.includeMetrics ? generateBehavioralMetrics() : undefined
  const metricsText = metrics ? ` [${formatMetrics(metrics)}]` : ''
  
  const details = messageType.includeDetails 
    ? ` | accuracy:${(messageType.type === 'correct' ? 85 + Math.random() * 15 : 40 + Math.random() * 40).toFixed(1)}% | confidence:${(60 + Math.random() * 40).toFixed(1)}%`
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

