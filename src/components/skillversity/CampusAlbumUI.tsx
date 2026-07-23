'use client'

import React, { useState, useEffect } from 'react'

function FadingImageSlot({ images, interval = 3000, offset = 0, className = "" }: { images: string[], interval?: number, offset?: number, className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, interval)
      return () => clearInterval(timer)
    }, offset)
    return () => clearTimeout(timeout)
  }, [images.length, interval, offset])

  return (
    <div className={`fading-slot ${className}`} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '16px' }}>
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt="Campus moment"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: idx === currentIndex ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        />
      ))}
    </div>
  )
}

export function CampusAlbumUI() {
  const slot1 = ['/media/insta-1.jpg', '/media/insta-2.jpg', '/media/post-1.png']
  const slot2 = ['/media/classroom-students-lecture.jpg', '/media/mentor-session-clean.jpg', '/media/post-2.png']
  const slot3 = ['/media/insta-3.jpg', '/media/hospital-admin-lab-clean.jpg', '/media/post-3.png']
  const slot4 = ['/media/insta-4.jpg', '/media/logistics-clean.jpg', '/media/post-4.png']
  const slot5 = ['/media/insta-5.jpg', '/media/oil-and-gas-worker.jpg', '/media/post-5.png']
  const slot6 = ['/media/insta-6.jpg', '/media/post-6.png', '/media/mentor-catherine.jpg']

  return (
    <section className="section" style={{ background: '#fff', borderTop: '1px solid #f1f5f9' }}>
      <div className="wrap">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start', marginBottom: '40px' }}>
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid #E2E8F0', borderRadius: '30px', padding: '6px 16px', fontSize: '11px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px', color: '#0F172A' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF1F5C' }}></span>
              A CAMPUS DESIGNED AROUND CAREER GROWTH
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.1, color: '#09090B', margin: 0, letterSpacing: '-1.5px' }}>
              Skillversity offers more <br /> than classroom learning.
            </h2>
          </div>
          <div style={{ flex: '1 1 400px', marginTop: '12px' }}>
            <p style={{ fontSize: '1.15rem', color: '#64748B', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
              Through mentor interactions, practical workshops, employer engagement programs, industry visits, career events, and collaborative learning experiences, students develop the mindset and skills required to succeed in modern workplaces.
            </p>
          </div>
        </div>

        <div className="campus-album-grid">
          <FadingImageSlot images={slot1} interval={4000} offset={0} className="album-slot-1" />
          <FadingImageSlot images={slot2} interval={4000} offset={1200} className="album-slot-2" />
          <FadingImageSlot images={slot3} interval={4000} offset={2400} className="album-slot-3" />
          <FadingImageSlot images={slot4} interval={4000} offset={600} className="album-slot-4" />
          <FadingImageSlot images={slot5} interval={4000} offset={1800} className="album-slot-5" />
          <FadingImageSlot images={slot6} interval={4000} offset={3000} className="album-slot-6" />
        </div>

        <style>{`
          .campus-album-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-template-rows: 240px 240px;
            gap: 16px;
          }
          .album-slot-1 { grid-column: span 2; grid-row: span 2; }
          .album-slot-2 { grid-column: span 2; grid-row: span 1; }
          .album-slot-3 { grid-column: span 1; grid-row: span 1; }
          .album-slot-4 { grid-column: span 1; grid-row: span 1; }
          .album-slot-5 { grid-column: span 1; grid-row: span 1; }
          .album-slot-6 { grid-column: span 1; grid-row: span 1; }

          @media (max-width: 1024px) {
            .campus-album-grid {
              grid-template-columns: repeat(2, 1fr);
              grid-auto-rows: 200px;
            }
            .album-slot-1 { grid-column: span 2; grid-row: span 2; }
            .album-slot-2 { grid-column: span 2; grid-row: span 1; }
            .album-slot-3 { grid-column: span 1; grid-row: span 1; }
            .album-slot-4 { grid-column: span 1; grid-row: span 1; }
            .album-slot-5 { grid-column: span 1; grid-row: span 1; }
            .album-slot-6 { grid-column: span 1; grid-row: span 1; }
          }
          @media (max-width: 640px) {
            .campus-album-grid {
              grid-template-columns: 1fr;
              grid-auto-rows: 200px;
            }
            .album-slot-1, .album-slot-2, .album-slot-3, .album-slot-4, .album-slot-5, .album-slot-6 { 
              grid-column: span 1; 
              grid-row: span 1; 
            }
            .album-slot-1 { grid-row: span 2; }
          }
        `}</style>
      </div>
    </section>
  )
}
