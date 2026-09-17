import React from 'react'
import type { Metadata } from 'next'

import { CMSPage } from '@/components/skillversity/pages/CMSPage'

export const metadata: Metadata = {
  title: 'Contact Us & Book Free Career Counselling | Skillversity Global Kochi',
  description:
    'Get in touch with Skillversity Global in Kochi, Kerala. Book a free 1-on-1 career counselling session, inquire about courses, fee structure, and admissions.',
  keywords: [
    'Contact Skillversity Global',
    'Career Counselling Kochi',
    'Skillversity Location Kaloor',
    'Skillversity Phone Number',
    'Admission Inquiry Skillversity',
  ],
  alternates: {
    canonical: 'https://www.skillversityglobal.com/contact',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Contact Us & Book Free Career Counselling | Skillversity Global Kochi',
    description:
      'Get in touch with Skillversity Global in Kochi. Book a free 1-on-1 career counselling session, inquire about courses, and placement support.',
    url: 'https://www.skillversityglobal.com/contact',
    siteName: 'Skillversity Global',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Skillversity Global Kochi',
    description: 'Book a free career counselling session with Skillversity Global experts.',
  },
}

export default function ContactPage() {
  return <CMSPage slug="contact" />
}
