"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

type NavLinksProps = {
  orientation?: "horizontal" | "vertical"
  className?: string
  onNavigate?: () => void
}

export function NavLinks({
  orientation = "horizontal",
  className,
  onNavigate,
}: NavLinksProps) {
  const pathname = usePathname()

  return (
    <ul
      className={cn(
        "flex items-center gap-1",
        orientation === "vertical" && "flex-col items-stretch gap-1",
        className
      )}
    >
      {siteConfig.nav.map((item) => {
        const isHashLink = item.href.includes("#")
        const isActive =
          !isHashLink &&
          (item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`))

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "inline-flex h-8 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                orientation === "vertical" && "h-10 w-full px-3 text-base",
                isActive && "bg-muted text-foreground"
              )}
            >
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
