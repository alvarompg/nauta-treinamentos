// Componente Navbar: Responsável pela navegação principal do site.
// Inclui links para as páginas, carrinho de compras e menu de usuário/login.
// Utiliza o componente Sheet do shadcn/ui para o menu mobile.
// Simula o estado de login e exibe informações do usuário e carrinho.
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Menu, X, AnchorIcon, ShoppingCart, LogOut, Settings, Award, ChevronDown, GraduationCap } from "lucide-react"
import {
  navItems,
  type NavItem,
  mockUser,
  mockUserCourses,
  mockCartItems,
  type User,
  type UserCourse,
} from "@/lib/data"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
import { Progress } from "@/components/ui/progress"

export default function Navbar() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Simulate login state
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [cartCount, setCartCount] = useState(0)
  const [userCourses, setUserCourses] = useState<UserCourse[]>([])

  // useEffect: Hook do React que executa efeitos colaterais.
  // Aqui, ele é usado para simular a busca de dados do usuário e do carrinho
  // quando o estado de `isLoggedIn` muda.
  useEffect(() => {
    // Se o usuário estiver logado (isLoggedIn === true)
    if (isLoggedIn) {
      setCurrentUser(mockUser) // Define o usuário atual com dados mockados
      setCartCount(mockCartItems.length) // Define a contagem de itens no carrinho
      setUserCourses(mockUserCourses.slice(0, 3)) // Define os 3 primeiros cursos do usuário para o dropdown
    } else {
      // Se o usuário não estiver logado
      setCurrentUser(null) // Limpa os dados do usuário atual
      setCartCount(0) // Reseta a contagem do carrinho
      setUserCourses([]) // Limpa a lista de cursos do usuário
    }
  }, [isLoggedIn]) // Este efeito será re-executado sempre que `isLoggedIn` mudar

  // handleLogin: Função para simular o login do usuário.
  // Em uma aplicação real, aqui ocorreria a chamada para uma API de autenticação.
  const handleLogin = () => setIsLoggedIn(true) // Placeholder for actual login
  // handleLogout: Função para simular o logout do usuário.
  const handleLogout = () => setIsLoggedIn(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <AnchorIcon className="h-7 w-7 text-teal-600" />
          <span className="text-xl font-bold text-teal-700">
            Nauta<span className="text-neutral-700">Treinamentos</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {navItems.map((item: NavItem) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-teal-600",
                pathname === item.href ? "text-teal-600" : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}

          <Link href="/carrinho" className="relative">
            <ShoppingCart className="h-5 w-5 text-muted-foreground hover:text-teal-600" />
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

          {isLoggedIn && currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={currentUser.avatarUrl || "/placeholder.svg"} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="hidden lg:inline text-sm font-medium">{currentUser.name.split(" ")[0]}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    <span>Meus Cursos</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-72">
                      {userCourses.length > 0 ? (
                        userCourses.map((course) => (
                          <DropdownMenuItem key={course.id} asChild>
                            <Link href={`/curso/${course.courseId}`} className="flex flex-col items-start w-full">
                              <span className="text-sm font-medium">{course.name}</span>
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
                <DropdownMenuItem asChild>
                  <Link href="/minha-conta">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações da Conta</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild className="bg-amber-500 hover:bg-amber-600 text-neutral-900">
                <Link href="/cadastro">Cadastro</Link>
              </Button>
              <Button size="sm" onClick={handleLogin} variant="link" className="text-xs text-muted-foreground">
                (Simular Login Desktop)
              </Button>
            </>
          )}
        </nav>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs">
            <div className="flex flex-col h-full">
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
                {/* Button to simulate login for testing in mobile */}
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

// Add a simple style for mobile nav links if needed in globals.css or here
/*
.mobile-nav-link {
@apply flex items-center text-base font-medium text-muted-foreground hover:text-teal-600 py-2;
}
*/
