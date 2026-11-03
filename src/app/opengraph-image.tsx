import { ImageResponse } from 'next/og'
import { site } from '@/data/content'

export const alt = `${site.name}: full-stack web development agency`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#005c45',
          color: '#f4f6f5',
        }}
      >
        <div style={{ fontSize: 34, letterSpacing: 4, textTransform: 'uppercase', opacity: 0.8 }}>
          Full-stack web development agency
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 168, fontWeight: 800, lineHeight: 1, letterSpacing: -6 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 48, marginTop: 28, opacity: 0.92 }}>
            Launch your website in days, not months.
          </div>
        </div>
        <div style={{ fontSize: 30, opacity: 0.8 }}>
          Next.js · Ecommerce · Headless WordPress · Web apps · AI agents
        </div>
      </div>
    ),
    size,
  )
}
