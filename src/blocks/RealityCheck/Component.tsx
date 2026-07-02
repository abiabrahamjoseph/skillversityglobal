import React from 'react'
import Link from 'next/link'
import { ScrollReveal } from '@/components/skillversity/ScrollReveal'

type Props = {
  eyebrow?: string | null
  headline: string
  highlight?: string | null
  description?: string | null
  painPoints?: Array<{ item: string }> | null
  cardTape?: string | null
  cardHeading?: string | null
  cardBody?: string | null
  cardItems?: Array<{ item: string }> | null
  ctaLabel?: string | null
  ctaUrl?: string | null
}

export const RealityCheckBlock: React.FC<Props> = (props) => {
  const painPoints = (props.painPoints || []).map((p) => p.item).filter(Boolean)
  const cardItems = (props.cardItems || []).map((p) => p.item).filter(Boolean)

  return (
    <section className="dark-sec section">
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', alignItems: 'center' }}>
        <ScrollReveal>
          {props.eyebrow && <span className="eyebrow"><span className="dot" />{props.eyebrow}</span>}
          <h2 className="h-section" style={{ color: '#fff', marginTop: '18px' }}>
            {props.headline}
            {props.highlight && (
              <>
                <br />
                <em style={{ fontStyle: 'normal', color: 'var(--brand-yellow)' }}>{props.highlight}</em>
              </>
            )}
          </h2>
          {props.description && <p className="lead" style={{ marginTop: '16px' }}>{props.description}</p>}
          {painPoints.length > 0 && (
            <ul className="check-list" style={{ marginTop: '28px' }}>
              {painPoints.map((pp, i) => <li key={i}>{pp}</li>)}
            </ul>
          )}
          <style>{`.check-list li::before{background:var(--brand-pink)}`}</style>
        </ScrollReveal>
        <ScrollReveal>
          <div style={{ background: 'var(--grad-warm)', borderRadius: 'var(--rad-lg)', padding: '36px', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px -20px rgba(255,46,31,.45)' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
            {props.cardTape && <span className="tape">{props.cardTape}</span>}
            {props.cardHeading && <h3 style={{ fontSize: '26px', color: '#fff', marginTop: '16px', lineHeight: 1.1 }}>{props.cardHeading}</h3>}
            {props.cardBody && <p style={{ color: 'rgba(255,255,255,.9)', marginTop: '14px', fontSize: '15px' }}>{props.cardBody}</p>}
            {cardItems.length > 0 && (
              <ul style={{ marginTop: '20px', display: 'grid', gap: '9px' }}>
                {cardItems.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#fff', fontWeight: 600, fontSize: '14.5px' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,255,255,.25)', display: 'grid', placeItems: 'center', fontSize: '11px', fontWeight: 800, flex: 'none' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {props.ctaLabel && props.ctaUrl && (
              <Link href={props.ctaUrl} className="btn btn-ghost-white btn-lg" style={{ marginTop: '24px', width: '100%' }}>{props.ctaLabel}</Link>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
