'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Sparkles, ArrowRight } from 'lucide-react'

type StudentPlacementImage = {
  id: string
  name: string
  image: string
}

const PLACEMENT_IMAGES: StudentPlacementImage[] = [
  {
    id: '1',
    name: 'Vishnu - Placed at DHL',
    image: '/media/vishnu-2-600x750.png',
  },
  {
    id: '2',
    name: 'Vinayan T V - Placed at Maersk',
    image: '/media/vinayan-2-600x750.png',
  },
  {
    id: '3',
    name: 'Anagha Ratheesh - Placed in Oil & Gas',
    image: '/media/anagha-2-600x750.png',
  },
]

export const RecentPlacementsPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    // Show popup shortly after page load
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  // Canvas confetti & celebration particle animation
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.offsetWidth || 600)
    let height = (canvas.height = canvas.offsetHeight || 600)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth || 600
      height = canvas.height = canvas.offsetHeight || 600
    }
    window.addEventListener('resize', handleResize)

    // Particle type definitions
    const colors = ['#FF2E1F', '#FF7A1A', '#FFCB28', '#00B6E8', '#1A3DB8', '#C040A0', '#10B981']
    const particles: Array<{
      x: number
      y: number
      size: number
      color: string
      speedX: number
      speedY: number
      rotation: number
      rotationSpeed: number
      shape: 'rect' | 'circle' | 'star'
      opacity: number
    }> = []

    // Create 70 festive confetti particles
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.8,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 2.8,
        speedY: Math.random() * 2.2 + 1.2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 6,
        shape: Math.random() > 0.3 ? 'rect' : Math.random() > 0.5 ? 'circle' : 'star',
        opacity: Math.random() * 0.85 + 0.15,
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        p.rotation += p.rotationSpeed

        // Wrap around at bottom
        if (p.y > height + 20) {
          p.y = -10
          p.x = Math.random() * width
        }

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.6)
        } else if (p.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Sparkle star
          ctx.beginPath()
          for (let i = 0; i < 4; i++) {
            ctx.lineTo(Math.cos(((180 + i * 90) * Math.PI) / 180) * p.size, Math.sin(((180 + i * 90) * Math.PI) / 180) * p.size)
            ctx.lineTo(Math.cos(((225 + i * 90) * Math.PI) / 180) * (p.size / 3), Math.sin(((225 + i * 90) * Math.PI) / 180) * (p.size / 3))
          }
          ctx.closePath()
          ctx.fill()
        }

        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="placement-popup-overlay" onClick={handleClose}>
      <div
        className="placement-popup-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="placement-popup-title"
      >
        {/* Celebration background canvas */}
        <canvas ref={canvasRef} className="placement-popup-canvas" />

        {/* Decorative background glow blobs */}
        <div className="placement-popup-glow placement-popup-glow-1" />
        <div className="placement-popup-glow placement-popup-glow-2" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="placement-popup-close"
          aria-label="Close celebration popup"
        >
          <X className="w-5 h-5 text-gray-700 hover:text-black" />
        </button>

        {/* Header Content */}
        <div className="placement-popup-header">
          <div className="placement-popup-pill">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className="placement-popup-pill-text">RECENT PLACEMENTS</span>
            <span className="placement-popup-live-dot" />
          </div>

          <h2 id="placement-popup-title" className="placement-popup-title">
            Students Recently Placed! 🎉
          </h2>
        </div>

        {/* Pure Images Grid - No text details */}
        <div className="placement-popup-pure-images-grid">
          {PLACEMENT_IMAGES.map((item, idx) => (
            <div
              key={item.id}
              className="placement-pure-image-card"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={600}
                height={750}
                className="placement-pure-img"
                priority
              />
            </div>
          ))}
        </div>

        {/* Popup Footer Call-to-action */}
        <div className="placement-popup-action">
          <div className="placement-total-counter">
            🏆 Over <strong>10,141+</strong> Placements & Counting
          </div>

          <div className="placement-popup-btn-group">
            <Link
              href="/placements"
              onClick={handleClose}
              className="placement-popup-btn-primary"
            >
              <span>View All Placements</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
            <button
              onClick={handleClose}
              className="placement-popup-btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
