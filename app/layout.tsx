import type { Metadata } from "next"
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Auto-Hire — Rent the drive you want",
    template: "%s · Auto-Hire",
  },
  description:
    "Auto-Hire is a marketplace preview that connects vehicle owners with customers. Browse cars, compare daily rates, and see how renting can work.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn(
        "antialiased",
        fontMono.variable,
        geist.variable,
        display.variable
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
