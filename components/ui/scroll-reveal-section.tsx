// Componente ScrollRevealSection: Anima elementos quando entram na tela
// Usado para criar efeitos de revelação durante o scroll da página

"use client" // Client Component para usar hooks de animação

import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react"
import type React from "react"

// Interface para as props do componente
interface ScrollRevealSectionProps {
  children: React.ReactNode // Conteúdo a ser animado
  className?: string // Classes CSS opcionais
  delay?: number // Delay antes da animação iniciar
  duration?: number // Duração da animação
  yOffset?: number // Deslocamento vertical inicial
  once?: boolean // Se anima apenas uma vez ou sempre que entra/sai
}

export default function ScrollRevealSection({
  children,
  className,
  delay = 0, // Sem delay por padrão
  duration = 0.5, // Animação de meio segundo
  yOffset = 50, // Começa 50px abaixo
  once = true, // Anima apenas uma vez por padrão
}: ScrollRevealSectionProps) {
  // Ref para o elemento que será observado
  const ref = useRef(null)

  // Hook que detecta quando o elemento está visível na tela
  const isInView = useInView(ref, { once })

  // Controles de animação do Framer Motion
  const controls = useAnimation()

  // useEffect: Executa animação quando elemento entra/sai da tela
  useEffect(() => {
    if (isInView) {
      // Elemento visível: inicia animação de entrada
      controls.start("visible")
    } else if (!once) {
      // Se 'once' é false, reseta animação quando sai da tela
      controls.start("hidden")
    }
  }, [isInView, controls, once])

  // Configuração das animações
  const variants = {
    // Estado inicial: invisível e deslocado
    hidden: {
      opacity: 0,
      y: yOffset,
    },
    // Estado final: visível e na posição normal
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration, // Duração da animação
        delay, // Delay antes de iniciar
        ease: "easeOut", // Curva de animação suave
      },
    },
  }

  return (
    // Section animada
    <motion.section
      ref={ref} // Referência para observação
      initial="hidden" // Estado inicial
      animate={controls} // Controlado pelos hooks
      variants={variants} // Configurações de animação
      className={className}
    >
      {children}
    </motion.section>
  )
}

// Props padrão para o componente
ScrollRevealSection.defaultProps = {
  children: <div>Default Content</div>,
  className: "",
  delay: 0,
  duration: 0.5,
  yOffset: 50,
  once: true,
}
