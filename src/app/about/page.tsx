import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { NewsletterSignup } from '@/components/NewsletterSignup'

export const metadata: Metadata = {
  title: 'About Peptide Nerds',
  description:
    'Peptide Nerds is an evidence-based peptide reference site. 40+ compounds, PubMed-cited research, dosing calculators, and a free protocol tracker. No hype. No sales.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'About', href: '/about' }]} />

      <h1 className="text-3xl font-light text-foreground">About Peptide Nerds</h1>

      <div className="prose-custom mt-8">
        <h2>What this site is</h2>
        <p>
          Peptide Nerds is an evidence-based reference database for peptides. Every claim is backed by
          published research with PubMed citations. Every FAQ answer is written to be useful, not to sell you something.
        </p>
        <p>
          The site covers <strong>40+ peptide compounds</strong> with detailed profiles, side-by-side comparisons,
          goal-based recommendations, stack protocols, dosing calculators, and a free{' '}
          <Link href="/tracker" className="text-accent hover:text-accent-hover">protocol tracker</Link>.
          It is the resource we wished existed when we started researching peptides.
        </p>

        <h2>What this site is NOT</h2>
        <ul>
          <li>This is not medical advice. We are not doctors.</li>
          <li>This is not a peptide store. We do not sell peptides.</li>
          <li>This is not sponsored by any peptide company (unless clearly disclosed).</li>
        </ul>

        <h2>Our approach</h2>
        <ul>
          <li><strong>Research-first:</strong> Every peptide profile includes published studies with PubMed links.</li>
          <li><strong>Honest about limitations:</strong> When evidence is preliminary or anecdotal, we say so.</li>
          <li><strong>FDA status clarity:</strong> Every compound clearly states whether it is FDA-approved, in clinical trials, or research-only.</li>
          <li><strong>No hype:</strong> We do not promise miracles. Peptides are tools. Results depend on the full picture — diet, training, sleep, consistency.</li>
        </ul>

        <h2>Stay updated</h2>
        <p>
          The weekly newsletter goes deeper — new research breakdowns, protocol updates, and analysis
          of what actually matters in the peptide space.
        </p>
      </div>

      <div className="mt-10">
        <NewsletterSignup />
      </div>
    </div>
  )
}
