import Image from "next/image"
import {
  CogIcon,
  FuelIcon,
  MapPinIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react"

import { ButtonLink } from "@/components/shared/button-link"
import { categoryLabels } from "@/lib/data/vehicles"
import { formatShortDate, formatUsd } from "@/lib/format"
import type { Vehicle } from "@/lib/types/vehicle"
import { cn } from "@/lib/utils"
import { fuelLabels, transmissionLabels } from "@/lib/vehicle-labels"

type VehicleCardProps = {
  vehicle: Vehicle
  className?: string
}

/**
 * Reusable listing card. Data comes from `lib/data/vehicles.ts` today and
 * from MongoDB later, so the props stay limited to a single `Vehicle`.
 */
export function VehicleCard({ vehicle, className }: VehicleCardProps) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm ring-1 ring-foreground/5 transition-shadow hover:shadow-lg hover:shadow-foreground/5",
        className
      )}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={vehicle.imageUrl}
          alt={vehicle.imageAlt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent"
        />

        <span className="absolute top-3 left-3 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur">
          {categoryLabels[vehicle.category]}
        </span>

        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-background/85 px-2 py-1 text-[11px] font-medium text-foreground backdrop-blur">
          <StarIcon aria-hidden className="size-3 fill-brand text-brand" />
          {vehicle.rating.toFixed(1)}
          <span className="text-muted-foreground">({vehicle.reviewCount})</span>
          <span className="sr-only"> out of 5, illustrative rating</span>
        </span>

        {!vehicle.available ? (
          <span className="absolute bottom-3 left-3 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur">
            {vehicle.availableFrom
              ? `Available from ${formatShortDate(vehicle.availableFrom)}`
              : "Currently unavailable"}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div>
          <h3 className="font-heading text-base leading-snug font-semibold text-balance">
            {vehicle.name}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPinIcon aria-hidden className="size-3.5 shrink-0" />
            {vehicle.location}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <UsersIcon aria-hidden className="size-3.5 shrink-0" />
            {vehicle.seats} seats
          </li>
          <li className="flex items-center gap-1.5">
            <CogIcon aria-hidden className="size-3.5 shrink-0" />
            {transmissionLabels[vehicle.transmission]}
          </li>
          <li className="flex items-center gap-1.5">
            <FuelIcon aria-hidden className="size-3.5 shrink-0" />
            {fuelLabels[vehicle.fuel]}
          </li>
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 pt-1">
          <p className="flex items-baseline gap-1">
            <span className="font-heading text-xl font-semibold">
              {formatUsd(vehicle.pricePerDay)}
            </span>
            <span className="text-xs text-muted-foreground">/ day</span>
          </p>
          <ButtonLink
            href={`/vehicles/${vehicle.id}`}
            variant="outline"
            size="sm"
            className="h-10 px-3.5"
          >
            View details
            <span className="sr-only"> for {vehicle.name}</span>
          </ButtonLink>
        </div>
      </div>
    </article>
  )
}
