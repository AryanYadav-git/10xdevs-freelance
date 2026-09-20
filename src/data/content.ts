import projectsData from './projects.json'

export const site = {
  name: '10xdevs',
  role: 'Full Stack Developer',
  meetingUrl: 'https://cal.com/',
  location: 'Available worldwide',
}

export const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#work', label: 'Work' },
  { href: '/#approach', label: 'Approach' },
  { href: '/#contact', label: 'Contact' },
] as const

export const services = [
  {
    id: 'brand',
    title: 'Brand websites',
    description:
      'Fast, conversion-minded marketing sites with clear hierarchy, CMS-ready content, and production-grade performance.',
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce & CMS',
    description:
      'Storefronts and catalog experiences with inventory flows, checkout polish, and editorial control for your team.',
  },
  {
    id: 'headless',
    title: 'Headless WordPress rebuilds',
    description:
      'Keep WordPress as the backend. I rebuild the frontend in Next.js — sharper UX, better speed, modern tooling.',
  },
  {
    id: 'apps',
    title: 'Custom web apps',
    description:
      'Internal tools and product UIs: dashboards, workflows, role-based access, and integrations that fit how you work.',
  },
] as const

export type ProjectImage = {
  src: string
  alt: string
}

export type Project = {
  id: string
  title: string
  category: string
  year: string
  client: string
  summary: string
  services: string[]
  challenge: string
  solution: string
  impact: string[]
  outcomes: string[]
  stack: string[]
  images: ProjectImage[]
}

export const projects = projectsData as Project[]

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id)
}

export const approachPoints = [
  {
    title: 'Systems before screens',
    text: 'I map flows, data, and edge cases first — then design interfaces that stay coherent as the product grows.',
  },
  {
    title: 'Design sensibility, shipping focus',
    text: 'I bring a strong eye for layout and craft, but engagements stay centered on software you can run and evolve.',
  },
  {
    title: 'Clear ownership',
    text: 'From architecture to deploy, you get one accountable builder — fewer handoffs, tighter feedback loops.',
  },
] as const
