export type TimetableCategory =
  | 'Lecture'
  | 'Lab'
  | 'Exam'
  | 'Assignment'
  | 'Quiz'
  | 'Sports'
  | 'Holiday'
  | 'Event'

export interface TimetableEvent {
  id: string
  title: string
  category: TimetableCategory
  date: string
  startTime?: string
  endTime?: string
  location?: string
  description?: string
}

export const timetableEvents: TimetableEvent[] = [
  {
    id: 'TT-1',
    title: 'Distributed Systems Lecture',
    category: 'Lecture',
    date: '2025-10-27',
    startTime: '10:00',
    endTime: '11:30',
    location: 'Academic Block B - Room 204',
    description: 'Topic: Consensus and CAP Theorem',
  },
  {
    id: 'TT-2',
    title: 'Systems Design Lab',
    category: 'Lab',
    date: '2025-10-27',
    startTime: '13:30',
    endTime: '16:30',
    location: 'Innovation Lab 3',
    description: 'Microservices deployment walkthrough',
  },
  {
    id: 'TT-3',
    title: 'Midterm: Applied Machine Learning',
    category: 'Exam',
    date: '2025-10-29',
    startTime: '09:00',
    endTime: '11:00',
    location: 'Exam Hall C',
  },
  {
    id: 'TT-4',
    title: 'Project Proposal Submission',
    category: 'Assignment',
    date: '2025-10-30',
    description: 'Upload on GradeKart portal before 11:59 PM',
  },
  {
    id: 'TT-5',
    title: 'Research Seminar Quiz',
    category: 'Quiz',
    date: '2025-10-31',
    startTime: '15:00',
    endTime: '15:45',
    location: 'Seminar Hall 2',
  },
  {
    id: 'TT-6',
    title: 'Inter-college Basketball Quarterfinal',
    category: 'Sports',
    date: '2025-11-01',
    startTime: '17:00',
    endTime: '19:00',
    location: 'Main Stadium',
  },
  {
    id: 'TT-7',
    title: 'Founders Day Celebrations',
    category: 'Event',
    date: '2025-11-05',
    startTime: '09:30',
    endTime: '13:00',
    location: 'Auditorium',
    description: 'Chief guest: CEO of TechNext Labs',
  },
  {
    id: 'TT-8',
    title: 'Deepavali Break',
    category: 'Holiday',
    date: '2025-11-09',
    description: 'Campus closed; hostellers require outpass approval',
  },
  {
    id: 'TT-9',
    title: 'Hackathon Briefing',
    category: 'Event',
    date: '2025-10-28',
    startTime: '16:00',
    endTime: '17:00',
    location: 'Tech Hub',
  },
  {
    id: 'TT-10',
    title: 'Maths Lecture',
    category: 'Lecture',
    date: '2025-10-28',
    startTime: '09:00',
    endTime: '10:00',
    location: 'Academic Block C - Room 105',
  },
]
