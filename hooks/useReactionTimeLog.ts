'use client'

import { useState, useEffect, useRef } from 'react'
import type { LogEntry } from '@/types/reactionTime'
import { generateReactionTimeLogMessage } from '@/lib/reactionTimeLog/generateReactionTimeLogMessage'
import { generateExperimentId } from '@/lib/behavioralMetrics/generateExperimentId'
import { useReactionTime } from '@/hooks/useReactionTime'

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

  const experimentIdRef = useRef<string | undefined>(undefined)
  const reactionTimesRef = useRef<number[]>([])
  const changeEventsRef = useRef(0)
  const { averageReactionTime } = useReactionTime()

  useEffect(() => {
    // Generate unique experiment ID on mount
    if (!experimentIdRef.current) {
      experimentIdRef.current = generateExperimentId()
    }

    const messages = [
      { type: 'status' as const, templates: ['Chamber initialized', 'Models synchronized', 'Reaction threshold set', 'Response protocol active', 'Neural pathways calibrated', 'Experiment session started', 'NOESIS tracking enabled', 'Metrics collection active'] },
      { type: 'stimulus' as const, templates: ['Stimulus emitted', 'Signal wave generated', 'Trigger pulse transmitted', 'Sensory input activated', 'Response trigger initiated', 'Stimulus pulse activated', 'Trigger signal sent', 'Sensory trigger generated'] },
      { type: 'reaction' as const, templates: ['Model B: reaction detected', 'Response registered', 'Reaction confirmed', 'Neural response triggered', 'Motor response activated', 'Response logged', 'Reaction validated', 'Response confirmed'] },
      { type: 'latency' as const, templates: ['Latency measured', 'Reaction time recorded', 'Response delay calculated', 'Processing time analyzed', 'Reaction time logged', 'Response latency recorded', 'Processing delay measured'] },
      { type: 'metric' as const, templates: ['NOESIS metrics updated', 'Performance analysis complete', 'Stability measurement recorded', 'Variability index calculated', 'Deviation analysis performed', 'Reactivity assessment updated'] },
      { type: 'anomaly' as const, templates: ['Anomalous behavior detected', 'Unexpected pattern observed', 'Deviation from baseline', 'Anomaly threshold exceeded', 'Irregular response pattern', 'NOESIS anomaly flagged'] },
      { type: 'performance' as const, templates: ['Performance metrics logged', 'Efficiency analysis complete', 'Response time optimized', 'Detection rate improved', 'System performance stable', 'Optimization cycle complete'] },
    ]

    const addLog = () => {
      // Track reaction times for metrics
      const currentReactionTime = averageReactionTime > 0 
        ? averageReactionTime 
        : Math.round(200 + Math.random() * 800)
      
      reactionTimesRef.current.push(currentReactionTime)
      if (reactionTimesRef.current.length > 10) {
        reactionTimesRef.current.shift()
      }

      // Track change events
      if (Math.random() < 0.1) {
        changeEventsRef.current += 1
      }

      const newLog = generateReactionTimeLogMessage(messages, {
        experimentId: experimentIdRef.current,
        recentReactionTimes: reactionTimesRef.current,
        currentReactionTime,
        expectedReactionTime: 500,
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

