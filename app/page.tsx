'use client'

import { useState } from 'react'
import { useRoomFocus } from '@/hooks/useRoomFocus'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import AttentionResponseLab from '@/components/AttentionResponseLabPage/AttentionResponseLab'
import ReactionTimeChamber from '@/components/ReactionTimeChamberPage/ReactionTimeChamber'
import PatternPredictionRoom from '@/components/PatternPredictionRoomPage/PatternPredictionRoom'
import BehavioralConflictZone from '@/components/BehavioralConflictZonePage/BehavioralConflictZone'

export default function Home() {
  const { focusedRoom, setFocusedRoom } = useRoomFocus('attention')
  const [copied, setCopied] = useState(false)

  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '...'
  const DEX_LINK = process.env.NEXT_PUBLIC_DEX_LINK || 'https://dexscreener.com'

  useKeyboardShortcuts({
    onRoomNavigate: setFocusedRoom,
  })

  const handleCopyCA = async () => {
    if (CONTRACT_ADDRESS === '...') return

    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-[1440px] mx-auto">
        <header className="mb-8 pb-4 flex items-start justify-between">
          <div className='space-y-6'>
            <div className="flex items-center gap-4">
              <img
                src="/LOGO_transparent.png"
                alt="NOESIS Logo"
                className="h-16 w-auto"
              />
              <div>
                <h1 className="text-2xl font-mono font-bold text-lab-accent mb-2">
                  NOESIS - AI Observation Protocol
                </h1>
                <p className="text-xs font-mono text-lab-accent mt-1">
                  <span className="font-bold">CA:</span>{' '}
                  <button
                    onClick={handleCopyCA}
                    className="cursor-pointer hover:opacity-80 transition-opacity underline"
                    title="Click to copy contract address"
                  >
                    {CONTRACT_ADDRESS}
                  </button>
                  {copied && <span className="ml-2 text-lab-accent">✓ Copied!</span>}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-lab-text/70">
                v0.1 Experimental Research Facility
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs text-lab-text/50">
                <span className="font-mono">[1-4]</span>
                <span>Navigate rooms</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={DEX_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lab-text/70 hover:text-lab-accent transition-colors opacity-70 hover:opacity-100"
              aria-label="View on DexScreener"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 250 250"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <g transform="translate(0,250) scale(0.1,-0.1)">
                  <path d="M1165 2233 c-118 -16 -224 -63 -328 -143 -37 -27 -74 -50 -84 -50 -21 0 -77 32 -110 63 -30 27 -29 19 6 -44 69 -126 232 -282 405 -389 l79 -49 38 19 c48 25 114 25 162 1 l36 -19 64 37 c101 60 176 118 273 215 81 80 174 203 174 228 0 5 -15 -2 -33 -16 -18 -14 -48 -32 -67 -40 -34 -14 -34 -13 -94 36 -146 118 -343 176 -521 151z" />
                  <path d="M647 1824 c-50 -99 -58 -150 -67 -454 -9 -331 -28 -445 -105 -633 -28 -71 -38 -104 -27 -94 94 80 196 157 203 150 4 -4 41 -64 83 -132 l75 -124 85 83 84 82 24 -38 c14 -22 70 -113 126 -204 55 -91 107 -173 114 -182 12 -16 28 7 148 202 l134 220 51 -48 c27 -26 66 -62 86 -80 l36 -33 71 118 c40 65 76 124 81 132 7 11 32 -5 115 -72 58 -48 108 -87 111 -87 3 0 -3 17 -14 38 -33 64 -82 213 -102 312 -23 111 -38 315 -39 519 0 153 -11 218 -56 319 -13 30 -28 51 -32 46 -103 -118 -104 -120 -89 -156 38 -90 28 -164 -29 -228 -40 -44 -88 -69 -150 -78 -25 -4 -45 -10 -44 -14 0 -5 0 -26 0 -48 l0 -40 105 -61 c58 -34 105 -64 105 -68 0 -3 -41 -28 -90 -54 -50 -27 -106 -65 -126 -85 -66 -68 -137 -237 -229 -546 -15 -49 -30 -85 -35 -80 -4 5 -15 36 -24 69 -45 159 -111 349 -152 432 -54 109 -95 151 -217 217 -48 26 -87 49 -87 51 0 1 50 31 110 65 l110 63 0 49 c0 45 -2 48 -26 48 -48 0 -103 23 -145 59 -75 63 -96 149 -60 241 l17 45 -30 35 c-17 19 -41 48 -52 64 l-22 30 -25 -50z" />
                  <path d="M857 1633 c-14 -75 52 -129 146 -120 76 7 77 20 5 60 -35 20 -78 47 -97 61 -44 32 -47 32 -54 -1z" />
                  <path d="M1570 1616 c-36 -24 -83 -53 -104 -64 l-39 -21 27 -11 c90 -34 196 15 196 91 0 21 -4 40 -8 43 -4 2 -37 -15 -72 -38z" />
                  <path d="M1194 1530 c-17 -11 -44 -44 -59 -72 -23 -43 -30 -69 -33 -137 l-5 -83 -48 -31 -49 -30 64 -58 c67 -62 124 -160 161 -279 9 -30 19 -62 22 -70 2 -8 22 33 43 92 54 154 103 231 183 289 l38 28 -33 17 c-60 30 -68 42 -68 104 0 88 -25 158 -75 207 -49 50 -89 56 -141 23z" />
                </g>
              </svg>
            </a>
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
              href="https://x.com/noesis_lab"
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
          <div id="room-conflict">
            <BehavioralConflictZone
              isFocused={focusedRoom === 'conflict'}
              onFocus={() => setFocusedRoom('conflict')}
            />
          </div>
          <div id="room-pattern">
            <PatternPredictionRoom
              isFocused={focusedRoom === 'pattern'}
              onFocus={() => setFocusedRoom('pattern')}
            />
          </div>
          <div id="room-reaction">
            <ReactionTimeChamber
              isFocused={focusedRoom === 'reaction'}
              onFocus={() => setFocusedRoom('reaction')}
            />
          </div>
          <div id="room-attention">
            <AttentionResponseLab
              isFocused={focusedRoom === 'attention'}
              onFocus={() => setFocusedRoom('attention')}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

