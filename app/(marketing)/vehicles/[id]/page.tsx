import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react"

import { VehicleBookingCard } from "@/components/vehicles/vehicle-booking-card"
import { VehicleGallery } from "@/components/vehicles/vehicle-gallery"
import { VehicleGrid } from "@/components/vehicles/vehicle-grid"
import { VehicleOwnerCard } from "@/components/vehicles/vehicle-owner-card"
import { VehicleSpecs } from "@/components/vehicles/vehicle-specs"
import { VehicleTerms } from "@/components/vehicles/vehicle-terms"
import { Badge } from "@/components/ui/badge"
import { requireSession } from "@/lib/auth/session"
import {
  categoryLabels,
  getRelatedVehicles,
  getVehicleById,
} from "@/lib/data/vehicles"
import { formatShortDate } from "@/lib/format"

type VehiclePageProps = {
  params: Promise<{ id: string }>
}

function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="font-heading text-xl font-semibold tracking-tight sm:text-2xl"
    >
      {children}
    </h2>
  )
}

export async function generateMetadata({
  params,
}: VehiclePageProps): Promise<Metadata> {
  const { id } = await params
  const vehicle = getVehicleById(id)

  if (!vehicle) {
    return { title: "Vehicle not found" }
  }

  return {
    title: `${vehicle.name} (${vehicle.year})`,
    description: vehicle.description,
  }
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { id } = await params

  // Authoritative check: the proxy only sees the cookie, so verify the
  // session here and fail closed if the auth service cannot be reached.
  await requireSession(`/vehicles/${id}`)

  const vehicle = getVehicleById(id)

  if (!vehicle) {
    notFound()
  }

  const images = [
    { src: vehicle.imageUrl, alt: vehicle.imageAlt },
    ...vehicle.galleryImages.map((src, index) => ({
      src,
      alt: `${vehicle.name}, additional photo ${index + 2}`,
    })),
  ]

  const related = getRelatedVehicles(vehicle)

  return (
    <>
      <section className="border-b border-border/70 bg-muted/20">
        <div className="mx-auto w-full max-w-7xl px-4 pt-6 pb-10 sm:px-6 lg:px-8">
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon aria-hidden className="size-4" />
            All vehicles
          </Link>

          <div className="mt-5 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="border-brand/30 bg-brand-soft text-brand-strong"
              >
                {categoryLabels[vehicle.category]}
              </Badge>
              <Badge variant="outline">{vehicle.year}</Badge>
              <Badge variant={vehicle.available ? "secondary" : "outline"}>
                {vehicle.available
                  ? "Available now"
                  : vehicle.availableFrom
                    ? `Available from ${formatShortDate(vehicle.availableFrom)}`
                    : "Currently unavailable"}
              </Badge>
            </div>

            <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {vehicle.name}
            </h1>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPinIcon aria-hidden className="size-4" />
                {vehicle.location}
              </span>
              <span className="flex items-center gap-1.5">
                <StarIcon
                  aria-hidden
                  className="size-4 fill-brand text-brand"
                />
                {vehicle.rating.toFixed(1)}
                <span className="text-muted-foreground">
                  ({vehicle.reviewCount} reviews)
                </span>
                <span className="sr-only">illustrative rating</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:items-start">
          <div className="flex flex-col gap-10">
            <VehicleGallery images={images} />

            <section aria-labelledby="overview-heading">
              <SectionTitle id="overview-heading">
                About this vehicle
              </SectionTitle>
              <p className="mt-3 text-base text-pretty text-muted-foreground">
                {vehicle.description}
              </p>

              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {vehicle.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 rounded-lg bg-muted/40 px-3 py-2 text-sm"
                  >
                    <CheckIcon
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-brand-strong"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="specs-heading">
              <SectionTitle id="specs-heading">Vehicle specs</SectionTitle>
              <div className="mt-4 rounded-2xl border border-border/70 bg-card p-5 ring-1 ring-foreground/5">
                <VehicleSpecs vehicle={vehicle} />
              </div>
            </section>

            <section aria-labelledby="owner-heading">
              <SectionTitle id="owner-heading">Your host</SectionTitle>
              <div className="mt-4">
                <VehicleOwnerCard owner={vehicle.owner} />
              </div>
            </section>

            <section aria-labelledby="terms-heading">
              <SectionTitle id="terms-heading">Rental terms</SectionTitle>
              <div className="mt-4">
                <VehicleTerms vehicle={vehicle} />
              </div>
            </section>
          </div>

          <div className="lg:sticky lg:top-24">
            <VehicleBookingCard vehicle={vehicle} />
          </div>
        </div>

        {related.length > 0 ? (
          <section
            aria-labelledby="related-heading"
            className="mt-16 border-t border-border/70 pt-10"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionTitle id="related-heading">
                More vehicles to consider
              </SectionTitle>
              <Link
                href="/vehicles"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-strong transition-colors hover:text-foreground"
              >
                Browse all vehicles
                <ArrowRightIcon aria-hidden className="size-4" />
              </Link>
            </div>

            <VehicleGrid vehicles={related} className="mt-6" />
          </section>
        ) : null}
      </section>
    </>
  )
}
