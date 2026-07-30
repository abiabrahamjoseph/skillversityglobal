'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type PlacementItem = {
  image?: { url?: string | null; alt?: string | null } | null
  firstName?: string | null
  caption: string
}

type Props = {
  placements?: PlacementItem[]
}

const fallbackPlacements: PlacementItem[] = [
  {
    firstName: 'Subash M',
    caption: 'Subash M · Quality Checking, Coimbatore · Oil & Gas',
    image: { url: '/media/subash-m-placed.jpg', alt: 'Subash M' }
  },
  {
    firstName: 'Sidharth P',
    caption: 'Sidharth P · Quality Checking, Coimbatore · Oil & Gas',
    image: { url: '/media/sidharth-p-placed.jpg', alt: 'Sidharth P' }
  },
  {
    firstName: 'Muhammad Anas C',
    caption: 'Muhammad Anas C · Quality Checking, Coimbatore · Oil & Gas',
    image: { url: '/media/muhammad-anas-placed.jpg', alt: 'Muhammad Anas C' }
  },
  {
    firstName: 'Mohammed Ashique P T',
    caption: 'Mohammed Ashique P T · Quality Checking, Chennai · Oil & Gas',
    image: { url: '/media/mohammed-ashique-placed.jpg', alt: 'Mohammed Ashique P T' }
  },
  {
    firstName: 'Ajin A',
    caption: 'Ajin A · Quality Checking, Karnataka · Oil & Gas',
    image: { url: '/media/ajin-a-placed.jpg', alt: 'Ajin A' }
  },
  {
    firstName: 'Siril John',
    caption: 'Siril John · Quality Checking, Karnataka · Oil & Gas',
    image: { url: '/media/siril-john-placed.jpg', alt: 'Siril John' }
  },
  {
    firstName: 'Sonu Augustin',
    caption: 'Sonu Augustin · Quality Checking, Karnataka · Oil & Gas',
    image: { url: '/media/sonu-augustin-placed.jpg', alt: 'Sonu Augustin' }
  },
  {
    firstName: 'Adithya D',
    caption: 'Adithya D · HR Recruiter, Malappuram · HR Management',
    image: { url: '/media/adithya-d-placed.jpg', alt: 'Adithya D' }
  },
  {
    firstName: 'Bhumika Das',
    caption: 'Bhumika Das · Commercial Executive, Kottayam · Logistics',
    image: { url: '/media/bhumika-das-placed.jpg', alt: 'Bhumika Das' }
  },
  {
    firstName: 'Avinash K A',
    caption: 'Avinash K A · Fleet Coordinator, Calicut · Logistics',
    image: { url: '/media/avinash-k-a-placed.jpg', alt: 'Avinash K A' }
  },
  {
    firstName: 'Vishnu',
    caption: 'Vishnu · Logistics & Supply · DHL',
    image: { url: '/media/vishnu-1.png', alt: 'Vishnu' }
  },
  {
    firstName: 'Vinayan T V',
    caption: 'Vinayan T V · Logistics · Maersk',
    image: { url: '/media/vinayan-1.png', alt: 'Vinayan T V' }
  },
  {
    firstName: 'Anagha Ratheesh',
    caption: 'Anagha Ratheesh · Oil & Gas · Gulf Inspector',
    image: { url: '/media/anagha-1.png', alt: 'Anagha Ratheesh' }
  },
  {
    firstName: 'Ebin Joy',
    caption: 'Ebin Joy · HR Management · Lulu Group',
    image: { url: '/media/ebin-joy-1.png', alt: 'Ebin Joy' }
  },
  {
    firstName: 'Muhammed Sabith P N',
    caption: 'Muhammed Sabith P N · Logistics · Palakkad',
    image: { url: '/media/sabith.png', alt: 'Muhammed Sabith P N' }
  }
]

