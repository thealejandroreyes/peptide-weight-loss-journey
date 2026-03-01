import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { NewsletterSignup } from '@/components/NewsletterSignup'

export const metadata: Metadata = {
  title: 'Blog — Peptide Research, Protocols, and Journey Updates',
  description:
    'Latest articles on peptide research, weight loss protocols, community insights, and personal journey updates from @fatmaninthearena.',
}

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Blog', href: '/blog' }]} />

      <h1 className="text-3xl font-bold text-foreground">Blog</h1>
      <p className="mt-3 text-muted">
        Research breakdowns, protocol deep dives, and journey updates. New articles published weekly.
      </p>

      {/* Coming soon state */}
      <div className="mt-12 rounded-xl border border-border bg-[var(--card)] p-10 text-center">
        <p className="text-lg font-semibold text-foreground">Articles are coming soon</p>
        <p className="mt-2 text-sm text-muted">
          We are building out the research library. Subscribe to get notified when new articles drop.
        </p>
      </div>

      <div className="mt-10">
        <NewsletterSignup />
      </div>
    </div>
  )
}
