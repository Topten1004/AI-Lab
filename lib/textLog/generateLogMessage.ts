import type { LogEntry } from '@/types/attentionResponse'

interface MessageTemplate {
  type: LogEntry['type']
  templates: string[]
}

export const generateLogMessage = (messages: MessageTemplate[]): LogEntry => {
  const now = new Date()
  const timestamp = now.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  // Weighted random selection
  const rand = Math.random()
  let messageType: MessageTemplate
  
  if (rand < 0.1) {
    messageType = messages[0] // status
  } else if (rand < 0.4) {
    messageType = messages[1] // stimulus
  } else if (rand < 0.85) {
    messageType = messages[2] // detection
  } else {
    messageType = messages[3] // miss
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

