export type SkillversityPageTemplate =
  | 'home'
  | 'about'
  | 'admissions'
  | 'contact'
  | 'placements'
  | 'mentors'
  | 'campus-life'
  | 'skillfolio'
  | 'privacy'
  | 'custom'

export type SkillversityStructuredPage = {
  slug: string
  title: string
  template: SkillversityPageTemplate
  layout?: any[] | null
  skillversity: {
    hero: {
      eyebrow?: string
      title: string
      highlight?: string
      description?: string
      theme?: 'light' | 'cool' | 'warm' | 'dark'
      primaryCtaLabel?: string
      primaryCtaUrl?: string
      secondaryCtaLabel?: string
      secondaryCtaUrl?: string
    }
    stats?: Array<{ value: string; label: string; description?: string; color?: string }>
    featureCards?: Array<{ icon?: string; title: string; description: string; color?: string }>
    contentSections?: Array<{
      eyebrow?: string
      title: string
      description?: string
      items?: Array<{ title: string; description?: string }>
    }>
    steps?: Array<{ title: string; description: string }>
    faqs?: Array<{ question: string; answer: string }>
  }
}

export const defaultContact = {
  phone: '+91 99460 33355',
  phoneLink: 'tel:+919946033355',
  email: 'info@skillversityglobal.com',
  whatsapp: '919946033355',
  website: 'https://www.skillversityglobal.com',
  address: 'First Floor, Pattarumadom Building,\nChittoor Rd, North Kaloor,\nKochi, Kerala 682018',
}

export const defaultSocial = {
  instagram: 'https://www.instagram.com/skillversity.global',
  facebook: '',
  linkedin: '',
  youtube: '',
}

export const defaultStats = {
  placements: '10141',
  placementsLabel: 'Placements from 2014',
  hiringPartners: '3000',
  hiringPartnersLabel: 'Hiring Partners',
  mentors: '43',
  mentorsLabel: 'Industry Mentors',
  mentorshipYears: '5',
  mentorshipLabel: 'Career Mentorship',
}

export const defaultCompanies = [
  'Amazon',
  'Flipkart',
  'DHL',
  'FedEx',
  'Maersk',
  'Blue Dart',
  'Delhivery',
  'CMA CGM',
  'UPS',
  'DSV',
  'Hapag-Lloyd',
  'Aster Medcity',
  'Apollo Hospitals',
  'KIMS',
  'DP World',
  'Reliance Retail',
  'JFS Logistics',
  'Kuehne+Nagel',
]

export const defaultCerts = [
  {
    icon: '🎓',
    title: 'Qualifi UK Certification',
    description: 'UK-based awarding body certification, globally accepted across international career markets.',
  },
  {
    icon: '🌐',
    title: 'CILT Alignment',
    description: 'Chartered Institute of Logistics and Transport standards for supply chain professionals.',
  },
  {
    icon: '🇦🇪',
    title: 'UAE Ministry Recognition',
    description: 'Aligned with UAE Ministry of Education frameworks for Gulf career credibility.',
  },
  {
    icon: '📲',
    title: 'Skillfolio Profile',
    description: 'A digital employability profile that proves readiness beyond a traditional CV.',
  },
]

