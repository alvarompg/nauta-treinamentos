import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"

// Configuração da fonte Inter do Google Fonts
const inter = Inter({ subsets: ["latin"] })

// Metadata: Informações exibidas no navegador e buscadores
export const metadata: Metadata = {
  title: "Nauta Treinamentos - Cursos Offshore Profissionais",
  description:
    "Capacite-se com os melhores treinamentos offshore do Brasil. Cursos de segurança, operações e certificações reconhecidas no mercado.",
  keywords: "treinamentos offshore, cursos marítimos, segurança offshore, CBSP, certificação offshore",
  authors: [{ name: "Nauta Treinamentos" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.app'
}

// RootLayout: Estrutura HTML básica
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {/* AuthProvider: Disponibiliza autenticação para toda aplicação */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
