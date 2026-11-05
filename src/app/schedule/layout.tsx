import type { Metadata } from 'next'
import { site } from '@/data/content'

export const metadata: Metadata = {
  title: 'Start a Project: Website Design & E-commerce Enquiry',
  description: `Start a project with ${site.name}. Tell us about your brand and whether you need a brand website, an online store, a redesign or a custom digital experience.`,
  alternates: { canonical: '/schedule' },
  openGraph: {
    url: '/schedule',
    title: `Start a Project | ${site.name}`,
    description: `Tell ${site.name} about your brand and get a clear proposal.`,
  },
}

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return children
}
