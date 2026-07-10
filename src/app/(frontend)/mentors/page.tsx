import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { ScrollReveal } from '@/components/skillversity/ScrollReveal'
import { CTASection } from '@/components/skillversity/CTASection'
import { MentorsGalleryUI } from '@/components/skillversity/MentorsGalleryUI'
import { defaultMentors } from '@/skillversity/defaultContent'

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

  const networkMentors = [
    { init: 'RK', name: 'Rajesh Kumar', role: 'Ex-COO, Apollo Hospitals', exp: '35 yrs', color: 'var(--brand-cyan)', domain: 'Hospital Administration', image: '/media/mentor-rajesh.png' },
    { init: 'SM', name: 'Suresh Menon', role: 'VP Supply Chain, Maersk', exp: '28 yrs', color: 'var(--brand-blue)', domain: 'Logistics & Supply Chain', image: '/media/mentor-suresh.png' },
    { init: 'AJ', name: 'Anil Joseph', role: 'HSE Director, ADNOC', exp: '32 yrs', color: 'var(--brand-red)', domain: 'Oil & Gas', image: '/media/mentor-anil.png' },
    { init: 'PK', name: 'Priya Krishnan', role: 'CHRO, Infosys BPM', exp: '25 yrs', color: 'var(--brand-magenta)', domain: 'HR Management', image: '/media/mentor-priya.png' },
    { init: 'VT', name: 'Vijay Thomas', role: 'Director Operations, KIMS', exp: '30 yrs', color: 'var(--brand-orange)', domain: 'Hospital Administration', image: '/media/mentor-vijay.png' },
    { init: 'NS', name: 'Neethu Suresh', role: 'Logistics Head, Amazon India', exp: '22 yrs', color: 'var(--brand-indigo)', domain: 'Logistics & Supply Chain', image: '/media/mentor-neethu.png' },
  ]

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
              {networkMentors.concat(networkMentors).concat(networkMentors).map((m, i) => (
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
          <p style={{ textAlign: 'center', marginTop: '32px', color: 'var(--ink-soft)', fontSize: '15px' }}>And <strong>37 more</strong> industry mentors across all four programs.</p>
        </div>
      </section>
      <CTASection />
    </>
  )
}
