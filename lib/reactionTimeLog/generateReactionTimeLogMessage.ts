import type { LogEntry } from '@/types/reactionTime'
import { generateBehavioralMetrics, formatMetrics } from './generateMetrics'

interface MessageTemplate {
  type: LogEntry['type']
  templates: string[]
  includeMetrics?: boolean
  includeDetails?: boolean
}

export const generateReactionTimeLogMessage = (messages: MessageTemplate[]): LogEntry => {
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
  } else if (rand < 0.45) {
    messageType = messages.find(m => m.type === 'stimulus') || messages[1]
  } else if (rand < 0.70) {
    messageType = messages.find(m => m.type === 'reaction') || messages[2]
  } else {
    messageType = messages.find(m => m.type === 'latency') || messages[3]
  }

  const template = messageType.templates[
    Math.floor(Math.random() * messageType.templates.length)
  ]

  const reactionTime = messageType.type === 'latency' || messageType.type === 'reaction'
    ? Math.round(200 + Math.random() * 800)
    : undefined

  const metrics = messageType.includeMetrics ? generateBehavioralMetrics() : undefined
  const metricsText = metrics ? ` [${formatMetrics(metrics)}]` : ''
  
  const details = messageType.includeDetails 
    ? ` | speed:${(reactionTime ? (1000 - reactionTime) / 10 : Math.random() * 100).toFixed(1)}% | efficiency:${(70 + Math.random() * 30).toFixed(1)}%`
    : ''

  const reactionTimeText = reactionTime ? `: ${reactionTime}ms` : ''

  return {
    id: 0, // Will be set by hook
    timestamp,
    message: `${template}${reactionTimeText}${metricsText}${details}`,
    type: messageType.type,
    reactionTime,
    metrics,
    details: details || undefined,
  }
}

