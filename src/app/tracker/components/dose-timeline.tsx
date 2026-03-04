'use client'

import { useState, useMemo } from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
} from 'recharts'
import type { TrackerData } from '@/lib/tracker-types'

interface Props {
  data: TrackerData
}

type Range = 30 | 60 | 90

interface DayData {
  date: string
  label: string
  weight: number | null
  energy: number | null
  totalDoseMg: number
  hasSideEffects: boolean
  sideEffects: string[]
}

function normalizeDoseMg(dose: number, unit: 'mcg' | 'mg'): number {
  return unit === 'mcg' ? dose / 1000 : dose
}

export function DoseTimeline({ data }: Props) {
  const [range, setRange] = useState<Range>(30)

  const chartData = useMemo(() => {
    const now = new Date()
    const startDate = new Date()
    startDate.setDate(now.getDate() - range)

    const dayMap = new Map<string, DayData>()

    // Initialize all days in range
    for (let d = 0; d <= range; d++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + d)
      const dateStr = date.toISOString().split('T')[0]
      dayMap.set(dateStr, {
        date: dateStr,
        label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        weight: null,
        energy: null,
        totalDoseMg: 0,
        hasSideEffects: false,
        sideEffects: [],
      })
    }

    // Aggregate dose logs
    for (const log of data.doseLogs) {
      const dateStr = log.timestamp.split('T')[0]
      const day = dayMap.get(dateStr)
      if (!day || log.skipped) continue

      day.totalDoseMg += normalizeDoseMg(log.dose, log.unit)

      if (log.weight != null) day.weight = log.weight
      if (log.energy != null) {
        // Average if multiple entries
        day.energy = day.energy != null ? (day.energy + log.energy) / 2 : log.energy
      }
      if (log.sideEffects?.length) {
        day.hasSideEffects = true
        day.sideEffects = [...new Set([...day.sideEffects, ...log.sideEffects])]
      }
    }

    return Array.from(dayMap.values())
  }, [data.doseLogs, range])

  const hasWeight = chartData.some((d) => d.weight != null)
  const hasEnergy = chartData.some((d) => d.energy != null)
  const hasDoses = chartData.some((d) => d.totalDoseMg > 0)

  if (!hasDoses && !hasWeight && !hasEnergy) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <p className="text-lg text-foreground">No data to chart yet</p>
        <p className="mt-2 text-sm text-muted">
          Start logging doses to see your progress timeline here.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      {/* Range selector */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Progress Timeline</h3>
        <div className="flex rounded-lg border border-border">
          {([30, 60, 90] as Range[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                range === r
                  ? 'bg-accent/10 text-accent'
                  : 'text-muted hover:text-foreground'
              } ${r === 30 ? 'rounded-l-lg' : r === 90 ? 'rounded-r-lg' : ''}`}
            >
              {r}d
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fill: 'var(--muted)' }}
              tickLine={false}
              axisLine={{ stroke: 'var(--border)' }}
              interval={range <= 30 ? 6 : range <= 60 ? 13 : 20}
            />

            {/* Left Y-axis: Weight */}
            {hasWeight && (
              <YAxis
                yAxisId="weight"
                orientation="left"
                tick={{ fontSize: 10, fill: 'var(--muted)' }}
                tickLine={false}
                axisLine={false}
                domain={['auto', 'auto']}
                width={40}
              />
            )}

            {/* Right Y-axis: Dose (mg) */}
            {hasDoses && (
              <YAxis
                yAxisId="dose"
                orientation="right"
                tick={{ fontSize: 10, fill: 'var(--muted)' }}
                tickLine={false}
                axisLine={false}
                domain={[0, 'auto']}
                width={35}
              />
            )}

            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                fontSize: '12px',
                color: 'var(--foreground)',
              }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={((value: any, name: any) => {
                if (name === 'Weight') return [value ? `${value}` : '-', name]
                if (name === 'Energy') return [value ? `${value}/5` : '-', name]
                if (name === 'Dose (mg)') return [value ? `${Number(value).toFixed(2)} mg` : '-', name]
                return [value ?? '-', name]
              }) as any}
              labelFormatter={(label) => label}
            />

            <Legend
              wrapperStyle={{ fontSize: '11px' }}
              iconSize={10}
            />

            {/* Dose bars */}
            {hasDoses && (
              <Bar
                yAxisId="dose"
                dataKey="totalDoseMg"
                name="Dose (mg)"
                fill="var(--accent)"
                opacity={0.3}
                radius={[2, 2, 0, 0]}
              />
            )}

            {/* Weight line */}
            {hasWeight && (
              <Line
                yAxisId="weight"
                dataKey="weight"
                name="Weight"
                stroke="#2A7A72"
                strokeWidth={2}
                dot={false}
                connectNulls
                activeDot={{ r: 4, fill: '#2A7A72' }}
              />
            )}

            {/* Energy line */}
            {hasEnergy && (
              <Line
                yAxisId={hasWeight ? 'weight' : 'dose'}
                dataKey="energy"
                name="Energy"
                stroke="#C9A96E"
                strokeWidth={1.5}
                strokeDasharray="4 3"
                dot={false}
                connectNulls
                activeDot={{ r: 3, fill: '#C9A96E' }}
              />
            )}

            {/* Side effect markers */}
            <Scatter
              yAxisId={hasDoses ? 'dose' : 'weight'}
              dataKey={(d: DayData) => (d.hasSideEffects ? 0 : null)}
              name="Side Effects"
              fill="#EF4444"
              shape="circle"
              legendType="circle"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Side effects legend */}
      {chartData.some((d) => d.hasSideEffects) && (
        <div className="mt-3 border-t border-border pt-3">
          <p className="mb-1 text-[11px] font-medium text-muted">Side effects reported:</p>
          <div className="flex flex-wrap gap-1">
            {[...new Set(chartData.flatMap((d) => d.sideEffects))].map((effect) => (
              <span
                key={effect}
                className="rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] text-red-600"
              >
                {effect}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
