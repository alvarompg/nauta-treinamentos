"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { mockUser, type User } from "@/lib/data"
import { UserCircle, Save } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function MinhaContaPage() {
  // In a real app, fetch user data
  const [userData, setUserData] = useState<User | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  useEffect(() => {
    // Simulate fetching user data
    setUserData(mockUser)
    setName(mockUser.name)
    setEmail(mockUser.email)
    setPhone(mockUser.phone || "")
  }, [])

  const handleSaveChanges = (event: React.FormEvent) => {
    event.preventDefault()
    // In a real app, call API to save changes
    alert("Alterações salvas (simulação)!")
  }

  if (!userData) {
    return (
      // Basic loading state or redirect to login
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p>Carregando dados do usuário...</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12 md:py-16 bg-slate-50">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <UserCircle className="h-8 w-8 text-teal-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800">Configurações da Conta</h1>
          </div>

          <Card className="w-full max-w-2xl mx-auto shadow-xl">
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 mb-4 border-4 border-teal-200">
                <AvatarImage src={userData.avatarUrl || "/placeholder.svg"} alt={userData.name} />
                <AvatarFallback>{userData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{userData.name}</CardTitle>
              <CardDescription>{userData.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveChanges} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input id="fullName" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <CardTitle className="text-xl pt-4 border-t mt-6">Alterar Senha</CardTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <Label htmlFor="newPassword">Nova Senha</Label>
                    <Input id="newPassword" type="password" placeholder="Deixe em branco para não alterar" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="confirmNewPassword">Confirmar Nova Senha</Label>
                    <Input id="confirmNewPassword" type="password" placeholder="Confirme a nova senha" />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 mt-4">
                  <Save className="mr-2 h-4 w-4" /> Salvar Alterações
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
