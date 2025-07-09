"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { AnchorIcon } from "lucide-react"

export default function CadastroPage() {
  const router = useRouter()

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault()
    // In a real app, you'd call an API for registration.
    alert("Cadastro simulado! Redirecionando para login.")
    router.push("/login")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 bg-slate-50">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader className="text-center">
            <AnchorIcon className="mx-auto h-12 w-12 text-teal-600 mb-2" />
            <CardTitle className="text-2xl font-bold text-neutral-800">Crie sua Conta</CardTitle>
            <CardDescription>Junte-se à Nauta Treinamentos e impulsione sua carreira!</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input id="fullName" placeholder="Seu nome completo" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="password">Senha</Label>
                  <Input id="password" type="password" placeholder="Crie uma senha forte" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirme sua senha" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" placeholder="000.000.000-00" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" type="tel" placeholder="(00) 00000-0000" required />
                </div>
              </div>
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 mt-4">
                Criar Conta
              </Button>
            </form>
          </CardContent>
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
