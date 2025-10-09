// ============================================
// PÁGINA DE CADASTRO
// ============================================
// Permite que novos usuários criem uma conta
// Inclui validação de idade (data de nascimento)

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

export default function CadastroPage() {
  const router = useRouter()

  // Estados do formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthDate: "", // NOVO: Campo de data de nascimento
    cpf: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // handleChange: Atualiza os campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
    // Limpa erro quando usuário começa a digitar
    if (error) setError("")
  }

  // validateAge: Verifica se o usuário tem pelo menos 18 anos
  const validateAge = (birthDate: string): boolean => {
    const birth = new Date(birthDate)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()

    // Ajusta a idade se ainda não fez aniversário este ano
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }

    return age >= 18
  }

  // handleRegister: Processa o cadastro
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validações

    // 1. Verifica se as senhas coincidem
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.")
      return
    }

    // 2. Verifica tamanho mínimo da senha
    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.")
      return
    }

    // 3. Valida data de nascimento (mínimo 18 anos)
    if (!validateAge(formData.birthDate)) {
      setError("Você deve ter pelo menos 18 anos para se cadastrar.")
      return
    }

    // 4. Valida data não pode ser futura
    if (new Date(formData.birthDate) > new Date()) {
      setError("A data de nascimento não pode ser no futuro.")
      return
    }

    // Se passou nas validações, simula criação de conta
    setLoading(true)
    setTimeout(() => {
      // Redireciona para login
      router.push("/login?cadastro=sucesso")
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 bg-slate-50 px-4">
        <Card className="w-full max-w-2xl shadow-xl">
          {/* Cabeçalho */}
          <CardHeader className="text-center space-y-2">
            <AnchorIcon className="mx-auto h-12 w-12 text-teal-600" />
            <CardTitle className="text-2xl font-bold">Crie sua Conta</CardTitle>
            <CardDescription>Junte-se à Nauta Treinamentos e impulsione sua carreira!</CardDescription>
          </CardHeader>

          <CardContent>
            {/* Mensagem de erro */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleRegister} className="space-y-6">
              {/* Grid: 2 colunas no desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nome completo */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Nome Completo <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    E-mail <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Data de nascimento - CAMPO NOVO */}
              <div className="space-y-2">
                <Label htmlFor="birthDate">
                  Data de Nascimento <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  max={new Date().toISOString().split("T")[0]} // Não permite datas futuras
                  className="block w-full"
                />
                <p className="text-xs text-muted-foreground">Você deve ter pelo menos 18 anos</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CPF */}
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                {/* Telefone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Senha */}
                <div className="space-y-2">
                  <Label htmlFor="password">
                    Senha <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                {/* Confirmar senha */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Confirmar Senha <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repita sua senha"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Botão de submit */}
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 h-11" disabled={loading}>
                {loading ? "Criando conta..." : "Criar Conta"}
              </Button>
            </form>
          </CardContent>

          {/* Rodapé */}
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link href="/login" className="font-medium text-teal-600 hover:underline">
                Fazer login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
