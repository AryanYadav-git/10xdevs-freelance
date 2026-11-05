'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Fades elements marked with [data-reveal] into view as they scroll on screen.
 * Content is fully visible without JavaScript; only elements below the fold are
 * hidden after hydration, so there is no flash for what is already in view.
 */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const pending = nodes.filter((node) => node.getBoundingClientRect().top > window.innerHeight * 0.92)
    if (pending.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    for (const node of pending) {
      node.classList.add('will-reveal')
      observer.observe(node)
    }

    return () => observer.disconnect()
  }, [pathname])

  return null
}
