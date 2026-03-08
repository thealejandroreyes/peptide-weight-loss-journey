import { createClient } from '@/lib/supabase/server'

interface ToolSchemaProps {
  name: string
  slug: string
  url: string
  description: string
}

export async function ToolSchema({ name, slug, url, description }: ToolSchemaProps) {
  let ratingValue: number | null = null
  let ratingCount = 0

  try {
    const supabase = await createClient()
    const { data } = await supabase.rpc('get_tool_rating', { p_tool_slug: slug })
    if (data?.ratingCount > 0) {
      ratingValue = parseFloat(data.ratingValue)
      ratingCount = data.ratingCount
    }
  } catch {
    // Schema still renders without rating data
  }

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url: `https://peptidenerds.com${url}`,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description,
  }

  if (ratingValue !== null && ratingCount > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: ratingValue.toFixed(1),
      ratingCount,
      bestRating: '5',
      worstRating: '1',
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
