import {
  BedDouble,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  GraduationCap,
  Home,
  LifeBuoy,
  LibraryBig,
  MessageSquare,
  NotebookPen,
  PenTool,
  ScrollText,
  Wallet,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import {
  DashboardLayout,
  type DashboardNavItem,
} from '@/features/dashboard/DashboardLayout'
import { AttendanceRegisterPage } from '@/routes/student/attendance/AttendanceRegisterPage'
import { ViewGradesPage } from '@/routes/student/exam/ViewGradesPage'
import { ViewMarksPage } from '@/routes/student/exam/ViewMarksPage'
import { ViewResultsPage } from '@/routes/student/exam/ViewResultsPage'
import { HostelManagementPage } from '@/routes/student/hostel/HostelManagementPage'
import { LibraryBorrowingsPage } from '@/routes/student/library/BorrowingsPage'
import { LibraryDuesHistoryPage } from '@/routes/student/library/DuesHistoryPage'
import { CoursesPage } from '@/routes/student/courses/CoursesPage'
import { CgpaPage } from '@/routes/student/cgpa/CgpaPage'
import {
  ViewAllFeesPage,
  ViewCollegeFeePage,
  ViewDuesPage,
  ViewFeeDetailsPage,
  ViewHostelFeePage,
  ViewSportsFeesPage,
  ViewTransportationFeePage,
  ViewTuitionFeePage,
} from '@/routes/student/fees/FeePages'
import { StudentProfilePage } from '@/routes/student/profile/ProfilePage'
import { ProgramExitSurveyPage } from '@/routes/student/program-exit/ProgramExitSurveyPage'
import { TimetablePage } from '@/routes/student/timetables/TimetablePage'
import { StudentFeePaymentCheckoutPage } from '@/routes/student/fees/FeePaymentCheckoutPage'

const studentNavItems: DashboardNavItem[] = [
  {
    label: 'Home',
    icon: Home,
    path: '/student',
    exact: true,
  },
  {
    label: 'Attendance Register',
    icon: ClipboardCheck,
    path: '/student/attendance',
  },
  {
    label: 'Courses',
    icon: BookOpen,
    path: '/student/courses',
  },
  {
    label: 'Counselling Diary',
    icon: MessageSquare,
    path: '/student/counselling-diary',
  },
  {
    label: 'Exam Section',
    icon: ScrollText,
    children: [
      { label: 'View Grades', path: '/student/exam/grades' },
      { label: 'View Marks', path: '/student/exam/marks' },
      { label: 'View Results', path: '/student/exam/results' },
    ],
  },
  {
    label: 'Fee Payments',
    icon: Wallet,
    children: [
      { label: 'View Fee Details', path: '/student/fees/details' },
      { label: 'View Sports Fees', path: '/student/fees/sports' },
      { label: 'View Tuition Fee', path: '/student/fees/tuition' },
      { label: 'View Hostel Fee', path: '/student/fees/hostel' },
      { label: 'View College Fee', path: '/student/fees/college' },
      { label: 'View Transportation', path: '/student/fees/transportation' },
      { label: 'View Dues', path: '/student/fees/dues' },
      { label: 'View All', path: '/student/fees/all' },
    ],
  },
  {
    label: 'Hostel Management',
    icon: BedDouble,
    path: '/student/hostel',
  },
  {
    label: 'Library',
    icon: LibraryBig,
    children: [
      { label: 'My Borrowings', path: '/student/library/borrowings' },
      { label: 'My Dues History', path: '/student/library/dues-history' },
    ],
  },
  {
    label: 'My CGPA',
    icon: GraduationCap,
    path: '/student/cgpa',
  },
  {
    label: 'Program Exit Survey',
    icon: ClipboardList,
    path: '/student/program-exit-survey',
  },
  {
    label: 'Profile',
    icon: NotebookPen,
    path: '/student/profile',
  },
  {
    label: 'Ticketing Support',
    icon: LifeBuoy,
    path: '/student/support',
  },
  {
    label: 'Time Tables',
    icon: CalendarDays,
    path: '/student/timetables',
  },
]

const studentStats = [
  {
    title: 'Attendance',
    value: '92%',
    subtext: 'Current semester average',
    icon: ClipboardCheck,
    accent: '#2563eb',
  },
  {
    title: 'Registered Credits',
    value: '20 / 24',
    subtext: 'Credits completed',
    icon: GraduationCap,
    accent: '#0ea5e9',
  },
  {
    title: 'Fee Status',
    value: 'INR 12,400',
    subtext: 'Due by 20 Nov 2025',
    icon: Wallet,
    accent: '#f59e0b',
  },
  {
    title: 'Upcoming Evaluations',
    value: '3',
    subtext: 'Assessments this week',
    icon: PenTool,
    accent: '#22c55e',
  },
]

const academicModules = [
  {
    title: 'Attendance Register',
    description: 'View subject wise attendance breakdown and submit excuses.',
    icon: ClipboardList,
  },
  {
    title: 'Learning Planner',
    description: 'Track coursework, assignments, and submission deadlines.',
    icon: CalendarDays,
  },
  {
    title: 'Assessment Hub',
    description: 'Access quizzes, midterms, and digital evaluation copies.',
    icon: PenTool,
  },
  {
    title: 'Capstone Projects',
    description: 'Collaborate with mentors on project milestones.',
    icon: GraduationCap,
  },
]

function StudentDashboardLayout() {
  return (
    <DashboardLayout
      navItems={studentNavItems}
      userName="Krishna Sharma"
      roleLabel="Undergraduate Student"
      schoolLabel="School of Engineering"
    >
      <Outlet />
    </DashboardLayout>
  )
}

function StudentOverview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            GradeKart Student Hub
          </p>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Welcome back, Krishna
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Your personalised campus cockpit summarises everything that matters this week:
            attendance health, credit load, finances, and upcoming evaluations.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-600 shadow-sm">
          <span className="font-semibold text-slate-900">Academic Year 2025-26</span>{' '}
          &mdash; Semester 5
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {studentStats.map((card, index) => {
          const Icon = card.icon
          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="absolute inset-x-4 top-4 h-24 rounded-3xl opacity-10"
                style={{ background: card.accent }}
              />
              <div className="relative flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg"
                    style={{ background: card.accent }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Snapshot
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
                    {card.title}
                  </p>
                  <p className="text-2xl font-semibold text-slate-900">{card.value}</p>
                  <p className="text-sm text-slate-500">{card.subtext}</p>
                </div>
              </div>
            </motion.article>
          )
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {academicModules.map((module, index) => {
          const Icon = module.icon
          return (
            <motion.article
              key={module.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-slate-100 opacity-0 transition group-hover:opacity-100" />
              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900">{module.title}</h3>
                  <p className="text-sm text-slate-500">{module.description}</p>
                  <button
                    type="button"
                    className="text-sm font-semibold text-slate-900 transition hover:text-indigo-600"
                  >
                    {'Open module ->'}
                  </button>
                </div>
              </div>
            </motion.article>
          )
        })}
      </section>
    </div>
  )
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Module workspace
        </p>
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
        <p className="max-w-3xl text-sm text-slate-500">
          Detailed UI for this section is coming together. The navigation is now wired so the
          product team can focus module by module.
        </p>
      </header>
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 p-10 text-center text-sm text-slate-500">
        Design in progress &mdash; stay tuned.
      </div>
    </div>
  )
}

export function StudentDashboardPage() {
  return (
    <Routes>
      <Route element={<StudentDashboardLayout />}>
        <Route index element={<StudentOverview />} />
        <Route path="attendance" element={<AttendanceRegisterPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="counselling-diary" element={<PlaceholderPage title="Counselling Diary" />} />
        <Route path="exam">
          <Route path="grades" element={<ViewGradesPage />} />
          <Route path="marks" element={<ViewMarksPage />} />
          <Route path="results" element={<ViewResultsPage />} />
          <Route index element={<Navigate to="grades" replace />} />
        </Route>
        <Route path="fees">
          <Route path="details" element={<ViewFeeDetailsPage />} />
          <Route path="sports" element={<ViewSportsFeesPage />} />
          <Route path="tuition" element={<ViewTuitionFeePage />} />
          <Route path="hostel" element={<ViewHostelFeePage />} />
          <Route path="college" element={<ViewCollegeFeePage />} />
          <Route path="transportation" element={<ViewTransportationFeePage />} />
          <Route path="dues" element={<ViewDuesPage />} />
          <Route path="all" element={<ViewAllFeesPage />} />
          <Route path="pay" element={<StudentFeePaymentCheckoutPage />} />
          <Route index element={<Navigate to="details" replace />} />
        </Route>
        <Route path="hostel" element={<HostelManagementPage />} />
        <Route path="library">
          <Route path="borrowings" element={<LibraryBorrowingsPage />} />
          <Route path="dues-history" element={<LibraryDuesHistoryPage />} />
          <Route index element={<Navigate to="borrowings" replace />} />
        </Route>
        <Route path="cgpa" element={<CgpaPage />} />
        <Route path="program-exit-survey" element={<ProgramExitSurveyPage />} />
        <Route path="profile" element={<StudentProfilePage />} />
        <Route path="support" element={<PlaceholderPage title="Ticketing Support" />} />
        <Route path="timetables" element={<TimetablePage />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Route>
    </Routes>
  )
}
