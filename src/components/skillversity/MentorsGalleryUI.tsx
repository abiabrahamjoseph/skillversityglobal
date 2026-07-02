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

  return (
    <section className="section" style={{ background: background === 'cream' ? 'var(--cream)' : '#fff' }}>
      <div className="wrap">
        <ScrollReveal className="section-head">
          {eyebrow && <span className="eyebrow"><span className="dot" />{eyebrow}</span>}
          <h2 className="h-section" style={{ marginTop: '14px' }}>{title}</h2>
          {description && <p className="lead">{description}</p>}
        </ScrollReveal>

        {/* Head of Departments */}
        {hods.length > 0 && (
          <div style={{ marginBottom: '60px' }}>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: '24px', fontWeight: 800, textAlign: 'center', marginBottom: '32px', color: 'var(--ink)' }}>
              Head of Departments
            </h3>
            <div className="hod-gallery">
              {hods.map((m, i) => (
                <ScrollReveal key={i}>
                  <div className="hod-card">
                    <div className="hod-avatar">
                      <MediaPlaceholder media={m.image} label={m.firstName || m.fullName} shape="circle" editUrl="/admin/globals/site-settings" />
                    </div>
                    <h4 className="hod-name">{m.fullName}</h4>
                    {m.credential && <p className="hod-credential">{m.credential}</p>}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* Mentors */}
        {regularMentors.length > 0 && (
          <div>
            {hods.length > 0 && (
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '24px', fontWeight: 800, textAlign: 'center', marginBottom: '32px', color: 'var(--ink)' }}>
                Industry Mentors
              </h3>
            )}
            <div className="mentor-gallery">
              {regularMentors.map((m, i) => (
                <ScrollReveal key={i}>
                  <div className="mentor-card">
                    <div className="mentor-avatar">
                      <MediaPlaceholder media={m.image} label={m.firstName || m.fullName} shape="circle" editUrl="/admin/globals/site-settings" />
                    </div>
                    <h3 className="mentor-name">{m.fullName}</h3>
                    {m.credential && <p className="mentor-credential">{m.credential}</p>}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {ctaLabel && ctaUrl && (
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link href={ctaUrl} className="btn btn-dark btn-lg">{ctaLabel}</Link>
          </div>
        )}
      </div>
    </section>
  )
}
