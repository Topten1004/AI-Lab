'use client'

import { useTimer } from '@/hooks/useTimer'
import { formatTimerDisplay } from '@/lib/timer/formatTimer'
import type { Lap } from '@/types/timer'

export default function Footer() {
  const { timer, controls, laps, stats } = useTimer()
  const displayTime = formatTimerDisplay(timer)

  const formatLapTime = (seconds: number): string => {
    return formatTimerDisplay({
      hours: Math.floor(seconds / 3600),
      minutes: Math.floor((seconds % 3600) / 60),
      seconds: seconds % 60,
      totalSeconds: seconds,
      isPaused: false,
    })
  }

  return (
    <footer className="mt-16 pt-8 pb-8 border-t border-lab-border">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative inline-flex flex-col items-center gap-4 w-full max-w-3xl">
            {/* Timer Display */}
            <div className="relative w-full">
              <div className="relative flex items-center justify-center px-6 py-5 bg-lab-surface border-2 border-lab-accent/30 rounded-xl overflow-hidden backdrop-blur-sm">
                {!timer.isPaused && (
                  <div className="absolute inset-0 bg-gradient-to-r from-lab-accent/10 via-lab-accent/5 to-lab-accent/10 lab-pulse"></div>
                )}
                <div className="relative flex flex-col items-center gap-2">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-lab-text/40 font-mono">
                    Session Timer
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-5xl font-mono font-bold tabular-nums tracking-tight ${timer.isPaused ? 'text-lab-text/40' : 'text-lab-accent'}`}>
                      {displayTime}
                    </span>
                    {timer.isPaused && (
                      <span className="text-xs uppercase text-lab-text/30 font-mono ml-1">⏸</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap justify-center">
              <button
                onClick={controls.toggle}
                className="px-5 py-2.5 text-xs uppercase tracking-wider font-mono bg-lab-surface border-2 border-lab-accent/40 hover:border-lab-accent hover:bg-lab-accent/10 hover:text-lab-accent transition-all rounded-lg shadow-sm hover:shadow-lab-accent/20"
              >
                {timer.isPaused ? '▶ Resume' : '⏸ Pause'}
              </button>
              <button
                onClick={controls.recordLap}
                disabled={timer.isPaused || timer.totalSeconds === 0}
                className="px-5 py-2.5 text-xs uppercase tracking-wider font-mono bg-lab-surface border-2 border-lab-border hover:border-lab-accent/50 hover:text-lab-accent transition-all rounded-lg shadow-sm hover:shadow-lab-accent/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-lab-border disabled:hover:text-lab-text/50"
              >
                ⏱ Lap
              </button>
              <button
                onClick={controls.reset}
                className="px-5 py-2.5 text-xs uppercase tracking-wider font-mono bg-lab-surface border-2 border-lab-border hover:border-lab-warning/60 hover:text-lab-warning hover:bg-lab-warning/10 transition-all rounded-lg shadow-sm"
              >
                ↻ Reset
              </button>
              {laps.length > 0 && (
                <button
                  onClick={controls.clearLaps}
                  className="px-5 py-2.5 text-xs uppercase tracking-wider font-mono bg-lab-surface border-2 border-lab-border hover:border-lab-text/50 hover:text-lab-text/80 transition-all rounded-lg shadow-sm"
                >
                  ✕ Clear Laps
                </button>
              )}
            </div>

            {/* Statistics */}
            {laps.length > 0 && (
              <div className="w-full grid grid-cols-3 gap-3">
                {stats.fastestLap !== null && (
                  <div className="px-4 py-3 bg-lab-surface/40 border border-lab-accent/30 rounded-lg text-center">
                    <div className="text-[10px] uppercase tracking-wider text-lab-text/50 font-mono mb-1">Fastest Lap</div>
                    <div className="text-lg font-mono font-bold text-lab-accent">{formatLapTime(stats.fastestLap)}</div>
                  </div>
                )}
                {stats.averageLapTime !== null && (
                  <div className="px-4 py-3 bg-lab-surface/40 border border-lab-border/50 rounded-lg text-center">
                    <div className="text-[10px] uppercase tracking-wider text-lab-text/50 font-mono mb-1">Avg Lap</div>
                    <div className="text-lg font-mono font-bold text-lab-text/80">{formatLapTime(stats.averageLapTime)}</div>
                  </div>
                )}
                {stats.slowestLap !== null && (
                  <div className="px-4 py-3 bg-lab-surface/40 border border-lab-text/30 rounded-lg text-center">
                    <div className="text-[10px] uppercase tracking-wider text-lab-text/50 font-mono mb-1">Slowest Lap</div>
                    <div className="text-lg font-mono font-bold text-lab-text/60">{formatLapTime(stats.slowestLap)}</div>
                  </div>
                )}
              </div>
            )}

            {/* Laps List */}
            {laps.length > 0 && (
              <div className="w-full mt-2 max-h-56 overflow-y-auto border-2 border-lab-border/50 rounded-xl bg-lab-surface/30 backdrop-blur-sm p-4">
                <div className="sticky top-0 bg-lab-surface/80 backdrop-blur-sm pb-2 mb-3 border-b border-lab-border/30">
                  <div className="text-xs uppercase tracking-wider text-lab-accent/80 font-mono text-center">
                    ⏱ Laps Recorded ({laps.length})
                  </div>
                </div>
                <div className="space-y-2">
                  {laps.map((lap, index) => {
                    const isFastest = stats.fastestLap !== null && lap.lapTime === stats.fastestLap
                    const isSlowest = stats.slowestLap !== null && lap.lapTime === stats.slowestLap
                    
                    return (
                      <div
                        key={lap.id}
                        className={`flex items-center justify-between px-4 py-2.5 border rounded-lg text-xs font-mono hover:bg-lab-surface/70 transition-all ${
                          isFastest
                            ? 'bg-lab-accent/10 border-lab-accent/40'
                            : isSlowest
                            ? 'bg-lab-surface/50 border-lab-text/20'
                            : 'bg-lab-surface/50 border-lab-accent/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-[10px] ${
                            isFastest
                              ? 'bg-lab-accent/30 text-lab-accent'
                              : isSlowest
                              ? 'bg-lab-text/20 text-lab-text/50'
                              : 'bg-lab-accent/20 text-lab-accent'
                          }`}>
                            {index + 1}
                          </span>
                          <span className="text-lab-text/50 uppercase tracking-wider">Lap {index + 1}</span>
                          {isFastest && (
                            <span className="text-[10px] uppercase text-lab-accent/80 font-mono">⚡ Fastest</span>
                          )}
                          {isSlowest && !isFastest && (
                            <span className="text-[10px] uppercase text-lab-text/40 font-mono">🐌 Slowest</span>
                          )}
                        </div>
                        <div className="flex items-center gap-5">
                          <div className="text-right">
                            <div className="text-[10px] uppercase tracking-wider text-lab-text/40">Lap Time</div>
                            <div className={`font-bold ${isFastest ? 'text-lab-accent' : isSlowest ? 'text-lab-text/50' : 'text-lab-accent'}`}>
                              {formatLapTime(lap.lapTime)}
                            </div>
                          </div>
                          <div className="w-px h-8 bg-lab-border/50"></div>
                          <div className="text-right">
                            <div className="text-[10px] uppercase tracking-wider text-lab-text/40">Total</div>
                            <div className="text-lab-text/70 font-semibold">{formatLapTime(lap.time)}</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
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

