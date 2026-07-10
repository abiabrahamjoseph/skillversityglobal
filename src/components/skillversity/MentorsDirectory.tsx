'use client'

import React, { useState } from 'react'

type Mentor = {
  name: string
  dept: 'LOG' | 'TECH' | 'HA' | 'HR' | 'I-CEP' | 'AFFAIRS'
  label: string
  subtitle: string
  color: string
}

const mentorsList: Mentor[] = [
  // Logistics
  { name: 'Abdul Kareem', dept: 'LOG', label: 'Logistics & Supply Chain', subtitle: 'Academic Head', color: 'var(--brand-blue)' },
  { name: 'Anish Kumar S', dept: 'LOG', label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Manoj K S', dept: 'LOG', label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Harish Ahammed Khan', dept: 'LOG', label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Sumaisa N M', dept: 'LOG', label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Mary Agnes C J', dept: 'LOG', label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Rajesh Kumar T K', dept: 'LOG', label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Bilfa Reetha V P', dept: 'LOG', label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Deepa C G', dept: 'LOG', label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Shemeer Salim', dept: 'LOG', label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Krishna Das P R', dept: 'LOG', label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Lakshmy Kannan', dept: 'LOG', label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Mukesh A', dept: 'LOG', label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Jomon Thomas', dept: 'LOG', label: 'Logistics & Supply Chain', subtitle: 'HOD - Logistics', color: 'var(--brand-blue)' },

  // Oil & Gas / Tech
  { name: 'Roopak Ratnaraj', dept: 'TECH', label: 'Oil & Gas', subtitle: 'Oil & Gas Technical Mentor', color: 'var(--brand-red)' },
  { name: 'Christopher Raju', dept: 'TECH', label: 'Oil & Gas', subtitle: 'Oil & Gas Technical Mentor', color: 'var(--brand-red)' },
  { name: 'Jithin TJ', dept: 'TECH', label: 'Oil & Gas', subtitle: 'Oil & Gas Technical Mentor', color: 'var(--brand-red)' },
  { name: 'Thulasidas M H', dept: 'TECH', label: 'Oil & Gas', subtitle: 'Oil & Gas Technical Mentor', color: 'var(--brand-red)' },
  { name: 'Naseem Thampi', dept: 'TECH', label: 'Oil & Gas', subtitle: 'Oil & Gas Technical Mentor', color: 'var(--brand-red)' },
  { name: 'Gokul Hari AK', dept: 'TECH', label: 'Oil & Gas', subtitle: 'Oil & Gas Technical Mentor', color: 'var(--brand-red)' },
  { name: 'Henrich Varghese', dept: 'TECH', label: 'Oil & Gas', subtitle: 'Oil & Gas Technical Mentor', color: 'var(--brand-red)' },

  // Hospital Administration
  { name: 'Catherine Tom Thomas K', dept: 'HA', label: 'Hospital Administration', subtitle: 'Hospital Administration Mentor', color: 'var(--brand-cyan)' },
  { name: 'Riby Elizabeth Thomas', dept: 'HA', label: 'Hospital Administration', subtitle: 'Hospital Administration Mentor', color: 'var(--brand-cyan)' },
  { name: 'Jijimol George G', dept: 'HA', label: 'Hospital Administration', subtitle: 'Hospital Administration Mentor', color: 'var(--brand-cyan)' },
  { name: 'Geethu V G', dept: 'HA', label: 'Hospital Administration', subtitle: 'Hospital Administration Mentor', color: 'var(--brand-cyan)' },
  { name: 'Thanaz K A', dept: 'HA', label: 'Hospital Administration', subtitle: 'Hospital Administration Mentor', color: 'var(--brand-cyan)' },

  // HR Management
  { name: 'D Antony Gerald', dept: 'HR', label: 'HR Management', subtitle: 'HR Management Mentor', color: 'var(--brand-magenta)' },
  { name: 'Veena Ajit Nayar', dept: 'HR', label: 'HR Management', subtitle: 'HR Management Mentor', color: 'var(--brand-magenta)' },
  { name: 'Rini Anna Babu', dept: 'HR', label: 'HR Management', subtitle: 'HR Management Mentor', color: 'var(--brand-magenta)' },

  // I-CEP (Language & Confidence)
  { name: 'Mareena Antony', dept: 'I-CEP', label: 'I-CEP (Confidence & Language)', subtitle: 'I-CEP Language Coach', color: 'var(--brand-orange)' },
  { name: 'Athira Nair T K', dept: 'I-CEP', label: 'I-CEP (Confidence & Language)', subtitle: 'I-CEP Language Coach', color: 'var(--brand-orange)' },
  { name: 'Adila Anees', dept: 'I-CEP', label: 'I-CEP (Confidence & Language)', subtitle: 'I-CEP Language Coach', color: 'var(--brand-orange)' },
  { name: 'Aardra Manampilly', dept: 'I-CEP', label: 'I-CEP (Confidence & Language)', subtitle: 'I-CEP Language Coach', color: 'var(--brand-orange)' },
  { name: 'Miji Johny', dept: 'I-CEP', label: 'I-CEP (Confidence & Language)', subtitle: 'I-CEP Language Coach', color: 'var(--brand-orange)' },
  { name: 'Hudha Ahmedkutty K V', dept: 'I-CEP', label: 'I-CEP (Confidence & Language)', subtitle: 'I-CEP Language Coach', color: 'var(--brand-orange)' },
  { name: 'Shibila Fathima', dept: 'I-CEP', label: 'I-CEP (Confidence & Language)', subtitle: 'I-CEP Language Coach', color: 'var(--brand-orange)' },
  { name: 'Saritha G', dept: 'I-CEP', label: 'I-CEP (Confidence & Language)', subtitle: 'I-CEP Language Coach', color: 'var(--brand-orange)' },

  // Student Affairs
  { name: 'Mumthas Mubash', dept: 'AFFAIRS', label: 'Student Affairs', subtitle: 'Student Affairs Officer', color: 'var(--brand-indigo)' },
  { name: 'Risaldher Ali', dept: 'AFFAIRS', label: 'Student Affairs', subtitle: 'Student Affairs Officer', color: 'var(--brand-indigo)' },
  { name: 'Ajiza S V', dept: 'AFFAIRS', label: 'Student Affairs', subtitle: 'Student Affairs Officer', color: 'var(--brand-indigo)' },
  { name: 'Helana Justin', dept: 'AFFAIRS', label: 'Student Affairs', subtitle: 'Student Affairs Officer', color: 'var(--brand-indigo)' },
  { name: 'Anusree T', dept: 'AFFAIRS', label: 'Student Affairs', subtitle: 'Student Affairs Officer', color: 'var(--brand-indigo)' },
  { name: 'Siyana Sakeer', dept: 'AFFAIRS', label: 'Student Affairs', subtitle: 'Student Affairs Officer', color: 'var(--brand-indigo)' },
]

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
  // Ignore single letters or initials at the end if possible, but keep simple
  const first = parts[0][0]
  const last = parts[parts.length - 1][0]
  return (first + last).toUpperCase()
}

export const MentorsDirectory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('ALL')

  const filteredMentors = activeTab === 'ALL' 
    ? mentorsList 
    : mentorsList.filter(m => m.dept === activeTab)

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
