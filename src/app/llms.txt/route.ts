import { about, approachSteps, faqs, projects, services, site, whyUs } from '@/data/content'

export const dynamic = 'force-static'

// llms.txt: a concise, markdown summary for LLM / answer-engine crawlers (GEO).
export function GET() {
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.tagline} ${site.message}`,
    '',
    `Who we work with: ${site.audience}. ${site.location}.`,
    '',
    '## About',
    ...about.paragraphs,
    '',
    '## Services',
    ...services.map((service) => `- ${service.title}: ${service.description}`),
    '',
    '## Selected work',
    ...projects.map(
      (project) =>
        `- [${project.title}](${site.url}/work/${project.id}): ${project.category}, ${project.year}. ${project.summary}`,
    ),
    '',
    '## Our approach',
    ...approachSteps.map((step, index) => `${index + 1}. ${step.title} ${step.text}`),
    '',
    '## Why work with us',
    ...whyUs.map((point) => `- ${point.title} ${point.text}`),
    '',
    '## FAQ',
    ...faqs.flatMap((faq) => [`### ${faq.question}`, faq.answer, '']),
    '## Contact',
    `- [${site.ctaLabel}](${site.url}${site.meetingUrl})`,
    ...Object.entries(site.social).map(([name, url]) => `- ${name}: ${url}`),
    '',
    '## Pages',
    `- [Home](${site.url})`,
    `- [Sitemap](${site.url}/sitemap.xml)`,
    '',
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
