import type { Metadata } from "next"
import { RouteIcon } from "lucide-react"

import { PlaceholderPage } from "@/components/shared/placeholder-page"

export const metadata: Metadata = {
  title: "How Auto-Hire works",
  description:
    "The step-by-step walkthrough for customers and vehicle owners is coming soon.",
}

export default function HowItWorksPage() {
  return (
    <PlaceholderPage
      icon={RouteIcon}
      title="How Auto-Hire works"
      description="A step-by-step walkthrough for customers and vehicle owners, with a switch between both journeys."
      bullets={[
        "Customer path: search, book, drive",
        "Owner path: list, approve, earn",
        "Clear cancellation and insurance rules",
        "Support that answers when plans change",
      ]}
      primary={{ label: "Back to home", href: "/" }}
      ghost={{ label: "Browse vehicles", href: "/vehicles" }}
    />
  )
}
