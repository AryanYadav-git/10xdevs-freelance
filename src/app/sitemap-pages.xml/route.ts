import { projects, site } from '@/data/content'

export const dynamic = 'force-static'

// A plain, dependency-free sitemap at a fresh URL (/sitemap-pages.xml).
// Kept deliberately minimal (loc + lastmod) so any crawler can parse it.
const lastmod = new Date().toISOString().slice(0, 10)

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function GET() {
  const paths = ['', '/schedule', ...projects.map((project) => `/work/${project.id}`)]

  const urls = paths
    .map(
      (path) =>
        `  <url>\n    <loc>${escapeXml(`${site.url}${path}`)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, must-revalidate',
    },
  })
}
