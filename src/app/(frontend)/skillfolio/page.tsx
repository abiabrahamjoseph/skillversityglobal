import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ScrollReveal } from '@/components/skillversity/ScrollReveal'
import { CTASection } from '@/components/skillversity/CTASection'

export const metadata: Metadata = {
  title: 'Skillfolio | Your Digital Employability Profile | Skillversity Global',
  description: 'Every Skillversity graduate receives a Skillfolio — a verifiable digital profile showcasing skills, projects, certifications, and mentor endorsements. Better than a CV.',
}

export default function SkillfolioPage() {
  return (
    <>
      <section className="page-hero mid">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="breadcrumb" style={{ color: 'rgba(255,255,255,.6)' }}><Link href="/" style={{ color: 'rgba(255,255,255,.8)' }}>Home</Link><span>›</span><span>Skillfolio</span></div>
          <span className="eyebrow" style={{ background: 'rgba(255,255,255,.12)', borderColor: 'rgba(255,255,255,.3)', color: '#fff' }}><span className="dot" />Digital Employability</span>
          <h1 className="h-hero" style={{ color: '#fff', marginTop: '18px' }}>Your Skillfolio.<br /><span style={{ color: 'var(--brand-yellow)' }}>Beyond the CV.</span></h1>
          <p style={{ color: 'rgba(255,255,255,.82)', marginTop: '18px', fontSize: '17px', maxWidth: '600px', lineHeight: 1.65 }}>A modern digital profile that proves your readiness to employers — skills, certifications, projects, and mentor endorsements, all in one verifiable link.</p>
        </div>
      </section>

      <section className="section" style={{ background: '#fff' }}>
        <div className="wrap">
          <ScrollReveal className="section-head">
            <span className="eyebrow"><span className="dot" />What&apos;s Inside</span>
            <h2 className="h-section" style={{ marginTop: '14px' }}>Everything employers <span className="squiggle">need to see.</span></h2>
          </ScrollReveal>
          <div className="g3">
            {[
              { icon: '✅', title: 'Verified Skills Matrix', desc: 'Every skill scored and verified by industry mentors — not self-reported.' },
              { icon: '📁', title: 'Project Portfolio', desc: 'Real project work completed during your program, showcased with outcomes.' },
              { icon: '🎓', title: 'Certifications', desc: 'Qualifi UK, CILT, and program-specific certifications — all verifiable.' },
              { icon: '🤝', title: 'Mentor Endorsements', desc: 'Personal endorsements from your 43 industry mentors — like LinkedIn, but verified.' },
              { icon: '📊', title: 'Attendance & Engagement', desc: 'Proof of commitment — attendance records, participation, and campus engagement scores.' },
              { icon: '🔗', title: 'Shareable Link', desc: 'One clean URL you can share with any employer, anywhere in the world.' },
            ].map((item, i) => (
              <ScrollReveal key={i}>
                <div className="card-inked">
                  <div style={{ fontSize: '28px', marginBottom: '10px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '17px', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.65 }}>{item.desc}</p>
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
