import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nauta Treinamentos - Capacitação Offshore",
  description:
    "Especialistas em treinamentos para o setor offshore. Cursos de segurança, operações e capacitação profissional.",
  keywords: "treinamento offshore, segurança marítima, CBSP, cursos offshore, capacitação profissional",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
