import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-32 text-center">
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <p className="mt-4 text-lg text-muted">This page does not exist.</p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-cyan-500 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-cyan-400"
        >
          Go home
        </Link>
        <Link
          href="/peptides"
          className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-cyan-500/30 hover:text-cyan-400"
        >
          Browse peptides
        </Link>
      </div>
    </div>
  )
}