export const defaultPrograms = [
  {
    title: 'Hospital Administration',
    slug: 'hospital-administration',
    tag: 'Management',
    tagColor: '#00B6E8',
    accentColor: '#00B6E8',
    cardGradient: 'linear-gradient(135deg,#E0F7FD,#FFE4ED)',
    shortDescription: 'Master corporate management, healthcare operations, NABH quality standards, patient relations, and workflow automation.',
    duration: '10 / 12 months',
    eligibility: 'Any stream',
    salaryRange: '₹18K-40K/month',
    image: '/media/hospital-admin-hero.png',
  },
  {
    title: 'HR Management',
    slug: 'hr-management',
    tag: 'Corporate HR',
    tagColor: '#C040A0',
    accentColor: '#C040A0',
    cardGradient: 'linear-gradient(135deg,#FFE9F5,#EDE9FF)',
    shortDescription: 'Practical people operations, candidate sourcing, payroll software, HR analytics, employee engagement, and corporate compliance training.',
    duration: '6 / 10 months',
    eligibility: 'Degree preferred',
    salaryRange: '₹20K-45K/month',
    image: '/media/hr-management-hero.png',
  },
  {
    title: 'Logistics & Supply Chain',
    slug: 'logistics-supply-chain',
    tag: 'Global Trade',
    tagColor: '#1A3DB8',
    accentColor: '#1A3DB8',
    cardGradient: 'linear-gradient(135deg,#DBE5FF,#FFF0E0)',
    shortDescription: 'Master warehousing, shipping operations, procurement, customs clearance, port workflows, and ERP logistics systems.',
    duration: '6 / 10 months',
    eligibility: 'Any stream',
    salaryRange: '₹18K-45K/month',
    image: '/media/logistics-hero.png',
  },
  {
    title: 'Oil & Gas',
    slug: 'oil-gas',
    tag: 'Industrial',
    tagColor: '#FF2E1F',
    accentColor: '#FF2E1F',
    cardGradient: 'linear-gradient(135deg,#FFE8E8,#FFF4D6)',
    shortDescription: 'Master safety-first technical refinery operations, piping inspection, QA/QC, non-destructive testing (NDT), and HSE guidelines.',
    duration: '4 / 8 months',
    eligibility: 'ITI / Diploma / Any stream',
    salaryRange: '₹25K-80K/month',
    image: '/media/oil-gas-hero.png',
  },
]

export const defaultBlogPosts = [
  {
    slug: 'logistics-career-guide',
    href: '/blog/logistics-career-guide',
    bg: 'linear-gradient(135deg,#0A007A,#1A3DB8)',
    icon: '📦',
    cat: 'Logistics',
    catBg: '#1A3DB8',
    title: 'Why Logistics is the Best Career Choice for Students in 2025',
    desc: 'Amazon, Maersk, DHL, and modern trade networks have made logistics one of the strongest career paths for practical learners.',
    time: '8 min read',
    image: '/media/classroom-students-lecture-500x500.jpg',
    body: 'Logistics powers ecommerce, retail, manufacturing, shipping, and global trade. Students who understand warehouse operations, documentation, ERP systems, and supply chain coordination can move into roles across India and the GCC.',
  },
  {
    slug: 'hospital-admin-guide',
    href: '/blog/hospital-admin-guide',
    bg: 'linear-gradient(135deg,#00B6E8,#FF1F5C)',
    icon: '🏥',
    cat: 'Healthcare',
    catBg: '#00B6E8',
    title: 'Hospital Administration: The Complete Career Guide for Indian Students',
    desc: 'No medical background required. Hospital administration is one of the fastest-growing non-clinical healthcare careers.',
    time: '10 min read',
    image: '/media/image-hero1-500x500.webp',
    body: 'Hospital administration covers patient services, billing, insurance coordination, records, NABH quality, and operations. It is ideal for students who want a healthcare career without becoming clinical staff.',
  },
  {
    slug: 'oil-gas-gulf-jobs',
    href: '/blog/oil-gas-gulf-jobs',
    bg: 'linear-gradient(135deg,#FF2E1F,#FFCB28)',
    icon: '🛢',
    cat: 'Oil & Gas',
    catBg: '#FF2E1F',
    title: 'Oil & Gas Jobs in the Gulf: How to Get Hired from India in 2025',
    desc: 'QA/QC, NDT, HSE, piping, and inspection skills are in demand across Gulf industrial projects.',
    time: '9 min read',
    image: '/media/oil-and-gas-worker-500x500.jpg',
    body: 'The Gulf energy sector needs safety-minded technical professionals. Training in QA/QC, NDT, HSE, refinery operations, and documentation helps candidates prepare for project-based hiring.',
  },
  {
    slug: 'hr-management-career',
    href: '/blog/hr-management-career',
    bg: 'linear-gradient(135deg,#C040A0,#FF1F5C)',
    icon: '👥',
    cat: 'HR',
    catBg: '#C040A0',
    title: 'HR Management: From Recruitment to Analytics - The Full Career Path',
    desc: 'Modern HR is data-driven, strategic, and high-growth.',
    time: '7 min read',
    image: '/media/image-post1-500x500.webp',
    body: 'HR professionals now work with recruitment platforms, payroll systems, compliance workflows, people analytics, and employee engagement programs. Practical HR training builds confidence for modern people operations.',
  },
  {
    slug: 'placement-success-stories',
    href: '/blog/placement-success-stories',
    bg: 'linear-gradient(135deg,#FF7A1A,#FFCB28)',
    icon: '🏆',
    cat: 'Placements',
    catBg: '#FF7A1A',
    title: 'From Classroom to Career: Placement Success Stories from Skillversity',
    desc: 'Real students, real placements, real transformations.',
    time: '6 min read',
    image: '/media/image-post2-500x500.webp',
    body: 'Placement success depends on practical training, confidence building, interview readiness, and employer connections. Skillversity combines these into a structured pathway.',
  },
  {
    slug: 'skillfolio-explained',
    href: '/blog/skillfolio-explained',
    bg: 'linear-gradient(135deg,#1A3DB8,#00B6E8)',
    icon: '📲',
    cat: 'Career Tips',
    catBg: '#1A3DB8',
    title: 'What is Skillfolio? Your Digital Employability Profile Explained',
    desc: 'Why every Skillversity graduate gets a Skillfolio and how it helps hiring conversations.',
    time: '5 min read',
    image: '/media/image-post3-500x500.webp',
    body: 'Skillfolio is a digital employability profile that brings together skills, certifications, projects, and readiness indicators in one shareable format.',
  },
]

