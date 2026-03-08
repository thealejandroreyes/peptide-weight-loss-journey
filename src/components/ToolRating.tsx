'use client'

import { useState, useEffect } from 'react'

interface ToolRatingProps {
  toolSlug: string
  initialRating?: number
  initialCount?: number
}

function generateFingerprint(): string {
  const nav = window.navigator
  const raw = [nav.language, nav.hardwareConcurrency, screen.width, screen.height, new Date().getTimezoneOffset()].join('|')
  let hash = 0
  for (let i = 0; i < raw.length; i++) {
    hash = (hash << 5) - hash + raw.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash).toString(36)
}

export function ToolRating({ toolSlug, initialRating, initialCount }: ToolRatingProps) {
  const [hoveredStar, setHoveredStar] = useState(0)
  const [userRating, setUserRating] = useState(0)
  const [avgRating, setAvgRating] = useState(initialRating ?? 0)
  const [count, setCount] = useState(initialCount ?? 0)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(`tool-rating-${toolSlug}`)
    if (stored) {
      setUserRating(parseInt(stored, 10))
      setSubmitted(true)
    }
  }, [toolSlug])

  async function submitRating(rating: number) {
    setUserRating(rating)
    setSubmitted(true)
    localStorage.setItem(`tool-rating-${toolSlug}`, String(rating))

    try {
      await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: toolSlug, rating, fingerprint: generateFingerprint() }),
      })
      const res = await fetch(`/api/ratings?tool=${toolSlug}`)
      const data = await res.json()
      if (data.ratingValue) {
        setAvgRating(parseFloat(data.ratingValue))
        setCount(data.ratingCount)
      }
    } catch {
      // Silently fail -- rating is saved locally
    }
  }

  return (
    <div className="mt-6 flex items-center gap-3 text-sm">
      <div className="flex items-center gap-0.5" role="radiogroup" aria-label="Rate this tool">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = hoveredStar ? star <= hoveredStar : star <= (userRating || Math.round(avgRating))
          return (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={star === userRating}
              aria-label={`${star} star${star > 1 ? 's' : ''}`}
              className={`cursor-pointer p-0.5 transition-colors ${
                filled ? 'text-cta' : 'text-border'
              } ${submitted ? 'cursor-default' : 'hover:text-cta-hover'}`}
              onMouseEnter={() => !submitted && setHoveredStar(star)}
              onMouseLeave={() => !submitted && setHoveredStar(0)}
              onClick={() => !submitted && submitRating(star)}
              disabled={submitted}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          )
        })}
      </div>
      <span className="text-muted">
        {count > 0 ? (
          <>
            {avgRating.toFixed(1)} ({count} rating{count !== 1 ? 's' : ''})
          </>
        ) : submitted ? (
          'Thanks for rating!'
        ) : (
          'Rate this tool'
        )}
      </span>
    </div>
  )
}
