// Arquivo de utilitários - funções auxiliares usadas em toda a aplicação

// Importações necessárias
import { type ClassValue, clsx } from "clsx" // Para manipulação de classes CSS
import { twMerge } from "tailwind-merge" // Para mesclar classes do Tailwind
import confetti from "canvas-confetti" // Para efeito de confete

// Função cn: Combina e otimiza classes CSS
// Esta função é muito útil para combinar classes condicionais do Tailwind CSS
// Exemplo: cn("bg-red-500", isActive && "bg-blue-500", "text-white")
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função triggerConfetti: Dispara efeito de confete na tela
// Usada quando o usuário completa ações importantes (passar em quiz, concluir curso)
// Parâmetros:
// - particleCount: número de partículas de confete (padrão: 100)
// - spread: ângulo de dispersão das partículas (padrão: 70)
// - originY: posição vertical de origem (0.6 = 60% da altura da tela)
export function triggerConfetti(particleCount = 100, spread = 70, originY = 0.6) {
  confetti({
    particleCount, // Quantidade de partículas
    spread, // Dispersão angular
    origin: { y: originY }, // Ponto de origem
    angle: 90, // Ângulo de lançamento (90° = para cima)
    startVelocity: 30, // Velocidade inicial
    colors: ["#0D9488", "#F59E0B", "#10B981", "#FBBF24", "#ffffff"], // Cores: teal, amber, green, yellow, white
  })

  // Exemplo comentado de confete vindo de um canto
  // Útil para efeitos mais elaborados
  // confetti({
  //   particleCount: 150,
  //   spread: 100,
  //   origin: { x: 0.9, y: 0.1 },    // Canto superior direito
  //   angle: 135,                     // Ângulo para baixo-esquerda
  //   startVelocity: 40,
  //   gravity: 0.8                    // Gravidade mais forte
  // });
}

// Função opcional para tocar som (comentada)
// Em uma aplicação real, você adicionaria um arquivo de áudio
// export function playSuccessSound() {
//   const audio = new Audio('/sounds/success-chime.mp3'); // Caminho para o arquivo de som
//   audio.volume = 0.3;                                   // Volume (0.0 a 1.0)
//   audio.play().catch(error => console.error("Erro ao tocar som:", error));
// }
