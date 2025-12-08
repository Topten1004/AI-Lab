import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lab: {
          bg: '#0a0a0a',
          surface: '#1a1a1a',
          border: '#2a2a2a',
          text: '#e0e0e0',
          accent: '#00ff88',
          warning: '#ffaa00',
          // Log type colors
          blue: '#60a5fa',      // blue-400 equivalent
          cyan: '#22d3ee',      // cyan-400 equivalent
          red: '#f87171',       // red-500 equivalent
          green: '#4ade80',     // green-400 equivalent
          purple: '#a78bfa',    // purple-400 equivalent
          yellow: '#facc15',    // yellow-400 equivalent
          orange: '#fb923c',     // orange-400 equivalent
        },
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config

