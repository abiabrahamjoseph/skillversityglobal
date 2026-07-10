'use client'

import React, { useEffect, useRef } from 'react'

export const ScrollReveal: React.FC<{
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}> = ({ children, className = '', style }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )

    io.observe(el)

    // Fallback: automatically reveal after 500ms if the observer hasn't triggered yet
    const timeoutId = setTimeout(() => {
      if (el && !el.classList.contains('in')) {
        el.classList.add('in')
      }
    }, 500)

    return () => {
      io.disconnect()
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </div>
  )
}
