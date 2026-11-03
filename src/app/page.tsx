import type { Metadata } from 'next'
import { Approach } from '@/components/Approach'
import { Contact } from '@/components/Contact'
import { Faq } from '@/components/Faq'
import { Hero } from '@/components/Hero'
import { JsonLd } from '@/components/JsonLd'
import { Projects } from '@/components/Projects'
import { Services } from '@/components/Services'
import { HashScroll } from '@/components/HashScroll'
import { site } from '@/data/content'
import { faqJsonLd, homeWebPageJsonLd, servicesJsonLd, workListJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Full-Stack Web Development Agency: Next.js, Ecommerce & AI` },
  description: site.description,
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[homeWebPageJsonLd(), servicesJsonLd(), workListJsonLd(), faqJsonLd()]}
      />
      <HashScroll />
      <Hero />
      <Services />
      <Projects />
      <Approach />
      <Faq />
      <Contact />
    </>
  )
}
