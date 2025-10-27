export interface CourseRecord {
  code: string
  title: string
  faculty: string
  credits: number
  type: 'Core' | 'Elective' | 'Lab'
  schedule: string
  status: 'Ongoing' | 'Completed' | 'Planned'
}

export const academicYearOptions = ['2025-26', '2024-25', '2023-24']
export const termOptions = ['Semester 5', 'Semester 4', 'Semester 3', 'Summer Term']

export const courseCatalogue: CourseRecord[] = [
  {
    code: 'CS501',
    title: 'Distributed Systems',
    faculty: 'Prof. Meera Nair',
    credits: 4,
    type: 'Core',
    schedule: 'Mon & Wed • 10:00 – 11:30',
    status: 'Ongoing',
  },
  {
    code: 'CS515',
    title: 'Cloud Native Architecture',
    faculty: 'Dr. Rahul Desai',
    credits: 3,
    type: 'Elective',
    schedule: 'Tue • 14:00 – 17:00',
    status: 'Ongoing',
  },
  {
    code: 'AI504',
    title: 'Applied Machine Learning',
    faculty: 'Ms. Anitha Varun',
    credits: 4,
    type: 'Core',
    schedule: 'Thu & Fri • 09:00 – 10:30',
    status: 'Ongoing',
  },
  {
    code: 'CS507',
    title: 'Systems Design Lab',
    faculty: 'Mr. Sandeep Rao',
    credits: 2,
    type: 'Lab',
    schedule: 'Fri • 13:30 – 16:30',
    status: 'Ongoing',
  },
  {
    code: 'ENT401',
    title: 'Design Thinking',
    faculty: 'Ms. Kavya Reddy',
    credits: 3,
    type: 'Elective',
    schedule: 'Wed • 15:30 – 17:30',
    status: 'Completed',
  },
  {
    code: 'CS410',
    title: 'Compiler Construction',
    faculty: 'Dr. Arvind Menon',
    credits: 4,
    type: 'Core',
    schedule: 'Mon & Thu • 11:30 – 13:00',
    status: 'Completed',
  },
]
