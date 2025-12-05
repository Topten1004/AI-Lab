import type { LogEntry } from '@/types/patternPrediction'

interface MessageTemplate {
  type: LogEntry['type']
  templates: string[]
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
  
  if (rand < 0.1) {
    messageType = messages[0] // status
  } else if (rand < 0.3) {
    messageType = messages[1] // sequence
  } else if (rand < 0.5) {
    messageType = messages[2] // prediction
  } else if (rand < 0.85) {
    messageType = messages[3] // correct
  } else {
    messageType = messages[4] // incorrect
  }

  const template = messageType.templates[
    Math.floor(Math.random() * messageType.templates.length)
  ]

  return {
    id: 0, // Will be set by hook
    timestamp,
    message: template,
    type: messageType.type,
  }
}

