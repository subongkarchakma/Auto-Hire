import type { Metadata } from "next"
import { UserPlusIcon } from "lucide-react"

import { PlaceholderPage } from "@/components/shared/placeholder-page"

export const metadata: Metadata = {
  title: "Create an account",
  description: "Registration for Auto-Hire opens in a later milestone.",
}

export default function SignUpPage() {
  return (
    <PlaceholderPage
      icon={UserPlusIcon}
      title="Create an account"
      description="Registration opens in a later milestone. The same account will let you rent cars or list your own."
      bullets={[
        "One account for renting or listing",
        "Choose a customer or owner role",
        "Profile and verification flow",
        "Secure sessions with Better Auth",
      ]}
      primary={{ label: "Back to home", href: "/" }}
      ghost={{ label: "Sign in", href: "/sign-in" }}
    />
  )
}
