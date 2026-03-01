'use client'

import { useState } from 'react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    // TODO: Wire to Beehiiv API
    // For now, simulate success
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1000)
  }

  return (
    <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6">
      <h3 className="text-lg font-semibold text-foreground">Weekly peptide research updates</h3>
      <p className="mt-2 text-sm text-muted">
        New studies, GLP-1 news, protocol insights, and weight loss data — delivered every week. Free. No spam.
      </p>
      {status === 'success' ? (
        <p className="mt-4 text-sm font-medium text-cyan-400">Check your inbox. Welcome aboard.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-lg bg-cyan-500 px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-cyan-400 disabled:opacity-50"
          >
            {status === 'loading' ? 'Joining...' : 'Subscribe'}
          </button>
        </form>
      )}
    </div>
  )
}
