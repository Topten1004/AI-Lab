'use client'

import { useState, useEffect, useRef } from 'react'
import type { LogEntry } from '@/types/behavioralConflict'
import { generateBehavioralConflictLogMessage } from '@/lib/behavioralConflictLog/generateBehavioralConflictLogMessage'
import { generateExperimentId } from '@/lib/behavioralMetrics/generateExperimentId'
import { useBehavioralConflict } from '@/hooks/useBehavioralConflict'

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

  const experimentIdRef = useRef<string | undefined>(undefined)
  const powerValuesRef = useRef<number[]>([])
  const changeEventsRef = useRef(0)
  const { currentDominance } = useBehavioralConflict()

  useEffect(() => {
    // Generate unique experiment ID on mount
    if (!experimentIdRef.current) {
      experimentIdRef.current = generateExperimentId()
    }

    const messages = [
      { type: 'status' as const, templates: ['Zone initialized', 'Conflict protocol active', 'Models engaged', 'Power dynamics calibrated', 'Conflict resolution system ready', 'Experiment session started', 'NOESIS tracking enabled', 'Metrics collection active'] },
      { type: 'domination' as const, templates: ['Model A: dominance attempt', 'Model B: dominance attempt', 'Power shift detected', 'Dominance threshold exceeded', 'Control mechanism activated', 'Dominance pattern observed', 'Power assertion logged', 'Control attempt registered'] },
      { type: 'adaptation' as const, templates: ['Model A: adapting behavior', 'Model B: adapting behavior', 'NOESIS adjustment', 'Adaptive response initiated', 'NOESIS recalibration active', 'Adaptation cycle complete', 'NOESIS modification logged', 'Adaptive learning active'] },
      { type: 'conflict' as const, templates: ['Conflict escalation', 'Tug-of-war detected', 'Struggle intensifies', 'Power struggle active', 'Conflict tension rising', 'Conflict event logged', 'Power struggle intensified', 'Tension threshold exceeded'] },
      { type: 'balance' as const, templates: ['Equilibrium reached', 'Balance restored', 'Conflict stabilized', 'Harmony achieved', 'Power equilibrium maintained', 'Balance state confirmed', 'Equilibrium validated', 'Stability restored'] },
      { type: 'metric' as const, templates: ['NOESIS metrics updated', 'Performance analysis complete', 'Stability measurement recorded', 'Variability index calculated', 'Deviation analysis performed', 'Reactivity assessment updated'] },
      { type: 'anomaly' as const, templates: ['Anomalous behavior detected', 'Unexpected pattern observed', 'Deviation from baseline', 'Anomaly threshold exceeded', 'Irregular response pattern', 'NOESIS anomaly flagged'] },
      { type: 'performance' as const, templates: ['Performance metrics logged', 'Efficiency analysis complete', 'Response time optimized', 'Detection rate improved', 'System performance stable', 'Optimization cycle complete'] },
    ]

    const addLog = () => {
      // Track power values for metrics (based on dominance)
      const currentPower = currentDominance === 'A' ? 70 : currentDominance === 'B' ? 30 : 50
      powerValuesRef.current.push(currentPower)
      if (powerValuesRef.current.length > 10) {
        powerValuesRef.current.shift()
      }

      // Track change events
      if (Math.random() < 0.1) {
        changeEventsRef.current += 1
      }

      const newLog = generateBehavioralConflictLogMessage(messages, {
        experimentId: experimentIdRef.current,
        recentPowerValues: powerValuesRef.current,
        currentPower,
        expectedPower: 50,
        changeEvents: changeEventsRef.current,
      })
      newLog.id = logIdRef.current++

      setLogs(prev => {
        const updated = [...prev, newLog]
        return updated.slice(-50)
      })
    }

    addLog()

    // Dynamic interval for more natural log generation
    const getNextInterval = () => 2000 + Math.random() * 3000
    let timeoutId: NodeJS.Timeout
    
    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        addLog()
        scheduleNext()
      }, getNextInterval())
    }
    
    scheduleNext()
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  return {
    logs,
    logEndRef,
    scrollContainerRef,
  }
}

