import {
  CalendarCheckIcon,
  KeyRoundIcon,
  SearchIcon,
  type LucideIcon,
} from "lucide-react"

import { SectionHeading } from "@/components/shared/section-heading"

type Step = {
  icon: LucideIcon
  title: string
  description: string
}

const steps: Step[] = [
  {
    icon: SearchIcon,
    title: "Find Your Car",
    description:
      "Browse available vehicles and choose the one that fits your trip.",
  },
  {
    icon: CalendarCheckIcon,
    title: "Book Your Ride",
    description: "Select your rental dates and submit your booking request.",
  },
  {
    icon: KeyRoundIcon,
    title: "Enjoy the Journey",
    description: "Get ready for your trip and enjoy your rental.",
  },
]

/** Customer rental journey in three steps. Purely presentational. */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-label="How Auto-Hire works"
      className="scroll-mt-24 border-t border-border/70"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="Rent in three simple steps"
          description="Browse approved vehicles, pick your dates, and get ready for the road — from search to keys without the guesswork."
        />

        <div className="relative mx-auto mt-12 max-w-5xl">
          <div
            aria-hidden
            className="absolute inset-x-[16.67%] top-7 hidden border-t border-dashed border-border md:block"
          />

          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map(({ icon: Icon, title, description }, index) => (
              <li
                key={title}
                className="relative flex flex-col items-center gap-4 text-center"
              >
                <span className="relative grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand-strong ring-1 ring-brand/15">
                  <Icon aria-hidden className="size-6" />
                  <span className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-brand text-[11px] font-semibold text-brand-foreground">
                    {index + 1}
                  </span>
                </span>

                <div className="max-w-xs">
                  <h3 className="font-heading text-lg font-semibold text-balance">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-pretty text-muted-foreground">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
