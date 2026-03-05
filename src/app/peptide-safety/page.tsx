import type { Metadata } from 'next'
import { getPillarConfig } from '@/data/pillars'
import { PillarPage } from '@/components/PillarPage'

const config = getPillarConfig('peptide-safety')!

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  alternates: { canonical: '/peptide-safety' },
  openGraph: {
    title: config.metaTitle,
    description: config.metaDescription,
    type: 'article',
  },
}

export default function PeptideSafetyPage() {
  return <PillarPage config={config} />
}
