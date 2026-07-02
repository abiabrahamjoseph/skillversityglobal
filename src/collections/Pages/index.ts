import type { CollectionConfig } from 'payload'

import { adminOrEditor } from '../../access/roles'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { CampusLife } from '../../blocks/CampusLife/config'
import { CertificationsGrid } from '../../blocks/CertificationsGrid/config'
import { CompaniesMarquee } from '../../blocks/CompaniesMarquee/config'
import { HeroCollage } from '../../blocks/HeroCollage/config'
import { MentorsGallery } from '../../blocks/MentorsGallery/config'
import { PlacementsGallery } from '../../blocks/PlacementsGallery/config'
import { ProgramsGrid } from '../../blocks/ProgramsGrid/config'
import { RealityCheck } from '../../blocks/RealityCheck/config'
import { StatsRow } from '../../blocks/StatsRow/config'
import { TestimonialsGrid } from '../../blocks/TestimonialsGrid/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    read: authenticatedOrPublished,
    update: adminOrEditor,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'template', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'template',
      type: 'select',
      required: true,
      defaultValue: 'custom',
      admin: {
        description: 'Choose a Skillversity page template. Use Custom only for block-builder pages.',
        position: 'sidebar',
      },
      options: [
        { label: 'Home', value: 'home' },
        { label: 'About', value: 'about' },
        { label: 'Admissions', value: 'admissions' },
        { label: 'Contact', value: 'contact' },
        { label: 'Placements', value: 'placements' },
        { label: 'Mentors', value: 'mentors' },
        { label: 'Campus Life', value: 'campus-life' },
        { label: 'Skillfolio', value: 'skillfolio' },
        { label: 'Privacy', value: 'privacy' },
        { label: 'Custom Blocks Page', value: 'custom' },
      ],
    },
    {
      name: 'skillversity',
      type: 'group',
      label: 'Skillversity Structured Content',
      admin: {
        condition: (data) => data?.template !== 'custom',
        description: 'Editor-friendly fields rendered by the branded Skillversity templates.',
      },
      fields: [
        {
          name: 'hero',
          type: 'group',
          fields: [
            { name: 'eyebrow', type: 'text', label: 'Eyebrow / Label' },
            { name: 'title', type: 'text', label: 'Hero Title' },
            { name: 'highlight', type: 'text', label: 'Highlighted Title Text' },
            { name: 'description', type: 'textarea', label: 'Hero Description' },
            {
              name: 'theme',
              type: 'select',
              defaultValue: 'light',
              options: [
                { label: 'Light', value: 'light' },
                { label: 'Cool Blue', value: 'cool' },
                { label: 'Warm', value: 'warm' },
                { label: 'Dark', value: 'dark' },
              ],
            },
            { name: 'primaryCtaLabel', type: 'text', label: 'Primary CTA Label' },
            { name: 'primaryCtaUrl', type: 'text', label: 'Primary CTA URL' },
            { name: 'secondaryCtaLabel', type: 'text', label: 'Secondary CTA Label' },
            { name: 'secondaryCtaUrl', type: 'text', label: 'Secondary CTA URL' },
          ],
        },
        {
          name: 'stats',
          type: 'array',
          label: 'Stats',
          admin: { initCollapsed: true },
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            { name: 'color', type: 'text', defaultValue: 'var(--brand-blue)' },
          ],
        },
        {
          name: 'featureCards',
          type: 'array',
          label: 'Feature Cards',
          admin: { initCollapsed: true },
          fields: [
            { name: 'icon', type: 'text' },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            { name: 'color', type: 'text', defaultValue: 'var(--brand-blue)' },
          ],
        },
        {
          name: 'contentSections',
          type: 'array',
          label: 'Content Sections',
          admin: { initCollapsed: true },
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            {
              name: 'items',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },
        {
          name: 'steps',
          type: 'array',
          label: 'Process / Steps',
          admin: { initCollapsed: true },
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
          ],
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
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [HeroCollage, CompaniesMarquee, StatsRow, ProgramsGrid, RealityCheck, CertificationsGrid, TestimonialsGrid, MentorsGallery, PlacementsGallery, CampusLife, CallToAction, Content, MediaBlock, Archive, FormBlock],
              required: false,
              admin: {
                description: 'Used only when Template is set to Custom Blocks Page.',
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
