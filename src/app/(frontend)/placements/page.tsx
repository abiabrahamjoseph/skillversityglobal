import React from 'react'
import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { PlacementsPageClient } from '@/components/skillversity/pages/PlacementsPageClient'
import { CTASection } from '@/components/skillversity/CTASection'

export const metadata: Metadata = {
  title: 'Placements | 10,141+ Students Placed from 2014 | Skillversity Global',
  description: '10,141+ placements since 2014. Explore placement records across Hospital Administration, Logistics, Oil & Gas, and HR Management in India & GCC.',
}

async function getPlacementsGallery() {
  try {
    const payload = await getPayload({ config: configPromise })
    const settings: any = await payload.findGlobal({ slug: 'site-settings', depth: 2 })
    return (settings?.placementsGallery as Array<{ image?: { url?: string; alt?: string } | null; firstName?: string; caption: string }>) || []
  } catch {
    return []
  }
}

export default async function PlacementsPage() {
  const gallery = await getPlacementsGallery()

  return (
    <>
      <PlacementsPageClient gallery={gallery} />
      <CTASection />
    </>
  )
}
