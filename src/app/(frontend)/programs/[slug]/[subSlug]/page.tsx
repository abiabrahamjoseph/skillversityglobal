import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { defaultPrograms } from '@/skillversity/defaultContent'
import { SubCoursePageClient } from '@/components/skillversity/SubCoursePageClient'

type Args = {
  params: Promise<{
    slug: string
    subSlug: string
  }>
}

export async function generateStaticParams() {
  const params: Array<{ slug: string; subSlug: string }> = []
  for (const prog of defaultPrograms) {
    if (prog.subCourses?.length) {
      for (const sub of prog.subCourses) {
        if (sub.slug) {
          params.push({ slug: prog.slug, subSlug: sub.slug })
        }
      }
    }
  }
  return params
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug, subSlug } = await paramsPromise
  const parentProgram = defaultPrograms.find((p) => p.slug === slug)
  const subCourse = parentProgram?.subCourses?.find((s) => s.slug === subSlug)

  if (!subCourse || !parentProgram) {
    return { title: 'Course | Skillversity Global' }
  }

  return {
    title: `${subCourse.title} | ${parentProgram.title} | Skillversity Global`,
    description: subCourse.shortDesc || `${subCourse.title} course at Skillversity Global.`,
  }
}

export default async function SubCourseDetailPage({ params: paramsPromise }: Args) {
  const { slug, subSlug } = await paramsPromise
  const parentProgram = defaultPrograms.find((p) => p.slug === slug)
  const subCourse = parentProgram?.subCourses?.find((s) => s.slug === subSlug)

  if (!subCourse || !parentProgram) {
    return notFound()
  }

  return (
    <SubCoursePageClient
      subCourse={subCourse}
      parentProgram={{
        title: parentProgram.title,
        slug: parentProgram.slug,
        accentColor: parentProgram.accentColor,
      }}
    />
  )
}
