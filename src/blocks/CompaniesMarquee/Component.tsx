import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { defaultCompanies } from '@/skillversity/defaultContent'

type Props = {
  title?: string | null
  useSiteSettings?: boolean | null
  companies?: Array<{ name: string }> | null
}

export const CompaniesMarqueeBlock: React.FC<Props> = async (props) => {
  let companies: string[] = []

  if (props.useSiteSettings === false && Array.isArray(props.companies) && props.companies.length) {
    companies = props.companies.map((c) => c.name).filter(Boolean)
  } else {
    try {
      const payload = await getPayload({ config: configPromise })
      const settings: any = await payload.findGlobal({ slug: 'site-settings' })
      const fromCMS = Array.isArray(settings?.hiringCompanies)
        ? settings.hiringCompanies.map((c: any) => c.name).filter(Boolean)
        : []
      companies = fromCMS.length ? fromCMS : defaultCompanies
    } catch {
      companies = defaultCompanies
    }
  }

  if (!companies.length) return null
  const track = [...companies, ...companies]

  return (
    <section className="marquee-wrap">
      {props.title && (
        <div style={{ textAlign: 'center', marginBottom: '14px', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--ink-mute)' }}>
          {props.title}
        </div>
      )}
      <div className="marquee-track">
        {track.map((name, i) => {
          const dotColors = ['var(--brand-blue)', 'var(--brand-pink)', 'var(--brand-magenta)', 'var(--brand-orange)', 'var(--brand-cyan)', 'var(--brand-amber)']
          const dot = dotColors[i % dotColors.length]
          return (
            <span className="m-logo" key={i}>
              <span className="m-dot" style={{ background: dot }} />
              {name}
            </span>
          )
        })}
      </div>
    </section>
  )
}
