import { ArrowRightIcon, CheckIcon, type LucideIcon } from "lucide-react"

import { ButtonLink } from "@/components/shared/button-link"
import { Badge } from "@/components/ui/badge"

type PlaceholderPageProps = {
  icon: LucideIcon
  badge?: string
  title: string
  description: string
  bullets?: string[]
  primary: { label: string; href: string }
  ghost: { label: string; href: string }
}

/**
 * Shared shell for routes that are intentionally not built yet.
 * Uses the same tokens and typography as the landing page so the
 * transition into real pages later is purely additive.
 */
export function PlaceholderPage({
  icon: Icon,
  badge = "Coming soon",
  title,
  description,
  bullets,
  primary,
  ghost,
}: PlaceholderPageProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-112 bg-[radial-gradient(55%_60%_at_50%_0%,var(--brand-soft),transparent_70%)]"
      />
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
        <Badge
          variant="outline"
          className="border-brand/30 bg-brand-soft px-2.5 text-brand-strong"
        >
          {badge}
        </Badge>

        <div className="mt-6 grid size-14 place-items-center rounded-2xl bg-brand-soft text-brand-strong ring-1 ring-brand/20">
          <Icon aria-hidden className="size-7" />
        </div>

        <h1 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-base text-pretty text-muted-foreground">
          {description}
        </p>

        {bullets?.length ? (
          <ul className="mt-8 grid w-full max-w-lg gap-2 text-left text-sm text-muted-foreground sm:grid-cols-2">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2 rounded-lg bg-muted/40 px-3 py-2"
              >
                <CheckIcon
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-brand-strong"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <ButtonLink href={primary.href} variant="brand" size="xl">
            {primary.label}
            <ArrowRightIcon aria-hidden />
          </ButtonLink>
          <ButtonLink href={ghost.href} variant="outline" size="xl">
            {ghost.label}
          </ButtonLink>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          Placeholder page — this feature ships in a later milestone.
        </p>
      </div>
    </section>
  )
}
