'use client'

import React from 'react'

export const SubmissionCell: React.FC<any> = (props) => {
  const { cellData } = props // array of { field, value } objects

  if (!Array.isArray(cellData)) return null

  // Extract key fields
  const nameObj = cellData.find((item: any) =>
    ['name', 'firstName', 'lastName', 'fullName', 'full-name'].includes(item.field),
  )
  const phoneObj = cellData.find((item: any) =>
    ['phone', 'tel', 'mobile', 'whatsapp'].includes(item.field),
  )
  const programObj = cellData.find((item: any) =>
    ['program', 'course', 'interests'].includes(item.field),
  )
  const sourceObj = cellData.find((item: any) =>
    ['source', 'path', 'referrer'].includes(item.field),
  )

  const name = nameObj?.value || ''
  const phone = phoneObj?.value || ''
  const program = programObj?.value || ''
  const source = sourceObj?.value || ''

  const parts = []

  if (name || phone) {
    parts.push(
      <span key="main" style={{ fontWeight: 'bold' }}>
        {name}
        {phone && (
          <span style={{ fontWeight: 'normal', opacity: 0.7, marginLeft: '6px' }}>
            {phone}
          </span>
        )}
      </span>,
    )
  }

  const subParts = []
  if (program) subParts.push(program)
  if (source) subParts.push(source)

  if (subParts.length > 0) {
    parts.push(
      <span key="sub" style={{ opacity: 0.5, marginLeft: '6px' }}>
        · {subParts.join(' · ')}
      </span>,
    )
  }

  if (parts.length === 0) {
    const fallback = cellData
      .slice(0, 3)
      .map((i) => i.value)
      .filter(Boolean)
      .join(' · ')
    return <span>{fallback}</span>
  }

  return <div style={{ display: 'inline-flex', alignItems: 'center' }}>{parts}</div>
}

export default SubmissionCell
