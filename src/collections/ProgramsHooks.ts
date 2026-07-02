import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Program } from '@/payload-types'

export const revalidateProgram: CollectionAfterChangeHook<Program> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/programs/${doc.slug}`

    payload.logger.info(`Revalidating program at path: ${path}`)

    revalidatePath('/programs')
    revalidatePath(path)
    revalidateTag('pages-sitemap', 'max')

    if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
      revalidatePath(`/programs/${previousDoc.slug}`)
    }
  }

  return doc
}

export const revalidateProgramDelete: CollectionAfterDeleteHook<Program> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath('/programs')
    revalidatePath(`/programs/${doc?.slug}`)
    revalidateTag('pages-sitemap', 'max')
  }

  return doc
}
