'use client'

import { useState, useEffect, useRef } from 'react'
import type { LogEntry } from '@/types/patternPrediction'
import { generatePatternPredictionLogMessage } from '@/lib/patternPredictionLog/generatePatternPredictionLogMessage'
import { generateExperimentId } from '@/lib/behavioralMetrics/generateExperimentId'
import { usePatternPrediction } from '@/hooks/usePatternPrediction'

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

  const experimentIdRef = useRef<string | undefined>(undefined)
  const accuraciesRef = useRef<number[]>([])
  const responseTimesRef = useRef<number[]>([])
  const changeEventsRef = useRef(0)
  const { accuracy } = usePatternPrediction()

  useEffect(() => {
    // Generate unique experiment ID on mount
    if (!experimentIdRef.current) {
      experimentIdRef.current = generateExperimentId()
    }

    const messages = [
      { type: 'status' as const, templates: ['Room initialized', 'Pattern recognition active', 'Prediction model loaded', 'Cognitive analysis engine ready', 'Pattern database synchronized', 'Experiment session started', 'NOESIS tracking enabled', 'Metrics collection active'] },
      { type: 'sequence' as const, templates: ['Sequence element generated', 'Pattern extended', 'New element added', 'Pattern sequence updated', 'Cognitive pattern expanded', 'Pattern element appended', 'Sequence progression logged', 'Pattern structure updated'] },
      { type: 'prediction' as const, templates: ['Model B: prediction made', 'Next element predicted', 'Pattern analysis complete', 'Cognitive forecast generated', 'Pattern projection calculated', 'Prediction algorithm executed', 'Forecast generated', 'Pattern inference complete'] },
      { type: 'correct' as const, templates: ['Prediction correct', 'Pattern matched', 'Successful prediction', 'Cognitive accuracy confirmed', 'Pattern recognition validated', 'Prediction validated', 'Pattern match confirmed', 'Accuracy verified'] },
      { type: 'incorrect' as const, templates: ['Prediction incorrect', 'Pattern mismatch', 'Prediction failed', 'Cognitive deviation detected', 'Pattern recognition error', 'Prediction error logged', 'Pattern mismatch detected', 'Forecast deviation'] },
      { type: 'adaptation' as const, templates: ['Model adjusted internal parameters', 'Learning rate optimized', 'Pattern recognition improved', 'Cognitive adaptation successful', 'Model performance enhanced', 'Neural weights updated', 'Prediction accuracy increased', 'Adaptive learning cycle complete'] },
      { type: 'metric' as const, templates: ['NOESIS metrics updated', 'Performance analysis complete', 'Stability measurement recorded', 'Variability index calculated', 'Deviation analysis performed', 'Reactivity assessment updated'] },
      { type: 'anomaly' as const, templates: ['Anomalous behavior detected', 'Unexpected pattern observed', 'Deviation from baseline', 'Anomaly threshold exceeded', 'Irregular response pattern', 'NOESIS anomaly flagged'] },
      { type: 'performance' as const, templates: ['Performance metrics logged', 'Efficiency analysis complete', 'Response time optimized', 'Detection rate improved', 'System performance stable', 'Optimization cycle complete'] },
    ]

    const addLog = () => {
      // Track accuracy for metrics
      if (accuracy > 0) {
        accuraciesRef.current.push(accuracy)
        if (accuraciesRef.current.length > 10) {
          accuraciesRef.current.shift()
        }
      }

      // Simulate response time tracking
      const responseTime = 300 + Math.random() * 500
      responseTimesRef.current.push(responseTime)
      if (responseTimesRef.current.length > 10) {
        responseTimesRef.current.shift()
      }

      // Track change events
      if (Math.random() < 0.1) {
        changeEventsRef.current += 1
      }

      const newLog = generatePatternPredictionLogMessage(messages, {
        experimentId: experimentIdRef.current,
        recentAccuracies: accuraciesRef.current,
        recentResponseTimes: responseTimesRef.current,
        currentAccuracy: accuracy,
        expectedAccuracy: 75,
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

