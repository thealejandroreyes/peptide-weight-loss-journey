'use client'

import { useState, useMemo } from 'react'

type Medication = 'semaglutide' | 'tirzepatide' | 'retatrutide'

interface TitrationStep {
  weeks: string
  dose: string
  notes: string
}

const TITRATION_SCHEDULES: Record<Medication, { label: string; unit: string; steps: TitrationStep[] }> = {
  semaglutide: {
    label: 'Semaglutide (Wegovy)',
    unit: 'mg',
    steps: [
      { weeks: 'Weeks 1-4', dose: '0.25 mg', notes: 'Starting dose. Minimal weight loss expected.' },
      { weeks: 'Weeks 5-8', dose: '0.5 mg', notes: 'Most patients begin noticing appetite changes.' },
      { weeks: 'Weeks 9-12', dose: '1.0 mg', notes: 'Significant appetite suppression for most.' },
      { weeks: 'Weeks 13-16', dose: '1.7 mg', notes: 'Approaching therapeutic range.' },
      { weeks: 'Week 17+', dose: '2.4 mg', notes: 'Full maintenance dose.' },
    ],
  },
  tirzepatide: {
    label: 'Tirzepatide (Zepbound)',
    unit: 'mg',
    steps: [
      { weeks: 'Weeks 1-4', dose: '2.5 mg', notes: 'Starting dose. GI adjustment period.' },
      { weeks: 'Weeks 5-8', dose: '5.0 mg', notes: 'First therapeutic dose level.' },
      { weeks: 'Weeks 9-12', dose: '7.5 mg', notes: 'Optional intermediate step.' },
      { weeks: 'Weeks 13-16', dose: '10 mg', notes: 'Strong efficacy for most patients.' },
      { weeks: 'Weeks 17-20', dose: '12.5 mg', notes: 'Optional intermediate step.' },
      { weeks: 'Week 21+', dose: '15 mg', notes: 'Maximum dose.' },
    ],
  },
  retatrutide: {
    label: 'Retatrutide (Phase 2 Protocol)',
    unit: 'mg',
    steps: [
      { weeks: 'Weeks 1-4', dose: '1.0 mg', notes: 'Starting dose.' },
      { weeks: 'Weeks 5-8', dose: '2.0 mg', notes: 'First escalation.' },
      { weeks: 'Weeks 9-12', dose: '4.0 mg', notes: 'Moderate dose.' },
      { weeks: 'Weeks 13-16', dose: '8.0 mg', notes: 'Approaching maximum.' },
      { weeks: 'Week 17+', dose: '12.0 mg', notes: 'Highest dose tested in Phase 2.' },
    ],
  },
}

