export type ProjectImage = {
  id: string;
  client: string;
  location?: string;
  /** What solution this project belongs to (used for filtering) */
  solution?: 'Queue Management' | 'HRMS & Time Attendance' | 'RFID' | 'CCTV & Access' | 'Digital Signage' | 'Other';
  /** Industry / sector (used for filtering) */
  industry?: 'Hospital' | 'Bank' | 'Government' | 'Retail' | 'Education' | 'Other';
  /** Place files under `public/images/` (or a subfolder) and reference e.g. `/images/hilal-hidd.jpeg` */
  src?: string;
  alt: string;
};

export const PROJECT_IMAGES: ProjectImage[] = [
  /* ── QUEUE MANAGEMENT ── */
  {
    id: 'al-hilal-hidd',
    client: 'Al Hilal Hospital',
    location: 'Hidd',
    solution: 'Queue Management',
    industry: 'Hospital',
    src: '/images/hilal-hidd.jpeg',
    alt: 'Project installation at Al Hilal Hospital (Hidd)',
  },
  {
    id: 'al-hilal-sitra',
    client: 'Al Hilal Hospital',
    location: 'Sitra',
    solution: 'Queue Management',
    industry: 'Hospital',
    src: '/images/hilal-sitra.jpeg',
    alt: 'Project installation at Al Hilal Hospital (Sitra)',
  },
  {
    id: 'al-hilal-manama',
    client: 'Al Hilal Hospital',
    location: 'Manama',
    solution: 'Queue Management',
    industry: 'Hospital',
    src: '/images/hilal-manama.jpeg',
    alt: 'Project installation at Al Hilal Hospital (Manama)',
  },
  {
    id: 'al-hilal-hamad-town',
    client: 'Al Hilal Hospital',
    location: 'Hamad Town',
    solution: 'Queue Management',
    industry: 'Hospital',
    src: '/images/hilal-hamadtown.jpeg',
    alt: 'Project installation at Al Hilal Hospital (Hamad Town)',
  },
  {
    id: 'al-hilal-adliya',
    client: 'Al Hilal Hospital',
    location: 'Adliya',
    solution: 'Queue Management',
    industry: 'Hospital',
    src: '/images/hilal-adliya.jpeg',
    alt: 'Project installation at Al Hilal Hospital (Adliya)',
  },
  {
    id: 'al-hilal-adliya-2',
    client: 'Al Hilal Hospital',
    location: 'Adliya',
    solution: 'Queue Management',
    industry: 'Hospital',
    src: '/images/hilal-adliya-2.jpeg',
    alt: 'Additional project installation at Al Hilal Hospital (Adliya)',
  },
  {
    id: 'al-hilal-manama-2',
    client: 'Al Hilal Hospital',
    location: 'Manama',
    solution: 'Queue Management',
    industry: 'Hospital',
    src: '/images/hilal-manama-2.jpeg',
    alt: 'Additional project installation at Al Hilal Hospital (Manama)',
  },
  {
    id: 'habib-bank-manama',
    client: 'Habib Bank Limited',
    location: 'Manama',
    solution: 'Queue Management',
    industry: 'Bank',
    src: '/images/habib-bank-manama.jpeg',
    alt: 'Project installation at Habib Bank Limited (Manama)',
  },
  {
    id: 'ibn-al-nafees-manama',
    client: 'Ibn Al Nafees Hospital',
    location: 'Manama',
    solution: 'Queue Management',
    industry: 'Hospital',
    src: '/images/ibn-al-nafees-manama.jpeg',
    alt: 'Project installation at Ibn Al Nafees Hospital (Manama)',
  },
  {
    id: 'arab-open-university',
    client: 'Arab Open University',
    solution: 'Queue Management',
    industry: 'Education',
    src: '/images/aou-university.jpeg',
    alt: 'Project installation at Arab Open University',
  },
  {
    id: 'qms-1', client: 'Queue System Project', solution: 'Queue Management', industry: 'Government',
    src: '/images/projects/queue-system/QueueSystem1.jpg', alt: 'Queue System Installation 1',
  },
  {
    id: 'qms-2', client: 'Queue System Project', solution: 'Queue Management', industry: 'Government',
    src: '/images/projects/queue-system/QueueSystem2.jpg', alt: 'Queue System Installation 2',
  },
  {
    id: 'qms-3', client: 'Queue System Project', solution: 'Queue Management', industry: 'Government',
    src: '/images/projects/queue-system/QueueSystem3.jpg', alt: 'Queue System Installation 3',
  },
  {
    id: 'qms-4', client: 'Queue System Project', solution: 'Queue Management', industry: 'Government',
    src: '/images/projects/queue-system/QueueSystem4.jpg', alt: 'Queue System Installation 4',
  },
  {
    id: 'qms-5', client: 'Queue System Project', solution: 'Queue Management', industry: 'Government',
    src: '/images/projects/queue-system/QueueSystem5.jpg', alt: 'Queue System Installation 5',
  },
  {
    id: 'qms-6', client: 'Queue System Project', solution: 'Queue Management', industry: 'Government',
    src: '/images/projects/queue-system/QueueSystem6.jpg', alt: 'Queue System Installation 6',
  },
  {
    id: 'qms-7', client: 'Queue System Project', solution: 'Queue Management', industry: 'Government',
    src: '/images/projects/queue-system/QueueSystem7.jpg', alt: 'Queue System Installation 7',
  },
  {
    id: 'qms-8', client: 'Queue System Project', solution: 'Queue Management', industry: 'Government',
    src: '/images/projects/queue-system/QueueSystem8.jpg', alt: 'Queue System Installation 8',
  },
  {
    id: 'qms-9', client: 'Queue System Project', solution: 'Queue Management', industry: 'Government',
    src: '/images/projects/queue-system/QueueSystem9.jpg', alt: 'Queue System Installation 9',
  },
  {
    id: 'qms-10', client: 'Queue System Project', solution: 'Queue Management', industry: 'Government',
    src: '/images/projects/queue-system/QueueSystem10.jpg', alt: 'Queue System Installation 10',
  },
  {
    id: 'qms-11', client: 'Queue System Project', solution: 'Queue Management', industry: 'Government',
    src: '/images/projects/queue-system/QueueSystem11.jpg', alt: 'Queue System Installation 11',
  },

  /* ── HRMS & TIME ATTENDANCE ── */
  {
    id: 'ibnh-1', client: 'Ibn Al Nafees Hospital', solution: 'HRMS & Time Attendance', industry: 'Hospital',
    src: '/images/projects/time-attendance/IBNH1.jpg', alt: 'Time Attendance at Ibn Al Nafees Hospital 1',
  },
  {
    id: 'ibnh-2', client: 'Ibn Al Nafees Hospital', solution: 'HRMS & Time Attendance', industry: 'Hospital',
    src: '/images/projects/time-attendance/IBNH2.jpg', alt: 'Time Attendance at Ibn Al Nafees Hospital 2',
  },
  {
    id: 'ta-1', client: 'Time Attendance Project', solution: 'HRMS & Time Attendance', industry: 'Other',
    src: '/images/projects/time-attendance/TimeAttendanceProjects1.jpg', alt: 'Time Attendance Installation 1',
  },
  {
    id: 'ta-2', client: 'Time Attendance Project', solution: 'HRMS & Time Attendance', industry: 'Other',
    src: '/images/projects/time-attendance/TimeAttendanceProjects2.jpg', alt: 'Time Attendance Installation 2',
  },
  {
    id: 'ta-3', client: 'Time Attendance Project', solution: 'HRMS & Time Attendance', industry: 'Other',
    src: '/images/projects/time-attendance/TimeAttendanceProjects3.jpg', alt: 'Time Attendance Installation 3',
  },
  {
    id: 'ta-4', client: 'Time Attendance Project', solution: 'HRMS & Time Attendance', industry: 'Other',
    src: '/images/projects/time-attendance/TimeAttendanceProjects4.jpg', alt: 'Time Attendance Installation 4',
  },
  {
    id: 'ta-5', client: 'Time Attendance Project', solution: 'HRMS & Time Attendance', industry: 'Other',
    src: '/images/projects/time-attendance/TimeAttendanceProjects5.jpg', alt: 'Time Attendance Installation 5',
  },
  {
    id: 'ta-6', client: 'Time Attendance Project', solution: 'HRMS & Time Attendance', industry: 'Other',
    src: '/images/projects/time-attendance/TimeAttendanceProjects6.jpg', alt: 'Time Attendance Installation 6',
  },
  {
    id: 'ta-7', client: 'Time Attendance Project', solution: 'HRMS & Time Attendance', industry: 'Other',
    src: '/images/projects/time-attendance/TimeAttendanceProjects7.jpg', alt: 'Time Attendance Installation 7',
  },
  {
    id: 'ta-8', client: 'Time Attendance Project', solution: 'HRMS & Time Attendance', industry: 'Other',
    src: '/images/projects/time-attendance/TimeAttendanceProjects8.jpg', alt: 'Time Attendance Installation 8',
  },
  {
    id: 'ta-9', client: 'Time Attendance Project', solution: 'HRMS & Time Attendance', industry: 'Other',
    src: '/images/projects/time-attendance/TimeAttendanceProjects9.jpg', alt: 'Time Attendance Installation 9',
  },
  {
    id: 'ta-10', client: 'Time Attendance Project', solution: 'HRMS & Time Attendance', industry: 'Other',
    src: '/images/projects/time-attendance/TimeAttendanceProjects10.jpg', alt: 'Time Attendance Installation 10',
  },
  {
    id: 'ta-11', client: 'Time Attendance Project', solution: 'HRMS & Time Attendance', industry: 'Other',
    src: '/images/projects/time-attendance/TimeAttendanceProjects11.jpg', alt: 'Time Attendance Installation 11',
  },
  {
    id: 'ta-12', client: 'Time Attendance Project', solution: 'HRMS & Time Attendance', industry: 'Other',
    src: '/images/projects/time-attendance/TimeAttendanceProjects12.jpg', alt: 'Time Attendance Installation 12',
  },

  /* ── DIGITAL SIGNAGE ── */
  {
    id: 'ds-1', client: 'Digital Signage Project', solution: 'Digital Signage', industry: 'Other',
    src: '/images/projects/digital-signage/DigitalSignageProjects1.jpg', alt: 'Digital Signage Installation 1',
  },
  {
    id: 'ds-2', client: 'Digital Signage Project', solution: 'Digital Signage', industry: 'Other',
    src: '/images/projects/digital-signage/DigitalSignageProjects2.jpg', alt: 'Digital Signage Installation 2',
  },
  {
    id: 'ds-3', client: 'Digital Signage Project', solution: 'Digital Signage', industry: 'Other',
    src: '/images/projects/digital-signage/DigitalSignageProjects3.jpg', alt: 'Digital Signage Installation 3',
  },
  {
    id: 'ds-4', client: 'Digital Signage Project', solution: 'Digital Signage', industry: 'Other',
    src: '/images/projects/digital-signage/DigitalSignageProjects4.jpg', alt: 'Digital Signage Installation 4',
  },
  {
    id: 'ds-5', client: 'Digital Signage Project', solution: 'Digital Signage', industry: 'Other',
    src: '/images/projects/digital-signage/DigitalSignageProjects5.jpg', alt: 'Digital Signage Installation 5',
  },
  {
    id: 'ds-6', client: 'Digital Signage Project', solution: 'Digital Signage', industry: 'Other',
    src: '/images/projects/digital-signage/DigitalSignageProjects6.jpg', alt: 'Digital Signage Installation 6',
  },
  {
    id: 'ds-7', client: 'Digital Signage Project', solution: 'Digital Signage', industry: 'Other',
    src: '/images/projects/digital-signage/DigitalSignageProjects7.jpeg', alt: 'Digital Signage Installation 7',
  },

  /* ── RFID ── */
  {
    id: 'rfid-1', client: 'RFID Project', solution: 'RFID', industry: 'Other',
    src: '/images/projects/rfid/RFIDProjects1.jpg', alt: 'RFID Installation 1',
  },
  {
    id: 'rfid-2', client: 'RFID Project', solution: 'RFID', industry: 'Other',
    src: '/images/projects/rfid/RFIDProjects2.jpg', alt: 'RFID Installation 2',
  },
  {
    id: 'rfid-3', client: 'RFID Project', solution: 'RFID', industry: 'Other',
    src: '/images/projects/rfid/RFIDProjects3.jpg', alt: 'RFID Installation 3',
  },
  {
    id: 'rfid-4', client: 'RFID Project', solution: 'RFID', industry: 'Other',
    src: '/images/projects/rfid/RFIDProjects4.jpg', alt: 'RFID Installation 4',
  },
  {
    id: 'rfid-5', client: 'RFID Project', solution: 'RFID', industry: 'Other',
    src: '/images/projects/rfid/RFIDProjects5.jpg', alt: 'RFID Installation 5',
  },
  {
    id: 'rfid-6', client: 'RFID Project', solution: 'RFID', industry: 'Other',
    src: '/images/projects/rfid/RFIDProjects6.jpg', alt: 'RFID Installation 6',
  },
  {
    id: 'rfid-7', client: 'RFID Project', solution: 'RFID', industry: 'Other',
    src: '/images/projects/rfid/RFIDProjects7.jpg', alt: 'RFID Installation 7',
  },
  {
    id: 'rfid-8', client: 'RFID Project', solution: 'RFID', industry: 'Other',
    src: '/images/projects/rfid/RFIDProjects8.jpg', alt: 'RFID Installation 8',
  },

  /* ── CCTV ── */
  {
    id: 'cctv-1', client: 'CCTV Project', solution: 'CCTV & Access', industry: 'Other',
    src: '/images/projects/cctv/CCTV1.jpg', alt: 'CCTV Installation 1',
  },
  {
    id: 'cctv-2', client: 'CCTV Project', solution: 'CCTV & Access', industry: 'Other',
    src: '/images/projects/cctv/CCTV2.jpg', alt: 'CCTV Installation 2',
  },
  {
    id: 'cctv-4', client: 'CCTV Project', solution: 'CCTV & Access', industry: 'Other',
    src: '/images/projects/cctv/CCTV4.jpg', alt: 'CCTV Installation 4',
  },
  {
    id: 'cctv-5', client: 'CCTV Project', solution: 'CCTV & Access', industry: 'Other',
    src: '/images/projects/cctv/CCTV5.jpg', alt: 'CCTV Installation 5',
  },
  {
    id: 'cctv-6', client: 'CCTV Project', solution: 'CCTV & Access', industry: 'Other',
    src: '/images/projects/cctv/CCTV6.jpg', alt: 'CCTV Installation 6',
  },
  {
    id: 'cctv-7', client: 'CCTV Project', solution: 'CCTV & Access', industry: 'Other',
    src: '/images/projects/cctv/CCTV7.jpg', alt: 'CCTV Installation 7',
  },
  {
    id: 'cctv-8', client: 'CCTV Project', solution: 'CCTV & Access', industry: 'Other',
    src: '/images/projects/cctv/CCTV8.jpg', alt: 'CCTV Installation 8',
  },
  {
    id: 'cctv-9', client: 'CCTV Project', solution: 'CCTV & Access', industry: 'Other',
    src: '/images/projects/cctv/CCTV9.jpg', alt: 'CCTV Installation 9',
  },
  {
    id: 'cctv-10', client: 'CCTV Project', solution: 'CCTV & Access', industry: 'Other',
    src: '/images/projects/cctv/CCTV10.jpg', alt: 'CCTV Installation 10',
  },
  {
    id: 'cctv-11', client: 'CCTV Project', solution: 'CCTV & Access', industry: 'Other',
    src: '/images/projects/cctv/CCTV11.jpg', alt: 'CCTV Installation 11',
  },
  {
    id: 'cctv-12', client: 'CCTV Project', solution: 'CCTV & Access', industry: 'Other',
    src: '/images/projects/cctv/CCTV12.jpg', alt: 'CCTV Installation 12',
  },
  {
    id: 'cctv-13', client: 'CCTV Project', solution: 'CCTV & Access', industry: 'Other',
    src: '/images/projects/cctv/CCTV13.jpg', alt: 'CCTV Installation 13',
  },
  {
    id: 'cctv-14', client: 'CCTV Project', solution: 'CCTV & Access', industry: 'Other',
    src: '/images/projects/cctv/CCTV14.jpg', alt: 'CCTV Installation 14',
  },
  {
    id: 'cctv-15', client: 'CCTV Project', solution: 'CCTV & Access', industry: 'Other',
    src: '/images/projects/cctv/CCTV15.jpg', alt: 'CCTV Installation 15',
  },

  /* ── OTHER PROJECTS ── */
  {
    id: 'other-1', client: 'Other Project', solution: 'Other', industry: 'Other',
    src: '/images/projects/other/OtherProjects1.jpg', alt: 'Other Project Installation 1',
  },
  {
    id: 'other-2', client: 'Other Project', solution: 'Other', industry: 'Other',
    src: '/images/projects/other/OtherProjects2.jpg', alt: 'Other Project Installation 2',
  },
  {
    id: 'other-3', client: 'Other Project', solution: 'Other', industry: 'Other',
    src: '/images/projects/other/OtherProjects3.jpg', alt: 'Other Project Installation 3',
  },
];

