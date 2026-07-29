import React from 'react'
import Link from 'next/link'

export const MobileBar: React.FC = () => {
  return (
    <div className="mobile-bar">
      <a
        href="https://play.google.com/store/apps/details?id=com.app.skillversity"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost"
        style={{ color: '#00B6E8' }}
      >
        <svg viewBox="0 0 512 512" width="16" height="16" style={{ flexShrink: 0 }}>
          <path fill="#415A6C" d="M30 40c0-10 7-17 17-17h.3L275 251 47.3 479H47c-10 0-17-7-17-17V40z" />
          <path fill="#13B5EA" d="M30 40c0-5 2-10 6-13l240 224L47.3 479c-4-3-6-8-6-13V40z" />
          <path fill="#00C1A8" d="m276 251 68-68 111 63c8 4 8 13 0 17l-111 63-68-75z" opacity=".2" />
          <path fill="#FF3333" d="M344 183 47.3 27C44 25 40 23 36 23l240 228 68-68z" />
          <path fill="#FFD400" d="M455 245 344 183l-68 68 68 68 111-62c8-5 8-12 0-12z" />
          <path fill="#00E676" d="M344 319 276 251 36 479c4 0 8-2 11.3-4L344 319z" />
        </svg>
        App
      </a>
      <Link href="/contact?action=test" className="btn btn-ghost">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
        Career Test
      </Link>
      <Link href="/contact" className="btn btn-brand">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        Free Call
      </Link>
    </div>
  )
}
