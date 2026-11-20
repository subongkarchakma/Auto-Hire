export type NavItem = {
  label: string
  href: string
}

export type FooterGroup = {
  title: string
  items: NavItem[]
}

/**
 * Single source of truth for navigation and site copy.
 * Kept free of framework imports so it can be used from server and client code.
 */
export const siteConfig = {
  name: "Auto-Hire",
  tagline: "Rent the drive you want.",
  description:
    "A marketplace that connects vehicle owners with customers: browse cars, compare daily rates, and book with confidence.",
  email: "hello@auto-hire.example",
  demoNotice:
    "Demo project — listings, prices, and copy are illustrative. No real bookings or payments are processed.",
  nav: [
    { label: "Home", href: "/" },
    { label: "Browse Vehicles", href: "/vehicles" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "About Us", href: "/#why-auto-hire" },
    { label: "Contact", href: "/#contact" },
  ] satisfies NavItem[],
  footerNav: [
    {
      title: "Platform",
      items: [
        { label: "Browse vehicles", href: "/vehicles" },
        { label: "How it works", href: "/how-it-works" },
        { label: "List your car", href: "/for-owners" },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "About us", href: "/#why-auto-hire" },
        { label: "Contact", href: "/#contact" },
      ],
    },
    {
      title: "Account",
      items: [
        { label: "Sign in", href: "/sign-in" },
        { label: "Create account", href: "/sign-up" },
      ],
    },
  ] satisfies FooterGroup[],
}
