"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation" // Changed from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { AnchorIcon } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault()
    // In a real app, you'd call an API, then on success:
    // For demonstration, we'll just navigate to home.
    // To make the navbar update, you'd need a global state (Context/Zustand/Redux)
    // or pass a login function from a parent component if Navbar was a direct child.
    // For now, this button won't actually log the user in visually on the navbar from here.
    // The "Simular Login" button on Navbar itself can be used for visual testing.
    alert("Login simulado! Redirecionando para a home.")
    router.push("/")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 bg-slate-50">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <AnchorIcon className="mx-auto h-12 w-12 text-teal-600 mb-2" />
            <CardTitle className="text-2xl font-bold text-neutral-800">Acessar sua Conta</CardTitle>
            <CardDescription>Bem-vindo de volta! Faça login para continuar.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" type="text" placeholder="000.000.000-00" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" placeholder="Sua senha" required />
              </div>
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                Entrar
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            <Link href="#" className="text-sm text-teal-600 hover:underline">
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
