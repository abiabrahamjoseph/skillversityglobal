import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    "Skillversity Global — India's First Job-Ready Campus in Kochi, Kerala. 10,141+ student placements since 2014. Programs in Hospital Administration, Logistics, Oil & Gas, and HR.",
  images: [
    {
      url: `${getServerSideURL()}/media/hero-bg.jpg`,
      width: 1200,
      height: 630,
      alt: 'Skillversity Global - Job-Ready Campus Kochi',
    },
  ],
  siteName: 'Skillversity Global',
  title: "Skillversity Global | India's First Job-Ready Campus | Kochi, Kerala",
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}

