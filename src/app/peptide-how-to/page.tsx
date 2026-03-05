import type { Metadata } from 'next'
import { getPillarConfig } from '@/data/pillars'
import { PillarPage } from '@/components/PillarPage'

const config = getPillarConfig('peptide-how-to')!

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  alternates: { canonical: '/peptide-how-to' },
  openGraph: {
    title: config.metaTitle,
    description: config.metaDescription,
    type: 'article',
  },
}

export default function PeptideHowToPage() {
  return <PillarPage config={config} />
}
