'use client'

import React from 'react'
import Link from 'next/link'
import { ScrollReveal } from './ScrollReveal'
import { CTASection } from './CTASection'

export type SubCourseDetail = {
  id: string
  slug: string
  title: string
  icon?: string
  tag?: string
  duration?: string
  eligibility?: string
  salary?: string
  shortDesc?: string
  highlights?: string[]
  careerRoles?: string[]
}

export type ParentProgramInfo = {
  title: string
  slug: string
  accentColor?: string
}

export const SubCoursePageClient: React.FC<{
  subCourse: SubCourseDetail
  parentProgram: ParentProgramInfo
}> = ({ subCourse, parentProgram }) => {
  const primaryColor = parentProgram.accentColor || '#00B6E8'

  return (
    <>
      {/* HERO SECTION */}
      <section className="page-hero" style={{ background: 'linear-gradient(160deg,#E0F7FD 0%,#FFF4F8 100%)', borderBottom: 'none' }}>
        <div className="wrap">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/programs">Programs</Link>
            <span>›</span>
            <Link href={`/programs/${parentProgram.slug}`}>{parentProgram.title}</Link>
            <span>›</span>
            <span>{subCourse.title}</span>
          </div>

          <div style={{ maxWidth: '840px', marginTop: '14px' }}>
            <span className="eyebrow" style={{ borderColor: primaryColor, color: primaryColor }}>
              <span className="dot" />
              {subCourse.tag || 'Specialized Course Track'}
            </span>

            <h1 className="h-hero" style={{ marginTop: '16px', lineHeight: 1.15 }}>
              {subCourse.icon && <span style={{ marginRight: '12px' }}>{subCourse.icon}</span>}
              {subCourse.title}
            </h1>

            <p className="lead" style={{ marginTop: '18px', fontSize: '17px', lineHeight: 1.6, color: 'var(--ink-soft)' }}>
              {subCourse.shortDesc}
            </p>

            {/* KEY METRA STATS */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                marginTop: '28px',
                background: '#ffffff',
                border: '2px solid var(--ink)',
                borderRadius: '16px',
                padding: '18px 24px',
                boxShadow: '4px 4px 0 var(--ink)',
              }}
            >
              {subCourse.duration && (
                <div style={{ flex: '1 1 140px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink-mute)', letterSpacing: '0.08em' }}>Duration</div>
                  <div style={{ fontWeight: 800, fontSize: '16px', color: 'var(--ink)' }}>⏱️ {subCourse.duration}</div>
                </div>
              )}
              {subCourse.eligibility && (
                <div style={{ flex: '1 1 140px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink-mute)', letterSpacing: '0.08em' }}>Eligibility</div>
                  <div style={{ fontWeight: 800, fontSize: '16px', color: 'var(--ink)' }}>🎓 {subCourse.eligibility}</div>
                </div>
              )}
              {subCourse.salary && (
                <div style={{ flex: '1 1 140px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink-mute)', letterSpacing: '0.08em' }}>Starting Salary</div>
                  <div style={{ fontWeight: 800, fontSize: '16px', color: 'var(--brand-pink)' }}>💼 {subCourse.salary}</div>
                </div>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '28px' }}>
              <Link href="/contact#lead-form" className="btn btn-brand btn-lg">
                Apply For This Course →
              </Link>
              <Link href={`/programs/${parentProgram.slug}`} className="btn btn-secondary btn-lg">
                View Full {parentProgram.title} Program
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CORE HIGHLIGHTS SECTION */}
      {subCourse.highlights?.length ? (
        <section className="section" style={{ background: '#ffffff', padding: '72px 0' }}>
          <div className="wrap">
            <ScrollReveal className="section-head" style={{ marginBottom: '36px' }}>
              <span className="eyebrow" style={{ borderColor: primaryColor, color: primaryColor }}>
                <span className="dot" />
                Curriculum Focus
              </span>
              <h2 className="h-section" style={{ marginTop: '14px' }}>
                Key Skills & Training Modules
              </h2>
            </ScrollReveal>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {subCourse.highlights.map((item, index) => (
                <ScrollReveal key={index}>
                  <div
                    style={{
                      background: 'var(--cream)',
                      border: '2px solid var(--ink)',
                      borderRadius: '16px',
                      padding: '22px 20px',
                      boxShadow: '4px 4px 0 var(--ink)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                    }}
                  >
                    <span style={{ fontSize: '24px', background: '#ffffff', border: '1.5px solid var(--ink)', borderRadius: '10px', padding: '6px 10px', display: 'inline-flex' }}>
                      ✓
                    </span>
                    <div>
                      <h3 style={{ fontSize: '16.5px', fontWeight: 800, color: 'var(--ink)', marginBottom: '4px' }}>{item}</h3>
                      <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', margin: 0 }}>Practical hands-on training with industry case studies & real software practice.</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CAREER ROLES & PLACEMENTS */}
      {subCourse.careerRoles?.length ? (
        <section className="section" style={{ background: 'var(--cream)', padding: '72px 0' }}>
          <div className="wrap">
            <ScrollReveal className="section-head" style={{ marginBottom: '36px' }}>
              <span className="eyebrow" style={{ borderColor: primaryColor, color: primaryColor }}>
                <span className="dot" />
                Career Opportunities
              </span>
              <h2 className="h-section" style={{ marginTop: '14px' }}>
                Job Roles You Can Apply For
              </h2>
            </ScrollReveal>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {subCourse.careerRoles.map((role, idx) => (
                <span
                  key={idx}
                  style={{
                    background: '#ffffff',
                    border: '2px solid var(--ink)',
                    borderRadius: '999px',
                    padding: '10px 20px',
                    fontSize: '15px',
                    fontWeight: 800,
                    color: 'var(--ink)',
                    boxShadow: '3px 3px 0 var(--ink)',
                  }}
                >
                  💼 {role}
                </span>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection />
    </>
  )
}
