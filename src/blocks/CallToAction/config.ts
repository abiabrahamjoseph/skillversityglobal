import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    { name: 'hidden', type: 'checkbox', defaultValue: false, label: 'Hide this block on the page' },
    { name: 'eyebrow', type: 'text', defaultValue: 'Take the Next Step' },
    { name: 'headline', type: 'text', defaultValue: 'Ready to build your' },
    {
      name: 'highlight',
      type: 'text',
      defaultValue: 'job-ready career?',
      admin: { description: 'Second line of headline, rendered in yellow' },
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Book a free 15-minute counselling call — no commitment, just clarity.',
    },
    {
      type: 'row',
      fields: [
        { name: 'primaryLabel', type: 'text', defaultValue: '📞 Book Free Counselling Call' },
        { name: 'primaryUrl', type: 'text', defaultValue: '/contact' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'secondaryLabel', type: 'text', defaultValue: '📥 Download Brochure' },
        { name: 'secondaryUrl', type: 'text', defaultValue: '/contact?action=brochure' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'whatsappLabel', type: 'text', defaultValue: '💬 WhatsApp' },
        { name: 'whatsappUrl', type: 'text', defaultValue: 'https://wa.me/919946033355' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phoneDisplay', type: 'text', defaultValue: '+91 99460 33355' },
        { name: 'phoneUrl', type: 'text', defaultValue: 'tel:+919946033355' },
      ],
    },
    { name: 'email', type: 'text', defaultValue: 'info@skillversityglobal.com' },
    { name: 'showForm', type: 'checkbox', defaultValue: true, label: 'Show inline lead form' },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: 'Rich Text (legacy, optional)',
      admin: { description: 'Legacy field. Prefer structured fields above.' },
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: { maxRows: 2, admin: { description: 'Legacy field, ignored by render. Prefer button label/url fields above.' } },
    }),
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
