import React from 'react'
import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { PlacementsPageClient } from '@/components/skillversity/pages/PlacementsPageClient'
import { CTASection } from '@/components/skillversity/CTASection'

export const metadata: Metadata = {
  title: '10,141+ Student Placements & Career Record | Skillversity Global',
  description:
    '10,141+ student placements since 2014 across India & GCC. Explore live placement records in Hospital Administration, Logistics, Oil & Gas, and HR Management.',
  keywords: [
    'Skillversity Placements',
    'Student Placement Record Kochi',
    'Job Placements Kerala',
    'Hospital Admin Jobs GCC',
    'Logistics Placements India',
    'Oil and Gas Inspector Placements',
    'HR Trainee Placements',
  ],
  alternates: {
    canonical: 'https://www.skillversityglobal.com/placements',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: '10,141+ Student Placements & Career Record | Skillversity Global',
    description:
      '10,141+ student placements since 2014 across India & GCC. Explore live placement records in Hospital Administration, Logistics, Oil & Gas, and HR.',
    url: 'https://www.skillversityglobal.com/placements',
    siteName: 'Skillversity Global',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '10,141+ Student Placements | Skillversity Global',
    description:
      '10,141+ student placements since 2014 across India & GCC. Hospital Admin, Logistics, Oil & Gas, HR.',
  },
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
