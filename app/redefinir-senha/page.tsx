// Página "Redefinir Senha"
// Permite ao usuário definir uma nova senha após clicar no link recebido por e-mail.
// Esta página normalmente seria acessada com um token na URL.
"use client"

import type React from "react" // Importa o tipo React para tipagem de eventos
import Link from "next/link" // Componente para navegação entre páginas do Next.js
import { useRouter, useSearchParams } from "next/navigation" // Hooks para navegação e parâmetros de URL
import { Button } from "@/components/ui/button" // Componente de botão estilizado
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card" // Componentes de card para layout
import { Input } from "@/components/ui/input" // Componente de input estilizado
import { Label } from "@/components/ui/label" // Componente de label para inputs
import Navbar from "@/components/layout/navbar" // Componente da barra de navegação principal
import Footer from "@/components/layout/footer" // Componente do rodapé principal
import { KeyRound, CheckCircle } from "lucide-react" // Ícones
import { useState, useEffect } from "react" // Hooks para gerenciar estado e efeitos colaterais

export default function RedefinirSenhaPage() {
  // useRouter: Hook para obter o objeto router e controlar a navegação programaticamente.
  const router = useRouter()
  // useSearchParams: Hook para acessar os parâmetros da query string da URL (ex: ?token=...).
  const searchParams = useSearchParams()
  // useState: Hook para gerenciar o estado da nova senha.
  const [newPassword, setNewPassword] = useState("")
  // useState: Hook para gerenciar o estado da confirmação da nova senha.
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  // useState: Hook para gerenciar o estado de erro (senhas não conferem).
  const [error, setError] = useState("")
  // useState: Hook para gerenciar o estado de sucesso na redefinição.
  const [success, setSuccess] = useState(false)
  // useState: Hook para gerenciar o estado do token (simulado).
  const [token, setToken] = useState<string | null>(null)

  // useEffect: Hook para simular a validação do token da URL.
  // Em uma aplicação real, o token seria enviado para a API para validação.
  useEffect(() => {
    const urlToken = searchParams.get("token") // Pega o 'token' da URL.
    if (urlToken) {
      // Simula validação do token. Se for válido:
      setToken(urlToken)
      console.log("Token recebido:", urlToken)
    } else {
      // Se não houver token, poderia redirecionar ou mostrar erro.
      // Para este exemplo, permitimos o acesso, mas uma API real bloquearia.
      console.log("Nenhum token de redefinição encontrado na URL.")
      // Poderia redirecionar: router.push("/login?error=invalid_token");
    }
  }, [searchParams, router]) // Executa quando searchParams ou router mudam.

  // handleResetPassword: Função chamada quando o formulário de redefinição de senha é submetido.
  // event: Objeto do evento do formulário.
  const handleResetPassword = (event: React.FormEvent) => {
    event.preventDefault() // Previne o comportamento padrão do formulário.
    setError("") // Limpa erros anteriores.

    // Verifica se as senhas digitadas são iguais.
    if (newPassword !== confirmNewPassword) {
      setError("As senhas não conferem. Tente novamente.")
      return // Interrompe a função se as senhas forem diferentes.
    }

    // Verifica se a nova senha tem um comprimento mínimo (exemplo).
    if (newPassword.length < 6) {
      setError("A nova senha deve ter pelo menos 6 caracteres.")
      return
    }

    // Em uma aplicação real, aqui você chamaria uma API para redefinir a senha,
    // enviando o token e a nova senha.
    console.log("Nova senha:", newPassword, "Token (simulado):", token || "N/A")
    setSuccess(true) // Define que a senha foi redefinida com sucesso (simulação).

    // Opcional: Redirecionar para a página de login após um tempo.
    setTimeout(() => {
      router.push("/login")
    }, 3000) // Redireciona após 3 segundos.
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
            <KeyRound className="mx-auto h-12 w-12 text-teal-600 mb-2" />
            <CardTitle className="text-2xl font-bold text-neutral-800">Redefinir sua Senha</CardTitle>
            {!success ? (
              <CardDescription>Crie uma nova senha para sua conta.</CardDescription>
            ) : (
              <CardDescription className="text-green-600">Senha redefinida com sucesso!</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {!success ? (
              // Formulário para redefinir a senha.
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Digite sua nova senha"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)} // Atualiza o estado da nova senha.
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmNewPassword">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmNewPassword"
                    type="password"
                    placeholder="Confirme sua nova senha"
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)} // Atualiza o estado da confirmação.
                  />
                </div>
                {/* Exibe mensagem de erro, se houver. */}
                {error && <p className="text-sm text-red-600">{error}</p>}
                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                  Redefinir Senha
                </Button>
              </form>
            ) : (
              // Mensagem de sucesso após redefinir a senha.
              <div className="text-center">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <p className="text-neutral-700">
                  Sua senha foi alterada com sucesso. Você será redirecionado para a página de login em alguns segundos.
                </p>
                <Button asChild variant="link" className="mt-4 text-teal-600">
                  <Link href="/login">Ir para Login agora</Link>
                </Button>
              </div>
            )}
          </CardContent>
          {!success && (
            <CardFooter className="flex flex-col items-center space-y-2">
              <Link href="/login" className="text-sm text-teal-600 hover:underline">
                Lembrou sua senha? Fazer Login
              </Link>
            </CardFooter>
          )}
        </Card>
      </main>
      {/* Rodapé */}
      <Footer />
    </div>
  )
}
