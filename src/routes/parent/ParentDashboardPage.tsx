import {
  BellRing,
  ClipboardCheck,
  GraduationCap,
  Home,
  ShieldCheck,
  UserCircle,
  Wallet,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import {
  DashboardLayout,
  type DashboardNavItem,
} from '@/features/dashboard/DashboardLayout'
import { useAuth } from '@/features/auth'
import { feeRecords } from '@/routes/student/fees/data'
import { FeeResultsSection } from '@/routes/student/fees/FeeResultsSection'
import { useParentIdentity } from '@/routes/parent/hooks/useParentIdentity'
import { ParentFeePaymentCheckoutPage } from '@/routes/parent/FeePaymentCheckoutPage'

const parentNavItems: DashboardNavItem[] = [
  { label: 'Home', icon: Home, path: '/parent', exact: true },
  { label: 'Attendance', icon: ClipboardCheck, path: '/parent/attendance' },
  { label: 'Marks & Grades', icon: GraduationCap, path: '/parent/marks' },
  { label: 'Fee Dues', icon: Wallet, path: '/parent/fees' },
  { label: 'Notifications', icon: BellRing, path: '/parent/notifications' },
  { label: 'Profile', icon: UserCircle, path: '/parent/profile' },
]

function ParentDashboardLayout() {
  const { session } = useAuth()
  const { parentName } = useParentIdentity()
  const schoolLabel = session?.school.name ?? 'Connected to GradeKart'

  return (
    <DashboardLayout
      navItems={parentNavItems}
      userName={parentName}
      roleLabel="Parent Portal"
      schoolLabel={schoolLabel}
    >
      <Outlet />
    </DashboardLayout>
  )
}

function ParentOverview() {
  const { parentName, studentRollNo } = useParentIdentity()
  const quickStats = [
    {
      label: 'Attendance this term',
      value: '93.4%',
      tone: '#0f766e',
      description: 'Attendance after excused leaves.',
    },
    {
      label: 'Current CGPA',
      value: '8.4 / 10',
      tone: '#2563eb',
      description: 'Includes latest mid-term results.',
    },
    {
      label: 'Outstanding fees',
      value: 'INR 38,000',
      tone: '#f97316',
      description: 'Tuition (Q2) and transport (Q2).',
    },
    {
      label: 'Upcoming events',
      value: '3',
      tone: '#1f2937',
      description: 'PTM, sports meet, and counselling slot.',
    },
  ]

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Parent summary
            </p>
            <h1 className="text-3xl font-bold text-slate-900">Welcome back, {parentName}.</h1>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5" />
            Linked student - {studentRollNo}
          </span>
        </header>
        <p className="mt-2 max-w-3xl text-sm text-slate-500">
          Track your child's attendance, academic progress, and payments at a glance. Tap the cards
          below to jump to detailed reports.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {quickStats.map((stat, index) => (
          <motion.article
            key={stat.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.08 }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div
              className="absolute inset-x-4 top-4 h-24 rounded-3xl opacity-10"
              style={{ background: stat.tone }}
            />
            <div className="relative space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                {stat.label}
              </p>
              <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.description}</p>
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  )
}

function ParentAttendancePage() {
  const attendance = [
    { month: 'June 2025', present: 24, total: 26 },
    { month: 'July 2025', present: 22, total: 24 },
    { month: 'August 2025', present: 23, total: 24 },
  ]

  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Attendance overview
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Term attendance</h1>
        <p className="text-sm text-slate-500">
          Monthly breakdown of presence and total working days.
        </p>
      </header>
      <div className="grid gap-3 md:grid-cols-3">
        {attendance.map((item) => (
          <article key={item.month} className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              {item.month}
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {item.present} / {item.total} days
            </p>
            <p className="text-xs text-slate-500">
              Attendance rate {(item.present / item.total * 100).toFixed(1)}%
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ParentMarksPage() {
  const marks = [
    { subject: 'Mathematics', latestAssessment: 'Unit Test 2', grade: 'A', score: '45 / 50' },
    { subject: 'Physics', latestAssessment: 'Unit Test 2', grade: 'B+', score: '38 / 50' },
    { subject: 'Chemistry', latestAssessment: 'Lab Viva', grade: 'A-', score: '22 / 25' },
  ]

  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Academic pulse
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Recent performance</h1>
        <p className="text-sm text-slate-500">
          Subject-wise highlights from the most recent assessments.
        </p>
      </header>
      <div className="grid gap-3 md:grid-cols-3">
        {marks.map((item) => (
          <article key={item.subject} className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              {item.subject}
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{item.latestAssessment}</p>
            <p className="text-xs text-slate-500">Grade {item.grade}</p>
            <p className="text-xs text-slate-500">Score {item.score}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ParentFeesPage() {
  const { studentRollNo, studentName } = useParentIdentity()
  const duesRecords = feeRecords.filter((record) => record.status !== 'Paid')

  return (
    <FeeResultsSection
      title="Pending statements"
      subtitle="Outstanding invoices linked to your child."
      records={duesRecords}
      emptyMessage="All dues cleared. Thank you for staying up to date!"
      studentRollNo={studentRollNo}
      studentName={studentName}
      paymentRedirectPath="/parent/fees/pay"
    />
  )
}

function ParentNotificationsPage() {
  const updates = [
    {
      title: 'PTM slot confirmation',
      copy: 'Parent-Teacher Meeting scheduled on 05 Nov at 4:00 PM.',
      timestamp: 'Shared 2 hours ago',
    },
    {
      title: 'Tuition fee reminder',
      copy: 'Quarter 2 tuition balance is due on 15 Sep. Pay online or at the accounts desk.',
      timestamp: 'Sent yesterday',
    },
    {
      title: 'Counselling session feedback',
      copy: 'Mentor has shared the counselling summary for last week.',
      timestamp: 'Sent 3 days ago',
    },
  ]

  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Notifications
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Latest updates</h1>
        <p className="text-sm text-slate-500">
          Stay informed about reminders and notes sent by the school.
        </p>
      </header>
      <div className="space-y-3">
        {updates.map((item) => (
          <article key={item.title} className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{item.copy}</p>
            <p className="mt-2 text-xs text-slate-400">{item.timestamp}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ParentProfilePage() {
  const {
    parentName,
    parentEmail,
    parentPhone,
    studentRollNo,
    studentName,
  } = useParentIdentity()

  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Account
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Profile & contacts</h1>
        <p className="text-sm text-slate-500">
          Update your contact information so faculty can reach you quickly.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        <ProfileCard label="Parent / Guardian" value={parentName} />
        <ProfileCard label="Email" value={parentEmail} />
        <ProfileCard label="Phone" value={parentPhone} />
        <ProfileCard
          label="Linked student"
          value={studentRollNo + ' - ' + studentName}
        />
      </div>
      <p className="text-xs text-slate-400">
        For changes to registered contact details, please reach out to your class advisor or the school office.
      </p>
    </section>
  )
}

function ProfileCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-slate-50/80 px-4 py-3 shadow-inner">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </article>
  )
}

export function ParentDashboardPage() {
  return (
    <Routes>
      <Route element={<ParentDashboardLayout />}>
        <Route index element={<ParentOverview />} />
        <Route path="attendance" element={<ParentAttendancePage />} />
        <Route path="marks" element={<ParentMarksPage />} />
        <Route path="fees" element={<ParentFeesPage />} />
        <Route path="fees/pay" element={<ParentFeePaymentCheckoutPage />} />
        <Route path="notifications" element={<ParentNotificationsPage />} />
        <Route path="profile" element={<ParentProfilePage />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Route>
    </Routes>
  )
}
