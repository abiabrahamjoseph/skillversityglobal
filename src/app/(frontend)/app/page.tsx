import React from 'react'
import type { Metadata } from 'next'
import { AppShowcaseSection } from '@/components/skillversity/AppShowcaseSection'

export const metadata: Metadata = {
  title: 'Skillversity Mobile App — Download on Google Play',
  description: 'Download the official Skillversity Mobile App on Android. Access digital Skillfolio, course modules, placement alerts, and direct mentor support.',
  openGraph: {
    title: 'Skillversity Mobile App — Download on Google Play',
    description: 'Download the official Skillversity Mobile App on Android. Access digital Skillfolio, course modules, placement alerts, and direct mentor support.',
    url: 'https://play.google.com/store/apps/details?id=com.app.skillversity',
  },
}

export default function AppPage() {
  return (
    <div style={{ paddingTop: '20px' }}>
      <AppShowcaseSection />
    </div>
  )
}
