import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { ScrollReveal } from '@/components/skillversity/ScrollReveal'
import { CTASection } from '@/components/skillversity/CTASection'
import { MentorsGalleryUI } from '@/components/skillversity/MentorsGalleryUI'
import { defaultMentors, defaultAllMentors } from '@/skillversity/defaultContent'
import { MentorsDirectory } from '@/components/skillversity/MentorsDirectory'

export const metadata: Metadata = {
  title: '43+ Industry Mentors | Skillversity Global',
  description: 'Meet our 43+ industry mentors with 30+ years of experience across healthcare, logistics, oil & gas, and HR. They guide, train, and mentor students into job-ready professionals.',
}

async function getMentorsGallery() {
  try {
    const payload = await getPayload({ config: configPromise })
    const settings: any = await payload.findGlobal({ slug: 'site-settings', depth: 2 })
    return (settings?.mentorsGallery as Array<{ image?: { url?: string; alt?: string } | null; firstName?: string; fullName: string; credential?: string }>) || []
  } catch {
    return []
  }
}

export default async function MentorsPage() {
  let gallery = await getMentorsGallery()
  if (!gallery || gallery.length === 0) {
    gallery = defaultMentors
  }

  const marqueeMentors = defaultAllMentors.filter((m) =>
    ['Abdul Kareem', 'Jomon Thomas', 'Roopak Ratnaraj', 'Christopher Raju', 'Catherine Tom Thomas K', 'Riby Elizabeth Thomas', 'D Antony Gerald', 'Veena Ajit Nayar', 'Mareena Antony', 'Athira Nair T K', 'Mumthas Mubash', 'Risaldher Ali'].includes(m.name)
  ).map((m) => ({
    init: m.name.split(/\s+/).slice(0, 2).map((n) => n[0]).join('').toUpperCase(),
    name: m.name,
    role: m.subtitle,
    exp: m.dept === 'LOG' ? 'Logistics' : m.dept === 'TECH' ? 'Oil & Gas' : m.dept === 'HA' ? 'Hospital Admin' : m.dept === 'HR' ? 'HR Management' : m.dept === 'I-CEP' ? 'Language Coach' : 'Student Affairs',
    color: m.color,
    domain: m.label,
    image: m.name === 'Jomon Thomas' ? '/media/mentor-jomon.jpg' : null
  }))

  return (
    <>
      <section className="page-hero cool">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="breadcrumb" style={{ color: 'rgba(255,255,255,.6)' }}><Link href="/" style={{ color: 'rgba(255,255,255,.8)' }}>Home</Link><span>›</span><span>Mentors</span></div>
          <span className="eyebrow" style={{ background: 'rgba(255,255,255,.12)', borderColor: 'rgba(255,255,255,.3)', color: '#fff' }}><span className="dot" />Industry Mentors</span>
          <h1 className="h-hero" style={{ color: '#fff', marginTop: '18px' }}>43+ Mentors.<br /><span style={{ color: 'var(--brand-yellow)' }}>30+ years each.</span></h1>
          <p style={{ color: 'rgba(255,255,255,.82)', marginTop: '18px', fontSize: '17px', maxWidth: '600px', lineHeight: 1.65 }}>Our mentors are not academics — they are active industry leaders who bring decades of real-world experience into the classroom.</p>
        </div>
      </section>

      <MentorsGalleryUI
        eyebrow="Industry Mentors"
        title="Learn from people who hire."
        description="43 mentors with 30+ years across hospitals, ports, refineries and corporate HR — actively working in the industries you're training for."
        ctaLabel="Meet All 43 Mentors →"
        ctaUrl="/contact"
        background="cream"
        mentors={gallery}
      />

      <section className="section" style={{ background: '#fff' }}>
        <div className="wrap">
          <ScrollReveal className="section-head">
            <span className="eyebrow"><span className="dot" />Mentor Network</span>
            <h2 className="h-section" style={{ marginTop: '14px' }}>Learn from the best <span className="squiggle">in the industry.</span></h2>
          </ScrollReveal>
          <div className="mentors-marquee-wrap">
            <div className="mentors-track">
              {marqueeMentors.concat(marqueeMentors).concat(marqueeMentors).map((m, i) => (
                <div className="mentor-network-card" key={i}>
                  <div className="mentor-network-avatar" style={m.image ? { position: 'relative', overflow: 'hidden' } : { background: m.color }}>
                    {m.image ? (
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        sizes="60px"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      m.init
                    )}
                  </div>
                  <div className="mentor-network-info">
                    <h3>{m.name}</h3>
                    <p>{m.role}</p>
                    <div className="mentor-network-pills">
                      <span className="role-pill">{m.exp} experience</span>
                      <span className="role-pill" style={{ background: '#FFE4ED' }}>{m.domain}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ScrollReveal className="section-head" style={{ marginTop: '80px', marginBottom: '20px' }}>
            <span className="eyebrow"><span className="dot" />Faculty & Mentors Directory</span>
            <h2 className="h-section" style={{ marginTop: '14px' }}>Meet our 43+ <span className="squiggle">industry mentors.</span></h2>
            <p className="lead" style={{ marginTop: '18px' }}>Browse the complete directory of our subject-matter experts, categorized by domain.</p>
          </ScrollReveal>

          <MentorsDirectory />
        </div>
      </section>
      <CTASection />
    </>
  )
}
