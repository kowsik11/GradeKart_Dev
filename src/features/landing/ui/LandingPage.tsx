import { useCallback, useEffect, useMemo, useState } from 'react'
import {  } from 'lucide-react'
import { Alert, Button, Card, Loader } from '@/components/ui'
import type { AuthRole } from '@/features/auth'
import { useSchool, useSchools } from '@/features/schools'
import styles from './LandingPage.module.css'
import campus1 from '@photos/1.jpg'
import campus2 from '@photos/2.jpg'
import campus3 from '@photos/3.jpg'
import campus4 from '@photos/4.jpg'
import campus5 from '@photos/5.jpg'
import logo from '@photos/logo.png'

const staticCampuses = [
  {
    id: 'fallback-amritapuri',
    schoolId: 'gradekart-amritapuri',
    name: 'Amritapuri Campus',
    campusName: 'Main Campus',
    photoUrl: campus3,
    logoUrl: undefined,
  },
  {
    id: 'fallback-bengaluru',
    schoolId: 'gradekart-bengaluru',
    name: 'Bengaluru Campus',
    campusName: 'City Hub',
    photoUrl: campus4,
    logoUrl: undefined,
  },
  {
    id: 'fallback-coimbatore',
    schoolId: 'gradekart-coimbatore',
    name: 'Coimbatore Campus',
    campusName: 'Innovation Park',
    photoUrl: campus5,
    logoUrl: undefined,
  },
]

const fallbackPhotos = [campus3, campus4, campus5]

const navigationLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#campuses', label: 'Campuses' },
  { href: '#features', label: 'Modules' },
  { href: '#updates', label: 'Updates' },
  { href: '#contact', label: 'Contact' },
]

const featureHighlights = [
  {
    title: 'Attendance & Academics',
    description:
      'Real-time attendance tracking, timetable visibility, and subject-wise marks with GPA analytics.',
  },
  {
    title: 'Finance & Operations',
    description:
      'Fees, transport, hostel, and activities managed in a single pane with transparent status indicators.',
  },
  {
    title: 'Events & Communication',
    description:
      'Smart calendar with reminders, campus announcements, counselling logs, and parent notifications.',
  },
]

const impactStats = [
  { value: '18+', label: 'Campuses already on GradeKart' },
  { value: '62K', label: 'Students experienced seamless ops' },
  { value: '5x', label: 'Faster insights for school leaders' },
]

const differentiators = [
  {
    title: 'Unified command center',
    description:
      'GradeKart mirrors your institution hierarchy so every stakeholder sees their universe without juggling spreadsheets.',
  },
  {
    title: 'Airtable-native, future ready',
    description:
      'We leverage Airtable securely for lightning-fast deployment while charting a roadmap for deeper analytics and integrations.',
  },
  {
    title: 'Delightful experiences',
    description:
      'Students, faculty, and administrators get purposeful dashboards that surface the next best action instantly.',
  },
  {
    title: 'White-glove onboarding',
    description:
      'Our team co-pilots your rollout—from data mapping to training—so you launch portals in days, not months.',
  },
]

const heroHighlights = [
  'Student & faculty portals with instant login',
  'Attendance, academics, fees, events, hostels',
  'Built for multi-campus groups and growing schools',
]

const latestUpdates = [
  {
    date: 'Apr 18',
    title: 'Summer Examinations Schedule Published',
    copy: 'Unit test and mid-term examination timetables are now live for all GradeKart partner schools.',
  },
  {
    date: 'Apr 22',
    title: 'New Hostel Allocation Dashboard',
    copy: 'Resident wards can now review hostel room, bed, and tenure details straight from the student portal.',
  },
  {
    date: 'Apr 24',
    title: 'Faculty Upskilling Workshops',
    copy: 'Teacher dashboards now include workshop assignments and reflective logs for academic deans.',
  },
]


interface LandingPageProps {
  onSignIn: (role: AuthRole) => void
  onSignUp: (role: AuthRole) => void
}

