import { test, expect } from '@playwright/test'

const collectJsonLd = async (page: import('@playwright/test').Page): Promise<unknown[]> => {
  return page.$$eval('script[type="application/ld+json"]', (els) =>
    els
      .map((el) => {
        try {
          return JSON.parse(el.textContent || '')
        } catch {
          return null
        }
      })
      .filter(Boolean),
  )
}

const findByType = (blocks: unknown[], type: string): Record<string, unknown> | undefined =>
  blocks.find(
    (b): b is Record<string, unknown> =>
      Boolean(b) && typeof b === 'object' && (b as Record<string, unknown>)['@type'] === type,
  )

test.describe('SEO — structured data', () => {
  test('home renders EducationalOrganization JSON-LD with AggregateRating', async ({ page }) => {
    await page.goto('/')
    const blocks = await collectJsonLd(page)
    const org = findByType(blocks, 'EducationalOrganization')
    expect(org, 'EducationalOrganization JSON-LD missing on home').toBeTruthy()
    expect(org!.name).toBe('Skillversity Global')
    expect(org!.address).toBeTruthy()
    const agg = org!.aggregateRating as Record<string, unknown> | undefined
    expect(agg, 'aggregateRating missing on EducationalOrganization').toBeTruthy()
    expect(agg!['@type']).toBe('AggregateRating')
    expect(agg!.ratingValue).toBeTruthy()
    expect(agg!.reviewCount).toBeTruthy()
    expect(agg!.bestRating).toBe('5')
  })

  test('program detail renders Course + BreadcrumbList + FAQPage JSON-LD', async ({ page }) => {
    await page.goto('/programs/hospital-administration')
    const blocks = await collectJsonLd(page)

    const course = findByType(blocks, 'Course')
    expect(course, 'Course JSON-LD missing').toBeTruthy()
    expect(course!.name).toContain('Hospital Administration')
    expect(course!.provider).toBeTruthy()
    expect(Array.isArray(course!.hasCourseInstance)).toBe(true)

    const crumbs = findByType(blocks, 'BreadcrumbList')
    expect(crumbs, 'BreadcrumbList JSON-LD missing').toBeTruthy()
    const items = (crumbs!.itemListElement as Array<{ name: string }>) || []
    expect(items.map((i) => i.name)).toEqual(['Home', 'Programs', 'Hospital Administration'])

    const faq = findByType(blocks, 'FAQPage')
    expect(faq, 'FAQPage JSON-LD missing').toBeTruthy()
    expect(Array.isArray(faq!.mainEntity)).toBe(true)
    expect((faq!.mainEntity as unknown[]).length).toBeGreaterThan(0)
  })

  test('blog post renders BlogPosting + BreadcrumbList JSON-LD', async ({ page }) => {
    await page.goto('/blog/dollar-and-sense-the-financial-forecast')
    const blocks = await collectJsonLd(page)

    const article = findByType(blocks, 'BlogPosting')
    expect(article, 'BlogPosting JSON-LD missing').toBeTruthy()
    expect(article!.headline).toBeTruthy()
    expect(article!.publisher).toBeTruthy()

    const crumbs = findByType(blocks, 'BreadcrumbList')
    expect(crumbs, 'BreadcrumbList JSON-LD missing').toBeTruthy()
    const items = (crumbs!.itemListElement as Array<{ name: string }>) || []
    expect(items[0].name).toBe('Home')
    expect(items[1].name).toBe('Blog')
  })

  test('sitemap.xml lists static, program, and blog routes', async ({ request }) => {
    const res = await request.get('/sitemap.xml')
    expect(res.status()).toBe(200)
    const xml = await res.text()
    // Static routes
    expect(xml).toContain('/programs</loc>')
    expect(xml).toContain('/mentors</loc>')
    expect(xml).toContain('/placements</loc>')
    expect(xml).toContain('/about</loc>')
    expect(xml).toContain('/campus-life</loc>')
    expect(xml).toContain('/blog</loc>')
    // At least one program detail and one blog post should appear
    expect(xml).toMatch(/\/programs\/[a-z-]+<\/loc>/)
    expect(xml).toMatch(/\/blog\/[a-z0-9-]+<\/loc>/)
  })

  test('robots.txt points at the sitemap and disallows admin/api', async ({ request }) => {
    const res = await request.get('/robots.txt')
    expect(res.status()).toBe(200)
    const txt = await res.text()
    expect(txt).toContain('Disallow: /admin/')
    expect(txt).toContain('Disallow: /api/')
    expect(txt).toMatch(/Sitemap:.*\/sitemap\.xml/)
  })

  test('llms.txt is served with markdown structure and lists programs', async ({ request }) => {
    const res = await request.get('/llms.txt')
    expect(res.status()).toBe(200)
    expect(res.headers()['content-type']).toContain('text/plain')
    const body = await res.text()
    // Required structure per llmstxt.org
    expect(body.startsWith('# Skillversity Global')).toBe(true)
    expect(body).toMatch(/^>\s/m) // a blockquote summary line
    expect(body).toContain('## Programs')
    expect(body).toContain('## Key Pages')
    expect(body).toContain('## Contact')
    // Lists at least one program (the seeded "Hospital Administration")
    expect(body).toMatch(/-\s\[.*Hospital Administration.*\]\(http/)
    // Lists the key static pages
    expect(body).toContain('/placements')
    expect(body).toContain('/mentors')
    expect(body).toContain('/campus-life')
  })
})
