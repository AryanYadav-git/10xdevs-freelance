'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

function scrollToHash(hash: string) {
  if (!hash) {
    window.scrollTo({ top: 0, behavior: 'auto' })
    return
  }

  const id = hash.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function HashScroll() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/') return

    const frame = window.requestAnimationFrame(() => {
      scrollToHash(window.location.hash)
    })

    const onHashChange = () => scrollToHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [pathname])

  return null
}
