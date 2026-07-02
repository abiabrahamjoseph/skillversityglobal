import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { ScrollReveal } from '@/components/skillversity/ScrollReveal'
import { defaultCerts } from '@/skillversity/defaultContent'

type Props = {
  eyebrow?: string | null
  title?: string | null
  theme?: 'dark' | 'light' | null
}

export const CertificationsGridBlock: React.FC<Props> = async (props) => {
  let certs: Array<{ icon: string; title: string; description: string }> = defaultCerts

  try {
    const payload = await getPayload({ config: configPromise })
    const settings: any = await payload.findGlobal({ slug: 'site-settings' })
    if (Array.isArray(settings?.certifications) && settings.certifications.length) {
      certs = settings.certifications
    }
  } catch {
    // fall back
  }

  const isDark = props.theme !== 'light'

  return (
    <section className={isDark ? 'dark-sec section--sm' : 'section'} style={isDark ? undefined : { background: '#fff' }}>
      <div className="wrap">
        <ScrollReveal>
          <div className="section-head" style={{ marginBottom: '36px' }}>
            {props.eyebrow && <span className="eyebrow"><span className="dot" />{props.eyebrow}</span>}
            {props.title && (
              <h2 className="h-section" style={{ color: isDark ? '#fff' : undefined, marginTop: '14px' }}>{props.title}</h2>
            )}
          </div>
        </ScrollReveal>
        <div className="g4" style={{ gap: '14px' }}>
          {certs.map((c, i) => (
            <div key={i} style={isDark
              ? { background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 'var(--rad)', padding: '22px' }
              : { background: 'var(--cream)', border: '1.5px solid var(--line)', borderRadius: 'var(--rad)', padding: '22px' }
            }>
              <div style={{ fontSize: '26px', marginBottom: '10px' }}>{c.icon}</div>
              <h4 style={{ color: isDark ? 'var(--brand-yellow)' : 'var(--brand-pink)', fontSize: '16px', marginBottom: '8px' }}>{c.title}</h4>
              <p style={{ fontSize: '13.5px', color: isDark ? 'rgba(255,255,255,.75)' : 'var(--ink-soft)' }}>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
