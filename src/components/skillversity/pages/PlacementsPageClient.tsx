'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ScrollReveal } from '../ScrollReveal'
import { MediaPlaceholder } from '../MediaPlaceholder'
import { CampusAlbumUI } from '../CampusAlbumUI'
import { PlacementsScroller } from '../PlacementsScroller'
import { PlacementsBannersCarousel } from '../PlacementsBannersCarousel'
import { AppShowcaseSection } from '../AppShowcaseSection'

type PlacementItem = {
  image?: { url?: string | null; alt?: string | null } | null
  firstName?: string | null
  caption: string
  programSlug?: string
}

type Props = {
  gallery?: PlacementItem[]
}

const defaultPlacementsData: PlacementItem[] = [
  {
    firstName: 'Subash M',
    caption: 'Subash M · Quality Checking, Coimbatore · Oil & Gas',
    programSlug: 'oil-gas',
    image: { url: '/media/subash-m-placed.jpg', alt: 'Subash M - Placed in Quality Checking, Coimbatore' }
  },
  {
    firstName: 'Vishnu',
    caption: 'Vishnu · Logistics & Supply · DHL',
    programSlug: 'logistics-supply-chain',
    image: { url: '/media/vishnu-1.png', alt: 'Vishnu' }
  },
  {
    firstName: 'Vinayan T V',
    caption: 'Vinayan T V · Logistics · Maersk',
    programSlug: 'logistics-supply-chain',
    image: { url: '/media/vinayan-1.png', alt: 'Vinayan T V' }
  },
  {
    firstName: 'Anagha Ratheesh',
    caption: 'Anagha Ratheesh · Oil & Gas · Gulf Inspector',
    programSlug: 'oil-gas',
    image: { url: '/media/anagha-1.png', alt: 'Anagha Ratheesh' }
  },
  {
    firstName: 'Ebin Joy',
    caption: 'Ebin Joy · HR Management · Lulu Group',
    programSlug: 'hr-management',
    image: { url: '/media/ebin-joy-1.png', alt: 'Ebin Joy' }
  },
  {
    firstName: 'Muhammed Sabith P N',
    caption: 'Muhammed Sabith P N · Hospital Admin · Aster Medcity',
    programSlug: 'hospital-administration',
    image: { url: '/media/sabith.png', alt: 'Muhammed Sabith P N' }
  },
  {
    firstName: 'Ann Mary',
    caption: 'Ann Mary · Hospital Admin · Apollo Hospitals',
    programSlug: 'hospital-administration',
    image: { url: '/media/ann-mary.jpg', alt: 'Ann Mary' }
  }
]

const hiringCompanies = [
  { name: 'Amazon', color: '#FF9900', bg: '#232F3E' },
  { name: 'DHL', color: '#D40511', bg: '#FFCC00' },
  { name: 'FedEx', color: '#4D148C', bg: '#FFFFFF' },
  { name: 'Maersk', color: '#00243D', bg: '#00A0E2' },
  { name: 'Flipkart', color: '#2874F0', bg: '#FFE500' },
  { name: 'Apollo Hospitals', color: '#0058A3', bg: '#FFFFFF' },
  { name: 'Aster Medcity', color: '#00838F', bg: '#E0F7FA' },
  { name: 'Blue Dart', color: '#003399', bg: '#FFCC00' },
  { name: 'Delhivery', color: '#E31E24', bg: '#FFFFFF' },
  { name: 'DP World', color: '#002B49', bg: '#00A3E0' },
  { name: 'Reliance Retail', color: '#E21B23', bg: '#FFFFFF' },
  { name: 'Kuehne+Nagel', color: '#003366', bg: '#FFFFFF' }
]

