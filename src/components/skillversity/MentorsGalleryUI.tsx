import React from 'react'
import Link from 'next/link'
import { ScrollReveal } from './ScrollReveal'
import { MediaPlaceholder } from './MediaPlaceholder'

export type MentorsGalleryUIProps = {
  eyebrow?: string
  title: string
  description?: string
  ctaLabel?: string
  ctaUrl?: string
  background?: 'cream' | 'white'
  mentors: Array<{
    image?: { url?: string | null; alt?: string | null } | null
    firstName?: string | null
    fullName: string
    credential?: string | null
    roleType?: string | null
  }>
}

export const MentorsGalleryUI: React.FC<MentorsGalleryUIProps> = ({
  eyebrow = 'Industry Mentors',
  title,
  description,
  ctaLabel,
  ctaUrl,
  background = 'cream',
  mentors,
}) => {
  if (!mentors?.length) return null

  const hods = mentors.filter((m) => m.roleType === 'hod')
  const regularMentors = mentors.filter((m) => m.roleType !== 'hod')
  const allDisplayMentors = [...mentors, ...mentors, ...mentors]

  return (
    <section className="section" style={{ background: background === 'cream' ? 'var(--cream)' : '#fff', overflow: 'hidden' }}>
      <div className="wrap">
        <ScrollReveal className="section-head">
          {eyebrow && <span className="eyebrow"><span className="dot" />{eyebrow}</span>}
          <h2 className="h-section" style={{ marginTop: '14px' }}>{title}</h2>
          {description && <p className="lead">{description}</p>}
        </ScrollReveal>

        {/* Head of Departments Display */}
        {hods.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: '22px', fontWeight: 800, textAlign: 'center', marginBottom: '28px', color: 'var(--ink)' }}>
              Head of Departments
            </h3>
            <div className="hod-gallery">
              {hods.map((m, i) => (
                <ScrollReveal key={i}>
                  <div className="hod-card">
                    <div className="hod-avatar">
                      <MediaPlaceholder media={m.image} label={m.firstName || m.fullName} style={{ objectFit: 'contain', objectPosition: 'bottom' }} editUrl="/admin/globals/site-settings" />
                    </div>
                    <h4 className="hod-name">{m.fullName}</h4>
                    {m.credential && <p className="hod-credential">{m.credential}</p>}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CONTINUOUS RIGHT-TO-LEFT MARQUEE FOR MENTORS */}
      <div style={{ marginTop: '20px' }}>
        <h3 style={{ fontFamily: 'var(--display)', fontSize: '22px', fontWeight: 800, textAlign: 'center', marginBottom: '24px', color: 'var(--ink)' }}>
          Industry Mentors & Faculty
        </h3>

        <div className="mentors-marquee-wrap">
          <div className="mentors-track">
            {allDisplayMentors.map((m, i) => (
              <div 
                key={i} 
                className="mentor-card"
                style={{
                  flex: '0 0 240px',
                  width: '240px',
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '20px 16px',
                  border: '1.5px solid var(--line)',
                  boxShadow: '0 10px 25px -8px rgba(0,0,0,0.06)',
                  textAlign: 'center',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  cursor: 'pointer',
                }}
              >
                <div 
                  className="mentor-avatar"
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    margin: '0 auto 14px',
                    overflow: 'hidden',
                    background: 'var(--ice)',
                    border: '3px solid #ffffff',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.08)'
                  }}
                >
                  <MediaPlaceholder media={m.image} label={m.firstName || m.fullName} style={{ objectFit: 'cover' }} editUrl="/admin/globals/site-settings" />
                </div>
                <h3 className="mentor-name" style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)', marginBottom: '4px' }}>
                  {m.fullName}
                </h3>
                {m.credential && (
                  <p className="mentor-credential" style={{ fontSize: '12.5px', color: 'var(--brand-blue)', fontWeight: 600, lineHeight: 1.35 }}>
                    {m.credential}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap">
        {ctaLabel && ctaUrl && (
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link href={ctaUrl} className="btn btn-dark btn-lg">{ctaLabel}</Link>
          </div>
        )}
      </div>
    </section>
  )
}
