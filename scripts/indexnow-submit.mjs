#!/usr/bin/env node

/**
 * IndexNow Submit Script
 *
 * Fetches the live sitemap, extracts all URLs, and submits them to IndexNow.
 * Run after deploy: node scripts/indexnow-submit.mjs
 * Or with specific URLs: node scripts/indexnow-submit.mjs https://peptidenerds.com/tools/peptide-finder
 */

const SITE_URL = 'https://peptidenerds.com'
const INDEXNOW_KEY = '48bdbf17b3ebed027533188619dbdd5e'
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

async function getUrlsFromSitemap() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`)
  const xml = await res.text()
  const urls = []
  const regex = /<loc>(.*?)<\/loc>/g
  let match
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1])
  }
  return urls
}

async function submitToIndexNow(urls) {
  const payload = {
    host: 'peptidenerds.com',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  }

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  })

  return res.status
}

async function main() {
  const args = process.argv.slice(2)

  let urls
  if (args.length > 0) {
    // Submit specific URLs passed as arguments
    urls = args
    console.log(`Submitting ${urls.length} specific URL(s)...`)
  } else {
    // Fetch all URLs from sitemap
    console.log('Fetching sitemap...')
    urls = await getUrlsFromSitemap()
    console.log(`Found ${urls.length} URLs in sitemap`)
  }

  if (urls.length === 0) {
    console.log('No URLs to submit')
    process.exit(0)
  }

  // Submit in batches of 10,000 (IndexNow limit)
  for (let i = 0; i < urls.length; i += 10000) {
    const batch = urls.slice(i, i + 10000)
    const status = await submitToIndexNow(batch)
    console.log(`Batch ${Math.floor(i / 10000) + 1}: submitted ${batch.length} URLs — IndexNow responded ${status}`)
  }

  console.log('Done.')
}

main().catch((err) => {
  console.error('IndexNow submission failed:', err)
  process.exit(1)
})
