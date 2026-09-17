import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { HomePage } from '@/components/skillversity/pages/HomePage'

export const metadata: Metadata = {
  title: "Skillversity Global | India's First Job-Ready Campus | Kochi, Kerala",
  description:
    "Skillversity Global — India's First Job-Ready Campus in Kochi, Kerala. 10,141+ placements since 2014. Industry-certified programs in Hospital Administration, Logistics & Supply Chain, Oil & Gas, and HR Management.",
  keywords: [
    'Skillversity Global',
    'IMS Kochi',
    'Job Ready Campus Kochi',
    'Hospital Administration Course Kochi',
    'Logistics and Supply Chain Management Course Kerala',
    'Oil and Gas QA QC Inspector Course',
    'HR Management Diploma Kochi',
    'Career Training Institute Kerala',
  ],
  alternates: {
    canonical: 'https://www.skillversityglobal.com/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Skillversity Global | India's First Job-Ready Campus | Kochi, Kerala",
    description:
      "Skillversity Global — India's First Job-Ready Campus in Kochi, Kerala. 10,141+ placements since 2014. Programs in Hospital Administration, Logistics, Oil & Gas, HR Management.",
    url: 'https://www.skillversityglobal.com/',
    siteName: 'Skillversity Global',
    type: 'website',
    images: [
      {
        url: 'https://www.skillversityglobal.com/media/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Skillversity Global Campus Kochi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Skillversity Global | India's First Job-Ready Campus",
    description:
      'India\'s First Job-Ready Campus in Kochi. 10,141+ placements since 2014. Hospital Admin, Logistics, Oil & Gas, HR.',
    images: ['https://www.skillversityglobal.com/media/hero-bg.jpg'],
  },
}

export default async function Page() {
  return <HomePage />
}
