import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { CTASection } from '@/components/skillversity/CTASection'
import { MediaPlaceholder } from '@/components/skillversity/MediaPlaceholder'
import { ScrollReveal } from '@/components/skillversity/ScrollReveal'
import { defaultPrograms } from '@/skillversity/defaultContent'

export const metadata: Metadata = {
  title: 'All Programs | Skillversity Global',
  description: 'Compare all four industry-led programs at Skillversity Global — Hospital Administration, Logistics & Supply Chain, Oil & Gas, HR Management.',
}

async function getPrograms() {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'programs',
      draft: false,
      limit: 50,
      sort: 'sortOrder',
      where: {
        status: {
          not_equals: 'inactive',
        },
      },
    })

    return result.docs.length ? result.docs : defaultPrograms
  } catch {
    return defaultPrograms
  }
}

export default async function ProgramsPage() {
  const programs = await getPrograms()

  return (
    <>
      <section className="page-hero cool">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="breadcrumb" style={{ color: 'rgba(255,255,255,.6)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,.8)' }}>Home</Link>
            <span>›</span>
            <span>Programs</span>
          </div>
          <span className="eyebrow" style={{ background: 'rgba(255,255,255,.12)', borderColor: 'rgba(255,255,255,.3)', color: '#fff' }}>
            <span className="dot" />
            Career Programs
          </span>
          <h1 className="h-hero" style={{ color: '#fff', marginTop: '18px' }}>
            Four industry-led programs.
            <br />
            <span style={{ color: 'var(--brand-yellow)' }}>One job-ready campus.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.82)', marginTop: '18px', fontSize: '17px', maxWidth: '600px', lineHeight: 1.65 }}>
            Compare all programs side-by-side. Each one is built around real workplace skills, expert mentors, and structured placement support.
          </p>
        </div>
      </section>

      <section className="section grid-paper">
        <div className="wrap">
          <div className="g2" style={{ gap: '28px' }}>
            {programs.map((program: any, index) => {
              const careerRoles: Array<{ role: string }> = Array.isArray(program.careerRoles) ? program.careerRoles : []
              return (
                <ScrollReveal key={program.slug || index}>
                  <Link href={`/programs/${program.slug}`} className="prog-card">
                    <div className="prog-card-media" style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', background: program.cardGradient }}>
                      <MediaPlaceholder media={program.cardImage} label={`${program.title} photo`} />
                      <span className="prog-card-tag" style={{ background: program.tagColor, position: 'absolute', top: '14px', left: '14px', zIndex: 2 }}>{program.tag}</span>
                    </div>
                    <div className="prog-card-head" style={{ background: 'transparent', paddingTop: '18px' }}>
                      <h3 style={{ fontSize: '22px' }}>{program.title}</h3>
                      <p>{program.shortDescription}</p>
                    </div>
                    <div className="prog-card-body">
                      <div className="meta">
                        <div><b>Duration</b>{program.duration}</div>
                        <div><b>Eligibility</b>{program.eligibility}</div>
                        {program.salaryRange && <div><b>Salary Range</b>{program.salaryRange}</div>}
                      </div>
                      {careerRoles.length > 0 && (
                        <div className="roles-wrap" style={{ marginTop: '8px' }}>
                          {careerRoles.slice(0, 5).map((r, j) => <span className="role-pill" key={j}>{r.role}</span>)}
                        </div>
                      )}
                      <div style={{ color: program.accentColor || 'var(--brand-blue)', fontWeight: 800, fontSize: '14px', marginTop: '14px' }}>View full program details →</div>
                    </div>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
