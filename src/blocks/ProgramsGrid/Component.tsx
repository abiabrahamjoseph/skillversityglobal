import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { MediaPlaceholder } from '@/components/skillversity/MediaPlaceholder'
import { ScrollReveal } from '@/components/skillversity/ScrollReveal'
import { defaultPrograms } from '@/skillversity/defaultContent'

type Props = {
  eyebrow?: string | null
  title?: string | null
  description?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  columns?: '2' | '4' | null
  background?: 'gridPaper' | 'white' | 'cream' | null
}

export const ProgramsGridBlock: React.FC<Props> = async (props) => {
  let programs: any[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'programs',
      draft: false,
      limit: 12,
      sort: 'sortOrder',
      depth: 2,
      where: { status: { not_equals: 'inactive' } },
    })
    programs = result.docs.length ? result.docs : defaultPrograms
  } catch {
    programs = defaultPrograms
  }

  const cols = props.columns === '2' ? 'g2' : 'g4'
  const bg = props.background === 'cream' ? 'var(--cream)' : props.background === 'white' ? '#fff' : undefined
  const sectionClass = props.background === 'gridPaper' || !props.background ? 'section grid-paper' : 'section'

  return (
    <section className={sectionClass} style={bg ? { background: bg } : undefined}>
      <div className="wrap">
        {(props.eyebrow || props.title || props.description) && (
          <ScrollReveal className="section-head">
            {props.eyebrow && <span className="eyebrow"><span className="dot" />{props.eyebrow}</span>}
            {props.title && <h2 className="h-section" style={{ marginTop: '14px' }}>{props.title}</h2>}
            {props.description && <p className="lead">{props.description}</p>}
          </ScrollReveal>
        )}
        <div className={cols} style={{ gap: cols === 'g2' ? '28px' : '20px' }}>
          {programs.map((p: any, i) => (
            <ScrollReveal key={p.slug || i}>
              <Link href={`/programs/${p.slug}`} className="prog-card">
                <div className="prog-card-media" style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', background: p.cardGradient }}>
                  {/* editUrl omitted on purpose: the entire card is already wrapped in a <Link>; rendering a nested <a> here breaks SSR hydration. */}
                  <MediaPlaceholder media={p.cardImage} label={`${p.title} photo`} />
                  <span className="prog-card-tag" style={{ background: p.tagColor, position: 'absolute', top: '14px', left: '14px', zIndex: 2 }}>{p.tag}</span>
                </div>
                <div className="prog-card-head" style={{ background: 'transparent', paddingTop: '18px' }}>
                  <h3 style={{ fontSize: cols === 'g2' ? '22px' : undefined }}>{p.title}</h3>
                  <p>{p.shortDescription}</p>
                </div>
                <div className="prog-card-body">
                  <div style={{ display: 'flex', gap: '20px', fontSize: '12.5px', fontWeight: 700, margin: '12px 0' }}>
                    <div><b style={{ display: 'block', fontSize: '10.5px', color: 'var(--ink-mute)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '2px' }}>Duration</b>{p.duration}</div>
                    <div><b style={{ display: 'block', fontSize: '10.5px', color: 'var(--ink-mute)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '2px' }}>Eligibility</b>{p.eligibility}</div>
                  </div>
                  <div style={{ color: p.accentColor || 'var(--brand-blue)', fontWeight: 800, fontSize: '14px' }}>Explore program →</div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        {props.ctaLabel && props.ctaUrl && (
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link href={props.ctaUrl} className="btn btn-dark btn-lg">{props.ctaLabel}</Link>
          </div>
        )}
      </div>
    </section>
  )
}
