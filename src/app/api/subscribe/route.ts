import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email } = await request.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  const apiKey = process.env.BEEHIIV_API_KEY
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID

  if (!apiKey || !publicationId) {
    console.error('Beehiiv env vars not configured')
    return NextResponse.json({ error: 'Newsletter service not configured' }, { status: 500 })
  }

  const res = await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      reactivate_existing: true,
      send_welcome_email: true,
      utm_source: 'peptidenerds.com',
      utm_medium: 'website',
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    console.error('Beehiiv API error:', res.status, body)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
