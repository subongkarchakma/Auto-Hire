"use client"

import * as React from "react"
import { MenuIcon } from "lucide-react"

import { NavLinks } from "@/components/layout/nav-links"
import { ButtonLink } from "@/components/shared/button-link"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open navigation menu"
          />
        }
      >
        <MenuIcon aria-hidden />
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-xs gap-0">
        <SheetHeader className="border-b">
          <SheetTitle className="font-heading text-lg">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation and account links
          </SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-3">
          <NavLinks orientation="vertical" onNavigate={close} />
        </nav>

        <div className="flex flex-col gap-2 border-t p-4">
          <ButtonLink
            href="/sign-in"
            variant="outline"
            size="lg"
            onClick={close}
          >
            Sign in
          </ButtonLink>
          <ButtonLink
            href="/for-owners"
            variant="brand"
            size="lg"
            onClick={close}
          >
            List your car
          </ButtonLink>
        </div>
      </SheetContent>
    </Sheet>
  )
}
