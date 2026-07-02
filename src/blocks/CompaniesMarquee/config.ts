import type { Block } from 'payload'

export const CompaniesMarquee: Block = {
  slug: 'companiesMarquee',
  interfaceName: 'CompaniesMarqueeBlock',
  labels: { singular: 'Companies Marquee', plural: 'Companies Marquees' },
  fields: [
    { name: 'hidden', type: 'checkbox', defaultValue: false, label: 'Hide this block on the page' },
    { name: 'title', type: 'text', defaultValue: 'Our Students Get Hired By 2000+ Companies Including', admin: { description: 'Caption shown above the scrolling row.' } },
    { name: 'useSiteSettings', type: 'checkbox', defaultValue: true, admin: { description: 'Pull company names from Site Settings → Hiring Partner Companies. Uncheck to override with the list below.' } },
    {
      name: 'companies',
      type: 'array',
      label: 'Override Companies',
      admin: { condition: (_, siblingData) => siblingData?.useSiteSettings === false },
      fields: [{ name: 'name', type: 'text', required: true }],
    },
  ],
}
