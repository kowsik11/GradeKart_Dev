import { AlertTriangle, BarChart3, Home, IdCard, Layers, Receipt, ScrollText, Wallet } from 'lucide-react'
import { motion } from 'framer-motion'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import {
  DashboardLayout,
  type DashboardNavItem,
} from '@/features/dashboard/DashboardLayout'
import { CollectionsPage } from '@/routes/accounts/collections/CollectionsPage'
import { FeeRecordsPage } from '@/routes/accounts/fee-records/FeeRecordsPage'
import { PendingDuesPage } from '@/routes/accounts/pending-dues/PendingDuesPage'
import { AdjustmentsPage } from '@/routes/accounts/adjustments/AdjustmentsPage'
import { ReceiptsPage } from '@/routes/accounts/receipts/ReceiptsPage'
import { FinancialReportsPage } from '@/routes/accounts/reports/FinancialReportsPage'
import { AccountsProfilePage } from '@/routes/accounts/profile/AccountsProfilePage'

const accountsNavItems: DashboardNavItem[] = [
  {
    label: 'Home',
    icon: Home,
    path: '/accounts',
    exact: true,
  },
  {
    label: 'Collections',
    icon: Wallet,
    path: '/accounts/collections',
  },
  {
    label: 'Fee Records',
    icon: ScrollText,
    path: '/accounts/fee-records',
  },
  {
    label: 'Pending Dues',
    icon: AlertTriangle,
    path: '/accounts/pending-dues',
  },
  {
    label: 'Adjustments',
    icon: Layers,
    path: '/accounts/adjustments',
  },
  {
    label: 'Receipts',
    icon: Receipt,
    path: '/accounts/receipts',
  },
  {
    label: 'Financial Reports',
    icon: BarChart3,
    path: '/accounts/reports',
  },
  {
    label: 'Profile',
    icon: IdCard,
    path: '/accounts/profile',
  },
]

const financeStats = [
  {
    title: 'Total billed',
    value: '₹1.84 Cr',
    subtext: 'Academic year 2025-26',
    accent: '#1f2937',
  },
  {
    title: 'Collected till date',
    value: '₹1.28 Cr',
    subtext: '69.6% of billed amount',
    accent: '#0f766e',
  },
  {
    title: 'Pending dues',
    value: '₹56.4 L',
    subtext: 'Across 148 students',
    accent: '#f97316',
  },
  {
    title: 'Refunds processed',
    value: '₹4.2 L',
    subtext: '12 cases this term',
    accent: '#2563eb',
  },
]

const accountsModules = [
  {
    title: 'Daily collection log',
    description: 'Capture fee receipts, mode of payment, and teller notes in one place.',
    action: 'Open collections',
    icon: Wallet,
  },
  {
    title: 'Fee ledger',
    description: 'Monitor every student’s invoices, discounts, and due instalments.',
    action: 'Review ledger',
    icon: ScrollText,
  },
  {
    title: 'Due recovery hub',
    description: 'Segment pending dues, send reminders, and log follow-ups seamlessly.',
    action: 'Track dues',
    icon: AlertTriangle,
  },
  {
    title: 'Finance reports',
    description: 'Export statements for management reviews and statutory submission.',
    action: 'Generate reports',
    icon: BarChart3,
  },
]

function AccountsDashboardLayout() {
  return (
    <DashboardLayout
      navItems={accountsNavItems}
      userName="Accounts Desk"
      roleLabel="Finance Team"
      schoolLabel="GradeKart Accounts Suite"
    >
      <Outlet />
    </DashboardLayout>
  )
}

function AccountsOverview() {
  const quickActions = [
    { label: 'Add collection entry', accent: 'bg-slate-900' },
    { label: 'Download fee due list', accent: 'bg-blue-600' },
    { label: 'Send payment reminder', accent: 'bg-emerald-600' },
  ]

  const receiptSummary = [
    { label: 'Today', amount: '₹2.45 L', mode: 'UPI / NetBanking' },
    { label: 'Week to date', amount: '₹14.8 L', mode: 'Mixed modes' },
    { label: 'Month to date', amount: '₹58.1 L', mode: 'Including scholarships' },
  ]

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Accounts control room
              </p>
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Daily finance pulse
              </h1>
            </div>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-xs font-semibold text-slate-600">
              Updated 15 mins ago
            </span>
          </header>
          <p className="mt-3 max-w-3xl text-sm text-slate-500">
            View where the cashflow stands, highlight overdue accounts, and capture actions before
            closing the teller window.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {quickActions.map((action) => (
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
                  Launch
                </button>
              </div>
            ))}
          </div>
        </article>
        <article className="grid gap-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Collection summary
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {receiptSummary.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3"
                >
                  <span className="font-semibold text-slate-900">{item.label}</span>
                  <span className="flex flex-col text-right">
                    <span className="font-semibold text-slate-900">{item.amount}</span>
                    <span className="text-xs text-slate-400">{item.mode}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-indigo-100 bg-indigo-50/80 p-5 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
              Notice
            </p>
            <p className="mt-2 text-sm text-indigo-700">
              Transport fee instalment due on 31 Oct. Auto-reminders will go out 48 hours prior from
              GradeKart messaging.
            </p>
          </div>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {financeStats.map((stat, index) => (
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
        {accountsModules.map((module, index) => {
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
                    {`${module.action} ->`}
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

export function AccountsDashboardPage() {
  return (
    <Routes>
      <Route element={<AccountsDashboardLayout />}>
        <Route index element={<AccountsOverview />} />
        <Route path="collections" element={<CollectionsPage />} />
        <Route path="fee-records" element={<FeeRecordsPage />} />
        <Route path="pending-dues" element={<PendingDuesPage />} />
        <Route path="adjustments" element={<AdjustmentsPage />} />
        <Route path="receipts" element={<ReceiptsPage />} />
        <Route path="reports" element={<FinancialReportsPage />} />
        <Route path="profile" element={<AccountsProfilePage />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Route>
    </Routes>
  )
}
