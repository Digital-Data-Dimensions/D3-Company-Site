import type { Metadata, Viewport } from 'next';
import { Montserrat, Cairo } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.dthree.co';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'IT Solutions in Bahrain | Attendance, HRMS, RFID | D3',
    template: '%s | D3 Bahrain',
  },
  description:
    'D3 Digital Data Dimensions (Dthree) is Bahrain\'s leading IT solutions company, delivering TimeTech time attendance systems, HRMS payroll software, queue management, RFID asset tracking, digital signage and ERP to 500+ enterprises since 2010.',
  keywords: [
    'D3',
    'D3 Bahrain',
    'TimeTech',
    'Time Attendance System Bahrain',
    'HRMS Bahrain',
    'Enterprise IT Solutions Bahrain',
  ],
  authors: [{ name: 'D3 Digital Data Dimensions', url: BASE_URL }],
  creator: 'D3 Digital Data Dimensions',
  publisher: 'D3 Digital Data Dimensions',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_BH',
    url: BASE_URL,
    siteName: 'D3 Digital Data Dimensions',
    title: 'D3 — TimeTech IT Solutions in Bahrain | Since 2010',
    description:
      'Enterprise IT solutions in Bahrain — TimeTech time attendance, HRMS, payroll, queue management, RFID tracking, digital signage and ERP. Trusted by 500+ organisations.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'D3 Digital Data Dimensions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'D3 — IT Solutions in Bahrain',
    description: 'TimeTech time attendance, HRMS, queue management, RFID and ERP in Bahrain. Since 2010.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: BASE_URL,
    languages: { 'en-BH': `${BASE_URL}/en`, 'x-default': `${BASE_URL}/en` },
  },
  icons: {
    icon: [{ url: '/images/logos/favicon.png', type: 'image/png' }],
    shortcut: '/images/logos/favicon.png',
    apple: '/images/logos/favicon.png',
  },
};

// JSON-LD Structured Data: organisation + website (page-level schema lives in each page)
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'D3 Digital Data Dimensions',
      alternateName: ['D3 Bahrain', 'Dthree', 'D3', 'Digital Data Dimensions'],
      url: BASE_URL,
      logo: `${BASE_URL}/d3logo.png`,
      description:
        'Bahrain-based IT solutions company providing TimeTech time attendance systems, HRMS payroll software, queue management, RFID asset tracking, digital signage and ERP since 2010.',
      foundingDate: '2010',
      areaServed: { '@type': 'Country', name: 'Bahrain' },
      brand: { '@type': 'Brand', name: 'TimeTech', url: 'https://time-tech.co/' },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+973-1333-3445',
          contactType: 'sales',
          areaServed: 'BH',
          availableLanguage: ['English'],
        },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '22, Building 1033, Road 3925',
        addressLocality: 'Umm Al Hassam',
        addressRegion: 'Manama',
        postalCode: '339',
        addressCountry: 'BH',
      },
      // Add LinkedIn, Facebook, Instagram, Google Business Profile and Crunchbase URLs here once confirmed.
      sameAs: ['https://time-tech.co/'],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'D3 Digital Data Dimensions',
      inLanguage: 'en',
      publisher: { '@id': `${BASE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${montserrat.variable} ${cairo.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
