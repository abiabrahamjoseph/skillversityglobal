import React from 'react'
import type { Metadata } from 'next'
import { CampusEventsPageClient } from '@/components/skillversity/pages/CampusEventsPageClient'

export const metadata: Metadata = {
  title: 'Campus Events & Summits | Skillversity Global',
  description: 'Explore upcoming campus events, leadership summits, cultural festivals, and student activities at Skillversity Global.',
}

export default function CampusEventsPage() {
  return <CampusEventsPageClient />
}
