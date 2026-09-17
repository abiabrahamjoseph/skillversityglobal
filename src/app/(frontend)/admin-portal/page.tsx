import React from 'react'
import type { Metadata } from 'next'
import { AdminPortalPageClient } from '@/components/skillversity/pages/AdminPortalPageClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admin Portal Login | Skillversity Global',
  description: 'Admin Portal Login to manage student lead enquiries, SEO metadata, pages, and website content.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminPortalPage() {
  return <AdminPortalPageClient />
}
