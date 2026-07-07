'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GraduationCap, Briefcase, TrendingUp, Laptop, ChevronLeft, ChevronRight } from 'lucide-react'
import { ScrollReveal } from '../ScrollReveal'
import { LeadForm } from '../LeadForm'
import { MediaPlaceholder } from '../MediaPlaceholder'

type MediaLike = { url?: string | null; alt?: string | null } | null

type Props = {
  stats: {
    placements: string
    placementsLabel: string
    hiringPartners: string
    hiringPartnersLabel: string
    mentors: string
    mentorsLabel: string
    mentorshipYears: string
    mentorshipLabel: string
  }
  companies: string[]
  certs: Array<{ icon: string; title: string; description: string }>
  programCards: Array<{
    href: string; bg: string; tag: string; tagBg: string
    title: string; desc: string; dur: string; elig: string; color: string
    image?: MediaLike
  }>
  testimonialCards: Array<{
    q: string; name: string; role: string; init: string; color: string
  }>
  heroCollage?: Array<{
    image?: MediaLike
    caption?: string
    badge?: string
    overlay?: string
    placeholderLabel?: string
  }>
  heroHeadline: string
  heroHighlight: string
  heroDescription: string
}

const companyLogos = [
  {
    name: 'Amazon',
    bg: '#FFFFFF',
    color: '#232F3E',
    svg: (
      <svg viewBox="0 0 100 24" width="75" height="18" fill="none" style={{ display: 'block' }}>
        <path d="M11.9 10.7c-.5-.4-.9-.8-.9-1.5 0-1 .9-1.7 2.1-1.7 1.1 0 1.8.5 2.1 1.1h1.3c-.3-1.1-1.4-2.2-3.3-2.2-2.1 0-3.6 1.3-3.6 3.1 0 1.2.7 2.2 1.9 2.8-1.1.4-1.9 1.4-1.9 2.8 0 2 1.8 3.2 3.9 3.2 2.5 0 3.7-1.3 3.7-3.1 0-1.4-.9-2.3-3.3-2.6zm-.9 4.8c-.8 0-1.4-.5-1.4-1.3 0-.8.6-1.3 1.4-1.3h1.9v1.3c0 .8-.5 1.3-1.9 1.3zm7.8-8.2c-1.2 0-2.1.6-2.5 1.4V7.5H15v10.5h1.4v-5.6c0-1.4.8-2.3 2-2.3 1.1 0 1.7.7 1.7 2.1v5.8h1.4v-6.3c0-2.3-1.2-3.6-3.8-3.6zm-14-1.7h1.4V4.1h-1.4v1.5zm0 1.9h1.4v10.5h-1.4V7.5zM6.9 12c.9 0 1.7-.5 1.7-1.6V7.5H7.2v2.7c0 .6-.3.9-.8.9s-.8-.3-.8-.9V7.5H4.2v2.9c0 1.1.8 1.6 1.7 1.6z" fill="#232F3E"/>
        <path d="M4.2 14.5c4 2.8 9.7 2.8 13.7.2.3-.2.6.1.4.4-1.1 1.2-3.2 2.1-5.7 2.1-2.6 0-4.8-.8-5.9-2.1-.2-.3.1-.6.5-.6zm14.2-.8c.1.4-.2.6-.5.4l-1.9-1.2c-.3-.2-.2-.5.1-.5l2.2.1c.3.1.3.4.1 1.2z" fill="#FF9900"/>
      </svg>
    )
  },
  {
    name: 'DHL',
    bg: '#FFCC00',
    color: '#D40511',
    svg: (
      <svg viewBox="0 0 100 24" width="75" height="18" fill="#D40511" style={{ display: 'block' }}>
        <path d="M0 20h8l3-16H3zM10 20h8l3-16h-8zM20 20h8l3-16h-8zM35 4h10c4.4 0 7 2.2 7 5.8 0 4.2-3 6.2-7.5 6.2H38l-1.2 4H32.8l4.2-16zm6.8 9c1.8 0 3-.6 3-2.5 0-1.6-1-2.5-2.6-2.5H39.8l-1.5 5h2.5zM56 4h4.5l-1.5 5H64l-1.5 5h-4.8l-1.2 4h6.5l-1.2 4h-11L56 4zm16.5 0h4.5l-1.8 6h3.5L77 4h4.5L78 14h-3.5L73 20h-4.5l4-16z"/>
      </svg>
    )
  },
  {
    name: 'FedEx',
    bg: '#FFFFFF',
    color: '#4D148C',
    svg: (
      <svg viewBox="0 0 100 24" width="75" height="18" fill="none" style={{ display: 'block' }}>
        <path d="M0 20h5v-5.5h4.5v-4H5V6.5h6V2.5H0v17.5zm16-11c-3.2 0-5.2 2.2-5.2 5.5s2 5.5 5 5.5c2.5 0 4.2-1.2 4.8-3h-4c-.4.5-.8.7-1.4.7-1 0-1.7-.8-1.7-2h7.5v-.6c0-3.5-2-5.8-5-5.8zm-2.5 4.2c.2-1.2.8-2 2-2 1 0 1.5.6 1.7 2h-3.7zM27 20h5V2.5h-5V20zm11.5-11c-2.5 0-4.5 1.5-5 3.7V2.5h-5V20h5v-6.6c0-2.5 1.6-3.8 3.7-3.8h.8v-4.6h-.6z" fill="#4D148C"/>
        <path d="M45 20h5v-5.5h4.5v-4H50V6.5h6V2.5H45v17.5zm16-11c-3.2 0-5.2 2.2-5.2 5.5s2 5.5 5 5.5c2.5 0 4.2-1.2 4.8-3h-4c-.4.5-.8.7-1.4.7-1 0-1.7-.8-1.7-2h7.5v-.6c0-3.5-2-5.8-5-5.8zm-2.5 4.2c.2-1.2.8-2 2-2 1 0 1.5.6 1.7 2h-3.7zM76.5 9L74 12.7l-2.5-3.7h-4.8l5 6.3-5 6.7h4.8l2.9-4.2 2.9 4.2H82l-5-6.7 5-6.3h-5.5z" fill="#FF6600"/>
      </svg>
    )
  },
  {
    name: 'Maersk',
    bg: '#FFFFFF',
    color: '#00243D',
    svg: (
      <svg viewBox="0 0 110 24" width="85" height="18" fill="none" style={{ display: 'block' }}>
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#00A0E2"/>
        <polygon points="12,5 14,10 19,10 15,13 17,18 12,15 7,18 9,13 5,10 10,10" fill="#FFFFFF"/>
        <path d="M28 20V4h4l3 9 3-9h4v16h-3V8l-3 9h-2l-3-9v12h-3zm18-12h4l4 12h-3l-1-3h-5l-1 3h-3l4-12zm3 6l-2-6-2 6h4zm13 6V4h10v3h-7v4h6v3h-6v3h7v3H62zm16 0V14c0-2 1.5-3 3-3s3 1 3 3v6h3v-6c0-3.5-2.5-5-5-5-2 0-3.5 1-4.5 2V4h-3v16h3.5zm16-4c.5.5 1.2.8 2 .8 1.5 0 2.5-1 2.5-2.5s-1-2.5-2.5-2.5c-.8 0-1.5.3-2 .8v3.4zm0 4h-3V7.5h3v2c.8-1 1.8-1.5 3-1.5 3 0 5 2 5 5s-2 5-5 5c-1.2 0-2.2-.5-3-1.5v1z" fill="#00243D"/>
      </svg>
    )
  },
  {
    name: 'Flipkart',
    bg: '#FFFFFF',
    color: '#2874F0',
    svg: (
      <svg viewBox="0 0 100 24" width="75" height="18" fill="none" style={{ display: 'block' }}>
        <path d="M4 2h14l-2 8H6L4 2z" fill="#2874F0"/>
        <path d="M7.5 13a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0-2.5-2.5zm9 0a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0-2.5-2.5z" fill="#FFE500"/>
        <path d="M28 20V4h10v3h-7v4h6v3h-6v6h-3zm11 0V7.5h3v2.2c.8-1.2 2-1.8 3.3-1.8 1.5 0 2.5.6 3 1.5.8-1 1.8-1.5 3-1.5 2.5 0 4 1.8 4 4.5V20h-3v-7.2c0-1.8-.7-2.6-1.8-2.6s-1.8.8-1.8 2.6V20h-3v-7.2c0-1.8-.7-2.6-1.8-2.6s-1.8.8-1.8 2.6V20h-3zm18 0V7.5h3v2.2c.8-1.2 2-1.8 3.3-1.8 3 0 5.2 2 5.2 5s-2.2 5-5.2 5c-1.2 0-2.2-.6-3-1.8v6.8h-3zm6.5-6.8c1.5 0 2.5-1 2.5-2.6s-1-2.6-2.5-2.6c-.8 0-1.5.4-2 1.2v2.8c.5.8 1.2 1.2 2 1.2z" fill="#2874F0"/>
      </svg>
    )
  },
  {
    name: 'Apollo Hospitals',
    bg: '#FFFFFF',
    color: '#006B54',
    svg: (
      <svg viewBox="0 0 110 24" width="85" height="18" fill="none" style={{ display: 'block' }}>
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3 11h-2.5v2.5h-1V13H9v-1h2.5V9.5h1V12H15v1z" fill="#FFCC00"/>
        <path d="M28 20l3.5-12h3L38 20h-3.2l-.8-3h-3l-.8 3h-2.2zm4-5.5l-1-4-1 4h2zm11 5.5V7.5h3v2.2c.8-1.2 2-1.8 3.3-1.8 3 0 5.2 2 5.2 5s-2.2 5-5.2 5c-1.2 0-2.2-.5-3-1.5v6.8h-3zm6.5-6.8c1.5 0 2.5-1 2.5-2.6s-1-2.6-2.5-2.6c-.8 0-1.5.4-2 1.2v2.8c.5.8 1.2 1.2 2 1.2zM62 14c0-3.5 2.5-6.5 5.5-6.5s5.5 3 5.5 6.5-2.5 6.5-5.5 6.5-5.5-3-5.5-6.5zm8 0c0-2-1-3.5-2.5-3.5S65 12 65 14s1 3.5 2.5 3.5S70 16 70 14zm6 6V4h3.5v16H76zm6 0V4h3.5v16H82z" fill="#006B54"/>
      </svg>
    )
  },
  {
    name: 'Aster Medcity',
    bg: '#FFFFFF',
    color: '#0085A1',
    svg: (
      <svg viewBox="0 0 100 24" width="75" height="18" fill="none" style={{ display: 'block' }}>
        <path d="M12 2l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1zm0 4.5l-.8 1.8-1.8.3 1.3 1.3-.3 1.8 1.6-.9 1.6.9-.3-1.8 1.3-1.3-1.8-.3z" fill="#FFCC00"/>
        <path d="M28 20l3.5-12h3L38 20h-3.2l-.8-3h-3l-.8 3h-2.2zm4-5.5l-1-4-1 4h2zm8.5 2c0 1.2.6 1.8 1.8 1.8.8 0 1.4-.4 1.8-.8v-2.2c-.4-.4-1-.6-1.8-.6-1.2 0-1.8.6-1.8 1.8zm3.2 3.5V19c-.8 1-1.8 1.5-3 1.5-3 0-4.8-1.8-4.8-4.5s1.8-4.5 4.8-4.5c1.2 0 2.2.5 3 1.5v-1h3V20h-3zm11 0V7.5h3v2c.8-1 1.8-1.5 3-1.5v3.2h-.5c-1.5 0-2.5.8-2.5 2.5V20h-3z" fill="#0085A1"/>
      </svg>
    )
  },
  {
    name: 'DP World',
    bg: '#FFFFFF',
    color: '#0D2C54',
    svg: (
      <svg viewBox="0 0 100 24" width="75" height="18" fill="none" style={{ display: 'block' }}>
        <circle cx="10" cy="12" r="8" fill="#00B4D8"/>
        <path d="M6 12s2-4 4-4 4 4 4 4-2 4-4 4-4-4-4-4z" fill="#0D2C54"/>
        <path d="M24 20V4h5c3.5 0 6 2 6 5.5s-2.5 5.5-6 5.5H27.5v5H24zm5-8c1.8 0 2.8-1 2.8-2.5s-1-2.5-2.8-2.5H27.5v5H29zm10 8V4h5c3.5 0 6 2 6 5.5s-2.5 5.5-6 5.5H47.5v5H39zm5-8c1.8 0 2.8-1 2.8-2.5s-1-2.5-2.8-2.5H42.5v5H44zm14 8l-3-16h4l1.8 9.5 2-9.5H62l2 9.5 1.8-9.5h4l-3 16h-4l-1.8-9.5-1.8 9.5h-4zm15-11c-3.3 0-5.5 2-5.5 5s2.2 5 5.5 5 5.5-2 5.5-5-2.2-5-5.5-5zm0 7.2c-1.5 0-2.5-1-2.5-2.2s1-2.2 2.5-2.2 2.5 1 2.5 2.2-1 2.2-2.5 2.2zm11 3.8V7.5h3v2c.8-1 1.8-1.5 3-1.5v3.2h-.5c-1.5 0-2.5.8-2.5 2.5V20h-3z" fill="#0D2C54"/>
      </svg>
    )
  },
  {
    name: 'Reliance Retail',
    bg: '#FFFFFF',
    color: '#E21B22',
    svg: (
      <svg viewBox="0 0 100 24" width="75" height="18" fill="none" style={{ display: 'block' }}>
        <path d="M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2zm1 14h-2V8h2zm0-10h-2V4h2z" fill="#E21B22"/>
        <path d="M28 20V4h5c2.5 0 4.2 1.2 4.2 3.5A3 3 0 0 1 35 10c1.8.8 2.5 2 3 3.8l1 6.2h-3.2l-.8-5.5c-.4-2.5-1.5-3-3-3H31v8.5h-3zm3-11.5h2c1.2 0 1.8-.5 1.8-1.5s-.6-1.5-1.8-1.5h-2v3zm11 11.5V7.5h3v2.2c.8-1.2 2-1.8 3.3-1.8 3 0 5.2 2 5.2 5s-2.2 5-5.2 5c-1.2 0-2.2-.5-3-1.5v6.8h-3zm6.5-6.8c1.5 0 2.5-1 2.5-2.6s-1-2.6-2.5-2.6c-.8 0-1.5.4-2 1.2v2.8c.5.8 1.2 1.2 2 1.2z" fill="#E21B22"/>
      </svg>
    )
  },
  {
    name: 'Blue Dart',
    bg: '#FFFFFF',
    color: '#003399',
    svg: (
      <svg viewBox="0 0 100 24" width="75" height="18" fill="none" style={{ display: 'block' }}>
        <polygon points="2,12 8,6 14,12 10,12 10,18 6,18 6,12" fill="#003399"/>
        <path d="M24 20V4h5c2.5 0 4.2 1.2 4.2 3.5A3 3 0 0 1 31 10c2.5 0 4.2 1.5 4.2 4.5V20H24zm5-11.5H27.5v3.2H29c1 0 1.5-.5 1.5-1.6s-.5-1.6-1.5-1.6zm1.5 7.5H27.5v3.2H30.5c1 0 1.5-.5 1.5-1.6s-.5-1.6-1.5-1.6zM39 20V4h3.5v12.5h6V20H39zm15.5-11c-3.3 0-5.5 2-5.5 5s2.2 5 5.5 5 5.5-2 5.5-5-2.2-5-5.5-5zm0 7.2c-1.5 0-2.5-1-2.5-2.2s1-2.2 2.5-2.2 2.5 1 2.5 2.2-1 2.2-2.5 2.2zm11-7.2h5c2.5 0 4.2 1.2 4.2 3.5A3 3 0 0 1 73 10c1.8.8 2.5 2 3 3.8l1 6.2h-3.2l-.8-5.5c-.4-2.5-1.5-3-3-3H70v8.5h-3zm3.5-8.5H72v3.2h1.5c1 0 1.5-.5 1.5-1.6s-.5-1.6-1.5-1.6zm11 8.5h-2.5V4H93v3.5h-2.5v12.5z" fill="#003399"/>
      </svg>
    )
  },
  {
    name: 'Delhivery',
    bg: '#FFFFFF',
    color: '#1A1A1A',
    svg: (
      <svg viewBox="0 0 100 24" width="75" height="18" fill="none" style={{ display: 'block' }}>
        <path d="M6 2L2 8h8L6 2z" fill="#FF9900"/>
        <path d="M24 20V4h5c3.5 0 6 2 6 5.5s-2.5 5.5-6 5.5h-1.5v5H24zm5-8c1.8 0 2.8-1 2.8-2.5s-1-2.5-2.8-2.5h-1.5v5H29zm12.5 8V7.5h3v2.2c.8-1.2 2-1.8 3.3-1.8 3 0 5.2 2 5.2 5s-2.2 5-5.2 5c-1.2 0-2.2-.5-3-1.5v6.8h-3zm6.5-6.8c1.5 0 2.5-1 2.5-2.6s-1-2.6-2.5-2.6c-.8 0-1.5.4-2 1.2v2.8c.5.8 1.2 1.2 2 1.2zm11 6.8V4h3.5v16H76z" fill="#1A1A1A"/>
      </svg>
    )
  }
]

