interface QuizStepProps {
  direction: 'forward' | 'backward'
  children: React.ReactNode
}

export function QuizStep({ direction, children }: QuizStepProps) {
  return (
    <div
      className={`mt-6 ${direction === 'forward' ? 'animate-quiz-forward' : 'animate-quiz-backward'}`}
    >
      {children}
    </div>
  )
}
