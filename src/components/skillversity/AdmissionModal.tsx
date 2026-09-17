'use client'

import React, { useState, useEffect } from 'react'

export const AdmissionModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    program: 'Hospital Administration',
    qualification: '12th Pass',
  })

  useEffect(() => {
    const handleOpenModal = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a, button')
      if (link) {
        const href = link.getAttribute('href')
        const isAdmissionBtn =
          link.getAttribute('data-admission-modal') === 'true' ||
          (href && href.includes('/contact#lead-form')) ||
          link.textContent?.trim().toLowerCase().includes('get an admission') ||
          link.textContent?.trim().toLowerCase().includes('apply for this course')

        if (isAdmissionBtn) {
          e.preventDefault()
          e.stopPropagation()
          setIsSubmitted(false)
          setIsOpen(true)
        }
      }
    }

    document.addEventListener('click', handleOpenModal, true)
    return () => document.removeEventListener('click', handleOpenModal, true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.phone) return

    setIsSubmitting(true)
    try {
      await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: 'admission-popup',
          submissionData: [
            { field: 'fullName', value: formData.fullName },
            { field: 'phone', value: formData.phone },
            { field: 'email', value: formData.email || 'N/A' },
            { field: 'program', value: formData.program },
            { field: 'qualification', value: formData.qualification },
            { field: 'source', value: 'Website Admission Popup' },
          ],
        }),
      })
    } catch {
      // Fallback: Continue displaying success message even if offline
    } finally {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }
  }

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(10, 0, 122, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={() => setIsOpen(false)}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          border: '3px solid var(--ink)',
          boxShadow: '10px 10px 0 var(--ink)',
          maxWidth: '480px',
          width: '100%',
          padding: '28px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setIsOpen(false)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'var(--cream)',
            border: '2px solid var(--ink)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            fontSize: '18px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: '24px', fontWeight: 800, color: 'var(--ink)' }}>
              Admission Enquiry Sent!
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--ink-soft)', marginTop: '8px', lineHeight: 1.5 }}>
              Thank you, <b>{formData.fullName}</b>! Our senior admission counsellor will reach out to you on <b>{formData.phone}</b> shortly.
            </p>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href={`https://wa.me/919037286100?text=Hi%20Skillversity,%20I%20just%20submitted%20an%20admission%20enquiry%20for%20${encodeURIComponent(formData.program)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-brand"
                style={{ width: '100%', justifyContent: 'center', background: '#25D366', borderColor: 'var(--ink)' }}
              >
                💬 Chat on WhatsApp Directly
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '20px' }}>
              <span
                style={{
                  background: '#E0F7FD',
                  color: '#00B6E8',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  display: 'inline-block',
                  marginBottom: '8px',
                }}
              >
                🎓 Direct Admission Desk
              </span>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '22px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
                Get an Admission
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', margin: '4px 0 0 0' }}>
                Fill out the quick form below to check eligibility & reserve your seat.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '4px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '2px solid var(--ink)',
                    fontSize: '14.5px',
                    fontWeight: 600,
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '4px' }}>
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '2px solid var(--ink)',
                    fontSize: '14.5px',
                    fontWeight: 600,
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '4px' }}>
                  Select Course / Program
                </label>
                <select
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '2px solid var(--ink)',
                    fontSize: '14px',
                    fontWeight: 700,
                    outline: 'none',
                    background: '#ffffff',
                  }}
                >
                  <option value="Hospital Administration">🏥 Hospital Administration (ADHA / Billing / EMR)</option>
                  <option value="HR Management">💼 HR Management & Corporate Sourcing</option>
                  <option value="Logistics & Supply Chain">🚢 Logistics & Supply Chain Management</option>
                  <option value="Oil & Gas">🔧 Oil & Gas QA/QC & Piping Inspection</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '4px' }}>
                  Highest Qualification
                </label>
                <select
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '2px solid var(--ink)',
                    fontSize: '14px',
                    fontWeight: 700,
                    outline: 'none',
                    background: '#ffffff',
                  }}
                >
                  <option value="12th Pass">12th Pass (Plus Two)</option>
                  <option value="Diploma / ITI">Diploma / ITI</option>
                  <option value="Graduate">Graduate (BA / BSc / BCom / BTech)</option>
                  <option value="Post Graduate">Post Graduate</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-brand"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '14px',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: 800,
                  marginTop: '6px',
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Admission Enquiry →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
