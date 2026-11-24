import { Skeleton } from "@/components/ui/skeleton"

export default function VehiclesLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="mt-4 h-10 w-80 max-w-full" />
      <Skeleton className="mt-4 h-4 w-full max-w-xl" />

      <Skeleton className="mt-8 h-40 w-full rounded-2xl sm:h-28" />

      <div className="mt-8 flex items-center justify-between gap-4">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-36" />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-border/70 bg-card"
          >
            <Skeleton className="aspect-4/3 w-full rounded-none" />
            <div className="flex flex-col gap-3 p-4 sm:p-5">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="mt-2 h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
