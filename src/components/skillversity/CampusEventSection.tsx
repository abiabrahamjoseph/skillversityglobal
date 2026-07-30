'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, Trophy } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'

export const CampusEventSection: React.FC = () => {
  const marqueeItems = [
    "🔥 UPCOMING CAMPUS EVENT: CAPTAIN'S CABINET",
    '📅 01 AUGUST 2026 · 9:00 AM',
    '📍 KERALA STARTUP MISSION, KALAMASSERY',
    '🎓 SKILLVERSITY EXCLUSIVE EVENT',
    '🚀 SEATS FILLING FAST — REGISTER NOW!',
  ]

  const repeatedMarquee = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]

  return (
    <section 
      id="campus-event"
      style={{ 
        background: 'linear-gradient(135deg, #0A0A1F 0%, #1A3DB8 40%, #0A007A 100%)', 
        color: '#ffffff', 
        padding: '72px 0', 
        position: 'relative', 
        overflow: 'hidden' 
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
          background: 'radial-gradient(circle, rgba(255,31,92,0.25) 0%, transparent 70%)', 
          pointerEvents: 'none' 
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
          background: 'radial-gradient(circle, rgba(0,182,232,0.25) 0%, transparent 70%)', 
          pointerEvents: 'none' 
        }} 
      />

      {/* CONTINUOUS RUNNING TICKER MARQUEE */}
      <div 
        style={{ 
          width: '100%', 
          background: 'linear-gradient(90deg, #FF1F5C 0%, #FF7A1A 50%, #00B6E8 100%)', 
          padding: '12px 0', 
          overflow: 'hidden', 
          marginBottom: '50px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          position: 'relative',
          zIndex: 2
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes eventMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .event-marquee-track {
            display: flex;
            gap: 32px;
            width: max-content;
            animation: eventMarquee 25s linear infinite;
          }
          .event-marquee-track:hover {
            animation-play-state: paused;
          }
          .event-poster-card:hover {
            transform: translateY(-6px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 122, 26, 0.5) !important;
          }
          .register-btn-pulse:hover {
            transform: scale(1.05) !important;
            box-shadow: 0 10px 30px rgba(255, 31, 92, 0.6) !important;
          }
        `}} />
        <div className="event-marquee-track">
          {repeatedMarquee.map((text, idx) => (
            <span 
              key={idx} 
              style={{ 
                color: '#ffffff', 
                fontWeight: 900, 
                fontSize: '13.5px', 
                letterSpacing: '0.1em', 
                textTransform: 'uppercase', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                whiteSpace: 'nowrap' 
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <ScrollReveal className="section-head" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '6px 18px', 
              borderRadius: '999px', 
              background: 'rgba(255, 203, 40, 0.15)', 
              border: '1.5px solid rgba(255, 203, 40, 0.4)', 
              marginBottom: '16px' 
            }}
          >
            <Sparkles size={16} style={{ color: '#FFCB28' }} />
            <span style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFCB28' }}>
              Featured Campus Event
            </span>
          </div>

          <h2 className="h-section" style={{ color: '#ffffff', marginTop: '8px', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
            Captain’s Cabinet <span className="squiggle" style={{ color: '#00B6E8' }}>2026</span>
          </h2>
          <p className="lead" style={{ color: 'rgba(255,255,255,0.85)', marginTop: '12px', maxWidth: '680px', margin: '12px auto 0' }}>
            Join Skillversity's grand student leadership summit at Kerala Startup Mission. Meet industry leaders, campus captains, and placement mentors.
          </p>
        </ScrollReveal>

        {/* EVENT CONTENT GRID: POSTER & DETAILS */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '36px', 
            alignItems: 'center', 
            maxWidth: '1100px', 
            margin: '0 auto' 
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
                background: '#ffffff'
              }}
            >
              <Image 
                src="/media/captains-cabinet-event.png" 
                alt="Captain's Cabinet Event - August 01, 2026" 
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
              style={{ 
                background: 'rgba(255, 255, 255, 0.07)', 
                border: '1.5px solid rgba(255, 255, 255, 0.18)', 
                backdropFilter: 'blur(20px)', 
                borderRadius: '28px', 
                padding: '36px 28px', 
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #FF7A1A 0%, #FF1F5C 100%)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Trophy size={22} style={{ color: '#fff' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    Captain’s Cabinet
                  </h3>
                  <span style={{ fontSize: '13px', color: '#FFCB28', fontWeight: 700 }}>
                    Official Leadership Summit
                  </span>
                </div>
              </div>

              {/* EVENT SPECIFICATIONS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '24px 0 32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(255, 255, 255, 0.05)', padding: '14px 18px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Calendar size={22} style={{ color: '#00B6E8', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 600 }}>Date</div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>01 August 2026</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(255, 255, 255, 0.05)', padding: '14px 18px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Clock size={22} style={{ color: '#FFCB28', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 600 }}>Time</div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>9:00 AM Onwards</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(255, 255, 255, 0.05)', padding: '14px 18px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <MapPin size={22} style={{ color: '#FF1F5C', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 600 }}>Venue</div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>Kerala Startup Mission, Kalamassery</div>
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
                  fontSize: '16px', 
                  letterSpacing: '0.05em', 
                  textTransform: 'uppercase', 
                  textDecoration: 'none', 
                  boxShadow: '0 8px 25px rgba(255, 31, 92, 0.4)', 
                  transition: 'all 0.25s ease' 
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
