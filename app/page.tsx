import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import TestimonialItem from "@/components/ui/testimonial-item"
import IconTitleDescriptionCard from "@/components/ui/icon-title-description-card"
import CourseCard from "@/components/ui/course-card" // Import CourseCard
import AnimatedHeading from "@/components/ui/animated-heading" // Import AnimatedHeading
import ScrollRevealSection from "@/components/ui/scroll-reveal-section" // Import ScrollRevealSection
import { homeBenefits, testimonials, courses } from "@/lib/data" // Import courses
import { ChevronRight, ShoppingBag } from "lucide-react"

export default function HomePage() {
  const featuredCourses = courses.slice(0, 4) // Get first 4 courses for showcase

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-slate-800 text-white py-20 md:py-32 lg:py-40 overflow-hidden">
          <Image
            src="/placeholder.svg?width=1920&height=1080&text=Treinamento+Offshore+Moderno"
            alt="Plataforma offshore ao amanhecer"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 opacity-30 z-0"
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
                  Conheça Nossos Cursos <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </ScrollRevealSection>
          </div>
        </section>

        {/* Sobre a Nauta Section */}
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
                  className="border-teal-600 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
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

        {/* Benefícios Section */}
        <ScrollRevealSection className="py-16 md:py-24 bg-slate-50">
          <div className="container text-center px-4 sm:px-6 lg:px-8">
            <span className="text-sm font-semibold text-teal-600 uppercase tracking-wider">Vantagens</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mt-2 mb-12 text-balance">
              Por que Escolher a Nauta Treinamentos?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {homeBenefits.map((benefit, index) => (
                <ScrollRevealSection key={benefit.title} delay={index * 0.1} yOffset={30}>
                  <IconTitleDescriptionCard
                    icon={benefit.icon}
                    title={benefit.title}
                    description={benefit.description}
                  />
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </ScrollRevealSection>

        {/* Depoimentos Section */}
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

        {/* Vitrine de Cursos Section */}
        <ScrollRevealSection className="py-16 md:py-24 bg-slate-100">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <ShoppingBag className="h-10 w-10 text-teal-600 mx-auto mb-2" />
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 text-balance">Cursos em Destaque</h2>
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
                  Ver Todos os Cursos <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </ScrollRevealSection>

        {/* CTA Final Section */}
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
