import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type EmptyStateProps = {
  icon: LucideIcon
  title: string
  description: string
  children?: ReactNode
  className?: string
}

/**
 * Shared empty/zero-result panel. Used by the vehicles catalogue today and
 * reusable for saved searches and bookings later.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  children,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-14 text-center",
        className
      )}
    >
      <div className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand-strong ring-1 ring-brand/20">
        <Icon aria-hidden className="size-6" />
      </div>
      <h2 className="mt-5 font-heading text-xl font-semibold text-balance">
        {title}
      </h2>
      <p className="mt-2 max-w-md text-sm text-pretty text-muted-foreground">
        {description}
      </p>
      {children ? (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">{children}</div>
      ) : null}
    </div>
  )
}