export const PlacementsScroller: React.FC<Props> = ({ placements = [] }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const list = placements.length > 0 ? placements : fallbackPlacements

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollAmount = clientWidth * 0.75
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  React.useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let intervalId: NodeJS.Timeout

    const startAutoplay = () => {
      intervalId = setInterval(() => {
        const { scrollLeft, clientWidth, scrollWidth } = scrollContainer
        const scrollAmount = 264 // 240px width + 24px gap
        
        // If we are at the end, wrap back to the start
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          scrollContainer.scrollTo({
            left: 0,
            behavior: 'smooth'
          })
        } else {
          scrollContainer.scrollTo({
            left: scrollLeft + scrollAmount,
            behavior: 'smooth'
          })
        }
      }, 3500)
    }

    startAutoplay()

    const handleMouseEnter = () => clearInterval(intervalId)
    const handleMouseLeave = () => startAutoplay()

    scrollContainer.addEventListener('mouseenter', handleMouseEnter)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearInterval(intervalId)
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter)
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [list])


  return (
    <div style={{ position: 'relative', marginTop: '40px', padding: '0 10px' }}>
      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="placements-scroller-container"
        style={{
          display: 'flex',
          gap: '24px',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          padding: '40px 10px 20px',
          margin: '0 -10px',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .placements-scroller-container::-webkit-scrollbar {
            display: none;
          }
          .nav-arrow-btn:hover {
            transform: translateY(-50%) scale(1.08) !important;
            background-color: var(--brand-pink, #FF1F5C) !important;
          }
          .nav-arrow-btn:active {
            transform: translateY(-50%) scale(0.95) !important;
          }
          .placement-card-wrapper {
            transition: transform 0.25s ease;
          }
          .placement-card-wrapper:hover {
            transform: translateY(-4px);
          }
          @media (max-width: 768px) {
            .nav-arrow-btn {
              display: none !important;
            }
          }
        `}} />

        {list.map((item, index) => {
          // Parse caption for name, domain, company
          const parts = item.caption.split('·').map(s => s.trim())
          const name = parts[0] || item.firstName || 'Graduate'
          const domain = parts[1] || 'Placement Success'
          const company = parts[2] || ''

          const imageUrl = item.image?.url || '/api/media/file/vinayan-1.jpg'

          return (
            <div
              key={index}
              className="placement-card-wrapper"
              style={{
                flex: '0 0 auto',
                width: '240px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              {/* Outer border & shadow wrapper */}
              <div
                style={{
                  width: '220px',
                  height: '240px',
                  background: '#ffffff',
                  borderRadius: '24px',
                  border: '2px solid var(--ink, #000000)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 12px 30px -10px rgba(10,0,122,0.3), 4px 4px 0 var(--ink, #000000)'
                }}
              >
                {/* Inner white border / frame */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '6px',
                    border: '2px solid var(--ink, #000000)',
                    borderRadius: '18px',
                    pointerEvents: 'none',
                    zIndex: 2
                  }}
                />

                {/* Student portrait image (cropped to card boundaries) */}
                <Image
                  src={imageUrl}
                  alt={name}
                  fill
                  style={{
                    objectFit: 'contain',
                    zIndex: 1
                  }}
                  unoptimized
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => handleScroll('left')}
        aria-label="Previous Placements"
        style={{
          position: 'absolute',
          left: '-16px',
          top: 'calc(120px + 40px)', // Centered vertically relative to the 240px card
          transform: 'translateY(-50%)',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'var(--brand-cyan, #00B6E8)',
          border: '2px solid var(--ink, #000000)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '4px 4px 0 var(--ink, #000000)',
          zIndex: 10,
          transition: 'transform 0.15s ease, background-color 0.15s ease'
        }}
        className="nav-arrow-btn"
      >
        <ChevronLeft size={20} strokeWidth={2.5} style={{ color: 'var(--ink, #000000)' }} />
      </button>

      <button
        onClick={() => handleScroll('right')}
        aria-label="Next Placements"
        style={{
          position: 'absolute',
          right: '-16px',
          top: 'calc(120px + 40px)',
          transform: 'translateY(-50%)',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'var(--brand-cyan, #00B6E8)',
          border: '2px solid var(--ink, #000000)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '4px 4px 0 var(--ink, #000000)',
          zIndex: 10,
          transition: 'transform 0.15s ease, background-color 0.15s ease'
        }}
        className="nav-arrow-btn"
      >
        <ChevronRight size={20} strokeWidth={2.5} style={{ color: 'var(--ink, #000000)' }} />
      </button>
    </div>
  )
}
