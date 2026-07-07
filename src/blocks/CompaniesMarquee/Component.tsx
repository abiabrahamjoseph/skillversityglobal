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
      <svg viewBox="0 0 100 24" width="75" height="18" fill="none">
        <path d="M11.9 10.7c-.5-.4-.9-.8-.9-1.5 0-1 .9-1.7 2.1-1.7 1.1 0 1.8.5 2.1 1.1h1.3c-.3-1.1-1.4-2.2-3.3-2.2-2.1 0-3.6 1.3-3.6 3.1 0 1.2.7 2.2 1.9 2.8-1.1.4-1.9 1.4-1.9 2.8 0 2 1.8 3.2 3.9 3.2 2.5 0 3.7-1.3 3.7-3.1 0-1.4-.9-2.3-3.3-2.6zm-.9 4.8c-.8 0-1.4-.5-1.4-1.3 0-.8.6-1.3 1.4-1.3h1.9v1.3c0 .8-.5 1.3-1.9 1.3zm7.8-8.2c-1.2 0-2.1.6-2.5 1.4V7.5H15v10.5h1.4v-5.6c0-1.4.8-2.3 2-2.3 1.1 0 1.7.7 1.7 2.1v5.8h1.4v-6.3c0-2.3-1.2-3.6-3.8-3.6zm-14-1.7h1.4V4.1h-1.4v1.5zm0 1.9h1.4v10.5h-1.4V7.5zM6.9 12c.9 0 1.7-.5 1.7-1.6V7.5H7.2v2.7c0 .6-.3.9-.8.9s-.8-.3-.8-.9V7.5H4.2v2.9c0 1.1.8 1.6 1.7 1.6z" fill="#232F3E"/>
        <path d="M4.2 14.5c4 2.8 9.7 2.8 13.7.2.3-.2.6.1.4.4-1.1 1.2-3.2 2.1-5.7 2.1-2.6 0-4.8-.8-5.9-2.1-.2-.3.1-.6.5-.6zm14.2-.8c.1.4-.2.6-.5.4l-1.9-1.2c-.3-.2-.2-.5.1-.5l2.2.1c.3.1.3.4.1 1.2z" fill="#FF9900"/>
      </svg>
    )
  },
  'dhl': {
    bg: '#FFCC00',
    color: '#D40511',
    svg: (
      <svg viewBox="0 0 100 24" width="75" height="18" fill="#D40511">
        <path d="M0 20h8l3-16H3zM10 20h8l3-16h-8zM20 20h8l3-16h-8zM35 4h10c4.4 0 7 2.2 7 5.8 0 4.2-3 6.2-7.5 6.2H38l-1.2 4H32.8l4.2-16zm6.8 9c1.8 0 3-.6 3-2.5 0-1.6-1-2.5-2.6-2.5H39.8l-1.5 5h2.5zM56 4h4.5l-1.5 5H64l-1.5 5h-4.8l-1.2 4h6.5l-1.2 4h-11L56 4zm16.5 0h4.5l-1.8 6h3.5L77 4h4.5L78 14h-3.5L73 20h-4.5l4-16z"/>
      </svg>
    )
  },
  'fedex': {
    bg: '#FFFFFF',
    color: '#4D148C',
    svg: (
      <svg viewBox="0 0 100 24" width="75" height="18" fill="none">
        <path d="M0 20h5v-5.5h4.5v-4H5V6.5h6V2.5H0v17.5zm16-11c-3.2 0-5.2 2.2-5.2 5.5s2 5.5 5 5.5c2.5 0 4.2-1.2 4.8-3h-4c-.4.5-.8.7-1.4.7-1 0-1.7-.8-1.7-2h7.5v-.6c0-3.5-2-5.8-5-5.8zm-2.5 4.2c.2-1.2.8-2 2-2 1 0 1.5.6 1.7 2h-3.7zM27 20h5V2.5h-5V20zm11.5-11c-2.5 0-4.5 1.5-5 3.7V2.5h-5V20h5v-6.6c0-2.5 1.6-3.8 3.7-3.8h.8v-4.6h-.6z" fill="#4D148C"/>
        <path d="M45 20h5v-5.5h4.5v-4H50V6.5h6V2.5H45v17.5zm16-11c-3.2 0-5.2 2.2-5.2 5.5s2 5.5 5 5.5c2.5 0 4.2-1.2 4.8-3h-4c-.4.5-.8.7-1.4.7-1 0-1.7-.8-1.7-2h7.5v-.6c0-3.5-2-5.8-5-5.8zm-2.5 4.2c.2-1.2.8-2 2-2 1 0 1.5.6 1.7 2h-3.7zM76.5 9L74 12.7l-2.5-3.7h-4.8l5 6.3-5 6.7h4.8l2.9-4.2 2.9 4.2H82l-5-6.7 5-6.3h-5.5z" fill="#FF6600"/>
      </svg>
    )
  },
  'maersk': {
    bg: '#FFFFFF',
    color: '#00243D',
    svg: (
      <svg viewBox="0 0 110 24" width="85" height="18" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#00A0E2"/>
        <polygon points="12,5 14,10 19,10 15,13 17,18 12,15 7,18 9,13 5,10 10,10" fill="#FFFFFF"/>
        <path d="M28 20V4h4l3 9 3-9h4v16h-3V8l-3 9h-2l-3-9v12h-3zm18-12h4l4 12h-3l-1-3h-5l-1 3h-3l4-12zm3 6l-2-6-2 6h4zm13 6V4h10v3h-7v4h6v3h-6v3h7v3H62zm16 0V14c0-2 1.5-3 3-3s3 1 3 3v6h3v-6c0-3.5-2.5-5-5-5-2 0-3.5 1-4.5 2V4h-3v16h3.5zm16-4c.5.5 1.2.8 2 .8 1.5 0 2.5-1 2.5-2.5s-1-2.5-2.5-2.5c-.8 0-1.5.3-2 .8v3.4zm0 4h-3V7.5h3v2c.8-1 1.8-1.5 3-1.5 3 0 5 2 5 5s-2 5-5 5c-1.2 0-2.2-.5-3-1.5v1z" fill="#00243D"/>
      </svg>
    )
  },
  'flipkart': {
    bg: '#FFFFFF',
    color: '#2874F0',
    svg: (
      <svg viewBox="0 0 100 24" width="75" height="18" fill="none">
        <path d="M4 2h14l-2 8H6L4 2z" fill="#2874F0"/>
        <path d="M7.5 13a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0-2.5-2.5zm9 0a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0-2.5-2.5z" fill="#FFE500"/>
        <path d="M28 20V4h10v3h-7v4h6v3h-6v6h-3zm11 0V7.5h3v2.2c.8-1.2 2-1.8 3.3-1.8 1.5 0 2.5.6 3 1.5.8-1 1.8-1.5 3-1.5 2.5 0 4 1.8 4 4.5V20h-3v-7.2c0-1.8-.7-2.6-1.8-2.6s-1.8.8-1.8 2.6V20h-3v-7.2c0-1.8-.7-2.6-1.8-2.6s-1.8.8-1.8 2.6V20h-3zm18 0V7.5h3v2.2c.8-1.2 2-1.8 3.3-1.8 3 0 5.2 2 5.2 5s-2.2 5-5.2 5c-1.2 0-2.2-.6-3-1.8v6.8h-3zm6.5-6.8c1.5 0 2.5-1 2.5-2.6s-1-2.6-2.5-2.6c-.8 0-1.5.4-2 1.2v2.8c.5.8 1.2 1.2 2 1.2z" fill="#2874F0"/>
      </svg>
    )
  },
  'apollo hospitals': {
    bg: '#FFFFFF',
    color: '#006B54',
    svg: (
      <svg viewBox="0 0 110 24" width="85" height="18" fill="none">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3 11h-2.5v2.5h-1V13H9v-1h2.5V9.5h1V12H15v1z" fill="#FFCC00"/>
        <path d="M28 20l3.5-12h3L38 20h-3.2l-.8-3h-3l-.8 3h-2.2zm4-5.5l-1-4-1 4h2zm11 5.5V7.5h3v2.2c.8-1.2 2-1.8 3.3-1.8 3 0 5.2 2 5.2 5s-2.2 5-5.2 5c-1.2 0-2.2-.5-3-1.5v6.8h-3zm6.5-6.8c1.5 0 2.5-1 2.5-2.6s-1-2.6-2.5-2.6c-.8 0-1.5.4-2 1.2v2.8c.5.8 1.2 1.2 2 1.2zM62 14c0-3.5 2.5-6.5 5.5-6.5s5.5 3 5.5 6.5-2.5 6.5-5.5 6.5-5.5-3-5.5-6.5zm8 0c0-2-1-3.5-2.5-3.5S65 12 65 14s1 3.5 2.5 3.5S70 16 70 14zm6 6V4h3.5v16H76zm6 0V4h3.5v16H82z" fill="#006B54"/>
      </svg>
    )
  },
  'aster medcity': {
    bg: '#FFFFFF',
    color: '#0085A1',
    svg: (
      <svg viewBox="0 0 100 24" width="75" height="18" fill="none">
        <path d="M12 2l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1zm0 4.5l-.8 1.8-1.8.3 1.3 1.3-.3 1.8 1.6-.9 1.6.9-.3-1.8 1.3-1.3-1.8-.3z" fill="#FFCC00"/>
        <path d="M28 20l3.5-12h3L38 20h-3.2l-.8-3h-3l-.8 3h-2.2zm4-5.5l-1-4-1 4h2zm8.5 2c0 1.2.6 1.8 1.8 1.8.8 0 1.4-.4 1.8-.8v-2.2c-.4-.4-1-.6-1.8-.6-1.2 0-1.8.6-1.8 1.8zm3.2 3.5V19c-.8 1-1.8 1.5-3 1.5-3 0-4.8-1.8-4.8-4.5s1.8-4.5 4.8-4.5c1.2 0 2.2.5 3 1.5v-1h3V20h-3zm11 0V7.5h3v2c.8-1 1.8-1.5 3-1.5v3.2h-.5c-1.5 0-2.5.8-2.5 2.5V20h-3z" fill="#0085A1"/>
      </svg>
    )
  },
  'dp world': {
    bg: '#FFFFFF',
    color: '#0D2C54',
    svg: (
      <svg viewBox="0 0 100 24" width="75" height="18" fill="none">
        <circle cx="10" cy="12" r="8" fill="#00B4D8"/>
        <path d="M6 12s2-4 4-4 4 4 4 4-2 4-4 4-4-4-4-4z" fill="#0D2C54"/>
        <path d="M24 20V4h5c3.5 0 6 2 6 5.5s-2.5 5.5-6 5.5H27.5v5H24zm5-8c1.8 0 2.8-1 2.8-2.5s-1-2.5-2.8-2.5H27.5v5H29zm10 8V4h5c3.5 0 6 2 6 5.5s-2.5 5.5-6 5.5H47.5v5H39zm5-8c1.8 0 2.8-1 2.8-2.5s-1-2.5-2.8-2.5H42.5v5H44zm14 8l-3-16h4l1.8 9.5 2-9.5H62l2 9.5 1.8-9.5h4l-3 16h-4l-1.8-9.5-1.8 9.5h-4zm15-11c-3.3 0-5.5 2-5.5 5s2.2 5 5.5 5 5.5-2 5.5-5-2.2-5-5.5-5zm0 7.2c-1.5 0-2.5-1-2.5-2.2s1-2.2 2.5-2.2 2.5 1 2.5 2.2-1 2.2-2.5 2.2zm11 3.8V7.5h3v2c.8-1 1.8-1.5 3-1.5v3.2h-.5c-1.5 0-2.5.8-2.5 2.5V20h-3z" fill="#0D2C54"/>
      </svg>
    )
  },
  'reliance retail': {
    bg: '#FFFFFF',
    color: '#E21B22',
    svg: (
      <svg viewBox="0 0 100 24" width="75" height="18" fill="none">
        <path d="M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2zm1 14h-2V8h2zm0-10h-2V4h2z" fill="#E21B22"/>
        <path d="M28 20V4h5c2.5 0 4.2 1.2 4.2 3.5A3 3 0 0 1 35 10c1.8.8 2.5 2 3 3.8l1 6.2h-3.2l-.8-5.5c-.4-2.5-1.5-3-3-3H31v8.5h-3zm3-11.5h2c1.2 0 1.8-.5 1.8-1.5s-.6-1.5-1.8-1.5h-2v3zm11 11.5V7.5h3v2.2c.8-1.2 2-1.8 3.3-1.8 3 0 5.2 2 5.2 5s-2.2 5-5.2 5c-1.2 0-2.2-.5-3-1.5v6.8h-3zm6.5-6.8c1.5 0 2.5-1 2.5-2.6s-1-2.6-2.5-2.6c-.8 0-1.5.4-2 1.2v2.8c.5.8 1.2 1.2 2 1.2z" fill="#E21B22"/>
      </svg>
    )
  },
  'blue dart': {
    bg: '#FFFFFF',
    color: '#003399',
    svg: (
      <svg viewBox="0 0 100 24" width="75" height="18" fill="none">
        <polygon points="2,12 8,6 14,12 10,12 10,18 6,18 6,12" fill="#003399"/>
        <path d="M24 20V4h5c2.5 0 4.2 1.2 4.2 3.5A3 3 0 0 1 31 10c2.5 0 4.2 1.5 4.2 4.5V20H24zm5-11.5H27.5v3.2H29c1 0 1.5-.5 1.5-1.6s-.5-1.6-1.5-1.6zm1.5 7.5H27.5v3.2H30.5c1 0 1.5-.5 1.5-1.6s-.5-1.6-1.5-1.6zM39 20V4h3.5v12.5h6V20H39zm15.5-11c-3.3 0-5.5 2-5.5 5s2.2 5 5.5 5 5.5-2 5.5-5-2.2-5-5.5-5zm0 7.2c-1.5 0-2.5-1-2.5-2.2s1-2.2 2.5-2.2 2.5 1 2.5 2.2-1 2.2-2.5 2.2zm11-7.2h5c2.5 0 4.2 1.2 4.2 3.5A3 3 0 0 1 73 10c1.8.8 2.5 2 3 3.8l1 6.2h-3.2l-.8-5.5c-.4-2.5-1.5-3-3-3H70v8.5h-3zm3.5-8.5H72v3.2h1.5c1 0 1.5-.5 1.5-1.6s-.5-1.6-1.5-1.6zm11 8.5h-2.5V4H93v3.5h-2.5v12.5z" fill="#003399"/>
      </svg>
    )
  },
  'delhivery': {
    bg: '#FFFFFF',
    color: '#1A1A1A',
    svg: (
      <svg viewBox="0 0 100 24" width="75" height="18" fill="none">
        <path d="M6 2L2 8h8L6 2z" fill="#FF9900"/>
        <path d="M24 20V4h5c3.5 0 6 2 6 5.5s-2.5 5.5-6 5.5h-1.5v5H24zm5-8c1.8 0 2.8-1 2.8-2.5s-1-2.5-2.8-2.5h-1.5v5H29zm12.5 8V7.5h3v2.2c.8-1.2 2-1.8 3.3-1.8 3 0 5.2 2 5.2 5s-2.2 5-5.2 5c-1.2 0-2.2-.5-3-1.5v6.8h-3zm6.5-6.8c1.5 0 2.5-1 2.5-2.6s-1-2.6-2.5-2.6c-.8 0-1.5.4-2 1.2v2.8c.5.8 1.2 1.2 2 1.2zm11 6.8V4h3.5v16H76z" fill="#1A1A1A"/>
      </svg>
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
