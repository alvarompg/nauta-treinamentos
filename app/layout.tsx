import type React from "react"
// Layout raiz da aplicação Next.js
// Este arquivo define a estrutura HTML básica que será usada em todas as páginas
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

// Configuração da fonte Inter do Google Fonts
// Inter é uma fonte moderna e legível, ideal para interfaces web
const inter = Inter({ subsets: ["latin"] })

// Metadata: Informações que aparecem no navegador e mecanismos de busca
export const metadata: Metadata = {
  title: "Nauta Treinamentos - Cursos Offshore Profissionais",
  description:
    "Capacite-se com os melhores treinamentos offshore do Brasil. Cursos de segurança, operações e certificações reconhecidas no mercado.",
  keywords: "treinamentos offshore, cursos marítimos, segurança offshore, CBSP, certificação offshore",
  authors: [{ name: "Nauta Treinamentos" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.app'
}

// RootLayout: Componente que envolve todas as páginas da aplicação
// children: Representa o conteúdo específico de cada página
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // html: Elemento raiz do documento HTML
    <html lang="pt-BR">
      {/* head implícito - Next.js gerencia automaticamente */}
      {/* body: Corpo do documento, onde todo conteúdo visível fica */}
      <body className={inter.className}>
        {/* children: Aqui será renderizado o conteúdo de cada página */}
        {children}
      </body>
    </html>
  )
}
