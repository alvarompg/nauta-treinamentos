"use client"

import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import IconTitleDescriptionCard from "@/components/ui/icon-title-description-card"
import AnimatedHeading from "@/components/ui/animated-heading"
import ScrollRevealSection from "@/components/ui/scroll-reveal-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import {
  companyTimeline,
  teamMembers,
  companyValues,
  type TimelineEvent,
  type TeamMember,
  type CompanyValue,
} from "@/lib/data"
import { ChevronRight, Users, Target, Lightbulb } from "lucide-react"

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function SobrePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-slate-700 text-white py-20 md:py-28 overflow-hidden">
          <Image
            src="/placeholder.svg?width=1920&height=600&text=Nossa+Equipe+e+Missão"
            alt="Equipe Nauta Treinamentos em reunião estratégica"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 opacity-30 z-0"
            priority
          />
          <div className="container relative z-10 text-center">
            <AnimatedHeading text="Quem Somos" className="text-4xl sm:text-5xl font-bold tracking-tight mb-4" el="h1" />
            <ScrollRevealSection delay={0.2}>
              <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto text-balance">
                Conheça a história, a equipe e os valores que fazem da Nauta Treinamentos uma referência em capacitação
                offshore.
              </p>
            </ScrollRevealSection>
          </div>
        </section>

        {/* História da Nauta Section */}
        <ScrollRevealSection className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-teal-600 uppercase tracking-wider">Nossa Trajetória</span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mt-2 text-balance">
                Uma História de Dedicação ao Mar e à Segurança
              </h2>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute top-0 left-1/2 w-1 bg-teal-200 h-full -ml-0.5"></div>
              {companyTimeline.map((event: TimelineEvent, index: number) => (
                <motion.div
                  key={event.id}
                  className={`mb-8 flex md:items-center w-full ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{
                    hidden: { opacity: 0, x: index % 2 === 0 ? 50 : -50 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.1 } },
                  }}
                >
                  <div className="hidden md:block w-5/12"></div>
                  <div className="hidden md:block relative">
                    <motion.div
                      className="absolute left-1/2 top-1/2 -mt-3.5 h-8 w-8 rounded-full bg-teal-600 border-4 border-white flex items-center justify-center -ml-4"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <event.icon className="h-4 w-4 text-white" />
                    </motion.div>
                  </div>
                  <Card
                    className={`w-full md:w-5/12 shadow-lg rounded-xl ${index % 2 === 0 ? "md:ml-auto md:mr-8" : "md:mr-auto md:ml-8"} `}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-semibold text-teal-700">{event.title}</CardTitle>
                        <span className="text-sm font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                          {event.year}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-neutral-600">{event.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollRevealSection>

        {/* Nossa Equipe Section */}
        <ScrollRevealSection className="py-16 md:py-24 bg-slate-50">
          <div className="container">
            <div className="text-center mb-12">
              <Users className="h-12 w-12 text-teal-600 mx-auto mb-2" />
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 text-balance">Nossa Equipe</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto mt-4 text-balance">
                Profissionais apaixonados pelo mar e dedicados a transmitir conhecimento com excelência.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member: TeamMember, index: number) => (
                <motion.div
                  key={member.id}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: (i: number) => ({
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, delay: i * 0.1 },
                    }),
                  }}
                >
                  <Card className="text-center shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
                    <CardContent className="p-6 flex-grow flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      >
                        <Image
                          src={member.avatarUrl || "/placeholder.svg"}
                          alt={`Foto de ${member.name}`}
                          width={100}
                          height={100}
                          className="rounded-full mx-auto mb-4 border-4 border-teal-200"
                        />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-neutral-800">{member.name}</h3>
                      <p className="text-teal-600 font-medium mb-2">{member.role}</p>
                      <p className="text-sm text-neutral-600 flex-grow">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollRevealSection>

        {/* Valores e Visão Section */}
        <ScrollRevealSection className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <Target className="h-12 w-12 text-teal-600 mx-auto mb-2" />
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 text-balance">Nossos Valores e Visão</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto mt-4 text-balance">
                Os pilares que guiam cada treinamento e cada interação com nossos alunos e parceiros.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyValues.map((value: CompanyValue, index: number) => (
                <motion.div
                  key={value.id}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: (i: number) => ({
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, delay: i * 0.1 },
                    }),
                  }}
                  className="h-full"
                >
                  <IconTitleDescriptionCard
                    icon={value.icon}
                    title={value.title}
                    description={value.description}
                    iconColor="text-amber-600"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollRevealSection>

        {/* Chamada Final Section */}
        <ScrollRevealSection className="py-16 md:py-20 bg-teal-700 text-white">
          <div className="container text-center">
            <Lightbulb className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Transforme seu Futuro Profissional Conosco
            </h2>
            <p className="text-lg text-teal-100 max-w-xl mx-auto mb-8 text-balance">
              Explore nossos cursos e descubra como a Nauta Treinamentos pode impulsionar sua carreira no setor
              offshore.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-neutral-900 text-lg px-8 py-6 rounded-lg"
            >
              <Link href="/cursos">
                Ver Todos os Cursos <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </ScrollRevealSection>
      </main>
      <Footer />
    </div>
  )
}
