import { createLocalReq, getPayload } from 'payload'
import { seed } from '@/endpoints/seed'
import config from '@payload-config'
import { headers } from 'next/headers'

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

// GET handler — works without auth for initial seeding on fresh databases
export async function GET(): Promise<Response> {
  const payload = await getPayload({ config })

  // Check if users already exist — if so, block unauthenticated seeding
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
  })

  if (existingUsers.totalDocs > 0) {
    return new Response('Database already seeded. Use POST with authentication to re-seed.', {
      status: 403,
    })
  }

  try {
    const payloadReq = await createLocalReq({}, payload)
    await seed({ payload, req: payloadReq })
    return Response.json({ success: true, message: 'Database seeded successfully! Visit /admin to login.' })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding data' })
    return new Response('Error seeding data.', { status: 500 })
  }
}

// POST handler — requires authentication (for re-seeding)
export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    const payloadReq = await createLocalReq({ user }, payload)
    await seed({ payload, req: payloadReq })
    return Response.json({ success: true })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding data' })
    return new Response('Error seeding data.', { status: 500 })
  }
}
