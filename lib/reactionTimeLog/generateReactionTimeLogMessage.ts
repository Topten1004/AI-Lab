import type { LogEntry } from '@/types/reactionTime'

interface MessageTemplate {
  type: LogEntry['type']
  templates: string[]
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
  
  if (rand < 0.1) {
    messageType = messages[0] // status
  } else if (rand < 0.4) {
    messageType = messages[1] // stimulus
  } else if (rand < 0.7) {
    messageType = messages[2] // reaction
  } else {
    messageType = messages[3] // latency
  }

  const template = messageType.templates[
    Math.floor(Math.random() * messageType.templates.length)
  ]

  const reactionTime = messageType.type === 'latency' || messageType.type === 'reaction'
    ? Math.round(200 + Math.random() * 800)
    : undefined

  return {
    id: 0, // Will be set by hook
    timestamp,
    message: reactionTime ? `${template}: ${reactionTime}ms` : template,
    type: messageType.type,
    reactionTime,
  }
}

