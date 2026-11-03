import type { MetadataRoute } from 'next'
import { projects, site } from '@/data/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    { url: site.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${site.url}/schedule`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: `${site.url}/work/${project.id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      images: project.images.map((image) => `${site.url}${image.src}`),
    })),
  ]
}
