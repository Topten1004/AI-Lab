'use client'

import BehavioralConflictVisual from './BehavioralConflictVisual'
import BehavioralConflictLog from './BehavioralConflictLog'

interface BehavioralConflictZoneProps {
  isFocused: boolean
  onFocus: () => void
}

export default function BehavioralConflictZone({ isFocused, onFocus }: BehavioralConflictZoneProps) {
  return (
    <div 
      className={`lab-border rounded-lg p-6 bg-lab-surface transition-all duration-300 cursor-pointer ${
        isFocused 
          ? 'ring-2 ring-lab-accent ring-offset-2 ring-offset-[#0a0a0a] shadow-lg shadow-lab-accent/20' 
          : 'hover:border-lab-accent/50'
      }`}
      onClick={onFocus}
    >
      <div className="mb-6">
        <h2 className="text-xl font-mono text-lab-accent mb-2">
          Behavioral Conflict Zone
        </h2>
        <p className="text-sm text-lab-text/70">
          Two models attempt to dominate or adapt to each other's behavior.
          Goal: to demonstrate "conflict" or "tug-of-war."
        </p>
      </div>
      
      <div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lg:col-span-2">
          <BehavioralConflictVisual />
        </div>
        <div className="lg:col-span-1">
          <BehavioralConflictLog isFocused={isFocused} />
        </div>
      </div>
    </div>
  )
}

