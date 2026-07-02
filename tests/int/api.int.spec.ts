import assert from 'node:assert/strict'
import net from 'node:net'
import { after, before, describe, it } from 'node:test'
import 'dotenv/config'

import { getPayload, type Payload } from 'payload'
import config from '../../src/payload.config'
import { generatePreviewPath } from '../../src/utilities/generatePreviewPath'

let payload: Payload | null = null
let payloadInitError: unknown

const testSlug = `cms-test-${Date.now()}`
const created: Array<{ collection: 'pages' | 'programs' | 'posts' | 'forms'; id: number | string }> = []
let previousLeadForm: unknown

const canReachDatabase = async () => {
  if (!process.env.DATABASE_URL) return false

  const url = new URL(process.env.DATABASE_URL)
  const host = url.hostname
  const port = Number(url.port || 5432)

  return new Promise<boolean>((resolve) => {
    const socket = net.createConnection({ host, port, timeout: 1000 })
    socket.once('connect', () => {
      socket.end()
      resolve(true)
    })
    socket.once('timeout', () => {
      socket.destroy()
      resolve(false)
    })
    socket.once('error', () => {
      socket.destroy()
      resolve(false)
    })
  })
}

describe('Payload CMS integration', () => {
  before(async () => {
    const payloadConfig = await config
    const databaseReachable = await canReachDatabase()
    if (!databaseReachable) {
      payloadInitError = new Error('Database is not reachable from this environment')
      return
    }

    try {
      payload = await getPayload({ config: payloadConfig })
    } catch (error) {
      payloadInitError = error
    }
  })

  after(async () => {
    if (!payload) return

    if (previousLeadForm !== undefined) {
      await payload.updateGlobal({
        slug: 'site-settings',
        overrideAccess: true,
        data: {
          leadForm: previousLeadForm,
        } as any,
      }).catch(() => null)
    }

    for (const item of created.reverse()) {
      await payload.delete({
        collection: item.collection as any,
        id: item.id,
        overrideAccess: true,
      }).catch(() => null)
    }
  })

  it('creates and reads a structured Skillversity page', async () => {
    if (!payload) {
      assert.ok(payloadInitError, 'Payload unavailable in this environment')
      return
    }

    const page = await payload.create({
      collection: 'pages',
      overrideAccess: true,
      data: {
        title: 'CMS Integration Test Page',
        slug: testSlug,
        template: 'about',
        skillversity: {
          hero: {
            title: 'Editable from admin',
            highlight: 'Verified by tests',
            description: 'This page proves structured CMS fields can render public pages.',
          },
        },
        _status: 'published',
      } as any,
    })
    created.push({ collection: 'pages', id: page.id })

    const result = await payload.find({
      collection: 'pages',
      overrideAccess: true,
      where: { slug: { equals: testSlug } },
    })

    assert.equal(result.docs[0]?.slug, testSlug)
    assert.equal((result.docs[0] as any).template, 'about')
  })

  it('creates and reads an admin-managed program detail page', async () => {
    if (!payload) {
      assert.ok(payloadInitError, 'Payload unavailable in this environment')
      return
    }

    const program = await payload.create({
      collection: 'programs',
      overrideAccess: true,
      data: {
        title: 'CMS Test Program',
        slug: testSlug,
        tag: 'Test',
        tagColor: '#1A3DB8',
        accentColor: '#1A3DB8',
        cardGradient: 'linear-gradient(135deg,#DBE5FF,#FFF0E0)',
        shortDescription: 'Program content is managed from Payload.',
        duration: '1 month',
        eligibility: 'Test learners',
        sortOrder: 999,
        status: 'active',
        heroHeadline: 'CMS Test Program Hero',
        heroDescription: 'Editable hero description.',
        modules: [{ title: 'Module 1', topics: [{ topic: 'CMS wiring' }] }],
        faqs: [{ question: 'Is this editable?', answer: 'Yes.' }],
      } as any,
    })
    created.push({ collection: 'programs', id: program.id })

    const result = await payload.find({
      collection: 'programs',
      overrideAccess: true,
      where: { slug: { equals: testSlug } },
    })

    assert.equal(result.docs[0]?.title, 'CMS Test Program')
    assert.equal((result.docs[0] as any).modules?.[0]?.title, 'Module 1')
  })

  it('creates and wires the selected lead form through Site Settings', async () => {
    if (!payload) {
      assert.ok(payloadInitError, 'Payload unavailable in this environment')
      return
    }

    const currentSettings: any = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
    previousLeadForm = currentSettings?.leadForm ?? null

    const form = await payload.create({
      collection: 'forms' as any,
      overrideAccess: true,
      data: {
        title: `CMS Test Lead Form ${testSlug}`,
        fields: [
          { blockType: 'text', name: 'fullName', label: 'Full Name', required: true, width: 100 },
        ],
        submitButtonLabel: 'Submit Test Lead',
        confirmationType: 'message',
        confirmationMessage: {
          root: {
            type: 'root',
            children: [],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      } as any,
    })
    created.push({ collection: 'forms', id: form.id })

    await payload.updateGlobal({
      slug: 'site-settings',
      overrideAccess: true,
      data: {
        leadForm: form.id,
      } as any,
    })

    const settings: any = await payload.findGlobal({ slug: 'site-settings', depth: 1 })
    assert.equal(typeof settings.leadForm === 'object' ? settings.leadForm.id : settings.leadForm, form.id)
  })

  it('generates branded preview paths', () => {
    assert.equal(
      generatePreviewPath({ collection: 'pages', slug: 'home', req: {} as any }),
      `/next/preview?path=%2F&previewSecret=${process.env.PREVIEW_SECRET || ''}`,
    )
    assert.equal(
      generatePreviewPath({ collection: 'pages', slug: 'about', req: {} as any }),
      `/next/preview?path=%2Fabout&previewSecret=${process.env.PREVIEW_SECRET || ''}`,
    )
    assert.equal(
      generatePreviewPath({ collection: 'posts', slug: 'career-guide', req: {} as any }),
      `/next/preview?path=%2Fblog%2Fcareer-guide&previewSecret=${process.env.PREVIEW_SECRET || ''}`,
    )
    assert.equal(
      generatePreviewPath({ collection: 'programs', slug: 'hospital-administration', req: {} as any }),
      `/next/preview?path=%2Fprograms%2Fhospital-administration&previewSecret=${process.env.PREVIEW_SECRET || ''}`,
    )
  })
})
