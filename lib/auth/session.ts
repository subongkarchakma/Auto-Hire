import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import { safeNextPath } from "@/lib/safe-redirect"

type Session = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>

export type ServerSessionResult =
  | { status: "authenticated"; session: Session }
  | { status: "unauthenticated" }
  | { status: "unavailable" }

/**
 * Server-side session lookup that separates "no session" from "could not
 * verify". Infrastructure failures are logged and reported as `unavailable`
 * so callers can fail closed instead of guessing.
 */
export async function getServerSession(): Promise<ServerSessionResult> {
  try {
    const session = await auth.api.getSession({ headers: await headers() })

    return session
      ? { status: "authenticated", session }
      : { status: "unauthenticated" }
  } catch (error) {
    console.error("[auth] Session verification failed", error)

    return { status: "unavailable" }
  }
}

/**
 * Guards a server component. Signed-out visitors are sent to sign-in with a
 * validated return path; verification failures fail closed with a distinct
 * error flag so the sign-in page can explain the outage.
 */
export async function requireSession(returnTo: string): Promise<Session> {
  const result = await getServerSession()

  if (result.status === "authenticated") {
    return result.session
  }

  const next = encodeURIComponent(safeNextPath(returnTo))

  if (result.status === "unauthenticated") {
    redirect(`/sign-in?next=${next}`)
  }

  redirect(`/sign-in?next=${next}&error=auth-unavailable`)
}
