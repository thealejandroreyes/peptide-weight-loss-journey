import Link from 'next/link'

export function AuthorBio() {
  return (
    <div className="flex items-center gap-3 text-xs text-muted">
      <div className="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center text-[10px] font-bold text-white">
        FM
      </div>
      <p>
        Reviewed by{' '}
        <Link href="/about" className="text-foreground hover:text-cyan-400">
          Fat Man in the Arena
        </Link>
        {' '}&middot;{' '}
        Updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </p>
    </div>
  )
}
