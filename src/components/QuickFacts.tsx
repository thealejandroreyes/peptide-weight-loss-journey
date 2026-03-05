import type { Peptide } from '@/lib/types'
import { getCategoryLabel, getFdaStatusLabel } from '@/lib/utils'

export function QuickFacts({ peptide }: { peptide: Peptide }) {
  const rows = [
    { label: 'Type', value: getCategoryLabel(peptide.category) },
    { label: 'FDA Status', value: getFdaStatusLabel(peptide.fdaStatus) },
    { label: 'Evidence Level', value: peptide.research.level.charAt(0).toUpperCase() + peptide.research.level.slice(1) },
    { label: 'Typical Dose', value: peptide.dosing.typical },
    { label: 'Frequency', value: peptide.dosing.frequency },
    ...(peptide.dosing.cycleLength ? [{ label: 'Cycle Length', value: peptide.dosing.cycleLength }] : []),
    { label: 'Key Goals', value: peptide.goals.slice(0, 4).join(', ') },
  ]

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <caption className="bg-card px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted border-b border-border">
          Quick Facts
        </caption>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? 'bg-pearl/50' : ''}>
              <td className="px-4 py-2.5 font-medium text-foreground whitespace-nowrap w-[140px]">{row.label}</td>
              <td className="px-4 py-2.5 text-muted">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
