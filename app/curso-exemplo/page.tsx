"use client" // Required for useSearchParams

import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TestimonialItem from "@/components/ui/testimonial-item"
import AnimatedHeading from "@/components/ui/animated-heading" // Import AnimatedHeading
import ScrollRevealSection from "@/components/ui/scroll-reveal-section" // Import ScrollRevealSection
import { courses, testimonials, exampleDetailedCourse, type Course, type Module, type FAQItem } from "@/lib/data"
import { BookOpen, HelpCircle, Clock, Award, ChevronRight, Star } from "lucide-react"

function getCourseById(id: string | null): Course | undefined {
  if (!id) return exampleDetailedCourse
  return courses.find((course) => course.id === id) || exampleDetailedCourse
}

export default function CursoDetalhesPage() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get("id")
  const course = getCourseById(courseId)

  if (!course) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container py-10 text-center">
          <h1 className="text-2xl font-bold">Curso não encontrado</h1>
          <p>O curso que você está procurando não foi encontrado.</p>
          <Button asChild className="mt-4">
            <Link href="/cursos">Ver todos os cursos</Link>
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  const courseSpecificTestimonial = testimonials[0]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-slate-800 text-white py-16 md:py-24 overflow-hidden">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <ScrollRevealSection delay={0.1}>
                  <span className="text-sm font-semibold text-teal-400 uppercase tracking-wider">
                    {course.category}
                  </span>
                </ScrollRevealSection>
                <AnimatedHeading
                  text={course.name}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight my-3 text-balance"
                  el="h1"
                  stagger={0.02}
                />
                <ScrollRevealSection delay={0.3}>
                  <p className="text-lg text-slate-300 mb-6 text-balance">{course.shortDescription}</p>
                  <div className="flex items-center gap-4 mb-8 text-sm">
                    {course.duration && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-teal-400" /> {course.duration}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-teal-400" /> Certificação Inclusa
                    </span>
                  </div>
                  <Button
                    size="lg"
                    className="bg-amber-500 hover:bg-amber-600 text-neutral-900 text-lg px-8 py-6 rounded-lg"
                  >
                    Matricule-se Agora <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </ScrollRevealSection>
              </div>
              <ScrollRevealSection delay={0.2} className="hidden md:block">
                <Image
                  src={course.imageUrl || "/placeholder.svg?width=500&height=350&text=Detalhe+Curso"}
                  alt={`Imagem do curso ${course.name}`}
                  width={500}
                  height={350}
                  className="rounded-xl shadow-2xl"
                />
              </ScrollRevealSection>
            </div>
          </div>
        </section>

        <div className="container py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {course.modules && course.modules.length > 0 && (
                <ScrollRevealSection>
                  <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-semibold text-neutral-800 mb-6">
                    <BookOpen className="h-7 w-7 text-teal-600" /> O que você vai aprender
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {course.modules.map((module: Module, index: number) => (
                      <AccordionItem key={module.id} value={`item-${index + 1}`}>
                        <AccordionTrigger className="text-lg font-medium hover:no-underline text-left">
                          {module.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-neutral-600 leading-relaxed">
                          {module.content}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </ScrollRevealSection>
              )}

              {course.longDescription && (
                <ScrollRevealSection>
                  <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-semibold text-neutral-800 mb-6">
                    <BookOpen className="h-7 w-7 text-teal-600" /> Sobre o Curso
                  </h2>
                  <p className="text-neutral-600 leading-relaxed whitespace-pre-line">{course.longDescription}</p>
                </ScrollRevealSection>
              )}

              {courseSpecificTestimonial && (
                <ScrollRevealSection>
                  <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-semibold text-neutral-800 mb-6">
                    <Star className="h-7 w-7 text-teal-600" /> O que falam sobre este curso
                  </h2>
                  <TestimonialItem testimonial={courseSpecificTestimonial} />
                </ScrollRevealSection>
              )}

              {course.faq && course.faq.length > 0 && (
                <ScrollRevealSection>
                  <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-semibold text-neutral-800 mb-6">
                    <HelpCircle className="h-7 w-7 text-teal-600" /> Perguntas Frequentes (FAQ)
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {course.faq.map((item: FAQItem, index: number) => (
                      <AccordionItem key={item.id} value={`faq-${index + 1}`}>
                        <AccordionTrigger className="text-lg font-medium hover:no-underline text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-neutral-600 leading-relaxed">{item.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </ScrollRevealSection>
              )}
            </div>

            <aside className="lg:col-span-1 space-y-8">
              <ScrollRevealSection className="sticky top-24">
                <Card className="shadow-lg rounded-xl">
                  <CardHeader className="bg-slate-50 rounded-t-xl">
                    <CardTitle className="text-xl text-teal-700">Detalhes do Curso</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="font-semibold text-neutral-700 mb-1">Público-alvo:</h3>
                      <p className="text-sm text-neutral-600">
                        {course.targetAudience || "Profissionais buscando especialização."}
                      </p>
                    </div>
                    {course.prerequisites && course.prerequisites.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-neutral-700 mb-1">Pré-requisitos:</h3>
                        <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                          {course.prerequisites.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {course.expectedResults && course.expectedResults.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-neutral-700 mb-1">Benefícios e Resultados:</h3>
                        <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                          {course.expectedResults.map((res, i) => (
                            <li key={i}>{res}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="pt-4">
                      <p className="text-2xl font-bold text-teal-600 mb-3">{course.price}</p>
                      <Button size="lg" className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-900">
                        Matricule-se Agora
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScrollRevealSection>
            </aside>
          </div>
        </div>

        <ScrollRevealSection className="py-12 bg-slate-100">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-800 mb-4 text-balance">
              Não perca esta oportunidade!
            </h2>
            <p className="text-neutral-600 max-w-lg mx-auto mb-6 text-balance">
              Invista na sua carreira com o {course.name} e destaque-se no mercado offshore.
            </p>
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-neutral-900 text-lg px-10 py-6 rounded-lg"
            >
              Comprar Agora <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </ScrollRevealSection>
      </main>
      <Footer />
    </div>
  )
}
