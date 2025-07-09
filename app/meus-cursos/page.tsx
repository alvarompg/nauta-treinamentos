"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { mockUserCourses, type UserCourse } from "@/lib/data"
import { GraduationCap, PlayCircle, Award } from "lucide-react"

export default function MeusCursosPage() {
  // In a real app, fetch user's courses based on logged-in user
  const userCourses: UserCourse[] = mockUserCourses

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12 md:py-16 bg-slate-50">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="h-8 w-8 text-teal-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800">Meus Cursos</h1>
          </div>

          {userCourses.length === 0 ? (
            <div className="text-center py-10">
              <GraduationCap className="h-24 w-24 text-slate-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-neutral-700 mb-2">Você ainda não possui cursos</h2>
              <p className="text-neutral-500 mb-6">
                Explore nossa grade de cursos e comece sua jornada de aprendizado.
              </p>
              <Button asChild className="bg-teal-600 hover:bg-teal-700">
                <Link href="/cursos">Ver Cursos Disponíveis</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userCourses.map((course) => (
                <Card key={course.id} className="flex flex-col overflow-hidden shadow-lg rounded-xl">
                  <CardHeader className="p-0 relative">
                    <Image
                      src={course.imageUrl || "/placeholder.svg"}
                      alt={course.name}
                      width={400}
                      height={200}
                      className="object-cover w-full h-40"
                    />
                    {course.progress === 100 && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                        <Award className="h-3 w-3" /> Concluído
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="flex-grow p-5 space-y-3">
                    <CardTitle className="text-lg font-semibold text-neutral-800 leading-tight">
                      {course.name}
                    </CardTitle>
                    <div>
                      <div className="flex justify-between text-sm text-muted-foreground mb-1">
                        <span>Progresso</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter className="p-5 bg-slate-50">
                    {course.progress === 100 && course.certificateAvailable ? (
                      <Button asChild className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-900">
                        <Link href="/meus-certificados">
                          <Award className="mr-2 h-4 w-4" /> Ver Certificado
                        </Link>
                      </Button>
                    ) : (
                      <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                        <Link href={`/curso-exemplo?id=${course.courseId}`}>
                          {" "}
                          {/* Adjust link as needed */}
                          <PlayCircle className="mr-2 h-4 w-4" /> Acessar Curso
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
