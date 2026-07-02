import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { CampusLifeBlock } from '@/blocks/CampusLife/Component'
import { CertificationsGridBlock } from '@/blocks/CertificationsGrid/Component'
import { CompaniesMarqueeBlock } from '@/blocks/CompaniesMarquee/Component'
import { HeroCollageBlock } from '@/blocks/HeroCollage/Component'
import { MentorsGalleryBlock } from '@/blocks/MentorsGallery/Component'
import { PlacementsGalleryBlock } from '@/blocks/PlacementsGallery/Component'
import { ProgramsGridBlock } from '@/blocks/ProgramsGrid/Component'
import { RealityCheckBlock } from '@/blocks/RealityCheck/Component'
import { StatsRowBlock } from '@/blocks/StatsRow/Component'
import { TestimonialsGridBlock } from '@/blocks/TestimonialsGrid/Component'

const blockComponents = {
  archive: ArchiveBlock,
  campusLife: CampusLifeBlock,
  certificationsGrid: CertificationsGridBlock,
  companiesMarquee: CompaniesMarqueeBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  heroCollage: HeroCollageBlock,
  mediaBlock: MediaBlock,
  mentorsGallery: MentorsGalleryBlock,
  placementsGallery: PlacementsGalleryBlock,
  programsGrid: ProgramsGridBlock,
  realityCheck: RealityCheckBlock,
  statsRow: StatsRowBlock,
  testimonialsGrid: TestimonialsGridBlock,
}

export const RenderBlocks: React.FC<{
  blocks: NonNullable<Page['layout']>
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block as { blockType: string; hidden?: boolean }
          if ((block as { hidden?: boolean }).hidden) return null

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents] as React.FC<Record<string, unknown>>

            if (Block) {
              return (
                <Fragment key={index}>
                  <Block {...block} disableInnerContainer />
                </Fragment>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
