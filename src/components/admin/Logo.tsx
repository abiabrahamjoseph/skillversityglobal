'use client'
import React from 'react'

export const SkillversityLogo = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #FF1F5C, #FF7A1A, #FFCB28)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 900,
          fontSize: '18px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        S
      </div>
      <span
        style={{
          fontSize: '18px',
          fontWeight: 700,
          color: '#fff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: '-0.02em',
        }}
      >
        Skill<span style={{ fontWeight: 400 }}>versity</span>
      </span>
    </div>
  )
}
