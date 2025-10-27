import {
  BarChart3,
  CalendarClock,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  GraduationCap,
  Home,
  IdCard,
  LifeBuoy,
  MessageSquare,
  NotebookPen,
  UsersRound,
  Wallet,
  Waypoints,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import {
  DashboardLayout,
  type DashboardNavItem,
} from '@/features/dashboard/DashboardLayout'

const facultyNavItems: DashboardNavItem[] = [
  {
    label: 'Home',
    icon: Home,
    path: '/teacher',
    exact: true,
  },
  {
    label: 'Attendance Tracker',
    icon: ClipboardCheck,
    path: '/teacher/attendance',
  },
  {
    label: 'Course Manager',
    icon: GraduationCap,
    path: '/teacher/courses',
  },
  {
    label: 'Counselling Diary',
    icon: MessageSquare,
    path: '/teacher/counselling-diary',
  },
  {
    label: 'Academic Tools',
    icon: ClipboardList,
    children: [
      { label: 'Assignments', path: '/teacher/academic-tools/assignments' },
      { label: 'Quizzes', path: '/teacher/academic-tools/quizzes' },
      { label: 'Exams', path: '/teacher/academic-tools/exams' },
    ],
  },
  {
    label: 'Evaluation Centre',
    icon: BarChart3,
    children: [
      { label: 'Update Marks', path: '/teacher/evaluation/update-marks' },
      { label: 'Review Results', path: '/teacher/evaluation/review-results' },
    ],
  },
  {
    label: 'Events & Calendar',
    icon: CalendarClock,
    path: '/teacher/events',
  },
  {
    label: 'Student Registry',
    icon: UsersRound,
    path: '/teacher/student-registry',
  },
  {
    label: 'Performance Reviews',
    icon: Wallet,
    path: '/teacher/performance-reviews',
  },
  {
    label: 'Profile',
    icon: NotebookPen,
    path: '/teacher/profile',
  },
  {
    label: 'Support Desk',
    icon: LifeBuoy,
    path: '/teacher/support',
  },
  {
    label: 'Program Planner',
    icon: Waypoints,
    path: '/teacher/program-planner',
  },
  {
    label: 'IDs & Approvals',
    icon: IdCard,
    path: '/teacher/ids-approvals',
  },
]

const facultyStats = [
  {
    title: 'Classes Today',
    value: '4',
    subtext: 'Three undergraduate, one elective',
    icon: GraduationCap,
    accent: '#4c1d95',
  },
  {
    title: 'Assessments Pending',
    value: '18',
    subtext: 'Submissions awaiting evaluation',
    icon: NotebookPen,
    accent: '#8b5cf6',
  },
  {
    title: 'Counselling Meets',
    value: '2',
    subtext: 'Student discussions scheduled',
    icon: UsersRound,
    accent: '#0f766e',
  },
  {
    title: 'Research Hours',
    value: '6.5',
    subtext: 'Logged this week',
    icon: BarChart3,
    accent: '#f97316',
  },
]

const facultyModules = [
  {
    title: 'Attendance Register',
    description: 'Quick mark or bulk upload attendance for each lecture section.',
    icon: ClipboardCheck,
  },
  {
    title: 'Academic Planner',
    description: 'Publish lesson plans and manage weekly course goals.',
    icon: CalendarDays,
  },
  {
    title: 'Engagement & Feedback',
    description: 'Capture counselling notes, mentoring tasks, and reminders.',
    icon: MessageSquare,
  },
  {
    title: 'Scholarly Activities',
    description: 'Track workshops, guest lectures, and conference submissions.',
    icon: CalendarClock,
  },
]

function TeacherDashboardLayout() {
  return (
    <DashboardLayout
      navItems={facultyNavItems}
      userName="Prof. Meera Nair"
      roleLabel="Assistant Professor"
      schoolLabel="School of Engineering"
    >
      <Outlet />
    </DashboardLayout>
  )
}

function TeacherOverview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            GradeKart Faculty Hub
          </p>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Good morning, Prof. Meera
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Monitor class readiness, assessment queues, and mentoring commitments in one view. Stay
            ahead of the teaching week with actionable quick stats.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-600 shadow-sm">
          <span className="font-semibold text-slate-900">Week 7</span> &mdash; Autumn Term 2025
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {facultyStats.map((card, index) => {
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
        {facultyModules.map((module, index) => {
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
                    {'Manage module ->'}
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
          Faculty workspace
        </p>
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
        <p className="max-w-3xl text-sm text-slate-500">
          This module will surface detailed controls for daily academic operations. Navigation is
          ready so the team can implement dataset visuals next.
        </p>
      </header>
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 p-10 text-center text-sm text-slate-500">
        Design in progress &mdash; stay tuned.
      </div>
    </div>
  )
}

export function TeacherDashboardPage() {
  return (
    <Routes>
      <Route element={<TeacherDashboardLayout />}>
        <Route index element={<TeacherOverview />} />
        <Route path="attendance" element={<PlaceholderPage title="Attendance Tracker" />} />
        <Route path="courses" element={<PlaceholderPage title="Course Manager" />} />
        <Route path="counselling-diary" element={<PlaceholderPage title="Counselling Diary" />} />
        <Route path="academic-tools">
          <Route path="assignments" element={<PlaceholderPage title="Assignments" />} />
          <Route path="quizzes" element={<PlaceholderPage title="Quizzes" />} />
          <Route path="exams" element={<PlaceholderPage title="Exams" />} />
          <Route index element={<Navigate to="assignments" replace />} />
        </Route>
        <Route path="evaluation">
          <Route path="update-marks" element={<PlaceholderPage title="Update Marks" />} />
          <Route path="review-results" element={<PlaceholderPage title="Review Results" />} />
          <Route index element={<Navigate to="update-marks" replace />} />
        </Route>
        <Route path="events" element={<PlaceholderPage title="Events & Calendar" />} />
        <Route path="student-registry" element={<PlaceholderPage title="Student Registry" />} />
        <Route path="performance-reviews" element={<PlaceholderPage title="Performance Reviews" />} />
        <Route path="profile" element={<PlaceholderPage title="Profile" />} />
        <Route path="support" element={<PlaceholderPage title="Support Desk" />} />
        <Route path="program-planner" element={<PlaceholderPage title="Program Planner" />} />
        <Route path="ids-approvals" element={<PlaceholderPage title="IDs & Approvals" />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Route>
    </Routes>
  )
}
