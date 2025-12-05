'use client'

import { useState, useEffect, useRef } from 'react'
import type { Stimulus } from '@/types/reactionTime'
import { generateReactionStimulus } from '@/lib/reactionTime/generateReactionStimulus'
import { calculateAverageReactionTime } from '@/lib/reactionTime/calculateAverageReactionTime'
import { filterOldReactionStimuli } from '@/lib/reactionTime/filterOldReactionStimuli'
import { generateReactionDelay } from '@/lib/reactionTime/generateReactionDelay'

export const useReactionTime = () => {
  const [stimuli, setStimuli] = useState<Stimulus[]>([])
  const [modelAStatus, setModelAStatus] = useState<'idle' | 'emitting'>('idle')
  const [modelBStatus, setModelBStatus] = useState<'idle' | 'reacting'>('idle')
  const [currentStimulus, setCurrentStimulus] = useState<Stimulus | null>(null)
  const [averageReactionTime, setAverageReactionTime] = useState(0)
  const stimulusIdRef = useRef(0)
  const reactionStartRef = useRef<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      // Model A emits a stimulus
      setModelAStatus('emitting')
      
      setTimeout(() => {
        const newStimulus = generateReactionStimulus(stimulusIdRef.current++)
        
        setCurrentStimulus(newStimulus)
        setStimuli(prev => [...prev, newStimulus])
        setModelAStatus('idle')
        reactionStartRef.current = Date.now()
        
        // Model B reacts after a delay (simulating reaction time)
        const reactionDelay = generateReactionDelay()
        setModelBStatus('reacting')
        
        setTimeout(() => {
          const reactionTime = Date.now() - (reactionStartRef.current || Date.now())
          
          setStimuli(prevStimuli => {
            const updated = prevStimuli.map(s => 
              s.id === newStimulus.id 
                ? { ...s, reactionTime, responded: true } 
                : s
            )
            setAverageReactionTime(calculateAverageReactionTime(updated, reactionTime))
            return updated
          })
          
          setCurrentStimulus(null)
          setModelBStatus('idle')
        }, reactionDelay)
      }, 300)
    }, 4000 + Math.random() * 2000) // Emit every 4-6 seconds

    return () => clearInterval(interval)
  }, [stimuli.length])

  // Cleanup old stimuli
  useEffect(() => {
    const cleanup = setInterval(() => {
      setStimuli(prev => filterOldReactionStimuli(prev))
    }, 1000)
    return () => clearInterval(cleanup)
  }, [])

  return {
    stimuli,
    modelAStatus,
    modelBStatus,
    currentStimulus,
    averageReactionTime,
  }
}

