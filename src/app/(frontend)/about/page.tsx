import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ScrollReveal } from '@/components/skillversity/ScrollReveal'
import { MediaPlaceholder } from '@/components/skillversity/MediaPlaceholder'
import { CTASection } from '@/components/skillversity/CTASection'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const metadata: Metadata = {
  title: "About Skillversity Global | India's First Job-Ready Campus | IMS Kochi",
  description:
    "Skillversity is the manifestation of IMS — carrying forward 11+ years of trust and 25,000+ successfully trained career aspirants. Learn our story, vision, and core values.",
}

const whyPoints = [
  { title: "India's First 100% Job-Ready Campus", desc: 'Every learner is trained for both career and life success.' },
  { title: 'Future-Proof Learning', desc: 'Programs designed with industry relevance and global opportunities.' },
  { title: 'Global Career Pathways', desc: 'A dedicated Job Bank for placements in India and international markets.' },
  { title: 'Career Guarantee', desc: 'Long-term placement assurance & mentoring for up to 5 years post-graduation.' },
]

const edgePoints = [
  { title: 'Career Pathways', desc: 'A 5-year placement guarantee, with dedicated career counseling and mentorship.' },
  { title: 'Industry Partnerships', desc: 'Strong corporate tie-ups that connect learners directly with employers.' },
  { title: 'Learner-First Approach', desc: 'Personalized programs designed for student growth, confidence, and transformation.' },
  { title: 'Global Outlook', desc: 'Training that prepares learners for both domestic and international career success.' },
]

const framework = [
  {
    icon: '🎓',
    color: 'var(--brand-blue)',
    title: 'Domain Skills',
    desc: 'Learn directly from industry experts with 30+ years of experience. Acquire hands-on technical expertise and domain-specific knowledge that employers value most.',
  },
  {
    icon: '💼',
    color: 'var(--brand-pink)',
    title: 'Employability Skills',
    desc: 'Through the IMS-Certified Employability Program, learners become job-ready from day one. Training covers corporate communication, workplace professionalism, teamwork, and problem-solving.',
  },
  {
    icon: '🌱',
    color: 'var(--brand-orange)',
    title: 'Life Skills',
    desc: 'Our Life Transformation Program develops resilience, adaptability, leadership, and emotional intelligence — skills essential for thriving in career and life.',
  },
  {
    icon: '⚙️',
    color: 'var(--brand-cyan)',
    title: 'Experiential Learning',
    desc: 'With a tech-enabled AI-driven curriculum, students gain real-world experience through projects, industry events, and internships, ensuring they step into their first job with confidence.',
  },
]

const ACCENT: Record<string, string> = {
  pink: 'var(--brand-pink)',
  blue: 'var(--brand-blue)',
  orange: 'var(--brand-orange)',
}

// Shown if the CMS "leadership" list is empty (keeps the page populated out of the box).
const FALLBACK_FOUNDERS = [
  { name: 'Mr. Ratheesh Ravi', role: 'Founder MD', accent: 'pink', image: null },
  { name: 'Mr. Ajas Hyzer', role: 'Executive Director', accent: 'blue', image: null },
  { name: 'Mrs. Sandhya Ratheesh', role: 'Executive Director', accent: 'orange', image: null },
]

async function getAboutData() {
  try {
    const payload = await getPayload({ config: configPromise })
    const settings: any = await payload.findGlobal({ slug: 'site-settings', depth: 2 })
    return {
      leadership: (settings?.leadership as any[]) || [],
      photos: (settings?.aboutPhotos as Record<string, any>) || {},
    }
  } catch {
    return { leadership: [] as any[], photos: {} as Record<string, any> }
  }
}

const values = [
  {
    icon: '🤝',
    title: 'Commitment',
    desc: 'Our Commitment towards our beneficiaries, team and society at large keeps us in business.',
    accent: 'var(--brand-pink)',
  },
  {
    icon: '🏆',
    title: 'Success',
    desc: 'We believe the ultimate happiness is in achieving and celebrating meaningful successes.',
    accent: 'var(--brand-orange)',
  },
  {
    icon: '🔄',
    title: 'Transformation',
    desc: 'IMS Skillversity is committed to promote holistic transformation in our beneficiaries.',
    accent: 'var(--brand-magenta)',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Family',
    desc: 'IMS is an extended family of all the stakeholders and we uphold family values in our business interactions.',
    accent: 'var(--brand-cyan)',
  },
  {
    icon: '📈',
    title: 'Growth',
    desc: 'The innate growth instinct drives us forward, and we pass it to our stakeholders.',
    accent: 'var(--brand-blue)',
  },
]

