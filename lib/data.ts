import type { LucideIcon } from "lucide-react"
import {
  ShieldCheck,
  Award,
  Star,
  Anchor,
  Ship,
  LifeBuoy,
  TrendingUp,
  CheckCircle,
  UserCheck,
  FileText,
  Zap,
  Users2,
  BookCopy,
} from "lucide-react"

export interface NavItem {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Cursos", href: "/cursos" },
  { label: "Sobre Nós", href: "/sobre" },
]

export interface Benefit {
  icon: LucideIcon
  title: string
  description: string
}

export const homeBenefits: Benefit[] = [
  {
    icon: UserCheck,
    title: "Instrutores Especializados",
    description: "Profissionais com vasta experiência prática no setor offshore.",
  },
  {
    icon: FileText,
    title: "Conteúdo Atualizado",
    description: "Cursos alinhados com as últimas normas e tecnologias do mercado.",
  },
  {
    icon: Award,
    title: "Certificação Reconhecida",
    description: "Certificados valorizados que impulsionam sua carreira offshore.",
  },
  {
    icon: Zap,
    title: "Metodologia Prática",
    description: "Foco em aprendizado prático e aplicável ao dia a dia profissional.",
  },
]

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  avatarUrl?: string
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "O curso superou minhas expectativas! Aprendi muito e já estou aplicando no meu trabalho.",
    name: "Carlos Silva",
    role: "Técnico Offshore",
    avatarUrl: "/placeholder.svg?width=40&height=40&text=CS",
  },
  {
    id: "2",
    quote: "Excelente didática dos instrutores e material muito completo. Recomendo!",
    name: "Juliana Alves",
    role: "Engenheira de Segurança",
    avatarUrl: "/placeholder.svg?width=40&height=40&text=JA",
  },
  {
    id: "3",
    quote: "A Nauta Treinamentos foi fundamental para minha progressão de carreira no setor.",
    name: "Roberto Lima",
    role: "Supervisor de Operações",
    avatarUrl: "/placeholder.svg?width=40&height=40&text=RL",
  },
]

export interface Course {
  id: string
  slug: string
  name: string
  category: string
  shortDescription: string
  longDescription?: string
  price: string
  priceValue: number
  originalPriceValue?: number // For discount display
  imageUrl: string
  duration?: string
  modules?: Module[]
  targetAudience?: string
  prerequisites?: string[]
  expectedResults?: string[]
  faq?: FAQItem[]
  keywords?: string[] // For search
}

