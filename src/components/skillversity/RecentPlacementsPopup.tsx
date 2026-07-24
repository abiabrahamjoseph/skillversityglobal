'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Sparkles, ArrowRight, Trophy, TrendingUp } from 'lucide-react'

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
  const [showFloatingCounter, setShowFloatingCounter] = useState(false)
  const [counterValue, setCounterValue] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    // Show main celebration popup after 2 seconds
    const popupTimer = setTimeout(() => {
      setIsOpen(true)
    }, 2000)

    // Show floating placement counter badge after 12 seconds
    const counterTimer = setTimeout(() => {
      setShowFloatingCounter(true)
    }, 12000)

    return () => {
      clearTimeout(popupTimer)
      clearTimeout(counterTimer)
    }
  }, [])

  // Start count up animation when floating counter is activated after popup close
  useEffect(() => {
    if (!showFloatingCounter) return

    let current = 0
    const target = 10141
    const duration = 2000 // 2 seconds count up
    const startTime = performance.now()

    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic for satisfying counter fill
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      current = Math.floor(easeProgress * target)
      setCounterValue(current)

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setCounterValue(target)
      }
    }

    requestAnimationFrame(step)
  }, [showFloatingCounter])

  // Canvas confetti & celebration particle animation inside modal
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
    // Start counter after closing popup
    setShowFloatingCounter(true)
  }

  const handleDismissCounter = () => {
    setShowFloatingCounter(false)
  }

  return (
    <>
      {/* 1. Celebration Modal Popup */}
      {isOpen && (
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
      )}

      {/* 2. Floating Animated Counter Widget (Triggers after closing popup) */}
      {showFloatingCounter && (
        <div className="floating-placement-counter-widget" role="status" aria-live="polite">
          <div className="floating-counter-glow" />
          <div className="floating-counter-content">
            <div className="floating-counter-icon">
              <Trophy className="w-5 h-5 text-amber-400 animate-bounce" />
            </div>
            <div className="floating-counter-text-group">
              <div className="floating-counter-number">
                <span>{counterValue.toLocaleString()}</span>
                <span className="floating-counter-plus">+</span>
              </div>
              <div className="floating-counter-label">
                Students Placed & Counting!
              </div>
            </div>
            <button
              onClick={handleDismissCounter}
              className="floating-counter-close-btn"
              aria-label="Dismiss counter badge"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
