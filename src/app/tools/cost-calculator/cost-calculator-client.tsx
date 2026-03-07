'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { peptideCosts, type PeptideCost } from './cost-data'

const categories = [...new Set(peptideCosts.map(p => p.category))]

export function CostCalculatorClient() {
  const [selected, setSelected] = useState<string[]>([])
  const [useCompounded, setUseCompounded] = useState(true)
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const filtered = filterCategory === 'all'
    ? peptideCosts
    : peptideCosts.filter(p => p.category === filterCategory)

  const selectedPeptides = useMemo(
    () => peptideCosts.filter(p => selected.includes(p.slug)),
    [selected]
  )

  const totals = useMemo(() => {
    let low = 0
    let high = 0
    for (const p of selectedPeptides) {
      if (useCompounded) {
        low += p.compoundedLow
        high += p.compoundedHigh
      } else {
        low += p.brandLow ?? p.compoundedLow
        high += p.brandHigh ?? p.compoundedHigh
      }
    }
    return { low, high }
  }, [selectedPeptides, useCompounded])

  function toggle(slug: string) {
    setSelected(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    )
  }

  return (
    <div className="space-y-8">
      {/* Pricing toggle */}
      <div>
        <h2 className="text-xl font-light text-foreground">Pricing source</h2>
        <div className="mt-3 flex gap-3">
          <button
            onClick={() => setUseCompounded(true)}
            className={`rounded-lg border px-4 py-2.5 text-sm transition-colors ${
              useCompounded
                ? 'border-accent bg-accent/10 text-accent font-medium'
                : 'border-border bg-card text-foreground hover:border-accent/50'
            }`}
          >
            Compounded
          </button>
          <button
            onClick={() => setUseCompounded(false)}
            className={`rounded-lg border px-4 py-2.5 text-sm transition-colors ${
              !useCompounded
                ? 'border-accent bg-accent/10 text-accent font-medium'
                : 'border-border bg-card text-foreground hover:border-accent/50'
            }`}
          >
            Brand name
          </button>
        </div>
        <p className="mt-2 text-xs text-muted">
          {useCompounded
            ? 'Estimated pricing from compounding pharmacies and telehealth providers.'
            : 'List pricing for brand-name medications. Insurance may reduce costs.'}
        </p>
      </div>

      {/* Category filter */}
      <div>
        <h2 className="text-xl font-light text-foreground">Select peptides</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCategory('all')}
            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
              filterCategory === 'all'
                ? 'border-accent bg-accent/10 text-accent font-medium'
                : 'border-border bg-card text-muted hover:border-accent/50'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                filterCategory === cat
                  ? 'border-accent bg-accent/10 text-accent font-medium'
                  : 'border-border bg-card text-muted hover:border-accent/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Peptide grid */}
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {filtered.map(peptide => {
            const isSelected = selected.includes(peptide.slug)
            const low = useCompounded ? peptide.compoundedLow : (peptide.brandLow ?? peptide.compoundedLow)
            const high = useCompounded ? peptide.compoundedHigh : (peptide.brandHigh ?? peptide.compoundedHigh)
            const hasBrand = !useCompounded && peptide.brandLow != null

            return (
              <button
                key={peptide.slug}
                onClick={() => toggle(peptide.slug)}
                className={`flex items-center justify-between rounded-xl border p-3 text-left transition-colors ${
                  isSelected
                    ? 'border-accent bg-accent/5'
                    : 'border-border bg-card hover:border-accent/50'
                }`}
              >
                <div className="min-w-0">
                  <p className={`text-sm font-medium ${isSelected ? 'text-accent' : 'text-foreground'}`}>
                    {peptide.name}
                  </p>
                  <p className="text-xs text-muted">{peptide.typicalDose}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className={`text-sm font-medium ${isSelected ? 'text-accent' : 'text-foreground'}`}>
                    ${low}-{high}
                  </p>
                  <p className="text-[10px] text-muted">
                    {hasBrand && peptide.brandName ? peptide.brandName : '/month'}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Running total */}
      {selectedPeptides.length > 0 && (
        <div className="sticky bottom-0 z-10 -mx-4 border-t border-border bg-card/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:px-6 sm:rounded-xl sm:border sm:relative sm:bottom-auto sm:z-auto sm:backdrop-blur-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Estimated monthly cost ({selectedPeptides.length} peptide{selectedPeptides.length === 1 ? '' : 's'})
              </p>
              <p className="text-xs text-muted">
                {useCompounded ? 'Compounded pharmacy pricing' : 'Brand name list pricing'}
              </p>
            </div>
            <p className="text-2xl font-light text-accent">
              ${totals.low.toLocaleString()}-{totals.high.toLocaleString()}
            </p>
          </div>

          {/* Breakdown */}
          <div className="mt-3 space-y-1.5">
            {selectedPeptides.map(p => {
              const low = useCompounded ? p.compoundedLow : (p.brandLow ?? p.compoundedLow)
              const high = useCompounded ? p.compoundedHigh : (p.brandHigh ?? p.compoundedHigh)
              return (
                <div key={p.slug} className="flex items-center justify-between text-sm">
                  <Link href={`/peptides/${p.slug}`} className="text-accent hover:text-accent-hover transition-colors">
                    {p.name}
                  </Link>
                  <span className="text-muted">${low}-{high}/mo</span>
                </div>
              )
            })}
          </div>

          <button
            onClick={() => setSelected([])}
            className="mt-3 text-xs text-muted hover:text-foreground transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
