import type { CollectionConfig } from 'payload'

import { adminOrEditor } from '../access/roles'
import { generatePreviewPath } from '../utilities/generatePreviewPath'
import { revalidateProgram, revalidateProgramDelete } from './ProgramsHooks'

export const Programs: CollectionConfig = {
  slug: 'programs',
  admin: {
    useAsTitle: 'title',
    description: 'Manage Skillversity career programs displayed on the website.',
    defaultColumns: ['title', 'tag', 'slug', 'status'],
    group: 'Skillversity',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'programs',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'programs',
        req,
      }),
  },
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    read: () => true,
    update: adminOrEditor,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Program Title',
      admin: { description: 'e.g. "Hospital Administration"' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: { description: 'e.g. "hospital-administration" — used in /programs/{slug}' },
    },
    {
      name: 'tag',
      type: 'text',
      required: true,
      label: 'Category Tag',
      admin: { description: 'Short tag shown on card, e.g. "Healthcare", "Global Trade"' },
    },
    {
      name: 'tagColor',
      type: 'text',
      required: true,
      label: 'Tag Background Color',
      admin: { description: 'CSS color or gradient, e.g. "#00B6E8"' },
    },
    {
      name: 'accentColor',
      type: 'text',
      required: true,
      label: 'Accent Color',
      admin: { description: 'Primary accent color for this program, e.g. "#00B6E8"' },
    },
    {
      name: 'cardGradient',
      type: 'text',
      required: true,
      label: 'Card Header Gradient',
      admin: { description: 'Fallback gradient for the card header when no image is uploaded. e.g. "linear-gradient(135deg,#E0F7FD,#FFE4ED)"' },
    },
    {
      name: 'cardImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Card Header Image',
      admin: { description: 'Optional. Replaces the gradient header on program cards.' },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      label: 'Short Description',
      admin: { description: 'Shown on program cards. 1-2 sentences max.' },
    },
    {
      name: 'duration',
      type: 'text',
      required: true,
      label: 'Duration',
      admin: { description: 'e.g. "10 / 12 months"' },
    },
    {
      name: 'eligibility',
      type: 'text',
      required: true,
      label: 'Eligibility',
      admin: { description: 'e.g. "12th, Degree, Diploma"' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Display Order',
      admin: { description: 'Lower number = shown first. e.g. 1, 2, 3, 4' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Coming Soon', value: 'coming-soon' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
    // Program detail page fields
    {
      name: 'heroHeadline',
      type: 'text',
      label: 'Hero Headline',
      admin: {
        description: 'Main headline on the program detail page',
        condition: () => true,
      },
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      label: 'Hero Description',
      admin: { description: 'Description text below the hero headline' },
    },
    {
      name: 'heroGradient',
      type: 'text',
      label: 'Hero Background Gradient',
      admin: { description: 'Optional CSS gradient for the detail-page hero (used when no Hero Image is set)' },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Cover Image',
      admin: {
        description:
          'Full-bleed background photo behind the hero headline. Wide images work best (1600×900+). Falls back to the gradient when empty.',
      },
    },
    {
      name: 'market',
      type: 'text',
      label: 'Market',
      defaultValue: 'India + GCC',
      admin: { description: 'Shown in the overview strip, e.g. "India + GCC"' },
    },
    {
      name: 'certificationLabel',
      type: 'text',
      label: 'Certification Label',
      admin: { description: 'Short label shown in the overview strip, e.g. "Qualifi UK"' },
    },
    {
      name: 'statBoxes',
      type: 'array',
      label: 'Hero Stat Boxes',
      admin: { initCollapsed: true },
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'color', type: 'text', defaultValue: 'var(--brand-blue)' },
      ],
    },
    {
      name: 'overview',
      type: 'group',
      label: 'Program Overview',
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'subhead', type: 'text' },
        { name: 'body', type: 'textarea' },
        { name: 'calloutTitle', type: 'text', label: 'Callout Title' },
        { name: 'calloutBody', type: 'textarea', label: 'Callout Body' },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      label: 'Program Highlights',
      admin: { description: 'Key features shown on the program detail page' },
      fields: [
        { name: 'icon', type: 'text', required: true, admin: { description: 'Emoji icon, e.g. "🏥"' } },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    {
      name: 'modules',
      type: 'array',
      label: 'Curriculum Modules',
      admin: { initCollapsed: true },
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'topics',
          type: 'array',
          fields: [{ name: 'topic', type: 'text', required: true }],
        },
      ],
    },
    {
      name: 'careerRoles',
      type: 'array',
      label: 'Career Roles',
      admin: { description: 'Job roles graduates can pursue' },
      fields: [
        { name: 'role', type: 'text', required: true, admin: { description: 'e.g. "Front Office Executive"' } },
      ],
    },
    {
      name: 'careerPaths',
      type: 'array',
      label: 'Career Pathways (India + GCC cards)',
      admin: {
        description: 'Cards shown in the "Where graduates work" section. Each card supports an optional cover image.',
        initCollapsed: true,
      },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Card Image (optional)' },
        { name: 'icon', type: 'text', label: 'Emoji icon (shown if no image)', admin: { description: 'e.g. "🏥"' } },
        { name: 'title', type: 'text', required: true },
        { name: 'color', type: 'text', admin: { description: 'CSS color for the title, e.g. "var(--brand-blue)" or "#00B6E8"' } },
        { name: 'employers', type: 'text', label: 'Key employers (comma-separated)' },
        {
          name: 'roles',
          type: 'array',
          label: 'Role pills',
          fields: [{ name: 'role', type: 'text', required: true }],
        },
      ],
    },
    {
      name: 'careerPathsLegacy',
      type: 'json',
      label: 'Career Pathways (legacy JSON, retained for safety)',
      admin: {
        description:
          'Original JSON-based field, kept as a backup after migration to the structured Career Pathways array above. Edits here are ignored by the render.',
        condition: (data) => Boolean(data?.careerPathsLegacy),
      },
    },
    {
      name: 'salaryRange',
      type: 'text',
      label: 'Salary Range',
      admin: { description: 'e.g. "₹15K–25K/month (India) · AED 2,500–5,000/month (Gulf)"' },
    },
    {
      name: 'salary',
      type: 'group',
      label: 'Detailed Salary Display',
      fields: [
        { name: 'india', type: 'text', label: 'India Salary' },
        { name: 'indiaDesc', type: 'text', label: 'India Salary Description' },
        { name: 'gulf', type: 'text', label: 'Gulf Salary' },
        { name: 'gulfDesc', type: 'text', label: 'Gulf Salary Description' },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      label: 'Certifications',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { description: 'e.g. "Qualifi UK"' } },
        { name: 'description', type: 'text' },
      ],
    },
    {
      name: 'featuredTestimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      label: 'Featured Testimonials',
      admin: { description: 'Optional testimonials to show on this program page.' },
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      admin: { initCollapsed: true },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateProgram],
    afterDelete: [revalidateProgramDelete],
  },
}
