import type { Metadata } from 'next'

import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import './skillversity.css'
import { getServerSideURL } from '@/utilities/getURL'
import { SkillversityHeader } from '@/components/skillversity/Header'
import { SkillversityFooter } from '@/components/skillversity/Footer'
import { MobileBar } from '@/components/skillversity/MobileBar'
import { WhatsAppFloat } from '@/components/skillversity/WhatsAppFloat'
import { Analytics } from '@/components/Analytics'
import { MetaPixel } from '@/components/MetaPixel'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { defaultContact, defaultPrograms, defaultSocial } from '@/skillversity/defaultContent'

const defaultHeaderNav = [
  { label: 'Home', href: '/' },
  { label: 'Programs', href: '/programs' },
  { label: 'Placements', href: '/placements' },
  { label: 'Mentors', href: '/mentors' },
  { label: 'Campus Life', href: '/campus-life' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

const defaultFooterNav = [
  { label: 'Placements', href: '/placements' },
  { label: 'Mentors', href: '/mentors' },
  { label: 'Campus Life', href: '/campus-life' },
  { label: 'About Us', href: '/about' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Skillfolio', href: '/skillfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

const resolveNavLink = (item: any) => {
  const link = item?.link
  if (!link?.label) return null

  if (link.type === 'custom' && link.url) {
    return { label: link.label, href: link.url, newTab: Boolean(link.newTab) }
  }

  const reference = link.reference
  const relationTo = reference?.relationTo
  const value = reference?.value
  const slug = typeof value === 'object' ? value?.slug : null

  if (!slug) return null

  if (relationTo === 'posts') {
    return { label: link.label, href: `/blog/${slug}`, newTab: Boolean(link.newTab) }
  }

  return { label: link.label, href: slug === 'home' ? '/' : `/${slug}`, newTab: Boolean(link.newTab) }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  // Fetch CMS data for header/footer
  let contact = defaultContact
  let social = defaultSocial
  let footerTagline = "India's First Job-Ready Campus. We provide the skills — you build the empire. Premium career-training for students who want practical learning, confidence, and structured placement support."
  let programs = defaultPrograms.map((program) => ({
    title: program.title,
    slug: program.slug,
    color: program.accentColor,
  }))
  let headerNavItems = defaultHeaderNav
  let footerNavItems = defaultFooterNav
  let googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID || ''
  let metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || ''
  let rating: { value: string; count: string } = { value: '4.7', count: '498' }

  try {
    const payload = await getPayload({ config: configPromise })

    const [settings, header, footer]: any[] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings', depth: 2 }),
      payload.findGlobal({ slug: 'header', depth: 2 }),
      payload.findGlobal({ slug: 'footer', depth: 2 }),
    ])
    if (settings?.contact) {
      const c = settings.contact
      contact = {
        phone: c.phone || defaultContact.phone,
        phoneLink: c.phoneLink || defaultContact.phoneLink,
        email: c.email || defaultContact.email,
        whatsapp: c.whatsapp || defaultContact.whatsapp,
        website: c.website || defaultContact.website,
        address: c.address || defaultContact.address,
      }
    }
    if (settings?.social) {
      const s = settings.social
      social = {
        instagram: s.instagram || '',
        facebook: s.facebook || '',
        linkedin: s.linkedin || '',
        youtube: s.youtube || '',
      }
    }
    if ((settings as any)?.footerTagline) {
      footerTagline = (settings as any).footerTagline
    }
    if (settings?.analytics?.googleAnalyticsId) {
      googleAnalyticsId = settings.analytics.googleAnalyticsId
    }
    if (settings?.analytics?.metaPixelId) {
      metaPixelId = settings.analytics.metaPixelId
    }
    if ((settings as any)?.rating) {
      const r = (settings as any).rating
      rating = {
        value: typeof r.value === 'string' && r.value ? r.value : rating.value,
        count: typeof r.count === 'string' && r.count ? r.count : rating.count,
      }
    }

    const resolvedHeaderNav = header?.navItems?.map(resolveNavLink).filter(Boolean)
    if (resolvedHeaderNav?.length) {
      headerNavItems = resolvedHeaderNav
    }

    const resolvedFooterNav = footer?.navItems?.map(resolveNavLink).filter(Boolean)
    if (resolvedFooterNav?.length) {
      footerNavItems = resolvedFooterNav
    }

    const programsResult = await payload.find({
      collection: 'programs',
      limit: 10,
      sort: 'sortOrder',
      where: { status: { equals: 'active' } },
      select: { title: true, slug: true, accentColor: true },
    })
    if (programsResult.docs.length > 0) {
      programs = programsResult.docs.map((p: any) => ({
        title: p.title,
        slug: p.slug,
        color: p.accentColor || '#1A3DB8',
      }))
    }
  } catch {
    // CMS unavailable — use defaults
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Manrope:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap"
          rel="stylesheet"
        />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'Skillversity Global',
              description:
                "Skillversity Global — Educational institution in Kerala. India's First Job-Ready Campus offering industry-led career programs in Hospital Administration, Logistics & Supply Chain, Oil & Gas, and HR Management.",
              url: contact.website,
              telephone: contact.phone,
              email: contact.email,
              foundingDate: '2020',
              address: {
                '@type': 'PostalAddress',
                streetAddress:
                  'First Floor, Pattarumadom Building, Chittoor Rd, North Kaloor, Kacheripady',
                addressLocality: 'Kochi',
                addressRegion: 'Kerala',
                postalCode: '682018',
                addressCountry: 'IN',
              },
              sameAs: [social.instagram, social.facebook, social.linkedin, social.youtube].filter(Boolean),
              numberOfEmployees: { '@type': 'QuantitativeValue', value: 180 },
              alumni: {
                '@type': 'QuantitativeValue',
                name: 'Students Placed',
                value: 10141,
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: rating.value,
                reviewCount: rating.count,
                bestRating: '5',
                worstRating: '1',
              },
            }),
          }}
        />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <div className="brand-strip" />
          <SkillversityHeader
            phone={contact.phone}
            phoneLink={contact.phoneLink}
            programs={programs}
            navItems={headerNavItems}
          />
          <main>{children}</main>
          <SkillversityFooter
            phone={contact.phone}
            phoneLink={contact.phoneLink}
            email={contact.email}
            website={contact.website}
            address={contact.address}
            tagline={footerTagline}
            social={social}
            programs={programs}
            navItems={footerNavItems}
          />
          <MobileBar />
          <WhatsAppFloat phoneLink={contact.phoneLink} whatsapp={contact.whatsapp} />
          <Analytics googleAnalyticsId={googleAnalyticsId} />
          <MetaPixel pixelId={metaPixelId} />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: "Skillversity Global | India's First Job-Ready Campus | Kochi, Kerala",
    template: '%s | Skillversity Global',
  },
  description:
    "Skillversity Global — India's First Job-Ready Campus in Kochi. 10141+ placements from 2014. Programs in Hospital Administration, Logistics, Oil & Gas, HR Management.",
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
