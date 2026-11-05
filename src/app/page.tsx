import type { Metadata } from 'next'
import { About } from '@/components/About'
import { Approach } from '@/components/Approach'
import { Contact } from '@/components/Contact'
import { Faq } from '@/components/Faq'
import { Hero } from '@/components/Hero'
import { JsonLd } from '@/components/JsonLd'
import { Projects } from '@/components/Projects'
import { Services } from '@/components/Services'
import { WhyUs } from '@/components/WhyUs'
import { HashScroll } from '@/components/HashScroll'
import { site } from '@/data/content'
import { faqJsonLd, homeWebPageJsonLd, servicesJsonLd, workListJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Website Design & E-commerce Agency for Ambitious Brands` },
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
      <About />
      <Services />
      <Projects />
      <Approach />
      <WhyUs />
      <Faq />
      <Contact />
    </>
  )
}
