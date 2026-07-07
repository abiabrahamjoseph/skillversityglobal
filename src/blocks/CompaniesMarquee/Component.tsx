import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { defaultCompanies } from '@/skillversity/defaultContent'

type Props = {
  title?: string | null
  useSiteSettings?: boolean | null
  companies?: Array<{ name: string }> | null
}

const logoMap: Record<string, { bg: string; color: string; svg: React.ReactNode }> = {
  'amazon': {
    bg: '#FFFFFF',
    color: '#232F3E',
    svg: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 800, fontSize: '15.5px', color: '#232F3E', letterSpacing: '-0.5px' }}>amazon</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#FF9900" style={{ marginTop: '2px' }}>
          <path d="M4 12c4 2.8 9.7 2.8 13.7.2.3-.2.6.1.4.4-1.1 1.2-3.2 2.1-5.7 2.1-2.6 0-4.8-.8-5.9-2.1-.2-.3.1-.6.5-.6z"/>
          <path d="M18.2 11.2c.1.4-.2.6-.5.4l-1.9-1.2c-.3-.2-.2-.5.1-.5l2.2.1c.3.1.3.4.1 1.2z"/>
        </svg>
      </div>
    )
  },
  'dhl': {
    bg: '#FFCC00',
    color: '#D40511',
    svg: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#D40511">
          <path d="M2 19h4l3-14H5zm5 0h4l3-14H9zm5 0h4l3-14h-4z"/>
        </svg>
        <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 900, fontStyle: 'italic', fontSize: '16px', color: '#D40511', letterSpacing: '0.5px' }}>DHL</span>
      </div>
    )
  },
  'fedex': {
    bg: '#FFFFFF',
    color: '#4D148C',
    svg: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 900, fontSize: '16px', letterSpacing: '-0.5px' }}>
          <span style={{ color: '#4D148C' }}>Fed</span>
          <span style={{ color: '#FF6600' }}>Ex</span>
        </span>
      </div>
    )
  },
  'maersk': {
    bg: '#FFFFFF',
    color: '#00243D',
    svg: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '18px', height: '18px', background: '#00A0E2', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" width="12" height="12" fill="#FFFFFF">
            <polygon points="12,5 14,10 19,10 15,13 17,18 12,15 7,18 9,13 5,10 10,10"/>
          </svg>
        </div>
        <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 800, fontSize: '14.5px', color: '#00243D', letterSpacing: '0.8px' }}>MAERSK</span>
      </div>
    )
  },
  'flipkart': {
    bg: '#FFFFFF',
    color: '#2874F0',
    svg: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#2874F0">
          <path d="M4 2h16l-2 8H6L4 2zm3.5 11a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0-2.5-2.5zm9 0a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0-2.5-2.5z" fill="#FFE500"/>
        </svg>
        <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 800, fontStyle: 'italic', fontSize: '15px', color: '#2874F0' }}>Flipkart</span>
      </div>
    )
  },
  'apollo hospitals': {
    bg: '#FFFFFF',
    color: '#006B54',
    svg: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <svg viewBox="0 0 24 24" width="18" height="18" style={{ display: 'block' }}>
          <circle cx="12" cy="12" r="10" fill="#006B54"/>
          <path d="M12 7v10M7 12h10" stroke="#FFCC00" strokeWidth="3" strokeLinecap="round"/>
        </svg>
        <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 700, fontSize: '14.5px', color: '#006B54' }}>Apollo</span>
      </div>
    )
  },
  'aster medcity': {
    bg: '#FFFFFF',
    color: '#0085A1',
    svg: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#FFCC00" style={{ display: 'block' }}>
          <path d="M12 2l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"/>
        </svg>
        <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 700, fontSize: '14.5px', color: '#0085A1' }}>Aster</span>
      </div>
    )
  },
  'dp world': {
    bg: '#FFFFFF',
    color: '#0D2C54',
    svg: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <svg viewBox="0 0 24 24" width="16" height="16" style={{ display: 'block' }}>
          <circle cx="12" cy="12" r="8" fill="#00B4D8"/>
          <path d="M8 12s2-3 4-3 4 3 4 3-2 3-4 3-4-3-4-3z" fill="#0D2C54"/>
        </svg>
        <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 800, fontSize: '14px', color: '#0D2C54', letterSpacing: '0.5px' }}>DP WORLD</span>
      </div>
    )
  },
  'reliance retail': {
    bg: '#FFFFFF',
    color: '#E21B22',
    svg: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#E21B22" style={{ display: 'block' }}>
          <circle cx="12" cy="12" r="10" stroke="#E21B22" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="12" r="5" fill="#E21B22"/>
        </svg>
        <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 700, fontSize: '15px', color: '#E21B22' }}>Reliance</span>
      </div>
    )
  },
  'blue dart': {
    bg: '#FFFFFF',
    color: '#003399',
    svg: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#003399" style={{ display: 'block' }}>
          <polygon points="2,12 8,6 14,12 10,12 10,18 6,18 6,12"/>
        </svg>
        <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 900, fontStyle: 'italic', fontSize: '14.5px', color: '#003399', letterSpacing: '0.5px' }}>BLUE DART</span>
      </div>
    )
  },
  'delhivery': {
    bg: '#FFFFFF',
    color: '#1A1A1A',
    svg: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#FF9900" style={{ display: 'block' }}>
          <path d="M6 2L2 8h8L6 2z"/>
        </svg>
        <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 800, fontSize: '14px', color: '#1A1A1A', letterSpacing: '0.5px' }}>DELHIVERY</span>
      </div>
    )
  }
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
  const track = [...companies, ...companies, ...companies, ...companies]

  return (
    <section className="marquee-wrap">
      {props.title && (
        <div style={{ textAlign: 'center', marginBottom: '14px', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--ink-mute)' }}>
          {props.title}
        </div>
      )}
      <div className="marquee-track">
        {track.map((name, i) => {
          const key = name.toLowerCase().trim()
          const brand = logoMap[key]

          if (brand) {
            return (
              <span 
                className="m-logo-pill" 
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 22px',
                  borderRadius: '999px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  background: brand.bg,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                  whiteSpace: 'nowrap',
                  cursor: 'default'
                }}
              >
                {brand.svg}
              </span>
            )
          }

          // Fallback if not in logoMap
          return (
            <span 
              className="m-logo-pill" 
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                borderRadius: '999px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                background: '#FFFFFF',
                color: '#1A1A1A',
                boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                whiteSpace: 'nowrap',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'default'
              }}
            >
              <span 
                style={{ 
                  display: 'inline-block',
                  background: 'var(--brand-blue)', 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%' 
                }} 
              />
              {name}
            </span>
          )
        })}
      </div>
    </section>
  )
}
