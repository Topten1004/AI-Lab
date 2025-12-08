'use client'

import { useState, useEffect, useRef } from 'react'
import type { LogEntry } from '@/types/behavioralConflict'
import { generateBehavioralConflictLogMessage } from '@/lib/behavioralConflictLog/generateBehavioralConflictLogMessage'

export const useBehavioralConflictLog = (isFocused: boolean = false) => {
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
      { type: 'status' as const, templates: ['Zone initialized', 'Conflict protocol active', 'Models engaged', 'Power dynamics calibrated', 'Conflict resolution system ready'] },
      { type: 'domination' as const, templates: ['Model A: dominance attempt', 'Model B: dominance attempt', 'Power shift detected', 'Dominance threshold exceeded', 'Control mechanism activated'], includeDetails: true },
      { type: 'adaptation' as const, templates: ['Model A: adapting behavior', 'Model B: adapting behavior', 'Behavioral adjustment', 'Adaptive response initiated', 'Behavioral recalibration active'], includeDetails: true },
      { type: 'conflict' as const, templates: ['Conflict escalation', 'Tug-of-war detected', 'Struggle intensifies', 'Power struggle active', 'Conflict tension rising'], includeDetails: true },
      { type: 'balance' as const, templates: ['Equilibrium reached', 'Balance restored', 'Conflict stabilized', 'Harmony achieved', 'Power equilibrium maintained'] },
      { type: 'metric' as const, templates: ['Conflict metrics updated', 'Power dynamics analyzed', 'Behavioral tension measured', 'Dominance ratio calculated', 'Equilibrium stability assessed'], includeMetrics: true },
      { type: 'analysis' as const, templates: ['Conflict pattern analyzed', 'Power distribution evaluated', 'Behavioral dynamics mapped', 'Tension trend identified', 'Conflict resolution assessed'], includeMetrics: true },
      { type: 'anomaly' as const, templates: ['Anomalous conflict behavior', 'Unexpected power shift', 'Conflict deviation detected', 'Irregular dominance pattern', 'Behavioral anomaly flagged'], includeMetrics: true },
    ]

    const addLog = () => {
      const newLog = generateBehavioralConflictLogMessage(messages)
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

