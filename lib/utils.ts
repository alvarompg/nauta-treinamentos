import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import confetti from "canvas-confetti" // Import canvas-confetti

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Confetti utility function
export function triggerConfetti(particleCount = 100, spread = 70, originY = 0.6) {
  confetti({
    particleCount,
    spread,
    origin: { y: originY },
    angle: 90,
    startVelocity: 30,
    colors: ["#0D9488", "#F59E0B", "#10B981", "#FBBF24", "#ffffff"], // Teal, Amber, and white
  })

  // Example of a burst from a corner (e.g., top right)
  // Adjust origin.x and origin.y (0 to 1 for percentage of screen)
  // confetti({
  //   particleCount: 150,
  //   spread: 100,
  //   origin: { x: 0.9, y: 0.1 },
  //   angle: 135, // Angle towards bottom-left
  //   startVelocity: 40,
  //   gravity: 0.8
  // });
}

// Optional: Play sound (requires an audio file)
// export function playSuccessSound() {
//   const audio = new Audio('/sounds/success-chime.mp3'); // Path to your sound file
//   audio.volume = 0.3; // Adjust volume
//   audio.play().catch(error => console.error("Error playing sound:", error));
// }
