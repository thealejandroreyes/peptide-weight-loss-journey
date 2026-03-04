'use client'

import { useState } from 'react'

const STORAGE_KEY = 'peptide-nerds-tracker-email-unlocked'

export function isEmailUnlocked(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(STORAGE_KEY) === 'true'
}

export function setEmailUnlocked(): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, 'true')
}

interface Props {
  loggedDays: number
  onUnlock: () => void
}

export function EmailGate({ loggedDays, onUnlock }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setErrorMsg('Enter a valid email address.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, utm_source: 'tracker' }),
      })

      if (!res.ok) throw new Error('Subscribe failed')

      setEmailUnlocked()
      onUnlock()
    } catch {
      setErrorMsg('Something went wrong. Try again.')
      setStatus('error')
    }
  }

  return (
    <div className="relative rounded-xl border border-border bg-card overflow-hidden">
      {/* Blurred fake chart preview */}
      <div className="pointer-events-none select-none blur-sm opacity-60 p-4">
        <div className="h-[320px] flex flex-col justify-between">
          {/* Fake Y-axis labels */}
          <div className="flex items-end gap-4 h-full">
            <div className="flex flex-col justify-between h-full text-[10px] text-muted w-8">
              <span>200</span>
              <span>190</span>
              <span>180</span>
              <span>170</span>
            </div>
            {/* Fake bars */}
            <div className="flex-1 flex items-end gap-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{
                    backgroundColor: 'var(--accent)',
                    opacity: 0.3,
                    height: `${30 + Math.sin(i * 0.7) * 20 + Math.random() * 30}%`,
                  }}
                />
              ))}
            </div>
          </div>
          {/* Fake line overlay */}
          <div className="h-0.5 w-3/4 mx-auto bg-accent/40 rounded -mt-32" />
        </div>
      </div>

      {/* Gate overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-[2px]">
        <div className="mx-4 max-w-sm text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
            <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-foreground">
            You have logged {loggedDays} day{loggedDays !== 1 ? 's' : ''} of data.
          </p>
          <p className="mt-1 text-xs text-muted">
            Enter your email to unlock your progress chart and CSV export.
          </p>
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-2 w-full rounded-full bg-cta px-4 py-2.5 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta-hover disabled:opacity-50"
            >
              {status === 'loading' ? 'Unlocking...' : 'Unlock Progress Chart'}
            </button>
            {errorMsg && (
              <p className="mt-2 text-xs text-red-500">{errorMsg}</p>
            )}
          </form>
          <p className="mt-3 text-[10px] text-muted">
            Free peptide research newsletter. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  )
}
