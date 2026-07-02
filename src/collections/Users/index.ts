import type { CollectionConfig } from 'payload'

import { adminOnly, canAccessAdmin } from '../../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: canAccessAdmin,
    create: adminOnly,
    delete: adminOnly,
    read: adminOnly,
    update: adminOnly,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'admin',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      admin: {
        description: 'Admins manage users and settings. Editors manage website content.',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
