import {
  CalendarClockIcon,
  MessagesSquareIcon,
  ReceiptTextIcon,
  ShieldCheckIcon,
  type LucideIcon,
} from "lucide-react"

type Benefit = {
  icon: LucideIcon
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    icon: ShieldCheckIcon,
    title: "Verified owners",
    description: "Listings belong to owner accounts, not anonymous posts.",
  },
  {
    icon: ReceiptTextIcon,
    title: "Transparent pricing",
    description: "Daily rates are shown before you request a booking.",
  },
  {
    icon: CalendarClockIcon,
    title: "Clear cancellation",
    description: "Cancellation windows are stated up front, not buried.",
  },
  {
    icon: MessagesSquareIcon,
    title: "Support that answers",
    description: "Questions reach a person, with replies in one place.",
  },
]

export function TrustStrip() {
  return (
    <section
      aria-labelledby="trust-strip-heading"
      className="border-y border-border/70 bg-muted/20"
    >
      <h2 id="trust-strip-heading" className="sr-only">
        Why rent with Auto-Hire
      </h2>
      <ul className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {benefits.map(({ icon: Icon, title, description }) => (
          <li key={title} className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-strong">
              <Icon aria-hidden className="size-5" />
            </span>
            <div>
              <p className="font-heading text-sm font-semibold">{title}</p>
              <p className="mt-1 text-sm text-pretty text-muted-foreground">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
