import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/roles'
import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Skillversity',
    description: 'Manage homepage stats, hiring partners, and certifications.',
    livePreview: {
      url: ({ req }) => {
        const base = req?.payload?.config?.serverURL || ''
        return `${base}/`
      },
    },
    preview: () => '/',
  },
  access: {
    read: () => true,
    update: adminOnly,
  },
  fields: [
    // Hero Stats
    {
      name: 'stats',
      type: 'group',
      label: 'Homepage Stats',
      fields: [
        {
          name: 'placements',
          type: 'text',
          label: 'Placements Count',
          defaultValue: '10141',
          admin: { description: 'e.g. "10141" — will show as "10141+"' },
        },
        {
          name: 'placementsLabel',
          type: 'text',
          defaultValue: 'Placements from 2014',
        },
        {
          name: 'hiringPartners',
          type: 'text',
          label: 'Hiring Partners Count',
          defaultValue: '2000',
        },
        {
          name: 'hiringPartnersLabel',
          type: 'text',
          defaultValue: 'Hiring Partners',
        },
        {
          name: 'mentors',
          type: 'text',
          label: 'Industry Mentors',
          defaultValue: '43',
        },
        {
          name: 'mentorsLabel',
          type: 'text',
          defaultValue: 'Industry Mentors',
        },
        {
          name: 'mentorshipYears',
          type: 'text',
          label: 'Career Mentorship Years',
          defaultValue: '5',
        },
        {
          name: 'mentorshipLabel',
          type: 'text',
          defaultValue: 'Career Mentorship',
        },
      ],
    },
    // Aggregate rating (used in EducationalOrganization schema + visible trust signals)
    {
      name: 'rating',
      type: 'group',
      label: 'Aggregate Student Rating',
      admin: {
        description:
          'Powers the AggregateRating schema on the organization JSON-LD. Surfaces as star ratings in Google search results.',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Rating Value (out of 5)',
          defaultValue: '4.8',
          admin: { description: 'e.g. "4.8" — must be between 1 and 5' },
        },
        {
          name: 'count',
          type: 'text',
          label: 'Review Count',
          defaultValue: '600',
          admin: { description: 'Total number of reviews backing the rating, e.g. "600"' },
        },
      ],
    },
    // Company Marquee
    {
      name: 'hiringCompanies',
      type: 'array',
      label: 'Hiring Partner Companies (Marquee)',
      admin: {
        description: 'Companies shown in the scrolling marquee. Add/remove/reorder as needed.',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    // Certifications
    {
      name: 'certifications',
      type: 'array',
      label: 'Certifications & Recognitions',
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
          admin: { description: 'Emoji icon, e.g. "🎓"' },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    // Mentors gallery (used on /mentors)
    {
      name: 'mentorsGallery',
      type: 'array',
      label: 'Mentors Gallery (homepage row)',
      maxRows: 12,
      admin: {
        description: 'Mentor avatars rendered on the /mentors page. Leave image empty to show a branded placeholder.',
      },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'firstName', type: 'text', admin: { description: 'Shown inside the avatar placeholder, e.g. "Dr Rajesh"' } },
        { name: 'fullName', type: 'text', required: true, admin: { description: 'Shown below the avatar, e.g. "Dr Rajesh Menon"' } },
        { name: 'credential', type: 'text', admin: { description: 'e.g. "Hospital Admin · 28 yrs · Aster Group"' } },
        {
          name: 'roleType',
          type: 'select',
          defaultValue: 'mentor',
          required: true,
          options: [
            { label: 'Mentor', value: 'mentor' },
            { label: 'Head of Department (HOD)', value: 'hod' },
          ],
        },
      ],
    },
    // Placements gallery (used on /placements)
    {
      name: 'placementsGallery',
      type: 'array',
      label: 'Placements Gallery (alumni photos)',
      maxRows: 8,
      admin: {
        description: 'Student alumni photos rendered on the /placements page next to the 1845+ stats card.',
      },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'firstName', type: 'text', admin: { description: 'Shown inside the placeholder, e.g. "Nikitha"' } },
        { name: 'caption', type: 'text', required: true, admin: { description: 'Bottom strip, e.g. "Nikitha · JFS Logistics"' } },
      ],
    },
    // Hero collage (images on the homepage hero)
    {
      name: 'heroCollage',
      type: 'array',
      label: 'Homepage Hero Collage',
      maxRows: 4,
      admin: {
        description: 'Up to 4 image slots shown beside the hero headline. Leave empty to show the branded placeholder.',
      },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Image' },
        { name: 'caption', type: 'text', label: 'Caption (shown overlay, e.g. "Hospital Admin Lab")' },
        { name: 'badge', type: 'text', label: 'Optional badge text (e.g. "🇮🇳 + 🇦🇪 Pathways")' },
        { name: 'overlay', type: 'text', label: 'Optional overlay text (e.g. "1845+ placed in 2025")' },
        { name: 'placeholderLabel', type: 'text', label: 'Placeholder Label (shown when no image, e.g. "Skillversity classroom photo")' },
      ],
    },
    // Leadership (About page — Founder & Board of Directors)
    {
      name: 'leadership',
      type: 'array',
      label: 'Leadership (About page — Founder & Board)',
      maxRows: 8,
      admin: {
        description:
          'Founder & board of directors shown on the /about page. Upload a photo for each; leave a photo empty to show a branded placeholder.',
      },
      defaultValue: [
        { name: 'Mr. Ratheesh Ravi', role: 'Founder MD', accent: 'pink' },
        { name: 'Mr. Ajas Hyzer', role: 'Executive Director', accent: 'blue' },
        { name: 'Mrs. Sandhya Ratheesh', role: 'Executive Director', accent: 'orange' },
      ],
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Photo' },
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "Mr. Ratheesh Ravi"' },
        },
        {
          name: 'role',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "Founder MD"' },
        },
        {
          name: 'accent',
          type: 'select',
          defaultValue: 'pink',
          admin: { description: 'Ring colour around the photo' },
          options: [
            { label: 'Pink', value: 'pink' },
            { label: 'Blue', value: 'blue' },
            { label: 'Orange', value: 'orange' },
          ],
        },
      ],
    },
    // About page section photos
    {
      name: 'aboutPhotos',
      type: 'group',
      label: 'About Page Photos',
      admin: {
        description: 'Photos shown on the /about page. Leave any empty to show a branded placeholder.',
      },
      fields: [
        { name: 'campusExterior', type: 'upload', relationTo: 'media', label: 'Campus exterior (next to "Empowering 25,000+ Careers")' },
        { name: 'connectRoom', type: 'upload', relationTo: 'media', label: 'Connect room (collage — top-left)' },
        { name: 'coreValuesWall', type: 'upload', relationTo: 'media', label: 'Core values wall (collage — top-right)' },
        { name: 'purposePlaque', type: 'upload', relationTo: 'media', label: 'Purpose plaque (collage — bottom-left)' },
        { name: 'classroomInterior', type: 'upload', relationTo: 'media', label: 'Classroom interior (collage — bottom-right)' },
      ],
    },
    // Hero content
    {
      name: 'heroHeadline',
      type: 'text',
      label: 'Hero Headline',
      defaultValue: 'Stop studying.',
    },
    {
      name: 'heroHighlight',
      type: 'text',
      label: 'Hero Highlight Text',
      defaultValue: 'Start skilling.',
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      label: 'Hero Description',
      defaultValue:
        'Industry-led 10–12 month programs in Hospital Administration, Logistics & Supply Chain, Oil & Gas, and HR Management — built around real workplace skills, 43 industry mentors, and structured placement support for India and GCC careers.',
    },
    {
      name: 'commonCta',
      type: 'group',
      label: 'Common CTA Text',
      fields: [
        {
          name: 'primaryLabel',
          type: 'text',
          defaultValue: 'Book Free Counselling Call',
        },
        {
          name: 'primaryUrl',
          type: 'text',
          defaultValue: '/contact',
        },
        {
          name: 'secondaryLabel',
          type: 'text',
          defaultValue: 'WhatsApp Now',
        },
        {
          name: 'secondaryUrl',
          type: 'text',
          defaultValue: 'https://wa.me/919946033355?text=Hi%20Skillversity',
        },
      ],
    },
    {
      name: 'leadForm',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Primary Lead Form',
      admin: {
        description: 'The form rendered by Skillversity lead forms across the frontend.',
      },
    },
    // Contact Info (used in Header, Footer, and CTA sections)
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          defaultValue: '+91 99460 33355',
          admin: { description: 'Display format, e.g. "+91 99460 33355"' },
        },
        {
          name: 'phoneLink',
          type: 'text',
          label: 'Phone Link',
          defaultValue: 'tel:+919946033355',
          admin: { description: 'tel: link for click-to-call' },
        },
        {
          name: 'email',
          type: 'text',
          label: 'Email',
          defaultValue: 'info@skillversityglobal.com',
        },
        {
          name: 'whatsapp',
          type: 'text',
          label: 'WhatsApp Number',
          defaultValue: '919946033355',
          admin: { description: 'Number only (no +), used in wa.me link' },
        },
        {
          name: 'website',
          type: 'text',
          label: 'Website URL',
          defaultValue: 'https://www.skillversityglobal.com',
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Physical Address',
          defaultValue: 'First Floor, Pattarumadom Building,\nChittoor Rd, North Kaloor,\nKochi, Kerala 682018',
        },
      ],
    },
    // Social Media Links
    {
      name: 'social',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
          defaultValue: 'https://www.instagram.com/skillversity.global',
        },
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
          defaultValue: '',
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
          defaultValue: '',
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube URL',
          defaultValue: '',
        },
      ],
    },
    // Footer tagline
    {
      name: 'footerTagline',
      type: 'textarea',
      label: 'Footer Tagline',
      defaultValue: "India's First Job-Ready Campus. We provide the skills — you build the empire. Premium career-training for students who want practical learning, confidence, and structured placement support.",
    },
    {
      name: 'analytics',
      type: 'group',
      label: 'Analytics',
      fields: [
        {
          name: 'googleAnalyticsId',
          type: 'text',
          label: 'Google Analytics ID',
          admin: { description: 'Overrides NEXT_PUBLIC_GA_ID when set.' },
        },
        {
          name: 'metaPixelId',
          type: 'text',
          label: 'Meta Pixel ID',
          admin: { description: 'Overrides NEXT_PUBLIC_META_PIXEL_ID when set.' },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
