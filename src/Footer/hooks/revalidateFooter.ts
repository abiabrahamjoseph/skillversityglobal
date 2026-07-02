import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    revalidatePath('/')
    revalidateTag('global_footer', 'max')
  }

  return doc
}
