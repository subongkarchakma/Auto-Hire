import type { ReactNode } from "react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main"
        className="fixed top-4 left-4 z-50 -translate-y-24 rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-md ring-2 ring-ring transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
