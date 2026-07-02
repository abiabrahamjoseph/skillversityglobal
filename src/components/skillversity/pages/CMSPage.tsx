import React from 'react'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { CTASection } from '@/components/skillversity/CTASection'
import { LeadForm } from '@/components/skillversity/LeadForm'
import { ScrollReveal } from '@/components/skillversity/ScrollReveal'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { HomePageClient } from './HomePageClient'
import {
  defaultCerts,
  defaultCompanies,
  defaultPages,
  defaultPrograms,
  defaultStats,
  type SkillversityStructuredPage,
} from '@/skillversity/defaultContent'

type Props = {
  slug: keyof typeof defaultPages | string
}

const getStructuredPage = async (slug: string): Promise<SkillversityStructuredPage> => {
  const fallback = defaultPages[slug] || defaultPages.home

  try {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    const page = result.docs?.[0] as any
    if (!page) return fallback

    return {
      slug: page.slug || fallback.slug,
      title: page.title || fallback.title,
      template: page.template || fallback.template,
      layout: page.layout || null,
      skillversity: {
        ...fallback.skillversity,
        ...(page.skillversity || {}),
        hero: {
          ...fallback.skillversity.hero,
          ...(page.skillversity?.hero || {}),
        },
      },
    }
  } catch {
    return fallback
  }
}

const getHomeData = async (page: SkillversityStructuredPage) => {
  let programs: any[] = []
  let testimonials: any[] = []
  let settings: any = null

  try {
    const payload = await getPayload({ config: configPromise })

    const [programsResult, testimonialsResult, siteSettings] = await Promise.all([
      payload.find({
        collection: 'programs',
        limit: 10,
        sort: 'sortOrder',
        where: { status: { equals: 'active' } },
      }),
      payload.find({
        collection: 'testimonials',
        limit: 10,
        sort: 'sortOrder',
        where: { featured: { equals: true } },
      }),
      payload.findGlobal({ slug: 'site-settings' }),
    ])

    programs = programsResult.docs
    testimonials = testimonialsResult.docs
    settings = siteSettings
  } catch {
    // Fall back to built-in starter content until the CMS has been synced.
  }

  const stats = settings?.stats || defaultStats
  const companies = settings?.hiringCompanies?.length
    ? settings.hiringCompanies.map((c: any) => c.name)
    : defaultCompanies
  const certs = settings?.certifications?.length ? settings.certifications : defaultCerts

  const programCards = programs.length > 0
    ? programs.map((program: any) => ({
        href: `/programs/${program.slug}`,
        bg: program.cardGradient,
        tag: program.tag,
        tagBg: program.tagColor,
        title: program.title,
        desc: program.shortDescription,
        dur: program.duration,
        elig: program.eligibility,
        color: program.accentColor,
        image: program.cardImage,
      }))
    : defaultPrograms.map((program) => ({
        href: `/programs/${program.slug}`,
        bg: program.cardGradient,
        tag: program.tag,
        tagBg: program.tagColor,
        title: program.title,
        desc: program.shortDescription,
        dur: program.duration,
        elig: program.eligibility,
        color: program.accentColor,
        image: null,
      }))

  const testimonialCards = testimonials.length > 0
    ? testimonials.map((testimonial: any) => ({
        q: testimonial.quote,
        name: testimonial.studentName,
        role: `${testimonial.role} · ${testimonial.company}`,
        init: testimonial.initials,
        color: testimonial.accentColor,
      }))
    : []

  const hero = page.skillversity.hero

  const heroCollage = Array.isArray(settings?.heroCollage) ? settings.heroCollage : []

  return {
    stats,
    companies,
    certs,
    programCards,
    testimonialCards,
    heroCollage,
    heroHeadline: hero.title || settings?.heroHeadline || defaultPages.home.skillversity.hero.title,
    heroHighlight: hero.highlight || settings?.heroHighlight || defaultPages.home.skillversity.hero.highlight || '',
    heroDescription: hero.description || settings?.heroDescription || defaultPages.home.skillversity.hero.description || '',
  }
}

const heroClass = (theme?: string) => {
  if (theme === 'cool') return 'page-hero cool'
  if (theme === 'dark') return 'page-hero'
  return 'page-hero'
}

const heroStyle = (theme?: string): React.CSSProperties | undefined => {
  if (theme === 'warm') return { background: 'linear-gradient(135deg,#FFE8E8,#FFF4D6)' }
  if (theme === 'light') return { background: 'var(--cream)' }
  return undefined
}

