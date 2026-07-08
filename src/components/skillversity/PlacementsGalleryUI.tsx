import React from 'react'
import Link from 'next/link'
import { ScrollReveal } from './ScrollReveal'
import { MediaPlaceholder } from './MediaPlaceholder'
import { PlacementsScroller } from './PlacementsScroller'

export type PlacementsGalleryUIProps = {
  bigNumber?: string
  heading?: string
  description?: string
  pills?: string[]
  primaryCtaLabel?: string
  primaryCtaUrl?: string
  secondaryCtaLabel?: string
  secondaryCtaUrl?: string
  background?: 'cream' | 'white'
  galleryCaption?: string
  placements: Array<{
    image?: { url?: string | null; alt?: string | null } | null
    firstName?: string | null
    caption: string
  }>
  statCardNum?: string
  statCardLabel?: string
}

export const PlacementsGalleryUI: React.FC<PlacementsGalleryUIProps> = ({
  bigNumber = '10141+',
  heading = 'Placements from 2014.',
  description,
  pills = [],
  primaryCtaLabel,
  primaryCtaUrl,
  secondaryCtaLabel,
  secondaryCtaUrl,
  background = 'white',
  galleryCaption = 'A few of our graduates →',
  placements,
  statCardNum = '+10130',
  statCardLabel = 'more alumni working across India & GCC',
}) => {
  return (
    <section className="section" style={{ background: background === 'cream' ? 'var(--cream)' : '#fff' }}>
      <div className="wrap">
        <ScrollReveal>
          <div className="placements-feature" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ maxWidth: '800px' }}>
              <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 'clamp(68px,9vw,120px)', lineHeight: '.85', background: 'var(--grad-brand)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', backgroundSize: '200% 100%', animation: 'gradShift 10s linear infinite' }}>{bigNumber}</div>
              <h2 className="h-section" style={{ marginTop: '12px', marginBottom: '12px' }}>{heading}</h2>
              {description && <p style={{ color: 'var(--ink-soft)', fontSize: '15.5px', lineHeight: 1.6 }}>{description}</p>}
              {pills.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '18px' }}>
                  {pills.map((p, i) => (
                    <span key={i} className="role-pill" style={{ fontWeight: 700 }}>{p}</span>
                  ))}
                </div>
              )}
              {(primaryCtaLabel || secondaryCtaLabel) && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '22px' }}>
                  {primaryCtaLabel && primaryCtaUrl && <Link href={primaryCtaUrl} className="btn btn-dark">{primaryCtaLabel}</Link>}
                  {secondaryCtaLabel && secondaryCtaUrl && <Link href={secondaryCtaUrl} className="btn btn-ghost">{secondaryCtaLabel}</Link>}
                </div>
              )}
            </div>
            
            <PlacementsScroller placements={placements} />
          </div>
          {placements.length > 0 && galleryCaption && (
            <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--ink-soft)', fontSize: '14px' }}>{galleryCaption}</p>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
