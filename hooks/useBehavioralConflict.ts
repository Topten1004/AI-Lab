'use client'

import { useState, useEffect } from 'react'
import type { ConflictState } from '@/types/behavioralConflict'
import { calculateDominance } from '@/lib/behavioralConflict/calculateDominance'
import { applyPowerShift } from '@/lib/behavioralConflict/applyPowerShift'
import { generatePowerShift } from '@/lib/behavioralConflict/generatePowerShift'
import { rebalancePower } from '@/lib/behavioralConflict/rebalancePower'

export const useBehavioralConflict = () => {
  const [modelAPower, setModelAPower] = useState(50)
  const [modelBPower, setModelBPower] = useState(50)
  const [modelAStatus, setModelAStatus] = useState<'idle' | 'dominating' | 'adapting'>('idle')
  const [modelBStatus, setModelBStatus] = useState<'idle' | 'dominating' | 'adapting'>('idle')
  const [conflictHistory, setConflictHistory] = useState<ConflictState[]>([])
  const [currentDominance, setCurrentDominance] = useState<'A' | 'B' | 'balanced'>('balanced')

  useEffect(() => {
    const interval = setInterval(() => {
      // Random conflict event
      const eventType = Math.random()
      
      if (eventType < 0.4) {
        // Model A tries to dominate
        setModelAStatus('dominating')
        setModelBStatus('adapting')
        
        setTimeout(() => {
          const powerShift = generatePowerShift()
          setModelAPower(prev => applyPowerShift(prev, powerShift))
          setModelBPower(prev => applyPowerShift(prev, -powerShift))
        }, 300)
        
        setTimeout(() => {
          setModelAStatus('idle')
          setModelBStatus('idle')
        }, 1500)
      } else if (eventType < 0.8) {
        // Model B tries to dominate
        setModelBStatus('dominating')
        setModelAStatus('adapting')
        
        setTimeout(() => {
          const powerShift = generatePowerShift()
          setModelBPower(prev => applyPowerShift(prev, powerShift))
          setModelAPower(prev => applyPowerShift(prev, -powerShift))
        }, 300)
        
        setTimeout(() => {
          setModelAStatus('idle')
          setModelBStatus('idle')
        }, 1500)
      } else {
        // Balanced struggle
        setModelAStatus('dominating')
        setModelBStatus('dominating')
        
        setTimeout(() => {
          const shift = (Math.random() - 0.5) * 5
          setModelAPower(prev => applyPowerShift(prev, shift))
          setModelBPower(prev => applyPowerShift(prev, -shift))
        }, 300)
        
        setTimeout(() => {
          setModelAStatus('idle')
          setModelBStatus('idle')
        }, 1500)
      }
    }, 2000 + Math.random() * 2000)

    return () => clearInterval(interval)
  }, [])

  // Update dominance and history
  useEffect(() => {
    const dominance = calculateDominance(modelAPower, modelBPower)
    setCurrentDominance(dominance)
    
    setConflictHistory(prev => {
      const newState: ConflictState = {
        modelAPower,
        modelBPower,
        dominance,
        timestamp: Date.now(),
      }
      const updated = [...prev, newState]
      return updated.slice(-20) // Keep last 20 states
    })
  }, [modelAPower, modelBPower])

  // Gradual rebalancing
  useEffect(() => {
    const rebalanceInterval = setInterval(() => {
      if (Math.abs(modelAPower - modelBPower) > 5) {
        const { modelAPower: newAPower, modelBPower: newBPower } = rebalancePower(modelAPower, modelBPower)
        setModelAPower(newAPower)
        setModelBPower(newBPower)
      }
    }, 1000)

    return () => clearInterval(rebalanceInterval)
  }, [modelAPower, modelBPower])

  return {
    modelAPower,
    modelBPower,
    modelAStatus,
    modelBStatus,
    currentDominance,
  }
}

