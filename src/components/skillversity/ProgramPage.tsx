'use client'

import React from 'react'
import Link from 'next/link'
import { ScrollReveal } from './ScrollReveal'
import { MediaPlaceholder } from './MediaPlaceholder'

export type ProgramDetail = {
  id?: string | number
  title: string
  slug: string
  tag?: string
  tagColor?: string
  accentColor?: string
  cardGradient?: string
  shortDescription?: string
  duration?: string
  eligibility?: string
  market?: string
  certificationLabel?: string
  heroHeadline?: string
  heroDescription?: string
  heroGradient?: string
  heroImage?: { url?: string | null; alt?: string | null } | number | string | null
  careerPathsLegacy?: unknown
  statBoxes?: Array<{ value: string; label: string; color?: string }>
  overview?: {
    heading?: string
    subhead?: string
    body?: string
    calloutTitle?: string
    calloutBody?: string
  }
  highlights?: Array<{ icon?: string; title: string; description: string }>
  modules?: Array<{ title: string; topics?: Array<{ topic: string }> }>
  careerRoles?: Array<{ role: string }>
  careerPaths?: Array<{
    image?: { url?: string | null; alt?: string | null } | number | string | null
    icon?: string
    title: string
    color?: string
    roles?: Array<string | { role: string }>
    employers?: string
  }> | null
  salaryRange?: string
  salary?: {
    india?: string
    indiaDesc?: string
    gulf?: string
    gulfDesc?: string
  }
  certifications?: Array<{ name: string; description?: string }>
  testimonials?: Array<{
    quote: string
    studentName: string
    role?: string
    company?: string
    initials?: string
    accentColor?: string
  }>
  faqs?: Array<{ question: string; answer: string }>
}

