import { Suspense } from 'react'
import type { Metadata } from 'next'
import { TrackerClient } from './tracker-client'
import { ToolSchema } from '@/components/ToolSchema'
import { ToolRating } from '@/components/ToolRating'

export const metadata: Metadata = {
  title: 'Peptide Protocol Tracker',
  description:
    'Track your peptide protocols, log doses, monitor vial inventory, and maintain streaks. Free, private, and runs entirely in your browser.',
  alternates: { canonical: '/tracker' },
  openGraph: {
    title: 'Peptide Protocol Tracker | Peptide Nerds',
    description:
      'Track your peptide protocols, log doses, and monitor adherence. Free tool — no account required.',
    type: 'website',
  },
}

export default async function TrackerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Suspense>
        <TrackerClient />
      </Suspense>

      <ToolRating toolSlug="tracker" />

      <ToolSchema
        name="Peptide Protocol Tracker"
        slug="tracker"
        url="/tracker"
        description="Track peptide protocols, log doses, monitor vial inventory, and maintain adherence streaks."
      />
    </div>
  )
}
