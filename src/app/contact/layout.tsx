import type { Metadata } from 'next'
import { BreadcrumbSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Contact Peptide Nerds',
  description:
    'Questions about peptide research, content corrections, or media inquiries. We read every message.',
  alternates: { canonical: '/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' },
        ]}
      />
      {children}
    </>
  )
}
