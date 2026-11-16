import { HeroSection } from '@/components/home/HeroSection';
import { MarqueeSection } from '@/components/home/MarqueeSection';
import { TrustLogosSection } from '@/components/home/TrustLogosSection';
import { SolutionsSection } from '@/components/home/SolutionsSection';
import { WhySection } from '@/components/home/WhySection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { CTASection } from '@/components/home/CTASection';
import { pageAlternates, pageOpenGraph } from '@/lib/solution-seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const title = 'IT Solutions in Bahrain | Attendance, HRMS, RFID | D3';
  const description =
    'D3 delivers time attendance, HRMS payroll, queue management, RFID tracking and digital signage in Bahrain. Trusted by 500+ organisations. Built in Bahrain since 2010.';
  return {
    title: { absolute: title },
    description,
    alternates: pageAlternates(locale, ''),
    openGraph: pageOpenGraph({ locale, path: '', title, description }),
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