export const HomePageClient: React.FC<Props> = ({
  stats, companies, certs, programCards, testimonialCards, heroCollage,
  heroHeadline, heroHighlight, heroDescription,
}) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [isVideoOpen, setIsVideoOpen] = React.useState(false)
  const [liveReviews, setLiveReviews] = React.useState<{
    reviews: Array<{ name: string; role: string; text: string; initial: string; color: string }>
    rating: string
    count: string
  } | null>(null)

  const slides = [
    {
      eyebrow: "Healthcare & Corporate Operations",
      title: "Business Administration & Hospital Management",
      highlight: "Combined Corporate Operations & Healthcare Management",
      description: "Master corporate management, financial planning, workflow automation, patient relations, and NABH healthcare quality standards.",
      image: '/media/hospital-admin-hero.png',
      color: '#00B6E8',
      href: "/programs/business-hospital-management"
    },

    {
      eyebrow: "Corporate People Operations",
      title: "Best HR Management Course In Kochi",
      highlight: "Learn Recruitment, Payroll, Analytics and HRIS Tools",
      description: "Practical people operations, candidate sourcing, payroll software, HR analytics, employee engagement, and corporate compliance training.",
      image: '/media/hr-management-hero.png',
      color: '#C040A0',
      href: "/programs/hr-management"
    },
    {
      eyebrow: "Global Trade Pathway",
      title: "Best Logistics & Supply Chain Course In Kochi",
      highlight: "Practical Global Trade Training with Port & Warehouse Visits",
      description: "Master warehousing, shipping operations, procurement, customs clearance, port workflows, and ERP logistics systems.",
      image: '/media/logistics-hero.png',
      color: '#1A3DB8',
      href: "/programs/logistics-supply-chain"
    },
    {
      eyebrow: "Industrial Energy Pathway",
      title: "Best Oil & Gas Engineering Course In Kochi",
      highlight: "International QA/QC & NDT Certifications for Gulf Careers",
      description: "Master safety-first technical refinery operations, piping inspection, QA/QC, non-destructive testing (NDT), and HSE guidelines.",
      image: '/media/oil-gas-hero.png',
      color: '#FF2E1F',
      href: "/programs/oil-gas"
    }
  ]

  React.useEffect(() => {
    fetch('/api/google-reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews && data.reviews.length > 0) {
          setLiveReviews({
            reviews: data.reviews,
            rating: data.rating || '4.7',
            count: data.count || '511',
          })
        }
      })
      .catch((err) => console.error('Error fetching live reviews:', err))
  }, [])

  const [animatedCount, setAnimatedCount] = React.useState(0)
  const targetCount = liveReviews ? parseInt(liveReviews.count) || 511 : 511

  React.useEffect(() => {
    let start = 0
    const end = targetCount
    if (end === 0) return
    const duration = 1500 // 1.5s
    const stepTime = 15
    const stepSize = Math.max(Math.ceil(end / (duration / stepTime)), 1)
    const timer = setInterval(() => {
      start += stepSize
      if (start >= end) {
        setAnimatedCount(end)
        clearInterval(timer)
      } else {
        setAnimatedCount(start)
      }
    }, stepTime)
    return () => clearInterval(timer)
  }, [targetCount])

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  // Duplicate logo badges for a seamless infinite running marquee loop
  const marqueeLogos = [...companyLogos, ...companyLogos, ...companyLogos, ...companyLogos]

  return (
    <>
      {/* HERO SLIDER / CAROUSEL (SKILLAGE STYLE) */}
      <section className="hero-slider-wrap">
        <div className="hero-slider-container">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}
            >
              <div className="wrap">
                <div className="slide-grid">
                  {/* Google Reviews Badge for Mobile View (shows above image) */}
                  <a
                    href="https://www.google.com/search?q=skillversity&rlz=1C1OPNX_enIN1171IN1171&oq=skillvers&gs_lcrp=EgZjaHJvbWUqBggBECMYJzIGCAAQRRg8MgYIARAjGCcyBggCEEUYOTIGCAMQRRg8MgYIBBBFGDwyBggFEEUYPDIGCAYQRRg8MgYIBxBFGEHSAQgzNDE5ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x3b080d665f30007f:0x1656ac17070f06af,1,,,,"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="slide-rating-badge slide-rating-badge-mobile"
                    style={{ textDecoration: 'none', cursor: 'pointer' }}
                  >
                    <span className="stars">★★★★★</span>
                    <span className="text">{liveReviews?.rating || '4.7'}/5 Google Rating ({animatedCount} Reviews)</span>
                  </a>

                  <div className="slide-content-col">
                    {/* Google Reviews Badge for Desktop View */}
                    <a
                      href="https://www.google.com/search?q=skillversity&rlz=1C1OPNX_enIN1171IN1171&oq=skillvers&gs_lcrp=EgZjaHJvbWUqBggBECMYJzIGCAAQRRg8MgYIARAjGCcyBggCEEUYOTIGCAMQRRg8MgYIBBBFGDwyBggFEEUYPDIGCAYQRRg8MgYIBxBFGEHSAQgzNDE5ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x3b080d665f30007f:0x1656ac17070f06af,1,,,,"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="slide-rating-badge slide-rating-badge-desktop"
                      style={{ textDecoration: 'none', cursor: 'pointer' }}
                    >
                      <span className="stars">★★★★★</span>
                      <span className="text">{liveReviews?.rating || '4.7'}/5 Google Rating ({animatedCount} Reviews)</span>
                    </a>

                    <h1 className="h-hero" style={{ marginTop: '12px', lineHeight: 1.1 }}>
                      {slide.title}
                      <br />
                      <span
                        className="grad-text"
                        style={{
                          background: `linear-gradient(135deg, ${slide.color}, var(--brand-pink))`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          color: 'transparent',
                          display: 'inline',
                        }}
                      >
                        {slide.highlight}
                      </span>
                    </h1>
                    <p className="lead" style={{ marginTop: '18px', maxWidth: '600px' }}>
                      {slide.description}
                    </p>
                    
                    <div className="slide-bullets-row">
                      <div className="slide-bullet">
                        <GraduationCap className="slide-bullet-icon" size={18} />
                        <span>Get Skilled</span>
                      </div>
                      <div className="slide-bullet">
                        <Briefcase className="slide-bullet-icon" size={18} />
                        <span>Get Certified</span>
                      </div>
                      <div className="slide-bullet">
                        <TrendingUp className="slide-bullet-icon" size={18} />
                        <span>Get Hired</span>
                      </div>
                      <div className="slide-bullet">
                        <Laptop className="slide-bullet-icon" size={18} />
                        <span>Online & Offline</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', width: '100%' }}>
                      <Link
                        href={slide.href}
                        className="btn btn-skillage-teal"
                        style={{ flexGrow: 1, minWidth: '220px', justifyContent: 'center' }}
                      >
                        Enroll Now
                      </Link>
                      <Link
                        href="/contact?action=counseling"
                        className="btn btn-skillage-navy"
                        style={{ flexGrow: 1, minWidth: '220px', justifyContent: 'center' }}
                      >
                        Book a Free Consultation
                      </Link>
                    </div>
                  </div>

                  <div className="slide-image-col">
                    {/* Glowing radial gradient backdrop blob */}
                    <div
                      className="decor-blob"
                      style={{
                        background: `radial-gradient(circle, ${slide.color} 0%, transparent 70%)`,
                        animation: 'pulse-soft 6s infinite ease-in-out',
                      }}
                    />
                    
                    {/* Floating Outlined Sparkle/Star */}
                    <svg className="decor-shape decor-star" viewBox="0 0 24 24" fill="none" stroke={slide.color} strokeWidth="1.5">
                      <path d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M5.636 18.364L18.364 5.636" strokeLinecap="round"/>
                    </svg>

                    {/* Floating Outlined Ring */}
                    <svg className="decor-shape decor-ring" viewBox="0 0 24 24" fill="none" stroke={slide.color} strokeWidth="1.2">
                      <circle cx="12" cy="12" r="8" strokeDasharray="3 3"/>
                    </svg>

                    {/* Floating Outlined Diamond */}
                    <svg className="decor-shape decor-diamond" viewBox="0 0 24 24" fill="none" stroke={slide.color} strokeWidth="1.5">
                      <rect x="6" y="6" width="12" height="12" rx="2" transform="rotate(45 12 12)"/>
                    </svg>

                    {/* Floating Outlined Plus */}
                    <svg className="decor-shape decor-plus" viewBox="0 0 24 24" fill="none" stroke={slide.color} strokeWidth="1.5">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
                    </svg>

                    {/* Floating Outlined Circle Two */}
                    <svg className="decor-shape decor-circle-two" viewBox="0 0 24 24" fill="none" stroke={slide.color} strokeWidth="1.5">
                      <circle cx="12" cy="12" r="5"/>
                    </svg>

                    {/* Floating Outlined Cross */}
                    <svg className="decor-shape decor-cross" viewBox="0 0 24 24" fill="none" stroke={slide.color} strokeWidth="1.5">
                      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round"/>
                    </svg>

                    {/* Floating Outlined Triangle */}
                    <svg className="decor-shape decor-triangle" viewBox="0 0 24 24" fill="none" stroke={slide.color} strokeWidth="1.5">
                      <polygon points="12,5 5,18 19,18" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    {/* Floating Outlined Dash */}
                    <svg className="decor-shape decor-dash" viewBox="0 0 24 24" fill="none" stroke={slide.color} strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round"/>
                    </svg>

                    <div className="slide-image-wrapper">
                      <Image
                        src={slide.image}
                        alt={slide.image}
                        fill
                        priority={idx === 0}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: 'contain', objectPosition: 'bottom left' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className="slider-arrow slider-arrow-prev"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="slider-arrow slider-arrow-next"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicators/Dots */}
        <div className="slider-dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`slider-dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <section className="marquee-wrap">
        <div style={{ textAlign: 'center', marginBottom: '14px', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--ink-mute)' }}>
          Our Students Get Hired By {stats.hiringPartners}+ Companies Including
        </div>
        <div className="marquee-track">
          {marqueeLogos.map((c, i) => (
            <span 
              className="m-logo-pill" 
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 22px',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: c.bg,
                color: c.color || '#ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                whiteSpace: 'nowrap',
                transition: 'transform 0.25s var(--ease), box-shadow 0.25s var(--ease)',
                cursor: 'default'
              }}
            >
              {c.svg}
            </span>
          ))}
        </div>
      </section>

      {/* STUDENT REALITY CHECK */}
      <section className="dark-sec section">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', alignItems: 'center' }}>
          <ScrollReveal>
            <span className="eyebrow"><span className="dot" />Student Reality Check</span>
            <h2 className="h-section" style={{ color: '#fff', marginTop: '18px' }}>
              You have the degree.<br /><em style={{ fontStyle: 'normal', color: 'var(--brand-yellow)' }}>But are you really job-ready?</em>
            </h2>
            <p className="lead" style={{ marginTop: '16px' }}>
              Many students graduate with certificates, yet feel completely stuck the moment real interviews and workplace pressure show up. Skillversity closes that gap — permanently.
            </p>
            <ul className="check-list" style={{ marginTop: '28px' }}>
              <li>Degree in hand but no job-relevant practical skills</li>
              <li>Interview confidence crumbles under real pressure</li>
              <li>Resumes sent weekly — zero callbacks received</li>
              <li>No experience — the classic hiring catch-22</li>
              <li>Career path unclear, every decision delayed</li>
            </ul>
            <style>{`.check-list li::before{background:var(--brand-pink)}`}</style>
          </ScrollReveal>
          <ScrollReveal>
            <div style={{ background: 'var(--grad-warm)', borderRadius: 'var(--rad-lg)', padding: '36px', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px -20px rgba(255,46,31,.45)' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
              <span className="tape">Skillversity closes this gap</span>
              <h3 style={{ fontSize: '26px', color: '#fff', marginTop: '16px', lineHeight: 1.1 }}>Job Ready. Life Ready. Future Ready.</h3>
              <p style={{ color: 'rgba(255,255,255,.9)', marginTop: '14px', fontSize: '15px' }}>A complete transformation — real projects, industry mentors, confidence training, structured placement support. From day one.</p>
              <ul style={{ marginTop: '20px', display: 'grid', gap: '9px' }}>
                {['Real workplace projects from week one',`${stats.mentors} mentors with 30+ years of industry experience`,`${stats.mentorshipYears}-year career mentorship post-placement`,'India + GCC pathways in every program'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#fff', fontWeight: 600, fontSize: '14.5px' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,255,255,.25)', display: 'grid', placeItems: 'center', fontSize: '11px', fontWeight: 800, flex: 'none' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-ghost-white btn-lg" style={{ marginTop: '24px', width: '100%' }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Book Free Counselling Call
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="section grid-paper">
        <div className="wrap">
          <ScrollReveal className="section-head">
            <span className="eyebrow"><span className="dot" />Career Programs</span>
            <h2 className="h-section" style={{ marginTop: '14px' }}>Four industry-led programs.<br /><span className="squiggle">One job-ready campus.</span></h2>
            <p className="lead">Every program is built around real workplace skills, expert mentors, India & GCC alignment, and structured placement support — so you graduate ready to work, not just qualified to apply.</p>
          </ScrollReveal>
          <div className="g4">
            {programCards.map((p, i) => (
              <ScrollReveal key={i}>
                <Link href={p.href} className="prog-card">
                  <div className="prog-card-media" style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: p.bg }}>
                    <MediaPlaceholder media={p.image} label={`${p.title} photo`} />
                  </div>
                  <div className="prog-card-head" style={{ background: 'transparent', paddingTop: '18px' }}>
                    <span className="prog-card-tag" style={{ background: p.tagBg }}>{p.tag}</span>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </div>
                  <div className="prog-card-body">
                    <div style={{ display: 'flex', gap: '20px', fontSize: '12.5px', fontWeight: 700, margin: '12px 0' }}>
                      <div><b style={{ display: 'block', fontSize: '10.5px', color: 'var(--ink-mute)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '2px' }}>Duration</b>{p.dur}</div>
                      <div><b style={{ display: 'block', fontSize: '10.5px', color: 'var(--ink-mute)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '2px' }}>Eligibility</b>{p.elig}</div>
                    </div>
                    <div style={{ color: p.color, fontWeight: 800, fontSize: '14px' }}>Explore program →</div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link href="/programs" className="btn btn-dark btn-lg">Compare All Programs in Detail →</Link>
          </div>
        </div>
      </section>

      {/* PLACEMENTS */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <ScrollReveal className="section-head">
            <span className="eyebrow"><span className="dot" />Placement Commitment</span>
            <h2 className="h-section" style={{ marginTop: '14px' }}>{stats.placements}+ Placements from 2014.<br /><span className="squiggle">A structured commitment.</span></h2>
            <p className="lead">At Skillversity, placement is not a promise — it is a structured, end-to-end commitment.</p>
          </ScrollReveal>
          <ScrollReveal>
            <div style={{ background: '#fff', border: '2px solid var(--ink)', borderRadius: 'var(--rad-lg)', padding: '40px', boxShadow: '8px 8px 0 var(--ink)' }}>
              <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 'clamp(68px,12vw,140px)', lineHeight: '.85', background: 'var(--grad-brand)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', backgroundSize: '200% 100%', animation: 'gradShift 10s linear infinite' }}>
                {stats.placements}<sup style={{ fontSize: '.35em' }}>+</sup>
              </div>
              <h3 className="h-section" style={{ marginTop: '12px', marginBottom: '12px' }}>Placements from 2014.</h3>
              <p style={{ color: 'var(--ink-soft)', fontSize: '15.5px', maxWidth: '560px', lineHeight: 1.6 }}>
                Hospital Administration, Logistics, Oil & Gas, and HR Management roles placed across leading employers in India and GCC.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '18px' }}>
                <span className="role-pill" style={{ background: '#DBE5FF', color: 'var(--brand-blue)', fontWeight: 700 }}>617+ Company Connections</span>
                <span className="role-pill" style={{ background: '#FFE4ED', color: 'var(--brand-pink)', fontWeight: 700 }}>Dedicated Placement Team</span>
                <span className="role-pill" style={{ background: '#D1FAE5', color: '#065F46', fontWeight: 700 }}>{stats.mentorshipYears}-Year Career Mentorship</span>
                <span className="role-pill" style={{ background: '#FFF4D6', color: '#92400E', fontWeight: 700 }}>India + GCC Pathways</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '22px' }}>
                <Link href="/placements" className="btn btn-dark">View Full Placement Record →</Link>
                <Link href="/contact?action=brochure" className="btn btn-ghost">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download Report
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="dark-sec section--sm">
        <div className="wrap">
          <ScrollReveal>
            <div className="section-head" style={{ marginBottom: '36px' }}>
              <span className="eyebrow"><span className="dot" />Global Recognition</span>
              <h2 className="h-section" style={{ color: '#fff', marginTop: '14px' }}>Internationally Recognised.<br />Locally Relevant.</h2>
            </div>
          </ScrollReveal>
          <div className="g4" style={{ gap: '14px' }}>
            {certs.map((c, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 'var(--rad)', padding: '22px' }}>
                <div style={{ fontSize: '26px', marginBottom: '10px' }}>{c.icon}</div>
                <h4 style={{ color: 'var(--brand-yellow)', fontSize: '16px', marginBottom: '8px' }}>{c.title}</h4>
                <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,.75)' }}>{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="wrap">
          <ScrollReveal className="section-head">
            <span className="eyebrow"><span className="dot" />Student Voices</span>
            <h2 className="h-section" style={{ marginTop: '14px' }}>Students <span className="squiggle">feel the difference.</span></h2>
            <p className="lead">The strongest feedback is about confidence, practical learning, and the feeling that Skillversity is a launchpad — not just an institution.</p>
          </ScrollReveal>
          <div className="g3">
            {testimonialCards.map((t, i) => (
              <ScrollReveal key={i}>
                <div className="t-card">
                  <div className="qmark">&quot;</div>
                  <div className="stars">★★★★★</div>
                  <p className="quote">{t.q}</p>
                  <div className="person">
                    <div className="ava" style={{ background: t.color }}>{t.init}</div>
                    <div className="meta"><b>{t.name}</b><span>{t.role}</span></div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS SECTION */}
      <section className="section google-reviews-section">
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: '32px' }}>
            <span className="eyebrow"><span className="dot" />Educational Institution in Kerala</span>
            <h2 className="h-section" style={{ marginTop: '14px' }}>Verified Google Reviews</h2>
            <p className="lead" style={{ marginTop: '8px' }}>See what our students say about their journey to becoming job-ready.</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <a 
              href="https://www.google.com/search?q=skillversity&rlz=1C1OPNX_enIN1171IN1171&oq=skillvers&gs_lcrp=EgZjaHJvbWUqBggBECMYJzIGCAAQRRg8MgYIARAjGCcyBggCEEUYOTIGCAMQRRg8MgYIBBBFGDwyBggFEEUYPDIGCAYQRRg8MgYIBxBFGEHSAQgzNDE5ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x3b080d665f30007f:0x1656ac17070f06af,1,,,," 
              target="_blank" 
              rel="noopener noreferrer" 
              className="google-reviews-badge pulse-google"
            >
              <svg className="g-icon" viewBox="0 0 24 24" width="24" height="24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.08H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.92l2.85-2.22.81-.6z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.08l3.66 2.84c.87-2.6 3.3-4.54 6.16-4.54z"/>
              </svg>
              <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)' }}>Google Rating</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--brand-orange)' }}>{liveReviews?.rating || '4.7'}/5</span>
                  <span style={{ color: '#fbbc05', fontSize: '13px' }}>★★★★★</span>
                  <span style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>({liveReviews?.count || '511'} reviews)</span>
                </div>
              </div>
            </a>
          </div>

          <div className="google-reviews-marquee-wrap">
            <div className="google-reviews-track">
              {(() => {
                const staticFallbackReviews = [
                  { name: 'Amaljith P. V.', role: 'Oil & Gas Graduate', text: 'My journey in the Oil & Gas Engineering program at Skillversity was both transformative and rewarding. The practical training helped me build the skills needed for a successful professional career.', initial: 'A', color: 'var(--brand-orange)' },
                  { name: 'Mehzana K. A.', role: 'Hospital Administration Graduate', text: 'IMS Skillversity was a wonderful journey for me. It helped shape my confidence, communication skills, and professional growth. It truly made me who I am today.', initial: 'M', color: 'var(--brand-pink)' },
                  { name: 'Muhammed Jamal', role: 'Oil & Gas Graduate', text: 'My time at Skillversity helped me gain extensive industry knowledge, build immense confidence, overcome stage fear, and develop strong teamwork skills. It was a wonderful journey.', initial: 'M', color: 'var(--brand-blue)' },
                  { name: 'Adithya K. S.', role: 'Logistics Graduate', text: 'Skillversity transformed my career. The practical logistics training and mock interviews gave me the confidence to ace my interview at DHL. Highly recommended for logistics aspirants!', initial: 'A', color: 'var(--brand-blue)' },
                  { name: 'Anjali Menon', role: 'HR Management Graduate', text: 'The personality development sessions and resume building workshops were a game changer. I went from having zero callbacks to receiving three job offers in HR departments.', initial: 'A', color: 'var(--brand-cyan)' },
                ]
                const baseReviews = liveReviews?.reviews || staticFallbackReviews
                // Duplicate reviews list for seamless looping marquee animation
                return [...baseReviews, ...baseReviews].map((rev, index) => (
                <div className="google-review-card" key={index}>
                  <div className="google-review-header">
                    <div className="google-reviewer">
                      <div className="google-reviewer-avatar" style={{ background: rev.color }}>{rev.initial}</div>
                      <div className="google-reviewer-info">
                        <b>{rev.name}</b>
                        <span>{rev.role}</span>
                      </div>
                    </div>
                    <svg className="google-logo-sm" viewBox="0 0 24 24" width="16" height="16">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.08H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.92l2.85-2.22.81-.6z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.08l3.66 2.84c.87-2.6 3.3-4.54 6.16-4.54z"/>
                    </svg>
                  </div>
                  <div className="google-review-rating">★★★★★</div>
                  <p className="google-review-text">&quot;{rev.text}&quot;</p>
                  <div style={{ fontSize: '11px', color: 'var(--ink-mute)', marginTop: '14px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Verified Student</span>
                    <span>Google Review</span>
                  </div>
                </div>
              ))})()}
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM FEED SECTION */}
      <section className="section instagram-section">
        <div className="wrap">
          <ScrollReveal className="section-head" style={{ marginBottom: '40px' }}>
            <span className="eyebrow"><span className="dot" />Life At Campus</span>
            <h2 className="h-section" style={{ marginTop: '14px' }}>On Instagram</h2>
            <p className="lead" style={{ marginTop: '8px' }}>Follow our journey, campus life events, and placement highlights on social media.</p>
          </ScrollReveal>

          <div className="instagram-marquee-wrap">
            <div className="instagram-track">
              {[
                { img: '/media/insta-1.jpg', likes: '312', comments: '28' },
                { img: '/media/insta-2.jpg', likes: '489', comments: '54' },
                { img: '/media/insta-3.jpg', likes: '411', comments: '39' },
                { img: '/media/insta-4.jpg', likes: '267', comments: '22' },
                { img: '/media/insta-5.jpg', likes: '382', comments: '41' },
                { img: '/media/insta-6.jpg', likes: '354', comments: '30' }
              ].concat([
                { img: '/media/insta-1.jpg', likes: '312', comments: '28' },
                { img: '/media/insta-2.jpg', likes: '489', comments: '54' },
                { img: '/media/insta-3.jpg', likes: '411', comments: '39' },
                { img: '/media/insta-4.jpg', likes: '267', comments: '22' },
                { img: '/media/insta-5.jpg', likes: '382', comments: '41' },
                { img: '/media/insta-6.jpg', likes: '354', comments: '30' }
              ]).map((post, idx) => (
                <div className="instagram-card" key={idx}>
                  <Image
                    src={post.img}
                    alt={`Instagram Post ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 300px, 320px"
                    className="instagram-media"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="instagram-overlay">
                    <span>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      {post.likes}
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                      </svg>
                      {post.comments}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <a 
              href="https://www.instagram.com/skillversity.global/?hl=en" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-instagram btn-lg"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ marginRight: '6px' }}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              Follow us on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <ScrollReveal className="section-head">
            <span className="eyebrow"><span className="dot" />Career Insights</span>
            <h2 className="h-section" style={{ marginTop: '14px' }}>From our <span className="squiggle">knowledge hub.</span></h2>
            <p className="lead">Career guides, industry news, placement stories, and expert advice.</p>
          </ScrollReveal>
          <div className="g3">
            {[
              { href: '/blog/logistics-career-guide', bg: 'linear-gradient(135deg,#0A007A,#1A3DB8)', icon: '📦', cat: 'Logistics', catBg: '#1A3DB8', title: 'Why Logistics is the Best Career Choice for Students in 2025', desc: 'Amazon, Maersk, DHL — the demand for logistics talent is at an all-time high.', time: '8 min read', image: '/media/classroom-students-lecture-500x500.jpg' },
              { href: '/blog/hospital-admin-guide', bg: 'linear-gradient(135deg,#00B6E8,#FF1F5C)', icon: '🏥', cat: 'Healthcare', catBg: '#00B6E8', title: 'Hospital Administration: The Complete Career Guide for Indian Students', desc: 'No medical background required. One of the fastest-growing careers in India and the Gulf.', time: '10 min read', image: '/media/image-hero1-500x500.webp' },
              { href: '/blog', bg: 'linear-gradient(135deg,#FF2E1F,#FFCB28)', icon: '🛢', cat: 'Oil & Gas', catBg: '#FF2E1F', title: 'Oil & Gas Jobs in the Gulf: How to Get Hired from India in 2025', desc: 'QA/QC, NDT, HSE — the Gulf is actively hiring from India.', time: '9 min read', image: '/media/oil-and-gas-worker-500x500.jpg' },
            ].map((b, i) => (
              <ScrollReveal key={i}>
                <Link href={b.href} className="blog-card">
                  <div className="blog-thumb" style={b.image ? { position: 'relative', overflow: 'hidden' } : { background: b.bg }}>
                    {b.image ? (
                      <Image
                        src={b.image}
                        alt={b.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      b.icon
                    )}
                  </div>
                  <div className="blog-body">
                    <span className="cat" style={{ background: b.catBg }}>{b.cat}</span>
                    <h3>{b.title}</h3>
                    <p>{b.desc}</p>
                    <div className="blog-meta"><span>{b.time}</span><span>Career Guide</span></div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link href="/blog" className="btn btn-dark btn-lg">View All Articles →</Link>
          </div>
        </div>
      </section>
      {/* CTA + FORM */}
      <section className="dark-sec section">
        <div className="wrap cta-wrap">
          <ScrollReveal>
            <span className="eyebrow"><span className="dot" />Take the Next Step</span>
            <h2 className="h-section" style={{ color: '#fff', marginTop: '16px' }}>
              Ready to build your<br /><span style={{ color: 'var(--brand-yellow)' }}>job-ready career?</span>
            </h2>
            <p className="lead" style={{ marginTop: '16px' }}>Book a free 15-minute counselling call — no commitment, just clarity.</p>
            <div className="cta-btn-group">
              <Link href="/contact" className="btn btn-brand btn-lg" style={{ flexGrow: 1, minWidth: '280px', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Book Free Counselling Call
              </Link>
              <div className="cta-btn-subgroup">
                <Link href="/contact?action=brochure" className="btn btn-ghost-white btn-lg" style={{ flex: 1, justifyContent: 'center' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download Brochure
                </Link>
                <a href="https://wa.me/919946033355" target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-lg" style={{ flex: 1, justifyContent: 'center' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ flexShrink: 0 }}>
                    <path d="M12.012 2C6.48 2 2 6.48 2 12.012c0 1.918.528 3.708 1.44 5.244L2 22l4.908-1.284a9.932 9.932 0 005.104 1.392c5.532 0 10.012-4.48 10.012-10.012C22.024 6.48 17.544 2 12.012 2zm4.884 13.836c-.204.576-.996 1.056-1.632 1.188-.444.096-.996.168-2.952-.648-2.508-1.044-4.116-3.6-4.236-3.768-.132-.168-.96-1.272-.96-2.436 0-1.164.6-1.74.816-1.98.216-.24.468-.3.624-.3h.444c.144 0 .348.012.504.384.168.396.576 1.392.624 1.488.048.096.084.216.012.36-.072.144-.108.24-.228.372-.12.144-.24.3-.348.408-.108.108-.228.228-.096.456.132.228.588.972 1.26 1.572.864.768 1.596 1.008 1.824 1.116.228.108.36.096.492-.06.132-.156.576-.672.732-.9.156-.228.312-.192.528-.108.216.084 1.368.648 1.608.768.24.12.396.18.456.288.06.108.06.624-.144 1.2z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="cta-info-grid">
              <div className="cta-info-card">
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,.5)', marginBottom: '4px', fontWeight: 700 }}>Phone / WhatsApp</div>
                <a href="tel:+919946033355" style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>+91 99460 33355</a>
              </div>
              <div className="cta-info-card">
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,.5)', marginBottom: '4px', fontWeight: 700 }}>Email</div>
                <a href="mailto:info@skillversityglobal.com" style={{ color: '#fff', fontWeight: 700, fontSize: '13px' }}>info@skillversityglobal.com</a>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <LeadForm />
          </ScrollReveal>
        </div>
      </section>

      {/* VIDEO PLAYBACK MODAL */}
      {isVideoOpen && (
        <div className="video-modal-backdrop" onClick={() => setIsVideoOpen(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setIsVideoOpen(false)} aria-label="Close Video">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="video-iframe-container">
              <iframe
                src="https://www.youtube.com/embed/vHkV7susa20?autoplay=1&mute=0"
                title="Skillversity Global Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
