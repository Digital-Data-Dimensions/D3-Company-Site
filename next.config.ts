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
  async redirects() {
    return [
      { source: '/Time-Attendance', destination: '/en/solutions/time-attendance-system', permanent: true },
      { source: '/RFID-Solutions', destination: '/en/solutions/rfid-asset-tracking', permanent: true },
      { source: '/verticalsignage', destination: '/en/solutions/digital-signage', permanent: true },
      { source: '/accesscontrol', destination: '/en/solutions/access-control-system', permanent: true },
      { source: '/hrpayroll', destination: '/en/solutions/hr-payroll-software', permanent: true },
      { source: '/CCTV', destination: '/en/solutions/access-control-system', permanent: true },
      { source: '/eBook', destination: '/en/blog', permanent: true },
      { source: '/IPCCTV.aspx', destination: '/en/solutions/access-control-system', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
