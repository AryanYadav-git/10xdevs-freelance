import projectsData from './projects.json'

export const site = {
  name: '10xdevs',
  legalName: '10xdevs',
  // Set NEXT_PUBLIC_SITE_URL in production to your real canonical domain.
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://agency.10xdevs.in').replace(/\/+$/, ''),
  tagline: 'Digital experiences for ambitious brands.',
  message:
    'We help businesses build a stronger online presence through thoughtful website design, e-commerce and digital development.',
  description:
    'Website design and e-commerce agency for ambitious brands. We build thoughtful websites and online stores that earn customer trust and turn attention into business.',
  audience: 'Business owners, founders and marketing teams',
  keywords: [
    'website design agency',
    'brand website design',
    'e-commerce website design',
    'online store development',
    'website redesign',
    'web design for small business',
    'website design company India',
    'e-commerce agency',
    'website for startups',
    'custom business website',
  ],
  // The enquiry page lives at /schedule (kept so existing links and SEO keep working).
  meetingUrl: '/schedule',
  ctaLabel: 'Start a project',
  location: 'Available worldwide',
  social: {
    facebook: 'https://www.facebook.com/10xdevs',
    instagram: 'https://www.instagram.com/10xdevs.in/',
  },
}

export const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/#work', label: 'Work' },
  { href: '/#faq', label: 'FAQ' },
] as const

export const hero = {
  headline: 'Your brand deserves a better place on the internet.',
  subheading:
    'We build thoughtful websites and online stores that bring your brand to life, earn customer trust and turn attention into business.',
  primaryCta: 'Start a project',
  secondaryCta: 'Explore our work',
}

export const about = {
  title: 'Every brand has something worth telling. We make sure the internet sees it.',
  paragraphs: [
    'At 10xdevs, we work with ambitious businesses to create digital experiences that reflect who they are, what they stand for and why customers should choose them.',
    'From your first brand website to a fully functional online store, we bring strategy, thoughtful design and reliable development together.',
  ],
  audience: [
    { title: 'Business owners', text: 'Bringing a business online, or giving it the presence it deserves.' },
    { title: 'Founders', text: 'Launching a brand and needing a website that earns trust from day one.' },
    { title: 'Marketing teams', text: 'Needing a site that supports campaigns and converts attention.' },
  ],
} as const

export const services = [
  {
    id: 'brand',
    title: 'Brand Websites',
    description:
      'Distinctive websites that communicate your brand and establish credibility.',
  },
  {
    id: 'stores',
    title: 'Online Stores',
    description:
      'E-commerce experiences that make shopping simple and give businesses room to grow.',
  },
  {
    id: 'redesign',
    title: 'Website Redesign',
    description:
      'Modernize outdated websites with better design, messaging and customer experience.',
  },
  {
    id: 'custom',
    title: 'Custom Digital Experiences',
    description:
      'Booking platforms, customer portals and custom business tools.',
  },
] as const

export const approachSteps = [
  {
    title: 'Understand the brand.',
    text: 'We start with a conversation about your business, your customers and what you want your website to achieve.',
  },
  {
    title: 'Shape the experience.',
    text: 'We map the structure, messaging and journey, so visitors know what to do from the first screen.',
  },
  {
    title: 'Design and build.',
    text: 'Thoughtful design and reliable development come together in a site that looks right and works everywhere.',
  },
  {
    title: 'Launch and grow.',
    text: 'We launch with care and stay close afterwards, so your website keeps improving as your brand grows.',
  },
] as const

export const whyUs = [
  {
    title: 'Built around your brand.',
    text: 'Every site starts from your story, your audience and what makes customers choose you.',
  },
  {
    title: 'Design with purpose.',
    text: 'Every layout, headline and button has a job: help visitors understand your brand and take action.',
  },
  {
    title: 'One team, complete ownership.',
    text: 'Strategy, design and development under one roof. No hand-offs, no gaps, one team accountable for the result.',
  },
  {
    title: "Ready for what's next.",
    text: 'Your website is built to grow with you, whether that means new pages, a new product line or an online store later.',
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
  /** Secondary technical detail, shown only inside a collapsed "Technical details" block. */
  technical: string[]
  stack: string[]
  images: ProjectImage[]
}

export const projects = projectsData as Project[]

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id)
}

export const portfolio = {
  title: "Brands we've brought to the digital world.",
  lede: 'A look at the businesses we have helped show up online with confidence.',
}

export const finalCta = {
  title: 'Have a brand worth building?',
  subheading: "Let's create a digital presence that does it justice.",
  cta: 'Start a project',
}

export const faqs = [
  {
    question: 'What does a website cost?',
    answer:
      'Projects start at ₹25,000. The final cost depends on the number of pages, the depth of design, and features such as an online store, payments or bookings. After a short conversation about your goals, we share a clear proposal so you know what to expect.',
  },
  {
    question: 'How long does development take?',
    answer:
      'It depends on the scope and on how quickly content and feedback come together. Brand websites move fastest, while online stores and custom builds take longer. We agree a clear timeline with you before we begin.',
  },
  {
    question: 'Can you build an online store?',
    answer:
      'Yes. We build online stores that make shopping simple for your customers and easy to manage for your team, from catalogue and payments to orders. Our past work includes a store where customers can personalise products before they buy.',
  },
  {
    question: 'Do you help with website content?',
    answer:
      'Yes. We help shape your messaging and page structure so the website explains your brand clearly. You know your business best, so we work with what you have and guide you on what is needed to fill the gaps.',
  },
  {
    question: 'Will my website be optimised for Google?',
    answer:
      'Yes. Every site we build is set up with search in mind: fast loading, mobile-friendly layouts, clear page structure and the technical foundations search engines look for. No one can honestly promise a first-page ranking, but we make sure your website has the strongest possible footing.',
  },
  {
    question: 'Can you redesign an existing website?',
    answer:
      'Yes. We modernise outdated websites with better design, clearer messaging and a smoother customer experience, keeping what already works for your business.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer:
      "Yes. We don't disappear after launch. We stay available for fixes, updates and next steps, and agree the support that fits your project when we scope it.",
  },
  {
    question: 'What technology do you build with?',
    answer:
      'We use modern, fast technology, including Next.js and headless WordPress where it suits the project, and integrate payment providers such as Razorpay for online stores. You do not need to know any of it: we handle the technical side and make sure your team can manage content with ease.',
  },
] as const
