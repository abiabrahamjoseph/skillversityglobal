import React from 'react'
import type { Metadata } from 'next'

import { CMSPage } from '@/components/skillversity/pages/CMSPage'

export const metadata: Metadata = {
  title: 'Admissions Open 2026 | Apply Online | Skillversity Global Kochi',
  description:
    'Admissions open for 2026 job-ready batches at Skillversity Global, Kochi. Apply online for Hospital Administration, Logistics, Oil & Gas, and HR Management diploma courses.',
  keywords: [
    'Skillversity Admissions 2026',
    'Course Admission Kochi',
    'Hospital Admin Admission Kerala',
    'Logistics Diploma Application',
    'Job Training Admission Kochi',
  ],
  alternates: {
    canonical: 'https://www.skillversityglobal.com/admissions',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Admissions Open 2026 | Apply Online | Skillversity Global Kochi',
    description:
      'Admissions open for 2026 job-ready batches at Skillversity Global, Kochi. Apply online for Hospital Admin, Logistics, Oil & Gas, and HR courses.',
    url: 'https://www.skillversityglobal.com/admissions',
    siteName: 'Skillversity Global',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Admissions Open 2026 | Skillversity Global',
    description: 'Apply now for 2026 job-ready programs at Skillversity Global Kochi.',
  },
}

export default function AdmissionsPage() {
  return <CMSPage slug="admissions" />
}
