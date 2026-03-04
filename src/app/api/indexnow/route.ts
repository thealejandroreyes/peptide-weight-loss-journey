import { NextRequest, NextResponse } from 'next/server'

const INDEXNOW_KEY = 'peptidenerds-indexnow'
const SITE_URL = 'https://peptidenerds.com'
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`

// IndexNow endpoints — Bing shares with Yandex, Naver, Seznam
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

export async function POST(request: NextRequest) {
  // Simple auth via secret header to prevent abuse
  const authHeader = request.headers.get('x-indexnow-secret')
  const secret = process.env.INDEXNOW_SECRET

  if (secret && authHeader !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const urls: string[] = body.urls

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'urls array required' }, { status: 400 })
    }

    // Cap at 10,000 per IndexNow spec
    const batch = urls.slice(0, 10000)

    const payload = {
      host: 'peptidenerds.com',
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: batch,
    }

    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    })

    return NextResponse.json({
      success: true,
      submitted: batch.length,
      indexNowStatus: response.status,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit', detail: String(error) },
      { status: 500 }
    )
  }
}
