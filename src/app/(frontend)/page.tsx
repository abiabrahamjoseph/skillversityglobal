import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { HomePage } from '@/components/skillversity/pages/HomePage'

export const metadata: Metadata = {
  title: "Skillversity Global | India's First Job-Ready Campus | Kochi, Kerala",
  description:
    "Skillversity Global — India's First Job-Ready Campus in Kochi. 10141+ placements from 2014. Programs in Hospital Administration, Logistics, Oil & Gas, HR Management.",
  alternates: {
    canonical: 'https://www.skillversityglobal.com/',
  },
  openGraph: {
    title: "Skillversity Global | India's First Job-Ready Campus | Kochi, Kerala",
    description:
      "Skillversity Global — India's First Job-Ready Campus in Kochi. 10141+ placements from 2014. Programs in Hospital Administration, Logistics, Oil & Gas, HR Management.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default async function Page() {
  return <HomePage />
}
