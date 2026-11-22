import Image from "next/image"
import { ArrowRightIcon, ShieldCheckIcon } from "lucide-react"

import { SearchCard } from "@/components/landing/search-card"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/shared/button-link"
import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/lib/site"

const heroImage =
  "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=80"

export function Hero() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-144 bg-[radial-gradient(60%_60%_at_50%_0%,var(--brand-soft),transparent_70%)]"
        />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8 lg:pt-20 lg:pb-28">
          <div>
            <Reveal immediate>
              <Badge
                variant="outline"
                className="border-brand/30 bg-brand-soft px-2.5 text-brand-strong"
              >
                Marketplace preview
              </Badge>
            </Reveal>

            <Reveal immediate delay={0.06} className="mt-6">
              <h1 className="font-heading text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
                {siteConfig.tagline}
              </h1>
            </Reveal>

            <Reveal immediate delay={0.12} className="mt-5">
              <p className="max-w-xl text-lg text-pretty text-muted-foreground">
                {siteConfig.description}
              </p>
            </Reveal>

            <Reveal
              immediate
              delay={0.18}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <ButtonLink href="/vehicles" variant="brand" size="xl">
                Browse vehicles
                <ArrowRightIcon aria-hidden />
              </ButtonLink>
              <ButtonLink href="/#how-it-works" variant="outline" size="xl">
                How it works
              </ButtonLink>
            </Reveal>

            <Reveal immediate delay={0.24} className="mt-5">
              <p className="max-w-md text-xs text-muted-foreground">
                {siteConfig.demoNotice}
              </p>
            </Reveal>
          </div>

          <Reveal immediate delay={0.1} scale={1.03} className="relative">
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-2xl ring-1 shadow-foreground/10 ring-foreground/10">
              <Image
                src={heroImage}
                alt="A white SUV parked on a desert road below red rock formations"
                fill
                preload
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent"
              />
              <span className="absolute top-4 left-4 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur">
                Illustrative imagery
              </span>
            </div>

            <div className="absolute -bottom-5 left-4 flex items-center gap-2 rounded-xl border border-border/70 bg-background/90 px-3 py-2 text-sm font-medium shadow-lg backdrop-blur sm:left-6">
              <span className="grid size-7 place-items-center rounded-lg bg-brand-soft text-brand-strong">
                <ShieldCheckIcon aria-hidden className="size-4" />
              </span>
              Verified owners
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal
        immediate
        delay={0.28}
        offset={24}
        className="relative z-10 mx-auto -mt-12 mb-16 w-full max-w-6xl px-4 sm:px-6 lg:-mt-16 lg:mb-20 lg:px-8"
      >
        <SearchCard />
      </Reveal>
    </>
  )
}
