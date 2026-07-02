import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LeadForm } from '@/components/skillversity/LeadForm'
import { defaultBlogPosts } from '@/skillversity/defaultContent'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildArticleSchema, buildBreadcrumbList } from '@/utilities/structuredData'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const posts = await payload.find({
      collection: 'posts',
      draft: false,
      limit: 100,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    })

    return posts.docs
      .filter((post) => post.slug)
      .map(({ slug }) => ({ slug: slug! }))
  } catch {
    // DB may not be seeded yet (first deploy) — return empty so pages are generated on-demand
    return defaultBlogPosts.map(({ slug }) => ({ slug }))
  }
}

export default async function BlogArticle({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  if (!post) {
    return notFound()
  }

  const postAny = post as any
  const categoryLabel = postAny.categoryLabel || postAny.cat || 'Blog'
  const categoryColor = postAny.categoryColor || postAny.catBg || 'var(--brand-blue)'
  const readTime = postAny.readTime || postAny.time || '5 min read'
  const publishedAt = postAny.publishedAt
  const heroImageUrl =
    postAny.meta?.image && typeof postAny.meta.image === 'object'
      ? postAny.meta.image.url || null
      : null
  const categoriesList: string[] = Array.isArray(postAny.categories)
    ? postAny.categories
        .map((c: any) => (typeof c === 'object' ? c?.title : null))
        .filter((x: unknown): x is string => typeof x === 'string')
    : []

  const articleSchema = buildArticleSchema({
    slug: post.slug || '',
    title: post.title,
    description: postAny.meta?.description || '',
    imageUrl: heroImageUrl,
    publishedAt,
    updatedAt: postAny.updatedAt,
    categories: categoriesList.length ? categoriesList : [categoryLabel],
  })

  const breadcrumbSchema = buildBreadcrumbList([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ])

  return (
    <>
      <JsonLd data={articleSchema} id={`article-${post.slug}-jsonld`} />
      <JsonLd data={breadcrumbSchema} id={`breadcrumb-${post.slug}-jsonld`} />
      {/* Hero */}
      <section className="page-hero cool">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="breadcrumb" style={{ color: 'rgba(255,255,255,.6)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,.8)' }}>Home</Link>
            <span>›</span>
            <Link href="/blog" style={{ color: 'rgba(255,255,255,.8)' }}>Blog</Link>
            <span>›</span>
            <span>{categoryLabel}</span>
          </div>
          <div style={{ display: 'inline-block', background: categoryColor, color: '#fff', padding: '5px 14px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', marginTop: '18px' }}>
            ● {categoryLabel} · {readTime} · {publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'May 2025'}
          </div>
          <h1 className="h-hero" style={{ color: '#fff', marginTop: '18px', maxWidth: '800px' }}>
            {post.title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,.75)', marginTop: '12px', fontSize: '15px' }}>
            By Skillversity Mentors · Updated {publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'May 2025'}
          </p>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="wrap">
          <div className="blog-article-grid">
            <article className="blog-content">
              {postAny.content ? (
                <RichText data={postAny.content} enableGutter={false} />
              ) : (
                <p>{postAny.body}</p>
              )}
            </article>

            <aside className="blog-sidebar">
              <LeadForm />
              <div style={{ marginTop: '28px', background: 'var(--cream)', borderRadius: 'var(--rad)', padding: '22px', border: '1px solid var(--border)' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '12px', color: 'var(--ink)' }}>📚 More Articles</h4>
                <Link href="/blog" style={{ color: 'var(--brand-blue)', fontWeight: 700, fontSize: '14px' }}>
                  ← Back to all articles
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  if (!post) {
    return {
      title: 'Blog | Skillversity Global',
    }
  }

  const postAny = post as any

  return {
    title: `${post.title} | Skillversity Blog`,
    description: postAny.excerpt || postAny.desc || postAny.meta?.description || `Read about ${post.title} on the Skillversity blog.`,
  }
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const fallback = defaultBlogPosts.find((post) => post.slug === slug)
  try {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'posts',
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

    return result.docs?.[0] || fallback || null
  } catch {
    return fallback || null
  }
})