export const defaultPages: Record<string, SkillversityStructuredPage> = {
  home: {
    slug: 'home',
    title: 'Home',
    template: 'home',
    skillversity: {
      hero: {
        eyebrow: "India's First Job-Ready Campus · Kochi, Kerala · Established 2020",
        title: 'Stop studying.',
        highlight: 'Start skilling.',
        description:
          'Industry-led programs in Hospital Administration, Logistics & Supply Chain, Oil & Gas, and HR Management, built around real workplace skills and structured placement support.',
        theme: 'light',
        primaryCtaLabel: 'Book Free Counselling Call',
        primaryCtaUrl: '/contact',
        secondaryCtaLabel: 'Career Fit Test',
        secondaryCtaUrl: '/contact?action=test',
      },
    },
  },
  about: {
    slug: 'about',
    title: 'About',
    template: 'about',
    skillversity: {
      hero: {
        eyebrow: 'About Skillversity',
        title: 'A job-ready campus.',
        highlight: 'Built for real careers.',
        description:
          'Skillversity Global bridges the gap between education and employment through practical training, industry mentors, and placement-focused career pathways.',
        theme: 'cool',
      },
      featureCards: [
        { icon: '🎯', title: 'Practical Training', description: 'Every program is built around real workplace tasks, tools, and expectations.' },
        { icon: '🤝', title: 'Industry Mentors', description: 'Students learn from professionals who understand hiring standards.' },
        { icon: '🌍', title: 'Global Ambition', description: 'Programs are aligned for Indian and GCC career markets.' },
      ],
    },
  },
  admissions: {
    slug: 'admissions',
    title: 'Admissions',
    template: 'admissions',
    skillversity: {
      hero: {
        eyebrow: 'Admissions Open',
        title: 'Start with a counselling call.',
        highlight: 'No entrance exam required.',
        description:
          'Choose the right career track, understand eligibility, and complete admission with guidance from the Skillversity team.',
        theme: 'warm',
        primaryCtaLabel: 'Apply Now',
        primaryCtaUrl: '/contact',
      },
      steps: [
        { title: 'Book counselling', description: 'Share your background and preferred career direction.' },
        { title: 'Choose your program', description: 'Compare duration, eligibility, certifications, and career outcomes.' },
        { title: 'Confirm admission', description: 'Complete documentation and join the next available batch.' },
      ],
      faqs: [
        { question: 'Is there an entrance exam?', answer: 'No. Admission is based on counselling and eligibility fit.' },
        { question: 'Can working professionals join?', answer: 'Yes. Flexible schedules are available for selected programs.' },
      ],
    },
  },
  contact: {
    slug: 'contact',
    title: 'Contact',
    template: 'contact',
    skillversity: {
      hero: {
        eyebrow: 'Contact Skillversity',
        title: 'Book your free',
        highlight: 'career counselling call.',
        description: 'Talk to a counsellor about programs, eligibility, fees, batches, and placement pathways.',
        theme: 'cool',
      },
      featureCards: [
        { icon: '📞', title: 'Phone', description: defaultContact.phone },
        { icon: '✉️', title: 'Email', description: defaultContact.email },
        { icon: '📍', title: 'Campus', description: defaultContact.address },
      ],
    },
  },
  placements: {
    slug: 'placements',
    title: 'Placements',
    template: 'placements',
    skillversity: {
      hero: {
        eyebrow: 'Placement Commitment',
        title: '10141+ placements.',
        highlight: 'A structured career pathway.',
        description: 'Skillversity supports students through profile building, interview readiness, employer connections, and post-placement mentorship.',
        theme: 'dark',
      },
      stats: [
        { value: '10141+', label: 'Placements from 2014', color: 'var(--brand-pink)' },
        { value: '3000+', label: 'Hiring Partners', color: 'var(--brand-blue)' },
        { value: '5 yr', label: 'Career Mentorship', color: 'var(--brand-orange)' },
      ],
    },
  },
  mentors: {
    slug: 'mentors',
    title: 'Mentors',
    template: 'mentors',
    skillversity: {
      hero: {
        eyebrow: 'Industry Mentors',
        title: 'Learn from people',
        highlight: 'who know the workplace.',
        description: 'Skillversity mentors bring practical industry experience into every career program.',
        theme: 'light',
      },
      stats: [{ value: '43+', label: 'Industry Mentors', color: 'var(--brand-cyan)' }],
    },
  },
  'campus-life': {
    slug: 'campus-life',
    title: 'Campus Life',
    template: 'campus-life',
    skillversity: {
      hero: {
        eyebrow: 'Campus Life',
        title: 'A campus built for',
        highlight: 'confidence and career readiness.',
        description: 'Students build communication, teamwork, leadership, and interview confidence alongside technical skills.',
        theme: 'warm',
      },
      featureCards: [
        { icon: '🎤', title: 'Communication Practice', description: 'Presentation, speaking, and interview-readiness sessions.' },
        { icon: '🧑‍💼', title: 'Professional Culture', description: 'Workplace behaviour, grooming, and confidence routines.' },
        { icon: '🏆', title: 'Career Events', description: 'Mentor sessions, placement drives, and student showcases.' },
      ],
    },
  },
  skillfolio: {
    slug: 'skillfolio',
    title: 'Skillfolio',
    template: 'skillfolio',
    skillversity: {
      hero: {
        eyebrow: 'Skillfolio',
        title: 'A digital profile',
        highlight: 'that proves employability.',
        description: 'Skillfolio helps students present projects, skills, certifications, and readiness beyond a traditional resume.',
        theme: 'cool',
      },
      featureCards: [
        { icon: '📲', title: 'Digital Profile', description: 'A modern, shareable profile for recruiters.' },
        { icon: '✅', title: 'Proof of Skills', description: 'Showcase practical projects and training outcomes.' },
        { icon: '🚀', title: 'Placement Ready', description: 'Support interviews with evidence, not just claims.' },
      ],
    },
  },
  privacy: {
    slug: 'privacy',
    title: 'Privacy',
    template: 'privacy',
    skillversity: {
      hero: {
        eyebrow: 'Privacy Policy',
        title: 'Your information',
        highlight: 'stays protected.',
        description: 'We use student and enquiry information only for counselling, admissions, training, placement, and support communication.',
        theme: 'light',
      },
      contentSections: [
        {
          title: 'How we use information',
          description:
            'Information submitted through forms is used to contact you about Skillversity programs, counselling, admissions, and student support.',
        },
        {
          title: 'Data sharing',
          description:
            'We do not sell personal information. Placement-related information may be shared with hiring partners only as part of student career support.',
        },
      ],
    },
  },
}

