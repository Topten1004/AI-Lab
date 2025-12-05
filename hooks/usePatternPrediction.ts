'use client'

import { useState, useEffect, useRef } from 'react'
import type { SequenceElement } from '@/types/patternPrediction'
import { generateSequenceElement } from '@/lib/patternPrediction/generateSequenceElement'
import { getNextPatternValue } from '@/lib/patternPrediction/getNextPatternValue'
import { calculateAccuracy } from '@/lib/patternPrediction/calculateAccuracy'
import { limitSequenceLength } from '@/lib/patternPrediction/limitSequenceLength'
import { generatePrediction } from '@/lib/patternPrediction/generatePrediction'

const PATTERNS = [
  ['A', 'B', 'C', 'A', 'B', 'C'],
  ['1', '2', '3', '1', '2', '3'],
  ['X', 'Y', 'Z', 'X', 'Y', 'Z'],
  ['α', 'β', 'γ', 'α', 'β', 'γ'],
]

export const usePatternPrediction = () => {
  const [sequence, setSequence] = useState<SequenceElement[]>([])
  const [prediction, setPrediction] = useState<string | null>(null)
  const [modelAStatus, setModelAStatus] = useState<'idle' | 'generating'>('idle')
  const [modelBStatus, setModelBStatus] = useState<'idle' | 'predicting' | 'correct' | 'incorrect'>('idle')
  const [accuracy, setAccuracy] = useState(0)
  const elementIdRef = useRef(0)
  const [currentPattern, setCurrentPattern] = useState<string[]>(PATTERNS[0])
  const [patternIndex, setPatternIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      // Model A generates next element in sequence
      setModelAStatus('generating')
      
      setTimeout(() => {
        const nextValue = getNextPatternValue(currentPattern, patternIndex)
        const newElement = generateSequenceElement(elementIdRef.current++, nextValue)
        
        setSequence(prev => [...prev, newElement])
        setPatternIndex(prev => prev + 1)
        setModelAStatus('idle')
        
        // Model B attempts to predict
        setModelBStatus('predicting')
        
        setTimeout(() => {
          // Prediction logic: sometimes correct, sometimes wrong
          const willPredictCorrectly = Math.random() > 0.25 // 75% accuracy
          const predictedValue = generatePrediction(currentPattern, patternIndex, willPredictCorrectly)
          
          setPrediction(predictedValue)
          
          setTimeout(() => {
            const actualNext = getNextPatternValue(currentPattern, patternIndex + 1)
            const isCorrect = predictedValue === actualNext
            
            setSequence(prevSequence => {
              const updated = prevSequence.map(s => 
                s.id === newElement.id 
                  ? { ...s, predicted: true, correct: isCorrect } 
                  : s
              )
              setAccuracy(calculateAccuracy(updated, { ...newElement, predicted: true, correct: isCorrect }, isCorrect))
              return updated
            })
            
            setModelBStatus(isCorrect ? 'correct' : 'incorrect')
            setPrediction(null)
            
            setTimeout(() => setModelBStatus('idle'), 1000)
          }, 500)
        }, 600 + Math.random() * 800)
      }, 300)
    }, 3000 + Math.random() * 2000)

    return () => clearInterval(interval)
  }, [sequence.length, patternIndex, currentPattern])

  // Change pattern occasionally
  useEffect(() => {
    const patternChange = setInterval(() => {
      const newPattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)]
      setCurrentPattern(newPattern)
      setSequence([])
      setPatternIndex(0)
    }, 30000) // Change every 30 seconds

    return () => clearInterval(patternChange)
  }, [])

  // Keep only last 8 elements
  useEffect(() => {
    setSequence(prev => limitSequenceLength(prev))
  }, [sequence.length])

  return {
    sequence,
    prediction,
    modelAStatus,
    modelBStatus,
    accuracy,
    currentPattern,
  }
}

