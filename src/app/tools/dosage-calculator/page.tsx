import { Suspense } from 'react'
import type { Metadata } from 'next'
import { DosageCalculatorClient } from './dosage-calculator-client'
import { BreadcrumbSchema } from '@/components/SchemaMarkup'

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Peptide Dosage Calculator',
            url: 'https://peptidenerds.com/tools/dosage-calculator',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            description: 'Free peptide dosage calculator. Enter vial size and water volume to get exact syringe measurements for any peptide dose.',
          }),
        }}
      />
    </>
  )
}
