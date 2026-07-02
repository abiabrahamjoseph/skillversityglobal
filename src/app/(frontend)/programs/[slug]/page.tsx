import React, { cache } from 'react'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { ProgramPage, type ProgramDetail } from '@/components/skillversity/ProgramPage'
import { defaultPrograms } from '@/skillversity/defaultContent'
import { StatsRowBlock } from '@/blocks/StatsRow/Component'
import { PlacementsGalleryBlock } from '@/blocks/PlacementsGallery/Component'
import { CampusLifeBlock } from '@/blocks/CampusLife/Component'
import { MentorsGalleryBlock } from '@/blocks/MentorsGallery/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbList, buildCourseSchema, buildFAQPage } from '@/utilities/structuredData'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const programs = await payload.find({
      collection: 'programs',
      draft: false,
      limit: 100,
      pagination: false,
      select: {
        slug: true,
      },
      where: {
        status: {
          not_equals: 'inactive',
        },
      },
    })

    return programs.docs.filter((program) => program.slug).map(({ slug }) => ({ slug }))
  } catch {
    return defaultPrograms.map((program) => ({ slug: program.slug }))
  }
}

export default async function ProgramDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const program = await queryProgramBySlug(slug)

  if (!program) {
    return notFound()
  }

  const heroImageUrl =
    program.heroImage && typeof program.heroImage === 'object' && 'url' in (program.heroImage as Record<string, unknown>)
      ? (program.heroImage as { url?: string | null }).url || null
      : null

  const courseSchema = buildCourseSchema({
    slug: program.slug,
    title: program.title,
    description:
      program.heroDescription ||
      program.shortDescription ||
      `${program.title} — industry-led career program at Skillversity Global.`,
    duration: program.duration,
    eligibility: program.eligibility,
    market: program.market || 'India + GCC',
    certificationName: program.certificationLabel || program.certifications?.[0]?.name,
    imageUrl: heroImageUrl,
  })

  const breadcrumbSchema = buildBreadcrumbList([
    { name: 'Home', url: '/' },
    { name: 'Programs', url: '/programs' },
    { name: program.title, url: `/programs/${program.slug}` },
  ])

  const faqSchema = program.faqs?.length ? buildFAQPage(program.faqs) : null

  return (
    <>
      <JsonLd data={courseSchema} id={`course-${program.slug}-jsonld`} />
      <JsonLd data={breadcrumbSchema} id={`breadcrumb-${program.slug}-jsonld`} />
      {faqSchema && <JsonLd data={faqSchema} id={`faq-${program.slug}-jsonld`} />}
      <ProgramPage program={program} />
      <StatsRowBlock
        source="siteSettings"
        background="cream"
        eyebrow="India's First Job-Ready Campus"
        title="Numbers that prove placement-readiness."
      />
      <PlacementsGalleryBlock background="cream" />
      <CampusLifeBlock />
      <MentorsGalleryBlock title="Learn from people who hire." description={`43 mentors with 30+ years across hospitals, ports, refineries and corporate HR — actively working in the industries you're training for.`} ctaLabel="Meet All 43 Mentors →" ctaUrl="/mentors" />
      <CallToActionBlock />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const program = await queryProgramBySlug(slug)

  if (!program) {
    return {
      title: 'Program | Skillversity Global',
    }
  }

  return {
    title: `${program.title} | Skillversity Global`,
    description: program.heroDescription || program.shortDescription || `${program.title} program at Skillversity Global.`,
  }
}

const queryProgramBySlug = cache(async (slug: string): Promise<ProgramDetail | null> => {
  const fallback = defaultPrograms.find((program) => program.slug === slug)

  try {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'programs',
      depth: 2,
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    const program = result.docs?.[0] as any
    if (!program) return fallback ? { ...fallback } : null

    const relatedTestimonials = Array.isArray(program.featuredTestimonials)
      ? program.featuredTestimonials.filter((item: any) => typeof item === 'object')
      : []

    let testimonials = relatedTestimonials

    if (!testimonials.length) {
      const testimonialResult = await payload.find({
        collection: 'testimonials',
        depth: 0,
        limit: 3,
        sort: 'sortOrder',
        where: {
          program: {
            equals: program.id,
          },
        },
      })
      testimonials = testimonialResult.docs
    }

    return {
      ...program,
      testimonials,
    }
  } catch {
    return fallback ? { ...fallback } : null
  }
})
