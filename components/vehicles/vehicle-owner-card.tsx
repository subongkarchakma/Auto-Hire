import { ClockIcon, MapPinIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { VehicleOwner } from "@/lib/types/vehicle"

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

/**
 * Fictional owner profile for the demo listing. There is no owner account or
 * messaging yet, so the card only shows the shape of future data.
 */
export function VehicleOwnerCard({ owner }: { owner: VehicleOwner }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm ring-1 ring-foreground/5">
      <div className="flex items-start gap-4">
        <Avatar size="lg" className="size-12">
          <AvatarFallback className="text-sm font-medium">
            {initials(owner.name)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-heading text-base font-semibold">{owner.name}</p>
            <Badge
              variant="outline"
              className="border-brand/30 bg-brand-soft text-[10px] text-brand-strong"
            >
              Demo owner
            </Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Member since {owner.memberSince} · {owner.listingCount}{" "}
            {owner.listingCount === 1 ? "listing" : "listings"}
          </p>
        </div>
      </div>

      <dl className="mt-4 flex flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ClockIcon aria-hidden className="size-4 shrink-0" />
          <dt className="sr-only">Response time</dt>
          <dd>{owner.responseTime}</dd>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPinIcon aria-hidden className="size-4 shrink-0" />
          <dt className="sr-only">Handover</dt>
          <dd>Handover arranged after booking</dd>
        </div>
      </dl>

      <p className="mt-4 text-xs text-pretty text-muted-foreground">
        Illustrative profile — this person and their listing history are
        fictional demo data.
      </p>
    </div>
  )
}
