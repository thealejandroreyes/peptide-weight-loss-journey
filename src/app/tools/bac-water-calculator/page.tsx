import { Suspense } from 'react'
import type { Metadata } from 'next'
import { BacWaterCalculatorClient } from './bac-water-calculator-client'
import { BreadcrumbSchema } from '@/components/SchemaMarkup'
import { ToolSchema } from '@/components/ToolSchema'

export const metadata: Metadata = {
  title: 'BAC Water Calculator — Free Tool',
  description: 'Calculate how much bacteriostatic water you need for peptide reconstitution. Add multiple vials and find out how many BAC water bottles to order.',
  alternates: { canonical: '/tools/bac-water-calculator' },
  openGraph: {
    title: 'BAC Water Calculator — Free Tool | Peptide Nerds',
    description: 'Calculate how much bacteriostatic water you need for your peptide protocol.',
    type: 'website',
  },
}

export default function BacWaterCalculatorPage() {
  return (
    <>
      <Suspense>
        <BacWaterCalculatorClient />
      </Suspense>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Tools', url: '/tools' },
        { name: 'BAC Water Calculator', url: '/tools/bac-water-calculator' },
      ]} />
      <ToolSchema
        name="BAC Water Calculator"
        url="/tools/bac-water-calculator"
        description="Calculate how much bacteriostatic water you need for peptide reconstitution."
      />
    </>
  )
}
