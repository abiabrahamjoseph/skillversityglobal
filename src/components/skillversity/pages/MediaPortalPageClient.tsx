'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UploadCloud, CheckCircle, Copy, Check, Download, Image as ImageIcon, Search, ExternalLink, RefreshCw, FolderPlus } from 'lucide-react'
import { ScrollReveal } from '../ScrollReveal'

type MediaItem = {
  id?: string
  filename: string
  url: string
  alt: string
  filesize?: number
  mimeType?: string
  width?: number
  height?: number
  createdAt?: string
}

export const MediaPortalPageClient: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [altText, setAltText] = useState('')
  const [category, setCategory] = useState('placements')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState<MediaItem | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const [mediaList, setMediaList] = useState<MediaItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoadingMedia, setIsLoadingMedia] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch existing media gallery on mount
  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    setIsLoadingMedia(true)
    try {
      const res = await fetch('/api/upload-media')
      const data = await res.json()
      if (data.success && Array.isArray(data.media)) {
        setMediaList(data.media)
      }
    } catch {
      // Fallback
    } finally {
      setIsLoadingMedia(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      if (!altText) {
        setAltText(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '))
      }
      setUploadError(null)
      setUploadSuccess(null)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      if (!altText) {
        setAltText(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '))
      }
      setUploadError(null)
      setUploadSuccess(null)
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) {
      setUploadError('Please select or drag an image file to upload.')
      return
    }

    setIsUploading(true)
    setUploadError(null)
    setUploadSuccess(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('alt', altText || selectedFile.name)
      formData.append('category', category)

      const res = await fetch('/api/upload-media', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (data.success && data.media) {
        setUploadSuccess(data.media)
        setSelectedFile(null)
        setPreviewUrl(null)
        setAltText('')
        fetchMedia()
      } else {
        setUploadError(data.error || 'Upload failed. Please try again.')
      }
    } catch (err: any) {
      setUploadError(err?.message || 'An error occurred while uploading.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleCopyUrl = (url: string, id: string) => {
    const fullUrl = window.location.origin + url
    navigator.clipboard.writeText(fullUrl)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredMedia = mediaList.filter(
    (m) =>
      m.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.alt.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* HERO SECTION */}
      <section 
        style={{ 
          background: 'linear-gradient(135deg, #0A0A1F 0%, #1A3DB8 40%, #0A007A 100%)', 
          color: '#ffffff', 
          padding: '72px 0 54px', 
          position: 'relative', 
          overflow: 'hidden' 
        }}
      >
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="breadcrumb" style={{ color: 'rgba(255,255,255,.6)', marginBottom: '16px' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,.8)' }}>Home</Link>
            <span>›</span>
            <span>Media Portal</span>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(255,203,40,0.15)', border: '1.5px solid rgba(255,203,40,0.4)', marginBottom: '16px' }}>
            <ImageIcon size={16} style={{ color: '#FFCB28' }} />
            <span style={{ fontSize: '12.5px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFCB28' }}>Skillversity Media Manager</span>
          </div>

          <h1 className="h-hero" style={{ color: '#fff', marginTop: '6px', lineHeight: 1.1 }}>
            Media & Poster <span style={{ color: '#00B6E8' }}>Upload Portal</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.85)', marginTop: '14px', fontSize: '17px', maxWidth: '650px', lineHeight: 1.6 }}>
            Upload placement posters, campus event graphics, mentor photos, and website media directly to Skillversity's media server.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '24px' }}>
            <Link 
              href="/admin/collections/media" 
              target="_blank"
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: 'rgba(255,255,255,0.15)', 
                border: '1.5px solid rgba(255,255,255,0.3)', 
                color: '#fff', 
                padding: '10px 20px', 
                borderRadius: '12px', 
                fontWeight: 700, 
                fontSize: '14px', 
                textDecoration: 'none' 
              }}
            >
              <span>Payload CMS Media Manager</span>
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </section>

      <div className="wrap" style={{ marginTop: '40px' }}>
        {/* UPLOAD FORM SECTION */}
        <ScrollReveal>
          <div 
            style={{ 
              background: '#ffffff', 
              borderRadius: '24px', 
              border: '2px solid var(--ink)', 
              boxShadow: '8px 8px 0 var(--ink)', 
              padding: '36px', 
              marginBottom: '50px' 
            }}
          >
            <h2 style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '24px', color: 'var(--ink)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <UploadCloud style={{ color: 'var(--brand-pink)' }} />
              <span>Upload New Media File</span>
            </h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: '14.5px', marginBottom: '24px' }}>
              Select or drag an image file below (.png, .jpg, .jpeg, .webp, .svg).
            </p>

            <form onSubmit={handleUpload}>
              {/* DRAG & DROP ZONE */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: '2.5px dashed var(--brand-blue)',
                  borderRadius: '20px',
                  padding: '40px 20px',
                  textAlign: 'center',
                  background: 'rgba(0, 182, 232, 0.04)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  marginBottom: '24px',
                }}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />

                {previewUrl ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <div style={{ position: 'relative', width: '180px', height: '180px', borderRadius: '16px', overflow: 'hidden', border: '2px solid var(--ink)' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--ink)' }}>
                      Selected: {selectedFile?.name} ({(selectedFile?.size! / 1024).toFixed(1)} KB)
                    </span>
                    <span style={{ fontSize: '12.5px', color: 'var(--brand-blue)', textDecoration: 'underline', fontWeight: 700 }}>
                      Click or drag another file to replace
                    </span>
                  </div>
                ) : (
                  <div>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--brand-blue)', color: '#fff', display: 'grid', placeItems: 'center', margin: '0 auto 14px' }}>
                      <UploadCloud size={30} />
                    </div>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)', marginBottom: '4px' }}>
                      Drag & Drop your image here
                    </h3>
                    <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', margin: 0 }}>
                      or <span style={{ color: 'var(--brand-blue)', fontWeight: 700 }}>Browse File</span> from your computer
                    </p>
                  </div>
                )}
              </div>

              {/* METADATA FIELDS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px' }}>
                    Image Alt Text / Description *
                  </label>
                  <input
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="e.g. Student Placement Poster - Subash M"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1.5px solid var(--ink)',
                      fontSize: '14.5px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px' }}>
                    Media Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1.5px solid var(--ink)',
                      fontSize: '14.5px',
                      outline: 'none',
                      background: '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="placements">🎯 Student Placements</option>
                    <option value="events">🎪 Campus Events & Summits</option>
                    <option value="mentors">🧑‍💼 Industry Mentors</option>
                    <option value="campus">🏫 Campus Life & Album</option>
                    <option value="general">📁 General Media</option>
                  </select>
                </div>
              </div>

              {/* UPLOAD ALERT NOTIFICATIONS */}
              {uploadSuccess && (
                <div style={{ background: '#E8F5E9', border: '1.5px solid #4CAF50', color: '#1B5E20', padding: '14px 20px', borderRadius: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle size={22} style={{ color: '#4CAF50', flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '15px' }}>Upload Successful!</strong>
                    <span style={{ fontSize: '13.5px' }}>File saved to <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>{uploadSuccess.url}</code></span>
                  </div>
                </div>
              )}

              {uploadError && (
                <div style={{ background: '#FFEBEE', border: '1.5px solid #F44336', color: '#B71C1C', padding: '14px 20px', borderRadius: '14px', marginBottom: '20px' }}>
                  <strong>Upload Error:</strong> {uploadError}
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isUploading || !selectedFile}
                className="btn btn-brand btn-lg"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '16px',
                  borderRadius: '14px',
                  fontSize: '16px',
                  fontWeight: 800,
                  opacity: isUploading || !selectedFile ? 0.6 : 1,
                  cursor: isUploading || !selectedFile ? 'not-allowed' : 'pointer',
                }}
              >
                {isUploading ? (
                  <>
                    <RefreshCw size={20} className="spin" />
                    <span>Uploading File...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud size={20} />
                    <span>Upload Image Now</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </ScrollReveal>

        {/* MEDIA GALLERY SECTION */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '26px', color: 'var(--ink)', margin: 0 }}>
                Uploaded Media Library ({filteredMedia.length})
              </h2>
              <p style={{ color: 'var(--ink-soft)', fontSize: '14px', margin: '4px 0 0' }}>
                Browse uploaded photos & copy image links for website pages.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative', minWidth: '260px' }}>
                <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-soft)' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search filename or alt..."
                  style={{
                    width: '100%',
                    padding: '10px 16px 10px 42px',
                    borderRadius: '999px',
                    border: '1.5px solid var(--ink)',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>

              <button
                onClick={fetchMedia}
                style={{
                  padding: '10px 16px',
                  borderRadius: '999px',
                  border: '1.5px solid var(--ink)',
                  background: '#fff',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <RefreshCw size={15} />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {isLoadingMedia ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--ink-soft)' }}>
              <RefreshCw size={32} className="spin" style={{ margin: '0 auto 12px', display: 'block' }} />
              <p>Loading media library...</p>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div style={{ background: '#fff', padding: '48px 24px', textAlign: 'center', borderRadius: '20px', border: '2px solid var(--line)' }}>
              <ImageIcon size={48} style={{ color: 'var(--ink-mute)', margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>No media files found</h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-soft)', marginTop: '4px' }}>Upload your first image file using the upload form above.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
              {filteredMedia.map((item, idx) => {
                const itemKey = item.id || item.filename || String(idx)
                const isCopied = copiedId === itemKey

                return (
                  <div
                    key={itemKey}
                    style={{
                      background: '#ffffff',
                      borderRadius: '20px',
                      border: '1.5px solid var(--ink)',
                      overflow: 'hidden',
                      boxShadow: '4px 4px 0 var(--ink)',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', background: '#F8F9FA', overflow: 'hidden' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.url}
                        alt={item.alt}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>

                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--ink)', wordBreak: 'break-all', marginBottom: '4px' }}>
                        {item.filename}
                      </div>
                      <div style={{ fontSize: '12.5px', color: 'var(--ink-soft)', marginBottom: '14px' }}>
                        {item.alt}
                      </div>

                      <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleCopyUrl(item.url, itemKey)}
                          style={{
                            flex: 1,
                            padding: '10px 12px',
                            borderRadius: '10px',
                            border: '1.5px solid var(--ink)',
                            background: isCopied ? '#4CAF50' : 'var(--ink)',
                            color: '#ffffff',
                            fontWeight: 800,
                            fontSize: '12.5px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {isCopied ? <Check size={14} /> : <Copy size={14} />}
                          <span>{isCopied ? 'Copied Link!' : 'Copy URL'}</span>
                        </button>

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '10px 12px',
                            borderRadius: '10px',
                            border: '1.5px solid var(--ink)',
                            background: '#ffffff',
                            color: 'var(--ink)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          title="Open Full Image"
                        >
                          <ExternalLink size={15} />
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
