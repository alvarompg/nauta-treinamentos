// Componente AnimatedHeading: Título com animação de entrada letra por letra
// Usado para criar efeitos visuais atraentes em títulos importantes

"use client" // Client Component para usar animações

import { motion } from "framer-motion"
import type { JSX } from "react"

// Interface para as props do componente
interface AnimatedHeadingProps {
  text: string // Texto a ser animado
  className?: string // Classes CSS opcionais
  el?: keyof JSX.IntrinsicElements // Elemento HTML (h1, h2, etc.)
  stagger?: number // Delay entre animações das letras
}

// Configuração padrão das animações
const defaultAnimations = {
  // Estado inicial: invisível e deslocado para baixo
  hidden: {
    opacity: 0,
    y: 20,
  },
  // Estado final: visível e na posição normal
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5, // Duração da animação
    },
  },
}

export default function AnimatedHeading({
  text,
  className,
  el: Wrapper = "h1", // Elemento padrão é h1
  stagger = 0.03, // Delay padrão entre letras
}: AnimatedHeadingProps) {
  // Converte texto em array (para suportar múltiplas linhas no futuro)
  const textArray = Array.isArray(text) ? text : [text]

  return (
    // Wrapper dinâmico (h1, h2, etc.)
    <Wrapper className={className}>
      {/* Texto para leitores de tela (sem animação) */}
      <span className="sr-only">{textArray.join(" ")}</span>

      {/* Container animado */}
      <motion.span
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: stagger }} // Delay entre filhos
        aria-hidden // Esconde da acessibilidade (já temos o sr-only acima)
      >
        {/* Mapeia cada linha de texto */}
        {textArray.map((line, lineIndex) => (
          <span className="block" key={`${line}-${lineIndex}`}>
            {/* Mapeia cada palavra da linha */}
            {line.split(" ").map((word, wordIndex) => (
              <span className="inline-block" key={`${word}-${wordIndex}`}>
                {/* Mapeia cada letra da palavra */}
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={`${char}-${charIndex}`}
                    className="inline-block"
                    variants={defaultAnimations} // Aplica as animações definidas
                  >
                    {char}
                  </motion.span>
                ))}
                {/* Espaço entre palavras */}
                <span className="inline-block">&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  )
}

// Props padrão para o componente
AnimatedHeading.defaultProps = {
  text: "Default Animated Text",
  className: "text-4xl font-bold",
  el: "h1",
  stagger: 0.03,
}
