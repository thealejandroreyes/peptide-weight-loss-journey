import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { BreadcrumbSchema } from '@/components/SchemaMarkup'
import { StackBuilderClient } from './stack-builder-client'

export const metadata: Metadata = {
  title: 'Peptide Stack Builder — Free Tool',
  description: 'Build a custom peptide stack based on your goals and experience level. Browse 12 pre-built protocols for weight loss, healing, anti-aging, cognition, and more.',
  alternates: { canonical: '/tools/stack-builder' },
  openGraph: {
    title: 'Peptide Stack Builder — Free Tool | Peptide Nerds',
    description: 'Build a custom peptide stack based on your goals. 12 evidence-based protocols with dosing, timing, and cost estimates.',
    type: 'website',
  },
}

export default function StackBuilderPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { name: 'Tools', href: '/tools' },
          { name: 'Stack Builder', href: '/tools/stack-builder' },
        ]} />

        <h1 className="mt-6 text-3xl sm:text-4xl">Peptide Stack Builder</h1>
        <p className="mt-3 text-muted">
          Select your goals and experience level. We will match you with pre-built, evidence-based peptide stacks
          including dosing protocols, timing, and estimated costs.
        </p>

        <div className="mt-8">
          <Suspense fallback={<div className="rounded-xl border border-border bg-card p-8 text-center text-muted">Loading stack builder...</div>}>
            <StackBuilderClient />
          </Suspense>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-xs text-yellow-800">
            <strong>Research purposes only.</strong> These stacks are compiled from published research and community protocols.
            They are not medical advice. Always consult a healthcare provider before starting any peptide protocol.
          </p>
        </div>
      </div>

      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Tools', url: '/tools' },
        { name: 'Stack Builder', url: '/tools/stack-builder' },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Peptide Stack Builder',
            url: 'https://peptidenerds.com/tools/stack-builder',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            description: 'Build a custom peptide stack based on your goals and experience level. 12 pre-built evidence-based protocols.',
          }),
        }}
      />
    </>
  )
}
