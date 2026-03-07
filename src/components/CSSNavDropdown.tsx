import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface NavDropdownItem {
  name: string
  href: string
  description?: string
}

export interface NavDropdownSection {
  title: string
  items: NavDropdownItem[]
}

export interface CSSNavDropdownProps {
  label: string
  sections: NavDropdownSection[]
  footerLink?: { label: string; href: string }
  isActive?: boolean
}

export function CSSNavDropdown({ label, sections, footerLink, isActive }: CSSNavDropdownProps) {
  const totalItems = sections.reduce((sum, s) => sum + s.items.length, 0)
  const useTwoColumns = sections.length > 1 && totalItems > 5

  return (
    <div className="group relative">
      <button
        className={cn(
          'flex items-center gap-1 text-sm transition-colors',
          isActive ? 'text-cta' : 'text-white/75 hover:text-white'
        )}
        aria-haspopup="true"
      >
        {label}
        <svg
          className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <div
        className={cn(
          'invisible absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 rounded-xl border border-border bg-card opacity-0 shadow-lg transition-all duration-150 ease-out',
          'group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100',
          useTwoColumns ? 'w-[520px]' : 'w-[280px]'
        )}
        role="menu"
      >
        <div className={cn('p-4', useTwoColumns && 'grid grid-cols-2 gap-4')}>
          {sections.map((section) => (
            <div key={section.title}>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                {section.title}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-lg px-3 py-2 transition-colors hover:bg-card-hover"
                      role="menuitem"
                    >
                      <span className="text-sm font-medium text-foreground">{item.name}</span>
                      {item.description && (
                        <span className="mt-0.5 block text-xs text-muted">{item.description}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {footerLink && (
          <div className="border-t border-border px-4 py-3">
            <Link
              href={footerLink.href}
              className="text-xs font-medium text-accent transition-colors hover:text-accent-hover"
              role="menuitem"
            >
              {footerLink.label}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
