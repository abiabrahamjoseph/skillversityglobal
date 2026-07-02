import type { GlobalConfig } from 'payload'

import { adminOrEditor } from '@/access/roles'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header Navigation',
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
      maxRows: 10,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
