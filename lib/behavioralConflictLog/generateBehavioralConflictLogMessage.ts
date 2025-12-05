import type { LogEntry } from '@/types/behavioralConflict'

interface MessageTemplate {
  type: LogEntry['type']
  templates: string[]
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
  
  if (rand < 0.1) {
    messageType = messages[0] // status
  } else if (rand < 0.4) {
    messageType = messages[1] // domination
  } else if (rand < 0.6) {
    messageType = messages[2] // adaptation
  } else if (rand < 0.8) {
    messageType = messages[3] // conflict
  } else {
    messageType = messages[4] // balance
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

