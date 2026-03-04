'use client'

import Link from 'next/link'
import { useState } from 'react'
import { getPeptide } from '@/data/peptides'
import { getComparison } from '@/data/comparisons'
import type { QuizRecommendation } from '@/data/quiz-recommendations'

interface QuizResultsProps {
  recommendation: QuizRecommendation
  answers: {
    goal: string
    level: string
    injection: string
    weightToLose: string | null
  }
  onStartOver: () => void
  onBack: () => void
}

const GOAL_LABELS: Record<string, string> = {
  'weight-loss': 'Weight Loss',
  'healing': 'Healing & Recovery',
  'muscle-growth': 'Muscle Growth',
  'anti-aging': 'Anti-Aging',
  'sleep': 'Sleep',
  'cognitive': 'Cognitive Enhancement',
}

const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const INJECTION_LABELS: Record<string, string> = {
  yes: 'Open to injections',
  no: 'No injections',
  'not-sure': 'Undecided on injections',
}

const WEIGHT_LABELS: Record<string, string> = {
  'under-20': 'Under 20 lbs',
  '20-50': '20-50 lbs',
  'over-50': '50+ lbs',
}

const RESEARCH_BADGE: Record<string, { bg: string; text: string }> = {
  strong: { bg: 'bg-green-100', text: 'text-green-800' },
  moderate: { bg: 'bg-blue-100', text: 'text-blue-800' },
  preliminary: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  anecdotal: { bg: 'bg-gray-100', text: 'text-gray-800' },
}

const FDA_BADGE: Record<string, { label: string; bg: string; text: string }> = {
  approved: { label: 'FDA Approved', bg: 'bg-green-100', text: 'text-green-800' },
  'clinical-trials': { label: 'Clinical Trials', bg: 'bg-blue-100', text: 'text-blue-800' },
  'research-only': { label: 'Research Only', bg: 'bg-yellow-100', text: 'text-yellow-800' },
}

function findComparisonSlug(slugA: string, slugB: string): string | null {
  const try1 = `${slugA}-vs-${slugB}`
  if (getComparison(try1)) return try1
  const try2 = `${slugB}-vs-${slugA}`
  if (getComparison(try2)) return try2
  return null
}

export function QuizResults({
  recommendation,
  answers,
  onStartOver,
  onBack,
}: QuizResultsProps) {
  const [copied, setCopied] = useState(false)

  const peptideData = recommendation.peptides.map((rec) => ({
    ...rec,
    data: getPeptide(rec.slug),
  }))

  // Find comparison page for first two recommended peptides
  let comparisonSlug: string | null = null
  if (recommendation.peptides.length >= 2) {
    comparisonSlug = findComparisonSlug(
      recommendation.peptides[0].slug,
      recommendation.peptides[1].slug
    )
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API not available
    }
  }

  return (
    <div className="animate-quiz-forward">
      {/* Back button */}
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back
      </button>

      {/* Answer summary chips */}
      <div className="mb-6 flex flex-wrap gap-2">
        <span className="rounded-full bg-soft-sky/40 px-3 py-1 text-xs font-medium text-accent">
          {GOAL_LABELS[answers.goal] || answers.goal}
        </span>
        <span className="rounded-full bg-soft-sky/40 px-3 py-1 text-xs font-medium text-accent">
          {LEVEL_LABELS[answers.level] || answers.level}
        </span>
        <span className="rounded-full bg-soft-sky/40 px-3 py-1 text-xs font-medium text-accent">
          {INJECTION_LABELS[answers.injection] || answers.injection}
        </span>
        {answers.weightToLose && (
          <span className="rounded-full bg-soft-sky/40 px-3 py-1 text-xs font-medium text-accent">
            {WEIGHT_LABELS[answers.weightToLose] || answers.weightToLose}
          </span>
        )}
      </div>

      <h2 className="mb-6 text-2xl">Your Recommended Peptides</h2>

      {/* Contextual note */}
      {recommendation.note && (
        <div className="mb-6 rounded-xl border border-warm-sand bg-[#FEF9EC] p-4">
          <p className="text-sm text-[#6B5A40]">{recommendation.note}</p>
        </div>
      )}

      {/* Peptide result cards */}
      <div className="space-y-4">
        {peptideData.map(({ slug, whyRecommended, data }) => {
          if (!data) return null
          const fda = FDA_BADGE[data.fdaStatus]
          const research = RESEARCH_BADGE[data.research.level]

          return (
            <div key={slug} className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-xl">{data.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {fda && (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${fda.bg} ${fda.text}`}
                    >
                      {fda.label}
                    </span>
                  )}
                  {research && (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${research.bg} ${research.text}`}
                    >
                      {data.research.level} research
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-2 text-sm leading-relaxed text-muted">
                {data.description.split('. ').slice(0, 2).join('. ') + '.'}
              </p>

              <div className="mt-3 rounded-lg bg-soft-sky/20 p-3">
                <p className="text-sm font-medium text-accent">Why recommended</p>
                <p className="mt-1 text-sm text-foreground">{whyRecommended}</p>
              </div>

              <div className="mt-4">
                <Link
                  href={`/peptides/${slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                >
                  View full profile
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex flex-wrap gap-3">
        {comparisonSlug && (
          <Link
            href={`/compare/${comparisonSlug}`}
            className="rounded-full bg-cta px-5 py-2.5 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta-hover"
          >
            Compare These Peptides
          </Link>
        )}
        <button
          onClick={handleShare}
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          {copied ? 'Link Copied!' : 'Share Results'}
        </button>
        <button
          onClick={onStartOver}
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
        >
          Start Over
        </button>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 rounded-xl border border-warm-sand bg-[#FEF9EC] p-4">
        <p className="text-xs text-[#6B5A40]">
          These recommendations are based on published research and community
          experience. Individual results vary. Some peptides listed are research
          compounds not approved for human use. Always consult with a healthcare
          provider before beginning any peptide protocol.
        </p>
      </div>
    </div>
  )
}
