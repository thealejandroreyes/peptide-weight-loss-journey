import type { Metadata } from 'next'
import Link from 'next/link'
import { peptides } from '@/data/peptides'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { BreadcrumbSchema } from '@/components/SchemaMarkup'
import { LeadMagnetCTA } from '@/components/LeadMagnetCTA'

export const metadata: Metadata = {
  title: 'Editorial Team & Review Process',
  description:
    'How the Peptide Nerds editorial team researches, writes, and reviews peptide content. Our methodology, evidence standards, and quality process.',
  alternates: { canonical: '/about/editorial-team' },
}

// Count total studies across all compounds
const totalStudies = peptides.reduce((sum, p) => sum + p.research.keyStudies.length, 0)

export default function EditorialTeamPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' },
        { name: 'Editorial Team', url: '/about/editorial-team' },
      ]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Peptide Nerds Editorial Team',
            url: 'https://peptidenerds.com/about/editorial-team',
            parentOrganization: {
              '@type': 'Organization',
              name: 'Peptide Nerds',
              url: 'https://peptidenerds.com',
            },
            description: 'Evidence-based peptide research and editorial team. PubMed-first methodology with automated compliance scoring.',
            knowsAbout: [
              'Peptides',
              'GLP-1 receptor agonists',
              'Peptide dosing protocols',
              'Peptide safety profiles',
              'Clinical research methodology',
            ],
          }),
        }}
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { name: 'About', href: '/about' },
          { name: 'Editorial Team', href: '/about/editorial-team' },
        ]} />

        <h1 className="text-3xl font-light text-foreground">Editorial Team & Review Process</h1>
        <p className="mt-3 text-muted">
          How we research, write, and maintain {peptides.length} compound profiles and {totalStudies}+ cited studies.
        </p>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="text-2xl font-bold text-accent">{peptides.length}</p>
            <p className="mt-1 text-xs text-muted">Compound profiles</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="text-2xl font-bold text-accent">{totalStudies}+</p>
            <p className="mt-1 text-xs text-muted">Cited studies</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="text-2xl font-bold text-accent">85+</p>
            <p className="mt-1 text-xs text-muted">Min quality score</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="text-2xl font-bold text-accent">6</p>
            <p className="mt-1 text-xs text-muted">Scoring dimensions</p>
          </div>
        </div>

        <div className="prose-custom mt-10">
          <h2>Who we are</h2>
          <p>
            Peptide Nerds is an independent editorial team focused on evidence-based peptide education.
            We are not affiliated with any peptide manufacturer, pharmacy, or supplier. Our revenue comes
            from newsletter sponsorships and affiliate partnerships, which are always{' '}
            <Link href="/affiliate-disclosure" className="text-accent hover:text-accent-hover">clearly disclosed</Link>.
          </p>
          <p>
            We do not sell peptides. We do not provide medical advice. We compile, analyze, and present
            published research so readers can have informed conversations with their healthcare providers.
          </p>

          <h2>Research methodology</h2>
          <p>
            Every compound profile begins with primary literature review. Our process:
          </p>
          <ol>
            <li>
              <strong>PubMed search:</strong> We start with peer-reviewed studies indexed in PubMed/MEDLINE.
              Randomized controlled trials and systematic reviews are weighted most heavily.
            </li>
            <li>
              <strong>FDA documentation:</strong> For approved compounds, we reference FDA approval letters,
              prescribing information, and adverse event databases (FAERS).
            </li>
            <li>
              <strong>Clinical trial registries:</strong> We check ClinicalTrials.gov for ongoing and completed
              trials to provide context on where research stands.
            </li>
            <li>
              <strong>Evidence classification:</strong> Every compound is assigned one of four evidence levels
              based on the quality and quantity of available data.
            </li>
          </ol>

          <h2>Evidence classification system</h2>
          <p>
            We classify each compound into one of four evidence tiers. This classification appears on every
            compound page so readers always know the strength of the underlying data.
          </p>
          <div className="not-prose mt-4 space-y-3">
            <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <p className="text-sm font-medium text-green-600">Strong Evidence</p>
              <p className="mt-1 text-sm text-muted">Multiple published clinical trials in humans with consistent, reproducible results. FDA-approved compounds typically fall here.</p>
            </div>
            <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
              <p className="text-sm font-medium text-blue-600">Moderate Evidence</p>
              <p className="mt-1 text-sm text-muted">Limited clinical data in humans, or strong pre-clinical evidence with some human studies. Results are promising but not yet definitive.</p>
            </div>
            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
              <p className="text-sm font-medium text-yellow-600">Preliminary Evidence</p>
              <p className="mt-1 text-sm text-muted">Early-stage research, primarily animal studies or small pilot trials. Not enough data to draw firm conclusions about human use.</p>
            </div>
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
              <p className="text-sm font-medium text-red-600">Anecdotal</p>
              <p className="mt-1 text-sm text-muted">User reports and community data only. No published clinical evidence available. We label this clearly and do not present it as established fact.</p>
            </div>
          </div>

          <h2>Quality scoring</h2>
          <p>
            Every page is scored across six dimensions before publishing. The minimum score to publish is 85 out of 100.
          </p>
          <div className="not-prose mt-4 rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="px-4 py-2.5 text-left font-medium text-foreground">Dimension</th>
                  <th className="px-4 py-2.5 text-left font-medium text-foreground">What it measures</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 font-medium text-foreground">SEO</td>
                  <td className="px-4 py-2.5 text-muted">Title tags, meta descriptions, heading structure, internal linking</td>
                </tr>
                <tr className="border-b border-border bg-pearl/50">
                  <td className="px-4 py-2.5 font-medium text-foreground">Medical Accuracy</td>
                  <td className="px-4 py-2.5 text-muted">Claims match cited sources, dosing aligns with published data</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 font-medium text-foreground">FDA/FTC Compliance</td>
                  <td className="px-4 py-2.5 text-muted">No banned health claims, proper disclaimers, affiliate disclosures</td>
                </tr>
                <tr className="border-b border-border bg-pearl/50">
                  <td className="px-4 py-2.5 font-medium text-foreground">Readability</td>
                  <td className="px-4 py-2.5 text-muted">Flesch-Kincaid grade level, sentence length, jargon density</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 font-medium text-foreground">E-E-A-T Signals</td>
                  <td className="px-4 py-2.5 text-muted">Author attribution, citations, methodology transparency, update dates</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-foreground">Engagement</td>
                  <td className="px-4 py-2.5 text-muted">FAQ quality, internal linking, clear next actions for the reader</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Review and update cadence</h2>
          <ul>
            <li><strong>New compounds:</strong> Full editorial pipeline (research, draft, compliance scan, scoring, review) before publishing.</li>
            <li><strong>Existing compounds:</strong> Quarterly review against new published research. Update dates reflect actual content changes.</li>
            <li><strong>Compliance monitoring:</strong> Automated scanning flags FDA-banned phrases, unsupported health claims, and readability issues on every edit.</li>
            <li><strong>Blog posts:</strong> Same 6-dimension scoring. Same 85-point minimum. No exceptions.</li>
          </ul>

          <h2>What we will not do</h2>
          <ul>
            <li>Present preliminary research as if it were established clinical fact</li>
            <li>Make therapeutic claims about research-only compounds</li>
            <li>Remove or hide unfavorable safety data</li>
            <li>Allow sponsors to influence editorial content</li>
            <li>Publish without meeting our quality threshold</li>
          </ul>

          <h2>Contact</h2>
          <p>
            Questions about our editorial process? Spot an error in our content?{' '}
            <Link href="/contact" className="text-accent hover:text-accent-hover">Contact us</Link>.
            We take corrections seriously and update content promptly when errors are identified.
          </p>
        </div>

        <div className="mt-10">
          <LeadMagnetCTA variant="inline" utmSource="editorial-team" />
        </div>
      </div>
    </>
  )
}