export default async function AboutPage() {
  const { leadership, photos } = await getAboutData()
  const founders = leadership.length ? leadership : FALLBACK_FOUNDERS

  return (
    <>
      {/* Inline styles for elements that need brand color injected via ::before pseudo */}
      <style>{`
        .about-checklist li::before { background: var(--brand-pink); }
        .about-edge li::before { background: var(--brand-blue); }
        .about-split { display: grid; grid-template-columns: 1fr; gap: 36px; align-items: center; }
        @media (min-width: 880px) { .about-split { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 56px; } }
        .about-split.reverse > div:first-child { order: 1; }
        @media (min-width: 880px) { .about-split.reverse > div:first-child { order: 2; } }
        .about-photo {
          aspect-ratio: 4 / 3; border-radius: var(--rad-lg); overflow: hidden;
          background: #fff; border: 1.5px solid var(--ink);
          box-shadow: 10px 10px 0 var(--ink);
        }
        .about-collage {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;
        }
        .about-collage > div { aspect-ratio: 1 / 1; border-radius: var(--rad); overflow: hidden; background: #fff; border: 1.5px solid var(--line); }
        .about-collage > div:nth-child(1) { transform: translateY(20px); }
        .about-collage > div:nth-child(4) { transform: translateY(20px); }
        .value-card {
          background: #fff; border: 1.5px solid var(--line); border-radius: var(--rad);
          padding: 26px 22px; text-align: center;
          transition: transform .25s var(--ease), box-shadow .25s var(--ease), border-color .2s;
        }
        .value-card:hover { transform: translateY(-3px); box-shadow: 0 14px 28px -12px rgba(0,0,0,.14); border-color: var(--ink); }
        .value-card .v-ico {
          width: 56px; height: 56px; border-radius: 999px; margin: 0 auto 14px;
          display: grid; place-items: center; font-size: 26px;
          background: rgba(0,0,0,.04);
        }
        .ims-center-card {
          background: linear-gradient(135deg, #0A007A 0%, #1A3DB8 100%);
          color: #fff; border-radius: var(--rad); padding: 32px 20px; text-align: center;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          border: 1.5px solid var(--ink);
        }
        .ims-center-card .ims-mark {
          font-family: var(--display); font-weight: 800; font-size: 44px; letter-spacing: -.04em;
          color: var(--brand-yellow); line-height: 1;
        }
        .founder-card {
          background: transparent;
          border: none;
          padding: 0;
          text-align: center;
          transition: transform .3s var(--ease);
        }
        .founder-card:hover {
          transform: translateY(-6px);
        }
        .founder-photo {
          width: 100%;
          max-width: 290px;
          aspect-ratio: 4 / 5;
          margin: 0 auto 18px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 12px 30px -10px rgba(10, 0, 122, 0.08);
          border: 1px solid rgba(10, 0, 122, 0.04);
          transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease);
        }
        .founder-card:hover .founder-photo {
          transform: scale(1.02);
          box-shadow: 0 24px 48px -12px rgba(10, 0, 122, 0.18);
        }
        .promise-card {
          max-width: 760px; margin: 0 auto; padding: 36px 32px;
          background: #fff; border: 1.5px solid var(--ink); border-radius: var(--rad-lg);
          box-shadow: 8px 8px 0 var(--ink); text-align: center;
        }
      `}</style>

      {/* ========== HERO ========== */}
      <section className="page-hero cool">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="breadcrumb">
            <Link href="/" style={{ color: 'rgba(255,255,255,.85)' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,.6)' }}>›</span>
            <span style={{ color: '#fff' }}>About Us</span>
          </div>
          <span className="eyebrow load-reveal-eyebrow">
            <span className="dot" />
            Our Story
          </span>
          <h1 className="h-hero load-reveal-title" style={{ color: '#fff', marginTop: '18px' }}>
            About <span style={{ color: 'var(--brand-yellow)' }}>Skillversity</span>
          </h1>
          <p
            className="load-reveal-desc"
            style={{
              color: 'rgba(255,255,255,.85)',
              marginTop: '18px',
              fontSize: '17px',
              maxWidth: '720px',
              lineHeight: 1.7,
            }}
          >
            The manifestation of IMS — &ldquo;I&rsquo;m the Source&rdquo;. Carrying forward a legacy of
            11+ years and the trust of 25,000+ successfully trained career aspirants.
          </p>
        </div>
      </section>

      {/* ========== WELCOME ========== */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="wrap">
          <ScrollReveal>
            <div className="section-head">
              <span className="eyebrow">
                <span className="dot" />
                Welcome
              </span>
              <h2 className="h-section" style={{ marginTop: '14px' }}>
                Welcome to <span className="squiggle">Skillversity.</span>
              </h2>
              <p className="lead" style={{ marginTop: '20px' }}>
                Skillversity is the manifestation of IMS — &ldquo;I&rsquo;m the Source&rdquo;,
                carrying forward a legacy of 11+ years of transforming lives and the trust of more
                than 25,000 successfully trained career aspirants.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== EMPOWERING 25,000+ CAREERS (split) ========== */}
      <section className="section" style={{ background: 'var(--cream)', paddingTop: 0 }}>
        <div className="wrap">
          <div className="about-split">
            <ScrollReveal>
              <span className="eyebrow">
                <span className="dot" />
                11 Years of Proven Excellence
              </span>
              <h2 className="h-section" style={{ marginTop: '16px' }}>
                Empowering <span style={{ color: 'var(--brand-pink)' }}>25,000+</span> Careers with
                11 Years of Proven Excellence.
              </h2>
              <p className="lead" style={{ marginTop: '18px' }}>
                Skillversity is the manifestation of IMS — &ldquo;I&rsquo;m the Source&rdquo;,
                carrying forward a legacy of 11+ years in transforming lives and the trust of more
                than 25,000 successfully trained career aspirants.
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2,1fr)',
                  gap: '12px',
                  marginTop: '28px',
                  maxWidth: '440px',
                }}
              >
                <div className="stat-box">
                  <div className="stat-num" style={{ color: 'var(--brand-pink)' }}>
                    25,000<sup style={{ fontSize: '.45em' }}>+</sup>
                  </div>
                  <div className="stat-lbl">Aspirants Trained</div>
                </div>
                <div className="stat-box">
                  <div className="stat-num" style={{ color: 'var(--brand-blue)' }}>
                    11<sup style={{ fontSize: '.45em' }}>+</sup>
                  </div>
                  <div className="stat-lbl">Years of Legacy</div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="about-photo">
                <MediaPlaceholder media={photos.campusExterior} label="Skillversity campus exterior photo" editUrl="/admin/globals/site-settings" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========== SKILLS THAT LAST A LIFETIME (reverse split, image collage left) ========== */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="wrap">
          <div className="about-split reverse">
            <ScrollReveal>
              <span className="eyebrow">
                <span className="dot" />
                Built for a Lifetime
              </span>
              <h2 className="h-section" style={{ marginTop: '16px' }}>
                Skillversity Builds Skills That <span className="squiggle">Last a Lifetime.</span>
              </h2>
              <p className="lead" style={{ marginTop: '18px' }}>
                In today&rsquo;s competitive world, a degree alone is not enough. Employers look for
                practical knowledge, workplace readiness, and adaptability. This is where
                Skillversity makes the difference — preparing students not just for their first job
                but for a lifetime of career and life success.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <div className="about-collage">
                <div>
                  <MediaPlaceholder media={photos.connectRoom} label="Connect room campus photo" editUrl="/admin/globals/site-settings" />
                </div>
                <div>
                  <MediaPlaceholder media={photos.coreValuesWall} label="Core values wall photo" editUrl="/admin/globals/site-settings" />
                </div>
                <div>
                  <MediaPlaceholder media={photos.purposePlaque} label="Purpose plaque photo" editUrl="/admin/globals/site-settings" />
                </div>
                <div>
                  <MediaPlaceholder media={photos.classroomInterior} label="Classroom interior photo" editUrl="/admin/globals/site-settings" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========== WHY SKILLVERSITY? ========== */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <ScrollReveal>
            <div className="section-head">
              <span className="eyebrow">
                <span className="dot" />
                Why Skillversity?
              </span>
              <h2 className="h-section" style={{ marginTop: '14px' }}>
                Why <span style={{ color: 'var(--brand-pink)' }}>Skillversity</span>?
              </h2>
              <p className="lead" style={{ marginTop: '18px' }}>
                Skillversity is not just another institute — it is a complete transformation
                platform for learners who want to stand out in the job market.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <ul className="check-list about-checklist" style={{ gap: '16px' }}>
              {whyPoints.map((p) => (
                <li key={p.title} style={{ fontSize: '16px', lineHeight: 1.6 }}>
                  <span>
                    <strong style={{ display: 'block', color: 'var(--ink)' }}>{p.title}</strong>
                    <span style={{ color: 'var(--ink-soft)', fontWeight: 500 }}>{p.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ========== WHAT WE DO (360° framework) ========== */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="wrap">
          <ScrollReveal>
            <div className="section-head">
              <span className="eyebrow">
                <span className="dot" />
                360° Success Framework
              </span>
              <h2 className="h-section" style={{ marginTop: '14px' }}>
                What We <span className="squiggle">Do.</span>
              </h2>
              <p className="lead" style={{ marginTop: '18px' }}>
                At Skillversity, students are trained under a 360° Success Framework that covers
                every dimension of growth.
              </p>
            </div>
          </ScrollReveal>
          <div className="g4">
            {framework.map((f) => (
              <ScrollReveal key={f.title}>
                <div className="card-inked" style={{ padding: '28px 24px' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      background: f.color,
                      color: '#fff',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '24px',
                      marginBottom: '16px',
                    }}
                  >
                    {f.icon}
                  </div>
                  <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{f.title}</h3>
                  <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: 1.65 }}>
                    {f.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== OUR EDGE ========== */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <ScrollReveal>
            <div className="section-head">
              <span className="eyebrow">
                <span className="dot" />
                Our Edge
              </span>
              <h2 className="h-section" style={{ marginTop: '14px' }}>
                Our <span className="squiggle">Edge.</span>
              </h2>
              <p className="lead" style={{ marginTop: '18px' }}>
                What sets Skillversity apart from the rest?
              </p>
            </div>
          </ScrollReveal>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <ul className="check-list about-edge" style={{ gap: '16px' }}>
              {edgePoints.map((p) => (
                <li key={p.title} style={{ fontSize: '16px', lineHeight: 1.6 }}>
                  <span>
                    <strong style={{ display: 'block', color: 'var(--ink)' }}>{p.title}</strong>
                    <span style={{ color: 'var(--ink-soft)', fontWeight: 500 }}>{p.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ========== OUR PROMISE ========== */}
      <section className="section" style={{ background: '#fff', paddingTop: '48px' }}>
        <div className="wrap">
          <ScrollReveal>
            <div className="section-head" style={{ marginBottom: '32px' }}>
              <span className="eyebrow">
                <span className="dot" />
                Our Promise
              </span>
            </div>
            <div className="promise-card">
              <h3 className="h-section" style={{ fontSize: 'clamp(22px,2.5vw,30px)', lineHeight: 1.35 }}>
                At Skillversity, we don&rsquo;t just prepare students for exams —{' '}
                <span style={{ color: 'var(--brand-pink)' }}>
                  we prepare them for careers, challenges, and life itself.
                </span>
              </h3>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== STOP STUDYING. START SKILLING. (Vision banner) ========== */}
      <section className="dark-sec section">
        <div className="wrap" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <ScrollReveal>
            <span className="eyebrow" style={{ display: 'inline-flex' }}>
              <span className="dot" />
              Our Vision
            </span>
            <h2
              className="h-section"
              style={{ color: '#fff', marginTop: '14px', fontSize: 'clamp(36px,6vw,68px)' }}
            >
              Stop Studying.{' '}
              <span style={{ color: 'var(--brand-yellow)' }}>Start Skilling.</span>
            </h2>
            <p
              className="lead"
              style={{ marginTop: '20px', fontSize: '18px', maxWidth: '640px', margin: '20px auto 0' }}
            >
              We make you <strong style={{ color: '#fff' }}>Job-Ready</strong>. We make you{' '}
              <strong style={{ color: '#fff' }}>Life-Ready</strong>.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== FOUNDER & BOARD OF DIRECTORS ========== */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <ScrollReveal>
            <div className="section-head">
              <span className="eyebrow">
                <span className="dot" />
                Leadership
              </span>
              <h2 className="h-section" style={{ marginTop: '14px' }}>
                Founder &amp; Board of <span className="squiggle">Directors.</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="g3">
            {founders.map((f: any, i: number) => {
              const accentVar = ACCENT[f.accent as string] || 'var(--brand-pink)'
              return (
                <ScrollReveal key={f.name || i}>
                  <div className="founder-card">
                    <div className="founder-photo">
                      <MediaPlaceholder media={f.image} label={`${f.name} photo`} shape="card" editUrl="/admin/globals/site-settings" />
                    </div>
                    <h3 style={{ fontSize: '19px', marginBottom: '4px' }}>{f.name}</h3>
                    <div
                      style={{
                        fontSize: '13.5px',
                        fontWeight: 700,
                        letterSpacing: '.06em',
                        textTransform: 'uppercase',
                        color: accentVar,
                      }}
                    >
                      {f.role}
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========== CORE VALUES ========== */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="wrap">
          <ScrollReveal>
            <div className="section-head">
              <span className="eyebrow">
                <span className="dot" />
                IMS Heritage
              </span>
              <h2 className="h-section" style={{ marginTop: '14px' }}>
                Core <span className="squiggle">Values.</span>
              </h2>
              <p className="lead" style={{ marginTop: '18px' }}>
                The values that guide every program, every mentor relationship, and every
                placement we make.
              </p>
            </div>
          </ScrollReveal>
          <div className="g3">
            <ScrollReveal>
              <div className="value-card">
                <div className="v-ico" style={{ background: 'rgba(255,31,92,.12)' }}>{values[0].icon}</div>
                <h3 style={{ fontSize: '17px', marginBottom: '8px', color: values[0].accent }}>
                  {values[0].title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                  {values[0].desc}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="ims-center-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '260px' }}>
                <div style={{ background: '#fff', borderRadius: '12px', padding: '12px 20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}>
                  <div style={{ position: 'relative', width: '180px', height: '56px' }}>
                    <Image
                      src="/ims-logo.png"
                      alt="IMS Logo"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
                <p
                  style={{
                    fontSize: '13.5px',
                    color: 'rgba(255,255,255,.85)',
                    lineHeight: 1.6,
                    marginTop: '4px',
                    maxWidth: '280px',
                    margin: '0 auto',
                  }}
                >
                  The institutional source behind Skillversity — 11 years, 25,000+ careers.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="value-card">
                <div className="v-ico" style={{ background: 'rgba(255,122,26,.12)' }}>{values[1].icon}</div>
                <h3 style={{ fontSize: '17px', marginBottom: '8px', color: values[1].accent }}>
                  {values[1].title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                  {values[1].desc}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="value-card">
                <div className="v-ico" style={{ background: 'rgba(192,64,160,.12)' }}>{values[2].icon}</div>
                <h3 style={{ fontSize: '17px', marginBottom: '8px', color: values[2].accent }}>
                  {values[2].title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                  {values[2].desc}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="value-card">
                <div className="v-ico" style={{ background: 'rgba(0,182,232,.12)' }}>{values[3].icon}</div>
                <h3 style={{ fontSize: '17px', marginBottom: '8px', color: values[3].accent }}>
                  {values[3].title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                  {values[3].desc}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="value-card">
                <div className="v-ico" style={{ background: 'rgba(26,61,184,.12)' }}>{values[4].icon}</div>
                <h3 style={{ fontSize: '17px', marginBottom: '8px', color: values[4].accent }}>
                  {values[4].title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                  {values[4].desc}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