const StructuredPage: React.FC<{ page: SkillversityStructuredPage }> = ({ page }) => {
  const { skillversity } = page
  const hero = skillversity.hero
  const isDarkHero = hero.theme === 'cool' || hero.theme === 'dark'

  return (
    <>
      <section className={heroClass(hero.theme)} style={heroStyle(hero.theme)}>
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="breadcrumb" style={isDarkHero ? { color: 'rgba(255,255,255,.6)' } : undefined}>
            <Link href="/" style={isDarkHero ? { color: 'rgba(255,255,255,.82)' } : undefined}>Home</Link>
            <span>›</span>
            <span>{page.title}</span>
          </div>
          {hero.eyebrow && (
            <span
              className="eyebrow"
              style={isDarkHero ? { background: 'rgba(255,255,255,.12)', borderColor: 'rgba(255,255,255,.3)', color: '#fff' } : undefined}
            >
              <span className="dot" />
              {hero.eyebrow}
            </span>
          )}
          <h1 className="h-hero" style={{ color: isDarkHero ? '#fff' : undefined, marginTop: '18px' }}>
            {hero.title}
            {hero.highlight && (
              <>
                <br />
                <span style={{ color: isDarkHero ? 'var(--brand-yellow)' : 'var(--brand-pink)' }}>{hero.highlight}</span>
              </>
            )}
          </h1>
          {hero.description && (
            <p
              style={{
                color: isDarkHero ? 'rgba(255,255,255,.78)' : 'var(--ink-soft)',
                fontSize: '17px',
                lineHeight: 1.65,
                marginTop: '18px',
                maxWidth: '680px',
              }}
            >
              {hero.description}
            </p>
          )}
          {(hero.primaryCtaLabel || hero.secondaryCtaLabel) && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '28px' }}>
              {hero.primaryCtaLabel && hero.primaryCtaUrl && (
                <Link href={hero.primaryCtaUrl} className="btn btn-brand btn-lg" style={{ flexGrow: 1, minWidth: '280px', justifyContent: 'center' }}>{hero.primaryCtaLabel}</Link>
              )}
              {hero.secondaryCtaLabel && hero.secondaryCtaUrl && (
                <Link href={hero.secondaryCtaUrl} className={isDarkHero ? 'btn btn-ghost-white btn-lg' : 'btn btn-dark btn-lg'} style={{ flexGrow: 1, minWidth: '280px', justifyContent: 'center' }}>
                  {hero.secondaryCtaLabel}
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {skillversity.stats?.length ? (
        <section className="section--sm" style={{ background: '#fff', borderBottom: '1px solid var(--line)' }}>
          <div className="wrap g3">
            {skillversity.stats.map((stat, index) => (
              <div className="stat-box" key={index}>
                <div className="stat-num" style={{ color: stat.color || 'var(--brand-blue)' }}>{stat.value}</div>
                <div className="stat-lbl">{stat.label}</div>
                {stat.description && <p style={{ color: 'var(--ink-soft)', fontSize: '13px', marginTop: '6px' }}>{stat.description}</p>}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {skillversity.featureCards?.length ? (
        <section className="section grid-paper">
          <div className="wrap">
            <div className="g3">
              {skillversity.featureCards.map((card, index) => (
                <ScrollReveal key={index}>
                  <div className="card">
                    {card.icon && <div style={{ fontSize: '30px', marginBottom: '12px' }}>{card.icon}</div>}
                    <h3 style={{ color: card.color || 'var(--brand-blue)', fontSize: '18px', marginBottom: '8px' }}>{card.title}</h3>
                    <p style={{ color: 'var(--ink-soft)', fontSize: '14.5px' }}>{card.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {skillversity.contentSections?.map((section, index) => (
        <section className="section" style={{ background: index % 2 === 0 ? 'var(--cream)' : '#fff' }} key={index}>
          <div className="wrap">
            <ScrollReveal className="section-head">
              {section.eyebrow && <span className="eyebrow"><span className="dot" />{section.eyebrow}</span>}
              <h2 className="h-section" style={{ marginTop: '14px' }}>{section.title}</h2>
              {section.description && <p className="lead">{section.description}</p>}
            </ScrollReveal>
            {section.items?.length ? (
              <div className="g3">
                {section.items.map((item, itemIndex) => (
                  <div className="card" key={itemIndex}>
                    <h3 style={{ fontSize: '17px', marginBottom: '8px' }}>{item.title}</h3>
                    {item.description && <p style={{ color: 'var(--ink-soft)', fontSize: '14.5px' }}>{item.description}</p>}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ))}

      {skillversity.steps?.length ? (
        <section className="section" style={{ background: 'var(--cream)' }}>
          <div className="wrap">
            <ScrollReveal className="section-head">
              <span className="eyebrow"><span className="dot" />Process</span>
              <h2 className="h-section" style={{ marginTop: '14px' }}>How it works</h2>
            </ScrollReveal>
            <div className="g3">
              {skillversity.steps.map((step, index) => (
                <div className="card" key={index}>
                  <div className="stat-num" style={{ color: 'var(--brand-pink)', fontSize: '34px' }}>{index + 1}</div>
                  <h3 style={{ fontSize: '18px', margin: '8px 0' }}>{step.title}</h3>
                  <p style={{ color: 'var(--ink-soft)', fontSize: '14.5px' }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {(page.template === 'contact' || page.template === 'admissions') && (
        <section className="section" style={{ background: '#fff' }}>
          <div className="wrap" style={{ maxWidth: '760px' }}>
            <LeadForm />
          </div>
        </section>
      )}

      {skillversity.faqs?.length ? (
        <section className="section" style={{ background: '#fff' }}>
          <div className="wrap">
            <ScrollReveal className="section-head">
              <span className="eyebrow"><span className="dot" />FAQs</span>
              <h2 className="h-section" style={{ marginTop: '14px' }}>Common Questions</h2>
            </ScrollReveal>
            <div style={{ margin: '0 auto', maxWidth: '760px' }}>
              {skillversity.faqs.map((faq, index) => (
                <details className="faq-item" key={index}>
                  <summary>{faq.question}</summary>
                  <div className="faq-body">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.template !== 'contact' && <CTASection />}
    </>
  )
}

export const CMSPage = async ({ slug }: Props) => {
  const page = await getStructuredPage(slug)

  // template='custom' → admin-managed block builder layout (Layout field)
  if (page.template === 'custom' && Array.isArray(page.layout) && page.layout.length > 0) {
    return <RenderBlocks blocks={page.layout as any} />
  }

  // template='home' (or slug='home' with no CMS row) → bespoke HomePageClient
  if (page.template === 'home' || (slug === 'home' && page.template !== 'custom')) {
    const data = await getHomeData(page)
    return <HomePageClient {...data} />
  }

  return <StructuredPage page={page} />
}
