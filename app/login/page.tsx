// ============================================
// PÁGINA DE LOGIN
// ============================================
// Permite que usuários façam login com email/senha ou Google
// Inclui botão para simular login como administrador

"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { AnchorIcon, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { login, loginWithGoogle, loginAsAdmin } = useAuth()

  // Estados do formulário
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // handleLogin: Processa o login tradicional
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Tenta fazer login
    const success = login(email, password)

    if (success) {
      // Login bem-sucedido: redireciona para home
      setTimeout(() => {
        router.push("/")
      }, 500)
    } else {
      // Login falhou: mostra mensagem de erro
      setError("Email ou senha incorretos. Tente novamente.")
      setLoading(false)
    }
  }

  // handleGoogleLogin: Processa login com Google
  const handleGoogleLogin = () => {
    setLoading(true)
    // Simula delay de autenticação
    setTimeout(() => {
      loginWithGoogle()
      router.push("/")
    }, 1000)
  }

  // handleAdminLogin: Simula login como administrador
  const handleAdminLogin = () => {
    setLoading(true)
    setTimeout(() => {
      loginAsAdmin()
      router.push("/")
    }, 500)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 bg-slate-50 px-4">
        <Card className="w-full max-w-md shadow-xl">
          {/* Cabeçalho */}
          <CardHeader className="text-center space-y-2">
            <AnchorIcon className="mx-auto h-12 w-12 text-teal-600" />
            <CardTitle className="text-2xl font-bold">Acessar sua Conta</CardTitle>
            <CardDescription>Bem-vindo de volta! Faça login para continuar.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Mensagem de erro */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Botão de login com Google */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base font-medium border-2 bg-transparent"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              {/* Logo do Google */}
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Entrar com o Google
            </Button>

            {/* Divisor */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Ou continue com email</span>
              </div>
            </div>

            {/* Formulário de login tradicional */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Campo de email */}
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Campo de senha */}
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Botão de submit */}
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            {/* Divisor para área de testes */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-dashed" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Área de Testes</span>
              </div>
            </div>

            {/* Botão para simular login como admin */}
            <Button type="button" variant="secondary" className="w-full" onClick={handleAdminLogin} disabled={loading}>
              🔧 Simular Login Admin
            </Button>

            {/* Dica de credenciais */}
            <div className="text-xs text-center text-muted-foreground bg-slate-50 p-3 rounded border">
              <p className="font-medium mb-1">💡 Credenciais para teste:</p>
              <p className="font-mono">usuario@nautatreinamentos.com / senha123</p>
              <p className="font-mono">admin@nautatreinamentos.com / admin123</p>
            </div>
          </CardContent>

          {/* Rodapé */}
          <CardFooter className="flex flex-col space-y-2">
            <Link href="/esqueci-senha" className="text-sm text-teal-600 hover:underline">
              Esqueceu sua senha?
            </Link>
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link href="/cadastro" className="font-medium text-teal-600 hover:underline">
                Criar conta
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
