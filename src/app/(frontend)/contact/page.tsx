import React from 'react'
import type { Metadata } from 'next'

import { CMSPage } from '@/components/skillversity/pages/CMSPage'

export const metadata: Metadata = {
  title: 'Contact & Book Free Counselling Call | Skillversity Global',
  description: 'Book a free career counselling call with Skillversity Global.',
}

export default function ContactPage() {
  return <CMSPage slug="contact" />
}
