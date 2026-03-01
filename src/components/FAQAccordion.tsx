'use client'

import { useState } from 'react'
import type { FAQ } from '@/lib/types'

function FAQItem({ faq, defaultOpen }: { faq: FAQ; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false)

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-medium text-foreground pr-4">{faq.question}</span>
        <svg
          className={`h-5 w-5 flex-shrink-0 text-muted transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="pb-4">
          <p className="text-sm text-muted leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  )
}

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  return (
    <div className="divide-y-0">
      {faqs.map((faq, i) => (
        <FAQItem key={i} faq={faq} defaultOpen={i === 0} />
      ))}
    </div>
  )
}
