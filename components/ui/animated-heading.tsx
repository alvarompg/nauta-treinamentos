"use client"

import { motion } from "framer-motion"
import type { JSX } from "react" // Import JSX type for TypeScript

interface AnimatedHeadingProps {
  text: string
  className?: string
  el?: keyof JSX.IntrinsicElements // To allow h1, h2, etc.
  stagger?: number
}

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function AnimatedHeading({ text, className, el: Wrapper = "h1", stagger = 0.03 }: AnimatedHeadingProps) {
  const textArray = Array.isArray(text) ? text : [text]

  return (
    <Wrapper className={className}>
      <span className="sr-only">{textArray.join(" ")}</span>
      <motion.span initial="hidden" animate="visible" transition={{ staggerChildren: stagger }} aria-hidden>
        {textArray.map((line, lineIndex) => (
          <span className="block" key={`${line}-${lineIndex}`}>
            {line.split(" ").map((word, wordIndex) => (
              <span className="inline-block" key={`${word}-${wordIndex}`}>
                {word.split("").map((char, charIndex) => (
                  <motion.span key={`${char}-${charIndex}`} className="inline-block" variants={defaultAnimations}>
                    {char}
                  </motion.span>
                ))}
                <span className="inline-block">&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  )
}

AnimatedHeading.defaultProps = {
  text: "Default Animated Text",
  className: "text-4xl font-bold",
  el: "h1",
  stagger: 0.03,
}
