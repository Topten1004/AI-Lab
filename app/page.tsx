'use client'

import { useRoomFocus } from '@/hooks/useRoomFocus'
import AttentionResponseLab from '@/components/AttentionResponseLabPage/AttentionResponseLab'
import ReactionTimeChamber from '@/components/ReactionTimeChamberPage/ReactionTimeChamber'
import PatternPredictionRoom from '@/components/PatternPredictionRoomPage/PatternPredictionRoom'
import BehavioralConflictZone from '@/components/BehavioralConflictZonePage/BehavioralConflictZone'

export default function Home() {
  const { focusedRoom, setFocusedRoom } = useRoomFocus('attention')

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-[1440px] mx-auto">
        <header className="mb-8 pb-4 border-b border-lab-border flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-mono text-lab-accent mb-2">
              AI Behavioral Observation Protocol
            </h1>
            <p className="text-sm text-lab-text/70">
              v0.1 Experimental Research Facility
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Topten1004/AI-Lab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lab-text/70 hover:text-lab-accent transition-colors"
              aria-label="View on GitHub"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="https://x.com/behavioral_lab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lab-text/70 hover:text-lab-accent transition-colors"
              aria-label="Follow on X"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div id="room-attention">
            <AttentionResponseLab 
              isFocused={focusedRoom === 'attention'}
              onFocus={() => setFocusedRoom('attention')}
            />
          </div>
          <div id="room-reaction">
            <ReactionTimeChamber 
              isFocused={focusedRoom === 'reaction'}
              onFocus={() => setFocusedRoom('reaction')}
            />
          </div>
          <div id="room-pattern">
            <PatternPredictionRoom 
              isFocused={focusedRoom === 'pattern'}
              onFocus={() => setFocusedRoom('pattern')}
            />
          </div>
          <div id="room-conflict">
            <BehavioralConflictZone 
              isFocused={focusedRoom === 'conflict'}
              onFocus={() => setFocusedRoom('conflict')}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

