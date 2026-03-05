import type { Metadata } from 'next'
import { getPillarConfig } from '@/data/pillars'
import { PillarPage } from '@/components/PillarPage'

const config = getPillarConfig('peptide-comparisons')!

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  alternates: { canonical: '/peptide-comparisons' },
  openGraph: {
    title: config.metaTitle,
    description: config.metaDescription,
    type: 'article',
  },
}

export default function PeptideComparisonsPage() {
  return <PillarPage config={config} />
}
