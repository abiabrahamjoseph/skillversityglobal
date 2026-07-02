// llms.txt — emerging convention for AI/LLM crawlers (ChatGPT, Claude, Perplexity,
// Gemini, etc.) to discover and cite a site efficiently. Spec: https://llmstxt.org/
//
// Generated dynamically so newly published programs and blog posts appear without
// a redeploy. Falls back to a minimal listing if the DB is unreachable.

import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { getServerSideURL } from '@/utilities/getURL'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const escape = (s: string) => s.replace(/[\r\n]+/g, ' ').trim()

export async function GET() {
  const base = getServerSideURL().replace(/\/$/, '')
  const lines: string[] = []

  lines.push('# Skillversity Global')
  lines.push('')
  lines.push(
    '> India\'s First Job-Ready Campus, Kochi (Kerala). Industry-led 10-12 month career programs in Hospital Administration, Logistics & Supply Chain, Oil & Gas, and HR Management — built around real workplace skills, 43 industry mentors, and structured placement support for India and GCC careers.',
  )
  lines.push('')
  lines.push('Established 2020 · 10,141+ placements from 2014 · 2,000+ hiring partners across India and the Gulf.')
  lines.push('')

  lines.push('## Programs')
  lines.push('')
  let programLines: string[] = []
  let postLines: string[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const programs = await payload.find({
      collection: 'programs',
      draft: false,
      limit: 50,
      pagination: false,
      sort: 'sortOrder',
      select: { title: true, slug: true, shortDescription: true, heroDescription: true, duration: true, eligibility: true },
      where: { status: { not_equals: 'inactive' } },
    })
    programLines = programs.docs
      .filter((p) => Boolean(p.title) && Boolean(p.slug))
      .map((p) => {
        const desc = escape(p.heroDescription || p.shortDescription || `${p.title} — career program at Skillversity Global.`)
        const meta = [p.duration && `Duration: ${p.duration}`, p.eligibility && `Eligibility: ${p.eligibility}`].filter(Boolean).join(' · ')
        return `- [${p.title}](${base}/programs/${p.slug}): ${desc}${meta ? ` (${meta})` : ''}`
      })

    const posts = await payload.find({
      collection: 'posts',
      draft: false,
      depth: 1,
      limit: 30,
      pagination: false,
      sort: '-publishedAt',
      select: { title: true, slug: true, meta: true, publishedAt: true, categories: true },
      where: { _status: { equals: 'published' } },
    })
    postLines = posts.docs
      .filter((p) => Boolean(p.title) && Boolean(p.slug))
      .map((p) => {
        const desc = escape(p.meta?.description || `${p.title} — Skillversity blog.`)
        return `- [${p.title}](${base}/blog/${p.slug}): ${desc}`
      })
  } catch {
    // DB unreachable — fall back to minimal listing
  }

  if (programLines.length === 0) {
    programLines = [
      `- [Hospital Administration](${base}/programs/hospital-administration): Train across patient services, billing, NABH quality, Hospital Information Systems, and team coordination — ready for leading hospitals in India and the Gulf.`,
      `- [Logistics & Supply Chain](${base}/programs/logistics-supply-chain): Master warehousing, shipping, procurement, customs clearance, and ERP systems for India's e-commerce boom and Gulf logistics infrastructure.`,
      `- [Oil & Gas](${base}/programs/oil-gas): Safety-first technical career across refinery, piping, offshore — QA/QC, NDT, HSE, inspection.`,
      `- [HR Management](${base}/programs/hr-management): Next-gen HR professional — recruitment, payroll, analytics, HRIS, employee engagement.`,
    ]
  }

  lines.push(...programLines)
  lines.push('')

  lines.push('## Key Pages')
  lines.push('')
  lines.push(`- [Placements](${base}/placements): 10,141+ alumni placed from 2014 across hospitals, logistics, oil & gas, and HR roles in India and the GCC.`)
  lines.push(`- [Industry Mentors](${base}/mentors): 43 mentors with 30+ years across hospitals, ports, refineries and corporate HR — actively working in the industries we train for.`)
  lines.push(`- [Campus Life](${base}/campus-life): Cohorts of 30, mentor-led practicals, live employer drives, and a 24×7 placement cell in Kochi, Kerala.`)
  lines.push(`- [About](${base}/about): Skillversity Global — India's First Job-Ready Campus. We provide the skills, you build the empire.`)
  lines.push(`- [Admissions](${base}/admissions): Process and eligibility for joining a Skillversity program.`)
  lines.push(`- [Contact](${base}/contact): Book a free 15-minute counselling call. +91 99460 33355 · info@skillversityglobal.com`)
  lines.push('')

  if (postLines.length > 0) {
    lines.push('## Blog')
    lines.push('')
    lines.push(...postLines)
    lines.push('')
  }

  lines.push('## Contact')
  lines.push('')
  lines.push('- Phone / WhatsApp: +91 99460 33355')
  lines.push('- Email: info@skillversityglobal.com')
  lines.push('- Address: First Floor, Pattarumadom Building, Chittoor Rd, North Kaloor, Kochi, Kerala 682018, India')
  lines.push(`- Website: ${base}`)
  lines.push('')

  const body = lines.join('\n')
  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=3600',
    },
  })
}
