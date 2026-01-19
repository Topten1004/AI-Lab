'use client'

import PatternPredictionVisual from './PatternPredictionVisual'
import PatternPredictionLog from './PatternPredictionLog'
import PerformanceIndicator from './PerformanceIndicator'
import ModelActivityIndicator from './ModelActivityIndicator'

interface PatternPredictionRoomProps {
  isFocused: boolean
  onFocus: () => void
}

export default function PatternPredictionRoom({ isFocused, onFocus }: PatternPredictionRoomProps) {
  return (
    <div 
      className={`p-6 bg-lab-surface transition-all duration-300 cursor-pointer border border-transparent hover:border-lab-accent/50 ${
        isFocused 
          ? 'ring-2 ring-lab-accent ring-offset-2 ring-offset-[#f5f5f5] shadow-lg shadow-lab-accent/20' 
          : ''
      }`}
      onClick={onFocus}
    >
      <div className="mb-6">
        <h2 className="text-xl font-mono font-semibold text-lab-accent mb-2">
          Pattern Prediction Room
        </h2>
        <p className="text-sm text-lab-text/70">
          One model creates sequences, the other tries to predict the next element.
          Goal: to demonstrate basic NOESIS modeling.
        </p>
      </div>

      <div 
        className="pb-4 mb-6"
        onClick={(e) => e.stopPropagation()}
      >
        <ModelActivityIndicator />
      </div>
      
      <div 
        className="space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-10">
            <PatternPredictionVisual />
          </div>
          <div className="lg:col-span-2 flex items-start">
            <PerformanceIndicator />
          </div>
        </div>
        <div>
          <PatternPredictionLog isFocused={isFocused} />
        </div>
      </div>
    </div>
  )
}

