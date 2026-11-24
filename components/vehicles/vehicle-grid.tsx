import { VehicleCard } from "@/components/vehicles/vehicle-card"
import type { Vehicle } from "@/lib/types/vehicle"
import { cn } from "@/lib/utils"

type VehicleGridProps = {
  vehicles: Vehicle[]
  className?: string
}

/** Responsive listing grid shared by the catalogue and related listings. */
export function VehicleGrid({ vehicles, className }: VehicleGridProps) {
  return (
    <ul className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {vehicles.map((vehicle) => (
        <li key={vehicle.id} className="h-full">
          <VehicleCard vehicle={vehicle} />
        </li>
      ))}
    </ul>
  )
}
