import { HeroSection } from '@/components/home/HeroSection';
import { MarqueeSection } from '@/components/home/MarqueeSection';
import { TrustLogosSection } from '@/components/home/TrustLogosSection';
import { SolutionsSection } from '@/components/home/SolutionsSection';
import { WhySection } from '@/components/home/WhySection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { CTASection } from '@/components/home/CTASection';
import { SITE_URL } from '@/lib/solution-seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: {
      absolute: 'Enterprise IT Solutions Bahrain & GCC | Time Attendance, HRMS, RFID | D3',
    },
    description:
      'D3 delivers time attendance, HRMS payroll, queue management, RFID tracking and digital signage for 500+ organisations across Bahrain and the GCC. Built in Bahrain since 2010.',
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        'en-BH': `${SITE_URL}/en`,
        'ar-BH': `${SITE_URL}/ar`,
        'x-default': `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: 'Enterprise IT Solutions Bahrain & GCC | Time Attendance, HRMS, RFID | D3',
      description:
        'D3 delivers time attendance, HRMS payroll, queue management, RFID tracking and digital signage for 500+ organisations across Bahrain and the GCC. Built in Bahrain since 2010.',
      locale,
      type: 'website',
      url: `${SITE_URL}/${locale}`,
    },
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <TrustLogosSection />
      <SolutionsSection />
      <WhySection />
      <ProcessSection />
      <CTASection />
    </>
  );
}
