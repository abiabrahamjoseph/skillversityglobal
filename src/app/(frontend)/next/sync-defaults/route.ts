import { createLocalReq, getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'

import { contactForm as contactFormData } from '@/endpoints/seed/contact-form'
import { defaultBlogPosts, defaultPages, defaultPrograms } from '@/skillversity/defaultContent'

export const maxDuration = 60

const textToLexical = (text: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  const req = await createLocalReq({ user }, payload)
  const created: string[] = []

  let leadFormID: number | string | undefined

  const existingForms = await payload.find({
    collection: 'forms',
    limit: 1,
    where: {
      title: {
        equals: contactFormData.title,
      },
    },
  })

  if (existingForms.docs[0]?.id) {
    leadFormID = existingForms.docs[0].id
  } else {
    const form = await payload.create({
      collection: 'forms',
      data: contactFormData as any,
      req,
    })
    leadFormID = form.id
    created.push('forms:counselling-call-enquiry')
  }

  for (const page of Object.values(defaultPages)) {
    const existing = await payload.find({
      collection: 'pages',
      limit: 1,
      where: {
        slug: {
          equals: page.slug,
        },
      },
    })

    if (!existing.docs.length) {
      await payload.create({
        collection: 'pages',
        data: {
          title: page.title,
          slug: page.slug,
          template: page.template,
          skillversity: page.skillversity,
          _status: 'published',
        } as any,
        req,
      })
      created.push(`pages:${page.slug}`)
    }
  }

  for (const [index, program] of defaultPrograms.entries()) {
    const existing = await payload.find({
      collection: 'programs',
      limit: 1,
      where: {
        slug: {
          equals: program.slug,
        },
      },
    })

    if (!existing.docs.length) {
      await payload.create({
        collection: 'programs',
        data: {
          ...program,
          sortOrder: index + 1,
          status: 'active',
          heroHeadline: program.title,
          heroDescription: program.shortDescription,
          market: 'India + GCC',
        } as any,
        req,
      })
      created.push(`programs:${program.slug}`)
    }
  }

  for (const post of defaultBlogPosts) {
    const existing = await payload.find({
      collection: 'posts',
      limit: 1,
      where: {
        slug: {
          equals: post.slug,
        },
      },
    })

    if (!existing.docs.length) {
      await payload.create({
        collection: 'posts',
        data: {
          title: post.title,
          slug: post.slug,
          categoryLabel: post.cat,
          categoryColor: post.catBg,
          cardGradient: post.bg,
          cardIcon: post.icon,
          excerpt: post.desc,
          readTime: post.time,
          content: textToLexical(post.body),
          publishedAt: new Date().toISOString(),
          _status: 'published',
        } as any,
        req,
      })
      created.push(`posts:${post.slug}`)
    }
  }

  const settings: any = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
  if (!settings?.leadForm && leadFormID) {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        ...settings,
        leadForm: leadFormID,
      },
      req,
    })
    created.push('globals:site-settings.leadForm')
  }

  return Response.json({
    success: true,
    created,
    message: created.length ? 'Default Skillversity content synced.' : 'No missing default content found.',
  })
}
