'use client'

import { useTimer } from '@/hooks/useTimer'

export default function Footer() {
  const timer = useTimer()

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0')
  }

  return (
    <footer className="mt-16 pt-8 pb-8 border-t border-lab-border">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] uppercase tracking-widest text-lab-text/40 font-mono">Hours</span>
              <div className="px-4 py-2 bg-lab-surface border border-lab-accent/30 rounded lab-glow">
                <span className="text-3xl font-mono text-lab-accent font-bold tabular-nums">
                  {formatNumber(timer.hours)}
                </span>
              </div>
            </div>
            <span className="text-2xl text-lab-accent/50 font-mono pb-6">:</span>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] uppercase tracking-widest text-lab-text/40 font-mono">Minutes</span>
              <div className="px-4 py-2 bg-lab-surface border border-lab-accent/30 rounded lab-glow">
                <span className="text-3xl font-mono text-lab-accent font-bold tabular-nums">
                  {formatNumber(timer.minutes)}
                </span>
              </div>
            </div>
            <span className="text-2xl text-lab-accent/50 font-mono pb-6">:</span>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] uppercase tracking-widest text-lab-text/40 font-mono">Seconds</span>
              <div className="px-4 py-2 bg-lab-surface border border-lab-accent/30 rounded lab-glow">
                <span className="text-3xl font-mono text-lab-accent font-bold tabular-nums">
                  {formatNumber(timer.seconds)}
                </span>
              </div>
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

