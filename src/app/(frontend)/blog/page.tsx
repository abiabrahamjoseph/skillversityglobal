import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ScrollReveal } from '@/components/skillversity/ScrollReveal'
import { CTASection } from '@/components/skillversity/CTASection'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { defaultBlogPosts } from '@/skillversity/defaultContent'

export const metadata: Metadata = {
  title: 'Blog & Career Insights | Skillversity Global',
  description: 'Career guides, industry news, placement stories, and expert advice from Skillversity Global. Learn about Hospital Admin, Logistics, Oil & Gas, and HR careers.',
}

export default async function BlogPage() {
  // Fetch CMS posts
  let cmsPosts: Array<{
    href: string
    bg: string
    icon: string
    cat: string
    catBg: string
    title: string
    desc: string
    time: string
    image?: string | null
  }> = []

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'posts',
      draft: false,
      limit: 50,
      overrideAccess: false,
      sort: '-publishedAt',
      where: {
        _status: { equals: 'published' },
      },
    })

    cmsPosts = result.docs.map((post) => ({
      href: `/blog/${post.slug}`,
      bg: (post as any).cardGradient || 'linear-gradient(135deg,#1A3DB8,#00B6E8)',
      icon: (post as any).cardIcon || '📝',
      cat: (post as any).categoryLabel || 'Blog',
      catBg: (post as any).categoryColor || '#1A3DB8',
      title: post.title,
      desc: (post as any).excerpt || '',
      time: (post as any).readTime || '5 min read',
      image: (post as any).heroImage && typeof (post as any).heroImage === 'object'
        ? (post as any).heroImage.url || null
        : (post as any).meta?.image && typeof (post as any).meta.image === 'object'
        ? (post as any).meta.image.url || null
        : null,
    }))
  } catch {
    // CMS unavailable — fall through to static posts
  }

  // Merge: CMS posts first, then static fallbacks (excluding any with matching slugs)
  const cmsHrefs = new Set(cmsPosts.map((p) => p.href))
  const fallbackPosts = defaultBlogPosts.filter((p) => !cmsHrefs.has(p.href))
  const allPosts = [...cmsPosts, ...fallbackPosts]

  return (
    <>
      <section className="page-hero cool">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="breadcrumb" style={{ color: 'rgba(255,255,255,.6)' }}><Link href="/" style={{ color: 'rgba(255,255,255,.8)' }}>Home</Link><span>›</span><span>Blog</span></div>
          <span className="eyebrow" style={{ background: 'rgba(255,255,255,.12)', borderColor: 'rgba(255,255,255,.3)', color: '#fff' }}><span className="dot" />Knowledge Hub</span>
          <h1 className="h-hero" style={{ color: '#fff', marginTop: '18px' }}>Career insights.<br /><span style={{ color: 'var(--brand-yellow)' }}>Industry intelligence.</span></h1>
        </div>
      </section>

      <section className="section grid-paper">
        <div className="wrap">
          <div className="g3">
            {allPosts.map((b, i) => (
              <ScrollReveal key={i}>
                <Link href={b.href} className="blog-card">
                  <div className="blog-thumb" style={b.image ? { position: 'relative', overflow: 'hidden' } : { background: b.bg }}>
                    {b.image ? (
                      <Image
                        src={b.image}
                        alt={b.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      b.icon
                    )}
                  </div>
                  <div className="blog-body">
                    <span className="cat" style={{ background: b.catBg }}>{b.cat}</span>
                    <h3>{b.title}</h3>
                    <p>{b.desc}</p>
                    <div className="blog-meta"><span>{b.time}</span></div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  )
}
