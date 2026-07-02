import React from 'react'

import './index.scss'

const baseClass = 'before-dashboard'

const quickLinks = [
  { label: 'Pages', href: '/admin/collections/pages', detail: 'Home and public pages' },
  { label: 'Programs', href: '/admin/collections/programs', detail: 'Listings and detail pages' },
  { label: 'Blog', href: '/admin/collections/posts', detail: 'Career insights' },
  { label: 'Lead Form', href: '/admin/collections/forms', detail: 'Counselling form fields' },
  { label: 'Submissions', href: '/admin/collections/form-submissions', detail: 'Student enquiries' },
  { label: 'Site Settings', href: '/admin/globals/site-settings', detail: 'Contact, CTAs, homepage data' },
  { label: 'Header', href: '/admin/globals/header', detail: 'Top navigation' },
  { label: 'Footer', href: '/admin/globals/footer', detail: 'Footer links' },
  { label: 'Media', href: '/admin/collections/media', detail: 'Images and uploads' },
]

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <section className={`${baseClass}__hero`}>
        <p className={`${baseClass}__eyebrow`}>Skillversity Content HQ</p>
        <h2>Manage the live website from one place.</h2>
        <p>
          Update pages, programs, lead forms, blog articles, navigation, and site-wide contact
          details. Use Preview before publishing when you are editing draft content.
        </p>
        <div className={`${baseClass}__actions`}>
          <a href="/" target="_blank" rel="noreferrer">View Website</a>
          <a href="/admin/globals/site-settings">Open Site Settings</a>
        </div>
      </section>

      <section className={`${baseClass}__grid`} aria-label="Skillversity admin quick links">
        {quickLinks.map((link) => (
          <a className={`${baseClass}__card`} href={link.href} key={link.href}>
            <strong>{link.label}</strong>
            <span>{link.detail}</span>
          </a>
        ))}
      </section>
    </div>
  )
}

export default BeforeDashboard
