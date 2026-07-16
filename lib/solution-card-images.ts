/**
 * Marketing card artwork under `public/images/cards/`.
 * Filenames include spaces and special characters — always build URLs with encodeURIComponent.
 */
function cardImage(filename: string): string {
  return `/images/cards/${encodeURIComponent(filename)}`;
}

/** Intrinsic pixel size of PNGs under `public/images/cards/` (~1363×1154). */
export const SOLUTION_CARD_IMAGE_PIXEL_SIZE = { width: 1363, height: 1154 } as const;

/** Homepage solution grid + solution detail hero imagery */
export const SOLUTION_VISUAL_IMAGES: Record<string, { src: string; alt: string }> = {
  'time-attendance-system': {
    src: cardImage('Time Attendance_ standard.png'),
    alt: 'biometric time attendance system Bahrain',
  },
  'time-attendance-enterprise': {
    src: cardImage('Time Attendance_Enterprise.png'),
    alt: 'enterprise time attendance multi-site GCC',
  },
  'hr-payroll-software': {
    src: cardImage('HR & Payroll Software.png'),
    alt: 'HRMS payroll software Bahrain',
  },
  'visitor-management': {
    src: cardImage('Visitor Management System.png'),
    alt: 'visitor management system Bahrain reception kiosk',
  },
  'queue-management-system': {
    src: cardImage('Queue Management System.png'),
    alt: 'queue management system Bahrain government hospital',
  },
  'digital-signage': {
    src: cardImage('digital signage and display.png'),
    alt: 'digital signage Bahrain LED displays',
  },
  'rfid-asset-tracking': {
    src: cardImage('RFID & Asset Tracking.png'),
    alt: 'RFID asset tracking Bahrain warehouse',
  },
  'access-control-system': {
    src: cardImage('IP CCTV & Access Control.png'),
    alt: 'access control IP CCTV Bahrain biometric doors',
  },
  'erp-retail-management': {
    src: cardImage('ERP & Retail Management.png'),
    alt: 'ERP retail management software Bahrain',
  },
  'consultancy': {
    src: cardImage('IT Consultancy.png'),
    alt: 'IT consultancy managed services Bahrain',
  },
  'timetech-application': {
    src: cardImage('Time Attendance_Enterprise.png'),
    alt: 'TimeTech workforce management platform Bahrain',
  },
};
