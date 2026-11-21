import {
  CalendarRangeIcon,
  LockKeyholeIcon,
  ShieldCheckIcon,
  WalletIcon,
  type LucideIcon,
} from "lucide-react"

import { SectionHeading } from "@/components/shared/section-heading"

type Benefit = {
  icon: LucideIcon
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    icon: WalletIcon,
    title: "Affordable rental prices",
    description:
      "Find vehicles with transparent, competitive daily rates, so you can compare costs before you book.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Verified vehicle owners",
    description:
      "Rent with confidence from trusted owners whose listings belong to real, verified accounts.",
  },
  {
    icon: CalendarRangeIcon,
    title: "Flexible rental periods",
    description:
      "Choose pickup and return dates that fit your trip, from a single day to a longer stay.",
  },
  {
    icon: LockKeyholeIcon,
    title: "Secure payments",
    description:
      "A safe, secure checkout is part of the plan, designed to keep your booking details protected.",
  },
]

export function WhyAutoHire() {
  return (
    <section
      id="why-auto-hire"
      aria-label="Why Auto-Hire"
      className="scroll-mt-24 border-t border-border/70 bg-muted/20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="About us"
          title="Why Auto-Hire"
          description="Four essentials of renting a car without the guesswork: fair prices, owners you can trust, dates that flex, and payments that feel safe."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {benefits.map(({ icon: Icon, title, description }) => (
            <li key={title}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-colors hover:border-brand/40">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand-strong">
                  <Icon aria-hidden className="size-5" />
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold text-balance">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-pretty text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