export const defaultMentors = [
  {
    firstName: 'AK',
    fullName: 'Dr. Abdul Kareem K',
    credential: 'Head of Academics · 31 yrs · In Mohd Fakhroo & Brothers Co. , Al-Ghanim Industries , Ardhiya Super Market Chains , Kuwait Finance House',
    roleType: 'hod',
    image: { url: '/media/mentor-kareem.jpg', alt: 'Dr. Abdul Kareem K' }
  },
  {
    firstName: 'AJ',
    fullName: 'D. Antony Jerald',
    credential: 'Head of HR · 36 yrs. In Taj Indian Hotels, Iswaraya Fertility Center, Fasta Pizza Pvt. Ltd., TRDFIN Support Services, Stanworth Management',
    roleType: 'hod',
    image: null
  },
  {
    firstName: 'TM',
    fullName: 'Thulasidas M H',
    credential: 'Head of Oil and Gas · 31 yrs · Qatargas, RasGas, Phillips 66, Petroleum Development Oman, Larsen & Toubro',
    roleType: 'hod',
    image: null
  },
  {
    firstName: 'CT',
    fullName: 'Catherine Tom Thomas',
    credential: 'Head of Hospital Administration · 19 yrs · Sunrise Hospital, Al Shumoos Medical Centre, Starcare Hospital, Aster Medical Centre, Al Raffah Hospital',
    roleType: 'hod',
    image: { url: '/media/mentor-catherine.jpg', alt: 'Catherine Tom Thomas' }
  },
  {
    firstName: 'JT',
    fullName: 'Jomon Thomas',
    credential: 'Head of Logistics · 18 yrs · Logistics',
    roleType: 'hod',
    image: { url: '/media/mentor-jomon.jpg', alt: 'Jomon Thomas' }
  },
  {
    firstName: 'MA',
    fullName: 'Mareena Antony',
    credential: 'Head of Soft Skills · 15 yrs',
    roleType: 'hod',
    image: null
  }
]

