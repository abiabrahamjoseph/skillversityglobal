import type { CollectionConfig } from 'payload'

import { adminOrEditor } from '../access/roles'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'studentName',
    description: 'Manage student testimonials displayed on the homepage and other pages.',
    defaultColumns: ['studentName', 'role', 'company', 'featured'],
    group: 'Skillversity',
  },
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    read: () => true,
    update: adminOrEditor,
  },
  fields: [
    {
      name: 'studentName',
      type: 'text',
      required: true,
      label: 'Student Name',
    },
    {
      name: 'initials',
      type: 'text',
      required: true,
      label: 'Initials',
      admin: { description: 'e.g. "NL" for Nikitha Lal — shown in avatar circle' },
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Job Role',
      admin: { description: 'e.g. "Sales Executive"' },
    },
    {
      name: 'company',
      type: 'text',
      required: true,
      label: 'Company',
      admin: { description: 'e.g. "JFS Logistics"' },
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Testimonial Quote',
      admin: { description: 'The student\'s actual testimonial text' },
    },
    {
      name: 'accentColor',
      type: 'text',
      required: true,
      defaultValue: 'var(--brand-blue)',
      label: 'Avatar Color',
      admin: { description: 'CSS color for the avatar circle, e.g. "var(--brand-pink)"' },
    },
    {
      name: 'program',
      type: 'relationship',
      relationTo: 'programs',
      label: 'Program',
      admin: { description: 'Which program this student graduated from' },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Student Photo',
      admin: { description: 'Optional: student photo for testimonial card' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured on Homepage',
      admin: { description: 'Check to show this testimonial on the homepage' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      label: 'Display Order',
    },
  ],
}
