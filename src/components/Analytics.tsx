'use client'

import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export function Analytics({ googleAnalyticsId = GA_ID }: { googleAnalyticsId?: string }) {
  if (!googleAnalyticsId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            'analytics_storage': 'granted',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
          });
          gtag('config', '${googleAnalyticsId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}
