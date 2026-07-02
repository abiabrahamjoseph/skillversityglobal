import type { Post, ArchiveBlock as ArchiveBlockProps, Media as MediaType } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'

import { Media } from '@/components/Media'
import { ScrollReveal } from '@/components/skillversity/ScrollReveal'

type Props = ArchiveBlockProps & {
  id?: string
  eyebrow?: string | null
  title?: string | null
  description?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
}

const categoryColors: Record<string, string> = {
  Logistics: 'var(--brand-blue)',
  'Logistics & Supply Chain': 'var(--brand-blue)',
  Healthcare: 'var(--brand-cyan)',
  'Hospital Administration': 'var(--brand-cyan)',
  'Oil & Gas': 'var(--brand-red)',
  Energy: 'var(--brand-red)',
  HR: 'var(--brand-magenta)',
  'HR Management': 'var(--brand-magenta)',
  'Career Guide': 'var(--brand-orange)',
}

export const ArchiveBlock: React.FC<Props> = async (props) => {
  const {
    categories,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    eyebrow,
    title,
    description,
    ctaLabel,
    ctaUrl,
  } = props

  const limit = limitFromProps || 3
  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })
    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })
    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 2,
      limit,
      sort: '-publishedAt',
      ...(flattenedCategories && flattenedCategories.length > 0
        ? { where: { categories: { in: flattenedCategories } } }
        : {}),
    })
    posts = fetchedPosts.docs
  } else if (selectedDocs?.length) {
    const filteredSelectedPosts = selectedDocs.map((post) => {
      if (typeof post.value === 'object') return post.value
    }) as Post[]
    posts = filteredSelectedPosts
  }

  if (!posts.length) return null

  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="wrap">
        <ScrollReveal className="section-head">
          <span className="eyebrow"><span className="dot" />{eyebrow || 'Knowledge Hub'}</span>
          <h2 className="h-section" style={{ marginTop: '14px' }}>{title || 'From our knowledge hub.'}</h2>
          {description && <p className="lead">{description}</p>}
        </ScrollReveal>

        <div className="g3" style={{ gap: '24px' }}>
          {posts.map((post) => {
            const firstCat = Array.isArray(post.categories) && post.categories.length
              ? (typeof post.categories[0] === 'object' ? post.categories[0].title : null)
              : null
            const catColor = firstCat ? categoryColors[firstCat] || 'var(--ink)' : 'var(--ink)'
            const metaImage = post.meta?.image
            const desc = post.meta?.description?.replace(/\s/g, ' ')
            const readMin = Math.max(3, Math.ceil(((post.meta?.description?.length) || 600) / 200))
            return (
              <ScrollReveal key={post.id}>
                <Link href={`/blog/${post.slug}`} className="blog-card">
                  <div className="blog-card-media">
                    {metaImage && typeof metaImage !== 'string' ? (
                      <Media resource={metaImage as MediaType} size="33vw" />
                    ) : (
                      <div className="blog-card-no-image">No image</div>
                    )}
                    {firstCat && <span className="blog-card-tag" style={{ background: catColor }}>{firstCat}</span>}
                  </div>
                  <div className="blog-card-body">
                    <h3>{post.title}</h3>
                    {desc && <p>{desc}</p>}
                    <div className="blog-card-meta">
                      <span>{readMin} min read</span>
                      <span className="dot-sep">·</span>
                      <span>{firstCat || 'Article'}</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link href={ctaUrl || '/blog'} className="btn btn-dark btn-lg">{ctaLabel || 'View All Articles →'}</Link>
        </div>
      </div>
    </section>
  )
}
