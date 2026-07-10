'use client'

import React, { useState } from 'react'
import { defaultAllMentors } from '@/skillversity/defaultContent'

const departments = [
  { key: 'ALL', label: 'All Depts' },
  { key: 'LOG', label: 'Logistics' },
  { key: 'TECH', label: 'Oil & Gas' },
  { key: 'HA', label: 'Hospital Admin' },
  { key: 'HR', label: 'HR Management' },
  { key: 'I-CEP', label: 'Language & Confidence' },
  { key: 'AFFAIRS', label: 'Student Affairs' },
]

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  const first = parts[0][0]
  const last = parts[parts.length - 1][0]
  return (first + last).toUpperCase()
}

export const MentorsDirectory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('ALL')

  const filteredMentors = activeTab === 'ALL' 
    ? defaultAllMentors 
    : defaultAllMentors.filter(m => m.dept === activeTab)

  return (
    <div style={{ marginTop: '40px' }}>
      {/* Category Tabs */}
      <div className="directory-tabs">
        {departments.map((dept) => (
          <button
            key={dept.key}
            className={`tab-btn ${activeTab === dept.key ? 'active' : ''}`}
            onClick={() => setActiveTab(dept.key)}
          >
            {dept.label}
          </button>
        ))}
      </div>

      {/* Grid List */}
      <div className="directory-grid">
        {filteredMentors.map((mentor, index) => {
          const initials = getInitials(mentor.name)
          return (
            <div key={index} className="dir-card">
              <div className="dir-avatar" style={{ background: mentor.color }}>
                {initials}
              </div>
              <h4 className="dir-name">{mentor.name}</h4>
              <p className="dir-role" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink-soft)', marginBottom: '4px' }}>{mentor.subtitle}</p>
              <p className="dir-dept" style={{ color: mentor.color, fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em' }}>{mentor.dept === 'AFFAIRS' ? 'Student Affairs' : mentor.label}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
