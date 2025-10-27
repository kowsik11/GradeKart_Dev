export interface ProfileSectionItem {
  label: string
  value: string
}

export interface ProfileSection {
  id: ProfileTabId
  title: string
  description: string
  items: ProfileSectionItem[]
}

export type ProfileTabId =
  | 'personal'
  | 'contact'
  | 'academic'
  | 'family'
  | 'documents'
  | 'activities'

export interface StudentProfileSnapshot {
  studentName: string
  rollNumber: string
  programme: string
  avatarInitials: string
  lastUpdated: string
  completionPercentage: number
  requiredFields: string[]
  sections: ProfileSection[]
}

export const studentProfileSnapshot: StudentProfileSnapshot = {
  studentName: 'Krishna Sharma',
  rollNumber: '21CSE134',
  programme: 'B.Tech Computer Science (2021–2025)',
  avatarInitials: 'KS',
  lastUpdated: '2025-06-18',
  completionPercentage: 78,
  requiredFields: ['Permanent address', 'Aadhaar number', 'Emergency contact'],
  sections: [
    {
      id: 'personal',
      title: 'Personal Details',
      description: 'Identity information recorded by admissions desk.',
      items: [
        { label: 'First name', value: 'Krishna' },
        { label: 'Middle name', value: 'Prasad' },
        { label: 'Last name', value: 'Sharma' },
        { label: 'Gender', value: 'Male' },
        { label: 'Date of birth', value: '04 Jun 2004' },
        { label: 'Blood group', value: 'B+' },
        { label: 'Nationality', value: 'Indian' },
        { label: 'Mother tongue', value: 'Telugu' },
      ],
    },
    {
      id: 'contact',
      title: 'Contact Information',
      description: 'Reachability preferences shared with the registrar and wardens.',
      items: [
        { label: 'Personal email', value: 'krishna.sharma@student.gradekart.in' },
        { label: 'Mobile number', value: '+91 98765 44532' },
        { label: 'Permanent address', value: '' },
        { label: 'Correspondence address', value: 'Grades Residency, Hyderabad' },
        { label: 'Emergency contact', value: '' },
      ],
    },
    {
      id: 'academic',
      title: 'Academic Snapshot',
      description: 'High-level view of academic enrolment.',
      items: [
        { label: 'Programme', value: 'B.Tech Computer Science' },
        { label: 'Year of study', value: '3rd Year' },
        { label: 'Section', value: 'CSE - A' },
        { label: 'Admission date', value: '28 Aug 2021' },
        { label: 'Major advisor', value: 'Prof. Meera Nair' },
        { label: 'CGPA', value: '8.78' },
      ],
    },
    {
      id: 'family',
      title: 'Parent & Guardian',
      description: 'Primary guardians who receive academic notifications.',
      items: [
        { label: 'Father name', value: 'Rahul Sharma' },
        { label: 'Father contact', value: '+91 91234 55678' },
        { label: 'Mother name', value: 'Sangeeta Sharma' },
        { label: 'Mother contact', value: '+91 93456 77889' },
        { label: 'Guardian email', value: 'parent.sharma@familymail.com' },
      ],
    },
    {
      id: 'documents',
      title: 'Identity Documents',
      description: 'Verified identification proofs stored with registrar.',
      items: [
        { label: 'Aadhaar number', value: '' },
        { label: 'Passport', value: 'N8102345 (valid till 2031)' },
        { label: 'PAN', value: 'BXSPS9901K' },
        { label: 'Student ID card issued', value: 'Yes' },
      ],
    },
    {
      id: 'activities',
      title: 'Activities & Achievements',
      description: 'Clubs, sports, and achievements recorded by the faculty mentors.',
      items: [
        { label: 'Clubs', value: 'AI Research Society, Cultural Committee' },
        { label: 'Sports', value: 'Badminton (Inter-college silver medal)' },
        { label: 'Certifications', value: 'AWS Cloud Practitioner (2024)' },
        { label: 'Community service', value: 'STEM mentor for GradeKart outreach' },
      ],
    },
  ],
}
