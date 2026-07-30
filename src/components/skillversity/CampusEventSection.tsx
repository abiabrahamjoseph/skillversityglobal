'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, Trophy, Music, Tag } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'

type EventItem = {
  id: string
  title: string
  subtitle: string
  tag: string
  date: string
  time: string
  venue: string
  poster: string
  badgeColor: string
  icon: 'trophy' | 'music'
  marqueeText: string[]
}

const EVENTS: EventItem[] = [
  {
    id: 'captains-cabinet',
    title: "Captain’s Cabinet 2026",
    subtitle: 'Official Student Leadership Summit',
    tag: 'Leadership Summit',
    date: '01 August 2026',
    time: '9:00 AM Onwards',
    venue: 'Kerala Startup Mission, Kalamassery',
    poster: '/media/captains-cabinet-event.png',
    badgeColor: '#FFCB28',
    icon: 'trophy',
    marqueeText: [
      "🔥 UPCOMING EVENT: CAPTAIN'S CABINET",
      '📅 01 AUGUST 2026 · 9:00 AM',
      '📍 KERALA STARTUP MISSION, KALAMASSERY',
      '🎓 SKILLVERSITY EXCLUSIVE EVENT',
      '🚀 SEATS FILLING FAST — REGISTER NOW!',
    ],
  },
  {
    id: 'world-music-day',
    title: 'World Music Day with Badlav',
    subtitle: 'Skillversity Cultural Club Special',
    tag: 'Cultural Festival',
    date: '19 June 2026',
    time: 'Afternoon 1:30 PM',
    venue: 'Pullepady Campus, Skillversity',
    poster: '/media/world-music-day-event.jpg',
    badgeColor: '#00B6E8',
    icon: 'music',
    marqueeText: [
      '🎵 SKILLVERSITY CULTURAL CLUB PRESENTS: WORLD MUSIC DAY',
      '🎸 CELEBRATING WITH BADLAV · MUSIC CONNECTS US ALL',
      '📅 19TH JUNE 2026 · 1:30 PM',
      '📍 PULLEPADY CAMPUS',
      '✨ REGISTER NOW & JOIN THE CELEBRATION!',
    ],
  },
]

