import React from 'react'
import Link from 'next/link'

import type { Media as MediaType } from '@/payload-types'
import { MediaPlaceholder } from '@/components/skillversity/MediaPlaceholder'
import { ScrollReveal } from '@/components/skillversity/ScrollReveal'

type Item = {
  image?: number | MediaType | null
  label: string
  placeholderLabel?: string | null
}

type Props = {
  hidden?: boolean | null
  eyebrow?: string | null
  title?: string | null
  description?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  items?: Item[] | null
}

const defaultItems: Item[] = [
  { label: 'Industry-led classroom sessions', placeholderLabel: 'classroom photo' },
  { label: 'Placement Day, 2025', placeholderLabel: 'placement-day photo' },
  { label: 'Live employer drives', placeholderLabel: 'employer-drive photo' },
  { label: 'Practical labs', placeholderLabel: 'lab photo' },
  { label: 'Mock interviews', placeholderLabel: 'mock-interview photo' },
  { label: 'Cohort culture', placeholderLabel: 'cohort photo' },
  { label: '1:1 mentor reviews', placeholderLabel: '1:1 mentor photo' },
]

export const CampusLifeBlock: React.FC<Props> = (props) => {
  if (props.hidden) return null

  const items = Array.isArray(props.items) && props.items.length ? props.items : defaultItems
  const slice = items.slice(0, 7)

  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="wrap">
        <div className="campus-head">
          <div>
            <span className="eyebrow">
              <span className="dot" />
              {props.eyebrow || 'Campus Life · Kochi'}
            </span>
            <h2 className="h-section" style={{ marginTop: '14px' }}>
              {props.title || 'A campus that looks like work.'}
            </h2>
          </div>
          {props.description && <p className="lead campus-head-desc">{props.description}</p>}
        </div>

        <div className="campus-bento">
          {slice.map((it, i) => (
            <ScrollReveal key={i} className={`campus-tile campus-tile-${i + 1}`}>
              <div className="campus-tile-media">
                <MediaPlaceholder media={it.image as MediaType | null | undefined} label={it.placeholderLabel || 'Upload a photo'} />
              </div>
              <div className="campus-tile-caption">{it.label}</div>
            </ScrollReveal>
          ))}
        </div>

        {props.ctaLabel && (
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link href={props.ctaUrl || '/campus-life'} className="btn btn-ghost btn-lg">
              {props.ctaLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
