import React from 'react'
import type { Metadata } from 'next'

import { CMSPage } from '@/components/skillversity/pages/CMSPage'

export const metadata: Metadata = {
  title: 'Admissions Open 2026 | Skillversity Global | Kochi, Kerala',
  description: 'Admissions open for the 2026 batch at Skillversity Global.',
}

export default function AdmissionsPage() {
  return <CMSPage slug="admissions" />
}
