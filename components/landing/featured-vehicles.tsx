import { ArrowRightIcon } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/shared/button-link"
import { SectionHeading } from "@/components/shared/section-heading"
import { VehicleCard } from "@/components/vehicles/vehicle-card"
import { featuredVehicles } from "@/lib/data/vehicles"

/**
 * Featured listings. Mock data for now; later phases will replace this with
 * approved vehicles from MongoDB (`.limit(6)`).
 */
export function FeaturedVehicles() {
  return (
    <section
      aria-label="Featured vehicles"
      className="border-t border-border/70 bg-muted/20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured"
            title="Featured vehicles"
            description="Six sample listings from the catalogue, ready for your next trip."
          />
          <ButtonLink href="/vehicles" variant="outline">
            Browse all vehicles
            <ArrowRightIcon aria-hidden />
          </ButtonLink>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Sample listings — vehicles, prices, ratings, and review counts are
          illustrative.
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredVehicles.map((vehicle, index) => (
            <li key={vehicle.id} className="h-full">
              <Reveal
                once={false}
                delay={index * 0.14}
                scale={0.97}
                amount={0.25}
                className="h-full"
              >
                <VehicleCard vehicle={vehicle} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
