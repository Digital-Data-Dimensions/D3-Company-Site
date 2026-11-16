import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingActions } from '@/components/layout/FloatingActions';
import { PageTransition } from '@/components/layout/PageTransition';
import { GTMScript } from '@/components/layout/GTMScript';
import { GAScript } from '@/components/layout/GAScript';
import { LocaleHtmlAttributes } from '@/components/layout/LocaleHtmlAttributes';
import type { Metadata } from 'next';

type Locale = 'en' | 'ar';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.dthree.co';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title = 'IT Solutions in Bahrain | Attendance, HRMS, RFID | D3';
  const description =
    'D3 delivers time attendance, HRMS payroll, queue management, RFID tracking and digital signage in Bahrain. Trusted by 500+ organisations. Built in Bahrain since 2010.';

  return {
    metadataBase: new URL(BASE_URL),
    // /ar is not translated yet; keep it out of the index until real Arabic pages ship
    ...(locale === 'ar' ? { robots: { index: false, follow: true } } : {}),
    title: {
      default: title,
      template: '%s | D3 Bahrain',
    },
    description,
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_BH' : 'en_BH',
      url: `${BASE_URL}/${locale}`,
      siteName: 'D3 Digital Data Dimensions',
      title,
      description,
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: 'D3' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      ...(locale === 'en' ? { languages: { 'en-BH': `${BASE_URL}/en`, 'x-default': `${BASE_URL}/en` } } : {}),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || '';

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleHtmlAttributes />
      <GAScript />
      <GTMScript gtmId={gtmId} />
      <ThemeProvider>
        <div suppressHydrationWarning>
          <Navbar />
        </div>
        <main id="main-content" style={{ paddingTop: 84 }}>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <FloatingActions />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
