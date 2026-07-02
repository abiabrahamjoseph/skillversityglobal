import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Skillversity Global',
  description: 'Read Skillversity Global\'s privacy policy. How we collect, use, and protect your personal information.',
}

export default function PrivacyPolicy() {
  return (
    <>
      <section className="page-hero cool">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="breadcrumb" style={{ color: 'rgba(255,255,255,.6)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,.8)' }}>Home</Link>
            <span>›</span><span>Privacy Policy</span>
          </div>
          <h1 className="h-hero" style={{ color: '#fff', marginTop: '18px' }}>Privacy Policy</h1>
          <p style={{ color: 'rgba(255,255,255,.8)', marginTop: '14px', fontSize: '16px' }}>
            Last updated: May 2025
          </p>
        </div>
      </section>

      <section className="section" style={{ background: '#fff' }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>
          <div className="blog-content">
            <h2>1. Information We Collect</h2>
            <p>When you submit a form on our website, we collect your name, phone number, interested course, and qualification. This information is used solely for providing career counselling services.</p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information you provide to:</p>
            <ul>
              <li>Contact you for a free career counselling session</li>
              <li>Send relevant program information and updates</li>
              <li>Improve our services and website experience</li>
            </ul>

            <h2>3. Data Protection</h2>
            <p>Your personal data is stored securely and is never sold, rented, or shared with third parties for marketing purposes. We use industry-standard encryption and security measures to protect your information.</p>

            <h2>4. Cookies</h2>
            <p>Our website uses essential cookies for functionality and analytics cookies to understand how visitors use our site. You can control cookie settings through your browser preferences.</p>

            <h2>5. Third-Party Services</h2>
            <p>We may use third-party analytics services (such as Google Analytics) to help us understand website usage. These services may collect information about your browsing activity. Please refer to their respective privacy policies for more information.</p>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Request access to your personal data</li>
              <li>Request correction or deletion of your data</li>
              <li>Opt out of marketing communications at any time</li>
              <li>Lodge a complaint with a data protection authority</li>
            </ul>

            <h2>7. Contact Us</h2>
            <p>For any privacy-related queries, contact us at:</p>
            <p><strong style={{ color: 'var(--ink)' }}>Email:</strong> info@skillversityglobal.com</p>
            <p><strong style={{ color: 'var(--ink)' }}>Phone:</strong> +91 99460 33355</p>
            <p><strong style={{ color: 'var(--ink)' }}>Address:</strong> First Floor, Pattarumadom Building, Chittoor Rd, North Kaloor, Kacheripady, Kochi, Kerala 682018</p>

            <h2>8. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
          </div>
        </div>
      </section>
    </>
  )
}
