import type { Metadata } from 'next'
import { getPillarConfig } from '@/data/pillars'
import { PillarPage } from '@/components/PillarPage'

const config = getPillarConfig('peptide-research')!

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  alternates: { canonical: '/peptide-research' },
  openGraph: {
    title: config.metaTitle,
    description: config.metaDescription,
    type: 'article',
  },
}

export default function PeptideResearchPage() {
  return <PillarPage config={config} />
}
