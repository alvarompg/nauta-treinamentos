"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { AnchorIcon, Mail, CheckCircle } from "lucide-react"

export default function ConfirmarEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [cpf, setCpf] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    const cpfParam = searchParams.get("cpf")
    if (!cpfParam) {
      router.push("/login")
      return
    }

    setCpf(cpfParam)

    // Simular busca do e-mail associado ao CPF
    setTimeout(() => {
      // Em uma aplicação real, aqui seria feita uma consulta ao backend
      // Por agora, vamos simular um e-mail baseado no CPF
      if (cpfParam === "123.456.789-00" || cpfParam === "12345678900") {
        setUserEmail("usuario@nautatreinamentos.com")
      } else {
        // Gerar um e-mail genérico para simulação
        setUserEmail("usuario.nauta@email.com")
      }
      setIsLoading(false)
    }, 1000)
  }, [searchParams, router])

  const handleSendLink = async () => {
    setIsLoading(true)

    // Simular envio do e-mail
    setTimeout(() => {
      setEmailSent(true)
      setIsLoading(false)

      // Redirecionar para a página de redefinição após alguns segundos
      setTimeout(() => {
        router.push(`/redefinir-senha?token=mock-token-${Date.now()}`)
      }, 3000)
    }, 2000)
  }

  if (isLoading && !emailSent) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-12 bg-slate-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-neutral-600">Verificando informações...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <AnchorIcon className="mx-auto h-12 w-12 text-teal-600 mb-4" />
            <CardTitle className="text-2xl font-bold text-neutral-800">Redefinir senha</CardTitle>
            {!emailSent ? (
              <CardDescription className="text-center">
                Enviaremos um link para o e-mail <span className="font-medium text-teal-600">'{userEmail}'</span> para
                confirmar sua alteração de senha.
              </CardDescription>
            ) : (
              <CardDescription className="text-green-600 text-center">Link enviado com sucesso!</CardDescription>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {!emailSent ? (
              <div className="text-center">
                <Mail className="mx-auto h-16 w-16 text-teal-600 mb-4" />
                <p className="text-sm text-neutral-600 mb-6">
                  Clique no botão abaixo para enviar o link de redefinição de senha para o seu e-mail cadastrado.
                </p>
                <Button onClick={handleSendLink} disabled={isLoading} className="w-full bg-teal-600 hover:bg-teal-700">
                  {isLoading ? "Enviando..." : "Enviar link"}
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <p className="text-neutral-700 mb-4">
                  O link de redefinição foi enviado para <span className="font-medium text-teal-600">{userEmail}</span>
                </p>
                <p className="text-sm text-neutral-500">
                  Você será redirecionado automaticamente em alguns segundos...
                </p>
              </div>
            )}
          </CardContent>

          <div className="p-6 text-center">
            <Link href="/login" className="text-sm text-teal-600 hover:underline">
              Voltar para o Login
            </Link>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
