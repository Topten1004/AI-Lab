'use client'

import { useTimer } from '@/hooks/useTimer'
import { formatTimerDisplay } from '@/lib/timer/formatTimer'

export default function Footer() {
  const { timer, controls } = useTimer()
  const displayTime = formatTimerDisplay(timer)

  return (
    <footer className="mt-16 pt-8 pb-8 border-t border-lab-border">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative inline-flex flex-col items-center gap-3">
            <div className="relative inline-flex items-center gap-1 px-8 py-4 bg-gradient-to-r from-lab-surface via-lab-surface to-lab-surface border-2 border-lab-accent/20 rounded-lg overflow-hidden">
              {!timer.isPaused && <div className="absolute inset-0 bg-lab-accent/5 lab-pulse"></div>}
              <div className="relative flex items-baseline gap-1">
                <span className="text-xs uppercase tracking-[0.2em] text-lab-text/50 font-mono mr-3">Session</span>
                <span className={`text-4xl font-mono font-bold tabular-nums tracking-wider ${timer.isPaused ? 'text-lab-text/50' : 'text-lab-accent'}`}>
                  {displayTime}
                </span>
                {timer.isPaused && (
                  <span className="ml-2 text-xs uppercase text-lab-text/40 font-mono">(Paused)</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={controls.toggle}
                className="px-4 py-1.5 text-xs uppercase tracking-wider font-mono bg-lab-surface border border-lab-border hover:border-lab-accent/50 hover:text-lab-accent transition-colors rounded"
              >
                {timer.isPaused ? 'Resume' : 'Pause'}
              </button>
              <button
                onClick={controls.reset}
                className="px-4 py-1.5 text-xs uppercase tracking-wider font-mono bg-lab-surface border border-lab-border hover:border-lab-warning/50 hover:text-lab-warning transition-colors rounded"
              >
                Reset
              </button>
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