export const defaultAllMentors = [
  // Logistics
  { name: 'Dr. Abdul Kareem K', dept: 'LOG' as const, label: 'Logistics & Supply Chain', subtitle: 'Head of Academics', color: 'var(--brand-blue)' },
  { name: 'Anish Kumar S', dept: 'LOG' as const, label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Manoj K S', dept: 'LOG' as const, label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Harish Ahammed Khan', dept: 'LOG' as const, label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Sumaisa N M', dept: 'LOG' as const, label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Mary Agnes C J', dept: 'LOG' as const, label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Rajesh Kumar T K', dept: 'LOG' as const, label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Bilfa Reetha V P', dept: 'LOG' as const, label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Deepa C G', dept: 'LOG' as const, label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Shemeer Salim', dept: 'LOG' as const, label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Krishna Das P R', dept: 'LOG' as const, label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Lakshmy Kannan', dept: 'LOG' as const, label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Mukesh A', dept: 'LOG' as const, label: 'Logistics & Supply Chain', subtitle: 'Logistics Mentor', color: 'var(--brand-blue)' },
  { name: 'Jomon Thomas', dept: 'LOG' as const, label: 'Logistics & Supply Chain', subtitle: 'Head of Logistics', color: 'var(--brand-blue)' },

  // Oil & Gas / Tech
  { name: 'Roopak Ratnaraj', dept: 'TECH' as const, label: 'Oil & Gas', subtitle: 'Oil & Gas Technical Mentor', color: 'var(--brand-red)' },
  { name: 'Christopher Raju', dept: 'TECH' as const, label: 'Oil & Gas', subtitle: 'Oil & Gas Technical Mentor', color: 'var(--brand-red)' },
  { name: 'Jithin TJ', dept: 'TECH' as const, label: 'Oil & Gas', subtitle: 'Oil & Gas Technical Mentor', color: 'var(--brand-red)' },
  { name: 'Thulasidas M H', dept: 'TECH' as const, label: 'Oil & Gas', subtitle: 'Head of Oil and Gas', color: 'var(--brand-red)' },
  { name: 'Naseem Thampi', dept: 'TECH' as const, label: 'Oil & Gas', subtitle: 'Oil & Gas Technical Mentor', color: 'var(--brand-red)' },
  { name: 'Gokul Hari AK', dept: 'TECH' as const, label: 'Oil & Gas', subtitle: 'Oil & Gas Technical Mentor', color: 'var(--brand-red)' },
  { name: 'Henrich Varghese', dept: 'TECH' as const, label: 'Oil & Gas', subtitle: 'Oil & Gas Technical Mentor', color: 'var(--brand-red)' },

  // Hospital Administration
  { name: 'Catherine Tom Thomas', dept: 'HA' as const, label: 'Hospital Administration', subtitle: 'Head of Hospital Administration', color: 'var(--brand-cyan)' },
  { name: 'Riby Elizabeth Thomas', dept: 'HA' as const, label: 'Hospital Administration', subtitle: 'Hospital Administration Mentor', color: 'var(--brand-cyan)' },
  { name: 'Jijimol George G', dept: 'HA' as const, label: 'Hospital Administration', subtitle: 'Hospital Administration Mentor', color: 'var(--brand-cyan)' },
  { name: 'Geethu V G', dept: 'HA' as const, label: 'Hospital Administration', subtitle: 'Hospital Administration Mentor', color: 'var(--brand-cyan)' },
  { name: 'Thanaz K A', dept: 'HA' as const, label: 'Hospital Administration', subtitle: 'Hospital Administration Mentor', color: 'var(--brand-cyan)' },

  // HR Management
  { name: 'D. Antony Jerald', dept: 'HR' as const, label: 'HR Management', subtitle: 'Head of HR', color: 'var(--brand-magenta)' },
  { name: 'Veena Ajit Nayar', dept: 'HR' as const, label: 'HR Management', subtitle: 'HR Management Mentor', color: 'var(--brand-magenta)' },
  { name: 'Rini Anna Babu', dept: 'HR' as const, label: 'HR Management', subtitle: 'HR Management Mentor', color: 'var(--brand-magenta)' },

  // I-CEP (Language & Confidence)
  { name: 'Mareena Antony', dept: 'I-CEP' as const, label: 'I-CEP (Confidence & Language)', subtitle: 'Head of Soft Skills', color: 'var(--brand-orange)' },
  { name: 'Athira Nair T K', dept: 'I-CEP' as const, label: 'I-CEP (Confidence & Language)', subtitle: 'I-CEP Language Coach', color: 'var(--brand-orange)' },
  { name: 'Adila Anees', dept: 'I-CEP' as const, label: 'I-CEP (Confidence & Language)', subtitle: 'I-CEP Language Coach', color: 'var(--brand-orange)' },
  { name: 'Aardra Manampilly', dept: 'I-CEP' as const, label: 'I-CEP (Confidence & Language)', subtitle: 'I-CEP Language Coach', color: 'var(--brand-orange)' },
  { name: 'Miji Johny', dept: 'I-CEP' as const, label: 'I-CEP (Confidence & Language)', subtitle: 'I-CEP Language Coach', color: 'var(--brand-orange)' },
  { name: 'Hudha Ahmedkutty K V', dept: 'I-CEP' as const, label: 'I-CEP (Confidence & Language)', subtitle: 'I-CEP Language Coach', color: 'var(--brand-orange)' },
  { name: 'Shibila Fathima', dept: 'I-CEP' as const, label: 'I-CEP (Confidence & Language)', subtitle: 'I-CEP Language Coach', color: 'var(--brand-orange)' },
  { name: 'Saritha G', dept: 'I-CEP' as const, label: 'I-CEP (Confidence & Language)', subtitle: 'I-CEP Language Coach', color: 'var(--brand-orange)' },

  // Student Affairs
  { name: 'Mumthas Mubash', dept: 'AFFAIRS' as const, label: 'Student Affairs', subtitle: 'Student Affairs Officer', color: 'var(--brand-indigo)' },
  { name: 'Risaldher Ali', dept: 'AFFAIRS' as const, label: 'Student Affairs', subtitle: 'Student Affairs Officer', color: 'var(--brand-indigo)' },
  { name: 'Ajiza S V', dept: 'AFFAIRS' as const, label: 'Student Affairs', subtitle: 'Student Affairs Officer', color: 'var(--brand-indigo)' },
  { name: 'Helana Justin', dept: 'AFFAIRS' as const, label: 'Student Affairs', subtitle: 'Student Affairs Officer', color: 'var(--brand-indigo)' },
  { name: 'Anusree T', dept: 'AFFAIRS' as const, label: 'Student Affairs', subtitle: 'Student Affairs Officer', color: 'var(--brand-indigo)' },
  { name: 'Siyana Sakeer', dept: 'AFFAIRS' as const, label: 'Student Affairs', subtitle: 'Student Affairs Officer', color: 'var(--brand-indigo)' },
]

