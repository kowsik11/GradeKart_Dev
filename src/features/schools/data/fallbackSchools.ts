import photo1 from '@photos/1.jpg'
import photo2 from '@photos/2.jpg'
import photo3 from '@photos/3.jpg'
import photo4 from '@photos/4.jpg'
import photo5 from '@photos/5.jpg'
import type { SchoolRecord } from '@/api/airtableClient'

export const fallbackSchools: SchoolRecord[] = [
  {
    id: 'fallback-1',
    schoolId: 'demo-school-1',
    name: 'Riverview International School',
    campusName: 'Main Campus',
    photoUrl: photo1,
    logoUrl: undefined,
  },
  {
    id: 'fallback-2',
    schoolId: 'demo-school-2',
    name: 'Beacon Heights College',
    campusName: 'North Campus',
    photoUrl: photo2,
    logoUrl: undefined,
  },
  {
    id: 'fallback-3',
    schoolId: 'demo-school-3',
    name: 'Greenwood Public School',
    campusName: 'STEM Block',
    photoUrl: photo3,
    logoUrl: undefined,
  },
  {
    id: 'fallback-4',
    schoolId: 'demo-school-4',
    name: 'Silver Oak Academy',
    campusName: 'City Campus',
    photoUrl: photo4,
    logoUrl: undefined,
  },
  {
    id: 'fallback-5',
    schoolId: 'demo-school-5',
    name: 'Horizon Scholars Institute',
    campusName: 'Innovation Park',
    photoUrl: photo5,
    logoUrl: undefined,
  },
] 
