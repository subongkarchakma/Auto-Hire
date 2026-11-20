"use client"

import { useId, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import {
  CalendarDaysIcon,
  MapPinIcon,
  SearchIcon,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const vehicleTypes = [
  { value: "any", label: "Any type" },
  { value: "suv", label: "SUV" },
  { value: "sedan", label: "Sedan" },
  { value: "luxury", label: "Luxury" },
  { value: "electric", label: "Electric" },
  { value: "van", label: "Van" },
  { value: "convertible", label: "Convertible" },
] as const

type DateErrors = {
  pickup?: string
  return?: string
}

function toLocalISODate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${date.getFullYear()}-${month}-${day}`
}

function addDays(isoDate: string, days: number) {
  const [year, month, day] = isoDate.split("-").map(Number)
  return toLocalISODate(new Date(year, month - 1, day + days))
}

function FieldLabel({
  htmlFor,
  icon: Icon,
  children,
}: {
  htmlFor: string
  icon: LucideIcon
  children: React.ReactNode
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
    >
      <Icon aria-hidden className="size-3.5" />
      {children}
    </label>
  )
}

/**
 * Presentational search bar. It validates dates and sends the visitor to the
 * vehicles route, but does not query or filter anything yet.
 */
export function SearchCard() {
  const router = useRouter()
  const ids = useId()
  const [location, setLocation] = useState("")
  const [pickupDate, setPickupDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [vehicleType, setVehicleType] = useState<string>("any")
  const [errors, setErrors] = useState<DateErrors>({})

  const today = toLocalISODate(new Date())
  const minReturn = pickupDate ? addDays(pickupDate, 1) : today
  const pickupId = `${ids}-pickup`
  const returnId = `${ids}-return`
  const locationId = `${ids}-location`
  const typeId = `${ids}-type`

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: DateErrors = {}

    if (pickupDate && pickupDate < today) {
      nextErrors.pickup = "Pickup date can't be in the past."
    }

    if (returnDate && returnDate < today) {
      nextErrors.return = "Return date can't be in the past."
    } else if (pickupDate && returnDate && returnDate <= pickupDate) {
      nextErrors.return = "Return date must be after the pickup date."
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    // Preview only: no query is sent and /vehicles is still a placeholder.
    router.push("/vehicles")
  }

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-xl ring-1 shadow-foreground/5 ring-foreground/5 sm:p-5">
      <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:items-end">
          <div className="flex flex-col gap-1.5">
            <FieldLabel htmlFor={locationId} icon={MapPinIcon}>
              Location
            </FieldLabel>
            <Input
              id={locationId}
              name="location"
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="City or region"
              autoComplete="address-level2"
              className="h-11"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <FieldLabel htmlFor={pickupId} icon={CalendarDaysIcon}>
              Pickup
            </FieldLabel>
            <Input
              id={pickupId}
              name="pickup"
              type="date"
              value={pickupDate}
              min={today}
              onChange={(event) => {
                setPickupDate(event.target.value)
                setErrors((current) => ({ ...current, pickup: undefined }))
              }}
              aria-invalid={errors.pickup ? true : undefined}
              aria-describedby={errors.pickup ? `${pickupId}-error` : undefined}
              className="h-11"
            />
            {errors.pickup ? (
              <p
                id={`${pickupId}-error`}
                role="alert"
                className="text-xs text-destructive"
              >
                {errors.pickup}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-1.5">
            <FieldLabel htmlFor={returnId} icon={CalendarDaysIcon}>
              Return
            </FieldLabel>
            <Input
              id={returnId}
              name="return"
              type="date"
              value={returnDate}
              min={minReturn}
              onChange={(event) => {
                setReturnDate(event.target.value)
                setErrors((current) => ({ ...current, return: undefined }))
              }}
              aria-invalid={errors.return ? true : undefined}
              aria-describedby={errors.return ? `${returnId}-error` : undefined}
              className="h-11"
            />
            {errors.return ? (
              <p
                id={`${returnId}-error`}
                role="alert"
                className="text-xs text-destructive"
              >
                {errors.return}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-1.5">
            <span
              id={`${typeId}-label`}
              className="text-xs font-medium text-muted-foreground"
            >
              Vehicle type
            </span>
            <Select
              items={vehicleTypes}
              value={vehicleType}
              onValueChange={(value) =>
                setVehicleType((value as string | null) ?? "any")
              }
            >
              <SelectTrigger
                aria-labelledby={`${typeId}-label`}
                className="h-11 w-full data-[size=default]:h-11"
              >
                <SelectValue placeholder="Any type" />
              </SelectTrigger>
              <SelectContent>
                {vehicleTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            variant="brand"
            size="xl"
            className="w-full lg:w-auto"
          >
            <SearchIcon aria-hidden />
            Search
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Preview only — search results, availability, and filters arrive in a
          later phase.
        </p>
      </form>
    </div>
  )
}
