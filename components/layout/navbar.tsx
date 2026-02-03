// ============================================
// NAVBAR - BARRA DE NAVEGAÇÃO PRINCIPAL
// ============================================
// Menu superior do site que aparece em todas as páginas
// Muda dinamicamente baseado no estado de autenticação do usuário
// Mostra link "Painel" apenas para administradores

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { AnchorIcon, Menu, ShoppingCart, User, LogOut, BookOpen, Award, LayoutDashboard } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"

// Lista de itens do menu principal
const navItems = [
  { label: "Início", href: "/" },
  { label: "Treinamentos", href: "/cursos" }, // Alterado de "Cursos" para "Treinamentos"
  { label: "Sobre Nós", href: "/sobre" },
]

export default function Navbar() {
  const pathname = usePathname() // Hook para saber em qual página estamos
  const { user, isAdmin, logout } = useAuth() // Dados de autenticação

  // Função auxiliar: Verifica se um link está ativo
  const isActive = (href: string) => pathname === href

  // Função auxiliar: Gera iniciais do nome para o avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* LOGO E NOME */}
        <Link href="/" className="flex items-center space-x-2">
          <AnchorIcon className="h-8 w-8 text-teal-600" />
          <span className="hidden font-bold text-xl sm:inline-block">
            <span className="text-teal-700">Nauta</span>
            <span className="text-neutral-700">Treinamentos</span>
          </span>
        </Link>

        {/* MENU DESKTOP - Links principais */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-teal-600",
                isActive(item.href) ? "text-teal-600" : "text-neutral-700",
              )}
            >
              {item.label}
            </Link>
          ))}

          {/* Link "Painel" - Só aparece para administradores */}
          {isAdmin && (
            <Link
              href="/painel"
              className={cn(
                "text-sm font-medium transition-colors hover:text-teal-600 flex items-center gap-1",
                isActive("/painel") ? "text-teal-600" : "text-neutral-700",
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              Painel
            </Link>
          )}
        </div>

        {/* AÇÕES DO USUÁRIO - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Carrinho de compras - DESATIVADO TEMPORARIAMENTE
          Será reativado no futuro quando implementarmos o fluxo de compra completo
          <Link href="/carrinho">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-teal-600 text-xs text-white flex items-center justify-center">
                2
              </span>
            </Button>
          </Link>
          */}

          {/* Menu do usuário */}
          {user ? (
            // USUÁRIO LOGADO: Mostra avatar e menu dropdown
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-teal-600 text-white">{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                {/* Informações do usuário */}
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    {isAdmin && (
                      <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded w-fit">Administrador</span>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />

                {/* Links rápidos */}
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/painel" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Painel Admin
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/meus-cursos" className="cursor-pointer">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Meus Treinamentos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/meus-certificados" className="cursor-pointer">
                    <Award className="mr-2 h-4 w-4" />
                    Certificados
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/minha-conta" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Minha Conta
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // USUÁRIO NÃO LOGADO: Mostra botões de login e cadastro
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro">
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                  Cadastrar
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* MENU MOBILE - Hamburger */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-4 mt-4">
              {/* Links principais */}
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={cn("text-lg font-medium", isActive(item.href) ? "text-teal-600" : "text-neutral-700")}
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}

              {/* Link Painel para admin */}
              {isAdmin && (
                <SheetClose asChild>
                  <Link
                    href="/painel"
                    className={cn(
                      "text-lg font-medium flex items-center gap-2",
                      isActive("/painel") ? "text-teal-600" : "text-neutral-700",
                    )}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Painel
                  </Link>
                </SheetClose>
              )}

              <div className="border-t pt-4 mt-4">
                {user ? (
                  // Menu do usuário logado
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar>
                        <AvatarImage src={user.avatarUrl || "/placeholder.svg"} />
                        <AvatarFallback className="bg-teal-600 text-white">{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        {isAdmin && (
                          <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded">Admin</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {isAdmin && (
                        <SheetClose asChild>
                          <Link href="/painel">
                            <Button variant="outline" className="w-full justify-start bg-transparent">
                              <LayoutDashboard className="mr-2 h-4 w-4" />
                              Painel Admin
                            </Button>
                          </Link>
                        </SheetClose>
                      )}
                      <SheetClose asChild>
                        <Link href="/meus-cursos">
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Meus Treinamentos
                          </Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/meus-certificados">
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <Award className="mr-2 h-4 w-4" />
                            Certificados
                          </Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/minha-conta">
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <User className="mr-2 h-4 w-4" />
                            Minha Conta
                          </Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                          onClick={logout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sair
                        </Button>
                      </SheetClose>
                    </div>
                  </>
                ) : (
                  // Botões para não logados
                  <div className="flex flex-col gap-2">
                    <SheetClose asChild>
                      <Link href="/login">
                        <Button variant="outline" className="w-full bg-transparent">
                          Entrar
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/cadastro">
                        <Button className="w-full bg-teal-600 hover:bg-teal-700">Cadastrar</Button>
                      </Link>
                    </SheetClose>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
