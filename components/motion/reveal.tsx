"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  className?: string
  /** Seconds to wait before animating. Ignored when reduced motion is on. */
  delay?: number
  /** Pixels the element travels up while appearing. */
  offset?: number
  /** Starting scale, useful for cards (e.g. 0.96) and images (e.g. 1.03). */
  scale?: number
  /** Play as soon as the page loads instead of when scrolled into view. */
  immediate?: boolean
  /** Fraction of the element that must be visible before animating. */
  amount?: number
  /** Keep the element revealed after the first view, or replay on re-entry. */
  once?: boolean
}

/** Smooth ease-out curve that settles gently without bouncing. */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/**
 * Minimal client-side animation wrapper built on Framer Motion.
 *
 * Sections stay Server Components and only the blocks that need movement are
 * wrapped, so the animation code is loaded once and reused everywhere.
 * `prefers-reduced-motion` is respected by skipping the animation entirely.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  offset = 40,
  scale = 1,
  immediate = false,
  amount = 0.25,
  once = true,
}: RevealProps) {
  const reduceMotion = useReducedMotion()
  const visible = { opacity: 1, y: 0, scale: 1 }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offset, scale }}
      animate={immediate ? visible : undefined}
      whileInView={immediate ? undefined : visible}
      viewport={
        immediate ? undefined : { once, amount, margin: "0px 0px -60px 0px" }
      }
      transition={{
        duration: reduceMotion ? 0 : 0.8,
        delay: reduceMotion ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  )
}
