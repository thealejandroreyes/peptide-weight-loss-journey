export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function getReadingTime(wordCount: number): string {
  const minutes = Math.ceil(wordCount / 200)
  return `${minutes} min read`
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'glp1-weight-loss': 'GLP-1 / Weight Loss',
    'healing-recovery': 'Healing & Recovery',
    'gh-secretagogue': 'Growth Hormone',
    'anti-aging': 'Anti-Aging',
    'nootropic': 'Cognitive',
    'metabolic': 'Metabolic',
    'other': 'Other',
  }
  return labels[category] || category
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'glp1-weight-loss': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'healing-recovery': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'gh-secretagogue': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'anti-aging': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'nootropic': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    'metabolic': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    'other': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  }
  return colors[category] || colors.other
}

export function getFdaStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    'approved': 'FDA Approved',
    'clinical-trials': 'Clinical Trials',
    'research-only': 'Research Only',
  }
  return labels[status] || status
}

export function getFdaStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'approved': 'bg-green-500/10 text-green-400 border-green-500/20',
    'clinical-trials': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    'research-only': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  }
  return colors[status] || colors['research-only']
}
