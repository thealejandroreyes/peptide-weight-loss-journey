interface QuizOptionProps {
  label: string
  description: string
  selected: boolean
  onClick: () => void
}

export function QuizOption({ label, description, selected, onClick }: QuizOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border p-4 text-left transition-all ${
        selected
          ? 'border-accent bg-soft-sky/30'
          : 'border-border bg-card hover:border-accent/50 hover:bg-card-hover'
      }`}
    >
      <p className="font-medium text-foreground">{label}</p>
      <p className="mt-1 text-sm text-muted">{description}</p>
    </button>
  )
}
