'use client'

import BehavioralConflictVisual from './BehavioralConflictVisual'
import BehavioralConflictLog from './BehavioralConflictLog'
import PerformanceIndicator from './PerformanceIndicator'
import ModelActivityIndicator from './ModelActivityIndicator'

interface BehavioralConflictZoneProps {
  isFocused: boolean
  onFocus: () => void
}

export default function BehavioralConflictZone({ isFocused, onFocus }: BehavioralConflictZoneProps) {
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
          NOESIS Conflict Zone
        </h2>
        <p className="text-sm text-lab-text/70">
          Two models attempt to dominate or adapt to each other's behavior.
          Goal: to demonstrate "conflict" or "tug-of-war."
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
            <BehavioralConflictVisual />
          </div>
          <div className="lg:col-span-2 flex items-start">
            <PerformanceIndicator />
          </div>
        </div>
        <div>
          <BehavioralConflictLog isFocused={isFocused} />
        </div>
      </div>
    </div>
  )
}

