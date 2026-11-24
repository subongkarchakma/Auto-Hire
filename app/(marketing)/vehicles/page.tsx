import type { Metadata } from "next"
import { CarFrontIcon, SearchXIcon } from "lucide-react"

import { ButtonLink } from "@/components/shared/button-link"
import { EmptyState } from "@/components/shared/empty-state"
import {
  VehicleFilters,
  type VehicleFilterState,
} from "@/components/vehicles/vehicle-filters"
import { VehicleGrid } from "@/components/vehicles/vehicle-grid"
import {
  filterVehicles,
  priceRange,
  vehicleCategories,
  vehicleLocations,
  vehicles,
} from "@/lib/data/vehicles"
import type { VehicleCategory } from "@/lib/types/vehicle"

export const metadata: Metadata = {
  title: "Browse vehicles",
  description:
    "Browse illustrative Auto-Hire listings, filter by body type, location, daily price, and availability.",
}

const categoryValues = vehicleCategories.map((category) => category.value)

function readParam(
  params: Record<string, string | string[] | undefined>,
  key: string
) {
  const value = params[key]

  return typeof value === "string" ? value : undefined
}

function parseCategory(value?: string): VehicleCategory | "any" {
  return categoryValues.includes(value as VehicleCategory)
    ? (value as VehicleCategory)
    : "any"
}

function parseMaxPrice(value?: string) {
  const parsed = Number(value)

  return Number.isFinite(parsed) && parsed > 0 ? parsed : null
}

function parseFilters(
  params: Record<string, string | string[] | undefined>
): VehicleFilterState {
  const location = readParam(params, "location")

  return {
    query: readParam(params, "q")?.slice(0, 80) ?? "",
    category: parseCategory(readParam(params, "category")),
    location:
      location && vehicleLocations.includes(location) ? location : "any",
    maxPrice: parseMaxPrice(readParam(params, "maxPrice")),
    availableOnly: readParam(params, "available") === "1",
  }
}

type VehiclesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function VehiclesPage({
  searchParams,
}: VehiclesPageProps) {
  const filters = parseFilters(await searchParams)

  const results = filterVehicles(vehicles, {
    query: filters.query,
    category: filters.category,
    location: filters.location,
    maxPrice: filters.maxPrice ?? undefined,
    availableOnly: filters.availableOnly,
  })

  const hasFilters =
    filters.query !== "" ||
    filters.category !== "any" ||
    filters.location !== "any" ||
    filters.maxPrice !== null ||
    filters.availableOnly

  const priceOptions = [75, 125, 200].filter(
    (value) => value >= priceRange.min && value <= priceRange.max
  )

  return (
    <>
      <section className="border-b border-border/70 bg-muted/20">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex max-w-2xl flex-col gap-3">
            <span className="text-xs font-semibold tracking-[0.18em] text-brand-strong uppercase">
              Browse
            </span>
            <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Find your next drive
            </h1>
            <p className="text-base text-pretty text-muted-foreground">
              Filter the catalogue by body type, pickup city, daily price, and
              availability. Every listing is illustrative demo data.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-label="Vehicle results"
        className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
      >
        <VehicleFilters
          initial={filters}
          categories={vehicleCategories.map(({ value, label }) => ({
            value,
            label,
          }))}
          locations={vehicleLocations}
          priceOptions={priceOptions}
        />

        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3">
          <p aria-live="polite" className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {results.length === 1
                ? "1 vehicle"
                : `${results.length} vehicles`}
            </span>{" "}
            {hasFilters
              ? results.length === 1
                ? "matches your filters"
                : "match your filters"
              : "in the catalogue"}
          </p>
          <p className="text-xs text-muted-foreground">
            Prices are per day, before fees
          </p>
        </div>

        {vehicles.length === 0 ? (
          <EmptyState
            icon={CarFrontIcon}
            title="No vehicles listed yet"
            description="The catalogue is empty right now. Check back soon, or get in touch if you would like to list a vehicle."
            className="mt-5"
          >
            <ButtonLink href="/#contact" variant="brand">
              Contact Auto-Hire
            </ButtonLink>
          </EmptyState>
        ) : results.length === 0 ? (
          <EmptyState
            icon={SearchXIcon}
            title="No vehicles match those filters"
            description="Try a different body type, widen the price range, or clear the filters to see the full catalogue."
            className="mt-5"
          >
            <ButtonLink href="/vehicles" variant="brand">
              Clear filters
            </ButtonLink>
            <ButtonLink href="/how-it-works" variant="outline">
              How it works
            </ButtonLink>
          </EmptyState>
        ) : (
          <VehicleGrid vehicles={results} className="mt-5" />
        )}
      </section>
    </>
  )
}
