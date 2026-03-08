import { Suspense } from 'react'
import type { Metadata } from 'next'
import { DosageCalculatorClient } from './dosage-calculator-client'
import { BreadcrumbSchema } from '@/components/SchemaMarkup'
import { ToolSchema } from '@/components/ToolSchema'

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

export default function DosageCalculatorPage() {
  return (
    <>
      <Suspense>
        <DosageCalculatorClient />
      </Suspense>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Tools', url: '/tools' },
        { name: 'Dosage Calculator', url: '/tools/dosage-calculator' },
      ]} />
      <ToolSchema
        name="Peptide Dosage Calculator"
        url="/tools/dosage-calculator"
        description="Free peptide dosage calculator. Enter vial size and water volume to get exact syringe measurements for any peptide dose."
      />
    </>
  )
}
