import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ReconstitutionCalculatorClient } from './reconstitution-calculator-client'
import { BreadcrumbSchema } from '@/components/SchemaMarkup'
import { ToolSchema } from '@/components/ToolSchema'

export const metadata: Metadata = {
  title: 'Peptide Reconstitution Calculator — Free Tool',
  description: 'Calculate exact BAC water volumes and syringe units for any peptide. Visual syringe guide, common protocol presets, and step-by-step reconstitution instructions.',
  alternates: { canonical: '/tools/reconstitution-calculator' },
  openGraph: {
    title: 'Peptide Reconstitution Calculator — Free Tool | Peptide Nerds',
    description: 'Calculate exact BAC water volumes and syringe units for any peptide reconstitution.',
    type: 'website',
  },
}

export default function ReconstitutionCalculatorPage() {
  return (
    <>
      <Suspense>
        <ReconstitutionCalculatorClient />
      </Suspense>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Tools', url: '/tools' },
        { name: 'Reconstitution Calculator', url: '/tools/reconstitution-calculator' },
      ]} />
      <ToolSchema
        name="Peptide Reconstitution Calculator"
        url="/tools/reconstitution-calculator"
        description="Calculate exact BAC water volumes and syringe units for any peptide reconstitution."
      />
    </>
  )
}
