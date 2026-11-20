import type { ComponentProps } from "react"
import Link from "next/link"
import type { VariantProps } from "class-variance-authority"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ButtonLinkProps = ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants>

/**
 * Navigation CTA that renders a real <a> element with button styling.
 * Prefer this over `<Button render={<Link />} />` so screen readers get
 * link semantics instead of `role="button"`.
 */
export function ButtonLink({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
