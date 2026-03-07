'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { stacks } from '@/data/stacks'
import { goals as allGoals } from '@/data/goals'
import type { Stack } from '@/lib/types'

const difficultyLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
} as const

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 border-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  advanced: 'bg-red-100 text-red-800 border-red-200',
} as const

// Goals that actually have stacks mapped to them
const availableGoals = allGoals.filter(g =>
  stacks.some(s => s.goals.includes(g.slug))
)

export function StackBuilderClient() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [maxDifficulty, setMaxDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('advanced')

  const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 }

  const matchedStacks = useMemo(() => {
    if (selectedGoals.length === 0) return []

    const scored = stacks
      .filter(s => difficultyOrder[s.difficulty] <= difficultyOrder[maxDifficulty])
      .map(stack => {
        const matchCount = selectedGoals.filter(g => stack.goals.includes(g)).length
        return { stack, matchCount }
      })
      .filter(({ matchCount }) => matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount)

    return scored
  }, [selectedGoals, maxDifficulty])

  function toggleGoal(slug: string) {
    setSelectedGoals(prev =>
      prev.includes(slug) ? prev.filter(g => g !== slug) : [...prev, slug]
    )
  }

  return (
    <div className="space-y-8">
      {/* Step 1: Goals */}
      <div>
        <h2 className="text-xl font-light text-foreground">1. What are your goals?</h2>
        <p className="mt-1 text-sm text-muted">Select one or more. We will find stacks that match.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {availableGoals.map(goal => (
            <button
              key={goal.slug}
              onClick={() => toggleGoal(goal.slug)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                selectedGoals.includes(goal.slug)
                  ? 'border-accent bg-accent/10 text-accent font-medium'
                  : 'border-border bg-card text-foreground hover:border-accent/50'
              }`}
            >
              {goal.name}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Experience */}
      <div>
        <h2 className="text-xl font-light text-foreground">2. Your experience level</h2>
        <p className="mt-1 text-sm text-muted">We will only show stacks at or below your comfort level.</p>
        <div className="mt-4 flex gap-3">
          {(['beginner', 'intermediate', 'advanced'] as const).map(level => (
            <button
              key={level}
              onClick={() => setMaxDifficulty(level)}
              className={`rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                maxDifficulty === level
                  ? 'border-accent bg-accent/10 text-accent font-medium'
                  : 'border-border bg-card text-foreground hover:border-accent/50'
              }`}
            >
              {difficultyLabels[level]}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {selectedGoals.length > 0 && (
        <div>
          <h2 className="text-xl font-light text-foreground">
            {matchedStacks.length > 0
              ? `${matchedStacks.length} stack${matchedStacks.length === 1 ? '' : 's'} matched`
              : 'No stacks match your filters'}
          </h2>
          {matchedStacks.length === 0 && (
            <p className="mt-2 text-sm text-muted">
              Try selecting different goals or increasing your experience level.
            </p>
          )}

          <div className="mt-4 space-y-4">
            {matchedStacks.map(({ stack, matchCount }) => (
              <StackCard
                key={stack.slug}
                stack={stack}
                matchCount={matchCount}
                totalSelected={selectedGoals.length}
                selectedGoals={selectedGoals}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {selectedGoals.length === 0 && (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <p className="text-muted">Select at least one goal above to see matching stacks.</p>
        </div>
      )}
    </div>
  )
}

function StackCard({
  stack,
  matchCount,
  totalSelected,
  selectedGoals,
}: {
  stack: Stack
  matchCount: number
  totalSelected: number
  selectedGoals: string[]
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Link href={`/stacks/${stack.slug}`} className="text-lg font-medium text-foreground hover:text-accent transition-colors">
                {stack.name}
              </Link>
              <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs ${difficultyColors[stack.difficulty]}`}>
                {difficultyLabels[stack.difficulty]}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">{stack.description}</p>
          </div>
          {totalSelected > 1 && (
            <span className="flex-shrink-0 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
              {matchCount}/{totalSelected} goals
            </span>
          )}
        </div>

        {/* Quick stats */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-background p-3">
            <p className="text-xs text-muted">Peptides</p>
            <p className="mt-0.5 text-sm font-medium text-foreground">{stack.peptides.length} compounds</p>
          </div>
          <div className="rounded-lg bg-background p-3">
            <p className="text-xs text-muted">Est. Cost</p>
            <p className="mt-0.5 text-sm font-medium text-foreground">{stack.estimatedMonthlyCost}</p>
          </div>
          <div className="rounded-lg bg-background p-3">
            <p className="text-xs text-muted">Duration</p>
            <p className="mt-0.5 text-sm font-medium text-foreground">{stack.duration}</p>
          </div>
        </div>

        {/* Goals tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {stack.goals.map(goalSlug => {
            const goal = allGoals.find(g => g.slug === goalSlug)
            const isSelected = selectedGoals.includes(goalSlug)
            return (
              <span
                key={goalSlug}
                className={`rounded-full px-2 py-0.5 text-xs ${
                  isSelected
                    ? 'bg-accent/10 text-accent font-medium'
                    : 'bg-background text-muted'
                }`}
              >
                {goal?.name || goalSlug}
              </span>
            )
          })}
        </div>

        {/* Expand/collapse */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-sm text-accent hover:text-accent-hover transition-colors"
        >
          {expanded ? 'Hide protocol details' : 'Show protocol details'}
        </button>
      </div>

      {/* Expanded protocol */}
      {expanded && (
        <div className="border-t border-border bg-background p-5">
          <h4 className="text-sm font-semibold text-foreground">Protocol</h4>
          <div className="mt-3 space-y-3">
            {stack.peptides.map(entry => (
              <div key={entry.peptide} className="rounded-lg border border-border bg-card p-3">
                <div className="flex items-center justify-between">
                  <Link
                    href={`/peptides/${entry.peptide}`}
                    className="text-sm font-medium text-accent hover:text-accent-hover transition-colors capitalize"
                  >
                    {entry.peptide.replace(/-/g, ' ')}
                  </Link>
                  <span className="text-xs text-muted">{entry.dose}</span>
                </div>
                <p className="mt-1 text-xs text-muted">{entry.frequency} &middot; {entry.timing}</p>
                <p className="mt-1.5 text-xs text-slate-text">{entry.role}</p>
              </div>
            ))}
          </div>

          {stack.notes && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-foreground">Notes</h4>
              <p className="mt-1 text-sm text-muted">{stack.notes}</p>
            </div>
          )}

          <Link
            href={`/stacks/${stack.slug}`}
            className="mt-4 inline-block rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            View full stack page
          </Link>
        </div>
      )}
    </div>
  )
}
