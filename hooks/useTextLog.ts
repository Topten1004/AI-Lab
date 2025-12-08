'use client'

import { useState, useEffect, useRef } from 'react'
import type { LogEntry } from '@/types/attentionResponse'
import { generateLogMessage } from '@/lib/textLog/generateLogMessage'

export const useTextLog = (isFocused: boolean = false) => {
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
      { type: 'status' as const, templates: ['System initialized', 'Models synchronized', 'Detection threshold calibrated', 'Observation protocol active', 'Neural pathways established'] },
      { type: 'stimulus' as const, templates: ['Stimulus emitted', 'Pattern generated', 'Signal wave transmitted', 'Stimulus sequence initiated', 'Sensory input generated', 'Pattern wavefront detected'], includeDetails: true },
      { type: 'detection' as const, templates: ['Model B: response detected', 'Pattern recognized', 'Signal matched', 'Detection confirmed', 'Neural response triggered', 'Pattern correlation established'], includeDetails: true },
      { type: 'miss' as const, templates: ['Stimulus not detected', 'Pattern missed', 'Signal below threshold', 'Detection failed', 'Response threshold not met', 'Pattern recognition incomplete'] },
      { type: 'metric' as const, templates: ['Behavioral metrics updated', 'Performance analysis complete', 'Response rate calculated', 'Detection efficiency measured', 'Cognitive load assessed'], includeMetrics: true },
      { type: 'analysis' as const, templates: ['Pattern analysis in progress', 'Response pattern identified', 'Behavioral trend detected', 'Cognitive state evaluated', 'Neural activity mapped'], includeMetrics: true },
      { type: 'adaptation' as const, templates: ['Model adjusted internal parameters', 'Adaptive response initiated', 'Learning algorithm activated', 'Behavioral pattern updated', 'Recognition threshold modified'], includeMetrics: true },
      { type: 'anomaly' as const, templates: ['Anomalous behavior detected', 'Unexpected response pattern', 'Deviation from baseline observed', 'Irregular cognitive activity', 'Behavioral anomaly flagged'], includeMetrics: true },
    ]

    const addLog = () => {
      const newLog = generateLogMessage(messages)
      newLog.id = logIdRef.current++

      setLogs(prev => {
        const updated = [...prev, newLog]
        return updated.slice(-50)
      })
    }

    // Initial log
    addLog()

    // Add logs every 2-5 seconds
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