export interface Module {
  id: string
  title: string
  content: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export const courses: Course[] = [
  {
    id: "1",
    slug: "seguranca-offshore-basico",
    name: "Segurança Offshore Essencial (CBSP)",
    category: "Iniciação",
    shortDescription: "Domine os fundamentos de segurança para atuação em plataformas.",
    price: "R$ 960,00", // Discounted price
    priceValue: 960.0,
    originalPriceValue: 1200.0, // Original price
    imageUrl: "/placeholder.svg?width=400&height=250&text=Segurança+Offshore",
    duration: "40 horas",
    longDescription:
      "Este curso abrange os conhecimentos básicos de segurança, sobrevivência e resposta a emergências em unidades offshore, preparando o profissional para os desafios do setor.",
    modules: [
      {
        id: "m1",
        title: "Introdução à Segurança Offshore",
        content: "Panorama da indústria, riscos e regulamentações.",
      },
      {
        id: "m2",
        title: "Técnicas de Sobrevivência no Mar",
        content: "Procedimentos em caso de abandono de plataforma, uso de balsas e coletes.",
      },
      {
        id: "m3",
        title: "Prevenção e Combate a Incêndios",
        content: "Tipos de incêndio, agentes extintores e táticas de combate.",
      },
      {
        id: "m4",
        title: "Primeiros Socorros Offshore",
        content: "Atendimento emergencial em situações típicas do ambiente offshore.",
      },
    ],
    targetAudience:
      "Profissionais que desejam ingressar ou que já atuam no setor offshore e necessitam da certificação básica.",
    prerequisites: ["Ensino fundamental completo.", "Atestado de boas condições de saúde física e mental."],
    expectedResults: [
      "Compreensão dos riscos e medidas de segurança em plataformas.",
      "Capacidade de agir em situações de emergência.",
      "Certificação CBSP reconhecida nacionalmente.",
    ],
    faq: [
      {
        id: "f1",
        question: "Este curso tem validade?",
        answer: "Sim, a certificação CBSP possui validade de 5 anos, necessitando reciclagem após este período.",
      },
      {
        id: "f2",
        question: "O material didático está incluso?",
        answer: "Sim, todo o material didático necessário para o curso é fornecido pela Nauta Treinamentos.",
      },
    ],
    keywords: ["segurança", "cbsp", "básico", "essencial", "plataforma", "sobrevivência"],
  },
  {
    id: "2",
    slug: "gestao-riscos-offshore",
    name: "Gestão de Riscos em Operações Offshore",
    category: "Avançado",
    shortDescription: "Aprenda a identificar, analisar e mitigar riscos em projetos offshore.",
    price: "R$ 2.500,00",
    priceValue: 2500.0,
    imageUrl: "/placeholder.svg?width=400&height=250&text=Gestão+de+Riscos",
    duration: "60 horas",
    keywords: ["gestão", "riscos", "operações", "avançado", "projetos"],
  },
  {
    id: "3",
    slug: "mergulho-raso-profissional",
    name: "Mergulho Raso Profissional",
    category: "Intermediário",
    shortDescription: "Formação completa para atividades de mergulho em águas rasas.",
    price: "R$ 3.500,00", // Discounted price
    priceValue: 3500.0,
    originalPriceValue: 3800.0, // Original price
    imageUrl: "/placeholder.svg?width=400&height=250&text=Mergulho+Profissional",
    duration: "120 horas",
    keywords: ["mergulho", "raso", "profissional", "intermediário", "subaquático"],
  },
  {
    id: "4",
    slug: "operador-guindaste-offshore",
    name: "Operador de Guindaste Offshore",
    category: "Intermediário",
    shortDescription: "Capacitação para operação segura e eficiente de guindastes em plataformas.",
    price: "R$ 2.200,00",
    priceValue: 2200.0,
    imageUrl: "/placeholder.svg?width=400&height=250&text=Guindaste+Offshore",
    duration: "80 horas",
    keywords: ["operador", "guindaste", "içamento", "plataforma", "segurança"],
  },
  {
    id: "5",
    slug: "nr35-trabalho-altura",
    name: "NR-35 Trabalho em Altura Offshore",
    category: "Segurança", // New category for diversity
    shortDescription: "Treinamento essencial para trabalhos seguros em altura no ambiente offshore.",
    price: "R$ 750,00",
    priceValue: 750.0,
    imageUrl: "/placeholder.svg?width=400&height=250&text=NR-35+Altura",
    duration: "16 horas",
    keywords: ["nr-35", "altura", "segurança", "trabalho", "andaime"],
  },
  {
    id: "6",
    slug: "ingles-tecnico-offshore",
    name: "Inglês Técnico para Profissionais Offshore",
    category: "Complementar", // New category
    shortDescription: "Desenvolva o vocabulário técnico em inglês essencial para o setor.",
    price: "R$ 1.100,00",
    priceValue: 1100.0,
    originalPriceValue: 1350.0,
    imageUrl: "/placeholder.svg?width=400&height=250&text=Inglês+Técnico",
    duration: "50 horas",
    keywords: ["inglês", "técnico", "idioma", "comunicação", "offshore"],
  },
]

export const courseCategories = ["Todos", "Iniciação", "Intermediário", "Avançado", "Segurança", "Complementar"]

export interface QualityStat {
  icon: LucideIcon
  value: string
  label: string
}

export const qualityStats: QualityStat[] = [
  {
    icon: Users2,
    value: "1.000+",
    label: "Alunos Formados",
  },
  {
    icon: Award,
    value: "98%",
    label: "Taxa de Aprovação",
  },
  {
    icon: BookCopy, // New stat
    value: "50+",
    label: "Cursos Disponíveis",
  },
  {
    icon: UserCheck, // New stat
    value: "20+",
    label: "Instrutores Qualificados",
  },
]

export interface TimelineEvent {
  id: string
  year: string
  title: string
  description: string
  icon: LucideIcon
}

export const companyTimeline: TimelineEvent[] = [
  {
    id: "t1",
    year: "2010",
    title: "Fundação da Nauta",
    description: "Início das atividades com foco em treinamentos básicos de segurança.",
    icon: Anchor,
  },
  {
    id: "t2",
    year: "2015",
    title: "Expansão de Cursos",
    description: "Introdução de cursos intermediários e especializações técnicas.",
    icon: Ship,
  },
  {
    id: "t3",
    year: "2020",
    title: "Reconhecimento Nacional",
    description: "Consolidação como referência em treinamento offshore no Brasil.",
    icon: Award,
  },
  {
    id: "t4",
    year: "Hoje",
    title: "Inovação Contínua",
    description: "Investimento em novas tecnologias e parcerias estratégicas.",
    icon: LifeBuoy,
  },
]

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  avatarUrl: string
}

