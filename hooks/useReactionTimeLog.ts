'use client'

import { useState, useEffect, useRef } from 'react'
import type { LogEntry } from '@/types/reactionTime'
import { generateReactionTimeLogMessage } from '@/lib/reactionTimeLog/generateReactionTimeLogMessage'

export const useReactionTimeLog = (isFocused: boolean = false) => {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const logIdRef = useRef(0)
  const logEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollContainerRef.current && isFocused) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
    }
  }, [logs, isFocused])

  useEffect(() => {
    const messages = [
      { type: 'status' as const, templates: ['Chamber initialized', 'Models synchronized', 'Reaction threshold set', 'Response protocol active', 'Neural pathways calibrated'] },
      { type: 'stimulus' as const, templates: ['Stimulus emitted', 'Signal wave generated', 'Trigger pulse transmitted', 'Sensory input activated', 'Response trigger initiated'], includeDetails: true },
      { type: 'reaction' as const, templates: ['Model B: reaction detected', 'Response registered', 'Reaction confirmed', 'Neural response triggered', 'Motor response activated'], includeDetails: true },
      { type: 'latency' as const, templates: ['Latency measured', 'Reaction time recorded', 'Response delay calculated', 'Processing time analyzed'] },
      { type: 'metric' as const, templates: ['Reaction metrics updated', 'Performance analysis complete', 'Response efficiency measured', 'Speed metrics calculated', 'Temporal analysis done'], includeMetrics: true },
      { type: 'analysis' as const, templates: ['Response pattern analyzed', 'Reaction trend identified', 'Behavioral speed evaluated', 'Cognitive processing mapped', 'Neural latency assessed'], includeMetrics: true },
      { type: 'adaptation' as const, templates: ['Model adjusted reaction parameters', 'Adaptive response optimized', 'Speed threshold modified', 'Response calibration updated', 'Learning algorithm refined'], includeMetrics: true },
      { type: 'anomaly' as const, templates: ['Anomalous reaction detected', 'Unexpected latency pattern', 'Deviation from baseline', 'Irregular response time', 'Behavioral anomaly flagged'], includeMetrics: true },
    ]

    const addLog = () => {
      const newLog = generateReactionTimeLogMessage(messages)
      newLog.id = logIdRef.current++

      setLogs(prev => {
        const updated = [...prev, newLog]
        return updated.slice(-50)
      })
    }

    addLog()

    const interval = setInterval(() => {
      addLog()
    }, 2000 + Math.random() * 3000)

    return () => clearInterval(interval)
  }, [])

  return {
    logs,
    logEndRef,
    scrollContainerRef,
  }
}

