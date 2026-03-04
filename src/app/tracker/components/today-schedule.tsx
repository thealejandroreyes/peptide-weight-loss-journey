'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { TrackerData, DoseLog } from '@/lib/tracker-types'
import { SIDE_EFFECT_OPTIONS } from '@/lib/tracker-types'
import { getScheduledDoses, getCurrentDose, formatDateFull, getCycleStatus } from '@/lib/tracker-utils'
import { logDose, undoLog, generateId } from '@/lib/tracker-store'

function todayStr(): string {
  return new Date().toISOString().split('T')[0]
}

interface Props {
  data: TrackerData
  onUpdate: () => void
}

function getLastWeight(doseLogs: DoseLog[]): { weight: number; weightUnit: 'lbs' | 'kg' } | null {
  for (let i = doseLogs.length - 1; i >= 0; i--) {
    if (doseLogs[i].weight) {
      return { weight: doseLogs[i].weight!, weightUnit: doseLogs[i].weightUnit || 'lbs' }
    }
  }
  return null
}

export function TodaySchedule({ data, onUpdate }: Props) {
  const today = todayStr()
  const scheduled = getScheduledDoses(data.protocols, data.doseLogs, today)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Form state
  const [weight, setWeight] = useState('')
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>(
    data.preferences?.weightUnit || 'lbs'
  )
  const [energy, setEnergy] = useState<number | null>(null)
  const [mood, setMood] = useState<number | null>(null)
  const [selectedSideEffects, setSelectedSideEffects] = useState<string[]>([])

  if (!scheduled.length) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <p className="text-lg text-foreground">No doses scheduled today</p>
        <p className="mt-2 text-sm text-muted">
          Enjoy the rest day. Your next dose will show up here when it is due.
        </p>
      </div>
    )
  }

  const allDone = scheduled.every((s) => s.isLogged || s.isSkipped)

  function resetForm() {
    setWeight('')
    setEnergy(null)
    setMood(null)
    setSelectedSideEffects([])
    setExpandedId(null)
  }

  function openForm(itemKey: string) {
    const lastWeight = getLastWeight(data.doseLogs)
    setWeight(lastWeight ? String(lastWeight.weight) : '')
    setWeightUnit(data.preferences?.weightUnit || lastWeight?.weightUnit || 'lbs')
    setEnergy(null)
    setMood(null)
    setSelectedSideEffects([])
    setExpandedId(itemKey)
  }

  function handleSave(item: (typeof scheduled)[0]) {
    const log: DoseLog = {
      id: generateId(),
      protocolId: item.protocol.id,
      timestamp: new Date().toISOString(),
      dose: item.dose,
      unit: item.unit,
    }
    if (weight) {
      log.weight = parseFloat(weight)
      log.weightUnit = weightUnit
    }
    if (energy) log.energy = energy
    if (mood) log.mood = mood
    if (selectedSideEffects.length) log.sideEffects = selectedSideEffects
    logDose(log)
    resetForm()
    onUpdate()
  }

  function handleSkip(item: (typeof scheduled)[0]) {
    logDose({
      id: generateId(),
      protocolId: item.protocol.id,
      timestamp: new Date().toISOString(),
      dose: item.dose,
      unit: item.unit,
      skipped: true,
    })
    onUpdate()
  }

  function handleUndo(logId: string) {
    undoLog(logId)
    onUpdate()
  }

  function toggleSideEffect(effect: string) {
    setSelectedSideEffects((prev) =>
      prev.includes(effect) ? prev.filter((e) => e !== effect) : [...prev, effect]
    )
  }

  // Collect cycle alerts for active protocols
  const cycleAlerts = data.protocols
    .filter((p) => p.isActive)
    .map((p) => ({ protocol: p, cycle: getCycleStatus(p) }))
    .filter(({ cycle }) => cycle.hasCycle && (!cycle.isOnCycle || cycle.weeksRemaining <= 2))

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg text-foreground">{formatDateFull(today)}</h2>
        {allDone && (
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            All done
          </span>
        )}
      </div>

      {/* Cycle alerts */}
      {cycleAlerts.length > 0 && (
        <div className="mb-4 space-y-2">
          {cycleAlerts.map(({ protocol, cycle }) => (
            <div
              key={protocol.id}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${
                cycle.isOnCycle
                  ? 'border border-cta/30 bg-cta/10 text-cta-foreground'
                  : 'border border-accent/20 bg-soft-sky/20 text-muted'
              }`}
            >
              {cycle.isOnCycle ? (
                <>
                  <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  <span>
                    <span className="font-medium">{protocol.name}</span> — {cycle.label}, cycle off in {cycle.weeksRemaining} week{cycle.weeksRemaining !== 1 ? 's' : ''}
                  </span>
                </>
              ) : (
                <>
                  <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    <span className="font-medium">{protocol.name}</span> — {cycle.label}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {scheduled.map((item, idx) => {
          const itemKey = `${item.protocol.id}-${idx}`
          const isExpanded = expandedId === itemKey
          const doseLabel =
            item.dose >= 1 && item.unit === 'mg'
              ? `${item.dose} mg`
              : item.unit === 'mcg'
                ? `${item.dose} mcg`
                : `${item.dose} ${item.unit}`

          const isEscalating = !!item.protocol.escalation?.schedule?.length
          const weekNum = isEscalating
            ? Math.floor(
                (new Date().getTime() - new Date(item.protocol.startDate + 'T00:00:00').getTime()) /
                  (7 * 86400000)
              ) + 1
            : null

          return (
            <div key={itemKey} className="rounded-xl border border-border bg-card">
              <div className="flex items-center gap-4 p-4">
                {/* Status indicator */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                  {item.isLogged ? (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                      <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  ) : item.isSkipped ? (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pearl">
                      <svg className="h-5 w-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811V8.69zM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061a1.125 1.125 0 01-1.683-.977V8.69z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border" />
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{item.protocol.name}</p>
                    {isEscalating && (
                      <span className="rounded bg-soft-sky/50 px-1.5 py-0.5 text-[10px] font-medium text-accent">
                        Week {weekNum}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted">
                    {doseLabel}
                    {item.protocol.frequency === 'twice-daily' && (
                      <span className="ml-1.5 text-xs">({idx === 0 ? 'AM' : 'PM'})</span>
                    )}
                  </p>
                  <Link
                    href={`/peptides/${item.protocol.peptideSlug}`}
                    className="text-xs text-accent hover:text-accent-hover transition-colors"
                  >
                    Learn more
                  </Link>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 gap-2">
                  {item.isLogged || item.isSkipped ? (
                    <button
                      onClick={() => item.logId && handleUndo(item.logId)}
                      className="rounded-full border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-foreground hover:text-foreground"
                    >
                      Undo
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleSkip(item)}
                        className="rounded-full border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-foreground hover:text-foreground"
                      >
                        Skip
                      </button>
                      <button
                        onClick={() => isExpanded ? resetForm() : openForm(itemKey)}
                        className="rounded-full bg-cta px-4 py-1.5 text-xs font-medium text-cta-foreground transition-colors hover:bg-cta-hover"
                      >
                        Log Dose
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Expandable logging form */}
              {isExpanded && (
                <div className="border-t border-border px-4 pb-4 pt-3">
                  <div className="space-y-4">
                    {/* Weight */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-muted">Weight</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          inputMode="decimal"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          placeholder={weightUnit === 'lbs' ? '185' : '84'}
                          className="w-24 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
                        />
                        <div className="flex rounded-lg border border-border">
                          <button
                            onClick={() => setWeightUnit('lbs')}
                            className={`px-3 py-2 text-xs font-medium transition-colors ${
                              weightUnit === 'lbs'
                                ? 'bg-accent/10 text-accent'
                                : 'text-muted hover:text-foreground'
                            } rounded-l-lg`}
                          >
                            lbs
                          </button>
                          <button
                            onClick={() => setWeightUnit('kg')}
                            className={`px-3 py-2 text-xs font-medium transition-colors ${
                              weightUnit === 'kg'
                                ? 'bg-accent/10 text-accent'
                                : 'text-muted hover:text-foreground'
                            } rounded-r-lg`}
                          >
                            kg
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Energy + Mood row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-muted">Energy</label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <button
                              key={n}
                              onClick={() => setEnergy(energy === n ? null : n)}
                              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                                energy === n
                                  ? 'bg-accent text-white'
                                  : 'border border-border text-muted hover:border-accent hover:text-accent'
                              }`}
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-muted">Mood</label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <button
                              key={n}
                              onClick={() => setMood(mood === n ? null : n)}
                              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                                mood === n
                                  ? 'bg-accent text-white'
                                  : 'border border-border text-muted hover:border-accent hover:text-accent'
                              }`}
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Side Effects */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-muted">Side Effects</label>
                      <div className="flex flex-wrap gap-1.5">
                        {SIDE_EFFECT_OPTIONS.map((effect) => (
                          <button
                            key={effect}
                            onClick={() => toggleSideEffect(effect)}
                            className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                              selectedSideEffects.includes(effect)
                                ? 'bg-red-500/10 text-red-600 border border-red-300'
                                : 'border border-border text-muted hover:border-foreground hover:text-foreground'
                            }`}
                          >
                            {effect}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Save / Cancel */}
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => handleSave(item)}
                        className="rounded-full bg-cta px-5 py-2 text-xs font-medium text-cta-foreground transition-colors hover:bg-cta-hover"
                      >
                        Save
                      </button>
                      <button
                        onClick={resetForm}
                        className="rounded-full border border-border px-4 py-2 text-xs text-muted transition-colors hover:border-foreground hover:text-foreground"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
