import type { Metadata } from "next"
import { LogInIcon } from "lucide-react"

import { PlaceholderPage } from "@/components/shared/placeholder-page"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Account access for Auto-Hire is coming in a later milestone.",
}

export default function SignInPage() {
  return (
    <PlaceholderPage
      icon={LogInIcon}
      title="Sign in"
      description="Account access is not wired up yet. Authentication is scheduled for a later milestone — until then, explore the public pages."
      bullets={[
        "Email and password sign-in",
        "Continue with Google",
        "Session-aware navigation",
        "Role-based access for owners and admins",
      ]}
      primary={{ label: "Back to home", href: "/" }}
      ghost={{ label: "Browse vehicles", href: "/vehicles" }}
    />
  )
}
