'use client'

import { useBehavioralConflict } from '@/hooks/useBehavioralConflict'
import { useModelActivity } from '@/hooks/useModelActivity'
import { getActivityColor } from '@/lib/modelActivity/calculateActivityLevel'

export default function ModelActivityIndicator() {
  const { modelAStatus, modelBStatus } = useBehavioralConflict()
  const modelAActivity = useModelActivity(
    modelAStatus === 'dominating' || modelAStatus === 'adapting'
  )
  const modelBActivity = useModelActivity(
    modelBStatus === 'dominating' || modelBStatus === 'adapting'
  )

  return (
    <div className="flex items-center gap-4 text-xs">
      <div className="flex items-center gap-2">
        <span className="text-lab-text/50">Model A:</span>
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${
            modelAActivity.status === 'high' ? 'bg-lab-accent lab-pulse' :
            modelAActivity.status === 'medium' ? 'bg-lab-warning' :
            modelAActivity.status === 'low' ? 'bg-lab-text/60' :
            'bg-lab-text/30'
          }`} />
          <span className={`font-mono ${getActivityColor(modelAActivity.status)}`}>
            {modelAActivity.activityLevel}%
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-lab-text/50">Model B:</span>
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${
            modelBActivity.status === 'high' ? 'bg-lab-accent lab-pulse' :
            modelBActivity.status === 'medium' ? 'bg-lab-warning' :
            modelBActivity.status === 'low' ? 'bg-lab-text/60' :
            'bg-lab-text/30'
          }`} />
          <span className={`font-mono ${getActivityColor(modelBActivity.status)}`}>
            {modelBActivity.activityLevel}%
          </span>
        </div>
      </div>
    </div>
  )
}

