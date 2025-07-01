"use client"

import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react"
import type React from "react"

interface ScrollRevealSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  yOffset?: number
  once?: boolean
}

export default function ScrollRevealSection({
  children,
  className,
  delay = 0,
  duration = 0.5,
  yOffset = 50,
  once = true,
}: ScrollRevealSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once }) // `once` prop controls if animation runs only once
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      // If `once` is false, reset animation when out of view
      controls.start("hidden")
    }
  }, [isInView, controls, once])

  const variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: "easeOut" },
    },
  }

  return (
    <motion.section ref={ref} initial="hidden" animate={controls} variants={variants} className={className}>
      {children}
    </motion.section>
  )
}

ScrollRevealSection.defaultProps = {
  children: <div>Default Content</div>,
  className: "",
  delay: 0,
  duration: 0.5,
  yOffset: 50,
  once: true,
}
