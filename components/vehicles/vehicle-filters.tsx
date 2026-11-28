"use client"

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
} from "react"
import { useRouter } from "next/navigation"
import { CheckIcon, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatUsd } from "@/lib/format"
import type { VehicleCategory } from "@/lib/types/vehicle"
import { cn } from "@/lib/utils"

export type VehicleFilterState = {
  query: string
  category: VehicleCategory | "any"
  location: string
  maxPrice: number | null
  availableOnly: boolean
}

type VehicleFiltersProps = {
  initial: VehicleFilterState
  categories: { value: VehicleCategory; label: string }[]
  locations: string[]
  priceOptions: number[]
}

const ANY = "any"

/**
 * Filters live in the URL so results stay shareable and server-rendered.
 * Text search is debounced; everything else applies immediately.
 */
export function VehicleFilters({
  initial,
  categories,
  locations,
  priceOptions,
}: VehicleFiltersProps) {
  const router = useRouter()
  const ids = useId()
  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useState(initial.query)

  // Remembers the query this component last pushed to the URL, so a server
  // response for our own navigation does not overwrite newer keystrokes.
  const lastAppliedQuery = useRef<string | null>(null)

  const apply = useCallback(
    (next: VehicleFilterState) => {
      const params = new URLSearchParams()
      const trimmed = next.query.trim()

      lastAppliedQuery.current = trimmed

      if (trimmed) params.set("q", trimmed)
      if (next.category !== ANY) params.set("category", next.category)
      if (next.location !== ANY) params.set("location", next.location)
      if (next.maxPrice !== null) params.set("maxPrice", String(next.maxPrice))
      if (next.availableOnly) params.set("available", "1")

      const search = params.toString()

      startTransition(() => {
        router.replace(search ? `/vehicles?${search}` : "/vehicles", {
          scroll: false,
        })
      })
    },
    [router]
  )

  // Follow URL changes that came from outside this component, such as the
  // "Clear filters" link on the empty state.
  useEffect(() => {
    if (initial.query === lastAppliedQuery.current) return

    lastAppliedQuery.current = initial.query
    setQuery(initial.query)
  }, [initial.query])

  useEffect(() => {
    const trimmed = query.trim()

    if (trimmed === initial.query) return

    const timer = window.setTimeout(() => {
      apply({ ...initial, query: trimmed })
    }, 300)

    return () => window.clearTimeout(timer)
  }, [query, initial, apply])

  const activeCount = [
    initial.query !== "",
    initial.category !== ANY,
    initial.location !== ANY,
    initial.maxPrice !== null,
    initial.availableOnly,
  ].filter(Boolean).length

  const searchId = `${ids}-search`
  const locationId = `${ids}-location`
  const priceId = `${ids}-price`

  const locationItems = [
    { value: ANY, label: "Any location" },
    ...locations.map((location) => ({ value: location, label: location })),
  ]

  const priceItems = [
    { value: ANY, label: "Any price" },
    ...priceOptions.map((value) => ({
      value: String(value),
      label: `Up to ${formatUsd(value)} / day`,
    })),
  ]

  function clearAll() {
    setQuery("")
    startTransition(() => {
      router.replace("/vehicles", { scroll: false })
    })
  }

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm ring-1 ring-foreground/5 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-end">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={searchId}
            className="text-xs font-medium text-muted-foreground"
          >
            Search
          </label>
          <div className="relative">
            <SearchIcon
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Name, model, or city"
              autoComplete="off"
              className="h-11 pl-9"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span
            id={`${locationId}-label`}
            className="text-xs font-medium text-muted-foreground"
          >
            Location
          </span>
          <Select
            items={locationItems}
            value={initial.location}
            onValueChange={(value) =>
              apply({ ...initial, location: (value as string) ?? ANY })
            }
          >
            <SelectTrigger
              aria-labelledby={`${locationId}-label`}
              className="h-11 w-full data-[size=default]:h-11"
            >
              <SelectValue placeholder="Any location" />
            </SelectTrigger>
            <SelectContent>
              {locationItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <span
            id={`${priceId}-label`}
            className="text-xs font-medium text-muted-foreground"
          >
            Daily price
          </span>
          <Select
            items={priceItems}
            value={initial.maxPrice === null ? ANY : String(initial.maxPrice)}
            onValueChange={(value) =>
              apply({
                ...initial,
                maxPrice:
                  !value || value === ANY ? null : Number(value as string),
              })
            }
          >
            <SelectTrigger
              aria-labelledby={`${priceId}-label`}
              className="h-11 w-full data-[size=default]:h-11"
            >
              <SelectValue placeholder="Any price" />
            </SelectTrigger>
            <SelectContent>
              {priceItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="button"
          variant={initial.availableOnly ? "secondary" : "outline"}
          aria-pressed={initial.availableOnly}
          className="h-11 justify-start lg:justify-center"
          onClick={() =>
            apply({
              ...initial,
              availableOnly: !initial.availableOnly,
            })
          }
        >
          <CheckIcon
            aria-hidden
            className={cn(
              "size-4",
              initial.availableOnly ? "opacity-100" : "opacity-40"
            )}
          />
          Available only
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4">
        <span className="mr-1 text-xs font-medium text-muted-foreground">
          Body type
        </span>

        <Button
          type="button"
          size="sm"
          variant={initial.category === ANY ? "secondary" : "outline"}
          aria-pressed={initial.category === ANY}
          className="h-8 rounded-full"
          onClick={() => apply({ ...initial, category: ANY })}
        >
          All
        </Button>

        {categories.map((category) => {
          const active = initial.category === category.value

          return (
            <Button
              key={category.value}
              type="button"
              size="sm"
              variant={active ? "secondary" : "outline"}
              aria-pressed={active}
              className={cn(
                "h-8 rounded-full",
                active && "border-brand/30 bg-brand-soft text-brand-strong"
              )}
              onClick={() => apply({ ...initial, category: category.value })}
            >
              {category.label}
            </Button>
          )
        })}

        <div className="ml-auto flex items-center gap-3">
          <span aria-live="polite" className="text-xs text-muted-foreground">
            {isPending ? "Updating results…" : ""}
          </span>
          {activeCount > 0 ? (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-8"
              onClick={clearAll}
            >
              Clear all
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
