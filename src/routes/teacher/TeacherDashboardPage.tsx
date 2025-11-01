import {
  BarChart3,
  BellRing,
  CalendarClock,
  ClipboardCheck,
  GraduationCap,
  Home,
  IdCard,
  LifeBuoy,
  Megaphone,
  MessageSquare,
  NotebookPen,
  Search,
  UsersRound,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import {
  DashboardLayout,
  type DashboardNavItem,
} from '@/features/dashboard/DashboardLayout'
import { ClassAdvisoryPage } from '@/routes/teacher/class-advisory/ClassAdvisoryPage'
import { StudentProfilesPage } from '@/routes/teacher/student-profiles/StudentProfilesPage'
import { CommunicationHubPage } from '@/routes/teacher/communications/CommunicationHubPage'
import { StudentLookupPage } from '@/routes/teacher/student-lookup/StudentLookupPage'
import { LeaveDeskPage } from '@/routes/teacher/leave-desk/LeaveDeskPage'
import { AnnouncementsPage } from '@/routes/teacher/announcements/AnnouncementsPage'
import { SupportDeskPage } from '@/routes/teacher/support/SupportDeskPage'
import { TeacherProfilePage } from '@/routes/teacher/profile/TeacherProfilePage'

const facultyNavItems: DashboardNavItem[] = [
  {
    label: 'Home',
    icon: Home,
    path: '/teacher',
    exact: true,
  },
  {
    label: 'Class Advisory',
    icon: UsersRound,
    path: '/teacher/class-advisory',
  },
  {
    label: 'Student Profiles',
    icon: NotebookPen,
    path: '/teacher/student-profiles',
  },
  {
    label: 'Communication Hub',
    icon: BellRing,
    path: '/teacher/communications',
  },
  {
    label: 'Student Lookup',
    icon: Search,
    path: '/teacher/student-lookup',
  },
  {
    label: 'Leave Desk',
    icon: CalendarClock,
    path: '/teacher/leave-desk',
  },
  {
    label: 'Announcements',
    icon: Megaphone,
    path: '/teacher/announcements',
  },
  {
    label: 'Support Desk',
    icon: LifeBuoy,
    path: '/teacher/support',
  },
  {
    label: 'Profile',
    icon: IdCard,
    path: '/teacher/profile',
  },
]

const facultyStats = [
  {
    title: 'Classes Today',
    value: '4',
    subtext: 'Three core, one elective',
    icon: GraduationCap,
    accent: '#1f2937',
  },
  {
    title: 'Assessments Pending',
    value: '18',
    subtext: 'Awaiting evaluation',
    icon: NotebookPen,
    accent: '#2563eb',
  },
  {
    title: 'Counselling Meets',
    value: '2',
    subtext: 'Scheduled this week',
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
    description: 'Bulk upload, mark, and sync lecture attendance.',
    icon: ClipboardCheck,
  },
  {
    title: 'Academic Planner',
    description: 'Outline lesson plans and align with calendar milestones.',
    icon: CalendarClock,
  },
  {
    title: 'Engagement & Feedback',
    description: 'Capture mentoring notes and share quick nudges with learners.',
    icon: MessageSquare,
  },
  {
    title: 'Faculty Spotlight',
    description: 'Highlight achievements and upcoming initiatives.',
    icon: Megaphone,
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
  const quickLinks = [
    { label: 'Record mentor note', action: 'Add note', accent: 'bg-slate-900' },
    { label: 'Log counselling hours', action: 'Update log', accent: 'bg-blue-600' },
    { label: 'Publish quiz reminder', action: 'Draft alert', accent: 'bg-emerald-600' },
  ]

  const advisorySnapshot = {
    className: 'Class XI - MPC',
    strength: 32,
    rep: 'Ananya Gupta',
    meeting: 'Pastoral circle - Thu 3:30 PM',
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Faculty cockpit
              </p>
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Welcome back, Prof. Meera
              </h1>
            </div>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-xs font-semibold text-slate-600">
              Autumn term - Week 7
            </span>
          </header>
          <p className="mt-3 max-w-3xl text-sm text-slate-500">
            Track advisory wellness, assessments, and leave requests from a single view. Quick
            actions help you log updates before the daily briefing.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {quickLinks.map((link) => (
              <div
                key={link.label}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{link.label}</p>
                <button
                  type="button"
                  className={`mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white ${link.accent} transition hover:scale-[1.02]`}
                >
                  {link.action}
                </button>
              </div>
            ))}
          </div>
        </article>
        <article className="grid gap-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Advisory snapshot
            </p>
            <h2 className="mt-3 text-lg font-semibold text-slate-900">{advisorySnapshot.className}</h2>
            <dl className="mt-4 space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <dt>Strength</dt>
                <dd className="font-semibold text-slate-900">{advisorySnapshot.strength} students</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Class representative</dt>
                <dd className="font-semibold text-slate-900">{advisorySnapshot.rep}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Weekly touchpoint</dt>
                <dd className="font-semibold text-slate-900">{advisorySnapshot.meeting}</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-3xl border border-indigo-100 bg-indigo-50/80 p-5 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
              Reminder
            </p>
            <p className="mt-2 text-sm text-indigo-700">
              Upload counselling summaries by Thursday 6:00 PM. GradeKart shares them with the
              academic counsellor automatically.
            </p>
          </div>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {facultyStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.article
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08 }}
              className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div
                className="absolute inset-x-4 top-4 h-24 rounded-3xl opacity-10"
                style={{ background: stat.accent }}
              />
              <div className="relative flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg"
                    style={{ background: stat.accent }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Snapshot
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.subtext}</p>
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

export function TeacherDashboardPage() {
  return (
    <Routes>
      <Route element={<TeacherDashboardLayout />}>
        <Route index element={<TeacherOverview />} />
        <Route path="class-advisory" element={<ClassAdvisoryPage />} />
        <Route path="student-profiles" element={<StudentProfilesPage />} />
        <Route path="communications" element={<CommunicationHubPage />} />
        <Route path="student-lookup" element={<StudentLookupPage />} />
        <Route path="leave-desk" element={<LeaveDeskPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="support" element={<SupportDeskPage />} />
        <Route path="profile" element={<TeacherProfilePage />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Route>
    </Routes>
  )
}
