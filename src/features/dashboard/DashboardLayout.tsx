import { Fragment, type ReactNode, useEffect, useMemo, useState } from 'react'
import {
  Bell,
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu,
  Palette,
  User2,
  X,
  type LucideIcon,
} from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import logoImage from '@photos/logo.png'

export interface DashboardNavItem {
  label: string
  icon: LucideIcon
  path?: string
  children?: Array<{
    label: string
    path: string
  }>
  exact?: boolean
}

interface DashboardLayoutProps {
  navItems: DashboardNavItem[]
  children: ReactNode
  userName: string
  roleLabel: string
  schoolLabel?: string
  onSignOut?: () => void
  logoSrc?: string
}

const motionVariants = {
  sidebar: {
    hidden: { x: -280, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -280, opacity: 0 },
  },
  dropdown: {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1 },
    exit: { height: 0, opacity: 0 },
  },
}

export function DashboardLayout({
  navItems,
  children,
  userName,
  roleLabel,
  schoolLabel = 'Connected Campus Network',
  onSignOut,
  logoSrc,
}: DashboardLayoutProps) {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false
    }
    return window.innerWidth >= 768
  })
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const activeParents = useMemo(() => {
    return navItems
      .filter((item) => item.children?.some((child) => location.pathname.startsWith(child.path)))
      .map((item) => item.label)
  }, [location.pathname, navItems])

  useEffect(() => {
    setSidebarOpen(false)
    setProfileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const query = window.matchMedia('(min-width: 768px)')
    const handleChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches)
    }

    setIsDesktop(query.matches)
    query.addEventListener('change', handleChange)

    return () => {
      query.removeEventListener('change', handleChange)
    }
  }, [])

  const toggleSection = (label: string) => {
    setExpandedSections((prev) => {
      const next: Record<string, boolean> = {}
      navItems.forEach((item) => {
        if (!item.children?.length) {
          return
        }
        if (item.label === label) {
          next[item.label] = !prev[item.label]
        } else {
          next[item.label] = false
        }
      })
      return next
    })
  }

  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut()
    }
  }

  const navContent = (
    <div className="flex h-full flex-col border-r border-slate-200/70 bg-white/90 px-4 pb-6 pt-8 shadow-xl backdrop-blur">
      <button
        type="button"
        onClick={() => setSidebarOpen(false)}
        className="absolute right-3 top-3 rounded-full border border-slate-200/60 bg-white p-1.5 text-slate-600 shadow-sm transition hover:bg-slate-100 md:hidden"
        aria-label="Close navigation"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="flex items-center gap-3 px-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-lg font-semibold text-white shadow-lg">
          GK
        </div>
        <div className="space-y-0.5">
          <p className="text-base font-semibold text-slate-900">GradeKart</p>
          <p className="text-xs text-slate-500">{schoolLabel}</p>
        </div>
      </div>
      <nav className="mt-10 flex-1 space-y-2 overflow-y-auto pr-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const hasChildren = Boolean(item.children?.length)
          const isParentActive = activeParents.includes(item.label)
          const manualState = expandedSections[item.label]
          const isExpanded = manualState ?? isParentActive

          if (!hasChildren && item.path) {
            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
                    isActive
                      ? 'bg-slate-900 text-white shadow-lg'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-xl border text-slate-500 transition',
                        isActive
                          ? 'border-slate-900 bg-slate-900 text-white shadow-none'
                          : 'border-slate-200 bg-white shadow-sm group-hover:border-slate-300 group-hover:text-slate-900'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            )
          }

          return (
            <Fragment key={item.label}>
              <button
                type="button"
                onClick={() => toggleSection(item.label)}
                className={cn(
                  'flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition',
                  isExpanded
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-xl border transition',
                      isExpanded
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-500 shadow-sm'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  {item.label}
                </span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition',
                    isExpanded ? 'rotate-180' : ''
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {isExpanded && item.children && (
                  <motion.div
                    key={`${item.label}-children`}
                    variants={motionVariants.dropdown}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.18 }}
                    className="ml-5 mt-1 space-y-1 border-l border-slate-200 pl-4"
                  >
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) =>
                          cn(
                            'group flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition',
                            isActive
                              ? 'bg-slate-900 text-white shadow'
                              : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <ChevronRight
                              className={cn(
                                'h-3 w-3 transition',
                                isActive ? 'text-white' : 'text-slate-300 group-hover:text-slate-500'
                              )}
                            />
                            <span>{child.label}</span>
                          </>
                        )}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </Fragment>
          )
        })}
      </nav>
    </div>
  )

  const showSidebar = sidebarOpen || isDesktop

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AnimatePresence initial={false}>
        {sidebarOpen && !isDesktop && (
          <motion.div
            key="sidebar-overlay"
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {showSidebar && (
          <motion.aside
            key="dashboard-sidebar"
            className={cn(
              'fixed inset-y-0 left-0 z-50 w-72 md:static md:translate-x-0',
              sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            )}
            variants={motionVariants.sidebar}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            {navContent}
          </motion.aside>
        )}
      </AnimatePresence>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen((prev) => !prev)}
                className="rounded-full border border-slate-200/80 bg-white p-2 text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 md:hidden"
                aria-label="Toggle navigation"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="hidden items-center gap-3 md:flex">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
                  <img
                    src={logoSrc ?? logoImage}
                    alt="GradeKart logo"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">GradeKart</p>
                  <p className="text-xs text-slate-500">{schoolLabel}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 md:flex">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <Palette className="h-4 w-4 text-slate-400" />
              </div>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
              </button>
              <div className="relative">
                <div className="flex items-center gap-2">
                  <NavLink
                    to="profile"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-1.5 text-left shadow-sm transition hover:border-slate-300 sm:pr-3"
                  >
                    <div className="hidden text-right sm:block">
                      <p className="text-xs font-medium text-slate-500">Welcome back</p>
                      <p className="text-sm font-semibold text-slate-900">{userName}</p>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
                      <User2 className="h-5 w-5" />
                    </span>
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => setProfileMenuOpen((prev) => !prev)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
                    aria-label="Open profile menu"
                  >
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition',
                        profileMenuOpen ? 'rotate-180' : ''
                      )}
                    />
                  </button>
                </div>
                <AnimatePresence initial={false}>
                  {profileMenuOpen && (
                    <motion.div
                      key="profile-menu"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-48 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl"
                    >
                      <div className="rounded-xl bg-slate-50 px-3 py-2">
                        <p className="text-sm font-semibold text-slate-900">{userName}</p>
                        <p className="text-xs text-slate-500">{roleLabel}</p>
                      </div>
                      <NavLink
                        to="profile"
                        onClick={() => setProfileMenuOpen(false)}
                        className="mt-2 flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                      >
                        <User2 className="h-4 w-4" />
                        View profile
                      </NavLink>
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
