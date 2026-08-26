/** Verbatim on-page SEO strings from the dthree.co keyword map */

export type SolutionSeo = {
  pageH1: string;
  seoTitle: string;
  seoDescription: string;
  seoSections: { h2: string; body: string }[];
  relatedBlogSlugs?: string[];
  relatedSolutionSlugs?: string[];
};

export const SOLUTION_SEO: Record<string, SolutionSeo> = {
  'time-attendance-system': {
    pageH1: 'Time Attendance System in Bahrain',
    seoTitle: 'Time Attendance System Bahrain | Biometric & Fingerprint | D3',
    seoDescription:
      'Cloud biometric time attendance system for Bahrain SMEs — fingerprint, face recognition and card-based attendance management software with LMRA-ready payroll export.',
    seoSections: [
      {
        h2: 'Biometric Attendance Options',
        body: 'Fingerprint attendance, face recognition and card-based terminals verify every punch in under a second — eliminating buddy punching and feeding accurate hours into payroll.',
      },
      {
        h2: 'LMRA-Compliant Payroll Export',
        body: 'Generate attendance reports in the format Bahrain\'s Labour Market Regulatory Authority and payroll processors expect, without manual reformatting each pay cycle.',
      },
      {
        h2: 'Auto-Shift Detection',
        body: 'Auto-shift picking recognises which shift an employee is on and calculates regular hours, overtime and lateness without manual roster intervention.',
      },
    ],
    relatedBlogSlugs: ['biometric-attendance-system-bahrain'],
    relatedSolutionSlugs: ['time-attendance-enterprise'],
  },
  'time-attendance-enterprise': {
    pageH1: 'Enterprise Time Attendance for Multi-Site Organisations',
    seoTitle: 'Enterprise Time Attendance System | Multi-Site GCC | D3',
    seoDescription:
      'Enterprise time attendance for multi-site GCC organisations — workforce management software with geo-fenced mobile attendance, project manhour tracking and employee self-service.',
    seoSections: [
      {
        h2: 'Multi-Company & Multi-Site Support',
        body: 'Run unlimited locations and legal entities from one multi-site attendance platform — with centralised reporting and site-level control for large GCC organisations.',
      },
      {
        h2: 'Geo-Fenced Mobile Attendance',
        body: 'Field staff clock in via mobile attendance only when inside an approved geo-fence, with selfie or QR capture — no manual site verification.',
      },
      {
        h2: 'Employee Self-Service Portal',
        body: 'Employees view attendance, submit leave and excuse requests, and track overtime approvals online — reducing routine queries to HR.',
      },
    ],
    relatedBlogSlugs: ['enterprise-time-attendance-multi-site-bahrain'],
    relatedSolutionSlugs: ['time-attendance-system'],
  },
  'hr-payroll-software': {
    pageH1: 'HRMS & Payroll Software for Bahrain and the GCC',
    seoTitle: 'HRMS & Payroll Software Bahrain | WPS & GOSI Ready | D3',
    seoDescription:
      'Cloud HRMS and payroll software for Bahrain — WPS payroll, GOSI payroll, employee self-service and HR software Bahrain teams trust. Multi-company, bilingual, full lifecycle.',
    seoSections: [
      {
        h2: 'WPS Payroll Export',
        body: 'Generate bank-compatible Wage Protection System salary files directly from processed payroll — ready for upload without a manual rebuild.',
      },
      {
        h2: 'GOSI-Ready Contributions',
        body: 'Social insurance contributions are calculated against gross salary in the structure GOSI expects, built into the payroll engine.',
      },
      {
        h2: 'Multi-Company & Multi-Currency',
        body: 'Keep each legal entity\'s payroll, leave policies and reporting separate while still rolling up into a consolidated group view.',
      },
      {
        h2: 'Employee Self-Service',
        body: 'Staff check payslips, submit leave requests and view attendance online — cutting the volume of routine queries to HR.',
      },
    ],
    relatedBlogSlugs: [
      'hrms-payroll-software-bahrain-guide',
      'lmra-compliance-wps-payroll-bahrain',
      'gosi-contribution-calculation-bahrain',
      'indemnity-calculation-bahrain',
      'average-salary-bahrain',
      'bahrain-labour-law-resignation-notice',
      'salary-slip-format-bahrain',
      'employment-contract-bahrain',
      'offer-letter-sample-bahrain',
      'overtime-calculation-bahrain',
    ],
  },
  'visitor-management': {
    pageH1: 'Visitor Management System for Bahrain Offices',
    seoTitle: 'Visitor Management System Bahrain | Reception Kiosk | D3',
    seoDescription:
      'Digital visitor management for Bahrain offices — reception kiosk, pre-registration, access card integration and full audit trail for government and enterprise buildings.',
    seoSections: [
      {
        h2: 'Reception Kiosk & Pre-Registration',
        body: 'Visitors pre-register online and check in at a reception kiosk with appointment details, host and purpose captured before arrival.',
      },
      {
        h2: 'Access Card Issuance',
        body: 'Issue physical or virtual access cards on arrival with access card integration to door controllers — permissions limited to authorised areas only.',
      },
      {
        h2: 'Full Audit Trail',
        body: 'Time-stamped visitor logs, scheduled visit reports and automatic access removal on departure for security and compliance teams.',
      },
    ],
    relatedBlogSlugs: ['visitor-management-system-bahrain-guide'],
  },
  'queue-management-system': {
    pageH1: 'Queue Management System for Bahrain',
    seoTitle: 'Queue Management System Bahrain | Government & Hospital | D3',
    seoDescription:
      'Wired and wireless queue management kiosks for ministries, hospitals and enterprise counters in Bahrain — ministry software solutions with live analytics and LED displays.',
    seoSections: [
      {
        h2: 'Kiosk-Based Ticketing',
        body: 'Visitors select a service at a touchscreen kiosk and receive a ticket routed to the right counter — wired or wireless deployment without rewiring the building.',
      },
      {
        h2: 'Government & Healthcare Queue Management',
        body: 'Multi-service categories for ministries and hospital queue management routing cut wait times and improve counter allocation with real usage data.',
      },
      {
        h2: 'Live Wait-Time Analytics',
        body: 'Management dashboards show wait times, service duration and peak-hour patterns so staff can be reallocated where demand is highest.',
      },
    ],
    relatedBlogSlugs: ['queue-management-system-bahrain'],
  },
  'rfid-asset-tracking': {
    pageH1: 'RFID Asset Tracking & Warehouse Management',
    seoTitle: 'RFID Asset Tracking Bahrain | Warehouse & Asset Management | D3',
    seoDescription:
      'Active and passive RFID asset tracking for Bahrain — warehouse management system, asset tracking system and document tracking with mobile handheld audits.',
    seoSections: [
      {
        h2: 'Active vs Passive RFID',
        body: 'Passive tags suit warehouse checkpoints and volume inventory; active tags broadcast continuously for real-time location of high-value assets across wider ranges.',
      },
      {
        h2: 'Warehouse Inventory Tracking',
        body: 'Readers at entry/exit points and shelving update stock levels as goods move — replacing slow manual stock-takes with continuous counts.',
      },
      {
        h2: 'Document & Asset Tracking',
        body: 'Track files, IT equipment and tools across multiple buildings and departments with handheld terminals for spot-checks and audits.',
      },
    ],
    relatedBlogSlugs: ['rfid-asset-tracking-warehouse-management-bahrain'],
  },
  'access-control-system': {
    pageH1: 'Access Control & IP CCTV for Bahrain Enterprises',
    seoTitle: 'Access Control & IP CCTV Bahrain | Biometric Doors | D3',
    seoDescription:
      'Access control system Bahrain — IP CCTV Bahrain, biometric access control and NFC proximity card doors with centralised security management.',
    seoSections: [
      {
        h2: 'Biometric Door Access',
        body: 'Fingerprint, face recognition and NFC proximity card controllers secure doors without shared keys or passwords.',
      },
      {
        h2: 'IP CCTV Bahrain Surveillance',
        body: 'Indoor and outdoor IP CCTV cameras with local or remote monitoring for business and government facilities across Bahrain.',
      },
      {
        h2: 'Centralised Security Management',
        body: 'One management layer for cameras and access controllers — scalable from a single site to enterprise deployments.',
      },
    ],
    relatedBlogSlugs: ['access-control-cctv-security-bahrain'],
  },
  'digital-signage': {
    pageH1: 'Digital Signage & LED Displays for Bahrain',
    seoTitle: 'Digital Signage Bahrain | LED Displays & Video Walls | D3',
    seoDescription:
      'Digital signage Bahrain — LED display solutions, LED video walls and vertical signage with centralised CMS for retail, government and corporate spaces.',
    seoSections: [
      {
        h2: '4K LED Displays',
        body: 'LED and LCD screens from 42" with 4K support for retail, government lobbies and corporate spaces — indoor and outdoor rated options.',
      },
      {
        h2: 'Remote Content Management',
        body: 'A centralised CMS schedules and updates content across the display network in real time, without site visits for every change.',
      },
      {
        h2: 'Indoor & Outdoor Signage',
        body: 'Vertical signage portrait screens, LED video walls and weatherproof outdoor LEDs with optional touch and 24/7 operation.',
      },
    ],
    relatedBlogSlugs: ['digital-signage-led-displays-bahrain'],
  },
  'erp-retail-management': {
    pageH1: 'ERP & Retail Management Software',
    seoTitle: 'ERP & Retail Management Software Bahrain | D3',
    seoDescription:
      'ERP software Bahrain for retail and enterprise — retail management software, inventory management software, POS and electronic shelf labels.',
    seoSections: [
      {
        h2: 'Retail Inventory & POS',
        body: 'Real-time inventory, purchasing and sales in one system — including van sales and multi-branch stock visibility.',
      },
      {
        h2: 'Electronic Shelf Labels',
        body: 'Update prices across the store from a central system with electronic shelf labels integrated into retail operations.',
      },
      {
        h2: 'Multi-Branch Financial Accounting',
        body: 'Multi-company, multi-currency financial accounting with consolidated reporting across branches.',
      },
    ],
    relatedBlogSlugs: ['erp-retail-management-software-bahrain'],
  },
  'consultancy': {
    pageH1: 'IT Consultancy & Managed Services for Bahrain',
    seoTitle: 'IT Consultancy & Managed Services Bahrain | D3',
    seoDescription:
      'IT consultancy Bahrain — managed IT services Bahrain, outsourced staffing, ICT planning and digital transformation Bahrain for enterprises.',
    seoSections: [
      {
        h2: 'Outsourced IT Staffing',
        body: 'Vetted system administrators, DBAs, network engineers and help desk staff for short-term projects or ongoing managed IT services engagements.',
      },
      {
        h2: 'ICT Planning & Digital Transformation',
        body: 'Business and ICT consultants align digital transformation Bahrain objectives with your technology roadmap — from system analysis to CISCO-certified infrastructure delivery.',
      },
    ],
    relatedBlogSlugs: ['it-consultancy-managed-services-bahrain'],
  },
};

