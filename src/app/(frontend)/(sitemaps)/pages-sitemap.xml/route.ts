import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const defaultSitemap = [
      { loc: `${SITE_URL}/`, lastmod: dateFallback },
      { loc: `${SITE_URL}/about`, lastmod: dateFallback },
      { loc: `${SITE_URL}/programs`, lastmod: dateFallback },
      { loc: `${SITE_URL}/programs/hospital-administration`, lastmod: dateFallback },
      { loc: `${SITE_URL}/programs/logistics-supply-chain`, lastmod: dateFallback },
      { loc: `${SITE_URL}/programs/oil-gas`, lastmod: dateFallback },
      { loc: `${SITE_URL}/programs/hr-management`, lastmod: dateFallback },
      { loc: `${SITE_URL}/placements`, lastmod: dateFallback },
      { loc: `${SITE_URL}/mentors`, lastmod: dateFallback },
      { loc: `${SITE_URL}/campus-life`, lastmod: dateFallback },
      { loc: `${SITE_URL}/admissions`, lastmod: dateFallback },
      { loc: `${SITE_URL}/blog`, lastmod: dateFallback },
      { loc: `${SITE_URL}/contact`, lastmod: dateFallback },
      { loc: `${SITE_URL}/skillfolio`, lastmod: dateFallback },
      { loc: `${SITE_URL}/blog/logistics-career-guide`, lastmod: dateFallback },
      { loc: `${SITE_URL}/blog/hospital-admin-guide`, lastmod: dateFallback },
      { loc: `${SITE_URL}/blog/oil-gas-gulf-jobs`, lastmod: dateFallback },
      { loc: `${SITE_URL}/blog/hr-management-career`, lastmod: dateFallback },
      { loc: `${SITE_URL}/blog/placement-success-stories`, lastmod: dateFallback },
      { loc: `${SITE_URL}/blog/skillfolio-explained`, lastmod: dateFallback },
      { loc: `${SITE_URL}/privacy`, lastmod: dateFallback },
    ]

    const sitemap = results.docs
      ? results.docs
          .filter((page) => Boolean(page?.slug))
          .map((page) => {
            return {
              loc: page?.slug === 'home' ? `${SITE_URL}/` : `${SITE_URL}/${page?.slug}`,
              lastmod: page.updatedAt || dateFallback,
            }
          })
      : []

    return [...defaultSitemap, ...sitemap]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