export const PlacementsPageClient: React.FC<Props> = ({ gallery = [] }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const placementsList = gallery.length > 0 ? gallery : defaultPlacementsData

  const filteredPlacements = activeFilter === 'all' 
    ? placementsList 
    : placementsList.filter(item => {
        const caption = item.caption.toLowerCase()
        if (activeFilter === 'hospital' && (caption.includes('hospital') || item.programSlug === 'hospital-administration')) return true
        if (activeFilter === 'logistics' && (caption.includes('logistics') || item.programSlug === 'logistics-supply-chain')) return true
        if (activeFilter === 'oil' && (caption.includes('oil') || item.programSlug === 'oil-gas')) return true
        if (activeFilter === 'hr' && (caption.includes('hr') || item.programSlug === 'hr-management')) return true
        return false
      })

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      {/* MODERN HERO SECTION */}
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, #0A0A1F 0%, #1A3DB8 40%, #0A007A 100%)', color: '#ffffff', overflow: 'hidden', padding: '80px 0 60px' }}>
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="breadcrumb" style={{ color: 'rgba(255,255,255,.6)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,.8)' }}>Home</Link>
            <span>›</span>
            <span>Placements</span>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', marginBottom: '20px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFCB28', boxShadow: '0 0 10px #FFCB28' }} />
            <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFCB28' }}>Structured Placement Cell</span>
          </div>

          <h1 className="h-hero" style={{ color: '#fff', marginTop: '10px', lineHeight: 1.05 }}>
            10,141+ Verified Placements.<br />
            <span style={{ background: 'var(--grad-warm)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              Real Careers Built Since 2014.
            </span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,.85)', marginTop: '20px', fontSize: '18px', maxWidth: '680px', lineHeight: 1.65 }}>
            At Skillversity, placement is a structured, end-to-end commitment. From skill profiling to 5 years of post-placement career guidance across India & the Gulf.
          </p>

          {/* Key Stat Badges Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginTop: '36px', maxWidth: '850px' }}>
            {[
              { num: '10,141+', label: 'Placements Since 2014', color: '#FFCB28' },
              { num: '3,000+', label: 'Corporate Hiring Partners', color: '#00B6E8' },
              { num: '₹18K - 80K', label: 'Monthly Starting Package', color: '#FF1F5C' },
              { num: 'India + GCC', label: 'Global Career Pathways', color: '#FFA61F' },
            ].map((stat, i) => (
              <div 
                key={i} 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.06)', 
                  border: '1px solid rgba(255, 255, 255, 0.12)', 
                  borderRadius: '16px', 
                  padding: '16px 20px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--display)', color: stat.color }}>{stat.num}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', marginTop: '4px', fontWeight: 600 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '36px' }}>
            <Link href="/contact" className="btn btn-brand btn-lg" style={{ minWidth: '240px', justifyContent: 'center' }}>
              Book Free Placement Counselling Call
            </Link>
            <a href="https://www.instagram.com/skillversityjobbank?igsh=enRzenZ2MG96ZjFp" target="_blank" rel="noopener noreferrer" className="btn btn-ghost-white btn-lg" style={{ minWidth: '220px', justifyContent: 'center' }}>
              📸 Instagram Job Bank
            </a>
          </div>
        </div>
      </section>

      {/* MONTHLY PLACEMENT BANNERS CAROUSEL */}
      <section style={{ background: '#fff', padding: '30px 0' }}>
        <div className="wrap" style={{ textAlign: 'center', marginBottom: '16px' }}>
          <span className="eyebrow"><span className="dot" />Monthly Highlights</span>
          <h2 className="h-section" style={{ marginTop: '10px' }}>Recent Placement <span className="squiggle">Drives & Shortlists</span></h2>
        </div>
        <PlacementsBannersCarousel />
      </section>

      {/* FILTERABLE PLACEMENT GALLERY */}
      <section className="section" style={{ background: 'var(--cream)', padding: '64px 0' }}>
        <div className="wrap">
          <ScrollReveal className="section-head">
            <span className="eyebrow"><span className="dot" />Alumni Network</span>
            <h2 className="h-section" style={{ marginTop: '14px' }}>Meet Our <span className="squiggle">Placed Students.</span></h2>
            <p className="lead" style={{ marginTop: '12px' }}>Explore where our graduates are working in Hospital Admin, Logistics, Oil & Gas, and HR.</p>
          </ScrollReveal>

          {/* Interactive Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '36px' }}>
            {[
              { id: 'all', label: 'All Programs' },
              { id: 'hospital', label: '🏥 Hospital Administration' },
              { id: 'logistics', label: '📦 Logistics & Supply Chain' },
              { id: 'oil', label: '🛢 Oil & Gas' },
              { id: 'hr', label: '👥 HR Management' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  fontWeight: 700,
                  border: '1.5px solid var(--ink)',
                  background: activeFilter === tab.id ? 'var(--ink)' : '#ffffff',
                  color: activeFilter === tab.id ? '#ffffff' : 'var(--ink)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeFilter === tab.id ? '0 6px 16px rgba(0,0,0,0.15)' : 'none',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Placements Scroller */}
          <PlacementsScroller placements={filteredPlacements} />
        </div>
      </section>

      {/* CAMPUS EXPERIENCE WITH IMAGES ALBUM */}
      <CampusAlbumUI />

      {/* TOP HIRING PARTNERS BRAND SHOWCASE */}
      <section className="section" style={{ background: '#ffffff' }}>
        <div className="wrap">
          <ScrollReveal className="section-head">
            <span className="eyebrow"><span className="dot" />Corporate Network</span>
            <h2 className="h-section" style={{ marginTop: '14px' }}>3,000+ Employers <span className="squiggle">Hiring Skillversity Alumni</span></h2>
            <p className="lead" style={{ marginTop: '12px' }}>Our graduates work with leading multinationals, healthcare groups, shipping lines, and MNCs.</p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginTop: '36px' }}>
            {hiringCompanies.map((c, i) => (
              <ScrollReveal key={i}>
                <div 
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid var(--line)',
                    borderRadius: '16px',
                    padding: '20px 16px',
                    textAlign: 'center',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                    transition: 'transform 0.2s ease, border-color 0.2s ease',
                  }}
                  className="company-brand-card"
                >
                  <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '17px', color: 'var(--ink)' }}>{c.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--brand-pink)', fontWeight: 700, marginTop: '4px' }}>Active Hiring Partner ✓</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* STRUCTURED 4-STEP PLACEMENT PROCESS */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <ScrollReveal className="section-head">
            <span className="eyebrow"><span className="dot" />The Skillversity Advantage</span>
            <h2 className="h-section" style={{ marginTop: '14px' }}>How We Guarantee <span className="squiggle">Job Readiness.</span></h2>
          </ScrollReveal>

          <div className="g4" style={{ gap: '20px', marginTop: '36px' }}>
            {[
              { num: '01', bg: 'var(--brand-cyan)', title: 'Skillfolio Digital ID', desc: 'Create a verified digital profile showcasing real project experience to global recruiters.' },
              { num: '02', bg: 'var(--brand-blue)', title: 'Mock Interview Prep', desc: 'Undergo 5+ rounds of rigorous mock technical & HR interviews with active industry mentors.' },
              { num: '03', bg: 'var(--brand-orange)', title: 'Direct Campus Drives', desc: 'Get matched with 3,000+ corporate hiring partners across India and GCC markets.' },
              { num: '04', bg: 'var(--brand-pink)', title: '5-Year Career Mentorship', desc: 'Post-placement career guidance for promotions, lateral transitions, and Gulf relocations.' },
            ].map((s, i) => (
              <ScrollReveal key={i}>
                <div 
                  style={{ 
                    background: '#ffffff', 
                    borderRadius: '20px', 
                    padding: '28px 20px', 
                    border: '1.5px solid var(--line)', 
                    boxShadow: '0 10px 25px -10px rgba(0,0,0,0.06)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: s.bg, color: '#fff', fontWeight: 800, fontSize: '16px', display: 'grid', placeItems: 'center', marginBottom: '16px' }}>
                    {s.num}
                  </div>
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px' }}>{s.title}</h4>
                  <p style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.5, flex: 1 }}>{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM JOB BANK CALLOUT */}
      <section style={{ background: 'linear-gradient(135deg, #FF1F5C 0%, #FF7A1A 100%)', padding: '54px var(--gutter)', color: '#ffffff' }}>
        <div className="wrap" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', background: 'rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '999px' }}>
            Daily Placement Updates
          </span>
          <h2 style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 42px)', marginTop: '16px', color: '#ffffff', lineHeight: 1.1 }}>
            Follow Our Official Job Bank Channel on Instagram 📸
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginTop: '14px', lineHeight: 1.6 }}>
            Stay updated with real-time campus selection lists, student testimonial videos, and new job openings.
          </p>
          <div style={{ marginTop: '28px' }}>
            <a
              href="https://www.instagram.com/skillversityjobbank?igsh=enRzenZ2MG96ZjFp"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                background: '#ffffff',
                color: '#FF1F5C',
                padding: '14px 32px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 800,
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Visit @skillversityjobbank →
            </a>
          </div>
        </div>
      </section>

      {/* MOBILE APP SHOWCASE */}
      <AppShowcaseSection />
    </div>
  )
}
