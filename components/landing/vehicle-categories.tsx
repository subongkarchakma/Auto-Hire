import Link from "next/link"
import {
  CarFrontIcon,
  CarIcon,
  CrownIcon,
  VanIcon,
  WindIcon,
  ZapIcon,
  type LucideIcon,
} from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import { vehicleCategories } from "@/lib/data/vehicles"
import type { VehicleCategory } from "@/lib/types/vehicle"

const categoryIcons: Record<VehicleCategory, LucideIcon> = {
  suv: CarFrontIcon,
  sedan: CarIcon,
  luxury: CrownIcon,
  electric: ZapIcon,
  van: VanIcon,
  convertible: WindIcon,
}

/** Presentational category shortcuts; filtering arrives with the vehicles page. */
export function VehicleCategories() {
  return (
    <section
      aria-label="Browse by category"
      className="border-t border-border/70"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Browse by type"
          title="Pick your category"
          description="From practical SUVs to open-top weekend cars, start with the shape of the trip you have in mind."
        />

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {vehicleCategories.map(({ value, label, blurb }, index) => {
            const Icon = categoryIcons[value]

            return (
              <li key={value} className="h-full">
                <Reveal
                  once={false}
                  delay={index * 0.13}
                  scale={0.96}
                  amount={0.25}
                  className="h-full"
                >
                  <Link
                    href="/vehicles"
                    className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-border/70 bg-card p-4 text-center shadow-sm ring-1 ring-foreground/5 transition-colors outline-none hover:border-brand/50 hover:bg-brand-soft/40 focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-strong transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                      <Icon aria-hidden className="size-6" />
                    </span>
                    <span className="font-heading text-sm font-semibold">
                      {label}
                    </span>
                    <span className="text-[11px] leading-snug text-pretty text-muted-foreground">
                      {blurb}
                    </span>
                  </Link>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
