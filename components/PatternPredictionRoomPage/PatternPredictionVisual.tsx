'use client'

import { usePatternPrediction } from '@/hooks/usePatternPrediction'
import { getConfidenceColor, getConfidenceLevel, getConfidenceBgColor } from '@/lib/patternPrediction/calculateConfidence'

export default function PatternPredictionVisual() {
  const { sequence, prediction, modelAStatus, modelBStatus, accuracy, currentPattern, learningProgress, confidence } = usePatternPrediction()

  return (
    <div className="p-6 bg-lab-bg h-[400px] relative overflow-hidden">
      {/* Model A - Sequence Generator */}
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

      {/* Model B - Predictor */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-3 h-3 rounded-full ${
            modelBStatus === 'predicting' 
              ? 'bg-lab-warning lab-pulse' 
              : modelBStatus === 'correct'
              ? 'bg-lab-accent lab-glow'
              : modelBStatus === 'incorrect'
              ? 'bg-red-500'
              : 'bg-lab-text/30'
          }`} />
          <span className="text-xs text-lab-text/70">Model B (Predictor)</span>
        </div>
        <div className="text-xs text-lab-text/50 mt-1">
          Accuracy: {accuracy}%
        </div>
        <div className="mt-2">
          <div className="text-xs text-lab-text/40 mb-1">Learning Progress</div>
          <div className="w-24 h-1.5 bg-lab-text/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-lab-accent transition-all duration-500"
              style={{ width: `${learningProgress}%` }}
            />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-lab-text/40">Confidence</span>
            <span className={`text-xs font-mono ${getConfidenceColor(confidence)}`}>
              {confidence}%
            </span>
          </div>
          <div className="w-24 h-1.5 bg-lab-text/10 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${getConfidenceBgColor(confidence)}`}
              style={{ width: `${confidence}%` }}
            />
          </div>
          <div className="text-xs text-lab-text/30 mt-0.5">
            {getConfidenceLevel(confidence) === 'high' && 'High certainty'}
            {getConfidenceLevel(confidence) === 'medium' && 'Moderate certainty'}
            {getConfidenceLevel(confidence) === 'low' && 'Low certainty'}
          </div>
        </div>
      </div>

      {/* Sequence Display */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center gap-3">
          {sequence.map((element, idx) => (
            <div
              key={element.id}
              className="flex flex-col items-center gap-2"
            >
              <div
                className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono text-lg transition-all ${
                  element.predicted
                    ? element.correct
                      ? 'border-lab-accent bg-lab-accent/20 lab-glow'
                      : 'border-red-500 bg-red-500/20'
                    : 'border-lab-text/30 bg-lab-bg'
                }`}
              >
                {element.value}
              </div>
              {element.predicted && (
                <div className={`text-xs ${
                  element.correct ? 'text-lab-accent' : 'text-red-500'
                }`}>
                  {element.correct ? '✓' : '✗'}
                </div>
              )}
            </div>
          ))}
          
          {/* Prediction Indicator */}
          {prediction && (
            <div className="flex flex-col items-center gap-2 ml-2">
              <div className="w-12 h-12 rounded-lg border-2 border-dashed border-lab-warning bg-lab-warning/10 flex items-center justify-center font-mono text-lg lab-pulse">
                ?
              </div>
              <div className="text-xs text-lab-warning">Predicting...</div>
            </div>
          )}
        </div>
      </div>

      {/* Pattern Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="text-xs text-lab-text/50 text-center">
          Pattern: {currentPattern.join(' → ')}
        </div>
      </div>
    </div>
  )
}

