import type { Block } from 'payload'

export const PlacementsGallery: Block = {
  slug: 'placementsGallery',
  interfaceName: 'PlacementsGalleryBlock',
  labels: { singular: 'Placements Gallery', plural: 'Placements Galleries' },
  fields: [
    { name: 'hidden', type: 'checkbox', defaultValue: false, label: 'Hide this block on the page' },
    { name: 'bigNumber', type: 'text', defaultValue: '10141+' },
    { name: 'heading', type: 'text', defaultValue: 'Placements from 2014.' },
    { name: 'description', type: 'textarea', defaultValue: 'Hospital Administration, Logistics, Oil & Gas, and HR Management roles placed across leading employers in India and GCC — as featured in regional press.' },
    {
      name: 'pills',
      type: 'array',
      label: 'Badge Pills',
      fields: [{ name: 'label', type: 'text', required: true }],
      defaultValue: [
        { label: '617+ Company Connections' },
        { label: 'Dedicated Placement Team' },
        { label: '5-Year Career Mentorship' },
        { label: 'India + GCC Pathways' },
      ],
    },
    { name: 'primaryCtaLabel', type: 'text', defaultValue: 'View Full Placement Record →' },
    { name: 'primaryCtaUrl', type: 'text', defaultValue: '/contact' },
    { name: 'secondaryCtaLabel', type: 'text', defaultValue: '📥 Download Report' },
    { name: 'secondaryCtaUrl', type: 'text', defaultValue: '/contact?action=brochure' },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Cream', value: 'cream' },
      ],
    },
    { name: 'galleryCaption', type: 'text', defaultValue: 'A few of our graduates →' },
    { name: 'statCardNum', type: 'text', defaultValue: '+10130' },
    { name: 'statCardLabel', type: 'text', defaultValue: 'more alumni working across India & GCC' },
  ],
}
