import { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Suspense } from 'react'
import { PeptideFinderQuiz } from './peptide-finder-quiz'

export const metadata: Metadata = {
  title: 'Peptide Finder Quiz | PeptideNerds',
  description:
    'Answer a few questions to find the best peptides for your goals. Personalized recommendations based on your experience level and preferences.',
  alternates: { canonical: '/tools/peptide-finder' },
}

export default function PeptideFinderPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { name: 'Tools', href: '/tools' },
          { name: 'Peptide Finder', href: '/tools/peptide-finder' },
        ]}
      />

      <h1 className="mt-6 text-3xl sm:text-4xl">Find Your Peptides</h1>
      <p className="mt-3 text-muted">
        Answer a few questions and we&apos;ll recommend 2-3 peptides matched to
        your goals, experience level, and preferences.
      </p>

      <div className="mt-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
            </div>
          }
        >
          <PeptideFinderQuiz />
        </Suspense>
      </div>

      <div className="mt-12 rounded-xl border border-warm-sand bg-[#FEF9EC] p-5">
        <p className="text-sm text-[#6B5A40]">
          <strong>Medical Disclaimer:</strong> This quiz provides educational
          recommendations based on published research. It is not medical advice.
          Peptides vary in regulatory status — some are FDA-approved, others are
          research-only compounds. Always consult a qualified healthcare provider
          before starting any peptide protocol.
        </p>
      </div>
    </main>
  )
}
