import { Approach } from '../components/Approach'
import { Contact } from '../components/Contact'
import { Hero } from '../components/Hero'
import { Projects } from '../components/Projects'
import { Services } from '../components/Services'
import { useHashScroll } from '../hooks/useHashScroll'

export function Home() {
  useHashScroll()

  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Approach />
      <Contact />
    </>
  )
}