function getWeekDates(startDate: Date, weekOffset: number): { start: Date; injectionDates: Date[] } {
  const start = new Date(startDate)
  start.setDate(start.getDate() + weekOffset * 7)
  const injectionDates: Date[] = []
  for (let w = 0; w < 4; w++) {
    const d = new Date(start)
    d.setDate(d.getDate() + w * 7)
    injectionDates.push(d)
  }
  return { start, injectionDates }
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatDateFull(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}

export function TitrationCalendar() {
  const [medication, setMedication] = useState<Medication | null>(null)
  const [startDate, setStartDate] = useState<string>('')
  const [showCalendar, setShowCalendar] = useState(false)

  const schedule = medication ? TITRATION_SCHEDULES[medication] : null

  const calendarData = useMemo(() => {
    if (!medication || !startDate) return null
    const start = new Date(startDate + 'T00:00:00')
    if (isNaN(start.getTime())) return null

    const steps = TITRATION_SCHEDULES[medication].steps
    let weekOffset = 0

    return steps.map((step) => {
      const weekCount = step.weeks.includes('+') ? 4 : 4 // Each phase is 4 weeks
      const { injectionDates } = getWeekDates(start, weekOffset)
      weekOffset += weekCount
      return {
        ...step,
        injectionDates,
      }
    })
  }, [medication, startDate])

  function handleGenerate() {
    if (medication && startDate) {
      setShowCalendar(true)
    }
  }

  return (
    <div>
      <h2 className="text-xl text-foreground" id="titration-calendar">Your Titration Calendar</h2>
      <p className="mt-2 text-sm text-muted">
        Select your medication and start date to generate a personalized week-by-week dosing schedule.
      </p>

      <div className="mt-4 rounded-xl border border-border bg-card p-6">
        {/* Medication selection */}
        <div>
          <label className="block text-sm font-medium text-foreground">Which medication are you starting?</label>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {(Object.entries(TITRATION_SCHEDULES) as [Medication, typeof TITRATION_SCHEDULES[Medication]][]).map(
              ([key, value]) => (
                <button
                  key={key}
                  onClick={() => { setMedication(key); setShowCalendar(false) }}
                  className={`rounded-lg border px-4 py-3 text-left transition-all ${
                    medication === key
                      ? 'border-accent bg-accent/10 text-foreground'
                      : 'border-border bg-background text-muted hover:border-accent/50'
                  }`}
                >
                  <span className="block text-sm font-medium">{value.label.split(' (')[0]}</span>
                  <span className="block text-xs text-muted mt-0.5">
                    {value.label.includes('(') ? `(${value.label.split('(')[1]}` : ''}
                  </span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Start date */}
        {medication && (
          <div className="mt-5">
            <label className="block text-sm font-medium text-foreground">
              When is your first injection?
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => { setStartDate(e.target.value); setShowCalendar(false) }}
              className="mt-1.5 w-full max-w-xs rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        )}

        {/* Generate button */}
        {medication && startDate && !showCalendar && (
          <button
            onClick={handleGenerate}
            className="mt-5 rounded-full bg-cta px-6 py-3 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta-hover"
          >
            Generate My Calendar
          </button>
        )}
      </div>

      {/* Calendar output */}
      {showCalendar && calendarData && schedule && (
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-accent/20 bg-soft-sky/30 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Your Schedule</p>
            <p className="mt-1 text-sm text-foreground">
              {schedule.label} starting {formatDateFull(new Date(startDate + 'T00:00:00'))}
            </p>
          </div>

          {calendarData.map((phase, i) => (
            <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
              {/* Phase header */}
              <div className={`px-5 py-3 ${
                i === calendarData.length - 1
                  ? 'bg-accent/10 border-b border-accent/20'
                  : 'bg-pearl/50 border-b border-border'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Phase {i + 1}
                    </span>
                    <span className="mx-2 text-muted">-</span>
                    <span className="text-sm text-foreground">{phase.weeks}</span>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    i === calendarData.length - 1
                      ? 'bg-accent/20 text-accent'
                      : 'bg-background text-foreground'
                  }`}>
                    {phase.dose}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">{phase.notes}</p>
              </div>

              {/* Injection dates */}
              <div className="px-5 py-3">
                <p className="text-xs font-medium text-muted uppercase tracking-wider mb-2">Injection days</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {phase.injectionDates.map((date, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-2 rounded-lg bg-background px-3 py-2"
                    >
                      <svg className="h-4 w-4 flex-shrink-0 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      <span className="text-sm text-foreground">{formatDate(date)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Summary bar */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="grid gap-4 sm:grid-cols-3 text-center">
              <div>
                <p className="text-xs text-muted uppercase tracking-wider">Total titration</p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {(calendarData.length - 1) * 4} weeks
                </p>
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider">Total injections shown</p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {calendarData.reduce((sum, phase) => sum + phase.injectionDates.length, 0)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider">Maintenance dose reached</p>
                <p className="mt-1 text-lg font-bold text-accent">
                  {formatDate(calendarData[calendarData.length - 1].injectionDates[0])}
                </p>
              </div>
            </div>
          </div>

          {medication === 'retatrutide' && (
            <div className="rounded-xl border border-warm-sand bg-[#FEF9EC] p-4">
              <p className="text-xs text-[#6B5A40]">
                <span className="font-medium">Note:</span> Retatrutide is not FDA-approved. This schedule reflects the Phase 2 clinical trial protocol and may differ from future approved dosing. Do not use retatrutide outside of clinical trial enrollment or without medical supervision.
              </p>
            </div>
          )}

          <div className="rounded-xl border border-warm-sand bg-[#FEF9EC] p-4">
            <p className="text-xs text-[#6B5A40]">
              <span className="font-medium">Disclaimer:</span> This calendar is for educational reference only. Your prescriber may adjust the titration schedule based on your individual tolerance and response. Always follow your doctor's specific instructions over any general schedule. If you experience persistent side effects at any dose, stay at that dose until symptoms improve before escalating.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
