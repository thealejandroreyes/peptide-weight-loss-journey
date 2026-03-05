import type { MetadataRoute } from 'next'
import { getAllSlugs } from '@/data/peptides'
import { getAllComparisonSlugs } from '@/data/comparisons'
import { getAllGoalSlugs } from '@/data/goals'
import { getAllStackSlugs } from '@/data/stacks'
import { getAllPillarSlugs } from '@/data/pillars'
import { getAllPosts } from '@/lib/blog'

const BASE_URL = 'https://peptidenerds.com'

// Use a stable date for content that doesn't change on every build.
// Update this when compound data or site structure changes meaningfully.
const CONTENT_LAST_REVIEWED = '2026-03-04T00:00:00.000Z'
const TOOLS_LAST_UPDATED = '2026-03-04T00:00:00.000Z'
const TRUST_PAGES_DATE = '2026-03-01T00:00:00.000Z'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: CONTENT_LAST_REVIEWED, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/peptides`, lastModified: CONTENT_LAST_REVIEWED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/compare`, lastModified: CONTENT_LAST_REVIEWED, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/goals`, lastModified: CONTENT_LAST_REVIEWED, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/stacks`, lastModified: CONTENT_LAST_REVIEWED, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: CONTENT_LAST_REVIEWED, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/tools/dosage-calculator`, lastModified: TOOLS_LAST_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/tools/reconstitution-calculator`, lastModified: TOOLS_LAST_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/tools/bac-water-calculator`, lastModified: TOOLS_LAST_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/tools/peptide-finder`, lastModified: TOOLS_LAST_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/tools`, lastModified: TOOLS_LAST_UPDATED, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/tracker`, lastModified: TOOLS_LAST_UPDATED, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/peptides-weight-loss-guide`, lastModified: CONTENT_LAST_REVIEWED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/glp-1-peptides`, lastModified: CONTENT_LAST_REVIEWED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/start-here`, lastModified: CONTENT_LAST_REVIEWED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: TRUST_PAGES_DATE, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/about`, lastModified: CONTENT_LAST_REVIEWED, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/about/editorial-team`, lastModified: CONTENT_LAST_REVIEWED, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/disclaimer`, lastModified: TRUST_PAGES_DATE, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/editorial-policy`, lastModified: TRUST_PAGES_DATE, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/affiliate-disclosure`, lastModified: TRUST_PAGES_DATE, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: TRUST_PAGES_DATE, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Peptide pages (main + sub-pages)
  const peptideSlugs = getAllSlugs()
  const subPages = ['benefits', 'dosage', 'side-effects', 'faq'] as const

  const peptidePages: MetadataRoute.Sitemap = peptideSlugs.map((slug) => ({
    url: `${BASE_URL}/peptides/${slug}`,
    lastModified: CONTENT_LAST_REVIEWED,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const peptideSubPages: MetadataRoute.Sitemap = peptideSlugs.flatMap((slug) =>
    subPages.map((sub) => ({
      url: `${BASE_URL}/peptides/${slug}/${sub}`,
      lastModified: CONTENT_LAST_REVIEWED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  // Comparison pages
  const comparisonPages: MetadataRoute.Sitemap = getAllComparisonSlugs().map((slug) => ({
    url: `${BASE_URL}/compare/${slug}`,
    lastModified: CONTENT_LAST_REVIEWED,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Goal pages
  const goalPages: MetadataRoute.Sitemap = getAllGoalSlugs().map((slug) => ({
    url: `${BASE_URL}/goals/${slug}`,
    lastModified: CONTENT_LAST_REVIEWED,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Stack pages
  const stackPages: MetadataRoute.Sitemap = getAllStackSlugs().map((slug) => ({
    url: `${BASE_URL}/stacks/${slug}`,
    lastModified: CONTENT_LAST_REVIEWED,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Blog posts — use actual post dates
  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date).toISOString() : CONTENT_LAST_REVIEWED,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Pillar pages
  const pillarPages: MetadataRoute.Sitemap = getAllPillarSlugs().map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: CONTENT_LAST_REVIEWED,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...pillarPages, ...peptidePages, ...peptideSubPages, ...comparisonPages, ...goalPages, ...stackPages, ...blogPages]
}
