import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

export const revalidateSiteSettings: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating Skillversity site settings')

    revalidatePath('/')
    revalidatePath('/programs')
    revalidatePath('/about')
    revalidatePath('/admissions')
    revalidatePath('/contact')
    revalidatePath('/placements')
    revalidatePath('/mentors')
    revalidatePath('/campus-life')
    revalidatePath('/skillfolio')
    revalidatePath('/privacy')
  }

  return doc
}
