import type { Block } from 'payload'

export const StatsRow: Block = {
  slug: 'statsRow',
  interfaceName: 'StatsRowBlock',
  labels: { singular: 'Stats Row', plural: 'Stats Rows' },
  fields: [
    { name: 'hidden', type: 'checkbox', defaultValue: false, label: 'Hide this block on the page' },
    { name: 'eyebrow', type: 'text', defaultValue: 'India\'s First Job-Ready Campus' },
    { name: 'title', type: 'text', defaultValue: 'Numbers that prove placement-readiness.' },
    { name: 'description', type: 'textarea' },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'siteSettings',
      options: [
        { label: 'Pull from Site Settings stats', value: 'siteSettings' },
        { label: 'Custom stats below', value: 'custom' },
      ],
      admin: { description: 'Use the global Site Settings stats, or define custom stats for this block instance.' },
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Custom Stats',
      admin: {
        condition: (_, siblingData) => siblingData?.source === 'custom',
      },
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'e.g. "1845+"' } },
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "Placements in 2025"' } },
        { name: 'description', type: 'textarea', admin: { description: 'Optional secondary line under the label' } },
        {
          name: 'color',
          type: 'select',
          defaultValue: 'pink',
          options: [
            { label: 'Pink', value: 'pink' },
            { label: 'Blue', value: 'blue' },
            { label: 'Orange', value: 'orange' },
            { label: 'Cyan', value: 'cyan' },
            { label: 'Yellow', value: 'yellow' },
          ],
        },
      ],
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Cream', value: 'cream' },
      ],
    },
  ],
}
