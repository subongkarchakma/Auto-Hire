import type { Metadata } from "next"

import { SignInForm } from "@/components/auth/sign-in-form"
import { safeNextPath } from "@/lib/safe-redirect"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to Auto-Hire to open vehicle details and listings.",
}

type SignInPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams
  const rawNext = typeof params.next === "string" ? params.next : null

  return (
    <SignInForm
      nextPath={safeNextPath(rawNext)}
      authUnavailable={params.error === "auth-unavailable"}
    />
  )
}
