interface QuizProgressProps {
  currentStep: number
  totalSteps: number
}

export function QuizProgress({ currentStep, totalSteps }: QuizProgressProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`h-2 w-2 rounded-full transition-colors ${
            i === currentStep
              ? 'bg-accent'
              : i < currentStep
                ? 'bg-accent/60'
                : 'bg-border'
          }`}
        />
      ))}
    </div>
  )
}
