import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { ScrollReveal } from '@/components/skillversity/ScrollReveal'

type Props = {
  eyebrow?: string | null
  title?: string | null
  description?: string | null
  featuredOnly?: boolean | null
  maxCount?: number | null
  background?: 'white' | 'cream' | null
}

export const TestimonialsGridBlock: React.FC<Props> = async (props) => {
  let testimonials: any[] = []
  const limit = props.maxCount || 6

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'testimonials',
      limit,
      sort: 'sortOrder',
      where: props.featuredOnly ? { featured: { equals: true } } : undefined,
    })
    testimonials = result.docs
  } catch {
    testimonials = []
  }

  if (!testimonials.length) return null

  return (
    <section className="section" style={{ background: props.background === 'cream' ? 'var(--cream)' : '#fff' }}>
      <div className="wrap">
        <ScrollReveal className="section-head">
          {props.eyebrow && <span className="eyebrow"><span className="dot" />{props.eyebrow}</span>}
          {props.title && <h2 className="h-section" style={{ marginTop: '14px' }}>{props.title}</h2>}
          {props.description && <p className="lead">{props.description}</p>}
        </ScrollReveal>
        <div className="g3">
          {testimonials.map((t: any, i) => (
            <ScrollReveal key={t.id || i}>
              <div className="t-card">
                <div className="qmark">&quot;</div>
                <div className="stars">★★★★★</div>
                <p className="quote">{t.quote}</p>
                <div className="person">
                  <div className="ava" style={{ background: t.accentColor || 'var(--brand-pink)' }}>
                    {t.initials || (t.studentName || '').slice(0, 2).toUpperCase()}
                  </div>
                  <div className="meta">
                    <b>{t.studentName}</b>
                    <span>{[t.role, t.company].filter(Boolean).join(' · ')}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
