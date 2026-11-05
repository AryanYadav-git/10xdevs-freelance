import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/JsonLd'
import { getProjectById, projects, site } from '@/data/content'
import { absoluteUrl, breadcrumbJsonLd, plainText, projectJsonLd } from '@/lib/seo'
import { ProjectDetail } from './ProjectDetail'

type Props = { params: Promise<{ projectId: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((project) => ({ projectId: project.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectId } = await params
  const project = getProjectById(projectId)
  if (!project) return {}

  const title = `${project.title}: ${project.category} Case Study`
  const description = plainText(`${project.summary} A ${project.category.toLowerCase()} project by ${site.name}.`, 200)
  const path = `/work/${project.id}`
  const images = project.images.map((image) => ({
    url: absoluteUrl(image.src),
    alt: image.alt,
  }))

  return {
    title,
    description,
    keywords: [...project.services, project.category, 'case study'],
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: path,
      title: `${title} | ${site.name}`,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${site.name}`,
      description,
      images: images.map((image) => image.url),
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { projectId } = await params
  const project = getProjectById(projectId)
  if (!project || project.images.length === 0) notFound()

  return (
    <>
      <JsonLd
        data={[
          projectJsonLd(project),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/#work' },
            { name: project.title, path: `/work/${project.id}` },
          ]),
        ]}
      />
      <ProjectDetail project={project} />
    </>
  )
}
