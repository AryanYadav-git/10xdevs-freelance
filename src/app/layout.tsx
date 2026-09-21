import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { Nav } from '@/components/Nav'
import './globals.css'

export const metadata: Metadata = {
  title: '10xdevs',
  description:
    'Full-stack product agency for brand sites, ecommerce, headless WordPress, and custom web apps.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
