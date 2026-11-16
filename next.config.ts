import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.3.26', '192.168.1.*', '10.0.0.*', '172.16.*'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'dthree.co' },
      { protocol: 'https', hostname: 'www.dthree.co' },
    ],
  },
  async headers() {
    return [
      {
        // Public marketing HTML: let the edge cache it instead of `no-store`.
        source: '/:locale(en|ar)/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/', destination: '/en', permanent: true },
      // Bahrain-only consolidation: retired GCC/generic posts -> the Bahrain page for the same intent
      { source: '/:locale(en|ar)/blog/queue-management-system-gcc', destination: '/:locale/blog/queue-management-system-bahrain', permanent: true },
      { source: '/:locale(en|ar)/blog/visitor-management-system-gcc', destination: '/:locale/blog/visitor-management-system-bahrain-guide', permanent: true },
      { source: '/:locale(en|ar)/blog/hr-software-gcc-buyers-guide', destination: '/:locale/blog/hrms-payroll-software-bahrain-guide', permanent: true },
      { source: '/:locale(en|ar)/blog/biometric-attendance-system-guide', destination: '/:locale/blog/biometric-attendance-system-bahrain', permanent: true },
      { source: '/:locale(en|ar)/blog/fingerprint-attendance-system', destination: '/:locale/blog/biometric-attendance-system-bahrain', permanent: true },
      { source: '/:locale(en|ar)/blog/top-5-benefits-biometric-attendance', destination: '/:locale/blog/biometric-attendance-system-bahrain', permanent: true },
      { source: '/Time-Attendance', destination: '/en/solutions/time-attendance-system', permanent: true },
      { source: '/RFID-Solutions', destination: '/en/solutions/rfid-asset-tracking', permanent: true },
      { source: '/verticalsignage', destination: '/en/solutions/digital-signage', permanent: true },
      { source: '/accesscontrol', destination: '/en/solutions/access-control-system', permanent: true },
      { source: '/hrpayroll', destination: '/en/solutions/hr-payroll-software', permanent: true },
      { source: '/CCTV', destination: '/en/solutions/access-control-system', permanent: true },
      { source: '/eBook', destination: '/en/blog', permanent: true },
      { source: '/IPCCTV.aspx', destination: '/en/solutions/access-control-system', permanent: true },
      { source: '/blog/salary-slip-format-bahrain', destination: '/en/blog/salary-slip-format-bahrain', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