export const ProgramPage: React.FC<{ program: ProgramDetail }> = ({ program }) => {
  const [isVideoOpen, setIsVideoOpen] = React.useState(false)
  const videoUrl = program.slug === 'hospital-administration' ? 'https://www.youtube.com/watch?v=XFyxpS6osQ8' : null

  const primaryColor = program.accentColor || 'var(--brand-blue)'
  const heroBg = program.heroGradient || program.cardGradient || 'linear-gradient(160deg,#E0F7FD 0%,#FFE4ED 100%)'
  const heroTitle = program.heroHeadline || program.title
  const heroDescription = program.heroDescription || program.shortDescription
  const heroImageUrl =
    program.heroImage && typeof program.heroImage === 'object' && 'url' in program.heroImage
      ? program.heroImage.url || null
      : null
  const hasHeroImage = Boolean(heroImageUrl)
  const roleText = (r: string | { role: string }): string => (typeof r === 'string' ? r : r.role)
  const adminEditUrl = program.id ? `/admin/collections/programs/${program.id}` : '/admin/collections/programs'
  const statBoxes = program.statBoxes?.length
    ? program.statBoxes
    : [
        { value: program.duration || 'Flexible', label: 'Duration', color: primaryColor },
        { value: program.eligibility || 'Open', label: 'Eligibility', color: 'var(--brand-pink)' },
        { value: program.salaryRange || 'Career-ready', label: 'Starting Pathway', color: 'var(--brand-orange)' },
      ]

  return (
    <>
      <section className="page-hero" style={{ background: heroBg, borderBottom: 'none' }}>
        <div className="wrap program-hero-grid">
          <div className="program-hero-text">
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span>›</span>
              <Link href="/programs">Programs</Link>
              <span>›</span>
              <span>{program.title}</span>
            </div>
            {program.tag && (
              <span className="eyebrow" style={{ borderColor: primaryColor, color: primaryColor }}>
                <span className="dot" style={{ background: program.tagColor || primaryColor }} />
                {program.tag}
              </span>
            )}
            <h1 className="h-hero" style={{ marginTop: '18px', color: primaryColor }}>{heroTitle}</h1>
            {heroDescription && <p className="lead" style={{ maxWidth: '680px', marginTop: '18px' }}>{heroDescription}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '28px' }}>
              <Link href="/contact" className="btn btn-cool btn-lg" style={{ flexGrow: 1, minWidth: '280px', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Book Free Counselling Call
              </Link>
              <Link href="/contact?action=brochure" className="btn btn-ghost btn-lg" style={{ flexGrow: 1, minWidth: '280px', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Brochure
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, auto))', gap: '20px', marginTop: '32px', width: 'fit-content' }}>
              {statBoxes.map((stat, index) => (
                <div className="stat-box" key={index} style={{ minWidth: '150px', maxWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div 
                    className="stat-num" 
                    style={{ 
                      color: stat.color || primaryColor,
                      fontSize: stat.value.length > 25 ? '15px' : stat.value.length > 15 ? '18px' : stat.value.length > 10 ? '22px' : '28px',
                      lineHeight: 1.25
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="stat-lbl">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div 
            className={`program-hero-media ${videoUrl ? 'hero-collage-video-card' : ''}`} 
            style={videoUrl ? { position: 'relative', cursor: 'pointer' } : undefined} 
            onClick={videoUrl ? () => setIsVideoOpen(true) : undefined}
          >
            <MediaPlaceholder
              media={hasHeroImage ? (program.heroImage as { url?: string | null; alt?: string | null }) : null}
              label={`${program.title} hero photo`}
              shape="card"
              editUrl={adminEditUrl}
            />
            {videoUrl && (
              <div className="video-play-overlay">
                <div className="play-button-wrapper">
                  <div className="play-ripple play-ripple-1"></div>
                  <div className="play-ripple play-ripple-2"></div>
                  <div className="play-button-circle">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </div>
                </div>
                <span className="play-text">Watch Video</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section--sm" style={{ background: '#fff', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="g4" style={{ gap: '12px' }}>
            {[
              { label: 'Duration', value: program.duration, color: primaryColor },
              { label: 'Eligibility', value: program.eligibility },
              { label: 'Market', value: program.market },
              { label: 'Certification', value: program.certificationLabel || program.certifications?.[0]?.name },
            ].filter((item) => item.value).map((item, index) => (
              <div key={index} style={{ textAlign: 'center', padding: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink-mute)', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontWeight: 800, fontSize: '18px', color: item.color }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {(program.overview?.body || program.highlights?.length) && (
        <section className="section" style={{ background: 'var(--cream)' }}>
          <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', alignItems: 'start' }}>
            <ScrollReveal>
              <span className="eyebrow"><span className="dot" />Program Overview</span>
              <h2 className="h-section" style={{ marginTop: '16px' }}>
                {program.overview?.heading || `Why ${program.title}?`}
                {program.overview?.subhead && <><br /><span className="squiggle">{program.overview.subhead}</span></>}
              </h2>
              {program.overview?.body && <p className="lead" style={{ marginTop: '18px' }}>{program.overview.body}</p>}
              {program.overview?.calloutTitle && (
                <div style={{ background: '#fff', borderLeft: `4px solid ${primaryColor}`, borderRadius: '0 10px 10px 0', padding: '18px 20px', marginTop: '24px' }}>
                  <div style={{ fontWeight: 800, fontSize: '15px', color: primaryColor, marginBottom: '4px' }}>{program.overview.calloutTitle}</div>
                  <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)' }}>{program.overview.calloutBody}</p>
                </div>
              )}
            </ScrollReveal>
            <ScrollReveal>
              <div className="g3">
                {program.highlights?.map((highlight, index) => (
                  <div className="card" key={index}>
                    {highlight.icon && <div style={{ fontSize: '28px', marginBottom: '12px' }}>{highlight.icon}</div>}
                    <h4 style={{ fontSize: '16px', color: primaryColor, marginBottom: '8px' }}>{highlight.title}</h4>
                    <p style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>{highlight.description}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {program.modules?.length ? (
        <section className="section" style={{ background: '#fff' }}>
          <div className="wrap">
            <ScrollReveal className="section-head">
              <span className="eyebrow"><span className="dot" />Curriculum</span>
              <h2 className="h-section" style={{ marginTop: '14px' }}>What You Will Learn</h2>
            </ScrollReveal>
            <div style={{ maxWidth: '780px', margin: '0 auto' }}>
              {program.modules.map((module, index) => (
                <details key={index} className="module" open={index === 0}>
                  <summary>{module.title}</summary>
                  <div className="module-body">
                    <ul>{module.topics?.map((topic, topicIndex) => <li key={topicIndex}>{topic.topic}</li>)}</ul>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {(program.careerPaths?.length || program.careerRoles?.length || program.salaryRange || program.salary?.india || program.salary?.gulf) && (
        <section className="section" style={{ background: 'var(--cream)' }}>
          <div className="wrap">
            <ScrollReveal className="section-head">
              <span className="eyebrow"><span className="dot" />Career Pathways</span>
              <h2 className="h-section" style={{ marginTop: '14px' }}>Where graduates <span className="squiggle">work.</span></h2>
            </ScrollReveal>
            <div className="g3">
              {program.careerPaths?.length ? (
                program.careerPaths.map((path, index) => (
                  <ScrollReveal key={index}>
                    <div className="card path-card">
                      <div className="path-card-media">
                        <MediaPlaceholder
                          media={(path.image as { url?: string | null; alt?: string | null } | null) || null}
                          label={`${path.title} photo`}
                          shape="card"
                          editUrl={adminEditUrl}
                        />
                      </div>
                      <h4 style={{ fontSize: '16px', color: path.color || primaryColor, marginBottom: '10px' }}>
                        {path.icon ? <span style={{ marginRight: '8px' }}>{path.icon}</span> : null}
                        {path.title}
                      </h4>
                      {path.roles?.length ? (
                        <div className="roles-wrap">
                          {path.roles.map((role, j) => (
                            <span key={j} className="role-pill">{roleText(role)}</span>
                          ))}
                        </div>
                      ) : null}
                      {path.employers && <div style={{ marginTop: '14px', fontSize: '13px', color: 'var(--ink-mute)' }}>Key employers: {path.employers}</div>}
                    </div>
                  </ScrollReveal>
                ))
              ) : program.careerRoles?.length ? (
                <ScrollReveal>
                  <div className="card">
                    <h4 style={{ fontSize: '16px', color: primaryColor, marginBottom: '10px' }}>Career Roles</h4>
                    <div className="roles-wrap">
                      {program.careerRoles.map((role, index) => <span key={index} className="role-pill">{role.role}</span>)}
                    </div>
                  </div>
                </ScrollReveal>
              ) : null}
              {(program.salaryRange || program.salary?.india || program.salary?.gulf) && (
                <ScrollReveal>
                  <div className="card">
                    <div style={{ fontSize: '28px', marginBottom: '12px' }}>📈</div>
                    <h4 style={{ fontSize: '16px', color: 'var(--brand-orange)', marginBottom: '10px' }}>Typical Starting Salary</h4>
                    {program.salary?.india && <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '36px', color: primaryColor, margin: '10px 0' }}>{program.salary.india}</div>}
                    {program.salary?.indiaDesc && <p style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>{program.salary.indiaDesc}</p>}
                    {program.salary?.gulf && <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '36px', color: 'var(--brand-orange)', margin: '10px 0' }}>{program.salary.gulf}</div>}
                    {program.salary?.gulfDesc && <p style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>{program.salary.gulfDesc}</p>}
                    {!program.salary?.india && !program.salary?.gulf && <p style={{ fontSize: '18px', fontWeight: 800, color: primaryColor }}>{program.salaryRange}</p>}
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      )}

      {program.testimonials?.length ? (
        <section className="section" style={{ background: '#fff' }}>
          <div className="wrap">
            <ScrollReveal className="section-head">
              <span className="eyebrow"><span className="dot" />Success Stories</span>
              <h2 className="h-section" style={{ marginTop: '14px' }}>Alumni <span className="squiggle">stories.</span></h2>
            </ScrollReveal>
            <div className="g3">
              {program.testimonials.map((testimonial, index) => (
                <ScrollReveal key={index}>
                  <div className="t-card">
                    <div className="qmark">&quot;</div>
                    <div className="stars">★★★★★</div>
                    <p className="quote">{testimonial.quote}</p>
                    <div className="person">
                      <div className="ava" style={{ background: testimonial.accentColor || primaryColor }}>{testimonial.initials || testimonial.studentName.slice(0, 2)}</div>
                      <div className="meta"><b>{testimonial.studentName}</b><span>{[testimonial.role, testimonial.company].filter(Boolean).join(' · ')}</span></div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {program.faqs?.length ? (
        <section className="section" style={{ background: 'var(--cream)' }}>
          <div className="wrap">
            <ScrollReveal className="section-head">
              <span className="eyebrow"><span className="dot" />Common Questions</span>
              <h2 className="h-section" style={{ marginTop: '14px' }}>{program.title} FAQs</h2>
            </ScrollReveal>
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              {program.faqs.map((faq, index) => (
                <details key={index} className="faq-item">
                  <summary>{faq.question}</summary>
                  <div className="faq-body">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* VIDEO PLAYBACK MODAL */}
      {isVideoOpen && videoUrl && (
        <div className="video-modal-backdrop" onClick={() => setIsVideoOpen(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setIsVideoOpen(false)} aria-label="Close Video">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="video-iframe-container">
              <iframe
                src="https://www.youtube.com/embed/XFyxpS6osQ8?autoplay=1&mute=0"
                title="Program Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
