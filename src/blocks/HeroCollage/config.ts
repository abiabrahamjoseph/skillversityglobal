import type { Block } from 'payload'

export const HeroCollage: Block = {
  slug: 'heroCollage',
  interfaceName: 'HeroCollageBlock',
  labels: { singular: 'Hero (Collage)', plural: 'Hero Sections' },
  fields: [
    { name: 'hidden', type: 'checkbox', defaultValue: false, label: 'Hide this block on the page' },
    { name: 'eyebrow', type: 'text', defaultValue: "India's First Job-Ready Campus · Kochi, Kerala · Established 2020" },
    { name: 'headline', type: 'text', required: true, defaultValue: 'Stop studying.' },
    { name: 'highlight', type: 'text', defaultValue: 'Start skilling.' },
    { name: 'description', type: 'textarea', defaultValue: 'Industry-led 10–12 month programs in Hospital Administration, Logistics & Supply Chain, Oil & Gas, and HR Management — built around real workplace skills, 43 industry mentors, and structured placement support for India and GCC careers.' },
    { name: 'primaryCtaLabel', type: 'text', defaultValue: '📞 Book Free Counselling Call' },
    { name: 'primaryCtaUrl', type: 'text', defaultValue: '/contact' },
    { name: 'secondaryCtaLabel', type: 'text', defaultValue: '🎯 Career Fit Test' },
    { name: 'secondaryCtaUrl', type: 'text', defaultValue: '/contact?action=test' },
    { name: 'whatsappLabel', type: 'text', defaultValue: '💬 WhatsApp' },
    { name: 'whatsappUrl', type: 'text', defaultValue: 'https://wa.me/919946033355?text=Hi%20Skillversity' },
    { name: 'rating', type: 'text', defaultValue: '4.7/5 · 498 student reviews · 15-min call · completely free' },
    { name: 'showStats', type: 'checkbox', defaultValue: true, admin: { description: 'Show the 4 mini stat boxes below the rating (uses Site Settings stats).' } },
  ],
}
