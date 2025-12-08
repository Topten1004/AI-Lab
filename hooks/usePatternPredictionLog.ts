'use client'

import { useState, useEffect, useRef } from 'react'
import type { LogEntry } from '@/types/patternPrediction'
import { generatePatternPredictionLogMessage } from '@/lib/patternPredictionLog/generatePatternPredictionLogMessage'

export const usePatternPredictionLog = (isFocused: boolean = false) => {
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
      { type: 'status' as const, templates: ['Room initialized', 'Pattern recognition active', 'Prediction model loaded', 'Cognitive analysis engine ready', 'Pattern database synchronized'] },
      { type: 'sequence' as const, templates: ['Sequence element generated', 'Pattern extended', 'New element added', 'Pattern sequence updated', 'Cognitive pattern expanded'], includeDetails: true },
      { type: 'prediction' as const, templates: ['Model B: prediction made', 'Next element predicted', 'Pattern analysis complete', 'Cognitive forecast generated', 'Pattern projection calculated'], includeDetails: true },
      { type: 'correct' as const, templates: ['Prediction correct', 'Pattern matched', 'Successful prediction', 'Cognitive accuracy confirmed', 'Pattern recognition validated'] },
      { type: 'incorrect' as const, templates: ['Prediction incorrect', 'Pattern mismatch', 'Prediction failed', 'Cognitive deviation detected', 'Pattern recognition error'] },
      { type: 'metric' as const, templates: ['Prediction metrics updated', 'Accuracy analysis complete', 'Pattern recognition efficiency measured', 'Cognitive performance evaluated', 'Prediction success rate calculated'], includeMetrics: true },
      { type: 'analysis' as const, templates: ['Pattern structure analyzed', 'Sequence trend identified', 'Cognitive pattern mapped', 'Prediction confidence assessed', 'Pattern complexity evaluated'], includeMetrics: true },
      { type: 'adaptation' as const, templates: ['Model adjusted prediction parameters', 'Learning algorithm updated', 'Pattern recognition refined', 'Cognitive model adapted', 'Prediction threshold modified'], includeMetrics: true },
      { type: 'anomaly' as const, templates: ['Anomalous pattern detected', 'Unexpected sequence deviation', 'Pattern anomaly flagged', 'Cognitive irregularity observed', 'Sequence anomaly identified'], includeMetrics: true },
    ]

    const addLog = () => {
      const newLog = generatePatternPredictionLogMessage(messages)
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

