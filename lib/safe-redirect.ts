const FALLBACK = "/"

/**
 * Accepts only same-site absolute paths for post-login redirects.
 * Rejects protocol-relative URLs, backslash tricks, and control characters so
 * `?next=` can never point at another origin.
 */
export function safeNextPath(value: string | null | undefined): string {
  if (!value) return FALLBACK
  if (value.length > 2048) return FALLBACK
  if (!value.startsWith("/")) return FALLBACK
  if (value.startsWith("//")) return FALLBACK
  if (value.includes("\\")) return FALLBACK
  if (/[\u0000-\u001f\u007f]/.test(value)) return FALLBACK
  if (value.startsWith("/sign-in") || value.startsWith("/sign-up")) {
    return FALLBACK
  }

  return value
}
