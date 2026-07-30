'use client'

import React, { useState } from 'react'
import Link from 'next/link'

type ProgramLink = { title: string; slug: string; color: string }
type NavItem = { label: string; href: string; newTab?: boolean }

type Props = {
  phone: string
  phoneLink: string
  programs: ProgramLink[]
  navItems: NavItem[]
}

export const SkillversityHeader: React.FC<Props> = ({
  phone,
  phoneLink,
  programs,
  navItems,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <Link href="/" className="brand" aria-label="Skillversity — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Skillversity" className="brand-logo" width={1867} height={544} />
          </Link>
          <nav className="nav-links" aria-label="Main navigation">
            {navItems.map((item) => (
              item.href === '/programs' ? (
                <span className="has-drop" key={item.href}>
                  <Link href="/programs">{item.label} ▾</Link>
                  <div className="drop">
                    {programs.map((p) => (
                      <Link key={p.slug} href={`/programs/${p.slug}`}>
                        <span className="drop-dot" style={{ background: p.color }} />
                        {p.title}
                      </Link>
                    ))}
                  </div>
                </span>
              ) : (
                <Link key={item.href} href={item.href} target={item.newTab ? '_blank' : undefined}>
                  {item.label}
                </Link>
              )
            ))}
          </nav>
          <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link href="/contact#lead-form" className="btn btn-brand btn-sm">
              Get an Admission
            </Link>
            <button
              className="hamb"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`drawer ${drawerOpen ? 'open' : ''}`} id="drawer">
        <div className="drawer-top">
          <Link href="/" className="brand" onClick={() => setDrawerOpen(false)} aria-label="Skillversity — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Skillversity" className="brand-logo" width={1867} height={544} />
          </Link>
          <button
            onClick={() => setDrawerOpen(false)}
            style={{ fontSize: '22px', padding: '8px' }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <nav>
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              onClick={() => setDrawerOpen(false)}
              target={item.newTab ? '_blank' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://apps.apple.com/kz/app/skillversity/id6758941193"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setDrawerOpen(false)}
            style={{ color: 'var(--brand-pink)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <svg viewBox="0 0 384 512" width="16" height="16" fill="currentColor">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-14 69.5-34.3z"/>
            </svg>
            Skillversity App (iOS App Store) →
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.app.skillversity"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setDrawerOpen(false)}
            style={{ color: 'var(--brand-cyan)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <svg viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
              <path d="M325.3 234.3L104.6 13l280.8 161.2-59.8 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.7c15.4-8.9 24.6-24.3 24.6-40.1s-9.2-31.2-25.8-40.1zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
            </svg>
            Skillversity App (Android Google Play) →
          </a>
          <Link
            href="/contact#lead-form"
            onClick={() => setDrawerOpen(false)}
            style={{ color: 'var(--brand-pink)' }}
          >
            Get an Admission →
          </Link>
        </nav>
        <div className="drawer-programs">
          <h5>Our Programs</h5>
          {programs.map((p) => (
            <Link key={p.slug} href={`/programs/${p.slug}`} onClick={() => setDrawerOpen(false)}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: p.color, display: 'inline-block', marginRight: '8px' }} />
              {p.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