export const teamMembers: TeamMember[] = [
  {
    id: "tm1",
    name: "Cap. João Mendes",
    role: "Diretor e Instrutor Master",
    bio: "Mais de 20 anos de experiência em comando e operações offshore.",
    avatarUrl: "/placeholder.svg?width=100&height=100&text=JM",
  },
  {
    id: "tm2",
    name: "Eng. Ana Clara Souza",
    role: "Coordenadora Pedagógica e Instrutora",
    bio: "Especialista em segurança do trabalho e gestão de emergências.",
    avatarUrl: "/placeholder.svg?width=100&height=100&text=AS",
  },
  {
    id: "tm3",
    name: "Dr. Ricardo Faria",
    role: "Instrutor de Primeiros Socorros",
    bio: "Médico com especialização em resgate e atendimento pré-hospitalar.",
    avatarUrl: "/placeholder.svg?width=100&height=100&text=RF",
  },
]

export interface CompanyValue {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export const companyValues: CompanyValue[] = [
  {
    id: "v1",
    title: "Excelência",
    description: "Compromisso com a mais alta qualidade em todos os nossos treinamentos.",
    icon: Star,
  },
  {
    id: "v2",
    title: "Segurança",
    description: "Prioridade absoluta na formação de profissionais conscientes e preparados.",
    icon: ShieldCheck,
  },
  {
    id: "v3",
    title: "Inovação",
    description: "Busca constante por métodos e tecnologias que aprimorem o aprendizado.",
    icon: TrendingUp,
  },
  {
    id: "v4",
    title: "Praticidade",
    description: "Foco em conhecimento aplicável e relevante para o dia a dia offshore.",
    icon: CheckCircle,
  },
]

// Example course for the detail page
export const exampleDetailedCourse: Course = courses[0] // Using the first course as an example

export interface User {
  name: string
  email: string
  avatarUrl?: string
  cpf?: string
  phone?: string
}

export const mockUser: User = {
  name: "Usuário Nauta",
  email: "usuario@nautatreinamentos.com",
  avatarUrl: "/placeholder.svg?width=40&height=40&text=UN",
  cpf: "123.456.789-00",
  phone: "(21) 98877-6655",
}

export interface UserCourse {
  id: string
  courseId: string // links to Course.id
  name: string
  progress: number // 0-100
  imageUrl: string
  certificateAvailable?: boolean
}

export const mockUserCourses: UserCourse[] = [
  {
    id: "uc1",
    courseId: "1",
    name: "Segurança Offshore Essencial (CBSP)",
    progress: 75,
    imageUrl: "/placeholder.svg?width=100&height=70&text=CBSP",
  },
  {
    id: "uc2",
    courseId: "2",
    name: "Gestão de Riscos em Operações Offshore",
    progress: 30,
    imageUrl: "/placeholder.svg?width=100&height=70&text=Gestão+Riscos",
  },
  {
    id: "uc3",
    courseId: "3",
    name: "Mergulho Raso Profissional",
    progress: 100,
    imageUrl: "/placeholder.svg?width=100&height=70&text=Mergulho",
    certificateAvailable: true,
  },
]

export interface CartItem {
  id: string // courseId
  name: string
  price: string
  priceValue: number
  imageUrl: string
  quantity: number
}

export const mockCartItems: CartItem[] = [
  { ...courses[0], id: courses[0].id, quantity: 1 },
  { ...courses[1], id: courses[1].id, quantity: 1 },
]

export interface UserCertificate {
  id: string
  courseName: string
  issueDate: string
  downloadUrl: string // could be a link to a PDF or a page
}

export const mockUserCertificates: UserCertificate[] = [
  {
    id: "cert1",
    courseName: "Mergulho Raso Profissional",
    issueDate: "15/03/2024",
    downloadUrl: "#", // Placeholder
  },
  {
    id: "cert2",
    courseName: "Segurança de Plataforma Avançado (Mock)",
    issueDate: "20/01/2024",
    downloadUrl: "#", // Placeholder
  },
]
