import type { Metadata } from "next"
import { CarIcon } from "lucide-react"

import { PlaceholderPage } from "@/components/shared/placeholder-page"

export const metadata: Metadata = {
  title: "Browse vehicles",
  description:
    "The Auto-Hire vehicle catalogue is on the way: filters, availability, and daily rates.",
}

export default function VehiclesPage() {
  return (
    <PlaceholderPage
      icon={CarIcon}
      title="Browse vehicles"
      description="A searchable catalogue of cars — filters, availability, and daily rates — is on the way."
      bullets={[
        "Filter by body type, seats, and price",
        "Check availability for your dates",
        "Compare daily rates at a glance",
        "Save favourites for later",
      ]}
      primary={{ label: "Back to home", href: "/" }}
      ghost={{ label: "How it works", href: "/how-it-works" }}
    />
  )
}
