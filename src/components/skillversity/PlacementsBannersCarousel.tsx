'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const defaultBanners = [
  {
    src: '/media/placement-banner-june.png',
    alt: 'June 2026 Placements - 25 Placements',
  },
  {
    src: '/media/placement-banner-july.png',
    alt: 'May 2026 Placements - 151 Placements',
  }
]

export const PlacementsBannersCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % defaultBanners.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ width: '100%', background: '#fff', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
      <div 
        className="wrap" 
        style={{ 
          padding: '24px var(--gutter)', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .placements-banner-wrapper {
            width: 100%;
            max-width: 1100px;
            aspect-ratio: 16 / 9;
            position: relative;
            border-radius: 16px;
            border: 2px solid var(--ink, #000000);
            overflow: hidden;
            background: #ffffff;
            box-shadow: 6px 6px 0 var(--ink, #000000);
          }
          @media (min-width: 768px) {
            .placements-banner-wrapper {
              aspect-ratio: 2.4 / 1;
            }
          }
        `}} />
        <div className="placements-banner-wrapper">
          {defaultBanners.map((banner, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: index === currentIndex ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out',
                zIndex: index === currentIndex ? 1 : 0
              }}
            >
              <Image
                src={banner.src}
                alt={banner.alt}
                fill
                style={{ objectFit: 'contain' }}
                unoptimized
              />
            </div>
          ))}
        </div>
        
        {/* Navigation dots */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          {defaultBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                border: '1.5px solid var(--ink, #000000)',
                background: index === currentIndex ? 'var(--brand-pink, #FF1F5C)' : '#ffffff',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                padding: 0
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
