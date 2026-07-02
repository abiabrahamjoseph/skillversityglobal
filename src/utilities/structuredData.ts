// JSON-LD schema builders for Skillversity Global.
// These return plain objects ready to be serialized with JSON.stringify.
// Keep this file dependency-free so it can be imported from both server and client code.

import { getServerSideURL } from './getURL'

type BreadcrumbItem = { name: string; url: string }

const absolute = (path: string): string => {
  const base = getServerSideURL().replace(/\/$/, '')
  if (!path) return base
  if (/^https?:\/\//.test(path)) return path
  const suffix = path.startsWith('/') ? path : `/${path}`
  return `${base}${suffix}`
}

export const buildBreadcrumbList = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absolute(item.url),
  })),
})

type FAQItem = { question: string; answer: string }

export const buildFAQPage = (faqs: FAQItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
})

type CourseInput = {
  slug: string
  title: string
  description: string
  duration?: string
  eligibility?: string
  market?: string
  certificationName?: string
  modeInstructions?: string
  imageUrl?: string | null
  programType?: string
  language?: string
}

export const buildCourseSchema = (course: CourseInput) => {
  const orgName = 'Skillversity Global'
  const url = absolute(`/programs/${course.slug}`)
  const provider = {
    '@type': 'EducationalOrganization',
    name: orgName,
    sameAs: getServerSideURL(),
  }

  const instance: Record<string, unknown> = {
    '@type': 'CourseInstance',
    courseMode: 'OnSite',
    location: {
      '@type': 'Place',
      name: 'Skillversity Global Campus',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kochi',
        addressRegion: 'Kerala',
        addressCountry: 'IN',
      },
    },
    inLanguage: course.language || 'en',
  }
  if (course.duration) instance.courseSchedule = { '@type': 'Schedule', repeatFrequency: course.duration }
  if (course.modeInstructions) instance.instructor = course.modeInstructions

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': url,
    name: course.title,
    description: course.description,
    url,
    provider,
    hasCourseInstance: [instance],
    inLanguage: course.language || 'en',
    audience: { '@type': 'EducationalAudience', educationalRole: 'student' },
    educationalLevel: course.eligibility || 'Open',
  }

  if (course.imageUrl) data.image = absolute(course.imageUrl)
  if (course.certificationName) data.educationalCredentialAwarded = course.certificationName
  if (course.programType) data.educationalProgramMode = course.programType
  if (course.market) data.availableInLocation = course.market

  return data
}

type ArticleInput = {
  slug: string
  title: string
  description: string
  imageUrl?: string | null
  authorName?: string
  publishedAt?: string | Date | null
  updatedAt?: string | Date | null
  categories?: string[]
}

export const buildArticleSchema = (post: ArticleInput) => {
  const url = absolute(`/blog/${post.slug}`)
  const toIso = (v: string | Date | null | undefined) => {
    if (!v) return undefined
    const d = typeof v === 'string' ? new Date(v) : v
    return Number.isNaN(d.getTime()) ? undefined : d.toISOString()
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url,
    mainEntityOfPage: url,
    headline: post.title,
    description: post.description,
    image: post.imageUrl ? absolute(post.imageUrl) : undefined,
    url,
    datePublished: toIso(post.publishedAt),
    dateModified: toIso(post.updatedAt) || toIso(post.publishedAt),
    author: {
      '@type': 'Organization',
      name: post.authorName || 'Skillversity Global',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Skillversity Global',
      logo: { '@type': 'ImageObject', url: absolute('/apple-touch-icon.png') },
    },
    articleSection: post.categories?.[0],
    keywords: post.categories?.join(', '),
  }
}
