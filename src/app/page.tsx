import { Approach } from '@/components/Approach'
import { Contact } from '@/components/Contact'
import { Hero } from '@/components/Hero'
import { Projects } from '@/components/Projects'
import { Services } from '@/components/Services'
import { HashScroll } from '@/components/HashScroll'

export default function HomePage() {
  return (
    <>
      <HashScroll />
      <Hero />
      <Services />
      <Projects />
      <Approach />
      <Contact />
    </>
  )
}
