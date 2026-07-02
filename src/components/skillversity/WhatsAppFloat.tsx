import React from 'react'

type Props = {
  phoneLink?: string
  whatsapp?: string
}

export const WhatsAppFloat: React.FC<Props> = ({
  phoneLink = 'tel:+919946033355',
  whatsapp = '919946033355',
}) => {
  return (
    <>
      {/* Call button — sits just above the WhatsApp float */}
      <a
        href={phoneLink}
        className="call-float"
        aria-label="Call us"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </a>
      {/* WhatsApp button */}
      <a
        href={`https://wa.me/${whatsapp}?text=Hi%20Skillversity%2C%20I%27d%20like%20career%20guidance`}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" style={{ display: 'block', flexShrink: 0 }}>
          <path d="M12.012 2C6.48 2 2 6.48 2 12.012c0 1.918.528 3.708 1.44 5.244L2 22l4.908-1.284a9.932 9.932 0 005.104 1.392c5.532 0 10.012-4.48 10.012-10.012C22.024 6.48 17.544 2 12.012 2zm4.884 13.836c-.204.576-.996 1.056-1.632 1.188-.444.096-.996.168-2.952-.648-2.508-1.044-4.116-3.6-4.236-3.768-.132-.168-.96-1.272-.96-2.436 0-1.164.6-1.74.816-1.98.216-.24.468-.3.624-.3h.444c.144 0 .348.012.504.384.168.396.576 1.392.624 1.488.048.096.084.216.012.36-.072.144-.108.24-.228.372-.12.144-.24.3-.348.408-.108.108-.228.228-.096.456.132.228.588.972 1.26 1.572.864.768 1.596 1.008 1.824 1.116.228.108.36.096.492-.06.132-.156.576-.672.732-.9.156-.228.312-.192.528-.108.216.084 1.368.648 1.608.768.24.12.396.18.456.288.06.108.06.624-.144 1.2z"/>
        </svg>
      </a>
    </>
  )
}
