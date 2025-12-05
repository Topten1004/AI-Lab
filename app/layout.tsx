import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Behavioral AI Lab - Attention Response Lab',
  description: 'Experimental research facility for AI behavioral observation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="mt-16 pt-8 pb-8 border-t border-lab-border">
          <div className="max-w-[1440px] mx-auto px-8">
            <p className="text-sm text-lab-text/70 text-center">
              This experimental research facility is designed to observe and analyze AI behavioral patterns through various controlled environments. 
              All data collected is used for research purposes to better understand AI decision-making processes and response mechanisms.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}

