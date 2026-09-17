import React from 'react'
import type { Metadata } from 'next'
import { CampusEventsPageClient } from '@/components/skillversity/pages/CampusEventsPageClient'

export const metadata: Metadata = {
  title: 'Campus Events, Summits & Workshops | Skillversity Global Kochi',
  description:
    'Explore upcoming campus events, industry leadership summits, placement drives, guest lectures, and student activities at Skillversity Global, Kochi.',
  keywords: [
    'Skillversity Events',
    'Campus Events Kochi',
    'Leadership Summits Kerala',
    'Placement Drives Kochi',
    'Student Workshops Skillversity',
  ],
  alternates: {
    canonical: 'https://www.skillversityglobal.com/campus-events',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Campus Events, Summits & Workshops | Skillversity Global Kochi',
    description:
      'Explore upcoming campus events, industry leadership summits, placement drives, and student activities at Skillversity Global.',
    url: 'https://www.skillversityglobal.com/campus-events',
    siteName: 'Skillversity Global',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Campus Events & Summits | Skillversity Global',
    description: 'Upcoming campus events, leadership summits, and placement drives at Skillversity Global.',
  },
}

export default function CampusEventsPage() {
  return <CampusEventsPageClient />
}
