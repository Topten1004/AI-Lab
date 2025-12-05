'use client'

import { useState, useEffect, useRef } from 'react'
import type { Stimulus } from '@/types/attentionResponse'
import { generateStimulus } from '@/lib/attentionResponse/generateStimulus'
import { calculateDetectionRate } from '@/lib/attentionResponse/calculateDetectionRate'
import { filterOldStimuli } from '@/lib/attentionResponse/filterOldStimuli'

export const useAttentionResponse = () => {
  const [stimuli, setStimuli] = useState<Stimulus[]>([])
  const [modelAStatus, setModelAStatus] = useState<'idle' | 'generating'>('idle')
  const [modelBStatus, setModelBStatus] = useState<'idle' | 'detecting' | 'detected'>('idle')
  const [detectionRate, setDetectionRate] = useState(0)
  const stimulusIdRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      // Model A generates a stimulus
      setModelAStatus('generating')
      
      setTimeout(() => {
        const newStimulus = generateStimulus(stimulusIdRef.current++)
        
        setStimuli(prev => [...prev, newStimulus])
        setModelAStatus('idle')
        
        // Model B attempts to detect
        setModelBStatus('detecting')
        
        setTimeout(() => {
          const willDetect = Math.random() > 0.3 // 70% detection rate
          
          setStimuli(prevStimuli => {
            const updated = prevStimuli.map(s => 
              s.id === newStimulus.id ? { ...s, detected: willDetect } : s
            )
            setDetectionRate(calculateDetectionRate(updated, willDetect))
            return updated
          })
          
          if (willDetect) {
            setModelBStatus('detected')
            setTimeout(() => setModelBStatus('idle'), 500)
          } else {
            setModelBStatus('idle')
          }
        }, 800 + Math.random() * 1200) // Detection delay
      }, 300)
    }, 3000 + Math.random() * 2000) // Generate every 3-5 seconds

    return () => clearInterval(interval)
  }, [stimuli.length])

  // Remove old stimuli after 8 seconds
  useEffect(() => {
    const cleanup = setInterval(() => {
      setStimuli(prev => filterOldStimuli(prev))
    }, 1000)
    return () => clearInterval(cleanup)
  }, [])

  return {
    stimuli,
    modelAStatus,
    modelBStatus,
    detectionRate,
  }
}

