import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    { name: 'hidden', type: 'checkbox', defaultValue: false, label: 'Hide this block on the page' },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
