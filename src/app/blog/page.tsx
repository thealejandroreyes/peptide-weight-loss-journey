import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { BlogFilteredList } from '@/components/BlogFilteredList'

export const metadata: Metadata = {
  title: 'Blog — Peptide Research, Protocols, and Journey Updates',
  description:
    'Latest articles on peptide research, weight loss protocols, and community insights from the Peptide Nerds editorial team.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Blog', href: '/blog' }]} />

      <h1 className="text-3xl font-light text-foreground">Blog</h1>
      <p className="mt-3 text-muted">
        Research breakdowns, protocol deep dives, and journey updates. New articles published weekly.
      </p>

      <BlogFilteredList posts={posts} />

      <div className="mt-10">
        <NewsletterSignup />
      </div>
    </div>
  )
}
