'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, Trophy, Music, Users, Star } from 'lucide-react'
import { ScrollReveal } from '../ScrollReveal'
import { CampusEventSection } from '../CampusEventSection'
import { AppShowcaseSection } from '../AppShowcaseSection'

type EventDetail = {
  id: string
  title: string
  subtitle: string
  tag: string
  date: string
  time: string
  venue: string
  poster: string
  description: string
  highlights: string[]
  badgeColor: string
  icon: 'trophy' | 'music' | 'star'
}

const ALL_EVENTS: EventDetail[] = [
  {
    id: 'captains-cabinet',
    title: "Captain’s Cabinet 2026",
    subtitle: 'Skillversity Student Leadership Summit',
    tag: 'Leadership Summit',
    date: '01 August 2026',
    time: '9:00 AM Onwards',
    venue: 'Kerala Startup Mission, Kalamassery',
    poster: '/media/captains-cabinet-event.png',
    description: 'Join Skillversity’s flagship student leadership summit at Kerala Startup Mission. Meet campus captains, corporate hiring partners, and industry mentors for a day of leadership workshops, student showcases, and networking.',
    highlights: ['Student Leadership Showcase', 'Industry Mentor Panels', 'Corporate Networking', 'Certificate of Participation'],
    badgeColor: '#FFCB28',
    icon: 'trophy',
  },
  {
    id: 'world-music-day',
    title: 'World Music Day with Badlav',
    subtitle: 'Skillversity Cultural Club Special Event',
    tag: 'Cultural Fest',
    date: '19 June 2026',
    time: 'Afternoon 1:30 PM',
    venue: 'Pullepady Campus, Skillversity',
    poster: '/media/world-music-day-event.jpg',
    description: 'Skillversity Cultural Club presents an unforgettable musical afternoon featuring Band Badlav. Celebrating how music connects us all across campuses, languages, and cultures.',
    highlights: ['Live Performance by Badlav', 'Student Music Showcase', 'Interactive Jam Session', 'Campus Cultural Celebration'],
    badgeColor: '#00B6E8',
    icon: 'music',
  },
]

export const CampusEventsPageClient: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const filteredEvents = activeFilter === 'all'
    ? ALL_EVENTS
    : ALL_EVENTS.filter((e) => e.id === activeFilter)

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      {/* HERO SECTION */}
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, #0A0A1F 0%, #1A3DB8 40%, #0A007A 100%)', color: '#ffffff', padding: '80px 0 60px', overflow: 'hidden' }}>
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="breadcrumb" style={{ color: 'rgba(255,255,255,.6)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,.8)' }}>Home</Link>
            <span>›</span>
            <span>Campus Events</span>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(255,203,40,0.15)', border: '1px solid rgba(255,203,40,0.4)', marginBottom: '20px' }}>
            <Sparkles size={16} style={{ color: '#FFCB28' }} />
            <span style={{ fontSize: '12.5px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFCB28' }}>Skillversity Events & Summits</span>
          </div>

          <h1 className="h-hero" style={{ color: '#fff', marginTop: '10px', lineHeight: 1.08 }}>
            Life at Skillversity.<br />
            <span style={{ background: 'linear-gradient(90deg, #FF1F5C 0%, #FF7A1A 50%, #00B6E8 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              Leadership, Culture & Summits.
            </span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,.85)', marginTop: '20px', fontSize: '18px', maxWidth: '680px', lineHeight: 1.65 }}>
            From grand leadership summits at Kerala Startup Mission to campus music festivals — discover upcoming events, student gatherings, and register to participate!
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '32px' }}>
            <Link href="/contact#lead-form" className="btn btn-brand btn-lg" style={{ minWidth: '220px', justifyContent: 'center' }}>
              Register for Next Event →
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED EVENT HIGHLIGHT */}
      <CampusEventSection />

      {/* ALL EVENTS GALLERY */}
      <section className="section" style={{ background: '#ffffff', padding: '72px 0' }}>
        <div className="wrap">
          <ScrollReveal className="section-head" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="eyebrow"><span className="dot" />Event Directory</span>
            <h2 className="h-section" style={{ marginTop: '14px' }}>Explore All Campus <span className="squiggle">Events & Summits.</span></h2>
            <p className="lead" style={{ marginTop: '12px' }}>Click any event poster to learn more or secure your seat.</p>
          </ScrollReveal>

          {/* EVENTS FILTER TABS */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
            {[
              { id: 'all', label: 'All Campus Events' },
              { id: 'captains-cabinet', label: '⭐ Captain’s Cabinet 2026' },
              { id: 'world-music-day', label: '🎵 World Music Day' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  padding: '12px 22px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  fontWeight: 800,
                  border: '1.5px solid var(--ink)',
                  background: activeFilter === tab.id ? 'var(--ink)' : '#ffffff',
                  color: activeFilter === tab.id ? '#ffffff' : 'var(--ink)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeFilter === tab.id ? '0 6px 18px rgba(0,0,0,0.15)' : 'none',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* EVENTS GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px' }}>
            {filteredEvents.map((evt) => (
              <ScrollReveal key={evt.id}>
                <div 
                  style={{ 
                    background: 'var(--cream)', 
                    borderRadius: '24px', 
                    border: '2px solid var(--ink)', 
                    overflow: 'hidden', 
                    boxShadow: '8px 8px 0 var(--ink)', 
                    display: 'flex', 
                    flexDirection: 'column',
                    height: '100%'
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', background: '#fff' }}>
                    <Image 
                      src={evt.poster} 
                      alt={evt.title} 
                      fill 
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                    <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'var(--ink)', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '6px 14px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {evt.tag}
                    </div>
                  </div>

                  <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '22px', color: 'var(--ink)', marginBottom: '6px' }}>
                      {evt.title}
                    </h3>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--brand-pink)', marginBottom: '16px' }}>
                      {evt.subtitle}
                    </p>
                    <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                      {evt.description}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid var(--line)', marginBottom: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', fontWeight: 700, color: 'var(--ink)' }}>
                        <Calendar size={18} style={{ color: 'var(--brand-blue)' }} />
                        <span>{evt.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', fontWeight: 700, color: 'var(--ink)' }}>
                        <Clock size={18} style={{ color: 'var(--brand-orange)' }} />
                        <span>{evt.time}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', fontWeight: 700, color: 'var(--ink)' }}>
                        <MapPin size={18} style={{ color: 'var(--brand-pink)' }} />
                        <span>{evt.venue}</span>
                      </div>
                    </div>

                    <Link 
                      href="/contact#lead-form" 
                      className="btn btn-brand"
                      style={{ width: '100%', justifyContent: 'center', padding: '14px 20px', borderRadius: '12px', fontSize: '15px', fontWeight: 800 }}
                    >
                      Register Now →
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* APP SHOWCASE */}
      <AppShowcaseSection />
    </div>
  )
}
