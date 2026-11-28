"use client"

import Link from "next/link"
import { CarFrontIcon } from "lucide-react"

import { MobileNav } from "@/components/layout/mobile-nav"
import { NavLinks } from "@/components/layout/nav-links"
import { ButtonLink } from "@/components/shared/button-link"
import { siteConfig } from "@/lib/site"
import { authClient } from "@/lib/auth-client"
import { Button } from "../ui/button"

export function SiteHeader() {
  const { data: session } = authClient.useSession()
  const user = session?.user

  const handleSignOut = async () => {
    await authClient.signOut()
  }
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/70">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-lg bg-brand text-brand-foreground"
          >
            <CarFrontIcon className="size-4" />
          </span>
          <span className="font-heading text-lg font-semibold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Main" className="ml-2 hidden lg:block">
          <NavLinks />
        </nav>

        {user ? (
          <div className="ml-auto flex items-center gap-2">
            <span>welcome, {session.user.name} </span>
            <Button onClick={handleSignOut} variant={"destructive"}>
              {/* <LogIn data-icon="inline-start" /> */}
              Sign out
            </Button>
          </div>
        ) : (
          <>
            <div className="ml-auto flex items-center gap-2">
              <ButtonLink
                href="/sign-in"
                variant="ghost"
                size="lg"
                className="hidden md:inline-flex"
              >
                Log in
              </ButtonLink>
              <ButtonLink
                href="/for-owners"
                variant="brand"
                size="lg"
                className="hidden sm:inline-flex"
              >
                List your car
              </ButtonLink>
              <MobileNav />
            </div>
          </>
        )}
      </div>
    </header>
  )
}
