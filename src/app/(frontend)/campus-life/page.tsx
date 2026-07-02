import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ScrollReveal } from '@/components/skillversity/ScrollReveal'
import { CTASection } from '@/components/skillversity/CTASection'

export const metadata: Metadata = {
  title: 'Campus Life | Skillversity Global | Kochi, Kerala',
  description: "Experience campus life at Skillversity Global — India's First Job-Ready Campus in Kochi. Modern facilities, industry visits, personality development, sports, and cultural activities.",
}

export default function CampusLifePage() {
  return (
    <>
      <section className="page-hero mid">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="breadcrumb" style={{ color: 'rgba(255,255,255,.6)' }}><Link href="/" style={{ color: 'rgba(255,255,255,.8)' }}>Home</Link><span>›</span><span>Campus Life</span></div>
          <span className="eyebrow" style={{ background: 'rgba(255,255,255,.12)', borderColor: 'rgba(255,255,255,.3)', color: '#fff' }}><span className="dot" />Life at Skillversity</span>
          <h1 className="h-hero" style={{ color: '#fff', marginTop: '18px' }}>More than a campus.<br /><span style={{ color: 'var(--brand-yellow)' }}>A launchpad.</span></h1>
          <p style={{ color: 'rgba(255,255,255,.82)', marginTop: '18px', fontSize: '17px', maxWidth: '600px', lineHeight: 1.65 }}>Industry visits, personality workshops, sports, cultural events, and a vibrant student community — all designed to build confident professionals.</p>
        </div>
      </section>

      <section className="section" style={{ background: '#fff' }}>
        <div className="wrap">
          <ScrollReveal className="section-head">
            <span className="eyebrow"><span className="dot" />Campus Experience</span>
            <h2 className="h-section" style={{ marginTop: '14px' }}>A day in the life of a <span className="squiggle">Skillversity student.</span></h2>
          </ScrollReveal>
          <div className="g3">
            {[
              { icon: '🏫', title: 'Modern Campus', desc: 'Air-conditioned classrooms, computer labs, simulation rooms, and collaborative study spaces in the heart of Kochi.' },
              { icon: '🏭', title: 'Industrial Visits', desc: 'Regular visits to hospitals, warehouses, ports, oil refineries, and corporate offices for first-hand industry exposure.' },
              { icon: '🎤', title: 'Personality Development', desc: 'Weekly communication workshops, public speaking sessions, group discussions, and leadership training.' },
              { icon: '🏆', title: 'Sports & Cultural Events', desc: 'Inter-batch tournaments, cultural fests, talent shows, and team-building activities throughout the year.' },
              { icon: '🧠', title: 'Industry Seminars', desc: 'Guest lectures by CEOs, HR heads, and industry veterans who share real career insights.' },
              { icon: '📱', title: 'Digital Learning', desc: 'Access to digital resources, online modules, recorded sessions, and a dedicated student portal.' },
            ].map((item, i) => (
              <ScrollReveal key={i}>
                <div className="card-inked">
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  )
}
