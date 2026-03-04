import type { Peptide, Comparison, FAQ } from '@/lib/types'

interface ArticleSchemaProps {
  title: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
  image?: string
}

export function ArticleSchema({ title, description, url, datePublished, dateModified, image }: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(image && { image }),
    author: {
      '@type': 'Organization',
      name: 'Peptide Nerds',
      url: 'https://peptidenerds.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Peptide Nerds',
      url: 'https://peptidenerds.com',
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function FAQSchema({ faqs }: { faqs: FAQ[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function MedicalWebPageSchema({
  title,
  description,
  url,
}: {
  title: string
  description: string
  url: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: title,
    description,
    url,
    about: {
      '@type': 'Drug',
      name: title,
    },
    audience: {
      '@type': 'PeopleAudience',
      suggestedMinAge: 18,
    },
    lastReviewed: new Date().toISOString().split('T')[0],
    author: {
      '@type': 'Organization',
      name: 'Peptide Nerds',
      url: 'https://peptidenerds.com/about',
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Peptide Nerds',
    url: 'https://peptidenerds.com',
    sameAs: [],
    description:
      'Evidence-based peptide education. Real research, real experience, no hype.',
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://peptidenerds.com${item.url}`,
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
