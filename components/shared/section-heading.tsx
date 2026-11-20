import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-3",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <span className="text-xs font-semibold tracking-[0.18em] text-brand-strong uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base text-pretty text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}
