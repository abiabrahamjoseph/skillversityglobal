import type { Payload } from 'payload'
import fs from 'fs'
import path from 'path'

export async function seedSkillversityData(payload: Payload, leadFormID?: number | string) {
  payload.logger.info('— Seeding Programs...')

  const programs = [
    {
      title: 'Hospital Administration',
      slug: 'hospital-administration',
      tag: 'Healthcare',
      tagColor: '#00B6E8',
      accentColor: '#00B6E8',
      cardGradient: 'linear-gradient(135deg,#E0F7FD,#FFE4ED)',
      shortDescription: 'Patient services, billing, NABH quality, HIS and team coordination — for India and GCC hospitals.',
      duration: '10 / 12 months',
      eligibility: '12th, Degree, Diploma',
      sortOrder: 1,
      status: 'active' as const,
      heroHeadline: 'Build a Career in Hospital Administration',
      heroDescription: 'Manage patient flow, billing, compliance, and hospital operations. No medical background required.',
      salaryRange: '₹15K–25K/month (India) · AED 2,500–5,000/month (Gulf)',
      highlights: [
        { icon: '🏥', title: 'Patient Services', description: 'Master front office, registration, discharge, and patient relationship management.' },
        { icon: '💊', title: 'Medical Billing', description: 'Insurance processing, TPA coordination, and revenue cycle management.' },
        { icon: '📋', title: 'NABH Quality', description: 'Quality assurance and compliance with NABH accreditation standards.' },
        { icon: '💻', title: 'HIS Systems', description: 'Hands-on training with Hospital Information Systems used by major hospitals.' },
      ],
      careerRoles: [
        { role: 'Front Office Executive' },
        { role: 'Patient Relations Coordinator' },
        { role: 'Medical Records Officer' },
        { role: 'Quality (NABH) Coordinator' },
        { role: 'Billing & Insurance Executive' },
        { role: 'Operations Manager' },
      ],
      certifications: [
        { name: 'Qualifi UK', description: 'UK-based awarding body certification' },
        { name: 'NABH Standards', description: 'National Accreditation Board for Hospitals' },
      ],
    },
    {
      title: 'Logistics & Supply Chain',
      slug: 'logistics-supply-chain',
      tag: 'Global Trade',
      tagColor: '#1A3DB8',
      accentColor: '#1A3DB8',
      cardGradient: 'linear-gradient(135deg,#DBE5FF,#FFF0E0)',
      shortDescription: 'Warehousing, shipping, procurement, customs, ERP — the engine behind every global business.',
      duration: '6 / 10 months',
      eligibility: 'Any stream',
      sortOrder: 2,
      status: 'active' as const,
      heroHeadline: 'Master Logistics & Supply Chain Management',
      heroDescription: 'India\'s logistics sector is a ₹20 lakh crore industry. Enter the fastest-growing career in global trade.',
      salaryRange: '₹2.5–3.5L/year (Entry) · ₹8–15L/year (Mid) · AED 3,000–5,000/month (Gulf)',
      highlights: [
        { icon: '📦', title: 'Warehouse Operations', description: 'Receiving, putaway, picking, dispatch — live WMS training.' },
        { icon: '🚢', title: 'Shipping & Freight', description: 'International shipping, Bills of Lading, customs documentation.' },
        { icon: '📊', title: 'ERP & Analytics', description: 'SAP, WMS, and supply chain analytics tools used by real companies.' },
        { icon: '🌍', title: 'Global Trade', description: 'Import/export procedures, trade compliance, and GCC opportunities.' },
      ],
      careerRoles: [
        { role: 'Warehouse Operations Executive' },
        { role: 'Supply Chain Analyst' },
        { role: 'Documentation Executive' },
        { role: 'Procurement Officer' },
        { role: 'Logistics Coordinator' },
        { role: '3PL Operations Manager' },
      ],
      certifications: [
        { name: 'Qualifi UK', description: 'UK-based awarding body certification' },
        { name: 'CILT Alignment', description: 'Chartered Institute of Logistics and Transport' },
        { name: 'UAE Ministry Recognition', description: 'UAE Ministry of Education frameworks' },
      ],
    },
    {
      title: 'Oil & Gas',
      slug: 'oil-gas',
      tag: 'Industrial',
      tagColor: 'linear-gradient(90deg,#FF2E1F,#FF7A1A)',
      accentColor: '#FF2E1F',
      cardGradient: 'linear-gradient(135deg,#FFE8E8,#FFF4D6)',
      shortDescription: 'Safety-first technical career across refinery, piping, offshore — QA/QC, NDT, HSE, inspection.',
      duration: '4 / 8 months',
      eligibility: 'ITI / Diploma',
      sortOrder: 3,
      status: 'active' as const,
      heroHeadline: 'Launch Your Oil & Gas Career',
      heroDescription: 'The Gulf is investing $150 billion in oil and gas infrastructure. India is the #1 source of skilled workers.',
      salaryRange: '₹2.5–4L/year (India) · AED 3,000–6,000/month (Gulf Entry) · AED 8,000–15,000/month (Experienced)',
      highlights: [
        { icon: '🔧', title: 'QA/QC Inspection', description: 'Quality assurance and control for construction, welding, and piping.' },
        { icon: '🔬', title: 'NDT Testing', description: 'Ultrasonic, radiographic, magnetic particle, and visual testing methods.' },
        { icon: '⛑️', title: 'HSE Safety', description: 'Health, Safety, and Environment protocols for offshore and onshore operations.' },
        { icon: '🏭', title: 'Refinery Operations', description: 'Process operations, piping systems, and equipment maintenance.' },
      ],
      careerRoles: [
        { role: 'QA/QC Inspector' },
        { role: 'NDT Technician' },
        { role: 'HSE Officer' },
        { role: 'Piping Engineer' },
        { role: 'Process Operator' },
        { role: 'Safety Supervisor' },
      ],
      certifications: [
        { name: 'NEBOSH', description: 'National Examination Board in Occupational Safety and Health' },
        { name: 'IOSH', description: 'Institution of Occupational Safety and Health' },
      ],
    },
    {
      title: 'HR Management',
      slug: 'hr-management',
      tag: 'People Ops',
      tagColor: '#C040A0',
      accentColor: '#C040A0',
      cardGradient: 'linear-gradient(135deg,#FFE9F5,#EDE9FF)',
      shortDescription: 'Next-gen HR professional — recruitment, payroll, analytics, HRIS, employee engagement.',
      duration: '6 / 10 months',
      eligibility: 'Degree preferred',
      sortOrder: 4,
      status: 'active' as const,
      heroHeadline: 'Become a Modern HR Professional',
      heroDescription: 'HR is no longer about hiring and firing. It\'s data-driven, tech-enabled, and deeply strategic.',
      salaryRange: '₹2–3.5L/year (Entry) · ₹5–10L/year (Mid) · ₹12–20L/year (HR Manager at MNC)',
      highlights: [
        { icon: '👥', title: 'Recruitment', description: 'Source, screen, and hire talent using modern ATS and recruitment tools.' },
        { icon: '💰', title: 'Payroll & Compliance', description: 'PF, ESI, gratuity, TDS — complete statutory compliance management.' },
        { icon: '📈', title: 'HR Analytics', description: 'Attrition prediction, engagement scoring, compensation benchmarking.' },
        { icon: '🎓', title: 'L&D', description: 'Design and deliver training programs for employee upskilling.' },
      ],
      careerRoles: [
        { role: 'HR Executive' },
        { role: 'Recruitment Specialist' },
        { role: 'Payroll & Compliance Officer' },
        { role: 'HR Analytics Specialist' },
        { role: 'L&D Coordinator' },
        { role: 'Employee Engagement Manager' },
      ],
      certifications: [
        { name: 'Qualifi UK', description: 'UK-based awarding body certification' },
        { name: 'SHRM Alignment', description: 'Society for Human Resource Management standards' },
      ],
    },
  ]

  for (const program of programs) {
    await payload.create({
      collection: 'programs',
      context: {
        disableRevalidate: true,
      },
      data: program as any,
    })
  }

  payload.logger.info('— Seeding Testimonials...')

  const testimonials = [
    {
      studentName: 'Nikitha Lal',
      initials: 'NL',
      role: 'Sales Executive',
      company: 'JFS Logistics',
      quote: 'I gained valuable knowledge here and the faculty consistently dedicated extra time to help us succeed. I am proud to have been placed at JFS Logistics as a Sales Executive.',
      accentColor: 'var(--brand-pink)',
      featured: true,
      sortOrder: 1,
    },
    {
      studentName: 'Jithin Raj',
      initials: 'JR',
      role: 'Logistics Coordinator',
      company: 'Maersk',
      quote: 'It is not just an institution — it is a launchpad. The industry interaction sessions were highly valuable and helped me understand how real workplaces function.',
      accentColor: 'var(--brand-blue)',
      featured: true,
      sortOrder: 2,
    },
    {
      studentName: 'Athira J',
      initials: 'AJ',
      role: 'HR Executive',
      company: 'Lulu Group',
      quote: 'Skillversity helped me grow not only in my career but personally. I improved my communication, confidence, coordination and leadership skills significantly.',
      accentColor: 'var(--brand-cyan)',
      featured: true,
      sortOrder: 3,
    },
    {
      studentName: 'Pranav A V',
      initials: 'PV',
      role: 'Warehouse Executive',
      company: 'Delhivery',
      quote: 'Choosing logistics was my own decision. I researched seven institutes before joining. I am very proud of my choice — it was the best career decision I ever made.',
      accentColor: 'var(--brand-orange)',
      featured: true,
      sortOrder: 4,
    },
    {
      studentName: 'Rahul R',
      initials: 'RR',
      role: 'Supply Chain Analyst',
      company: 'Flipkart',
      quote: 'The practical sessions helped me understand the ground reality of operations. Faculty made sure the course felt genuinely career-focused and useful from day one.',
      accentColor: 'var(--brand-red)',
      featured: true,
      sortOrder: 5,
    },
    {
      studentName: 'Sreejith S',
      initials: 'SS',
      role: 'QA/QC Inspector',
      company: 'Gulf-bound',
      quote: 'They focus on personality development as much as the subject. I can now speak confidently in front of a crowd — that transformation changed my entire career trajectory.',
      accentColor: 'var(--brand-magenta)',
      featured: true,
      sortOrder: 6,
    },
  ]

  for (const testimonial of testimonials) {
    await payload.create({
      collection: 'testimonials',
      context: {
        disableRevalidate: true,
      },
      data: testimonial as any,
    })
  }

  payload.logger.info('— Seeding Site Settings...')

  const mentorFiles = [
    { filename: 'mentor-rajesh.png', alt: 'Dr Rajesh Kumar', name: 'Dr. Rajesh Kumar', init: 'RK', credential: 'Ex-COO, Apollo Hospitals · 35 yrs exp', roleType: 'hod' },
    { filename: 'mentor-suresh.png', alt: 'Suresh Menon', name: 'Suresh Menon', init: 'SM', credential: 'VP Supply Chain, Maersk · 28 yrs exp', roleType: 'hod' },
    { filename: 'mentor-anil.png', alt: 'Anil Joseph', name: 'Anil Joseph', init: 'AJ', credential: 'HSE Director, ADNOC · 32 yrs exp', roleType: 'hod' },
    { filename: 'mentor-priya.png', alt: 'Priya Krishnan', name: 'Priya Krishnan', init: 'PK', credential: 'CHRO, Infosys BPM · 25 yrs exp', roleType: 'hod' },
    { filename: 'mentor-vijay.png', alt: 'Vijay Thomas', name: 'Vijay Thomas', init: 'VT', credential: 'Director Operations, KIMS · 30 yrs exp', roleType: 'mentor' },
    { filename: 'mentor-neethu.png', alt: 'Neethu Suresh', name: 'Neethu Suresh', init: 'NS', credential: 'Logistics Head, Amazon India · 22 yrs exp', roleType: 'mentor' },
  ]

  const galleryItems = []

  for (const item of mentorFiles) {
    const filePath = path.join(process.cwd(), 'public', 'media', item.filename)
    let mediaId: string | number | null = null

    if (fs.existsSync(filePath)) {
      const existingMedia = await payload.find({
        collection: 'media',
        where: {
          filename: {
            equals: item.filename,
          },
        },
      })

      if (existingMedia.totalDocs > 0) {
        mediaId = existingMedia.docs[0].id
      } else {
        const fileBuffer = fs.readFileSync(filePath)
        const fileSize = fs.statSync(filePath).size
        const createdMedia = await payload.create({
          collection: 'media',
          data: {
            alt: item.alt,
          },
          file: {
            name: item.filename,
            data: fileBuffer,
            mimetype: 'image/png',
            size: fileSize,
          },
        })
        mediaId = createdMedia.id
      }
    }

    galleryItems.push({
      image: mediaId,
      firstName: item.init,
      fullName: item.name,
      credential: item.credential,
      roleType: item.roleType,
    })
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    context: {
      disableRevalidate: true,
    },
    data: {
      stats: {
        placements: '10141',
        placementsLabel: 'Placements from 2014',
        hiringPartners: '2000',
        hiringPartnersLabel: 'Hiring Partners',
        mentors: '43',
        mentorsLabel: 'Industry Mentors',
        mentorshipYears: '5',
        mentorshipLabel: 'Career Mentorship',
      },
      hiringCompanies: [
        { name: 'Amazon' }, { name: 'Flipkart' }, { name: 'DHL' }, { name: 'FedEx' },
        { name: 'Maersk' }, { name: 'Blue Dart' }, { name: 'Delhivery' }, { name: 'CMA CGM' },
        { name: 'UPS' }, { name: 'DSV' }, { name: 'Hapag-Lloyd' }, { name: 'Aster Medcity' },
        { name: 'Apollo Hospitals' }, { name: 'KIMS' }, { name: 'DP World' },
        { name: 'Reliance Retail' }, { name: 'JFS Logistics' }, { name: 'Kuehne+Nagel' },
      ],
      certifications: [
        { icon: '🎓', title: 'Qualifi UK Certification', description: 'UK-based awarding body certification, globally accepted and valued across international career markets.' },
        { icon: '🌐', title: 'CILT Alignment', description: 'Chartered Institute of Logistics and Transport standards — the global benchmark for supply chain professionals.' },
        { icon: '🇦🇪', title: 'UAE Ministry Recognition', description: 'Aligned with UAE Ministry of Education frameworks — essential credibility for Gulf career applications.' },
        { icon: '📲', title: 'Skillfolio Profile', description: 'A modern digital employability profile that proves readiness beyond a traditional CV or resume.' },
      ],
      mentorsGallery: galleryItems,
      heroHeadline: 'Stop studying.',
      heroHighlight: 'Start skilling.',
      heroDescription: 'Industry-led 10–12 month programs in Hospital Administration, Logistics & Supply Chain, Oil & Gas, and HR Management — built around real workplace skills, 43 industry mentors, and structured placement support for India and GCC careers.',
      leadForm: leadFormID,
      contact: {
        phone: '+91 99460 33355',
        phoneLink: 'tel:+919946033355',
        email: 'info@skillversityglobal.com',
        whatsapp: '919946033355',
        website: 'https://www.skillversityglobal.com',
        address: 'First Floor, Pattarumadom Building,\nChittoor Rd, North Kaloor,\nKochi, Kerala 682018',
      },
      social: {
        instagram: 'https://www.instagram.com/skillversity.global',
        facebook: '',
        linkedin: '',
        youtube: '',
      },
      footerTagline: "India's First Job-Ready Campus. We provide the skills — you build the empire. Premium career-training for students who want practical learning, confidence, and structured placement support.",
    } as any,
  })

  payload.logger.info('✓ Programs, Testimonials, and Site Settings seeded successfully!')
}
