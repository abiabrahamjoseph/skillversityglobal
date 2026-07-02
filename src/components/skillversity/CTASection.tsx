'use client'

import React from 'react'
import Link from 'next/link'
import { ScrollReveal } from './ScrollReveal'
import { LeadForm } from './LeadForm'

export const CTASection: React.FC = () => {
  return (
    <section className="dark-sec section">
      <div className="wrap cta-wrap">
        <ScrollReveal>
          <span className="eyebrow"><span className="dot" />Take the Next Step</span>
          <h2 className="h-section" style={{ color: '#fff', marginTop: '16px' }}>
            Ready to build your<br /><span style={{ color: 'var(--brand-yellow)' }}>job-ready career?</span>
          </h2>
          <p className="lead" style={{ marginTop: '16px' }}>Book a free 15-minute counselling call — no commitment, just clarity.</p>
          <div className="cta-btn-group">
            <Link href="/contact" className="btn btn-brand btn-lg" style={{ flexGrow: 1, minWidth: '280px', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Book Free Counselling Call
            </Link>
            <div className="cta-btn-subgroup">
              <Link href="/contact?action=brochure" className="btn btn-ghost-white btn-lg" style={{ flex: 1, justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Brochure
              </Link>
              <a href="https://wa.me/919946033355" target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-lg" style={{ flex: 1, justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ flexShrink: 0 }}>
                  <path d="M12.012 2C6.48 2 2 6.48 2 12.012c0 1.918.528 3.708 1.44 5.244L2 22l4.908-1.284a9.932 9.932 0 005.104 1.392c5.532 0 10.012-4.48 10.012-10.012C22.024 6.48 17.544 2 12.012 2zm4.884 13.836c-.204.576-.996 1.056-1.632 1.188-.444.096-.996.168-2.952-.648-2.508-1.044-4.116-3.6-4.236-3.768-.132-.168-.96-1.272-.96-2.436 0-1.164.6-1.74.816-1.98.216-.24.468-.3.624-.3h.444c.144 0 .348.012.504.384.168.396.576 1.392.624 1.488.048.096.084.216.012.36-.072.144-.108.24-.228.372-.12.144-.24.3-.348.408-.108.108-.228.228-.096.456.132.228.588.972 1.26 1.572.864.768 1.596 1.008 1.824 1.116.228.108.36.096.492-.06.132-.156.576-.672.732-.9.156-.228.312-.192.528-.108.216.084 1.368.648 1.608.768.24.12.396.18.456.288.06.108.06.624-.144 1.2z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
          <div className="cta-info-grid">
            <div className="cta-info-card">
              <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,.5)', marginBottom: '4px', fontWeight: 700 }}>Phone / WhatsApp</div>
              <a href="tel:+919946033355" style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>+91 99460 33355</a>
            </div>
            <div className="cta-info-card">
              <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,.5)', marginBottom: '4px', fontWeight: 700 }}>Email</div>
              <a href="mailto:info@skillversityglobal.com" style={{ color: '#fff', fontWeight: 700, fontSize: '13px' }}>info@skillversityglobal.com</a>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <LeadForm />
        </ScrollReveal>
      </div>
    </section>
  )
}
