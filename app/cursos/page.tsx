"use client"

import { useState, useMemo } from "react"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import CourseCard from "@/components/ui/course-card"
import AnimatedHeading from "@/components/ui/animated-heading"
import ScrollRevealSection from "@/components/ui/scroll-reveal-section"
import { courses, courseCategories, qualityStats, type Course, type QualityStat } from "@/lib/data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ListFilter, Search, Award } from "lucide-react"

export default function CursosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>(courseCategories[0])
  const [searchTerm, setSearchTerm] = useState<string>("")

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const categoryMatch = selectedCategory === "Todos" || course.category === selectedCategory
      const searchMatch =
        searchTerm.trim() === "" ||
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.keywords && course.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm.toLowerCase())))
      return categoryMatch && searchMatch
    })
  }, [selectedCategory, searchTerm])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-slate-100 py-12 md:py-16">
          <div className="container text-center">
            <AnimatedHeading
              text="Nossos Cursos"
              className="text-4xl md:text-5xl font-bold text-teal-700 mb-4"
              el="h1"
            />
            <ScrollRevealSection delay={0.2}>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto text-balance">
                Explore nossa grade completa de treinamentos offshore, projetados para cada etapa da sua carreira.
              </p>
            </ScrollRevealSection>
          </div>
        </section>

        {/* Filters and Courses Grid Section */}
        <ScrollRevealSection className="py-12 md:py-16">
          <div className="container">
            <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6 p-4 bg-white rounded-xl shadow">
              <div className="relative w-full md:flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar cursos pelo nome ou palavra-chave..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <ListFilter className="h-5 w-5 text-muted-foreground" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-[200px] bg-white">
                    <SelectValue placeholder="Filtrar por categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-neutral-800 mb-8">
              Exibindo {filteredCourses.length} de {courses.length} cursos
            </h2>

            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course: Course, index: number) => (
                  <ScrollRevealSection key={course.id} delay={index * 0.05} yOffset={30} className="h-full">
                    <CourseCard course={course} />
                  </ScrollRevealSection>
                ))}
              </div>
            ) : (
              <p className="text-center text-neutral-600 text-lg py-10">
                Nenhum curso encontrado para os critérios selecionados. Tente ajustar sua busca ou filtros.
              </p>
            )}
          </div>
        </ScrollRevealSection>

        {/* Trust Badge/Stats Section */}
        <ScrollRevealSection className="bg-teal-700 text-white py-16 md:py-20">
          <div className="container">
            <div className="text-center mb-12">
              <Award className="h-12 w-12 text-amber-400 mx-auto mb-3" />
              <h2 className="text-3xl font-bold">Qualidade Comprovada e Reconhecida</h2>
              <p className="text-teal-100 text-lg mt-2 max-w-2xl mx-auto text-balance">
                Nossos números refletem o compromisso com a excelência e o sucesso dos nossos alunos.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {qualityStats.map((stat: QualityStat, index: number) => (
                <ScrollRevealSection key={stat.label} delay={index * 0.1} yOffset={30}>
                  <div className="p-6 bg-teal-600 rounded-lg text-center h-full flex flex-col justify-center items-center">
                    <stat.icon className="h-10 w-10 text-amber-400 mb-3" />
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-teal-200 text-sm mt-1">{stat.label}</p>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </ScrollRevealSection>
      </main>
      <Footer />
    </div>
  )
}
