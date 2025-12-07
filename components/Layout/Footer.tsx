'use client'

import { useTimer } from '@/hooks/useTimer'
import { formatTimerDisplay } from '@/lib/timer/formatTimer'

export default function Footer() {
  const timer = useTimer()
  const displayTime = formatTimerDisplay(timer)

  return (
    <footer className="mt-16 pt-8 pb-8 border-t border-lab-border">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative inline-flex items-center gap-1 px-8 py-4 bg-gradient-to-r from-lab-surface via-lab-surface to-lab-surface border-2 border-lab-accent/20 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-lab-accent/5 lab-pulse"></div>
            <div className="relative flex items-baseline gap-1">
              <span className="text-xs uppercase tracking-[0.2em] text-lab-text/50 font-mono mr-3">Session</span>
              <span className="text-4xl font-mono text-lab-accent font-bold tabular-nums tracking-wider">
                {displayTime}
              </span>
            </div>
          </div>
        </div>
        <p className="text-sm text-lab-text/70 text-center">
          This experimental research facility is designed to observe and analyze AI behavioral patterns through various controlled environments. 
          All data collected is used for research purposes to better understand AI decision-making processes and response mechanisms.
        </p>
      </div>
    </footer>
  )
}

