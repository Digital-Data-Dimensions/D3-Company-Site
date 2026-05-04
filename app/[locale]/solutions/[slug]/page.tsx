import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Clock, Users, DollarSign, BarChart2, Smartphone, Cloud, User, CalendarOff,
  GraduationCap, UserPlus, UserCheck, List, Monitor, Wifi, Tag, FileText,
  Package, Lock, Camera, Settings2, Bell, Building2, Shield, MessageCircle,
  MapPin, Printer, Star, ClipboardList, Fingerprint, QrCode,
  Zap, Eye, LayoutGrid, ShoppingCart, TrendingUp,
  CheckCircle2, Headphones, Database, Radio, Link2,
} from 'lucide-react';
import { SOLUTIONS, CASE_STUDIES, INDUSTRIES } from '@/lib/data';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { Button, ArrowIcon } from '@/components/shared/Button';
import { CTASection } from '@/components/home/CTASection';
import { Link } from '@/i18n/navigation';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

/* Map feature title keywords → Lucide icon + accent colour (no background) */
function getFeatureIcon(title: string): { icon: React.ReactNode; color: string } {
  const t = title.toLowerCase();
  const pick = (icon: React.ReactNode, color: string) => ({ icon, color });

  if (t.includes('biometric') || t.includes('fingerprint'))   return pick(<Fingerprint size={18}/>, '#6D28D9');
  if (t.includes('shift') || t.includes('schedule'))          return pick(<Clock size={18}/>, '#0F766E');
  if (t.includes('payroll') || t.includes('salary') || t.includes('wps')) return pick(<DollarSign size={18}/>, '#166534');
  if (t.includes('mobile') || t.includes('ios') || t.includes('android')) return pick(<Smartphone size={18}/>, '#1D4ED8');
  if (t.includes('cloud') || t.includes('aws') || t.includes('server'))   return pick(<Cloud size={18}/>, '#0369A1');
  if (t.includes('dashboard') || t.includes('report') || t.includes('analytic')) return pick(<BarChart2 size={18}/>, '#92400E');
  if (t.includes('leave') || t.includes('absence'))           return pick(<CalendarOff size={18}/>, '#B91C1C');
  if (t.includes('hr') || t.includes('human resource'))       return pick(<Users size={18}/>, '#7C3AED');
  if (t.includes('self-service') || t.includes('portal') || t.includes('employee')) return pick(<User size={18}/>, '#0F766E');
  if (t.includes('training'))                                 return pick(<GraduationCap size={18}/>, '#5B21B6');
  if (t.includes('recruit') || t.includes('planning'))        return pick(<UserPlus size={18}/>, '#0369A1');
  if (t.includes('visitor') || t.includes('appointment'))     return pick(<UserCheck size={18}/>, '#166534');
  if (t.includes('queue') || t.includes('kiosk') || t.includes('token')) return pick(<List size={18}/>, '#92400E');
  if (t.includes('whatsapp') || t.includes('virtual'))        return pick(<MessageCircle size={18}/>, '#166534');
  if (t.includes('display') || t.includes('signage') || t.includes('lcd')) return pick(<Monitor size={18}/>, '#0369A1');
  if (t.includes('led'))                                      return pick(<Zap size={18}/>, '#92400E');
  if (t.includes('rfid'))                                     return pick(<Radio size={18}/>, '#7C3AED');
  if (t.includes('barcode') || t.includes('scan') || t.includes('qr'))   return pick(<QrCode size={18}/>, '#0F766E');
  if (t.includes('document'))                                 return pick(<FileText size={18}/>, '#B91C1C');
  if (t.includes('warehouse') || t.includes('inventory'))     return pick(<Package size={18}/>, '#92400E');
  if (t.includes('access') || t.includes('door') || t.includes('card'))  return pick(<Lock size={18}/>, '#0369A1');
  if (t.includes('camera') || t.includes('cctv') || t.includes('surveillance')) return pick(<Camera size={18}/>, '#374151');
  if (t.includes('face') || t.includes('recognition'))        return pick(<Eye size={18}/>, '#7C3AED');
  if (t.includes('multi-company') || t.includes('multi company') || t.includes('erp')) return pick(<Building2 size={18}/>, '#0369A1');
  if (t.includes('integration') || t.includes('api') || t.includes('connect')) return pick(<Link2 size={18}/>, '#0F766E');
  if (t.includes('notification') || t.includes('email') || t.includes('alert')) return pick(<Bell size={18}/>, '#92400E');
  if (t.includes('lmra') || t.includes('gosi') || t.includes('compliance')) return pick(<Shield size={18}/>, '#166534');
  if (t.includes('geofenc') || t.includes('location') || t.includes('gps')) return pick(<MapPin size={18}/>, '#B91C1C');
  if (t.includes('overtime'))                                 return pick(<Clock size={18}/>, '#92400E');
  if (t.includes('appraisal') || t.includes('performance'))   return pick(<Star size={18}/>, '#B45309');
  if (t.includes('print') || t.includes('printer'))           return pick(<Printer size={18}/>, '#374151');
  if (t.includes('procurement') || t.includes('purchase'))    return pick(<ShoppingCart size={18}/>, '#0369A1');
  if (t.includes('sales'))                                    return pick(<TrendingUp size={18}/>, '#166534');
  if (t.includes('support') || t.includes('helpdesk'))        return pick(<Headphones size={18}/>, '#0F766E');
  if (t.includes('database') || t.includes('system'))         return pick(<Database size={18}/>, '#5B21B6');
  if (t.includes('manhour') || t.includes('project'))         return pick(<ClipboardList size={18}/>, '#7C3AED');
  if (t.includes('wireless') || t.includes('network'))        return pick(<Wifi size={18}/>, '#1D4ED8');
  if (t.includes('categor') || t.includes('multi'))           return pick(<LayoutGrid size={18}/>, '#0369A1');
  if (t.includes('audio') || t.includes('announc'))           return pick(<Bell size={18}/>, '#92400E');
  if (t.includes('supervisor'))                               return pick(<Eye size={18}/>, '#7C3AED');
  if (t.includes('customis') || t.includes('config'))         return pick(<Settings2 size={18}/>, '#0F766E');
  if (t.includes('active') || t.includes('passive'))          return pick(<Radio size={18}/>, '#7C3AED');
  if (t.includes('fixed asset'))                              return pick(<Tag size={18}/>, '#92400E');
  if (t.includes('power') || t.includes('ip control'))        return pick(<Zap size={18}/>, '#B91C1C');
  return pick(<CheckCircle2 size={18}/>, '#166534');
}

