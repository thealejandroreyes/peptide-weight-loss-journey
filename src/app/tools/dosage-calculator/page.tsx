import { Suspense } from 'react'
import type { Metadata } from 'next'
import { DosageCalculatorClient } from './dosage-calculator-client'
import { BreadcrumbSchema } from '@/components/SchemaMarkup'
import { ToolSchema } from '@/components/ToolSchema'
import { ToolRating } from '@/components/ToolRating'

export const metadata: Metadata = {
  title: 'Peptide Dosage Calculator — Free Tool',
  description: 'Free peptide dosage calculator. Enter vial size and water volume to get exact syringe measurements for any peptide dose.',
  alternates: { canonical: '/tools/dosage-calculator' },
  openGraph: {
    title: 'Peptide Dosage Calculator — Free Tool | Peptide Nerds',
    description: 'Free peptide dosage calculator. Enter vial size and water volume to get exact syringe measurements.',
    type: 'website',
  },
}

export default async function DosageCalculatorPage() {
  return (
    <>
      <Suspense>
        <DosageCalculatorClient />
      </Suspense>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <ToolRating toolSlug="dosage-calculator" />
      </div>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Tools', url: '/tools' },
        { name: 'Dosage Calculator', url: '/tools/dosage-calculator' },
      ]} />
      <ToolSchema
        name="Peptide Dosage Calculator"
        slug="dosage-calculator"
        url="/tools/dosage-calculator"
        description="Free peptide dosage calculator. Enter vial size and water volume to get exact syringe measurements for any peptide dose."
      />
    </>
  )
}
