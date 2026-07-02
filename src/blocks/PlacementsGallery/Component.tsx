import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { PlacementsGalleryUI } from '@/components/skillversity/PlacementsGalleryUI'

type Props = {
  bigNumber?: string | null
  heading?: string | null
  description?: string | null
  pills?: Array<{ label: string }> | null
  primaryCtaLabel?: string | null
  primaryCtaUrl?: string | null
  secondaryCtaLabel?: string | null
  secondaryCtaUrl?: string | null
  background?: 'cream' | 'white' | null
  galleryCaption?: string | null
  statCardNum?: string | null
  statCardLabel?: string | null
}

export const PlacementsGalleryBlock: React.FC<Props> = async (props) => {
  let placements: any[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const settings: any = await payload.findGlobal({ slug: 'site-settings', depth: 2 })
    placements = settings?.placementsGallery || []
  } catch {
    // fall through
  }

  return (
    <PlacementsGalleryUI
      bigNumber={props.bigNumber || undefined}
      heading={props.heading || undefined}
      description={props.description || undefined}
      pills={(props.pills || []).map((p) => p.label).filter(Boolean)}
      primaryCtaLabel={props.primaryCtaLabel || undefined}
      primaryCtaUrl={props.primaryCtaUrl || undefined}
      secondaryCtaLabel={props.secondaryCtaLabel || undefined}
      secondaryCtaUrl={props.secondaryCtaUrl || undefined}
      background={(props.background as 'cream' | 'white') || 'white'}
      galleryCaption={props.galleryCaption || undefined}
      placements={placements}
      statCardNum={props.statCardNum || undefined}
      statCardLabel={props.statCardLabel || undefined}
    />
  )
}
