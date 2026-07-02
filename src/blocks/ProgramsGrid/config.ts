import type { Block } from 'payload'

export const ProgramsGrid: Block = {
  slug: 'programsGrid',
  interfaceName: 'ProgramsGridBlock',
  labels: { singular: 'Programs Grid', plural: 'Programs Grids' },
  fields: [
    { name: 'hidden', type: 'checkbox', defaultValue: false, label: 'Hide this block on the page' },
    { name: 'eyebrow', type: 'text', defaultValue: 'Career Programs' },
    { name: 'title', type: 'text', defaultValue: 'Four industry-led programs. One job-ready campus.' },
    { name: 'description', type: 'textarea', defaultValue: 'Every program is built around real workplace skills, expert mentors, India & GCC alignment, and structured placement support — so you graduate ready to work, not just qualified to apply.' },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Compare All Programs in Detail →' },
    { name: 'ctaUrl', type: 'text', defaultValue: '/programs' },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '4',
      options: [
        { label: '2 columns', value: '2' },
        { label: '4 columns', value: '4' },
      ],
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'gridPaper',
      options: [
        { label: 'Grid paper (default)', value: 'gridPaper' },
        { label: 'White', value: 'white' },
        { label: 'Cream', value: 'cream' },
      ],
    },
  ],
}
