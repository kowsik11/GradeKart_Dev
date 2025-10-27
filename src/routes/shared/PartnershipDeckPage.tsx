import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import styles from './PartnershipDeckPage.module.css'

const essentials = [
  {
    title: 'Launch plan',
    description:
      'Discovery workshop, data mapping, and branded portal provisioning completed within 7 working days.',
  },
  {
    title: 'Stakeholder portals',
    description:
      'Students, faculty, heads, and owners receive purpose-built dashboards connected to your Airtable base.',
  },
  {
    title: 'White-glove onboarding',
    description:
      'We guide your rollout end-to-end—training, data validation, content styling, and communications.',
  },
]

const deliverables = [
  'Branded GradeKart portal for each stakeholder group',
  'Secure Airtable workspace with live sync',
  'One-page launch playbook customised for your institution',
  'Campus-wide onboarding session with our team',
]

export function PartnershipDeckPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.backLink}>
          <ArrowLeft />
          Back to home
        </Link>
        <span className={styles.tag}>Partner toolkit</span>
        <h1>Bring GradeKart to your institution</h1>
        <p>
          Our partner deck gives you a snapshot of the rollout plan, modules, and onboarding support.
          Share it with your leadership team to kick off the GradeKart journey.
        </p>
        <div className={styles.ctaRow}>
          <a
            href="https://gradekart.app/partner"
            target="_blank"
            rel="noreferrer"
            className={styles.primaryCta}
          >
            View partnership deck
          </a>
          <a
            href="mailto:hello@gradekart.app?subject=Schedule%20GradeKart%20Walkthrough"
            className={styles.secondaryCta}
          >
            Schedule a walkthrough
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.essentials}>
          {essentials.map((card) => (
            <article key={card.title}>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </article>
          ))}
        </section>

        <section className={styles.deliverables}>
          <div>
            <h2>What you receive</h2>
            <p>
              Every partner engagement includes a dedicated launch squad. The deck outlines the following
              deliverables so you know what to expect from day one.
            </p>
            <ul>
              {deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.callout}>
            <h3>Next steps</h3>
            <p>Send us your campus structure or book a walkthrough. We’ll assemble a custom sandbox for you.</p>
            <a href="mailto:hello@gradekart.app" className={styles.mailLink}>
              hello@gradekart.app
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
