'use client'

import dynamic from 'next/dynamic'

const DisclaimerBanner = dynamic(
  () => import('@/components/DisclaimerBanner').then(m => ({ default: m.DisclaimerBanner })),
  { ssr: false }
)
const StickyBottomBar = dynamic(
  () => import('@/components/StickyBottomBar').then(m => ({ default: m.StickyBottomBar })),
  { ssr: false }
)
const ExitIntentPopup = dynamic(
  () => import('@/components/ExitIntentPopup').then(m => ({ default: m.ExitIntentPopup })),
  { ssr: false }
)

export function LazyOverlays() {
  return (
    <>
      <DisclaimerBanner />
      <StickyBottomBar />
      <ExitIntentPopup />
    </>
  )
}
