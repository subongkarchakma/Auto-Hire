"use client"

import { useState } from "react"
import { CalendarDaysIcon, MapPinIcon } from "lucide-react"
import { toast } from "sonner"

import { ButtonLink } from "@/components/shared/button-link"
import { Button } from "@/components/ui/button"
import { formatShortDate, formatUsd } from "@/lib/format"
import type { RentalType, Vehicle } from "@/lib/types/vehicle"
import { cn } from "@/lib/utils"
import { rentalTypeLabels } from "@/lib/vehicle-labels"

const rentalTypeSuffix: Record<RentalType, string> = {
  daily: "/ day",
  weekly: "/ week",
  monthly: "/ month",
}

const rentalTypeDays: Record<RentalType, number> = {
  daily: 1,
  weekly: 7,
  monthly: 30,
}

type VehicleBookingCardProps = {
  vehicle: Vehicle
}

/**
 * Sticky price and rental-action panel. Booking itself is out of scope for
 * this milestone, so the primary action explains that instead of pretending
 * to reserve anything.
 */
export function VehicleBookingCard({ vehicle }: VehicleBookingCardProps) {
  const [rentalType, setRentalType] = useState<RentalType>(
    vehicle.rentalTypes[0] ?? "daily"
  )

  const prices: Record<RentalType, number> = {
    daily: vehicle.pricePerDay,
    weekly: vehicle.pricePerWeek,
    monthly: vehicle.pricePerMonth,
  }

  const price = prices[rentalType]
  const perDayEquivalent = Math.round(price / rentalTypeDays[rentalType])

  const availabilityLabel = vehicle.available
    ? "Available now"
    : vehicle.availableFrom
      ? `Available from ${formatShortDate(vehicle.availableFrom)}`
      : "Currently unavailable"

  function handleReserve() {
    toast("Booking opens in a later milestone", {
      description:
        "This preview covers browsing and vehicle details only. No payment or reservation is taken.",
    })
  }

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm ring-1 ring-foreground/5 sm:p-6">
      <p className="text-xs font-medium text-muted-foreground">From</p>
      <p className="mt-1 flex items-baseline gap-1.5">
        <span className="font-heading text-3xl font-semibold">
          {formatUsd(price)}
        </span>
        <span className="text-sm text-muted-foreground">
          {rentalTypeSuffix[rentalType]}
        </span>
      </p>
      {rentalType !== "daily" ? (
        <p className="mt-1 text-xs text-muted-foreground">
          About {formatUsd(perDayEquivalent)} per day
        </p>
      ) : null}

      <div
        role="group"
        aria-label="Rental type"
        className="mt-4 flex gap-1 rounded-lg bg-muted p-1"
      >
        {vehicle.rentalTypes.map((type) => {
          const active = type === rentalType

          return (
            <button
              key={type}
              type="button"
              aria-pressed={active}
              onClick={() => setRentalType(type)}
              className={cn(
                "flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {rentalTypeLabels[type]}
            </button>
          )
        })}
      </div>

      <dl className="mt-5 flex flex-col gap-3 text-sm">
        <div className="flex items-start gap-2">
          <CalendarDaysIcon
            aria-hidden
            className="mt-0.5 size-4 shrink-0 text-muted-foreground"
          />
          <div>
            <dt className="sr-only">Availability</dt>
            <dd
              className={cn(
                "font-medium",
                vehicle.available ? "text-brand-strong" : "text-foreground"
              )}
            >
              {availabilityLabel}
            </dd>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <MapPinIcon
            aria-hidden
            className="mt-0.5 size-4 shrink-0 text-muted-foreground"
          />
          <div>
            <dt className="sr-only">Pickup location</dt>
            <dd>{vehicle.location}</dd>
          </div>
        </div>
      </dl>

      <Button
        type="button"
        variant="brand"
        size="xl"
        className="mt-5 w-full"
        onClick={handleReserve}
      >
        Reserve this car
      </Button>
      <ButtonLink
        href="/vehicles"
        variant="outline"
        size="xl"
        className="mt-2 w-full"
      >
        Back to all vehicles
      </ButtonLink>

      <p className="mt-4 text-xs text-pretty text-muted-foreground">
        Illustrative demo listing — prices, owner details, and rental terms are
        not real. No payment is taken.
      </p>
    </div>
  )
}
