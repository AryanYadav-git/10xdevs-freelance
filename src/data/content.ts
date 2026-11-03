import projectsData from './projects.json'

export const site = {
  name: '10xdevs',
  legalName: '10xdevs',
  role: 'Full Stack Developer',
  // Set NEXT_PUBLIC_SITE_URL in production to your real canonical domain.
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://agency.10xdevs.in').replace(/\/+$/, ''),
  tagline: 'Launch your website in days, not months.',
  description:
    '10xdevs is a full-stack web development agency building fast Next.js websites, ecommerce stores, headless WordPress frontends, custom web apps, and AI agents for businesses worldwide.',
  keywords: [
    'web development agency',
    'full-stack development agency',
    'Next.js development agency',
    'ecommerce website development',
    'headless WordPress developer',
    'custom web app development',
    'AI agent development',
    'website redesign',
    'hire Next.js developers',
    'freelance full stack developer',
  ],
  meetingUrl: '/schedule',
  location: 'Available worldwide',
  social: {
    facebook: 'https://www.facebook.com/10xdevs',
    instagram: 'https://www.instagram.com/10xdevs.in/',
  },
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
  {
    id: 'agents',
    title: 'AI agents',
    description:
      'Custom agents wired into your product or ops: tools, workflows, and handoff to humans where it matters.',
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

export const faqs = [
  {
    question: 'What does 10xdevs do?',
    answer:
      '10xdevs is a full-stack web development agency. We design and build brand websites, ecommerce stores, headless WordPress frontends in Next.js, custom web apps and internal tools, and AI agents that plug into your product or operations.',
  },
  {
    question: 'How fast can 10xdevs launch my website?',
    answer:
      'Our goal is to launch websites in days, not months. Timelines depend on scope: a focused brand site can go live far faster than a custom ecommerce platform or web app. We map the scope in the first conversation and give you a clear path to launch.',
  },
  {
    question: 'Which technologies does 10xdevs use?',
    answer:
      'Our core stack is Next.js, React, and TypeScript, with headless CMS setups (including WordPress), custom admin dashboards, and payment integrations such as Razorpay. We choose the stack that fits your product rather than forcing a template.',
  },
  {
    question: 'Can you rebuild my existing WordPress site?',
    answer:
      'Yes. We keep WordPress as the content backend your team already knows and rebuild the frontend in Next.js for better speed, UX, and SEO, without forcing a content migration.',
  },
  {
    question: 'Do you build ecommerce stores with custom features?',
    answer:
      'Yes. Past work includes a custom storefront with an in-house product customization tool, webhook-verified Razorpay payments, and a purpose-built admin CMS, as well as an ecommerce redesign for an established computer services business.',
  },
  {
    question: 'Do you build AI agents?',
    answer:
      'Yes. We build custom AI agents wired into your product or operations, with tools, defined workflows, and handoff to a human where it matters.',
  },
  {
    question: 'Where does 10xdevs work, and how do I get started?',
    answer:
      'We work with clients worldwide. Schedule a meeting, share your product, timeline, and constraints, and we will scope the right architecture and a clear path to launch. There is no rate sheet, just a focused conversation.',
  },
] as const
