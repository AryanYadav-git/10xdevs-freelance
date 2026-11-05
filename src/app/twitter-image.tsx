import { ImageResponse } from 'next/og'
import { site } from '@/data/content'

export const alt = `${site.name}: website design and e-commerce agency for ambitious brands`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function TwitterImage() {
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
          Website design & e-commerce agency
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 176, fontWeight: 800, lineHeight: 1, letterSpacing: -6 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 48, marginTop: 28, opacity: 0.92 }}>
            {site.tagline}
          </div>
        </div>
        <div style={{ fontSize: 30, opacity: 0.8 }}>
          Brand websites · Online stores · Website redesign · Custom digital experiences
        </div>
      </div>
    ),
    size,
  )
}
