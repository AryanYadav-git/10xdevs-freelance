import type { Metadata } from 'next'
import { site } from '@/data/content'

export const metadata: Metadata = {
  title: 'Schedule a Meeting: Start Your Website or App Project',
  description: `Book a free intro call with ${site.name}. Tell us what you're building (website, ecommerce store, headless WordPress, custom web app, or AI agent) and we'll scope a clear path to launch.`,
  alternates: { canonical: '/schedule' },
  openGraph: {
    url: '/schedule',
    title: `Schedule a Meeting | ${site.name}`,
    description: `Tell ${site.name} what you're building and book a focused scoping conversation.`,
  },
}

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return children
}
