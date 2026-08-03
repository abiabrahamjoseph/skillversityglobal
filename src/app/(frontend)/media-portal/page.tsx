import React from 'react'
import type { Metadata } from 'next'
import { MediaPortalPageClient } from '@/components/skillversity/pages/MediaPortalPageClient'

export const metadata: Metadata = {
  title: 'Media Upload Portal | Skillversity Global',
  description: 'Upload images, student placement posters, event photos, and website media to Skillversity Global.',
}

export default function MediaPortalPage() {
  return <MediaPortalPageClient />
}
