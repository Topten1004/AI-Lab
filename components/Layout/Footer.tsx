'use client'

import { useTimer } from '@/hooks/useTimer'
import { formatTimerDisplay } from '@/lib/timer/formatTimer'

export default function Footer() {
  const timer = useTimer()
  const displayTime = formatTimerDisplay(timer)

  return (
    <footer className="mt-16 pt-8 pb-8 border-t border-lab-border">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-sm text-lab-text/50">Session Time:</span>
          <span className="text-sm font-mono text-lab-accent">{displayTime}</span>
        </div>
        <p className="text-sm text-lab-text/70 text-center">
          This experimental research facility is designed to observe and analyze AI behavioral patterns through various controlled environments. 
          All data collected is used for research purposes to better understand AI decision-making processes and response mechanisms.
        </p>
      </div>
    </footer>
  )
}

