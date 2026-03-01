'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function DisclaimerBanner() {
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    const val = localStorage.getItem('disclaimer-dismissed')
    if (!val) setDismissed(false)
  }, [])

  function handleDismiss() {
    localStorage.setItem('disclaimer-dismissed', '1')
    setDismissed(true)
  }

  if (dismissed) return null

  return (
    <div className="border-b border-amber-500/20 bg-amber-500/5 px-4 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <p className="text-xs text-amber-200/80">
          This site is for educational purposes only and is not medical advice. Always consult a healthcare provider.{' '}
          <Link href="/disclaimer" className="underline hover:text-amber-100">
            Read full disclaimer
          </Link>
        </p>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-xs text-amber-200/60 hover:text-amber-100"
          aria-label="Dismiss disclaimer"
        >
          Got it
        </button>
      </div>
    </div>
  )
}
