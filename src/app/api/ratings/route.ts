import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const VALID_TOOLS = [
  'dosage-calculator',
  'stack-builder',
  'cost-calculator',
  'bac-water-calculator',
  'blood-level-plotter',
  'reconstitution-calculator',
  'tracker',
]

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('tool')
  const supabase = await createClient()

  if (slug) {
    const { data, error } = await supabase.rpc('get_tool_rating', { p_tool_slug: slug })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  }

  const { data, error } = await supabase.rpc('get_all_tool_ratings')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { tool, rating, fingerprint } = body

  if (!tool || !VALID_TOOLS.includes(tool)) {
    return NextResponse.json({ error: 'Invalid tool' }, { status: 400 })
  }
  if (!rating || rating < 1 || rating > 5 || !Number.isInteger(rating)) {
    return NextResponse.json({ error: 'Rating must be 1-5' }, { status: 400 })
  }
  if (!fingerprint || typeof fingerprint !== 'string') {
    return NextResponse.json({ error: 'Missing fingerprint' }, { status: 400 })
  }

  const supabase = await createClient()
  const { error } = await supabase.from('tool_ratings').upsert(
    { tool_slug: tool, rating, fingerprint },
    { onConflict: 'tool_slug,fingerprint' }
  )

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
