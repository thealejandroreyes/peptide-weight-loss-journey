'use client'

import type { TrackerData } from '@/lib/tracker-types'
import { getVialStatus, getResupplyDate, formatDateShort } from '@/lib/tracker-utils'

interface Props {
  data: TrackerData
}

export function VialTracker({ data }: Props) {
  const protocolsWithVials = data.protocols.filter((p) => p.vial && p.isActive)

  if (!protocolsWithVials.length) return null

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-lg text-foreground">Vial Inventory</h2>

      <div className="mt-4 space-y-3">
        {protocolsWithVials.map((protocol) => {
          const status = getVialStatus(protocol, data.doseLogs)
          if (!status) return null
          const resupplyDate = getResupplyDate(protocol, data.doseLogs)

          const fillPercent = protocol.vial
            ? Math.round(
                (status.dosesRemaining /
                  Math.floor(
                    protocol.vial.totalAmount /
                      (protocol.unit === 'mcg' ? protocol.dose / 1000 : protocol.dose)
                  )) *
                  100
              )
            : 0

          return (
            <div key={protocol.id} className="rounded-lg border border-border/60 bg-background p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-foreground">{protocol.name}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {protocol.vial?.totalAmount} mg vial &middot; Reconstituted{' '}
                    {formatDateShort(status.reconDate)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {status.dosesRemaining} doses
                  </p>
                  <p className="text-xs text-muted">~{status.daysUntilEmpty} days left</p>
                </div>
              </div>

              {/* Fill bar */}
              <div className="mt-3 h-1.5 w-full rounded-full bg-pearl">
                <div
                  className={`h-1.5 rounded-full transition-all ${
                    status.isLow ? 'bg-red-400' : status.isExpired ? 'bg-red-400' : 'bg-accent'
                  }`}
                  style={{ width: `${Math.max(fillPercent, 2)}%` }}
                />
              </div>

              {/* Warnings */}
              {(status.isLow || status.isExpired) && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {status.isLow && (
                    <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-[10px] font-medium text-red-700">
                      Low supply — {status.dosesRemaining} doses remaining
                    </span>
                  )}
                  {status.isExpired && (
                    <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-[10px] font-medium text-red-700">
                      {status.daysSinceRecon} days since reconstitution (28-day shelf life)
                    </span>
                  )}
                </div>
              )}

              {/* Resupply date */}
              {resupplyDate && !status.isExpired && (
                <div className="mt-2 flex items-center gap-1.5">
                  <svg className="h-3 w-3 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  <span className={`text-[10px] font-medium ${
                    status.daysUntilEmpty <= 3 ? 'text-red-600' : 'text-muted'
                  }`}>
                    Order by {formatDateShort(resupplyDate)}
                  </span>
                </div>
              )}

              {/* Shelf life notice */}
              {!status.isExpired && status.daysSinceRecon > 21 && (
                <p className="mt-2 text-[10px] text-cta-foreground">
                  {28 - status.daysSinceRecon} days of shelf life remaining
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
