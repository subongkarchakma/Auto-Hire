"use client"

import { useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

type GalleryImage = {
  src: string
  alt: string
}

type VehicleGalleryProps = {
  images: GalleryImage[]
  className?: string
}

/**
 * Main listing image with an optional thumbnail strip. Thumbnails only render
 * when a listing has more than one image.
 */
export function VehicleGallery({ images, className }: VehicleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const current = images[activeIndex] ?? images[0]

  if (!current) return null

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-muted">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover"
        />
        <span className="absolute top-3 left-3 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur">
          Illustrative demo image
        </span>
      </div>

      {images.length > 1 ? (
        <ul className="grid grid-cols-4 gap-2 sm:gap-3">
          {images.map((image, index) => {
            const active = index === activeIndex

            return (
              <li key={`${image.src}-${index}`}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={active}
                  aria-label={`Show image ${index + 1} of ${images.length}`}
                  className={cn(
                    "relative block aspect-4/3 w-full overflow-hidden rounded-xl ring-2 ring-offset-2 ring-offset-background transition-shadow",
                    active ? "ring-brand" : "ring-transparent hover:ring-border"
                  )}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 15vw, 22vw"
                    className="object-cover"
                  />
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
