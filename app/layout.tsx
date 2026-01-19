import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NOESIS - Attention Response Lab',
  description: 'Experimental research facility for AI observation - NOESIS Protocol',
  icons: {
    icon: '/LOGO_transparent.png',
  },
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

