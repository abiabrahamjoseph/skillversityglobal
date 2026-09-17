import React from 'react'
import type { Metadata } from 'next'
import { AppShowcaseSection } from '@/components/skillversity/AppShowcaseSection'

export const metadata: Metadata = {
  title: 'Skillversity Mobile App — Download on Google Play | Skillversity Global',
  description:
    'Download the official Skillversity Mobile App on Android. Access digital Skillfolio, course modules, placement alerts, and direct mentor support.',
  keywords: [
    'Skillversity Mobile App',
    'Skillversity Android App',
    'Skillversity Play Store',
    'Learning App Kerala',
  ],
  alternates: {
    canonical: 'https://www.skillversityglobal.com/app',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Skillversity Mobile App — Download on Google Play',
    description:
      'Download the official Skillversity Mobile App on Android. Access digital Skillfolio, course modules, placement alerts, and direct mentor support.',
    url: 'https://www.skillversityglobal.com/app',
    siteName: 'Skillversity Global',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skillversity Mobile App',
    description: 'Download the official Skillversity Mobile App on Android for digital Skillfolio & course modules.',
  },
}

export default function AppPage() {
  return (
    <div style={{ paddingTop: '20px' }}>
      <AppShowcaseSection />
    </div>
  )
}
