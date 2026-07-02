import React from 'react'
import Image from 'next/image'

type MediaLike = { url?: string | null; alt?: string | null } | null | undefined

type Props = {
  media?: MediaLike | string | number | null
  label?: string
  shape?: 'card' | 'circle'
  className?: string
  style?: React.CSSProperties
  /** Optional deep link into the admin doc/field that owns this image slot. Defaults to /admin. */
  editUrl?: string
}

const PlaceholderIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
)

const getFallbackImageUrl = (label: string): string => {
  const lbl = label.toLowerCase()
  if (lbl.includes('hospital') || lbl.includes('health') || lbl.includes('medical')) {
    return 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
  }
  if (lbl.includes('logistics') || lbl.includes('supply') || lbl.includes('chain') || lbl.includes('shipping')) {
    return 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
  }
  if (lbl.includes('oil') || lbl.includes('gas') || lbl.includes('refinery') || lbl.includes('petroleum')) {
    return 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
  }
  if (lbl.includes('hr') || lbl.includes('human resource') || lbl.includes('management') || lbl.includes('counselling') || lbl.includes('interview')) {
    return 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
  }
  if (lbl.includes('campus exterior') || lbl.includes('exterior') || lbl.includes('building')) {
    return 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80'
  }
  if (lbl.includes('connect room') || lbl.includes('lounge') || lbl.includes('collaboration') || lbl.includes('meeting')) {
    return 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
  }
  if (lbl.includes('core values') || lbl.includes('values') || lbl.includes('wall') || lbl.includes('office')) {
    return 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
  }
  if (lbl.includes('purpose') || lbl.includes('plaque') || lbl.includes('award')) {
    return 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=800&q=80'
  }
  if (lbl.includes('classroom') || lbl.includes('lecture') || lbl.includes('interior') || lbl.includes('class')) {
    return 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80'
  }
  if (lbl.includes('mentor') || lbl.includes('teacher') || lbl.includes('faculty') || lbl.includes('people') || lbl.includes('profile')) {
    return 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80'
  }
  if (lbl.includes('placement') || lbl.includes('alumni') || lbl.includes('student') || lbl.includes('success') || lbl.includes('graduat')) {
    return 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
  }
  return 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80'
}

export const MediaPlaceholder: React.FC<Props> = ({
  media,
  label = 'a Skillversity photo',
  shape = 'card',
  className,
  style,
  editUrl,
}) => {
  const isObject = media && typeof media === 'object'
  const dbUrl = isObject
    ? (media as { url?: string | null }).url
    : (typeof media === 'string' && media !== '' ? media : null)
  
  const url = dbUrl || getFallbackImageUrl(label)
  const alt = (isObject && (media as { alt?: string | null }).alt) || label

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: 'inherit' }}>
      <Image
        src={url}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={className}
        style={{ objectFit: 'cover', ...style }}
        unoptimized={url.endsWith('.svg')}
      />
    </div>
  )
}
