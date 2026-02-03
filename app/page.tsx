import Image from "next/image"
import Link from "next/link"
import { Award, Users, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import TestimonialItem from "@/components/ui/testimonial-item"
import CourseCard from "@/components/ui/course-card"
import AnimatedHeading from "@/components/ui/animated-heading"
import ScrollRevealSection from "@/components/ui/scroll-reveal-section"
import { Card, CardContent } from "@/components/ui/card"
import { testimonials, courses } from "@/lib/data"
import { ChevronRight, ShoppingBag } from "lucide-react"

const homeBenefitsLocal = [
  {
    IconComponent: Award,
    title: "Certificação Reconhecida",
    description: "Certificados válidos em todo território nacional e aceitos pelas principais empresas do setor.",
  },
  {
    IconComponent: Users,
    title: "Instrutores Experientes",
    description:
      "Equipe com vasta experiência offshore, trazendo casos reais e conhecimento prático para a sala de aula.",
  },
  {
    IconComponent: Clock,
    title: "Horários Flexíveis",
    description: "Turmas em diversos horários para se adequar à sua rotina, incluindo opções de finais de semana.",
  },
  {
    IconComponent: Shield,
    title: "Segurança e Qualidade",
    description: "Instalações modernas e seguras, com equipamentos de última geração para treinamentos práticos.",
  },
]

export default function HomePage() {
  const featuredCourses = courses.slice(0, 4)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <section className="relative bg-slate-800 text-white py-20 md:py-32 lg:py-40 overflow-hidden">
          <Image
            src="/placeholder.svg?width=1920&height=1080&text=Treinamento+Offshore+Moderno"
            alt="Plataforma offshore ao amanhecer"
            fill
            className="absolute inset-0 opacity-30 z-0 object-cover"
            priority
          />

          <div className="container relative z-10 text-center px-4 sm:px-6 lg:px-8">
            <AnimatedHeading
              text="Aprenda Offshore do Básico ao Avançado"
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance"
              el="h1"
            />

            <ScrollRevealSection delay={0.3}>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 text-balance">
                Capacite-se com os melhores treinamentos do mercado e impulsione sua carreira no setor offshore.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-neutral-900 text-lg px-8 py-6 rounded-lg"
              >
                <Link href="/cursos">
                  Conheça Nossos Treinamentos <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </ScrollRevealSection>
          </div>
        </section>

        <ScrollRevealSection className="py-16 md:py-24 bg-white">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-sm font-semibold text-teal-600 uppercase tracking-wider">Sobre Nós</span>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mt-2 mb-6 text-balance">
                  Nauta Treinamentos: Sua Jornada Offshore Começa Aqui
                </h2>
                <p className="text-neutral-600 mb-4 leading-relaxed">
                  Somos especialistas em capacitação para o setor offshore, oferecendo cursos que combinam teoria
                  robusta com prática intensiva. Nossa missão é formar profissionais altamente qualificados, prontos
                  para os desafios e oportunidades da indústria marítima e de petróleo e gás.
                </p>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  Com instrutores experientes e conteúdo sempre atualizado, garantimos um aprendizado de excelência,
                  focado na segurança e na performance.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-teal-600 text-teal-600 hover:bg-teal-50 hover:text-teal-700 bg-transparent"
                >
                  <Link href="/sobre">Saiba Mais Sobre Nós</Link>
                </Button>
              </div>

              <div>
                <Image
                  src="/placeholder.svg?width=600&height=400&text=Equipe+Nauta+em+Ação"
                  alt="Equipe da Nauta Treinamentos"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection className="py-16 md:py-24 bg-slate-50">
          <div className="container text-center px-4 sm:px-6 lg:px-8">
            <span className="text-sm font-semibold text-teal-600 uppercase tracking-wider">Vantagens</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mt-2 mb-12 text-balance">
              Por que Escolher a Nauta Treinamentos?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {homeBenefitsLocal.map((benefit, index) => (
                <ScrollRevealSection key={benefit.title} delay={index * 0.1} yOffset={30}>
                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow h-full">
                    <CardContent className="flex flex-col items-center text-center p-6 h-full">
                      <div className="mb-4 p-3 bg-teal-100 rounded-full">
                        <benefit.IconComponent className="h-8 w-8 text-teal-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-neutral-800 mb-2">{benefit.title}</h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection id="depoimentos" className="py-16 md:py-24 bg-white">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-teal-600 uppercase tracking-wider">
                O Que Dizem Nossos Alunos
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mt-2 text-balance">
                Experiências que Transformam Carreiras
              </h2>
            </div>

            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 p-4">
                    <TestimonialItem testimonial={testimonial} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection className="py-16 md:py-24 bg-slate-100">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <ShoppingBag className="h-10 w-10 text-teal-600 mx-auto mb-2" />
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 text-balance">Treinamentos em Destaque</h2>
              <p className="text-lg text-neutral-600 max-w-xl mx-auto mt-4">
                Confira alguns dos nossos treinamentos mais procurados e comece a transformar sua carreira hoje mesmo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredCourses.map((course, index) => (
                <ScrollRevealSection key={course.id} delay={index * 0.1} yOffset={30} className="h-full">
                  <CourseCard course={course} />
                </ScrollRevealSection>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
                <Link href="/cursos">
                  Ver Todos os Treinamentos <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection className="py-16 md:py-24 bg-teal-700 text-white">
          <div className="container text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Pronto para Elevar sua Carreira Offshore?
            </h2>
            <p className="text-lg text-teal-100 max-w-xl mx-auto mb-8">
              Inscreva-se em nossa newsletter para receber novidades sobre cursos, dicas e promoções exclusivas.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-grow bg-white text-neutral-800 placeholder:text-neutral-500"
                aria-label="Email para newsletter"
              />
              <Button type="submit" size="lg" className="bg-amber-500 hover:bg-amber-600 text-neutral-900">
                Inscrever Agora
              </Button>
            </form>
          </div>
        </ScrollRevealSection>
      </main>

      <Footer />
    </div>
  )
}
