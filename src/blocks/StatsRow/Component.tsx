import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { ScrollReveal } from '@/components/skillversity/ScrollReveal'
import { defaultStats } from '@/skillversity/defaultContent'

type Stat = { value: string; label: string; description?: string | null; color?: string | null }

type Props = {
  eyebrow?: string | null
  title?: string | null
  description?: string | null
  source?: 'siteSettings' | 'custom' | null
  stats?: Stat[] | null
  background?: 'white' | 'cream' | null
}

const COLOR_MAP: Record<string, string> = {
  pink: 'var(--brand-pink)',
  blue: 'var(--brand-blue)',
  orange: 'var(--brand-orange)',
  cyan: 'var(--brand-cyan)',
  yellow: 'var(--brand-yellow)',
}

export const StatsRowBlock: React.FC<Props> = async (props) => {
  let stats: Stat[] = []

  if (props.source === 'custom' && Array.isArray(props.stats) && props.stats.length > 0) {
    stats = props.stats.map((s) => ({ ...s, color: COLOR_MAP[s.color || 'pink'] || s.color || 'var(--brand-pink)' }))
  } else {
    try {
      const payload = await getPayload({ config: configPromise })
      const settings: any = await payload.findGlobal({ slug: 'site-settings' })
      const s = settings?.stats || defaultStats
      stats = [
        { value: `${s.placements || defaultStats.placements}+`, label: s.placementsLabel || defaultStats.placementsLabel, color: 'var(--brand-pink)' },
        { value: `${s.hiringPartners || defaultStats.hiringPartners}+`, label: s.hiringPartnersLabel || defaultStats.hiringPartnersLabel, color: 'var(--brand-blue)' },
        { value: s.mentors || defaultStats.mentors, label: s.mentorsLabel || defaultStats.mentorsLabel, color: 'var(--brand-orange)' },
        { value: `${s.mentorshipYears || defaultStats.mentorshipYears} yr`, label: s.mentorshipLabel || defaultStats.mentorshipLabel, color: 'var(--brand-cyan)' },
      ]
    } catch {
      stats = []
    }
  }

  if (!stats.length) return null

  return (
    <section className="section" style={{ background: props.background === 'cream' ? 'var(--cream)' : '#fff' }}>
      <div className="wrap">
        {(props.eyebrow || props.title || props.description) && (
          <ScrollReveal className="section-head">
            {props.eyebrow && <span className="eyebrow"><span className="dot" />{props.eyebrow}</span>}
            {props.title && <h2 className="h-section" style={{ marginTop: '14px' }}>{props.title}</h2>}
            {props.description && <p className="lead">{props.description}</p>}
          </ScrollReveal>
        )}
        <div className="g4">
          {stats.map((s, i) => (
            <ScrollReveal key={i}>
              <div className="stat-box" style={{ padding: '24px' }}>
                <div className="stat-num" style={{ color: s.color || 'var(--brand-pink)', fontSize: '44px' }}>{s.value}</div>
                <div className="stat-lbl" style={{ marginTop: '4px' }}>{s.label}</div>
                {s.description && <p style={{ marginTop: '8px', fontSize: '13px', color: 'var(--ink-soft)' }}>{s.description}</p>}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
