import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { contactForm as contactFormData } from './contact-form'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'
import { seedSkillversityData } from './skillversity-data'
import { defaultPages } from '@/skillversity/defaultContent'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
  'programs',
  'testimonials',
]

const globals: GlobalSlug[] = ['header', 'footer', 'site-settings']

// Skillversity-specific blog categories
const categories = ['Healthcare', 'Logistics', 'Oil & Gas', 'HR Management', 'Career Guidance', 'Placements']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding Skillversity database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        } as any,
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Creating admin user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'admin@skillversityglobal.com',
      },
    },
  })

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
  ])

  const [adminUser, image1Doc, image2Doc, image3Doc, imageHomeDoc] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'Skillversity Admin',
        email: 'admin@skillversityglobal.com',
        password: 'skillversity2026',
        role: 'admin',
      } as any,
    }),
    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image3Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),
    categories.map((category) =>
      payload.create({
        collection: 'categories',
        data: {
          title: category,
          slug: category.toLowerCase().replace(/[&\s]+/g, '-'),
        },
      }),
    ),
  ])

  payload.logger.info(`— Seeding blog posts...`)

  // Create posts sequentially to maintain order
  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post1({ heroImage: image1Doc, blockImage: image2Doc, author: adminUser }),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post2({ heroImage: image2Doc, blockImage: image3Doc, author: adminUser }),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post3({ heroImage: image3Doc, blockImage: image1Doc, author: adminUser }),
  })

  // Update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    context: {
      disableRevalidate: true,
    },
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    context: {
      disableRevalidate: true,
    },
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    context: {
      disableRevalidate: true,
    },
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
  })

  payload.logger.info(`— Seeding counselling form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData as any,
  })

  payload.logger.info(`— Seeding pages...`)

  const pageDocs = await Promise.all(
    Object.values(defaultPages).map((page) =>
      payload.create({
        collection: 'pages',
        depth: 0,
        context: {
          disableRevalidate: true,
        },
        data: {
          title: page.title,
          slug: page.slug,
          template: page.template,
          skillversity: page.skillversity,
          _status: 'published',
        } as any,
      }),
    ),
  )
  const contactPage = pageDocs.find((page) => page.slug === 'contact') || pageDocs[0]

  payload.logger.info(`— Seeding header & footer navigation...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      context: {
        disableRevalidate: true,
      },
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Programs',
              url: '/programs',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Placements',
              url: '/placements',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Mentors',
              url: '/mentors',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Blog',
              url: '/blog',
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: {
                relationTo: 'pages',
                value: contactPage.id,
              },
            },
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      context: {
        disableRevalidate: true,
      },
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'About Us',
              url: '/about',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Campus Life',
              url: '/campus-life',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Admissions',
              url: '/admissions',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Skillfolio',
              url: '/skillfolio',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Instagram',
              newTab: true,
              url: 'https://www.instagram.com/skillversity.global',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'WhatsApp',
              newTab: true,
              url: 'https://wa.me/919946033355',
            },
          },
        ],
      },
    }),
  ])

  // Seed Skillversity-specific data
  await seedSkillversityData(payload, contactForm.id)

  payload.logger.info('✅ Skillversity database seeded successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
