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

      {/* STUDENT TILES WALLPAPER SECTION */}
      <section style={{ position: 'relative', width: '100%', height: '450px', overflow: 'hidden', background: '#0D2C54', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', width: '150%', height: '150%', display: 'flex', flexDirection: 'column', gap: '12px', transform: 'rotate(-6deg) scale(1.1)', opacity: 0.35, left: '-25%', top: '-25%' }}>
          {[0, 1, 2, 3, 4, 5, 6].map((rowIdx) => (
            <div key={rowIdx} style={{ display: 'flex', gap: '12px', width: '200%', animation: `marquee-${rowIdx % 2 === 0 ? 'left' : 'right'} ${50 + rowIdx * 5}s linear infinite` }}>
              {Array.from({ length: 40 }).map((_, colIdx) => {
                const bgImages = [
                  '/media/insta-1.jpg',
                  '/media/insta-2.jpg',
                  '/media/insta-3.jpg',
                  '/media/insta-4.jpg',
                  '/media/insta-5.jpg',
                  '/media/insta-6.jpg'
                ];
                const imgSrc = bgImages[(rowIdx * 13 + colIdx) % bgImages.length];
                
                return (
                  <img 
                    key={colIdx} 
                    src={imgSrc} 
                    alt="Placement Post"
                    style={{ width: '120px', height: '120px', borderRadius: '16px', objectFit: 'cover', flexShrink: 0, filter: 'grayscale(15%)' }} 
                  />
                );
              })}
            </div>
          ))}
        </div>
        
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', background: 'rgba(255, 255, 255, 0.95)', padding: '48px 64px', borderRadius: '24px', boxShadow: '0 24px 50px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,1)', backdropFilter: 'blur(16px)', maxWidth: '900px' }}>
          <h2 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 900, color: '#0D2C54', margin: 0, lineHeight: 1.1, letterSpacing: '-2px' }}>
            10141+ <br/><span style={{ color: '#FF2E1F', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Placements from 2014.</span>
          </h2>
          
          <p style={{ fontSize: '1.25rem', color: '#555', fontWeight: 500, lineHeight: 1.6, maxWidth: '750px', margin: '24px auto 0' }}>
            Hospital Administration, Logistics, Oil & Gas, and HR Management roles placed across leading employers in India and GCC.
          </p>

          <div style={{ marginTop: '36px', display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', color: '#444' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: 700, background: '#f8fafc', padding: '12px 24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF2E1F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              617+ Company Connections
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: 700, background: '#f8fafc', padding: '12px 24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF2E1F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Dedicated Placement Team
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: 700, background: '#f8fafc', padding: '12px 24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF2E1F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              5-Year Career Mentorship
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: 700, background: '#f8fafc', padding: '12px 24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF2E1F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              India + GCC Pathways
            </div>
          </div>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}} />
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
