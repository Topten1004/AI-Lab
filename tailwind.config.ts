import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts}',
    './hooks/**/*.{js,ts,tsx}',
  ],
  safelist: [
    'text-cyan-400',
    'text-orange-500',
    'text-green-400',
    'text-blue-400',
    'text-blue-500',
    'text-purple-400',
    'text-purple-500',
  ],
  theme: {
    extend: {
      colors: {
        lab: {
          bg: '#f5f5f5',
          surface: '#e5e5e5',
          border: '#fa500b',
          text: '#000000',
          accent: '#fa500b',
          warning: '#fa500b',
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

