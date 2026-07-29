import React from 'react'
import Link from 'next/link'

type ProgramLink = { title: string; slug: string }
type NavItem = { label: string; href: string; newTab?: boolean }

type Props = {
  phone: string
  phoneLink: string
  email: string
  website: string
  address: string
  tagline: string
  social: {
    instagram: string
    facebook: string
    linkedin: string
    youtube: string
  }
  programs: ProgramLink[]
  navItems: NavItem[]
}

export const SkillversityFooter: React.FC<Props> = ({
  phone, phoneLink, email, website, address, tagline, social, programs, navItems,
}) => {
  return (
    <footer>
      <div className="brand-strip" style={{ marginBottom: '60px', marginTop: '-60px' }} />
      <div className="wrap foot-grid">
        <div>
          <div className="foot-brand-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Skillversity" className="brand-logo foot-logo" width={1867} height={544} />
          </div>
          <p>{tagline}</p>
          <div className="socials" style={{ marginTop: '16px' }}>
            {social.instagram && (
              <a className="soc" href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
            )}
            {social.facebook && (
              <a className="soc" href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
            )}
            {social.linkedin && (
              <a className="soc" href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">IN</a>
            )}
            {social.youtube && (
              <a className="soc" href={social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">YT</a>
            )}
          </div>
          
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <h6 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.7)', marginBottom: '10px' }}>
              Skillversity Mobile App
            </h6>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <a
                href="https://play.google.com/store/apps/details?id=com.app.skillversity"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#090A12',
                  color: '#ffffff',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <svg viewBox="0 0 512 512" width="18" height="18">
                  <path fill="#415A6C" d="M30 40c0-10 7-17 17-17h.3L275 251 47.3 479H47c-10 0-17-7-17-17V40z" />
                  <path fill="#13B5EA" d="M30 40c0-5 2-10 6-13l240 224L47.3 479c-4-3-6-8-6-13V40z" />
                  <path fill="#00C1A8" d="m276 251 68-68 111 63c8 4 8 13 0 17l-111 63-68-75z" opacity=".2" />
                  <path fill="#FF3333" d="M344 183 47.3 27C44 25 40 23 36 23l240 228 68-68z" />
                  <path fill="#FFD400" d="M455 245 344 183l-68 68 68 68 111-62c8-5 8-12 0-12z" />
                  <path fill="#00E676" d="M344 319 276 251 36 479c4 0 8-2 11.3-4L344 319z" />
                </svg>
                <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                  <div style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7 }}>GET IT ON</div>
                  <div style={{ fontSize: '12px', fontWeight: 800, fontFamily: 'var(--display)' }}>Google Play</div>
                </div>
              </a>

              <a
                href="https://apps.apple.com/kz/app/skillversity/id6758941193"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#090A12',
                  color: '#ffffff',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <svg viewBox="0 0 384 512" width="16" height="16" fill="#ffffff">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-14 69.5-34.3z"/>
                </svg>
                <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                  <div style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7 }}>DOWNLOAD ON THE</div>
                  <div style={{ fontSize: '12px', fontWeight: 800, fontFamily: 'var(--display)' }}>App Store</div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div>
          <h5>Programs</h5>
          <ul>
            {programs.map((p) => (
              <li key={p.slug}>
                <Link href={`/programs/${p.slug}`}>{p.title}</Link>
              </li>
            ))}
            <li>
              <Link href="/programs">Compare All Programs</Link>
            </li>
          </ul>
        </div>
        <div>
          <h5>Quick Links</h5>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} target={item.newTab ? '_blank' : undefined}>{item.label}</Link>
              </li>
            ))}
            <li>
              <a href="https://apps.apple.com/kz/app/skillversity/id6758941193" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-pink)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <svg viewBox="0 0 384 512" width="14" height="14" fill="currentColor">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-14 69.5-34.3z"/>
                </svg>
                iOS App Store
              </a>
            </li>
            <li>
              <a href="https://play.google.com/store/apps/details?id=com.app.skillversity" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-cyan)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <svg viewBox="0 0 512 512" width="14" height="14" fill="currentColor">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-59.8 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.7c15.4-8.9 24.6-24.3 24.6-40.1s-9.2-31.2-25.8-40.1zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                </svg>
                Android Google Play
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5>Contact</h5>
          <div className="foot-contact" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.85 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <a href={phoneLink}>{phone}</a>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.85 }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <a href={`mailto:${email}`}>{email}</a>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.85 }}>
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <a href={website}>{website.replace('https://', '')}</a>
            </span>
            <span style={{ display: 'block', marginTop: '8px', lineHeight: 1.5 }}>
              {address.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < address.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </span>
          </div>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span>
          © {new Date().getFullYear()} Skillversity Global. All rights reserved. | A Job Campus
          from IMS Group of Institutions
        </span>
        <span>
          <Link href="/sitemap.xml">Sitemap</Link> ·{' '}
          <Link href="/privacy">Privacy Policy</Link>
        </span>
      </div>
    </footer>
  )
}