export function LandingPage({ onSignIn, onSignUp }: LandingPageProps) {
  const { schools, isLoading, error, refetch } = useSchools()
  const { selectedSchool, selectSchool } = useSchool()
  const [helperMessage, setHelperMessage] = useState<string | null>(null)

  useEffect(() => {
    if (selectedSchool) {
      const campusSuffix = selectedSchool.campusName
        ? ` - ${selectedSchool.campusName}`
        : ''
      setHelperMessage(`Selected campus: ${selectedSchool.name}${campusSuffix}.`)
    } else {
      setHelperMessage('Select a campus below to access GradeKart portals.')
    }
  }, [selectedSchool])

  const handleSchoolSelection = useCallback(
    (schoolId: string, fallbackPhoto: string) => {
      const source =
        schools.length > 0 ? schools : staticCampuses
      const school = source.find((entry) => entry.id === schoolId)
      if (!school) return

      selectSchool({
        id: school.id,
        schoolCode: school.schoolId,
        name: school.name,
        campusName: school.campusName,
        logoUrl: school.logoUrl,
        photoUrl: school.photoUrl ?? fallbackPhoto,
      })
      onSignIn('student')
    },
    [onSignIn, schools, selectSchool],
  )

  const handlePortalAction = useCallback(
    (role: AuthRole, action: 'signin' | 'signup') => {
      if (!selectedSchool) {
        setHelperMessage('Please select a campus first.')
        return
      }

      if (action === 'signin') {
        onSignIn(role)
        return
      }

      onSignUp(role)
    },
    [onSignIn, onSignUp, selectedSchool],
  )

  const campusDeck = useMemo(() => {
    if (schools.length > 0) {
      const imagePool = [campus3, campus4, campus5]
      return schools.slice(0, 3).map((school, index) => ({
        ...school,
        photoUrl: imagePool[index] ?? campus3,
      }))
    }
    return staticCampuses
  }, [schools])

  const cards = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className={styles.schoolCardSkeleton}>
          <Loader />
        </div>
      ))
    }

    const items = campusDeck.map((school, index) => {
      const isSelected = selectedSchool?.id === school.id
      const fallbackPhoto = fallbackPhotos[index % fallbackPhotos.length]
      const backgroundImage = school.photoUrl || fallbackPhoto

      return (
        <button
          key={school.id}
          type="button"
          className={`${styles.schoolCard} ${isSelected ? styles.schoolCardSelected : ''}`}
          onClick={() => handleSchoolSelection(school.id, fallbackPhoto)}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className={styles.schoolOverlay}>
            <span className={styles.schoolBadge}>
              {school.campusName ?? 'Campus'}
            </span>
            <h3 className={styles.schoolName}>{school.name}</h3>
            <span className={styles.schoolAction}>
              {isSelected ? 'Open portal' : 'Tap to open portal'}
            </span>
          </div>
        </button>
      )
    })

    return items
  }, [campusDeck, handleSchoolSelection, isLoading, selectedSchool])

  return (
    <div className={styles.page}>
      <header className={styles.hero} id="home">
        <nav className={styles.navbar}>
          <div className={styles.brand}>
            <img src={logo} alt="GradeKart logo" className={styles.brandLogo} />
            <span className={styles.brandText}>GradeKart</span>
          </div>
          <div className={styles.navLinks}>
            {navigationLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <div className={styles.navActions}>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => document.querySelector('#campuses')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Campuses
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handlePortalAction('student', 'signin')}
            >
              Launch Portal
            </Button>
          </div>
        </nav>
        <div className={styles.heroBody}>
          <div className={styles.heroCopy}>
            <span className={styles.heroTagline}>Unified academic management</span>
            <h1>
              A digital headquarters for
              <br />
              ambitious schools & colleges.
            </h1>
            <p className={styles.heroDescription}>
              GradeKart streamlines attendance, academics, fees, hostels, events, counselling, and communication.
              One login, purpose-built dashboards, zero chaos.
            </p>
            <ul className={styles.heroHighlights}>
              {heroHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className={styles.heroActions}>
              <Button onClick={() => handlePortalAction('student', 'signin')}>
                Open Student Portal
              </Button>
              <Button
                variant="secondary"
                onClick={() => handlePortalAction('parent', 'signin')}
              >
                Parent Portal
              </Button>
            </div>
            {helperMessage ? (
              <p className={styles.helperText}>{helperMessage}</p>
            ) : null}
          </div>
          <div className={styles.heroPreview}>
            <img src={campus1} alt="GradeKart campus preview" className={styles.heroPreviewImage} />
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {error ? (
          <Alert
            variant={schools.length ? 'info' : 'error'}
            className={styles.errorBanner}
          >
            {schools.length
              ? 'Live campus list is temporarily unavailable. Showing a demo list instead.'
              : `Unable to load campuses: ${error}`}
            {' '}
            <button
              type="button"
              className={styles.retryLink}
              onClick={() => refetch()}
            >
              Try again
            </button>
          </Alert>
        ) : null}

        <section className={styles.impactSection} id="about">
          <div className={styles.impactContent}>
            <h2>Why fast-growing institutions choose GradeKart</h2>
            <p>
              We are a ready-to-launch academic operating system. GradeKart removes the friction from daily
              operations while elevating the experience for students, faculty, heads, and owners. Your team gets
              beautifully designed portals that work on any device, driven by a secure Airtable backend.
            </p>
            <div className={styles.impactStats}>
              {impactStats.map((stat) => (
                <div key={stat.label}>
                  <span className={styles.impactValue}>{stat.value}</span>
                  <span className={styles.impactLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.impactMedia}>
            <img src={campus2} alt="GradeKart campus overview" />
          </div>
        </section>

        <section className={styles.campusSection} id="campuses">
          <header className={styles.sectionHeader}>
            <h2>Partner campuses</h2>
            <p>
              Explore schools and colleges already powered by GradeKart. Select a campus to sign in instantly.
            </p>
          </header>
          <div className={styles.campusMetrics}>
            <div>
              <span>{String(campusDeck.length).padStart(2, '0')}+</span>
              <p>Active campuses</p>
            </div>
            <div>
              <span>62K+</span>
              <p>Learners onboarded</p>
            </div>
            <div>
              <span>12</span>
              <p>Modules live today</p>
            </div>
          </div>
          <div className={styles.schoolsGrid}>{cards}</div>
          <div className={styles.partnerActionsBanner}>
            <div>
              <h3>Bring GradeKart to your institution</h3>
              <p>
                We launch branded portals in days. Share your campus schema and our team will guide your rollout end-to-end.
              </p>
            </div>
            <div className={styles.partnerActions}>
              <Button onClick={() => window.open('/partner', '_self')}>
                Partnership deck
              </Button>
              <Button
                variant="secondary"
                onClick={() => window.open('mailto:hello@gradekart.app?subject=GradeKart%20Demo', '_blank')}
              >
                Schedule a walkthrough
              </Button>
            </div>
          </div>
        </section>

        <section className={styles.modulesSection} id="features">
          <header className={styles.sectionHeader}>
            <h2>Purpose-built modules</h2>
            <p>Academic life cycle, finance operations, and community engagement stitched together.</p>
          </header>
          <div className={styles.featureGrid}>
            {featureHighlights.map((feature) => (
              <Card key={feature.title} className={styles.featureCard}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className={styles.differentiatorsSection}>
          <div className={styles.differentiatorsHeader}>
            <h2>Designed for multi-campus excellence</h2>
            <p>
              We obsess over smooth onboarding, delightful interfaces, and measurable outcomes. Here’s how GradeKart stands out.
            </p>
          </div>
          <div className={styles.differentiatorsGrid}>
            {differentiators.map((item) => (
              <Card key={item.title} className={styles.differentiatorCard}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className={styles.updatesSection} id="updates">
          <header className={styles.sectionHeader}>
            <h2>Latest news & events</h2>
            <p>Highlights from the GradeKart network this month.</p>
          </header>
          <div className={styles.updatesList}>
            {latestUpdates.map((item) => (
              <Card key={item.title} className={styles.updateCard}>
                <span className={styles.updateDate}>{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className={styles.ctaSection} id="contact">
          <div>
            <h2>Ready to modernise your academic operations?</h2>
            <p>
              Share your campus details and we’ll assemble a tailored GradeKart workspace with Airtable integration,
              dashboards, and training.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <Button onClick={() => handlePortalAction('teacher', 'signup')}>Start as Faculty</Button>
            <Button
              variant="secondary"
              onClick={() => handlePortalAction('parent', 'signin')}
            >
              Parent Login
            </Button>
            <Button
              variant="secondary"
              onClick={() => window.open('mailto:hello@gradekart.app?subject=Partner%20with%20GradeKart', '_blank')}
            >
              Talk to our team
            </Button>
          </div>
        </section>
      </main>

    </div>
  )
}
