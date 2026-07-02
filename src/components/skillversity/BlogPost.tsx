import React from 'react'
import Link from 'next/link'
import { LeadForm } from './LeadForm'
import { ScrollReveal } from './ScrollReveal'

interface RelatedLink {
  href: string
  label: string
}

interface BlogPostProps {
  category: string
  categoryColor: string
  readTime: string
  title: string
  author?: string
  date?: string
  children: React.ReactNode
  relatedLinks: RelatedLink[]
  programLink?: { href: string; label: string }
}

export const BlogPost: React.FC<BlogPostProps> = ({
  category,
  categoryColor,
  readTime,
  title,
  author = 'Skillversity Mentors',
  date = 'May 2025',
  children,
  relatedLinks,
  programLink,
}) => {
  return (
    <>
      <section className="page-hero cool">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="breadcrumb" style={{ color: 'rgba(255,255,255,.6)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,.7)' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,.4)' }}>›</span>
            <Link href="/blog" style={{ color: 'rgba(255,255,255,.7)' }}>Blog</Link>
            <span style={{ color: 'rgba(255,255,255,.4)' }}>›</span>
            <span>{category}</span>
          </div>
          <span
            className="eyebrow"
            style={{ background: 'rgba(255,255,255,.1)', borderColor: categoryColor, color: categoryColor }}
          >
            <span className="dot" />{category} · {readTime} · {date}
          </span>
          <h1 className="h-hero" style={{ color: '#fff', marginTop: '18px', maxWidth: '760px' }}>
            {title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,.8)', marginTop: '14px', fontSize: '16px' }}>
            By {author} · Updated {date}
          </p>
        </div>
      </section>

      <article style={{ background: '#fff', padding: '72px 0' }}>
        <div className="wrap blog-article-grid">
          <ScrollReveal>
            <div className="blog-content">
              {children}

              {/* Related articles */}
              <div style={{ borderTop: '1.5px solid var(--line)', paddingTop: '28px', marginTop: '36px' }}>
                <p style={{ fontSize: '14px', color: 'var(--ink-mute)', fontWeight: 600 }}>Related Articles</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                  {relatedLinks.map((link, i) => (
                    <Link key={i} href={link.href} style={{ color: 'var(--brand-blue)', fontWeight: 700, fontSize: '15.5px' }}>
                      → {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Sidebar */}
          <div className="blog-sidebar">
            <ScrollReveal>
              <LeadForm />
            </ScrollReveal>
            {programLink && (
              <ScrollReveal>
                <div style={{ background: 'var(--ice)', borderRadius: 'var(--rad)', padding: '20px', marginTop: '20px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--ink-mute)', marginBottom: '14px' }}>Quick Links</p>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <Link href={programLink.href} style={{ fontWeight: 600, fontSize: '14px', color: 'var(--brand-blue)' }}>→ {programLink.label}</Link>
                    <Link href="/placements" style={{ fontWeight: 600, fontSize: '14px', color: 'var(--brand-blue)' }}>→ Placement Record</Link>
                    <Link href="/admissions" style={{ fontWeight: 600, fontSize: '14px', color: 'var(--brand-blue)' }}>→ How to Apply</Link>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </article>
    </>
  )
}
