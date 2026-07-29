'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from './ScrollReveal'

export const AppShowcaseSection: React.FC = () => {
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.app.skillversity'
  const appStoreUrl = 'https://apps.apple.com/kz/app/skillversity/id6758941193'

  return (
    <section className="section app-showcase-section" style={{ background: 'linear-gradient(135deg, #0A0A1F 0%, #101035 50%, #0A007A 100%)', color: '#ffffff', overflow: 'hidden' }}>
      {/* Background ambient lighting */}
      <div 
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0,182,232,0.18) 0%, rgba(10,0,122,0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255,31,92,0.15) 0%, rgba(10,0,122,0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '48px', 
            alignItems: 'center' 
          }}
        >
          {/* Left Column: Content */}
          <ScrollReveal>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', marginBottom: '20px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00B6E8', boxShadow: '0 0 10px #00B6E8' }} />
              <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#00B6E8' }}>Official Mobile App</span>
            </div>

            <h2 className="h-section" style={{ color: '#ffffff', lineHeight: 1.1, marginBottom: '20px' }}>
              Take India's First Job-Ready Campus <span style={{ background: 'var(--grad-warm)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>in Your Pocket.</span>
            </h2>

            <p className="lead" style={{ color: 'rgba(255, 255, 255, 0.82)', marginBottom: '32px', fontSize: '17px', lineHeight: 1.6 }}>
              Stay ahead in your career journey. Access your digital Skillfolio profile, live placement drive alerts, video modules, interview notifications, and mentor chats anytime on iOS & Android.
            </p>

            {/* Feature List */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '36px' }}>
              {[
                {
                  icon: '🆔',
                  title: 'Skillfolio Digital ID',
                  desc: 'Share verified skill badges & profile directly with global recruiters.',
                },
                {
                  icon: '🔔',
                  title: 'Instant Job Alerts',
                  desc: 'Get live updates on campus drives, interviews & hiring shortlists.',
                },
                {
                  icon: '📚',
                  title: 'Course Materials & LMS',
                  desc: 'Watch lecture series, download notes & track assignments on the go.',
                },
                {
                  icon: '💬',
                  title: 'Mentor Connect',
                  desc: 'Ask career questions & get direct guidance from industry mentors.',
                },
              ].map((feat, idx) => (
                <div 
                  key={idx} 
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '16px 18px',
                    backdropFilter: 'blur(10px)',
                    transition: 'transform 0.2s ease, border-color 0.2s ease',
                  }}
                  className="app-feat-card"
                >
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{feat.icon}</div>
                  <h4 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>{feat.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: 1.45, margin: 0 }}>{feat.desc}</p>
                </div>
              ))}
            </div>

            {/* App Rating & Download CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
              {/* Google Play Store Button */}
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-google-play"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: '#000000',
                  color: '#ffffff',
                  padding: '12px 20px',
                  borderRadius: '14px',
                  border: '1.5px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 182, 232, 0.2)',
                  transition: 'all 0.25s ease',
                  textDecoration: 'none',
                }}
              >
                <svg viewBox="0 0 512 512" width="26" height="26">
                  <path fill="#415A6C" d="M30 40c0-10 7-17 17-17h.3L275 251 47.3 479H47c-10 0-17-7-17-17V40z" />
                  <path fill="#13B5EA" d="M30 40c0-5 2-10 6-13l240 224L47.3 479c-4-3-6-8-6-13V40z" />
                  <path fill="#00C1A8" d="m276 251 68-68 111 63c8 4 8 13 0 17l-111 63-68-75z" opacity=".2" />
                  <path fill="#FF3333" d="M344 183 47.3 27C44 25 40 23 36 23l240 228 68-68z" />
                  <path fill="#FFD400" d="M455 245 344 183l-68 68 68 68 111-62c8-5 8-12 0-12z" />
                  <path fill="#00E676" d="M344 319 276 251 36 479c4 0 8-2 11.3-4L344 319z" />
                </svg>
                <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                  <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8, color: '#e0e0e0' }}>GET IT ON</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, fontFamily: 'var(--display)', color: '#ffffff' }}>Google Play</div>
                </div>
              </a>

              {/* Apple App Store Button */}
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-app-store"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: '#000000',
                  color: '#ffffff',
                  padding: '12px 20px',
                  borderRadius: '14px',
                  border: '1.5px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 31, 92, 0.2)',
                  transition: 'all 0.25s ease',
                  textDecoration: 'none',
                }}
              >
                {/* Official Apple Logo SVG */}
                <svg viewBox="0 0 384 512" width="24" height="24" fill="#ffffff">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-14 69.5-34.3z"/>
                </svg>
                <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                  <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8, color: '#e0e0e0' }}>DOWNLOAD ON THE</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, fontFamily: 'var(--display)', color: '#ffffff' }}>App Store</div>
                </div>
              </a>

              {/* Rating & Downloads Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', background: 'rgba(255,255,255,0.06)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FFCB28', fontWeight: 800, fontSize: '16px' }}>
                  ★ 4.8
                </div>
                <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.15)' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>iOS & Android</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)' }}>Official Mobile App</div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Phone Mockup Frame */}
          <ScrollReveal style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div 
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '320px',
                aspectRatio: '9 / 18.5',
                background: '#090A10',
                borderRadius: '44px',
                padding: '12px',
                border: '4px solid #2A2D3E',
                boxShadow: '0 25px 60px -15px rgba(0,0,0,0.8), 0 0 40px rgba(0, 182, 232, 0.25)',
              }}
            >
              {/* Speaker Notch */}
              <div 
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '90px',
                  height: '18px',
                  background: '#000000',
                  borderRadius: '12px',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: '36px', height: '4px', background: '#1A1C24', borderRadius: '2px' }} />
              </div>

              {/* Phone Inner Screen Container */}
              <div 
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '34px',
                  overflow: 'hidden',
                  background: '#121420',
                }}
              >
                <Image
                  src="/media/skillversity-app-screen.png"
                  alt="Skillversity Official Mobile App Login Screen"
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  priority
                  unoptimized
                />

                {/* Overlay Badge 1 */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '55px',
                    left: '12px',
                    right: '12px',
                    background: 'rgba(10, 10, 31, 0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--grad-brand)', display: 'grid', placeItems: 'center', color: '#fff', fontSize: '14px', fontWeight: 800 }}>
                    S
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#ffffff', display: 'flex', justifyContent: 'space-between' }}>
                      Skillfolio Verified <span>✓</span>
                    </div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>Hospital Admin & Logistics</div>
                  </div>
                </div>

                {/* Overlay Badge 2 */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: '12px',
                    right: '12px',
                    background: 'linear-gradient(135deg, rgba(255,31,92,0.9), rgba(255,122,26,0.9))',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '14px',
                    padding: '10px 14px',
                    color: '#ffffff',
                    boxShadow: '0 10px 25px rgba(255,31,92,0.4)',
                  }}
                >
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, opacity: 0.9 }}>
                    🔔 Campus Drive Alert
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 800, marginTop: '2px' }}>
                    Maersk & Blue Dart Interview shortlist announced!
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
