import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { ScrollReveal } from '@/components/skillversity/ScrollReveal'
import { CTASection } from '@/components/skillversity/CTASection'
import { PlacementsGalleryUI } from '@/components/skillversity/PlacementsGalleryUI'
import { PlacementsBannersCarousel } from '@/components/skillversity/PlacementsBannersCarousel'

export const metadata: Metadata = {
  title: 'Placements | 10141+ Students Placed from 2014 | Skillversity Global',
  description: '10141+ placements from 2014. View our placement record across Hospital Admin, Logistics, Oil & Gas, HR Management. Companies: Amazon, Flipkart, DHL, Apollo Hospitals.',
}

async function getPlacementsGallery() {
  try {
    const payload = await getPayload({ config: configPromise })
    const settings: any = await payload.findGlobal({ slug: 'site-settings', depth: 2 })
    return (settings?.placementsGallery as Array<{ image?: { url?: string; alt?: string } | null; firstName?: string; caption: string }>) || []
  } catch {
    return []
  }
}

export default async function PlacementsPage() {
  const gallery = await getPlacementsGallery()

  return (
    <>
      <section className="page-hero warm">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="breadcrumb" style={{ color: 'rgba(255,255,255,.6)' }}><Link href="/" style={{ color: 'rgba(255,255,255,.8)' }}>Home</Link><span>›</span><span>Placements</span></div>
          <span className="eyebrow" style={{ background: 'rgba(255,255,255,.12)', borderColor: 'rgba(255,255,255,.3)', color: '#fff' }}><span className="dot" />Placement Commitment</span>
          <h1 className="h-hero" style={{ color: '#fff', marginTop: '18px' }}>10141+ Placements from 2014.<br /><span style={{ color: 'var(--brand-yellow)' }}>A structured commitment.</span></h1>
          <p style={{ color: 'rgba(255,255,255,.82)', marginTop: '18px', fontSize: '17px', maxWidth: '600px', lineHeight: 1.65 }}>At Skillversity, placement is not a promise — it is a structured, end-to-end commitment backed by a dedicated placement cell and 3000+ hiring partners.</p>
        </div>
      </section>

      <PlacementsBannersCarousel />

      <PlacementsGalleryUI
        bigNumber="10141+"
        heading="Placements from 2014."
        description="Hospital Administration, Logistics, Oil & Gas, and HR Management roles placed across leading employers in India and GCC — as featured in regional press."
        pills={['3000+ Company Connections', 'Dedicated Placement Team', '5-Year Career Mentorship', 'India + GCC Pathways']}
        primaryCtaLabel="View Full Placement Record →"
        primaryCtaUrl="/contact"
        secondaryCtaLabel="📥 Download Report"
        secondaryCtaUrl="/contact?action=brochure"
        background="white"
        placements={gallery}
        statCardNum="+10100"
        statCardLabel="more alumni working across India & GCC"
      />

      {/* Instagram Page Callout */}
      <section style={{ background: '#ffffff', padding: '40px var(--gutter)', borderTop: '1px solid rgba(0,0,0,0.08)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '24px', margin: '0 0 10px', color: 'var(--ink)' }}>
            Follow Our Placements on Instagram 📸
          </h3>
          <p style={{ color: 'var(--ink-soft)', fontSize: '15px', maxWidth: '600px', margin: '0 auto 20px', lineHeight: 1.6 }}>
            Stay updated with daily placement alerts, student success stories, and new company hiring drives on our active job bank channel.
          </p>
          <a
            href="https://www.instagram.com/skillversityjobbank?igsh=enRzenZ2MG96ZjFp"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{
              background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              borderColor: 'transparent',
              color: '#ffffff',
              boxShadow: '4px 4px 0 var(--ink)',
              padding: '12px 28px',
              fontSize: '15px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Visit Instagram Job Bank →
          </a>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <ScrollReveal className="section-head">
            <span className="eyebrow"><span className="dot" />Placement Process</span>
            <h2 className="h-section" style={{ marginTop: '14px' }}>How We Place <span className="squiggle">Every Student.</span></h2>
          </ScrollReveal>
          <div className="g4">
            {[
              { num: '01', bg: 'var(--brand-cyan)', title: 'Industry-Aligned Training', desc: 'Every module is mapped to real employer requirements from top hiring companies.' },
              { num: '02', bg: 'var(--brand-blue)', title: 'Mock Interviews & Prep', desc: '5+ rounds of structured mock interviews, resume building, and confidence training.' },
              { num: '03', bg: 'var(--brand-orange)', title: 'Company Matching', desc: 'Our placement cell matches your skills, location, and salary expectations with 3000+ partners.' },
              { num: '04', bg: 'var(--brand-pink)', title: '5-Year Mentorship', desc: 'Post-placement career mentoring for promotions, transitions, and growth — for 5 full years.' },
            ].map((s, i) => (
              <ScrollReveal key={i}>
                <div className="step-card" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div className="step-num" style={{ background: s.bg, margin: '0 auto 12px' }}>{s.num}</div>
                  <h4 style={{ fontSize: '17px', marginBottom: '6px' }}>{s.title}</h4>
                  <p style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#fff' }}>
        <div className="wrap">
          <ScrollReveal className="section-head">
            <span className="eyebrow"><span className="dot" />Top Hiring Partners</span>
            <h2 className="h-section" style={{ marginTop: '14px' }}>3000+ Companies <span className="squiggle">Trust Us.</span></h2>
          </ScrollReveal>
          <div className="g4" style={{ gap: '12px' }}>
            {['Amazon', 'Flipkart', 'DHL', 'FedEx', 'Maersk', 'Apollo Hospitals', 'Aster Medcity', 'KIMS', 'Blue Dart', 'Delhivery', 'CMA CGM', 'DP World', 'Reliance Retail', 'JFS Logistics', 'Kuehne+Nagel', 'UPS'].map((c, i) => (
              <div key={i} className="stat-box" style={{ textAlign: 'center', padding: '18px 12px' }}>
                <span style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '16px' }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
