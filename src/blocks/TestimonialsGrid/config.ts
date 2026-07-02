import type { Block } from 'payload'

export const TestimonialsGrid: Block = {
  slug: 'testimonialsGrid',
  interfaceName: 'TestimonialsGridBlock',
  labels: { singular: 'Testimonials Grid', plural: 'Testimonials Grids' },
  fields: [
    { name: 'hidden', type: 'checkbox', defaultValue: false, label: 'Hide this block on the page' },
    { name: 'eyebrow', type: 'text', defaultValue: 'Student Voices' },
    { name: 'title', type: 'text', defaultValue: 'Students feel the difference.' },
    { name: 'description', type: 'textarea', defaultValue: 'The strongest feedback is about confidence, practical learning, and the feeling that Skillversity is a launchpad — not just an institution.' },
    {
      name: 'featuredOnly',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Only show testimonials marked Featured in the Testimonials collection.' },
    },
    { name: 'maxCount', type: 'number', defaultValue: 6 },
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
