import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { MentorsGalleryUI } from '@/components/skillversity/MentorsGalleryUI'

type Props = {
  eyebrow?: string | null
  title: string
  description?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  background?: 'cream' | 'white' | null
}

export const MentorsGalleryBlock: React.FC<Props> = async (props) => {
  let mentors: any[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const settings: any = await payload.findGlobal({ slug: 'site-settings', depth: 2 })
    mentors = settings?.mentorsGallery || []
  } catch {
    // fall through with empty mentors
  }

  return (
    <MentorsGalleryUI
      eyebrow={props.eyebrow || undefined}
      title={props.title}
      description={props.description || undefined}
      ctaLabel={props.ctaLabel || undefined}
      ctaUrl={props.ctaUrl || undefined}
      background={(props.background as 'cream' | 'white') || 'cream'}
      mentors={mentors}
    />
  )
}
