import type { Block } from 'payload'

export const CampusLife: Block = {
  slug: 'campusLife',
  interfaceName: 'CampusLifeBlock',
  fields: [
    { name: 'hidden', type: 'checkbox', defaultValue: false, label: 'Hide this block on the page' },
    { name: 'eyebrow', type: 'text', defaultValue: 'Campus Life · Kochi' },
    { name: 'title', type: 'text', defaultValue: 'A campus that looks like work.' },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Cohorts of 30, mentor-led practicals, live employer drives, and a 24×7 placement cell — see what a job-ready campus feels like.',
    },
    {
      type: 'row',
      fields: [
        { name: 'ctaLabel', type: 'text', defaultValue: 'Walk through campus life →' },
        { name: 'ctaUrl', type: 'text', defaultValue: '/campus-life' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Bento Grid Items',
      maxRows: 7,
      admin: {
        description:
          'Up to 7 items rendered in a bento grid. Fill in label + image. The first 7 follow a fixed layout (large, wide, medium, tall, small, small, small).',
        initCollapsed: true,
      },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Image (optional)' },
        { name: 'label', type: 'text', required: true, label: 'Caption shown over the image' },
        { name: 'placeholderLabel', type: 'text', label: 'Placeholder text suffix when no image (e.g. "classroom photo" — rendered as "Drop a classroom photo")' },
      ],
    },
  ],
  labels: { plural: 'Campus Life', singular: 'Campus Life' },
}