export const CampusEventSection: React.FC = () => {
  const [activeEventId, setActiveEventId] = useState<string>('captains-cabinet')

  const activeEvent = EVENTS.find((e) => e.id === activeEventId) || EVENTS[0]
  const repeatedMarquee = [
    ...activeEvent.marqueeText,
    ...activeEvent.marqueeText,
    ...activeEvent.marqueeText,
    ...activeEvent.marqueeText,
  ]

  return (
    <section
      id="campus-event"
      style={{
        background: 'linear-gradient(135deg, #0A0A1F 0%, #1A3DB8 40%, #0A007A 100%)',
        color: '#ffffff',
        padding: '54px 0 64px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Glow Blobs */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,31,92,0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,182,232,0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* CONTINUOUS RUNNING TICKER MARQUEE */}
      <div
        style={{
          width: '100%',
          background: 'linear-gradient(90deg, #FF1F5C 0%, #FF7A1A 50%, #00B6E8 100%)',
          padding: '10px 0',
          overflow: 'hidden',
          marginBottom: '40px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes eventMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .event-marquee-track {
            display: flex;
            gap: 28px;
            width: max-content;
            animation: eventMarquee 25s linear infinite;
          }
          .event-marquee-track:hover {
            animation-play-state: paused;
          }
          .event-poster-card:hover {
            transform: translateY(-4px) scale(1.01);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 122, 26, 0.4) !important;
          }
          .register-btn-pulse:hover {
            transform: scale(1.03) !important;
            box-shadow: 0 10px 30px rgba(255, 31, 92, 0.6) !important;
          }
          @media (max-width: 768px) {
            .event-grid-layout {
              grid-template-columns: 1fr !important;
              gap: 24px !important;
            }
            .event-details-card {
              padding: 24px 18px !important;
            }
            .event-tab-btn {
              padding: 10px 14px !important;
              font-size: 13px !important;
              flex: 1 1 auto;
            }
          }
        `}} />
        <div className="event-marquee-track">
          {repeatedMarquee.map((text, idx) => (
            <span
              key={idx}
              style={{
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '13px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <ScrollReveal className="section-head" style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '999px',
              background: 'rgba(255, 203, 40, 0.15)',
              border: '1.5px solid rgba(255, 203, 40, 0.4)',
              marginBottom: '16px',
            }}
          >
            <Sparkles size={16} style={{ color: '#FFCB28' }} />
            <span
              style={{
                fontSize: '12.5px',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#FFCB28',
              }}
            >
              Skillversity Campus Events
            </span>
          </div>

          <h2
            className="h-section"
            style={{
              color: '#ffffff',
              marginTop: '6px',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              lineHeight: 1.15,
            }}
          >
            Upcoming Campus <span className="squiggle" style={{ color: '#00B6E8' }}>Events & Summits</span>
          </h2>

          {/* INTERACTIVE MOBILE-FRIENDLY EVENT TAB SWITCHER */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              marginTop: '24px',
            }}
          >
            {EVENTS.map((evt) => {
              const isActive = evt.id === activeEventId
              return (
                <button
                  key={evt.id}
                  onClick={() => setActiveEventId(evt.id)}
                  className="event-tab-btn"
                  style={{
                    padding: '12px 22px',
                    borderRadius: '999px',
                    fontSize: '14px',
                    fontWeight: 800,
                    border: isActive ? '2px solid #FFCB28' : '1.5px solid rgba(255,255,255,0.2)',
                    background: isActive
                      ? 'linear-gradient(135deg, #FF1F5C 0%, #FF7A1A 100%)'
                      : 'rgba(255,255,255,0.08)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: isActive ? '0 8px 25px rgba(255,31,92,0.4)' : 'none',
                  }}
                >
                  {evt.icon === 'trophy' ? <Trophy size={16} /> : <Music size={16} />}
                  <span>{evt.title}</span>
                </button>
              )
            })}
          </div>
        </ScrollReveal>

        {/* EVENT CONTENT GRID: POSTER & DETAILS */}
        <div
          className="event-grid-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '36px',
            alignItems: 'center',
            maxWidth: '1050px',
            margin: '0 auto',
          }}
        >
          {/* EVENT POSTER DISPLAY */}
          <ScrollReveal>
            <div
              className="event-poster-card"
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '3px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
                transition: 'all 0.35s ease',
                background: '#ffffff',
                maxWidth: '480px',
                margin: '0 auto',
              }}
            >
              <Image
                key={activeEvent.id}
                src={activeEvent.poster}
                alt={activeEvent.title}
                width={800}
                height={1200}
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                unoptimized
              />
            </div>
          </ScrollReveal>

          {/* EVENT DETAILS & REGISTRATION CARD */}
          <ScrollReveal>
            <div
              className="event-details-card"
              style={{
                background: 'rgba(255, 255, 255, 0.07)',
                border: '1.5px solid rgba(255, 255, 255, 0.18)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '28px',
                padding: '36px 28px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #FF7A1A 0%, #FF1F5C 100%)',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  {activeEvent.icon === 'trophy' ? (
                    <Trophy size={22} style={{ color: '#fff' }} />
                  ) : (
                    <Music size={22} style={{ color: '#fff' }} />
                  )}
                </div>
                <div>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: 0, lineHeight: 1.2 }}>
                    {activeEvent.title}
                  </h3>
                  <span style={{ fontSize: '13px', color: activeEvent.badgeColor, fontWeight: 700 }}>
                    {activeEvent.subtitle}
                  </span>
                </div>
              </div>

              {/* EVENT SPECIFICATIONS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '24px 0 32px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '14px 18px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Calendar size={22} style={{ color: '#00B6E8', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 600 }}>
                      Date
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
                      {activeEvent.date}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '14px 18px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Clock size={22} style={{ color: '#FFCB28', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 600 }}>
                      Time
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
                      {activeEvent.time}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '14px 18px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <MapPin size={22} style={{ color: '#FF1F5C', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 600 }}>
                      Venue
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
                      {activeEvent.venue}
                    </div>
                  </div>
                </div>
              </div>

              {/* REGISTER NOW CALL TO ACTION BUTTON */}
              <Link
                href="/contact#lead-form"
                className="register-btn-pulse"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '16px 24px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #FF1F5C 0%, #FF7A1A 100%)',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '15.5px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 8px 25px rgba(255, 31, 92, 0.4)',
                  transition: 'all 0.25s ease',
                }}
              >
                <span>Register Now</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
