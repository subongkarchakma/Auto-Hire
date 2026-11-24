import { NextResponse, type NextRequest } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

import { safeNextPath } from "@/lib/safe-redirect"

/**
 * Optimistic gate for protected routes. It only checks that a session cookie
 * exists — no database call — and lets the page run the authoritative check.
 * `/vehicles` itself stays public; only listing detail pages are gated.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (!pathname.startsWith("/vehicles/")) {
    return NextResponse.next()
  }

  if (getSessionCookie(request)) {
    return NextResponse.next()
  }

  const signInUrl = new URL("/sign-in", request.url)
  signInUrl.searchParams.set("next", safeNextPath(`${pathname}${search}`))

  return NextResponse.redirect(signInUrl)
}

export const config = {
  matcher: ["/vehicles/:path*"],
}
