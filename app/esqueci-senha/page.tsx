// Página "Esqueci Minha Senha"
// Permite ao usuário solicitar um link de redefinição de senha por e-mail.
"use client"

import type React from "react" // Importa o tipo React para tipagem de eventos
import Link from "next/link" // Componente para navegação entre páginas do Next.js
import { useRouter } from "next/navigation" // Hook para controle de navegação
import { Button } from "@/components/ui/button" // Componente de botão estilizado
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card" // Componentes de card para layout
import { Input } from "@/components/ui/input" // Componente de input estilizado
import { Label } from "@/components/ui/label" // Componente de label para inputs
import Navbar from "@/components/layout/navbar" // Componente da barra de navegação principal
import Footer from "@/components/layout/footer" // Componente do rodapé principal
import { AnchorIcon, MailCheck } from "lucide-react" // Ícones
import { useState } from "react" // Hook para gerenciar estado no componente

export default function EsqueciSenhaPage() {
  // useRouter: Hook para obter o objeto router e controlar a navegação programaticamente.
  const router = useRouter()
  // useState: Hook para gerenciar o estado do e-mail enviado.
  // emailSent: booleano que indica se o e-mail de redefinição foi (simuladamente) enviado.
  // setEmailSent: função para atualizar o estado de emailSent.
  const [emailSent, setEmailSent] = useState(false)
  // useState: Hook para gerenciar o estado do e-mail digitado pelo usuário.
  const [email, setEmail] = useState("")

  // handleForgotPassword: Função chamada quando o formulário de "esqueci senha" é submetido.
  // event: Objeto do evento do formulário.
  const handleForgotPassword = (event: React.FormEvent) => {
    event.preventDefault() // Previne o comportamento padrão do formulário (recarregar a página).
    // Em uma aplicação real, aqui você chamaria uma API para enviar o link de redefinição.
    console.log("E-mail para redefinição:", email)
    setEmailSent(true) // Define que o e-mail foi enviado (simulação).
    // Não redireciona, apenas mostra a mensagem de confirmação.
  }

  // Renderização do componente da página.
  return (
    <div className="flex flex-col min-h-screen">
      {/* Barra de Navegação */}
      <Navbar />
      {/* Conteúdo Principal */}
      <main className="flex-grow flex items-center justify-center py-12 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <AnchorIcon className="mx-auto h-12 w-12 text-teal-600 mb-2" />
            <CardTitle className="text-2xl font-bold text-neutral-800">Recuperar Senha</CardTitle>
            {!emailSent ? (
              <CardDescription>Digite seu e-mail para enviarmos um link de redefinição de senha.</CardDescription>
            ) : (
              <CardDescription className="text-green-600">
                Link enviado! Verifique sua caixa de entrada.
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {!emailSent ? (
              // Formulário para solicitar o link de redefinição.
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com.br"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do e-mail ao digitar.
                  />
                </div>
                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                  Enviar Link de Redefinição
                </Button>
              </form>
            ) : (
              // Mensagem de confirmação após o envio simulado do e-mail.
              <div className="text-center">
                <MailCheck className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <p className="text-neutral-700">
                  Se o e-mail <strong className="text-teal-600">{email}</strong> estiver cadastrado em nosso sistema,
                  você receberá um link para criar uma nova senha em breve.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            <Link href="/login" className="text-sm text-teal-600 hover:underline">
              Voltar para o Login
            </Link>
          </CardFooter>
        </Card>
      </main>
      {/* Rodapé */}
      <Footer />
    </div>
  )
}
