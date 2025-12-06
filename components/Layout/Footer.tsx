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
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-lab-surface border border-lab-border rounded-lg lab-glow">
            <span className="text-xs uppercase tracking-wider text-lab-text/60 font-mono">Session Time</span>
            <span className="w-px h-6 bg-lab-border"></span>
            <span className="text-2xl font-mono text-lab-accent font-bold tabular-nums">{displayTime}</span>
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

