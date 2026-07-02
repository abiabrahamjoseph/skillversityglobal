import type { MetadataRoute } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { getServerSideURL } from '@/utilities/getURL'

// Dynamic sitemap covering: static narrative pages, all active programs,
// all published blog posts, and the CMS Pages collection. Generated at request
// time so newly published docs appear without a redeploy.

const staticRoutes: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/programs', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/placements', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/mentors', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/campus-life', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/admissions', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/skillfolio', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.2 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getServerSideURL().replace(/\/$/, '')
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  let programEntries: MetadataRoute.Sitemap = []
  let postEntries: MetadataRoute.Sitemap = []
  let pageEntries: MetadataRoute.Sitemap = []

  try {
    const payload = await getPayload({ config: configPromise })

    const [programs, posts, pages] = await Promise.all([
      payload.find({
        collection: 'programs',
        draft: false,
        limit: 200,
        pagination: false,
        select: { slug: true, updatedAt: true },
        where: { status: { not_equals: 'inactive' } },
      }),
      payload.find({
        collection: 'posts',
        draft: false,
        limit: 500,
        pagination: false,
        select: { slug: true, updatedAt: true, publishedAt: true },
        where: { _status: { equals: 'published' } },
      }),
      payload.find({
        collection: 'pages',
        draft: false,
        limit: 200,
        pagination: false,
        select: { slug: true, updatedAt: true },
        where: { _status: { equals: 'published' } },
      }),
    ])

    programEntries = programs.docs
      .filter((p) => Boolean(p.slug))
      .map((p) => ({
        url: `${base}/programs/${p.slug}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
        changeFrequency: 'monthly',
        priority: 0.9,
      }))

    postEntries = posts.docs
      .filter((p) => Boolean(p.slug))
      .map((p) => ({
        url: `${base}/blog/${p.slug}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
        changeFrequency: 'monthly',
        priority: 0.6,
      }))

    pageEntries = pages.docs
      .filter((p) => Boolean(p.slug))
      .filter((p) => p.slug !== 'home')
      .filter((p) => !staticRoutes.some((r) => r.path === `/${p.slug}`))
      .map((p) => ({
        url: `${base}/${p.slug}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
        changeFrequency: 'monthly',
        priority: 0.5,
      }))
  } catch {
    // DB unreachable — return static entries only so build still succeeds.
  }

  // Deduplicate by URL just in case
  const all = [...staticEntries, ...programEntries, ...postEntries, ...pageEntries]
  const seen = new Set<string>()
  return all.filter((entry) => {
    if (seen.has(entry.url)) return false
    seen.add(entry.url)
    return true
  })
}