/* Professional 3-tone chip palette — cycles within brand blue family */
const CHIP_COLORS = [
  { bg: '#EEF2FF', border: '#C5D0F0', text: '#2B4CAF' }, // brand blue
  { bg: '#E8EDF6', border: '#B5C4DC', text: '#002147' }, // brand navy
  { bg: '#E5F4F8', border: '#A5CDD9', text: '#0A5570' }, // slate teal
];
function chipColor(text: string) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) & 0xffff;
  return CHIP_COLORS[hash % CHIP_COLORS.length];
}

const SOLUTION_DETAILS: Record<string, {
  seoKeyword: string;
  tagline: string;
  features: { title: string; desc: string }[];
  highlights: string[];
  industries: string[];
  caseStudySlug?: string;
  heroImage?: { src: string; alt: string };
  brochurePath?: string;
  youtubeUrl?: string;
  additionalSections?: { title: string; intro?: string; bullets: string[] }[];
}> = {
  'consultancy': {
    seoKeyword: 'IT consultancy Bahrain GCC outsourced engineers ICT planning',
    tagline: 'D3 has highly experienced business and information systems consultants who work with your business strategies and plan your ICT systems to maximise return on investment.',
    highlights: ['System Administrators', 'Network Engineers (CISCO)', 'Database Administrators', 'Software Engineers', 'Hardware Technicians', 'Help Desk Support'],
    features: [
      { title: 'Outsourced System Administration', desc: 'Experienced System Administrators available for short-term projects, system implementations or ongoing managed service engagements.' },
      { title: 'Database Administration', desc: 'Qualified DBAs to manage, optimise and secure your enterprise databases across SQL, Oracle and other platforms.' },
      { title: 'Software Engineering', desc: 'Skilled software engineers available for custom development, integrations and enterprise application support.' },
      { title: 'Network Infrastructure (CISCO)', desc: 'CISCO-certified Network Infrastructure Engineers for LAN/WAN, wireless and security deployments.' },
      { title: 'Hardware Technicians', desc: 'On-site and remote hardware support for servers, workstations, peripherals and enterprise IT equipment.' },
      { title: 'Help Desk Support', desc: 'Dedicated help desk staffing for first-line and second-line IT support across your organisation.' },
      { title: 'ICT Strategic Planning', desc: 'Business and ICT consultants align your technology strategy with business objectives to maximise ROI.' },
      { title: 'System Analysis', desc: 'System Analysts to evaluate, document and improve your enterprise business processes and systems.' },
    ],
    industries: ['government', 'banking', 'healthcare', 'retail', 'logistics'],
    caseStudySlug: 'ministry-of-interior-attendance',
    additionalSections: [
      {
        title: 'Outsourced IT Roles Available',
        intro: 'D3 provides qualified, vetted IT professionals for both short-term project work and long-term managed service engagements across Bahrain and the GCC.',
        bullets: [
          'System Administrator',
          'Database Administrator',
          'System Analyst',
          'Software Engineers',
          'Network Infrastructure Engineers (CISCO certified)',
          'Hardware Technicians',
          'Help Desk',
        ],
      },
    ],
  },
  'visitor-management': {
    seoKeyword: 'visitor management system Bahrain GCC reception kiosk access card',
    tagline: 'Professional and advanced online visitor management system: reception kiosk, pre-registration, access cards and full audit trail.',
    highlights: ['Visitor Pre-Registration', 'Access Card Issuance', 'Door Assignment', 'Audit Reports', 'Automatic Access Removal', 'Appointment Tracking'],
    features: [
      { title: 'Visitor Appointment Form', desc: 'Pre-register visitors online with appointment details: name, host, purpose and expected visit time, before arrival.' },
      { title: 'Access Card Issuance', desc: 'Issue physical or virtual access cards to visitors upon arrival, granting controlled access to specific areas.' },
      { title: 'Controlled Door Access', desc: 'Send visitor access permissions directly to specific controlled doors, limiting access to authorised areas only.' },
      { title: 'Automatic Access Removal', desc: 'Visitor access is automatically revoked upon departure, with no manual intervention required.' },
      { title: 'Visit Closure on Departure', desc: 'Close visitor appointments on departure with time-stamped records for compliance and audit purposes.' },
      { title: 'Audit & Visitor Reports', desc: 'Comprehensive visitor logs, scheduled visit reports and audit trails for security and compliance teams.' },
    ],
    industries: ['government', 'banking', 'healthcare'],
    brochurePath: '/brochure/TA_HR_PAYROLL_V1.11.pdf',
  },
  'time-attendance-enterprise': {
    seoKeyword: 'time attendance enterprise Bahrain GCC multi-site biometric mobile app',
    tagline: 'No.1 TimeTech. Recognised and appreciated by GCC Labour. Multi-site, multi-company enterprise attendance for unlimited locations.',
    highlights: ['Multi-Site & Multi-Company', 'Geo-Fenced Mobile App', 'ProjectWise Manhours', 'Employee Self-Service', 'Overtime Workflow', 'iOS & Android'],
    features: [
      { title: 'Multi-Modal Biometric', desc: 'Fingerprint, facial recognition, smart card and PIN on all terminal types.' },
      { title: 'Auto Shift Picking', desc: 'N-number of shifts with auto picking, Ramadan shift, mother feeding shift and over-day shift support.' },
      { title: 'ProjectWise Manhour Tracking', desc: 'Assign projects per employee, mark project start/end times and generate project-wise manhour summary reports.' },
      { title: 'Employee Self-Service Portal', desc: 'Employees view attendance, exception records, leave balance, upcoming holidays and notice board via web portal.' },
      { title: 'Mobile App (iOS & Android)', desc: 'Geo-fenced locations, selfie clock-in, QR code attendance, leave requests, overtime requests and excuse submissions from mobile.' },
      { title: 'Overtime Approval Workflow', desc: 'Multi-step overtime approval and rejection workflow with automated amount calculation.' },
      { title: 'LMRA Compliance', desc: 'Built-in reports for Bahrain Labour Market Regulatory Authority with direct integration.' },
      { title: 'Email Notifications', desc: 'Auto alerts for absences, late entry, early exit to employee and department heads with scheduled summary reports.' },
    ],
    industries: ['government', 'healthcare', 'banking', 'logistics'],
    brochurePath: '/brochure/TA_HR_PAYROLL_V1.11.pdf',
    additionalSections: [
      {
        title: 'ProjectWise Manhour Tracking',
        bullets: [
          'Project Master creation',
          'Assigning projects to employees',
          'Marking project start time and end time per project',
          'Assigning break hours to succeeding project',
          'Project wise manhour summary sheet',
          'Employee wise project summary',
          'Employee wise project details',
        ],
      },
      {
        title: 'Employee Self-Service (Enterprise)',
        bullets: [
          'Employee can login with employee ID and view attendance reports',
          'Choose own password',
          'View exception records',
          'Submit leave requests and view status',
          'View upcoming holidays',
          'Notice board access',
        ],
      },
      {
        title: 'TimeTech Mobile App (iOS/Android)',
        bullets: [
          'Geo-fencing locations',
          'Allocating geo-fenced locations per employee',
          'Clock In/Clock Out via selfie photo from mobile',
          'Clock In/Clock Out via QR code scanning with photo capture',
          'View attendance logs',
          'Leave request, balance and details',
          'Overtime request and details',
          'Excuse request (late entry, early exit, break hours) and details',
          'Missing swipe entry request',
          'Future excuse request and details',
          'Time in Lieu request',
        ],
      },
    ],
  },
  'hr-payroll-software': {
    seoKeyword: 'HR software Bahrain WPS payroll HRMS GCC GOSI',
    tagline: 'TimeTech professional HRMS and Payroll for the Gulf Region. Multi-company, multi-currency, bi-lingual, flexible and cost effective.',
    highlights: ['WPS-ready Payroll', 'GOSI Integration', 'Multi-Company', 'Employee Self-Service', 'Document Control', 'Mobile App'],
    features: [
      { title: 'Personnel Module', desc: 'Comprehensive Employee Master with document expiry reminders for Residence Permit, CPR, Passport and insurance. Manage dependents, qualifications and HR memos.' },
      { title: 'Leave Management', desc: 'Define leave templates per employee using formulas. Calendar or working day calculation, leave carry forward, online requests with escalation and leave settlement.' },
      { title: 'Payroll Module', desc: 'Monthly and multiple payrolls per month. Define salary structures using formulas. WPS bank transfer formats, GOSI calculations, payroll comparison and approval workflow.' },
      { title: 'Employee Self-Service', desc: 'Employees login with their ID to apply for leave, view payslips, request overtime, submit excuse requests and view leave balances online.' },
      { title: 'Email Notifications', desc: 'Absent, late entry, early exit and missing swipe alerts to employee email. Summary notifications to department heads and HR. Payslip emailed on approval.' },
      { title: 'Appraisal Module', desc: 'KPI-based performance evaluation with self-evaluation, supervisor evaluation, grade reports and approval workflows.' },
      { title: 'Recruitment Module', desc: 'Manpower planning, job profile creation, hiring manager assignment, interview board setup and integrated job vacancy web application.' },
      { title: 'Training Module', desc: 'Training master, requisition and approval, employee assignment, auto alerts and comprehensive training management reports.' },
    ],
    industries: ['government', 'banking', 'retail', 'healthcare'],
    brochurePath: '/brochure/TA_HR_PAYROLL_V1.11.pdf',
    additionalSections: [
      {
        title: 'Personnel Module',
        bullets: [
          'Comprehensive Employee Master',
          'Management of Employee Dependents records',
          'Employee contact details',
          'Document expiry reminders and control: Residence Permit, CPR, Passport, contract, insurance',
          'Control for issues as per Bahrain Labor law',
          'Attachments related to employees',
          'Reminder reports for expiring documents',
          'Absences and leaves control',
          'Management of items issued to employees',
          'Management of memos',
          'Employee qualification details',
          'Reports including Bahrainisation, nationality-wise, service period, Male/Female ratio',
        ],
      },
      {
        title: 'Leave Management Module',
        bullets: [
          'Define leave templates and leave structure using formulas per employee',
          'Assign eligible leave types per employee',
          'Option: calendar days or working days, leave carry forward',
          'Employee leave requests via self-service portal with escalation to reporting manager',
          'Leave settlement by HR',
          'View available leave balance at any time',
          'Leave ledger and leave history',
          'Leave settlement and final settlement',
          'Option to include salary with settlements',
          'Option to en-cash leave',
          'Email notifications at each stage',
        ],
      },
      {
        title: 'Payroll Module',
        bullets: [
          'Monthly payroll generation',
          'Multiple payrolls in a month',
          'Define salary structure using formulas and fixed amounts per employee',
          'Allowances and Deductions master creation',
          'Salary transfer formats to Bank (WPS)',
          'GOSI calculations',
          'Easy payroll generation or modification',
          'Import allowances/deductions from Excel template',
          'Direct integration with Time Attendance',
          'Summary and department-wise payslip',
          'Payroll comparison',
          'Individual or group payslip printing',
          'Recurring deductions and loan ledger',
          'Payroll approval workflow',
          'Advance deduction booking',
          'Employee costing and journal voucher creation',
        ],
      },
      {
        title: 'Employee Self-Service (Enterprise)',
        bullets: [
          'Login with employee ID, choose own password',
          'Apply for leave online with full approval cycle',
          'View available leave balance and taken leave',
          'Leave ledger',
          'Overtime request',
          'Excuse request (late entry, early exit, break hours)',
          'Missing swipe entry request',
          'Future excuse request',
          'Time in Lieu request',
          'Circulars and certificates (English)',
          'General requests with HR approval',
          'Informative dashboard',
          'HR template uploads to individual employees',
          'Own payslip access',
        ],
      },
    ],
  },
  'timetech-application': {
    seoKeyword: 'TimeTech time attendance HRMS Bahrain GCC',
    tagline: 'A complete cloud workforce platform: attendance, HR, payroll, visitor management and mobile self-service, purpose-built for GCC enterprises.',
    highlights: ['LMRA & WPS Compliant', 'Multi-company & multi-site', 'iOS & Android mobile app', 'Arabic & English interface', 'Auto shift picking', 'Geo-fenced mobile attendance'],
    features: [
      { title: 'Biometric Time Attendance', desc: 'Fingerprint, face recognition and card-based terminals with real-time processing. No manual intervention needed.' },
      { title: 'Auto Shift & Work Rules', desc: 'N-number of shifts with auto picking, flexi rules, Ramadan shift support, grace periods and OT segregation.' },
      { title: 'HRMS & Payroll', desc: 'Multi-company, multi-currency WPS payroll with GOSI, LMRA integration, leave management and bank transfer formats.' },
      { title: 'Employee Self-Service Portal', desc: 'Web and mobile portal for leave requests, payslip access, overtime requests and notice board.' },
      { title: 'Mobile App (iOS/Android)', desc: 'Geo-fenced mobile attendance, selfie punch, QR code clock-in, leave/overtime requests and real-time notifications.' },
      { title: 'Visitor Management', desc: 'Reception kiosk with appointment forms, access card issuance, door assignment and comprehensive visitor reports.' },
      { title: 'Appraisal & Recruitment', desc: 'KPI-based performance evaluation, manpower planning, job profiles and recruitment workflow management.' },
      { title: 'Multi-Company & ERP Integration', desc: 'Manage multiple legal entities, cost centres and departments across unlimited sites, with custom API and third-party system integration.' },
    ],
    industries: ['government', 'healthcare', 'banking', 'retail', 'logistics'],
  },
  'time-attendance-system': {
    seoKeyword: 'time attendance system Bahrain GCC biometric',
    tagline: 'Cloud-based biometric attendance across unlimited locations, with real-time dashboards, auto-shift picking, overtime management and LMRA-compliant payroll export.',
    highlights: ['Fingerprint & face recognition', 'LMRA compliant reports', 'Real-time dashboard', 'Auto shift picking', 'Email alerts for absences', 'Overtime approval workflow'],
    features: [
      { title: 'Multi-Modal Biometric', desc: 'Fingerprint, facial recognition, smart card and PIN, all supported on one integrated terminal.' },
      { title: 'Auto Shift Picking', desc: 'System automatically picks the correct shift per employee. No manual rostering required.' },
      { title: 'Real-Time Dashboard', desc: 'Live ON/OFF duty, late entry and early exit status across all locations at any moment.' },
      { title: 'Flexi & Special Shifts', desc: 'Ramadan shift, mother feeding shift, over-day shift and custom rule configurations.' },
      { title: 'Overtime Management', desc: 'OT segregation by time and day, grace periods, minimum OT thresholds and approval workflows.' },
      { title: 'LMRA Compliance', desc: 'Built-in reports for Bahrain Labour Market Regulatory Authority with direct integration.' },
      { title: 'Email Notifications', desc: 'Auto alerts for absent, late entry, early exit and missing swipe to employee and department heads.' },
      { title: 'Daily Attendance Reports', desc: 'Daily, weekly and monthly reports: time cards, overtime, deductions and graphical analysis.' },
    ],
    industries: ['government', 'healthcare', 'banking'],
    brochurePath: '/brochure/TA_HR_PAYROLL_V1.11.pdf',
  },
  'queue-management-system': {
    seoKeyword: 'queue management system Bahrain GCC kiosk wired wireless',
    tagline: 'Wired and wireless kiosk-based queuing for ministries, banks, hospitals and enterprises, with audio announcements, live analytics and supervisor reporting.',
    highlights: ['15" all-in-one KIOSK', 'Wired or wireless', 'Audio announcements', 'Multi-lingual support', 'Real-time analytics', 'Supervisor reporting'],
    features: [
      { title: '15" Touchscreen Kiosk', desc: 'All-in-one kiosk with built-in server, 80mm thermal printer and audio system, reducing single-point failure.' },
      { title: 'Wired & Wireless Options', desc: 'Ethernet cabling or fully wireless, both options available based on site requirements.' },
      { title: 'Multi-Service Categories', desc: 'Handles up to 10+ service categories with VIP and priority routing built in.' },
      { title: 'Counter LED Displays', desc: '8-digit bright LED counter displays, 35.4cm wide, showing ticket and counter numbers.' },
      { title: 'Audio Announcements', desc: 'Multi-lingual voice announcements through waiting area TV speakers or ceiling speakers.' },
      { title: 'Live Analytics & Reports', desc: 'Daily service reports, average wait time, processing time and satisfaction evaluation data.' },
      { title: 'Supervisor Remote Reporting', desc: 'Full reporting application accessible from KIOSK or remotely from supervisor PC.' },
    ],
    industries: ['government', 'banking', 'healthcare'],
    brochurePath: '/brochure/QMS_24.pdf',
    youtubeUrl: 'https://www.youtube.com/embed/RnzjXYywChE',
  },
  'rfid-asset-tracking': {
    seoKeyword: 'RFID asset tracking Bahrain warehouse management document tracking',
    tagline: 'Track assets, documents, warehouse inventory and gold ornaments across multiple buildings, departments and warehouses, using RFID tags, handheld scanners and barcode technology.',
    highlights: ['Active & passive RFID', 'Handheld mobile scanners', 'Multi-building & multi-site', 'Document Tracking', 'Warehouse WMS', 'Gold & Valuables Tracking'],
    features: [
      { title: 'RFID Fixed Asset Tracking', desc: 'Track asset flow across the organisation efficiently. Hierarchy: Company, Department, Building, Room. Assets do not need to be visible to the RFID system.' },
      { title: 'RFID Document Tracking', desc: 'Each document is assigned a unique RFID label. Passive RFID tags track document flow within organisations, reducing employee time for document management.' },
      { title: 'Active & Passive RFID', desc: 'Passive RFID: tags with no internal power for access control and document tracking. Active RFID: battery-powered tags for longer-range tracking across larger areas.' },
      { title: 'Warehouse Management (WMS)', desc: 'Goods receiving, tagging, picking, dispatch and cycle count, all RFID/barcode driven with real-time back-office sync.' },
      { title: 'Barcode Scanners', desc: 'Rugged handheld barcode scanners for fast bulk scanning, stock takes and item verification.' },
      { title: 'Mobile Computers', desc: 'Handheld mobile terminals for warehouse operations, picking and real-time stock updates on the move.' },
      { title: 'Barcode Printers', desc: 'Label printers for producing barcode and RFID tags for items, shelves and assets.' },
      { title: 'Multi-Site Support', desc: 'Manage assets and inventory across unlimited buildings, floors, departments and warehouse locations.' },
    ],
    industries: ['government', 'healthcare', 'logistics'],
    brochurePath: '/brochure/RFID_24.pdf',
    youtubeUrl: 'https://www.youtube.com/embed/VCvD62vv1mQ',
    additionalSections: [
      {
        title: 'RFID Document Tracking System',
        intro: 'A user-friendly system to track document flow within organisations, reducing employee time for document management and tracking.',
        bullets: [
          'Each document assigned a unique RFID label for tracking',
          'Passive RFID tracking: tags with no internal power, use electromagnetic signals from reader',
          'Applicable for: access control, document tracking, file management',
          'Reduces employee time spent on document management and tracking',
        ],
      },
      {
        title: 'RFID/Barcode Warehouse Management System (WMS)',
        bullets: [
          'Goods Receiving: based on Purchase Order / Goods Receiving Note',
          'Tagging Items: every inventory item RFID-tagged, then binned/put-away',
          'Picking: based on Sales Order / Pick List; rack labels and items scanned via RFID, updated to back office in real time',
          'Dispatch/Shipping: vehicle loading, delivery confirmation',
          'Stock Take / Cycle Count: periodical inventory count matched against physical stock and system stock',
          'Hardware supported: Barcode Scanners, Mobile Computers (handheld terminals), Barcode Printers',
        ],
      },
    ],
  },
  'access-control-system': {
    seoKeyword: 'access control system IP CCTV Bahrain biometric cameras surveillance',
    tagline: 'Enterprise-grade IP surveillance and biometric access control. D3 is a system integrator delivering complete security solutions for indoor, outdoor, business and home environments.',
    highlights: ['IP CCTV (Indoor & Outdoor)', 'Fingerprint & Face Recognition', 'Proximity Card / NFC', 'Centralised Management', 'No Lost Keys or Passwords', 'Scalable to Enterprise'],
    features: [
      { title: 'IP CCTV: Local & Remote Monitoring', desc: 'D3 is a system integrator, not just a CCTV seller. Local or remote monitoring via networked surveillance, suitable for indoor and outdoor, business and home environments.' },
      { title: 'Camera Types', desc: 'Indoor/outdoor, Dome/box/PTZ, Wide angle, 360-degree fixed, Weather proof (IP68), Day and night with IR, Varifocal and optical lenses.' },
      { title: 'NVR & Server Software', desc: 'Network video recorders, web-based and server software for centralised management, recording and remote playback.' },
      { title: 'Biometric Access Control', desc: 'Biometric access control uses unique physical features as keys. No forgotten passwords, no lost keys.' },
      { title: 'Controller Types', desc: 'Proximity Card or NFC, Fingerprint, Face Recognition, Stand-Alone and Centralised controller options available.' },
      { title: 'Scalable Deployment', desc: 'Scale from a single door to enterprise-wide centralised access management across multiple buildings and sites.' },
    ],
    industries: ['government', 'banking', 'logistics'],
    additionalSections: [
      {
        title: 'IP CCTV Surveillance',
        intro: 'D3 is a system integrator delivering complete IP-based surveillance solutions, not just hardware supply.',
        bullets: [
          'Local or remote monitoring via networked surveillance',
          'Suitable for indoor and outdoor, business and home environments',
          'Indoor/outdoor cameras, Dome/box/PTZ configurations',
          'Wide angle and 360-degree fixed cameras',
          'Weather proof units (IP68 rated)',
          'Network video recorder and web-based server software',
          'Day and night cameras with IR illumination',
          'Varifocal and optical lens options',
        ],
      },
      {
        title: 'Access Control Systems',
        intro: 'Biometric access control uses unique physical features as keys, eliminating forgotten passwords and lost cards.',
        bullets: [
          'Proximity Card or NFC reader controllers',
          'Fingerprint biometric controllers',
          'Face Recognition controllers',
          'Stand-Alone door controllers',
          'Centralised enterprise access management',
          'Scalable from single door to enterprise-wide deployment',
          'No forgotten passwords or lost keys',
        ],
      },
    ],
  },
  'digital-signage': {
    seoKeyword: 'digital signage LED displays Bahrain GCC vertical signage eBook CMS',
    tagline: 'Indoor and outdoor LED displays, vertical portrait screens, e-book readers and IP power controllers, all managed from a central CMS with scheduling and real-time content updates.',
    highlights: ['LED from 4mm to 20mm pitch', 'Vertical Displays from 42"', 'Virtual Interactive eBook', 'IP Power Controller', 'Web-based CMS', '24/7 Operation'],
    features: [
      { title: 'LED Displays', desc: 'Pitch sizes from 4mm to 20mm. Indoor and outdoor (fully weatherproof). First Selection LEDs with HDV pixel technology for colour uniformity and image quality.' },
      { title: 'Vertical Signage Displays', desc: 'Available from 42" in multiple sizes. Full HD and 4K. Vertical or horizontal orientation. Built-in Windows or Android OS. Touch screen optional. 24/7 rated.' },
      { title: 'Virtual Interactive eBook', desc: 'Developed by D3. Convex projection screen with authentic book form factor. Rear projection for no hand shadow. Supports text, images, SWF and video.' },
      { title: 'IP Power Controller', desc: 'Fully customised controller board. Remote power management via web-based GUI. Manages AC or DC voltage. High or low ampere configurations.' },
      { title: 'Content Management Software', desc: 'Centralised Windows-based content management software. Customised to client requirements. Schedule and publish content across all connected screens.' },
    ],
    industries: ['retail', 'government', 'banking'],
    additionalSections: [
      {
        title: 'LED Display Systems',
        intro: 'D3 supplies and integrates indoor and outdoor LED display solutions using First Selection LEDs for superior colour uniformity.',
        bullets: [
          'Pitch sizes from 4mm to 20mm',
          'Suitable for indoor and outdoor environments',
          'Fully weatherproof outdoor units',
          'Uses First Selection LEDs (top 10%) with 5 nanometre wavelength tolerance for colour uniformity',
          'HDV pixel technology for increased image quality',
          'Customised software developed to client requirements',
          'Display types: Ticker Single-Line Series, Multi-Line Series',
        ],
      },
      {
        title: 'Vertical Display Signage',
        bullets: [
          'Available from 42" in multiple sizes',
          'Vertical stand with vertical or horizontal display orientation',
          'Full HD and 4K options',
          'Aspect ratio 16:9 or 4:3',
          'Long life high brightness LED screen',
          'Metal frame + toughened glass',
          'Black, silver or customised colour',
          'Designed for 24/7 operation',
          'Built-in Windows or Android OS',
          'Built-in Wi-Fi, Ethernet module and speakers',
          'Remote control included',
          'Touch screen optional',
          'Stand-alone or centralised management application optional',
        ],
      },
      {
        title: 'Virtual Interactive eBook',
        intro: 'Developed by D3. A unique convex projection screen system with an authentic book form factor design.',
        bullets: [
          'Convex projection screen with desk representation system',
          'Authentic book form factor design with transparent acrylic body',
          'Rear projection: no hand shadow, higher picture quality than front projection',
          'Supports all content formats: text, images, SWF, video',
          'Use cases: Museum, Exhibition, Events, Showrooms, Education',
        ],
      },
      {
        title: 'IP Power Controller',
        intro: 'Remotely manage power to any device via a web-based GUI, with no physical site access required.',
        bullets: [
          'Fully customised controller board design and fabrication',
          'Remote power management via web-based GUI (no physical site access required)',
          'Manages AC or DC voltage',
          'High or low ampere configurations',
          'Power controller types: Web Power Switch, Ethernet Power Controller, Web-based DIN Relay, Industrial Power Switch',
          'Applicable fields: Industrial machines, Remote sites, Data Centres, Building power management',
        ],
      },
    ],
  },
  'erp-retail-management': {
    seoKeyword: 'ERP software Bahrain retail management inventory electronic shelf labels',
    tagline: 'Inventory, purchasing, sales, finance and HR integrated into one unified system, with electronic shelf labels and restaurant management. Multi-company, multi-currency, multi-branch.',
    highlights: ['Multi-Company & Multi-Branch', 'Real-time Inventory', 'Electronic Shelf Labels', 'Financial Accounting', 'Restaurant Management', 'Van Sales & RFID'],
    features: [
      { title: 'Procurement & Import', desc: 'Issue Purchase Orders, manage Goods Receipt, pending order status, creditors management and item return with document attachment.' },
      { title: 'Inventory Management', desc: 'Comprehensive Item/Stock Master, stock status by location, inter-transfer, FIFO/Average costing, cost management and multi-location support.' },
      { title: 'Sales Management', desc: 'Item issue to projects, margin setting by percentage, FIFO costing, detailed and location-wise sales reports, sales returns with document attachment.' },
      { title: 'Financial Accounting', desc: 'Full GL, AP, AR and bank reconciliation with local chart of accounts and multi-currency support.' },
      { title: 'Electronic Shelf Labels', desc: 'Bidirectional graphic and segment label options. Instant price updates. Cross-platform management software. Supports promotions and omni-channel retail.' },
      { title: 'Restaurant Management', desc: 'Full restaurant module integrated with the ERP: table management, orders, kitchen display and POS.' },
      { title: 'Payroll & HR Integration', desc: 'Native integration with TimeTech HRMS and Payroll, with no double entry across HR and finance.' },
      { title: 'Van Sales & RFID', desc: 'Van sales management with mobile handheld terminals, RFID integration and real-time stock updates.' },
    ],
    industries: ['retail', 'logistics', 'government'],
    additionalSections: [
      {
        title: 'ERP Multi-Tier Structure',
        intro: 'D3 ERP supports a comprehensive multi-tier organisational hierarchy for complex business structures.',
        bullets: [
          'Multi Companies',
          'Multi Groups',
          'Multi Branches',
          'Multi Sub Branches',
          'Multi Divisions',
          'Multi Locations',
        ],
      },
      {
        title: 'ERP Modules',
        bullets: [
          'Procurement Control',
          'Import & Local Purchase',
          'Inventory Management',
          'Sales Management',
          'Retail Management',
          'Financial Accounting',
          'Production Control',
          'Fixed Assets',
          'Restaurant Management',
          'Payroll & HR Management',
          'Van Sales / RFID integration',
          'Time & Attendance integration',
        ],
      },
      {
        title: 'Key Benefits',
        bullets: [
          'Economical pricing',
          'Comprehensive warranty',
          '100% customisation',
          'Integration with 3rd party hardware and software',
          'Training and support included',
          'Free updates',
        ],
      },
      {
        title: 'Electronic Shelf Labels',
        intro: 'Optimise pricing and guarantee price integrity across all shelves with D3\'s Electronic Shelf Label solution.',
        bullets: [
          'Bidirectional, graphic and segment label options',
          'Optimises pricing and guarantees price integrity',
          'Scalable deployment: cloud or local',
          'Cross-platform management software (PC, tablet, PDA)',
          'Visual interface with flexible editing modules',
          'Supports promotions, product availability and omni-channel retail',
        ],
      },
    ],
  },
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const sol = SOLUTIONS.find((s) => s.slug === slug);
  const detail = SOLUTION_DETAILS[slug];
  if (!sol) return { title: 'Solution Not Found' };
  return {
    title: `${sol.title} | D3: Digital Data Dimensions`,
    description: sol.desc,
    keywords: detail?.seoKeyword,
  };
}

