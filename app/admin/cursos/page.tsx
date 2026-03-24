"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Edit, Trash2, Plus, BookOpen } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { courses, type Course } from "@/lib/data"

export default function GerenciarCursosPage() {
  const router = useRouter()
  const { user, isAdmin, isLoading } = useAuth()
  const [cursosList, setCursosList] = useState<Course[]>(courses)
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null)

  // Proteção: Aguarda carregar dados do localStorage antes de verificar
  useEffect(() => {
    if (isLoading) return
    
    if (!user) {
      router.push("/login")
    } else if (!isAdmin) {
      router.push("/")
    }
  }, [user, isAdmin, isLoading, router])

  const handleDeleteClick = (course: Course) => {
    setCourseToDelete(course)
  }

  const confirmDelete = () => {
    if (courseToDelete) {
      setCursosList(cursosList.filter((c) => c.id !== courseToDelete.id))
      setCourseToDelete(null)
      console.log(`Treinamento ${courseToDelete.name} deletado`)
    }
  }

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-neutral-600">Verificando acesso...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-slate-50 py-8 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-2">
                <Link href="/painel" className="hover:text-teal-600">
                  Painel
                </Link>{" "}
                / Gerenciar Treinamentos
              </div>
              <h1 className="text-3xl font-bold text-neutral-900">Gerenciar Treinamentos</h1>
              <p className="text-muted-foreground mt-1">Visualize, edite e organize todos os treinamentos da plataforma</p>
            </div>
            <Link href="/admin/cursos/novo">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                <Plus className="h-5 w-5 mr-2" />
                Criar Novo Treinamento
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total de Treinamentos</CardDescription>
                <CardTitle className="text-2xl">{cursosList.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Treinamentos Publicados</CardDescription>
                <CardTitle className="text-2xl">{cursosList.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Rascunhos</CardDescription>
                <CardTitle className="text-2xl">0</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Todos os Treinamentos ({cursosList.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cursosList.map((course) => (
                  <div
                    key={course.id}
                    className="flex flex-col md:flex-row md:items-center gap-4 p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-full md:w-32 h-20 bg-slate-200 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={course.imageUrl || "/placeholder.svg"}
                        alt={course.name}
                        width={128}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-grow min-w-0">
                      <h3 className="font-semibold text-lg text-neutral-900 truncate">{course.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{course.shortDescription}</p>
                      <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded">{course.category}</span>
                        {course.duration && <span>⏱️ {course.duration}</span>}
                        <span>💰 {course.price}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 md:flex-col md:w-auto w-full">
                      <Link href={`/admin/cursos/editar/${course.id}`} className="flex-1 md:flex-none">
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 md:flex-none text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                        onClick={() => handleDeleteClick(course)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Deletar
                      </Button>
                    </div>
                  </div>
                ))}

                {cursosList.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Nenhum treinamento cadastrado ainda</p>
                    <p className="text-sm">Clique em "Criar Novo Treinamento" para começar</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />

      <AlertDialog open={!!courseToDelete} onOpenChange={() => setCourseToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Você tem certeza que deseja deletar o treinamento <strong>{courseToDelete?.name}</strong>? Esta ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 focus:ring-red-600">
              Confirmar Exclusão
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
