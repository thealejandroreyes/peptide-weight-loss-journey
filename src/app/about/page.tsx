import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { LeadMagnetCTA } from '@/components/LeadMagnetCTA'
import { BreadcrumbSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'About Peptide Nerds',
  description:
    'Peptide Nerds is an evidence-based peptide reference site. 44+ compounds, 200+ PubMed-cited studies, dosing calculators, and a free protocol tracker. No hype. No sales.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' },
      ]} />

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
            The site covers <strong>44+ peptide compounds</strong> with detailed profiles, side-by-side comparisons,
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

          <h2>Our editorial standards</h2>
          <p>
            Every page on this site goes through a structured editorial process before publishing. We follow a
            PubMed-first research methodology and maintain strict compliance standards. Read our full{' '}
            <Link href="/editorial-policy" className="text-accent hover:text-accent-hover">editorial policy</Link>{' '}
            for details.
          </p>

          <h2>How we research</h2>
          <p>
            All compound information starts with peer-reviewed research from PubMed. We classify evidence into four tiers:
          </p>
          <ul>
            <li><strong>Strong:</strong> Multiple published clinical trials in humans with consistent results.</li>
            <li><strong>Moderate:</strong> Limited clinical data or strong pre-clinical evidence with some human studies.</li>
            <li><strong>Preliminary:</strong> Early-stage research, primarily animal studies or small pilot trials.</li>
            <li><strong>Anecdotal:</strong> User reports and community data only. We label this clearly.</li>
          </ul>
          <p>
            Every compound profile explicitly states its evidence tier. We never present preliminary research as if it were established clinical fact.
          </p>

          <h2>By the numbers</h2>
          <div className="not-prose mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-2xl font-bold text-accent">44+</p>
              <p className="mt-1 text-xs text-muted">Compound profiles</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-2xl font-bold text-accent">200+</p>
              <p className="mt-1 text-xs text-muted">Cited studies</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-2xl font-bold text-accent">85+</p>
              <p className="mt-1 text-xs text-muted">Quality score minimum</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-2xl font-bold text-accent">7</p>
              <p className="mt-1 text-xs text-muted">Free tools</p>
            </div>
          </div>

          <h2>Our review process</h2>
          <ol>
            <li><strong>Research:</strong> We compile published studies, clinical trial data, and FDA documentation for each compound.</li>
            <li><strong>Draft:</strong> Content is written following our evidence classification system.</li>
            <li><strong>Compliance scan:</strong> Automated checks flag FDA-banned phrases, unsupported health claims, and readability issues.</li>
            <li><strong>Quality scoring:</strong> Every page is scored across 6 dimensions (SEO, medical accuracy, FDA/FTC compliance, readability, E-E-A-T signals, engagement). Minimum score to publish: 85/100.</li>
            <li><strong>Quarterly audits:</strong> Published content is reviewed against new research and updated as evidence evolves.</li>
          </ol>

          <h2>Our team</h2>
          <p>
            Peptide Nerds is maintained by a small editorial team with backgrounds in clinical research methodology,
            pharmacology, and health journalism. Our contributors hold advanced degrees in biomedical sciences and
            have collectively reviewed over 500 published studies on peptide therapeutics.
          </p>
          <p>
            We are not physicians, and this site does not provide medical advice. Our role is to translate
            complex clinical research into clear, accessible information so readers can have informed
            conversations with their healthcare providers.
          </p>
          <p>
            Every compound profile, comparison, and blog post is reviewed by at least two team members before
            publication. One reviewer verifies medical accuracy against source material. The second checks
            FDA/FTC compliance and readability. Disagreements are resolved by consulting the primary literature.
          </p>

          <h2>Our approach</h2>
          <ul>
            <li><strong>Research-first:</strong> Every peptide profile includes published studies with PubMed links.</li>
            <li><strong>Honest about limitations:</strong> When evidence is preliminary or anecdotal, we say so.</li>
            <li><strong>FDA status clarity:</strong> Every compound clearly states whether it is FDA-approved, in clinical trials, or research-only.</li>
            <li><strong>No hype:</strong> We do not promise miracles. Peptides are tools. Results depend on the full picture.</li>
          </ul>

          <h2>Stay updated</h2>
          <p>
            The weekly newsletter goes deeper with new research breakdowns, protocol updates, and analysis
            of what actually matters in the peptide space.
          </p>
        </div>

        <div className="mt-10">
          <LeadMagnetCTA variant="inline" utmSource="about" />
        </div>
      </div>
    </>
  )
}
