import { faqs, projects, services, site, type Project } from '@/data/content'

export function absoluteUrl(path = '/') {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`
}

const orgId = `${site.url}/#organization`
const websiteId = `${site.url}/#website`

const socialProfiles = Object.values(site.social)

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': orgId,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/apple-icon'),
    },
    image: absoluteUrl('/opengraph-image'),
    description: site.description,
    slogan: site.tagline,
    knowsAbout: [
      'Web development',
      'Next.js',
      'React',
      'TypeScript',
      'Ecommerce development',
      'Headless WordPress',
      'Custom web applications',
      'AI agents',
    ],
    areaServed: 'Worldwide',
    sameAs: socialProfiles,
    makesOffer: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        provider: { '@id': orgId },
      },
    })),
    potentialAction: {
      '@type': 'ScheduleAction',
      target: absoluteUrl(site.meetingUrl),
    },
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: 'en',
    publisher: { '@id': orgId },
  }
}

export function homeWebPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${site.url}/#webpage`,
    url: site.url,
    name: `${site.name} | Full-Stack Web Development Agency`,
    description: site.description,
    isPartOf: { '@id': websiteId },
    about: { '@id': orgId },
    inLanguage: 'en',
  }
}

export function servicesJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${site.name} services`,
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        serviceType: service.title,
        areaServed: 'Worldwide',
        provider: { '@id': orgId },
      },
    })),
  }
}

export function workListJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${site.name} selected work`,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/work/${project.id}`),
      name: project.title,
    })),
  }
}

export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function projectJsonLd(project: Project) {
  const url = absoluteUrl(`/work/${project.id}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${url}#project`,
    url,
    name: `${project.title} case study`,
    headline: `${project.title}: ${project.category}`,
    description: project.summary,
    abstract: project.summary,
    dateCreated: project.year,
    genre: project.category,
    keywords: [...project.services, ...project.stack].join(', '),
    image: project.images.map((image) => absoluteUrl(image.src)),
    author: { '@id': orgId },
    creator: { '@id': orgId },
    publisher: { '@id': orgId },
    about: project.services,
    isPartOf: { '@id': websiteId },
    inLanguage: 'en',
  }
}

export function plainText(value: string, max = 160) {
  const clean = value.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}
