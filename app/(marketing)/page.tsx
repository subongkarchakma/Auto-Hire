import { FeaturedVehicles } from "@/components/landing/featured-vehicles"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { VehicleCategories } from "@/components/landing/vehicle-categories"
import { WhyAutoHire } from "@/components/landing/why-auto-hire"
import { SectionHeading } from "@/components/shared/section-heading"
import { siteConfig } from "@/lib/site"

const reservedSections = [
  {
    id: "contact",
    eyebrow: "Contact",
    title: "Talk to the team",
    description:
      "A contact block for questions about listings, rentals, or partnerships.",
  },
]

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyAutoHire />
      <VehicleCategories />
      <FeaturedVehicles />
      <HowItWorks />

      {reservedSections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-24 border-t border-border/70"
        >
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={section.eyebrow}
              title={section.title}
              description={section.description}
            />
            <div className="mt-6 rounded-xl border border-dashed border-border bg-muted/30 p-6 text-sm text-muted-foreground">
              {section.id === "contact" ? (
                <p>
                  Until this section is built, reach us at{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-medium text-brand-strong underline underline-offset-4"
                  >
                    {siteConfig.email}
                  </a>
                  .
                </p>
              ) : (
                <p>
                  This section is reserved and will be built in a later phase.
                </p>
              )}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
