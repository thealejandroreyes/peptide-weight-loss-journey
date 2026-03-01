import type { Metadata } from 'next'
import Link from 'next/link'
import { stacks } from '@/data/stacks'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Peptide Stacks — Proven Combination Protocols',
  description:
    'Peptide stack protocols for weight loss, healing, muscle growth, sleep, and more. Dosing, timing, cost estimates, and what to expect from each combination.',
}

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-500/10 text-green-400 border-green-500/20',
  intermediate: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  advanced: 'bg-red-500/10 text-red-400 border-red-500/20',
}

export default function StacksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Stacks', href: '/stacks' }]} />

      <h1 className="text-3xl font-bold text-foreground">Peptide Stacks</h1>
      <p className="mt-3 text-muted">
        {stacks.length} curated combination protocols. Each stack includes dosing, timing, cost estimates, and what to
        expect. Sorted by difficulty level.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stacks.map((stack) => (
          <Link
            key={stack.slug}
            href={`/stacks/${stack.slug}`}
            className="group rounded-xl border border-border bg-[var(--card)] p-6 transition-all hover:border-cyan-500/30 hover:bg-[var(--card-hover)]"
          >
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-base font-semibold text-foreground group-hover:text-cyan-400 transition-colors">
                {stack.name}
              </h2>
              <span className={`flex-shrink-0 inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${difficultyColors[stack.difficulty]}`}>
                {stack.difficulty}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted line-clamp-2">{stack.description}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted">
              <span>{stack.peptides.length} peptides</span>
              <span className="text-border">|</span>
              <span>{stack.estimatedMonthlyCost}</span>
              <span className="text-border">|</span>
              <span>{stack.duration}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
