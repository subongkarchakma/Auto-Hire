import type { Metadata } from "next"
import { KeyRoundIcon } from "lucide-react"

import { PlaceholderPage } from "@/components/shared/placeholder-page"

export const metadata: Metadata = {
  title: "List your car",
  description:
    "The owner dashboard for publishing listings and managing booking requests is coming soon.",
}

export default function ForOwnersPage() {
  return (
    <PlaceholderPage
      icon={KeyRoundIcon}
      title="List your car"
      description="The owner workspace for publishing listings, managing requests, and tracking earnings arrives in a later milestone."
      bullets={[
        "Create and edit vehicle listings",
        "Review incoming booking requests",
        "Set availability and pricing",
        "Track earnings in one place",
      ]}
      primary={{ label: "Back to home", href: "/" }}
      ghost={{ label: "Browse vehicles", href: "/vehicles" }}
    />
  )
}
