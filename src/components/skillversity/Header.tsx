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
          <div className="nav-right">
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
