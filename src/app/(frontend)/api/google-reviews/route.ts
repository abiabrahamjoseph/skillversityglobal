import { NextResponse } from 'next/server'

// Static fallback reviews in case Google API is not configured or fails
const fallbackReviews = [
  {
    name: 'Amaljith P. V.',
    role: 'Oil & Gas Graduate',
    text: 'My journey in the Oil & Gas Engineering program at Skillversity was both transformative and rewarding. The practical training helped me build the skills needed for a successful professional career.',
    initial: 'A',
    color: 'var(--brand-orange)',
  },
  {
    name: 'Mehzana K. A.',
    role: 'Hospital Administration Graduate',
    text: 'IMS Skillversity was a wonderful journey for me. It helped shape my confidence, communication skills, and professional growth. It truly made me who I am today.',
    initial: 'M',
    color: 'var(--brand-pink)',
  },
  {
    name: 'Muhammed Jamal',
    role: 'Oil & Gas Graduate',
    text: 'My time at Skillversity helped me gain extensive industry knowledge, build immense confidence, overcome stage fear, and develop strong teamwork skills. It was a wonderful journey.',
    initial: 'M',
    color: 'var(--brand-blue)',
  },
  {
    name: 'Adithya K. S.',
    role: 'Logistics Graduate',
    text: 'Skillversity transformed my career. The practical logistics training and mock interviews gave me the confidence to ace my interview at DHL. Highly recommended for logistics aspirants!',
    initial: 'A',
    color: 'var(--brand-blue)',
  },
  {
    name: 'Anjali Menon',
    role: 'HR Management Graduate',
    text: 'The personality development sessions and resume building workshops were a game changer. I went from having zero callbacks to receiving three job offers in HR departments.',
    initial: 'A',
    color: 'var(--brand-cyan)',
  },
]

const COLORS = ['var(--brand-orange)', 'var(--brand-pink)', 'var(--brand-blue)', 'var(--brand-cyan)']

function getStableColor(name: string = '') {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % COLORS.length
  return COLORS[index]
}

// Simple in-memory cache
let cache: {
  reviews: any[]
  rating: string
  count: string
  timestamp: number
} | null = null

const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours

async function getPlaceId(apiKey: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Skillversity%20Global%20Kochi&inputtype=textquery&fields=place_id&key=${apiKey}`,
      { next: { revalidate: 86400 } }
    )
    const data = await res.json()
    return data.candidates?.[0]?.place_id || null
  } catch (e) {
    console.error('Error finding place ID:', e)
    return null
  }
}

export async function GET() {
  const apiKey = process.env.GOOGLE_API_KEY
  let placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID

  // If cache is valid, return it
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json({
      reviews: cache.reviews,
      rating: cache.rating,
      count: cache.count,
      cached: true,
    })
  }

  // If API key is not configured, return fallback data immediately
  if (!apiKey) {
    return NextResponse.json({
      reviews: fallbackReviews,
      rating: '4.7',
      count: '498',
      source: 'static-fallback',
    })
  }

  try {
    // Resolve Place ID if missing
    if (!placeId) {
      placeId = (await getPlaceId(apiKey)) || ''
    }

    if (!placeId) {
      throw new Error('Could not resolve Google Place ID')
    }

    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) {
      throw new Error(`Google API responded with status ${res.status}`)
    }

    const data = await res.json()
    const result = data.result

    if (!result) {
      throw new Error(data.error_message || 'Empty result from Google Places API')
    }

    const rawReviews = result.reviews || []
    const rating = result.rating ? result.rating.toFixed(1) : '4.7'
    const count = result.user_ratings_total ? `${result.user_ratings_total}` : '498'

    // Format reviews to match the UI component signature
    const reviews = rawReviews.map((r: any) => {
      const name = r.author_name || 'Anonymous'
      const initial = name.charAt(0).toUpperCase()
      return {
        name,
        role: r.relative_time_description || 'Verified Student',
        text: r.text || '',
        initial,
        color: getStableColor(name),
      }
    })

    // If Google returned no reviews, fall back to our rich static reviews but keep the live rating/count
    const finalReviews = reviews.length > 0 ? reviews : fallbackReviews

    // Update cache
    cache = {
      reviews: finalReviews,
      rating,
      count,
      timestamp: Date.now(),
    }

    return NextResponse.json({
      reviews: finalReviews,
      rating,
      count,
      source: 'google-api',
    })
  } catch (error: any) {
    console.error('Error fetching live Google reviews, using fallback:', error.message)
    // Return stale cache if available, otherwise return fallback
    if (cache) {
      return NextResponse.json({
        reviews: cache.reviews,
        rating: cache.rating,
        count: cache.count,
        source: 'stale-cache',
      })
    }

    return NextResponse.json({
      reviews: fallbackReviews,
      rating: '4.7',
      count: '498',
      source: 'static-fallback-error',
    })
  }
}
