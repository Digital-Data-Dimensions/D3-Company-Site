/**
 * Marketing card artwork under `public/images/cards/`.
 * Filenames include spaces and special characters — always build URLs with encodeURIComponent.
 */
function cardImage(filename: string): string {
  return `/images/cards/${encodeURIComponent(filename)}`;
}

/** Intrinsic pixel size of JPEGs under `public/images/cards/` (all current assets match). */
export const SOLUTION_CARD_IMAGE_PIXEL_SIZE = { width: 4259, height: 3606 } as const;

/** Homepage solution grid + solution detail hero imagery */
export const SOLUTION_VISUAL_IMAGES: Record<string, { src: string; alt: string }> = {
  'time-attendance-system': {
    src: cardImage('Time Attendance_ standard.jpg'),
    alt: 'TimeTech time attendance system',
  },
  'time-attendance-enterprise': {
    src: cardImage('Time Attendance_Enterprise.jpg'),
    alt: 'TimeTech Enterprise time attendance',
  },
  'hr-payroll-software': {
    src: cardImage('HR & Payroll Software.jpg'),
    alt: 'TimeTech HRMS and payroll software',
  },
  'visitor-management': {
    src: cardImage('Visitor Management System.jpg'),
    alt: 'TimeTech visitor management system',
  },
  'queue-management-system': {
    src: cardImage('Queue Management System.jpg'),
    alt: 'TimeTech queue management system',
  },
  'digital-signage': {
    src: cardImage('digital signage and display.jpg'),
    alt: 'D3 digital signage and displays',
  },
  'rfid-asset-tracking': {
    src: cardImage('RFID & Asset Tracking.jpg'),
    alt: 'RFID asset tracking system',
  },
  'access-control-system': {
    src: cardImage('IP CCTV & Access Control.jpg'),
    alt: 'IP CCTV and biometric access control',
  },
  'erp-retail-management': {
    src: cardImage('ERP & Retail Management.jpg'),
    alt: 'D3 ERP and retail management',
  },
  'consultancy': {
    src: cardImage('IT Consultancy.jpg'),
    alt: 'D3 IT consultancy services',
  },
  'timetech-application': {
    src: cardImage('Time Attendance_Enterprise.jpg'),
    alt: 'TimeTech platform',
  },
};
