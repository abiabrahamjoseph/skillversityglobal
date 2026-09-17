'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export const AdminPortalPageClient: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [user, setUser] = useState<any>(null)
  const [submissions, setSubmissions] = useState<any[]>([])
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(false)

  useEffect(() => {
    // Check if current user is logged in
    fetch('/api/users/me', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setUser(data.user)
          fetchSubmissions()
        }
      })
      .catch(() => {})
  }, [])

  const fetchSubmissions = async () => {
    setIsLoadingSubmissions(true)
    try {
      const res = await fetch('/api/form-submissions?limit=50&sort=-createdAt', { credentials: 'include' })
      const data = await res.json()
      if (data?.docs) {
        setSubmissions(data.docs)
      }
    } catch {
      // ignore
    } finally {
      setIsLoadingSubmissions(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok && data?.user) {
        setUser(data.user)
        fetchSubmissions()
      } else {
        setErrorMsg(data?.errors?.[0]?.message || 'Invalid email or password. Please check your credentials.')
      }
    } catch {
      setErrorMsg('Failed to connect to admin server. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/users/logout', { method: 'POST', credentials: 'include' })
    setUser(null)
    setSubmissions([])
  }

  return (
    <section className="section grid-paper" style={{ minHeight: '80vh', padding: '60px 0' }}>
      <div className="wrap" style={{ maxWidth: user ? '1000px' : '440px' }}>
        {/* LOGGED OUT LOGIN VIEW */}
        {!user ? (
          <div
            style={{
              background: '#ffffff',
              border: '3px solid var(--ink)',
              borderRadius: '24px',
              boxShadow: '8px 8px 0 var(--ink)',
              padding: '36px 28px',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span
                style={{
                  background: '#E0F7FD',
                  color: '#00B6E8',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  display: 'inline-block',
                  marginBottom: '10px',
                }}
              >
                🔐 Skillversity Content HQ
              </span>
              <h1 style={{ fontFamily: 'var(--display)', fontSize: '26px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
                Admin Portal Login
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--ink-soft)', marginTop: '6px' }}>
                Sign in to manage student leads, SEO meta titles, website content, and media uploads.
              </p>
            </div>

            {errorMsg && (
              <div
                style={{
                  background: '#FFE8E8',
                  border: '1.5px solid var(--brand-pink)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: 'var(--brand-pink)',
                  marginBottom: '18px',
                }}
              >
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '4px' }}>
                  Admin Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@skillversityglobal.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-brand"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '14px',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: 800,
                  marginTop: '8px',
                }}
              >
                {isLoading ? 'Signing In...' : 'Log In to Admin Portal →'}
              </button>
            </form>

            <div style={{ marginTop: '20px', textAlign: 'center', borderTop: '1px solid var(--line)', paddingTop: '14px' }}>
              <span style={{ fontSize: '12.5px', color: 'var(--ink-soft)' }}>
                Default Login Email: <code>admin@skillversityglobal.com</code>
              </span>
            </div>
          </div>
        ) : (
          /* LOGGED IN ADMIN DASHBOARD VIEW */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* DASHBOARD HEADER */}
            <div
              style={{
                background: '#ffffff',
                border: '3px solid var(--ink)',
                borderRadius: '24px',
                boxShadow: '6px 6px 0 var(--ink)',
                padding: '24px 28px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div>
                <span
                  style={{
                    background: '#E0F7FD',
                    color: '#00B6E8',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: '999px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  🟢 Logged In as {user.email}
                </span>
                <h1 style={{ fontFamily: 'var(--display)', fontSize: '24px', fontWeight: 800, color: 'var(--ink)', margin: '8px 0 0 0' }}>
                  Skillversity Admin HQ
                </h1>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Link href="/media-portal" className="btn btn-brand btn-sm">
                  📤 Media Upload Portal
                </Link>
                <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                  🚪 Log Out
                </button>
              </div>
            </div>

            {/* QUICK ACTIONS & SEO BACKEND LINKS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
              <a
                href="/admin/globals/site-settings"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#ffffff',
                  border: '2px solid var(--ink)',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '4px 4px 0 var(--ink)',
                  textDecoration: 'none',
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>⚙️</div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)', marginBottom: '4px' }}>Site & SEO Settings</h3>
                <p style={{ fontSize: '13px', color: 'var(--ink-soft)', margin: 0 }}>
                  Manage site-wide meta titles, contact info, statistics, Google Analytics, and Meta Pixel.
                </p>
              </a>

              <a
                href="/admin/collections/pages"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#ffffff',
                  border: '2px solid var(--ink)',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '4px 4px 0 var(--ink)',
                  textDecoration: 'none',
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>📄</div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)', marginBottom: '4px' }}>Pages & SEO Metadata</h3>
                <p style={{ fontSize: '13px', color: 'var(--ink-soft)', margin: 0 }}>
                  Edit page titles, meta descriptions, and OpenGraph share images for all website pages.
                </p>
              </a>

              <a
                href="/admin/collections/programs"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#ffffff',
                  border: '2px solid var(--ink)',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '4px 4px 0 var(--ink)',
                  textDecoration: 'none',
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>🎓</div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)', marginBottom: '4px' }}>Programs & Courses</h3>
                <p style={{ fontSize: '13px', color: 'var(--ink-soft)', margin: 0 }}>
                  Update program descriptions, durations, sub-courses, and career roles.
                </p>
              </a>
            </div>

            {/* STUDENT LEAD SUBMISSIONS VIEWER */}
            <div
              style={{
                background: '#ffffff',
                border: '3px solid var(--ink)',
                borderRadius: '24px',
                boxShadow: '6px 6px 0 var(--ink)',
                padding: '24px 28px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--display)', fontSize: '20px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
                    📋 Recent Student Lead Enquiries ({submissions.length})
                  </h2>
                  <p style={{ fontSize: '13px', color: 'var(--ink-soft)', margin: '2px 0 0 0' }}>
                    Student leads submitted via website admission forms & popups.
                  </p>
                </div>
                <button onClick={fetchSubmissions} className="btn btn-secondary btn-sm">
                  🔄 Refresh Leads
                </button>
              </div>

              {isLoadingSubmissions ? (
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--ink-soft)' }}>Loading enquiries...</div>
              ) : submissions.length === 0 ? (
                <div style={{ padding: '36px 20px', textAlign: 'center', background: 'var(--cream)', borderRadius: '14px', border: '1.5px dashed var(--line)' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>📫</div>
                  <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--ink)' }}>No lead enquiries recorded yet</h4>
                  <p style={{ fontSize: '13px', color: 'var(--ink-soft)', margin: '4px 0 0 0' }}>
                    Submissions from website forms will appear here automatically.
                  </p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
                    <thead>
                      <tr style={{ background: 'var(--cream)', borderBottom: '2px solid var(--ink)', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.06em' }}>
                        <th style={{ padding: '10px 14px', textAlign: 'left' }}>Date</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left' }}>Student Name</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left' }}>Phone / WhatsApp</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left' }}>Program</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left' }}>Qualification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((sub: any) => {
                        const data = sub.submissionData || []
                        const name = data.find((i: any) => i.field === 'fullName')?.value || 'N/A'
                        const phone = data.find((i: any) => i.field === 'phone')?.value || 'N/A'
                        const program = data.find((i: any) => i.field === 'program')?.value || 'N/A'
                        const qualification = data.find((i: any) => i.field === 'qualification')?.value || 'N/A'
                        const date = new Date(sub.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })

                        return (
                          <tr key={sub.id} style={{ borderBottom: '1px solid var(--line)' }}>
                            <td style={{ padding: '12px 14px', color: 'var(--ink-soft)', whiteSpace: 'nowrap' }}>{date}</td>
                            <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--ink)' }}>{name}</td>
                            <td style={{ padding: '12px 14px', fontWeight: 600 }}>
                              <a href={`tel:${phone}`} style={{ color: 'var(--brand-indigo)', textDecoration: 'none' }}>
                                📞 {phone}
                              </a>
                            </td>
                            <td style={{ padding: '12px 14px', fontWeight: 600 }}>{program}</td>
                            <td style={{ padding: '12px 14px', color: 'var(--ink-soft)' }}>{qualification}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