const HERO_IMAGES: Record<string, { src: string; alt: string }> = {
  'consultancy':              { src: '/images/solutions/consultancy-hero.png', alt: 'D3 IT consultancy services' },
  'visitor-management':       { src: '/images/solutions/visitor-hero.png',     alt: 'TimeTech visitor management system' },
  'time-attendance-enterprise': { src: '/images/solutions/timeattendance-hero.png', alt: 'TimeTech Enterprise time attendance' },
  'time-attendance-system':   { src: '/images/solutions/timeattendance-hero.png', alt: 'TimeTech time attendance system' },
  'hr-payroll-software':      { src: '/images/solutions/hrms-hero.png',         alt: 'TimeTech HRMS payroll software' },
  'queue-management-system':  { src: '/images/solutions/qms-hero.png',          alt: 'TimeTech queue management system kiosk' },
  'digital-signage':          { src: '/images/solutions/signage-hero.jpg',       alt: 'D3 digital signage installation' },
  'rfid-asset-tracking':      { src: '/images/solutions/rfid-hero.png',          alt: 'RFID asset tracking system' },
  'access-control-system':    { src: '/images/solutions/access-hero.jpeg',       alt: 'Biometric access control system' },
  'erp-retail-management':    { src: '/images/solutions/erp-hero.png',           alt: 'D3 ERP system' },
  'timetech-application':     { src: '/images/solutions/timeattendance-hero.png', alt: 'TimeTech Platform dashboard' },
};

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const sol = SOLUTIONS.find((s) => s.slug === slug);
  const detail = SOLUTION_DETAILS[slug];

  if (!sol || !detail) notFound();

  const heroImg = HERO_IMAGES[slug];
  const relatedCaseStudy = CASE_STUDIES.find((cs) => cs.slug === detail.caseStudySlug);
  const relatedIndustries = INDUSTRIES.filter((ind) => detail.industries.includes(ind.slug));
  const relatedSolutions = SOLUTIONS.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      {/* ── HERO — 2-column ── */}
      <section style={{ padding: '80px 0 60px', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)' }}>
          <div className="sol-hero-grid">
            {/* Left */}
            <div>
              <SectionEyebrow>Solution</SectionEyebrow>
              <h1 style={{ fontFamily: 'var(--font)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, letterSpacing: -1.5, lineHeight: 1.08, color: 'var(--heading)', marginBottom: 20 }}>
                {sol.title}
              </h1>
              <p style={{ fontSize: 17, color: 'var(--body)', lineHeight: 1.8, fontWeight: 400, marginBottom: 36 }}>
                {detail.tagline}
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Button href="/contact" variant="primary"><ArrowIcon />Request a Demo</Button>
                <Button href="/contact" variant="ghost">Talk to us</Button>
                {detail.brochurePath && (
                  <a
                    href={detail.brochurePath}
                    download
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '10px 20px', borderRadius: 100,
                      border: '1px solid var(--border)',
                      background: 'var(--bg-surface)',
                      fontSize: 13, fontWeight: 300, color: 'var(--body)',
                      textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download Brochure
                  </a>
                )}
              </div>

              {/* Hero image shown below CTA on mobile, hidden on desktop when sidebar shows it */}
              {heroImg && (
                <div className="sol-hero-img-mobile" style={{ marginTop: 36, borderRadius: 16, overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,33,71,0.12)' }}>
                  <Image
                    src={heroImg.src}
                    alt={heroImg.alt}
                    width={700}
                    height={420}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    priority
                  />
                </div>
              )}
            </div>

            {/* Right — hero image if available, otherwise highlights panel */}
            {heroImg ? (
              <div style={{ alignSelf: 'center' }} className="sol-hero-img-desktop">
                <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,33,71,0.14)' }}>
                  <Image
                    src={heroImg.src}
                    alt={heroImg.alt}
                    width={700}
                    height={480}
                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                    priority
                  />
                </div>
                {/* Key capabilities below image */}
                <div style={{
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 16, padding: '20px 24px', marginTop: 16,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12 }}>Key capabilities</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {detail.highlights.map((h) => {
                      const c = chipColor(h);
                      return (
                      <span key={h} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        fontSize: 12, fontWeight: 300, color: c.text,
                        background: c.bg, border: `1px solid ${c.border}`,
                        borderRadius: 100, padding: '4px 12px',
                      }}>
                        <CheckIcon /> {h}
                      </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 20, padding: '32px', alignSelf: 'start',
              }}>
                <div style={{ fontSize: 12, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 20 }}>Key capabilities</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {detail.highlights.map((h) => {
                    const c = chipColor(h);
                    return (
                    <li key={h} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        fontSize: 13, fontWeight: 300, color: c.text,
                        background: c.bg, border: `1px solid ${c.border}`,
                        borderRadius: 100, padding: '5px 14px', flexShrink: 0,
                      }}>
                        <CheckIcon /> {h}
                      </span>
                    </li>
                    );
                  })}
                </ul>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                  {sol.tags.map((tag) => {
                    const c = chipColor(tag);
                    return (
                    <span key={tag} style={{
                      fontSize: 11, fontWeight: 300, padding: '4px 12px', borderRadius: 100,
                      background: c.bg, border: `1px solid ${c.border}`,
                      color: c.text, letterSpacing: '0.02em',
                    }}>{tag}</span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section style={{ padding: '80px 0', background: 'var(--bg-surface)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)' }}>
          <RevealOnScroll>
            <SectionEyebrow>What&apos;s included</SectionEyebrow>
            <h2 style={{ fontFamily: 'var(--font)', fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 400, letterSpacing: -1, lineHeight: 1.15, color: 'var(--heading)', marginBottom: 48 }}>
              All the features you need
            </h2>
          </RevealOnScroll>
          <div className="features-grid">
            {detail.features.map((f, i) => {
              const { icon, color } = getFeatureIcon(f.title);
              return (
              <RevealOnScroll key={f.title} delay={i * 40}>
                <div style={{
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 16, padding: '24px 20px',
                  height: '100%',
                }}>
                  <div style={{ color, marginBottom: 12, display: 'flex' }}>
                    {icon}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 300, color: 'var(--heading)', marginBottom: 6 }}>{f.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.65, fontWeight: 400 }}>{f.desc}</div>
                </div>
              </RevealOnScroll>
              );
            })}
          </div>
        </div>
        <style>{`
          .sol-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
          .sol-hero-img-mobile { display: none; }
          @media (max-width: 900px) {
            .sol-hero-grid { grid-template-columns: 1fr; gap: 32px; }
            .sol-hero-img-desktop { display: none; }
            .sol-hero-img-mobile { display: block; }
          }
          .features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
          @media (max-width: 1100px) { .features-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 600px) { .features-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── YOUTUBE EMBED ── */}
      {detail.youtubeUrl && (
        <section style={{ padding: '72px 0', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)' }}>
            <RevealOnScroll>
              <SectionEyebrow>See it in action</SectionEyebrow>
              <h2 style={{ fontFamily: 'var(--font)', fontSize: 'clamp(22px, 2.8vw, 36px)', fontWeight: 400, letterSpacing: -0.8, color: 'var(--heading)', marginBottom: 32 }}>
                Watch {sol.title} in action
              </h2>
            </RevealOnScroll>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 16, border: '1px solid var(--border)' }}>
              <iframe
                src={detail.youtubeUrl}
                title={`${sol.title} demonstration`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              />
            </div>
          </div>
        </section>
      )}

      {/* ── ADDITIONAL SECTIONS ── */}
      {detail.additionalSections && detail.additionalSections.length > 0 && (
        <section style={{ padding: '80px 0', background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)' }}>
            <RevealOnScroll>
              <SectionEyebrow>Detailed modules</SectionEyebrow>
              <h2 style={{ fontFamily: 'var(--font)', fontSize: 'clamp(22px, 2.8vw, 36px)', fontWeight: 400, letterSpacing: -0.8, color: 'var(--heading)', marginBottom: 48 }}>
                Full module breakdown
              </h2>
            </RevealOnScroll>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {detail.additionalSections.map((sec, i) => (
                <RevealOnScroll key={sec.title} delay={i * 40}>
                  <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 24px', height: '100%' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 400, color: 'var(--heading)', marginBottom: 10 }}>{sec.title}</h3>
                    {sec.intro && <p style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.65, marginBottom: 14 }}>{sec.intro}</p>}
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {sec.bullets.map((bullet) => (
                        <li key={bullet} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--body)', lineHeight: 1.5 }}>
                          <span style={{ color: 'var(--cta)', flexShrink: 0, marginTop: 2 }}>
                            <CheckIcon />
                          </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── INDUSTRIES ── */}
      {relatedIndustries.length > 0 && (
        <section style={{ padding: '72px 0', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)' }}>
            <SectionEyebrow>Industries</SectionEyebrow>
            <h2 style={{ fontFamily: 'var(--font)', fontSize: 'clamp(22px, 2.8vw, 36px)', fontWeight: 400, letterSpacing: -0.8, lineHeight: 1.15, color: 'var(--heading)', marginBottom: 32 }}>
              Built for these sectors
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {relatedIndustries.map((ind) => (
                <Link key={ind.slug} href={`/industries/${ind.slug}` as Parameters<typeof Link>[0]['href']} style={{
                  padding: '12px 20px', background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 100, textDecoration: 'none', transition: 'border-color 0.2s',
                  fontSize: 14, fontWeight: 300, color: 'var(--heading)',
                }}>
                  {ind.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case study panel removed — see /case-studies for real client projects */}

      {/* ── RELATED SOLUTIONS ── */}
      <section style={{ padding: '72px 0', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)' }}>
          <SectionEyebrow>Also from D3</SectionEyebrow>
          <h2 style={{ fontFamily: 'var(--font)', fontSize: 'clamp(22px, 2.8vw, 36px)', fontWeight: 400, letterSpacing: -0.8, color: 'var(--heading)', marginBottom: 32 }}>
            Explore more solutions
          </h2>
          <div className="related-grid">
            {relatedSolutions.map((rs) => (
              <Link key={rs.slug} href={`/solutions/${rs.slug}` as Parameters<typeof Link>[0]['href']} style={{
                display: 'block', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px',
                textDecoration: 'none', transition: 'border-color 0.2s',
              }}>
                <div style={{ fontSize: 15, fontWeight: 400, color: 'var(--heading)', marginBottom: 8 }}>{rs.title}</div>
                <div style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.6, marginBottom: 16 }}>{rs.desc.slice(0, 100)}…</div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 300, color: 'var(--muted)' }}>
                  Learn more <ArrowIcon size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
        <style>{`
          .related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
          @media (max-width: 900px) { .related-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 560px) { .related-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      <CTASection />
    </>
  );
}
