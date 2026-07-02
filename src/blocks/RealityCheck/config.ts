import type { Block } from 'payload'

export const RealityCheck: Block = {
  slug: 'realityCheck',
  interfaceName: 'RealityCheckBlock',
  labels: { singular: 'Reality Check', plural: 'Reality Check Sections' },
  fields: [
    { name: 'hidden', type: 'checkbox', defaultValue: false, label: 'Hide this block on the page' },
    { name: 'eyebrow', type: 'text', defaultValue: 'Student Reality Check' },
    { name: 'headline', type: 'text', required: true, defaultValue: 'You have the degree.' },
    { name: 'highlight', type: 'text', defaultValue: 'But are you really job-ready?' },
    { name: 'description', type: 'textarea', defaultValue: 'Many students graduate with certificates, yet feel completely stuck the moment real interviews and workplace pressure show up. Skillversity closes that gap — permanently.' },
    {
      name: 'painPoints',
      type: 'array',
      label: 'Pain Points (left column)',
      defaultValue: [
        { item: 'Degree in hand but no job-relevant practical skills' },
        { item: 'Interview confidence crumbles under real pressure' },
        { item: 'Resumes sent weekly — zero callbacks received' },
        { item: 'No experience — the classic hiring catch-22' },
        { item: 'Career path unclear, every decision delayed' },
      ],
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    { name: 'cardTape', type: 'text', defaultValue: 'Skillversity closes this gap' },
    { name: 'cardHeading', type: 'text', defaultValue: 'Job Ready. Life Ready. Future Ready.' },
    { name: 'cardBody', type: 'textarea', defaultValue: 'A complete transformation — real projects, industry mentors, confidence training, structured placement support. From day one.' },
    {
      name: 'cardItems',
      type: 'array',
      label: 'Card Items (right column)',
      defaultValue: [
        { item: 'Real workplace projects from week one' },
        { item: '43 mentors with 30+ years of industry experience' },
        { item: '5-year career mentorship post-placement' },
        { item: 'India + GCC pathways in every program' },
      ],
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    { name: 'ctaLabel', type: 'text', defaultValue: '📞 Book Free Counselling Call' },
    { name: 'ctaUrl', type: 'text', defaultValue: '/contact' },
  ],
}
