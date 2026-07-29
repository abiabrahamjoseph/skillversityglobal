import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ScrollReveal } from '@/components/skillversity/ScrollReveal'
import { CTASection } from '@/components/skillversity/CTASection'
import { CampusAlbumUI } from '@/components/skillversity/CampusAlbumUI'

export const metadata: Metadata = {
  title: 'Campus Life | Skillversity Global | Kochi, Kerala',
  description: "Experience campus life at Skillversity Global — India's First Job-Ready Campus in Kochi. Modern facilities, industry visits, personality development, sports, and cultural activities.",
}

export default function CampusLifePage() {
  const campusExperiences = [
    { 
      icon: '🏫', 
      title: 'Modern Campus & Smart Labs', 
      desc: 'Air-conditioned classrooms, computer labs, NABH healthcare simulation rooms, and collaborative study spaces in Kaloor, Kochi.',
      image: '/media/classroom-students-lecture.jpg'
    },
    { 
      icon: '🏭', 
      title: 'Industrial Visits & Port Tours', 
      desc: 'Regular visits to hospitals, ports, logistics warehouses, oil refineries, and corporate offices for hands-on exposure.',
      image: '/media/logistics-clean.jpg'
    },
    { 
      icon: '🎤', 
      title: 'Personality & Leadership Workshops', 
      desc: 'Weekly communication sessions, public speaking workshops, mock interview drills, and corporate etiquette training.',
      image: '/media/mentor-session-clean.jpg'
    },
    { 
      icon: '🏆', 
      title: 'Sports, Fests & Cultural Events', 
      desc: 'Inter-batch tournaments, cultural fests, talent showcases, and collaborative team activities throughout the academic year.',
      image: '/media/insta-1.jpg'
    },
    { 
      icon: '🧠', 
      title: 'C-Suite Industry Seminars', 
      desc: 'Masterclasses and guest lectures by CEOs, HR heads, and senior industry leaders sharing career secrets.',
      image: '/media/hospital-admin-lab-clean.jpg'
    },
    { 
      icon: '📱', 
      title: 'Digital LMS & Skillfolio Portal', 
      desc: 'Access to recorded lectures, course materials, placement alerts, and a digital employability profile on iOS & Android.',
      image: '/media/skillversity-app-screen.png'
    },
  ]

  return (
    <>
      <section className="page-hero mid">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="breadcrumb" style={{ color: 'rgba(255,255,255,.6)' }}><Link href="/" style={{ color: 'rgba(255,255,255,.8)' }}>Home</Link><span>›</span><span>Campus Life</span></div>
          <span className="eyebrow" style={{ background: 'rgba(255,255,255,.12)', borderColor: 'rgba(255,255,255,.3)', color: '#fff' }}><span className="dot" />Life at Skillversity</span>
          <h1 className="h-hero" style={{ color: '#fff', marginTop: '18px' }}>More than a campus.<br /><span style={{ color: 'var(--brand-yellow)' }}>A career launchpad.</span></h1>
          <p style={{ color: 'rgba(255,255,255,.82)', marginTop: '18px', fontSize: '17px', maxWidth: '600px', lineHeight: 1.65 }}>Industry visits, personality workshops, sports, cultural events, and a vibrant student community — all designed to build confident professionals.</p>
        </div>
      </section>

      {/* RICH FADING IMAGE ALBUM SHOWCASE */}
      <CampusAlbumUI />

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <ScrollReveal className="section-head">
            <span className="eyebrow"><span className="dot" />Campus Experience</span>
            <h2 className="h-section" style={{ marginTop: '14px' }}>A day in the life of a <span className="squiggle">Skillversity student.</span></h2>
          </ScrollReveal>

          <div className="g3" style={{ gap: '24px' }}>
            {campusExperiences.map((item, i) => (
              <ScrollReveal key={i}>
                <div 
                  className="card-inked"
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1.5px solid var(--line)',
                    boxShadow: '0 10px 25px -8px rgba(0,0,0,0.06)',
                    height: '100%',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', background: 'var(--ice)' }}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  </div>
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.icon}</div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px' }}>{item.title}</h3>
                    <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0, flex: 1 }}>{item.desc}</p>
                  </div>
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
