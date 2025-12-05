'use client'

import { useAttentionResponse } from '@/hooks/useAttentionResponse'

export default function ExperimentVisual() {
  const { stimuli, modelAStatus, modelBStatus, detectionRate } = useAttentionResponse()

  return (
    <div className="lab-border rounded-lg p-6 bg-lab-bg h-[400px] relative overflow-hidden">
      {/* Model A - Stimulus Generator */}
      <div className="absolute top-4 left-4">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-3 h-3 rounded-full ${
            modelAStatus === 'generating' 
              ? 'bg-lab-accent lab-pulse lab-glow' 
              : 'bg-lab-text/30'
          }`} />
          <span className="text-xs text-lab-text/70">Model A (Generator)</span>
        </div>
      </div>

      {/* Model B - Detector */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-3 h-3 rounded-full ${
            modelBStatus === 'detecting' 
              ? 'bg-lab-warning lab-pulse' 
              : modelBStatus === 'detected'
              ? 'bg-lab-accent lab-glow'
              : 'bg-lab-text/30'
          }`} />
          <span className="text-xs text-lab-text/70">Model B (Detector)</span>
        </div>
        <div className="text-xs text-lab-text/50 mt-1">
          Detection Rate: {detectionRate}%
        </div>
      </div>

      {/* Connection Line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <line
          x1="10%"
          y1="10%"
          x2="90%"
          y2="10%"
          stroke="rgba(42, 42, 42, 0.5)"
          strokeWidth="1"
          strokeDasharray="4,4"
        />
      </svg>

      {/* Stimuli Visualization */}
      {stimuli.map((stimulus) => (
        <div
          key={stimulus.id}
          className={`absolute transition-all duration-300 ${
            stimulus.detected 
              ? 'opacity-100 scale-110' 
              : 'opacity-60 scale-100'
          }`}
          style={{
            left: `${stimulus.x}%`,
            top: `${stimulus.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className={`w-4 h-4 rounded-full border-2 ${
              stimulus.type === 'pattern'
                ? 'border-lab-accent bg-lab-accent/20'
                : 'border-lab-warning bg-lab-warning/20'
            } ${
              stimulus.detected 
                ? 'lab-glow lab-pulse' 
                : ''
            }`}
          />
          {stimulus.detected && (
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-lab-accent">
              ✓ Detected
            </div>
          )}
        </div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 text-xs space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-lab-accent bg-lab-accent/20" />
          <span className="text-lab-text/50">Pattern Stimulus</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-lab-warning bg-lab-warning/20" />
          <span className="text-lab-text/50">Signal Stimulus</span>
        </div>
      </div>
    </div>
  )
}

