import {
  CalendarClock,
  GraduationCap,
  Home,
  IdCard,
  Megaphone,
  Search,
  ShieldAlert,
  Users,
  UserCircle2,
  Wallet,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import {
  DashboardLayout,
  type DashboardNavItem,
} from '@/features/dashboard/DashboardLayout'
import { StaffDirectoryPage } from '@/routes/head/staff-directory/StaffDirectoryPage'
import { ClassExplorerPage } from '@/routes/head/class-explorer/ClassExplorerPage'
import { StudentInsightsPage } from '@/routes/head/student-insights/StudentInsightsPage'
import { StaffLookupPage } from '@/routes/head/staff-lookup/StaffLookupPage'
import { FacultyLeavePage } from '@/routes/head/leave/FacultyLeavePage'
import { DisciplinaryReportsPage } from '@/routes/head/discipline/DisciplinaryReportsPage'
import { HeadAnnouncementsPage } from '@/routes/head/announcements/HeadAnnouncementsPage'
import { HeadFinancePage } from '@/routes/head/finance/HeadFinancePage'
import { HeadProfilePage } from '@/routes/head/profile/HeadProfilePage'

const headNavItems: DashboardNavItem[] = [
  { label: 'Home', icon: Home, path: '/head', exact: true },
  { label: 'Staff Directory', icon: Users, path: '/head/staff-directory' },
  { label: 'Class Explorer', icon: GraduationCap, path: '/head/class-explorer' },
  { label: 'Student Insights', icon: Search, path: '/head/student-insights' },
  { label: 'Staff Lookup', icon: IdCard, path: '/head/staff-lookup' },
  { label: 'Faculty Leave', icon: CalendarClock, path: '/head/faculty-leave' },
  { label: 'Disciplinary Desk', icon: ShieldAlert, path: '/head/discipline' },
  { label: 'Announcements', icon: Megaphone, path: '/head/announcements' },
  { label: 'Finance Overview', icon: Wallet, path: '/head/finance' },
  { label: 'Profile', icon: UserCircle2, path: '/head/profile' },
]

const leadershipStats = [
  {
    title: 'Total faculty',
    value: '118',
    subtext: 'Across science, commerce, arts, and admin',
    accent: '#1f2937',
  },
  {
    title: 'Students enrolled',
    value: '1,862',
    subtext: 'Across grades 6 – 12',
    accent: '#2563eb',
  },
  {
    title: 'Attendance today',
    value: '93.4%',
    subtext: 'Absentee spike in Grade 9 monitored',
    accent: '#0f766e',
  },
  {
    title: 'Pending dues',
    value: '₹56.4 L',
    subtext: '148 learners follow-up in progress',
    accent: '#f97316',
  },
]

const headModules = [
  {
    title: 'Academic command center',
    description: 'View class-by-class performance and faculty load instantly.',
  },
  {
    title: 'Staff wellbeing',
    description: 'Leave requests, counselling notes, and mentoring assignments in one list.',
  },
  {
    title: 'Community pulse',
    description: 'Monitor discipline reports, parent escalations, and resolutions.',
  },
  {
    title: 'Finance snapshot',
    description: 'Track fee collection trends, scholarships, and expenses.',
  },
]

function HeadDashboardLayout() {
  return (
    <DashboardLayout
      navItems={headNavItems}
      userName="School Head"
      roleLabel="Chief Administrator"
      schoolLabel="GradeKart Leadership Suite"
    >
      <Outlet />
    </DashboardLayout>
  )
}

function HeadOverview() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Leadership cockpit
              </p>
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Welcome back, Chief
              </h1>
            </div>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-xs font-semibold text-slate-600">
              Morning briefing • 08:30 AM
            </span>
          </header>
          <p className="mt-3 max-w-3xl text-sm text-slate-500">
            Monitor academics, staffing, culture, and finance in one glance. Assign follow-ups before
            the campus day begins.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Review staff availability', accent: 'bg-slate-900' },
              { label: 'Check discipline alerts', accent: 'bg-rose-500' },
              { label: 'Approve leave requests', accent: 'bg-indigo-600' },
            ].map((action) => (
              <div
                key={action.label}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  {action.label}
                </p>
                <button
                  type="button"
                  className={`mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white ${action.accent} transition hover:scale-[1.02]`}
                >
                  Open
                </button>
              </div>
            ))}
          </div>
        </article>
        <article className="grid gap-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Today’s priorities
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="rounded-2xl border border-slate-100 px-4 py-3">
                Meet Grade 12 faculty for board exam readiness.
              </li>
              <li className="rounded-2xl border border-slate-100 px-4 py-3">
                Review transport fee dues and recovery status.
              </li>
              <li className="rounded-2xl border border-slate-100 px-4 py-3">
                Issue circular for inter-school sports conclave.
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-amber-100 bg-amber-50/80 p-5 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
              Attention
            </p>
            <p className="mt-2 text-sm text-amber-700">
              Two discipline cases from Grade 9 await your review. Counselling notes and CCTV footage
              links are ready in the disciplinary desk.
            </p>
          </div>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {leadershipStats.map((stat, index) => (
          <motion.article
            key={stat.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.08 }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div
              className="absolute inset-x-4 top-4 h-24 rounded-3xl opacity-10"
              style={{ background: stat.accent }}
            />
            <div className="relative space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                {stat.title}
              </p>
              <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.subtext}</p>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {headModules.map((module, index) => (
          <motion.article
            key={module.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.08 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-slate-100 opacity-0 transition group-hover:opacity-100" />
            <div className="relative space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">{module.title}</h3>
              <p className="text-sm text-slate-500">{module.description}</p>
              <button
                type="button"
                className="text-sm font-semibold text-slate-900 transition hover:text-indigo-600"
              >
                {'Open dashboard ->'}
              </button>
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  )
}

export function HeadDashboardPage() {
  return (
    <Routes>
      <Route element={<HeadDashboardLayout />}>
        <Route index element={<HeadOverview />} />
        <Route path="staff-directory" element={<StaffDirectoryPage />} />
        <Route path="class-explorer" element={<ClassExplorerPage />} />
        <Route path="student-insights" element={<StudentInsightsPage />} />
        <Route path="staff-lookup" element={<StaffLookupPage />} />
        <Route path="faculty-leave" element={<FacultyLeavePage />} />
        <Route path="discipline" element={<DisciplinaryReportsPage />} />
        <Route path="announcements" element={<HeadAnnouncementsPage />} />
        <Route path="finance" element={<HeadFinancePage />} />
        <Route path="profile" element={<HeadProfilePage />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Route>
    </Routes>
  )
}
