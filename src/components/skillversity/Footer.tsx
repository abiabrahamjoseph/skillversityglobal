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
