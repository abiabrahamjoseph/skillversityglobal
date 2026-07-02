import type { Block } from 'payload'

export const CertificationsGrid: Block = {
  slug: 'certificationsGrid',
  interfaceName: 'CertificationsGridBlock',
  labels: { singular: 'Certifications Grid', plural: 'Certifications Grids' },
  fields: [
    { name: 'hidden', type: 'checkbox', defaultValue: false, label: 'Hide this block on the page' },
    { name: 'eyebrow', type: 'text', defaultValue: 'Global Recognition' },
    { name: 'title', type: 'text', defaultValue: 'Internationally Recognised. Locally Relevant.' },
    {
      name: 'theme',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark (default)', value: 'dark' },
        { label: 'Light', value: 'light' },
      ],
    },
  ],
}
