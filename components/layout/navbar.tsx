// Componente Navbar: Barra de navegação principal do site
// Responsável por:
// - Exibir logo e menu de navegação
// - Mostrar carrinho de compras
// - Gerenciar login/logout do usuário
// - Menu responsivo para mobile

"use client" // Indica que este é um Client Component (roda no navegador)

// Importações do React e Next.js
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Importações de componentes UI
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"

// Importações de ícones
import { Menu, X, AnchorIcon, ShoppingCart, LogOut, Settings, Award, ChevronDown, GraduationCap } from "lucide-react"

// Importações de dados e utilitários
import {
  navItems,
  type NavItem,
  mockUser,
  mockUserCourses,
  mockCartItems,
  type User,
  type UserCourse,
} from "@/lib/data"
import { cn } from "@/lib/utils"

export default function Navbar() {
  // Hook para obter a rota atual (para destacar item ativo no menu)
  const pathname = usePathname()

  // Estados para gerenciar login e dados do usuário
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Se usuário está logado
  const [currentUser, setCurrentUser] = useState<User | null>(null) // Dados do usuário atual
  const [cartCount, setCartCount] = useState(0) // Quantidade de itens no carrinho
  const [userCourses, setUserCourses] = useState<UserCourse[]>([]) // Cursos do usuário

  // useEffect: Executa quando o estado de login muda
  // Simula busca de dados do usuário quando faz login
  useEffect(() => {
    if (isLoggedIn) {
      // Usuário logado: carrega dados mockados
      setCurrentUser(mockUser)
      setCartCount(mockCartItems.length)
      setUserCourses(mockUserCourses.slice(0, 3)) // Primeiros 3 cursos para o dropdown
    } else {
      // Usuário não logado: limpa todos os dados
      setCurrentUser(null)
      setCartCount(0)
      setUserCourses([])
    }
  }, [isLoggedIn])

  // Funções para simular login/logout
  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => setIsLoggedIn(false)

  return (
    // Header fixo no topo da página
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo da empresa */}
        <Link href="/" className="flex items-center gap-2">
          <AnchorIcon className="h-7 w-7 text-teal-600" />
          <span className="text-xl font-bold text-teal-700">
            Nauta<span className="text-neutral-700">Treinamentos</span>
          </span>
        </Link>

        {/* Menu de navegação - Desktop */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {/* Links do menu principal */}
          {navItems.map((item: NavItem) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-teal-600",
                // Destaca o item ativo com cor diferente
                pathname === item.href ? "text-teal-600" : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}

          {/* Ícone do carrinho com badge de quantidade */}
          <Link href="/carrinho" className="relative">
            <ShoppingCart className="h-5 w-5 text-muted-foreground hover:text-teal-600" />
            {/* Badge mostra quantidade de itens no carrinho */}
            {cartCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs"
              >
                {cartCount}
              </Badge>
            )}
            <span className="sr-only">Carrinho</span>
          </Link>

          {/* Área do usuário - Logado vs Não logado */}
          {isLoggedIn && currentUser ? (
            // Menu dropdown do usuário logado
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                  {/* Avatar do usuário */}
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={currentUser.avatarUrl || "/placeholder.svg"} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {/* Nome do usuário (só no desktop) */}
                  <span className="hidden lg:inline text-sm font-medium">{currentUser.name.split(" ")[0]}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>

              {/* Conteúdo do dropdown */}
              <DropdownMenuContent align="end" className="w-64">
                {/* Informações do usuário */}
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* Submenu de cursos do usuário */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    <span>Meus Cursos</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-72">
                      {/* Lista dos cursos recentes do usuário */}
                      {userCourses.length > 0 ? (
                        userCourses.map((course) => (
                          <DropdownMenuItem key={course.id} asChild>
                            <Link href={`/curso/${course.courseId}`} className="flex flex-col items-start w-full">
                              <span className="text-sm font-medium">{course.name}</span>
                              {/* Barra de progresso do curso */}
                              <div className="w-full flex items-center gap-2 mt-1">
                                <Progress value={course.progress} className="h-1.5 flex-grow" />
                                <span className="text-xs text-muted-foreground">{course.progress}%</span>
                              </div>
                            </Link>
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <DropdownMenuItem disabled>Nenhum curso recente</DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/meus-cursos">Ver todos os meus cursos</Link>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                {/* Links rápidos do usuário */}
                <DropdownMenuItem asChild>
                  <Link href="/carrinho">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    <span>Meu Carrinho</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/meus-certificados">
                    <Award className="mr-2 h-4 w-4" />
                    <span>Meus Certificados</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Configurações da conta */}
                <DropdownMenuItem asChild>
                  <Link href="/minha-conta">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações da Conta</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Botão de logout */}
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // Botões para usuário não logado
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild className="bg-amber-500 hover:bg-amber-600 text-neutral-900">
                <Link href="/cadastro">Cadastro</Link>
              </Button>
              {/* Botão para sim ular login (apenas para testes) */}
              <Button size="sm" onClick={handleLogin} variant="link" className="text-xs text-muted-foreground">
                (Simular Login Desktop)
              </Button>
            </>
          )}
        </nav>

        {/* Menu Mobile - Sheet (gaveta lateral) */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-full max-w-xs">
            <div className="flex flex-col h-full">
              {/* Header do menu mobile */}
              <div className="flex items-center justify-between p-4 border-b">
                <Link href="/" className="flex items-center gap-2">
                  <AnchorIcon className="h-6 w-6 text-teal-600" />
                  <span className="text-lg font-bold text-teal-700">Nauta</span>
                </Link>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Fechar menu</span>
                  </Button>
                </SheetClose>
              </div>

              {/* Links de navegação mobile */}
              <nav className="flex flex-col gap-4 p-4">
                {navItems.map((item: NavItem) => (
                  <SheetClose asChild key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-base font-medium transition-colors hover:text-teal-600 py-2",
                        pathname === item.href ? "text-teal-600" : "text-muted-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}

                <DropdownMenuSeparator className="my-2" />

                {/* Menu do usuário logado - Mobile */}
                {isLoggedIn && currentUser ? (
                  <>
                    <SheetClose asChild>
                      <Link href="/meus-cursos" className="mobile-nav-link">
                        <GraduationCap className="mr-2 h-4 w-4" />
                        Meus Cursos
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/carrinho" className="mobile-nav-link">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Meu Carrinho
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/meus-certificados" className="mobile-nav-link">
                        <Award className="mr-2 h-4 w-4" />
                        Meus Certificados
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/minha-conta" className="mobile-nav-link">
                        <Settings className="mr-2 h-4 w-4" />
                        Configurações
                      </Link>
                    </SheetClose>

                    <DropdownMenuSeparator className="my-2" />

                    <SheetClose asChild>
                      <Button
                        onClick={handleLogout}
                        variant="ghost"
                        className="w-full justify-start text-base font-medium text-muted-foreground hover:text-red-600 py-2"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                      </Button>
                    </SheetClose>
                  </>
                ) : (
                  // Botões para usuário não logado - Mobile
                  <>
                    <SheetClose asChild>
                      <Button asChild className="w-full bg-transparent" variant="outline">
                        <Link href="/login">Login</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-900">
                        <Link href="/cadastro">Cadastro</Link>
                      </Button>
                    </SheetClose>
                  </>
                )}

                {/* Botão para simular login no mobile (apenas para testes) */}
                {!isLoggedIn && (
                  <SheetClose asChild>
                    <Button onClick={handleLogin} variant="secondary" className="w-full mt-2">
                      Simular Login (Mobile)
                    </Button>
                  </SheetClose>
                )}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
