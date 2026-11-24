import {
  CalendarDaysIcon,
  CogIcon,
  FuelIcon,
  GaugeIcon,
  MapPinIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react"

import { categoryLabels } from "@/lib/data/vehicles"
import type { Vehicle } from "@/lib/types/vehicle"
import {
  fuelLabels,
  rentalTypeLabels,
  transmissionLabels,
} from "@/lib/vehicle-labels"

type Spec = {
  icon: LucideIcon
  label: string
  value: string
}

export function VehicleSpecs({ vehicle }: { vehicle: Vehicle }) {
  const specs: Spec[] = [
    {
      icon: UsersIcon,
      label: "Seats",
      value: `${vehicle.seats} seats`,
    },
    {
      icon: CogIcon,
      label: "Transmission",
      value: transmissionLabels[vehicle.transmission],
    },
    {
      icon: FuelIcon,
      label: "Fuel",
      value: fuelLabels[vehicle.fuel],
    },
    {
      icon: GaugeIcon,
      label: "Model year",
      value: String(vehicle.year),
    },
    {
      icon: MapPinIcon,
      label: "Body type",
      value: categoryLabels[vehicle.category],
    },
    {
      icon: CalendarDaysIcon,
      label: "Rental options",
      value: vehicle.rentalTypes
        .map((type) => rentalTypeLabels[type])
        .join(", "),
    },
  ]

  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3">
      {specs.map((spec) => (
        <div key={spec.label} className="flex items-start gap-2.5">
          <spec.icon
            aria-hidden
            className="mt-0.5 size-4 shrink-0 text-brand-strong"
          />
          <div>
            <dt className="text-xs text-muted-foreground">{spec.label}</dt>
            <dd className="text-sm font-medium">{spec.value}</dd>
          </div>
        </div>
      ))}
    </dl>
  )
}
