import type { NextConfig } from 'next'

export const redirects: NextConfig['redirects'] = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header' as const,
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  const legacyHtmlRedirects = [
    { source: '/index.html', destination: '/', permanent: true },
    { source: '/about.html', destination: '/about', permanent: true },
    { source: '/programs.html', destination: '/programs', permanent: true },
    { source: '/hospital-administration.html', destination: '/programs/hospital-administration', permanent: true },
    { source: '/logistics-supply-chain.html', destination: '/programs/logistics-supply-chain', permanent: true },
    { source: '/oil-gas.html', destination: '/programs/oil-gas', permanent: true },
    { source: '/hr-management.html', destination: '/programs/hr-management', permanent: true },
    { source: '/placements.html', destination: '/placements', permanent: true },
    { source: '/mentors.html', destination: '/mentors', permanent: true },
    { source: '/campus-life.html', destination: '/campus-life', permanent: true },
    { source: '/admissions.html', destination: '/admissions', permanent: true },
    { source: '/blog.html', destination: '/blog', permanent: true },
    { source: '/contact.html', destination: '/contact', permanent: true },
    { source: '/skillfolio.html', destination: '/skillfolio', permanent: true },
    { source: '/blog-hospital-admin-guide.html', destination: '/blog/hospital-admin-guide', permanent: true },
    { source: '/blog-logistics-career-guide.html', destination: '/blog/logistics-career-guide', permanent: true },
  ]

  return [internetExplorerRedirect, ...legacyHtmlRedirects]
}
