import type { GlobalConfig } from 'payload'

import { adminOrEditor } from '@/access/roles'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer Navigation',
  admin: {
    group: 'Skillversity',
    livePreview: {
      url: ({ req }) => {
        const base = req?.payload?.config?.serverURL || ''
        return `${base}/`
      },
    },
    preview: () => '/',
  },
  access: {
    read: () => true,
    update: adminOrEditor,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
