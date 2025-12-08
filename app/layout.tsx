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
      <body>{children}</body>
    </html>
  )
}

