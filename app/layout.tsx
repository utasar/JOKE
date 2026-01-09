import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JOKE - Global Entertainment Hub',
  description: 'AI-powered entertainment platform with jokes, memes, and social intelligence',
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
