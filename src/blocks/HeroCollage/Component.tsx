import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { MediaPlaceholder } from '@/components/skillversity/MediaPlaceholder'
import { defaultStats } from '@/skillversity/defaultContent'

type Props = {
  eyebrow?: string | null
  headline: string
  highlight?: string | null
  description?: string | null
  primaryCtaLabel?: string | null
  primaryCtaUrl?: string | null
  secondaryCtaLabel?: string | null
  secondaryCtaUrl?: string | null
  whatsappLabel?: string | null
  whatsappUrl?: string | null
  rating?: string | null
  showStats?: boolean | null
}

export const HeroCollageBlock: React.FC<Props> = async (props) => {
  let stats = defaultStats
  let collage: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const settings: any = await payload.findGlobal({ slug: 'site-settings', depth: 2 })
    if (settings?.stats) stats = { ...defaultStats, ...settings.stats }
    if (Array.isArray(settings?.heroCollage)) collage = settings.heroCollage
  } catch {
    // fall back
  }

  if (!collage.length) {
    collage = [
      { caption: 'Workplace Simulations', placeholderLabel: 'Skillversity classroom photo' },
      { caption: 'Hospital Admin Lab', placeholderLabel: 'Hospital admin lab photo', badge: '🇮🇳 + 🇦🇪 Pathways' },
      { caption: 'Warehouse Visit', placeholderLabel: 'Warehouse visit photo', overlay: '10141+ placed from 2014' },
      { caption: 'Mentor-led Sessions', placeholderLabel: 'Mentor session photo' },
    ]
  }
  collage = collage.slice(0, 4)

  return (
    <section className="hero-base" style={{ padding: '80px 0 110px' }}>
      <div className="wrap">
        <div className="hero-grid">
          <div>
            {props.eyebrow && (
              <span className="eyebrow" style={{ marginBottom: '20px' }}>
                <span className="dot" />{props.eyebrow}
              </span>
            )}
            <h1 className="h-display" style={{ marginTop: '16px' }}>
              {props.headline}
              {props.highlight && (
                <>
                  <br />
                  <span className="grad-text">{props.highlight}</span>
                </>
              )}
            </h1>
            {props.description && (
              <p className="lead" style={{ maxWidth: '600px', marginTop: '22px' }}>{props.description}</p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '32px' }}>
              {props.primaryCtaLabel && props.primaryCtaUrl && (
                <Link href={props.primaryCtaUrl} className="btn btn-brand btn-lg">{props.primaryCtaLabel}</Link>
              )}
              {props.secondaryCtaLabel && props.secondaryCtaUrl && (
                <Link href={props.secondaryCtaUrl} className="btn btn-dark btn-lg">{props.secondaryCtaLabel}</Link>
              )}
              {props.whatsappLabel && props.whatsappUrl && (
                <a href={props.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-lg">{props.whatsappLabel}</a>
              )}
            </div>
            {props.rating && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '22px', fontSize: '14px', color: 'var(--ink-soft)' }}>
                <span style={{ color: 'var(--brand-orange)' }}>★★★★★</span>
                <span>{props.rating}</span>
              </div>
            )}
            {props.showStats && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '10px', marginTop: '34px', maxWidth: '460px' }}>
                <div className="stat-box"><div className="stat-num" style={{ color: 'var(--brand-pink)' }}>{stats.placements}<sup style={{ fontSize: '.5em' }}>+</sup></div><div className="stat-lbl">{stats.placementsLabel}</div></div>
                <div className="stat-box"><div className="stat-num" style={{ color: 'var(--brand-blue)' }}>{stats.hiringPartners}<sup style={{ fontSize: '.5em' }}>+</sup></div><div className="stat-lbl">{stats.hiringPartnersLabel}</div></div>
                <div className="stat-box"><div className="stat-num" style={{ color: 'var(--brand-orange)' }}>{stats.mentors}</div><div className="stat-lbl">{stats.mentorsLabel}</div></div>
                <div className="stat-box"><div className="stat-num" style={{ color: 'var(--brand-cyan)' }}>{stats.mentorshipYears} <span style={{ fontSize: '16px', fontWeight: 700 }}>yr</span></div><div className="stat-lbl">{stats.mentorshipLabel}</div></div>
              </div>
            )}
          </div>
          <div className="hero-form-col">
            <div className="hero-collage">
              {collage.map((slot: any, i) => (
                <div key={i} className={`hero-collage-card hero-collage-card-${i + 1}`}>
                  <MediaPlaceholder media={slot.image} label={slot.placeholderLabel || slot.caption || 'a Skillversity photo'} editUrl="/admin/globals/site-settings" />
                  {slot.badge && <span className="hero-collage-badge">{slot.badge}</span>}
                  {slot.overlay && <span className="hero-collage-overlay">{slot.overlay}</span>}
                  {slot.caption && <span className="hero-collage-caption">{slot.caption}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
