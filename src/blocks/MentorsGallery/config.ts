import type { Block } from 'payload'

export const MentorsGallery: Block = {
  slug: 'mentorsGallery',
  interfaceName: 'MentorsGalleryBlock',
  labels: { singular: 'Mentors Gallery', plural: 'Mentors Galleries' },
  fields: [
    { name: 'hidden', type: 'checkbox', defaultValue: false, label: 'Hide this block on the page' },
    { name: 'eyebrow', type: 'text', defaultValue: 'Industry Mentors' },
    { name: 'title', type: 'text', required: true, defaultValue: 'Learn from people who hire.' },
    { name: 'description', type: 'textarea', defaultValue: '43 mentors with 30+ years across hospitals, ports, refineries and corporate HR — actively working in the industries you’re training for.' },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'cream',
      options: [
        { label: 'Cream', value: 'cream' },
        { label: 'White', value: 'white' },
      ],
    },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Meet All 43 Mentors →' },
    { name: 'ctaUrl', type: 'text', defaultValue: '/contact' },
  ],
}
