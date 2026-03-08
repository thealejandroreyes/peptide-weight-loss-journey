import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { BreadcrumbSchema } from '@/components/SchemaMarkup'
import { ToolSchema } from '@/components/ToolSchema'
import { ToolRating } from '@/components/ToolRating'
import { CostCalculatorClient } from './cost-calculator-client'

export const metadata: Metadata = {
  title: 'Peptide Cost Calculator — Free Tool',
  description: 'Estimate your monthly peptide costs. Compare compounded pharmacy vs brand name pricing for 18+ peptides. Build your stack and see the total.',
  alternates: { canonical: '/tools/cost-calculator' },
  openGraph: {
    title: 'Peptide Cost Calculator — Free Tool | Peptide Nerds',
    description: 'Estimate monthly peptide costs. Compare compounded vs brand name pricing for 18+ peptides.',
    type: 'website',
  },
}

export default async function CostCalculatorPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { name: 'Tools', href: '/tools' },
          { name: 'Cost Calculator', href: '/tools/cost-calculator' },
        ]} />

        <h1 className="mt-6 text-3xl sm:text-4xl">Peptide Cost Calculator</h1>
        <p className="mt-3 text-muted">
          Select the peptides in your protocol to estimate monthly costs.
          Toggle between compounded pharmacy and brand name pricing.
        </p>

        <div className="mt-8">
          <Suspense fallback={<div className="rounded-xl border border-border bg-card p-8 text-center text-muted">Loading calculator...</div>}>
            <CostCalculatorClient />
          </Suspense>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-xs text-yellow-800">
            <strong>Estimates only.</strong> Actual costs vary by pharmacy, location, dosage, and insurance coverage.
            Compounded pricing reflects typical telehealth and compounding pharmacy rates as of early 2026.
            Brand pricing reflects manufacturer list prices before insurance or discount programs.
            This tool is for educational purposes and does not constitute financial or medical advice.
          </p>
        </div>

        <ToolRating toolSlug="cost-calculator" />
      </div>

      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Tools', url: '/tools' },
        { name: 'Cost Calculator', url: '/tools/cost-calculator' },
      ]} />
      <ToolSchema
        name="Peptide Cost Calculator"
        slug="cost-calculator"
        url="/tools/cost-calculator"
        description="Estimate monthly peptide costs. Compare compounded pharmacy vs brand name pricing for 18+ peptides."
      />
    </>
  )
}
