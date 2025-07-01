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
  PlaySquare,
  FileQuestion,
  ListChecks,
  AlertTriangle,
  SearchCheck,
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

export interface QuizOption {
  id: string
  text: string
}

export interface QuizQuestion {
  id: string
  text: string
  options: QuizOption[]
  correctOptionId: string
  explanation?: string
}

export interface Quiz {
  id: string
  title: string
  lessonId?: string
  questions: QuizQuestion[]
  passingScore: number
  maxAttempts: number
}

export interface Lesson {
  id: string
  title: string
  type: "video" | "text" | "quiz"
  duration?: string
  videoUrl?: string
  textContent?: string
  quizId?: string
  isCompleted?: boolean
  icon: LucideIcon
}

export interface CourseSection {
  id: string
  title: string
  lessons: Lesson[]
}

export interface Course {
  id: string
  slug: string
  name: string
  category: string
  shortDescription: string
  longDescription?: string
  price: string
  priceValue: number
  originalPriceValue?: number
  imageUrl: string
  duration?: string
  modules?: Module[]
  targetAudience?: string
  prerequisites?: string[]
  expectedResults?: string[]
  faq?: FAQItem[]
  keywords?: string[]
  courseSections?: CourseSection[]
  finalQuizId?: string
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

export const mockQuizzes: Quiz[] = [
  {
    id: "quiz1_cbsp_mod1",
    title: "Quiz: Introdução à Segurança Offshore",
    lessonId: "l1_cbsp_mod1_aula4",
    questions: [
      {
        id: "q1",
        text: "Qual o principal objetivo das normas de segurança offshore?",
        options: [
          { id: "opt1", text: "Aumentar a produção" },
          { id: "opt2", text: "Prevenir acidentes e proteger vidas" },
          { id: "opt3", text: "Reduzir custos operacionais" },
        ],
        correctOptionId: "opt2",
        explanation:
          "As normas de segurança offshore são primariamente focadas na prevenção de acidentes e na proteção da saúde e vida dos trabalhadores.",
      },
      {
        id: "q2",
        text: "O que significa a sigla CBSP?",
        options: [
          { id: "opt1", text: "Curso Básico de Segurança em Plataforma" },
          { id: "opt2", text: "Controle Básico de Situações Perigosas" },
          { id: "opt3", text: "Comitê Brasileiro de Segurança Petrolífera" },
        ],
        correctOptionId: "opt1",
        explanation: "CBSP significa Curso Básico de Segurança em Plataforma, essencial para quem trabalha embarcado.",
      },
    ],
    passingScore: 70,
    maxAttempts: 3,
  },
  {
    id: "finalQuiz_cbsp",
    title: "Prova Final: Segurança Offshore Essencial (CBSP)",
    questions: [
      {
        id: "fq1",
        text: "Em caso de incêndio a bordo, qual a primeira ação a ser tomada após identificar o fogo?",
        options: [
          { id: "opt1", text: "Tentar apagar o fogo sozinho imediatamente." },
          { id: "opt2", text: "Acionar o alarme de incêndio e avisar a equipe de emergência." },
          { id: "opt3", text: "Pular na água." },
        ],
        correctOptionId: "opt2",
        explanation:
          "A prioridade é alertar a todos e acionar a equipe especializada. Tentar apagar sozinho pode ser perigoso sem o devido preparo e equipamento.",
      },
      {
        id: "fq2",
        text: "Qual equipamento de proteção individual (EPI) é fundamental para trabalhos em altura?",
        options: [
          { id: "opt1", text: "Luvas de raspa." },
          { id: "opt2", text: "Protetor auricular." },
          { id: "opt3", text: "Cinto de segurança tipo paraquedista com talabarte." },
        ],
        correctOptionId: "opt3",
        explanation: "O cinto de segurança tipo paraquedista é essencial para prevenir quedas em trabalhos em altura.",
      },
      {
        id: "fq3",
        text: "O que é um 'ponto de encontro' (muster station) em uma plataforma?",
        options: [
          { id: "opt1", text: "Área de lazer dos funcionários." },
          { id: "opt2", text: "Local designado para reunião em caso de emergência." },
          { id: "opt3", text: "Sala de controle principal da plataforma." },
        ],
        correctOptionId: "opt2",
        explanation:
          "O ponto de encontro é um local seguro para onde todos devem se dirigir durante uma emergência para contagem e instruções.",
      },
    ],
    passingScore: 70,
    maxAttempts: 3,
  },
  {
    id: "finalQuiz_nr05",
    title: "Prova Final: NR-05 CIPA",
    questions: [
      {
        id: "nr05_q1",
        text: "Qual o principal objetivo da CIPA (Comissão Interna de Prevenção de Acidentes)?",
        options: [
          { id: "opt1", text: "Organizar festas de confraternização na empresa." },
          { id: "opt2", text: "A prevenção de acidentes e doenças decorrentes do trabalho." },
          { id: "opt3", text: "Fiscalizar o ponto dos funcionários." },
        ],
        correctOptionId: "opt2",
        explanation:
          "O objetivo fundamental da CIPA é tornar compatível permanentemente o trabalho com a preservação da vida e a promoção da saúde do trabalhador.",
      },
      {
        id: "nr05_q2",
        text: "Quem compõe a CIPA?",
        options: [
          { id: "opt1", text: "Apenas representantes indicados pelo empregador." },
          { id: "opt2", text: "Apenas representantes eleitos pelos empregados." },
          { id: "opt3", text: "Representantes do empregador e dos empregados, de forma paritária." },
        ],
        correctOptionId: "opt3",
        explanation: "A CIPA é composta por representantes do empregador (designados) e dos empregados (eleitos).",
      },
      {
        id: "nr05_q3",
        text: "O que é o Mapa de Riscos?",
        options: [
          { id: "opt1", text: "Um mapa rodoviário para chegar à empresa." },
          { id: "opt2", text: "Uma representação gráfica dos riscos existentes nos locais de trabalho." },
          { id: "opt3", text: "Um cardápio de refeições saudáveis para os trabalhadores." },
        ],
        correctOptionId: "opt2",
        explanation:
          "O Mapa de Riscos é uma ferramenta visual importante para identificar e conscientizar sobre os perigos no ambiente de trabalho.",
      },
    ],
    passingScore: 70,
    maxAttempts: 3,
  },
]

export const courses: Course[] = [
  {
    id: "1",
    slug: "seguranca-offshore-basico",
    name: "Segurança Offshore Essencial (CBSP)",
    category: "Iniciação",
    shortDescription: "Domine os fundamentos de segurança para atuação em plataformas.",
    price: "R$ 960,00",
    priceValue: 960.0,
    originalPriceValue: 1200.0,
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
    courseSections: [
      {
        id: "s1_cbsp",
        title: "Módulo 1: Introdução e Conceitos Fundamentais",
        lessons: [
          {
            id: "l1_cbsp_mod1_aula1",
            title: "Bem-vindo ao Curso!",
            type: "video",
            duration: "5 min",
            videoUrl: "/placeholder-video.mp4",
            icon: PlaySquare,
          },
          {
            id: "l1_cbsp_mod1_aula2",
            title: "Panorama da Indústria Offshore",
            type: "text",
            textContent:
              "A indústria offshore abrange a exploração e produção de petróleo e gás em alto mar. Envolve plataformas fixas, flutuantes, navios especializados e uma complexa cadeia logística. Os principais desafios incluem condições ambientais severas, isolamento e a necessidade de rigorosos padrões de segurança.",
            icon: FileText,
          },
          {
            id: "l1_cbsp_mod1_aula3",
            title: "Principais Riscos e Perigos",
            type: "video",
            duration: "15 min",
            videoUrl: "/placeholder-video.mp4",
            icon: PlaySquare,
          },
          {
            id: "l1_cbsp_mod1_aula4",
            title: "Quiz Rápido: Módulo 1",
            type: "quiz",
            quizId: "quiz1_cbsp_mod1",
            icon: FileQuestion,
          },
        ],
      },
      {
        id: "s2_cbsp",
        title: "Módulo 2: Sobrevivência no Mar",
        lessons: [
          {
            id: "l2_cbsp_mod2_aula1",
            title: "Técnicas de Abandono de Plataforma",
            type: "video",
            duration: "20 min",
            videoUrl: "/placeholder-video.mp4",
            icon: PlaySquare,
          },
          {
            id: "l2_cbsp_mod2_aula2",
            title: "Uso de Balsas Salva-Vidas",
            type: "text",
            textContent:
              "As balsas salva-vidas são equipamentos essenciais. Aprenda sobre os tipos, capacidade, como lançá-las e os procedimentos de embarque em emergências. Conheça os suprimentos contidos nelas.",
            icon: FileText,
          },
          {
            id: "l2_cbsp_mod2_aula3",
            title: "Hipotermia e Primeiros Socorros",
            type: "video",
            duration: "18 min",
            videoUrl: "/placeholder-video.mp4",
            icon: PlaySquare,
          },
        ],
      },
      {
        id: "s3_cbsp_final",
        title: "Avaliação Final do Curso",
        lessons: [
          {
            id: "l3_cbsp_final_quiz",
            title: "Prova Final CBSP",
            type: "quiz",
            quizId: "finalQuiz_cbsp",
            icon: ListChecks,
          },
        ],
      },
    ],
    finalQuizId: "finalQuiz_cbsp",
  },
  {
    id: "7",
    slug: "nr05-cipa-comissao-interna",
    name: "NR-05 CIPA - Comissão Interna de Prevenção de Acidentes",
    category: "Segurança",
    shortDescription: "Capacitação completa sobre a CIPA, suas atribuições e importância na segurança do trabalho.",
    price: "R$ 450,00",
    priceValue: 450.0,
    imageUrl: "/placeholder.svg?width=400&height=250&text=NR-05+CIPA",
    duration: "20 horas",
    longDescription:
      "Este curso aborda todos os aspectos da Norma Regulamentadora nº 05, que estabelece os parâmetros e os requisitos da Comissão Interna de Prevenção de Acidentes (CIPA). Essencial para membros da CIPA, gestores e profissionais de segurança do trabalho.",
    targetAudience: "Membros da CIPA (eleitos e designados), técnicos de segurança, gestores e demais interessados.",
    prerequisites: ["Não há pré-requisitos específicos, mas recomenda-se ensino fundamental completo."],
    expectedResults: [
      "Compreensão da legislação e objetivos da CIPA.",
      "Capacidade de identificar riscos e propor medidas preventivas.",
      "Conhecimento sobre o processo eleitoral e funcionamento da CIPA.",
      "Habilidade para elaborar Mapas de Risco.",
    ],
    keywords: ["nr-05", "cipa", "segurança do trabalho", "prevenção", "acidentes", "comissão"],
    courseSections: [
      {
        id: "s1_nr05",
        title: "Módulo 1: Introdução à CIPA e Legislação",
        lessons: [
          {
            id: "l1_nr05_aula1",
            title: "O que é a CIPA?",
            type: "video",
            duration: "10 min",
            icon: PlaySquare,
          },
          {
            id: "l1_nr05_aula2",
            title: "Objetivos e Importância da CIPA",
            type: "text",
            textContent:
              "A CIPA tem como objetivo a prevenção de acidentes e doenças decorrentes do trabalho, de modo a tornar compatível permanentemente o trabalho com a preservação da vida e a promoção da saúde do trabalhador. Sua importância reside no papel ativo dos trabalhadores na identificação e controle dos riscos.",
            icon: FileText,
          },
          {
            id: "l1_nr05_aula3",
            title: "Aspectos Legais da NR-05",
            type: "video",
            duration: "15 min",
            icon: PlaySquare,
          },
        ],
      },
      {
        id: "s2_nr05",
        title: "Módulo 2: Organização e Atribuições da CIPA",
        lessons: [
          {
            id: "l2_nr05_aula1",
            title: "Composição e Dimensionamento",
            type: "text",
            textContent:
              "A CIPA é composta por representantes do empregador e dos empregados. O dimensionamento varia conforme o número de empregados e o grau de risco da atividade da empresa, conforme Quadro I da NR-05.",
            icon: FileText,
          },
          {
            id: "l2_nr05_aula2",
            title: "Processo Eleitoral da CIPA",
            type: "video",
            duration: "20 min",
            icon: PlaySquare,
          },
          {
            id: "l2_nr05_aula3",
            title: "Atribuições dos Membros da CIPA",
            type: "text",
            textContent:
              "Identificar riscos, elaborar plano de trabalho, participar da implementação de medidas preventivas, divulgar informações de segurança, entre outras.",
            icon: FileText,
          },
        ],
      },
      {
        id: "s3_nr05",
        title: "Módulo 3: Ferramentas e Práticas da CIPA",
        lessons: [
          {
            id: "l3_nr05_aula1",
            title: "Elaboração do Mapa de Riscos",
            type: "video",
            duration: "25 min",
            icon: PlaySquare,
          },
          {
            id: "l3_nr05_aula2",
            title: "Inspeções de Segurança",
            type: "text",
            textContent:
              "As inspeções de segurança são vistorias periódicas nos locais de trabalho para identificar condições de risco e propor correções.",
            icon: SearchCheck,
          },
          {
            id: "l3_nr05_aula3",
            title: "Investigação de Acidentes",
            type: "video",
            duration: "15 min",
            icon: AlertTriangle,
          },
        ],
      },
      {
        id: "s4_nr05_final",
        title: "Avaliação Final do Curso NR-05",
        lessons: [
          {
            id: "l4_nr05_final_quiz",
            title: "Prova Final NR-05 CIPA",
            type: "quiz",
            quizId: "finalQuiz_nr05",
            icon: ListChecks,
          },
        ],
      },
    ],
    finalQuizId: "finalQuiz_nr05",
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
    price: "R$ 3.500,00",
    priceValue: 3500.0,
    originalPriceValue: 3800.0,
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
    category: "Segurança",
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
    category: "Complementar",
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
    icon: BookCopy,
    value: "50+",
    label: "Cursos Disponíveis",
  },
  {
    icon: UserCheck,
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

export const exampleDetailedCourse: Course = courses[0]

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
  courseId: string
  name: string
  progress: number
  imageUrl: string
  certificateAvailable?: boolean
  completedLessonIds?: string[]
  quizAttempts?: { quizId: string; attemptsMade: number; bestScore?: number; passed?: boolean }[]
  isCompleted?: boolean
}

export const mockUserCourses: UserCourse[] = [
  {
    id: "uc1",
    courseId: "1",
    name: "Segurança Offshore Essencial (CBSP)",
    progress: 0,
    imageUrl: "/placeholder.svg?width=100&height=70&text=CBSP",
    completedLessonIds: [],
    quizAttempts: [],
    isCompleted: false,
  },
  {
    id: "uc2",
    courseId: "2",
    name: "Gestão de Riscos em Operações Offshore",
    progress: 30,
    imageUrl: "/placeholder.svg?width=100&height=70&text=Gestão+Riscos",
    isCompleted: false,
  },
  {
    id: "uc3",
    courseId: "3",
    name: "Mergulho Raso Profissional",
    progress: 100,
    imageUrl: "/placeholder.svg?width=100&height=70&text=Mergulho",
    certificateAvailable: true,
    isCompleted: true,
  },
  {
    id: "uc4",
    courseId: "7",
    name: "NR-05 CIPA - Comissão Interna de Prevenção de Acidentes",
    progress: 0,
    imageUrl: "/placeholder.svg?width=100&height=70&text=NR05",
    completedLessonIds: [],
    quizAttempts: [],
    isCompleted: false,
  },
]

export interface CartItem {
  id: string
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
  downloadUrl: string
  userCourseId: string
}

export const mockUserCertificates: UserCertificate[] = [
  {
    id: "cert1",
    userCourseId: "uc3",
    courseName: "Mergulho Raso Profissional",
    issueDate: "15/03/2024",
    downloadUrl: "#",
  },
]
