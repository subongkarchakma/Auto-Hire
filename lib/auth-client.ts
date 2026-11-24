import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  /** The base URL of the server (optional when using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL,
})

/**
 * Re-export from the configured client. Calling `createAuthClient()` a second
 * time (as this file used to) drops `baseURL` and any future client plugins.
 */
export const { signIn, signUp, useSession } = authClient
