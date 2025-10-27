import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import clsx from 'clsx'
import { CalendarDays, Clock3, MapPin } from 'lucide-react'
import { timetableEvents, type TimetableEvent } from '@/routes/student/timetables/data'

const startOfToday = dayjs().startOf('day')

const categoryStyles: Record<
  TimetableEvent['category'],
  { badge: string; bg: string; border: string }
> = {
  Lecture: {
    badge: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    bg: 'bg-indigo-50/60',
    border: 'border-indigo-100',
  },
  Lab: {
    badge: 'bg-sky-50 text-sky-600 border border-sky-100',
    bg: 'bg-sky-50/60',
    border: 'border-sky-100',
  },
  Exam: {
    badge: 'bg-rose-50 text-rose-600 border border-rose-100',
    bg: 'bg-rose-50/60',
    border: 'border-rose-100',
  },
  Assignment: {
    badge: 'bg-amber-50 text-amber-600 border border-amber-100',
    bg: 'bg-amber-50/60',
    border: 'border-amber-100',
  },
  Quiz: {
    badge: 'bg-purple-50 text-purple-600 border border-purple-100',
    bg: 'bg-purple-50/60',
    border: 'border-purple-100',
  },
  Sports: {
    badge: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    bg: 'bg-emerald-50/60',
    border: 'border-emerald-100',
  },
  Holiday: {
    badge: 'bg-slate-100 text-slate-600 border border-slate-200',
    bg: 'bg-slate-100/70',
    border: 'border-slate-200',
  },
  Event: {
    badge: 'bg-pink-50 text-pink-600 border border-pink-100',
    bg: 'bg-pink-50/60',
    border: 'border-pink-100',
  },
}

export function TimetablePage() {
  const [selectedDate, setSelectedDate] = useState(startOfToday)
  const [calendarMonth, setCalendarMonth] = useState(startOfToday.startOf('month'))

  const eventsByDate = useMemo(() => {
    return timetableEvents.reduce<Record<string, TimetableEvent[]>>((acc, event) => {
      const key = event.date
      acc[key] = acc[key] ? [...acc[key], event] : [event]
      return acc
    }, {})
  }, [])

  const visibleDays = useMemo(() => {
    const start = calendarMonth.startOf('week')
    const end = calendarMonth.endOf('month').endOf('week')
    const days: dayjs.Dayjs[] = []
    let current = start
    while (current.isBefore(end) || current.isSame(end, 'day')) {
      days.push(current)
      current = current.add(1, 'day')
    }
    return days
  }, [calendarMonth])

  const dayEvents = eventsByDate[selectedDate.format('YYYY-MM-DD')] ?? []

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Daily planner
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Time Tables & Calendar</h1>
          <p className="max-w-2xl text-sm text-slate-500">
            Tap any date to view scheduled lectures, assessments, events, or campus notices for that
            day. Sync with your class advisor&apos;s updates instantly.
          </p>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {calendarMonth.format('MMMM YYYY')}
              </h2>
              <p className="text-xs text-slate-500">
                {dayEvents.length} {dayEvents.length === 1 ? 'event' : 'events'} on{' '}
                {selectedDate.format('DD MMM YYYY')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCalendarMonth(calendarMonth.subtract(1, 'month'))}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => {
                  setCalendarMonth(startOfToday.startOf('month'))
                  setSelectedDate(startOfToday)
                }}
                className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setCalendarMonth(calendarMonth.add(1, 'month'))}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
              >
                ›
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {visibleDays.map((day) => {
              const isCurrentMonth = day.isSame(calendarMonth, 'month')
              const isToday = day.isSame(startOfToday, 'day')
              const isSelected = day.isSame(selectedDate, 'day')
              const hasEvents = Boolean(eventsByDate[day.format('YYYY-MM-DD')])
              return (
                <button
                  key={day.format('YYYY-MM-DD')}
                  type="button"
                  onClick={() => setSelectedDate(day)}
                  className={clsx(
                    'flex aspect-square flex-col items-center justify-center rounded-2xl border text-sm transition',
                    isSelected
                      ? 'border-slate-900 bg-slate-900 text-white shadow-lg'
                      : isToday
                      ? 'border-slate-900/30 bg-slate-100 text-slate-900'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-900',
                    !isCurrentMonth && 'text-slate-300'
                  )}
                >
                  <span>{day.date()}</span>
                  {hasEvents ? (
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-900" />
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Day agenda</h2>
              <p className="text-xs text-slate-500">
                Personalized to your class, labs, and campus happenings.
              </p>
            </div>
            <CalendarDays className="h-5 w-5 text-slate-300" />
          </div>
          {dayEvents.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-12 text-center">
              <p className="text-sm font-semibold text-slate-600">
                Nothing scheduled for this day. Take a breather or stay prepared!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {dayEvents.map((event) => {
                const palette = categoryStyles[event.category]
                return (
                  <article
                    key={event.id}
                    className={clsx(
                      'rounded-3xl border p-5 shadow-sm',
                      palette.bg,
                      palette.border
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={clsx(
                          'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold',
                          palette.badge
                        )}
                      >
                        {event.category}
                      </span>
                      <p className="text-sm font-semibold text-slate-900">{event.title}</p>
                    </div>
                    <div className="mt-3 space-y-2 text-xs text-slate-600">
                      {(event.startTime || event.endTime) && (
                        <div className="flex items-center gap-2">
                          <Clock3 className="h-3.5 w-3.5" />
                          <span>
                            {event.startTime ?? '--'} &ndash; {event.endTime ?? '--'}
                          </span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.description ? <p>{event.description}</p> : null}
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
