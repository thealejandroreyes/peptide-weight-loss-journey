'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

interface BlogPostMeta {
  title: string
  slug: string
  meta_description: string
  pillar: string
  date: string
  reading_time: string
}

const categories = [
  { key: 'all', label: 'All' },
  { key: 'weight-loss', label: 'Weight Loss' },
  { key: 'how-to', label: 'How-To Guides' },
  { key: 'safety', label: 'Safety & Side Effects' },
  { key: 'comparisons', label: 'Comparisons' },
  { key: 'science', label: 'Science & News' },
] as const

// Map pillar values from frontmatter to display categories
const pillarToCategory: Record<string, string> = {
  'glp-1-peptides': 'weight-loss',
  'peptide-weight-loss': 'weight-loss',
  'peptide-how-to': 'how-to',
  'peptide-safety': 'safety',
  'peptide-stacking': 'safety',
  'peptide-comparisons': 'comparisons',
  'peptide-research': 'science',
  'healing-peptides': 'science',
  'master-guide': 'how-to',
}

const categoryLabels: Record<string, string> = {
  'weight-loss': 'Weight Loss',
  'how-to': 'How-To',
  'safety': 'Safety',
  'comparisons': 'Comparisons',
  'science': 'Science & News',
}

function getCategoryForPillar(pillar: string): string {
  return pillarToCategory[pillar] || 'science'
}

export function BlogFilteredList({ posts }: { posts: BlogPostMeta[] }) {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? posts
    : posts.filter((p) => getCategoryForPillar(p.pillar) === active)

  return (
    <>
      {/* Filter buttons */}
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((cat) => {
          const count = cat.key === 'all'
            ? posts.length
            : posts.filter((p) => getCategoryForPillar(p.pillar) === cat.key).length
          if (cat.key !== 'all' && count === 0) return null
          return (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                active === cat.key
                  ? 'border-accent bg-accent text-white'
                  : 'border-border text-muted hover:border-accent hover:text-accent'
              }`}
            >
              {cat.label} ({count})
            </button>
          )
        })}
      </div>

      {/* Post cards */}
      {filtered.length === 0 ? (
        <div className="mt-12 rounded-xl border border-border bg-card p-10 text-center">
          <p className="text-lg font-semibold text-foreground">No articles in this category yet</p>
          <p className="mt-2 text-sm text-muted">Check back soon or browse all articles.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {filtered.map((post) => {
            const category = getCategoryForPillar(post.pillar)
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-xl border border-border p-6 transition-colors hover:border-accent hover:bg-card"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="text-border">&middot;</span>
                  <span className="rounded-full border border-accent/20 bg-soft-sky px-2 py-0.5 text-accent">
                    {categoryLabels[category] || category}
                  </span>
                  <span className="text-border">&middot;</span>
                  <span>{post.reading_time}</span>
                </div>
                <h2 className="mt-2 text-xl text-foreground">{post.title}</h2>
                <p className="mt-2 text-sm text-muted line-clamp-2">{post.meta_description}</p>
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
