const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
})

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

/** Formats an ISO date (`2026-12-12`) without timezone drift. */
export function formatShortDate(isoDate: string) {
  const date = new Date(`${isoDate}T00:00:00Z`)

  return Number.isNaN(date.getTime())
    ? isoDate
    : shortDateFormatter.format(date)
}

export function formatUsd(amount: number) {
  return usdFormatter.format(amount)
}
