import React from 'react'
import Link from 'next/link'
import { ScrollReveal } from './ScrollReveal'
import { MediaPlaceholder } from './MediaPlaceholder'

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
          <div className="placements-feature">
            <div className="placements-feature-text">
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
            {placements.length > 0 && (
              <div className="placements-gallery">
                {placements.slice(0, 5).map((g, i) => (
                  <div key={i} className="placements-gallery-card">
                    <div className="placements-gallery-media">
                      <MediaPlaceholder media={g.image} label={g.firstName || g.caption} editUrl="/admin/globals/site-settings" />
                    </div>
                    <span className="placements-gallery-caption">{g.caption}</span>
                  </div>
                ))}
                <div className="placements-gallery-card placements-gallery-card-stat">
                  <div className="placements-gallery-stat-num">{statCardNum}</div>
                  <div className="placements-gallery-stat-lbl">{statCardLabel}</div>
                </div>
              </div>
            )}
          </div>
          {placements.length > 0 && galleryCaption && (
            <p style={{ textAlign: 'center', marginTop: '14px', color: 'var(--ink-soft)', fontSize: '14px' }}>{galleryCaption}</p>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
