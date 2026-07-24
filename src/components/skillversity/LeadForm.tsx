'use client'

import React, { useEffect, useState } from 'react'

type FormField = {
  blockType: string
  label?: string
  name: string
  options?: Array<{ label: string; value: string }>
  required?: boolean
}

type PayloadForm = {
  id: number | string
  title?: string
  fields?: FormField[]
  submitButtonLabel?: string
}

const defaultFieldLabels: Record<string, string> = {
  fullName: 'Full Name',
  phone: 'Phone / WhatsApp',
  interestedCourse: 'Interested Course',
  qualification: 'Qualification',
}

const defaultFields: FormField[] = [
  { blockType: 'text', name: 'fullName', label: 'Full Name', required: true },
  { blockType: 'text', name: 'phone', label: 'Phone / WhatsApp', required: true },
  {
    blockType: 'select',
    name: 'interestedCourse',
    label: 'Interested Course',
    required: true,
    options: [
      { label: 'Hospital Administration', value: 'hospital-administration' },
      { label: 'Logistics & Supply Chain', value: 'logistics-supply-chain' },
      { label: 'Oil & Gas', value: 'oil-gas' },
      { label: 'HR Management', value: 'hr-management' },
      { label: 'Not sure — help me decide', value: 'not-sure' },
    ],
  },
  {
    blockType: 'select',
    name: 'qualification',
    label: 'Qualification',
    required: true,
    options: [
      { label: '12th', value: '12th' },
      { label: 'Diploma / ITI', value: 'diploma-iti' },
      { label: 'Degree', value: 'degree' },
      { label: 'Postgraduate', value: 'postgraduate' },
      { label: 'Working Professional', value: 'working-professional' },
    ],
  },
]

const getSelectedForm = async (): Promise<PayloadForm | null> => {
  const settingsReq = await fetch('/api/globals/site-settings?depth=2', { cache: 'no-store' })
  if (settingsReq.ok) {
    const settings = await settingsReq.json()
    if (settings?.leadForm && typeof settings.leadForm === 'object') {
      return settings.leadForm
    }
  }

  const formReq = await fetch(
    '/api/forms?limit=1&depth=0&where[title][equals]=Counselling%20Call%20Enquiry',
    { cache: 'no-store' },
  )
  if (!formReq.ok) return null

  const data = await formReq.json()
  return data.docs?.[0] || null
}

const renderField = (field: FormField) => {
  const label = field.label || defaultFieldLabels[field.name] || field.name

  if (field.blockType === 'select') {
    return (
      <select name={field.name} required={field.required} defaultValue="">
        <option value="">Choose one…</option>
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    )
  }

  if (field.blockType === 'textarea') {
    return <textarea name={field.name} required={field.required} placeholder={label} rows={3} />
  }

  const type = field.blockType === 'email' ? 'email' : field.name === 'phone' ? 'tel' : 'text'

  return <input type={type} name={field.name} required={field.required} placeholder={label} />
}

export const LeadForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<PayloadForm | null>(null)

  useEffect(() => {
    getSelectedForm()
      .then(setForm)
      .catch(() => setForm(null))
  }, [])

  const fields = form?.fields?.length ? form.fields : defaultFields

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!form?.id) {
      setLoading(false)
      setError('Lead form is not selected in Site Settings.')
      return
    }

    const formEl = e.currentTarget
    const formData = new FormData(formEl)

    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: form.id,
          submissionData: [
            ...fields.map((field) => ({
              field: field.name,
              value: String(formData.get(field.name) || ''),
            })),
            {
              field: 'source',
              value: typeof window !== 'undefined' ? window.location.pathname : '/',
            },
          ],
        }),
      })

      if (!res.ok) {
        throw new Error('Submission failed')
      }

      setSubmitted(true)
      formEl.reset()
    } catch {
      setError('Something went wrong. Please try WhatsApp instead.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-card" id="lead-form">
      <span className="form-tape">⚡ Free · No Obligation</span>
      {!submitted ? (
        <>
          <h3 style={{ fontSize: '21px', margin: '8px 0 6px' }}>Get Your Free Counselling Call</h3>
          <p style={{ fontSize: '14px', color: 'var(--ink-soft)', marginBottom: '20px' }}>
            4 quick details. We call within 1 working day.
          </p>
          <form onSubmit={handleSubmit} suppressHydrationWarning>
            {fields.map((field) => (
              <div className="field" key={field.name} suppressHydrationWarning>
                <label>{field.label || defaultFieldLabels[field.name] || field.name}</label>
                {renderField(field)}
              </div>
            ))}
            {error && (
              <p style={{ color: 'var(--brand-red)', fontSize: '13px', marginBottom: '8px' }}>{error}</p>
            )}
            <button
              className="btn btn-brand btn-lg"
              type="submit"
              disabled={loading}
              style={{ width: '100%', marginTop: '4px', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <>Submitting…</>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  {form?.submitButtonLabel || 'Get My Free Call'}
                </>
              )}
            </button>
            <p className="form-hint">
              By submitting you consent to be contacted for career counselling. We never share your details.
            </p>
          </form>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: '48px' }}>🎉</div>
          <h3 style={{ marginTop: '10px' }}>You&apos;re booked!</h3>
          <p style={{ color: 'var(--ink-soft)', marginTop: '6px' }}>
            Our counsellor will WhatsApp you within 1 working day.
          </p>
          <a
            href="https://wa.me/919946033355"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa"
            style={{ marginTop: '16px' }}
          >
            WhatsApp Now
          </a>
        </div>
      )}
    </div>
  )
}
