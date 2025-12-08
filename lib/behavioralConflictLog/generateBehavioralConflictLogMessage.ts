import type { LogEntry } from '@/types/behavioralConflict'
import { generateBehavioralMetrics, formatMetrics } from './generateMetrics'

interface MessageTemplate {
  type: LogEntry['type']
  templates: string[]
  includeMetrics?: boolean
  includeDetails?: boolean
}

export const generateBehavioralConflictLogMessage = (messages: MessageTemplate[]): LogEntry => {
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
  } else if (rand < 0.27) {
    messageType = messages.find(m => m.type === 'anomaly') || messages[0]
  } else if (rand < 0.45) {
    messageType = messages.find(m => m.type === 'domination') || messages[1]
  } else if (rand < 0.60) {
    messageType = messages.find(m => m.type === 'adaptation') || messages[2]
  } else if (rand < 0.80) {
    messageType = messages.find(m => m.type === 'conflict') || messages[3]
  } else {
    messageType = messages.find(m => m.type === 'balance') || messages[4]
  }

  const template = messageType.templates[
    Math.floor(Math.random() * messageType.templates.length)
  ]

  const metrics = messageType.includeMetrics ? generateBehavioralMetrics() : undefined
  const metricsText = metrics ? ` [${formatMetrics(metrics)}]` : ''
  
  const details = messageType.includeDetails 
    ? ` | power_diff:${(Math.random() * 100).toFixed(1)}% | tension:${(30 + Math.random() * 70).toFixed(1)}%`
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

