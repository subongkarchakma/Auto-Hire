import type { Vehicle } from "@/lib/types/vehicle"
import { formatUsd } from "@/lib/format"

type TermRow = {
  label: string
  value: string
}

/** Demo rental terms. Nothing here reflects a real policy or contract. */
export function VehicleTerms({ vehicle }: { vehicle: Vehicle }) {
  const { terms } = vehicle

  const rows: TermRow[] = [
    { label: "Minimum age", value: `${terms.minAge}+` },
    { label: "Mileage", value: terms.mileagePerDay },
    { label: "Fuel policy", value: terms.fuelPolicy },
    {
      label: "Refundable deposit",
      value: `${formatUsd(terms.deposit)} (illustrative)`,
    },
    { label: "Cancellation", value: terms.cancellation },
    { label: "Insurance", value: terms.insurance },
  ]

  return (
    <div>
      <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="border-b border-border/60 pb-3">
            <dt className="text-xs text-muted-foreground">{row.label}</dt>
            <dd className="mt-0.5 text-sm font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-sm text-pretty text-muted-foreground">
        <span className="font-medium text-foreground">Pickup:</span>{" "}
        {vehicle.pickupNotes}
      </p>

      <p className="mt-3 text-xs text-pretty text-muted-foreground">
        These terms are placeholder demo values. They are not a rental
        agreement, and no deposit, insurance, or fee is actually charged.
      </p>
    </div>
  )
}