export const INDUSTRY_SEO: Record<
  string,
  { pageH1: string; seoTitle: string; seoDescription: string }
> = {
  government: {
    pageH1: 'IT Solutions for Government in Bahrain',
    seoTitle: 'Government IT Solutions Bahrain | Ministry Software | D3',
    seoDescription:
      'Government IT solutions for Bahrain — ministry software solutions, Civil Service Bureau compliance, queue management, HRMS and access control for public sector.',
  },
  healthcare: {
    pageH1: 'IT Solutions for Healthcare in Bahrain',
    seoTitle: 'Healthcare IT Solutions Bahrain | Hospital Queue & Attendance | D3',
    seoDescription:
      'Healthcare IT solutions for Bahrain hospitals — hospital queue management, biometric attendance healthcare and RFID equipment tracking.',
  },
  retail: {
    pageH1: 'Retail Technology Solutions for Bahrain',
    seoTitle: 'Retail Technology Solutions Bahrain | ERP & Digital Signage | D3',
    seoDescription:
      'Retail technology solutions for Bahrain — retail ERP, inventory management software, digital signage and electronic shelf labels.',
  },
  logistics: {
    pageH1: 'Logistics Technology Solutions for Bahrain',
    seoTitle: 'Logistics Technology Solutions Bahrain | RFID Warehouse | D3',
    seoDescription:
      'Logistics technology solutions for Bahrain — warehouse RFID tracking, workforce management and multi-site attendance for depots and warehouses.',
  },
};

export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.dthree.co';

export function pageCanonical(locale: string, path: string) {
  return `${SITE_URL}/${locale}${path}`;
}
