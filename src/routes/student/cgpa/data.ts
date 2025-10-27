export interface SemesterRecord {
  term: string
  sgpa: number
  creditsEarned: number
  creditsAttempted: number
  highlights: string
}

export const academicYearOptions = ['2025-26', '2024-25', '2023-24']
export const programTracks = ['B.Tech Computer Science', 'B.Tech AI & DS', 'Integrated M.Tech CSE']

export const semesterProgress: SemesterRecord[] = [
  {
    term: 'Semester 1',
    sgpa: 8.4,
    creditsEarned: 22,
    creditsAttempted: 22,
    highlights: 'Strong fundamentals in mathematics and programming',
  },
  {
    term: 'Semester 2',
    sgpa: 8.7,
    creditsEarned: 21,
    creditsAttempted: 21,
    highlights: 'Excellent performance in data structures; lab distinctions',
  },
  {
    term: 'Semester 3',
    sgpa: 8.9,
    creditsEarned: 20,
    creditsAttempted: 20,
    highlights: 'Top cohort rank in algorithms & operating systems',
  },
  {
    term: 'Semester 4',
    sgpa: 9.1,
    creditsEarned: 20,
    creditsAttempted: 20,
    highlights: 'Research internship credits approved',
  },
]

export const cumulativeCgpa = 8.78
export const degreeCreditsRequired = 160
