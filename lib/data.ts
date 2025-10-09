// ============================================
// TIPOS DE DADOS
// ============================================

export interface Course {
  id: string
  name: string
  category: string
  shortDescription: string
  longDescription?: string
  price: string
  priceValue: number
  duration?: string
  imageUrl?: string
  modules?: Module[]
  faq?: FAQItem[]
  targetAudience?: string
  prerequisites?: string[]
  expectedResults?: string[]
  keywords?: string[]
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

export interface Testimonial {
  id: string
  name: string
  role: string
  text: string
  rating: number
  avatarUrl?: string
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  cpf?: string
  avatarUrl?: string
  role?: "user" | "admin"
}

export interface UserCourse {
  id: string
  courseId: string
  name: string
  progress: number
  imageUrl?: string
  certificateAvailable?: boolean
}

export interface UserCertificate {
  id: string
  courseName: string
  issueDate: string
  downloadUrl: string
}

export interface CartItem {
  id: string
  courseId: string
  name: string
  price: string
  priceValue: number
  quantity: number
  imageUrl?: string
}

export interface HomeBenefit {
  icon: string
  title: string
  description: string
}

export interface QualityStat {
  icon: string
  value: string
  label: string
}

// ============================================
// DADOS MOCKADOS
// ============================================

export const courses: Course[] = [
  {
    id: "1",
    name: "CBSP - Curso Básico de Segurança em Plataformas",
    category: "Segurança",
    shortDescription:
      "Treinamento obrigatório para profissionais que atuam em plataformas offshore, cobrindo todos os aspectos de segurança.",
    longDescription: `Este curso é essencial para todos os profissionais que desejam trabalhar em plataformas offshore. 
    
Você aprenderá sobre:
- Normas de segurança NR-37
- Procedimentos de emergência
- Uso de EPIs
- Primeiros socorros
- Combate a incêndio
- Abandono de plataforma

O CBSP é reconhecido internacionalmente e é pré-requisito para embarque em unidades marítimas.`,
    price: "R$ 1.200,00",
    priceValue: 1200,
    duration: "40 horas",
    imageUrl: "/placeholder.svg?height=400&width=600&text=CBSP",
    keywords: ["segurança", "offshore", "plataforma", "nr-37", "obrigatório"],
    modules: [
      {
        id: "m1",
        title: "Módulo 1: Introdução à Segurança Offshore",
        content:
          "Conceitos básicos de segurança, legislação aplicável (NR-37), cultura de segurança e responsabilidades individuais.",
      },
      {
        id: "m2",
        title: "Módulo 2: EPIs e EPCs",
        content:
          "Identificação, uso correto e manutenção de Equipamentos de Proteção Individual e Coletiva utilizados em plataformas.",
      },
      {
        id: "m3",
        title: "Módulo 3: Primeiros Socorros e Combate a Incêndio",
        content:
          "Técnicas de primeiros socorros, RCP, controle de hemorragias, e uso de extintores e mangueiras em situações de incêndio.",
      },
      {
        id: "m4",
        title: "Módulo 4: Abandono de Plataforma e Sobrevivência no Mar",
        content:
          "Procedimentos de evacuação, uso de botes salva-vidas, coletes e técnicas de sobrevivência em ambiente marítimo.",
      },
    ],
    faq: [
      {
        id: "f1",
        question: "O CBSP é obrigatório?",
        answer:
          "Sim, o CBSP é obrigatório para todos os profissionais que irão trabalhar em plataformas offshore no Brasil, conforme exigido pela NR-37.",
      },
      {
        id: "f2",
        question: "Qual a validade do certificado?",
        answer:
          "O certificado do CBSP tem validade de 2 anos, após esse período é necessário realizar o curso de reciclagem.",
      },
      {
        id: "f3",
        question: "Preciso de algum pré-requisito?",
        answer:
          "Não há pré-requisitos técnicos, mas é recomendável ter boa saúde física e estar apto para atividades práticas.",
      },
    ],
    targetAudience: "Profissionais que desejam atuar em plataformas offshore e unidades marítimas.",
    prerequisites: ["Maior de 18 anos", "Boa condição física", "Atestado médico"],
    expectedResults: [
      "Certificação reconhecida nacionalmente",
      "Conhecimento em segurança offshore",
      "Habilitação para embarque em plataformas",
    ],
  },
  {
    id: "2",
    name: "NR-35 - Trabalho em Altura",
    category: "Segurança",
    shortDescription: "Capacitação para trabalhos em altura, conforme norma regulamentadora NR-35.",
    longDescription: `Curso completo sobre segurança em trabalhos em altura.

Conteúdo programático:
- Legislação e normas (NR-35)
- Análise de risco
- Equipamentos de proteção
- Técnicas de ancoragem
- Resgate em altura

Certificado válido em todo território nacional.`,
    price: "R$ 350,00",
    priceValue: 350,
    duration: "8 horas",
    imageUrl: "/placeholder.svg?height=400&width=600&text=NR-35",
    keywords: ["altura", "nr-35", "segurança", "trabalho"],
    targetAudience: "Profissionais que executam trabalhos acima de 2 metros do nível inferior.",
    prerequisites: ["Atestado médico ocupacional", "Maior de 18 anos"],
    expectedResults: ["Certificado NR-35", "Aptidão para trabalho em altura", "Conhecimento em prevenção de quedas"],
  },
  {
    id: "3",
    name: "Operação de Empilhadeira",
    category: "Operações",
    shortDescription: "Treinamento prático e teórico para operadores de empilhadeira.",
    longDescription: `Curso completo de operação de empilhadeira.

Você vai aprender:
- Tipos de empilhadeiras
- Inspeção e manutenção básica
- Técnicas de operação segura
- Movimentação de cargas
- Legislação aplicável

Inclui aulas práticas em diversos tipos de empilhadeiras.`,
    price: "R$ 800,00",
    priceValue: 800,
    duration: "24 horas",
    imageUrl: "/placeholder.svg?height=400&width=600&text=Empilhadeira",
    keywords: ["empilhadeira", "operação", "logística", "movimentação"],
    targetAudience: "Profissionais da área de logística e movimentação de cargas.",
    prerequisites: ["CNH categoria B ou superior", "Alfabetização"],
    expectedResults: ["Certificado de operador", "Habilitação para operar empilhadeiras", "Conhecimento em segurança"],
  },
  {
    id: "4",
    name: "NR-33 - Espaço Confinado",
    category: "Segurança",
    shortDescription: "Treinamento para trabalho em espaços confinados, conforme NR-33.",
    longDescription: `Capacitação para trabalho seguro em espaços confinados.

Conteúdo:
- Definição e reconhecimento de espaços confinados
- Riscos e medidas de controle
- Procedimentos de entrada e saída
- Monitoramento atmosférico
- Resgate e emergência

Fundamental para trabalhos em tanques, silos, caldeiras e similares.`,
    price: "R$ 450,00",
    priceValue: 450,
    duration: "16 horas",
    imageUrl: "/placeholder.svg?height=400&width=600&text=NR-33",
    keywords: ["confinado", "nr-33", "segurança", "tanque"],
    targetAudience: "Trabalhadores autorizados e vigias de espaços confinados.",
    prerequisites: ["Atestado médico específico", "Treinamento básico em segurança"],
    expectedResults: ["Certificado NR-33", "Autorização para entrar em espaços confinados", "Conhecimento em resgate"],
  },
  {
    id: "5",
    name: "Soldador Offshore",
    category: "Técnico",
    shortDescription: "Curso avançado de soldagem para aplicações offshore.",
    longDescription: `Formação completa em soldagem offshore.

Programa:
- Processos de soldagem (SMAW, GMAW, GTAW)
- Metalurgia básica
- Leitura de desenho técnico
- Qualificação de soldadores
- Inspeção visual de soldas
- Normas e padrões internacionais

Inclui certificação conforme AWS ou ASME.`,
    price: "R$ 3.500,00",
    priceValue: 3500,
    duration: "160 horas",
    imageUrl: "/placeholder.svg?height=400&width=600&text=Soldador+Offshore",
    keywords: ["soldagem", "offshore", "técnico", "aws", "qualificação"],
    targetAudience: "Soldadores que desejam atuar em plataformas offshore.",
    prerequisites: ["Experiência prévia em soldagem", "CBSP válido"],
    expectedResults: [
      "Certificação internacional",
      "Qualificação como soldador offshore",
      "Conhecimento avançado em processos",
    ],
  },
  {
    id: "6",
    name: "Rigger - Movimentação de Cargas",
    category: "Operações",
    shortDescription: "Capacitação em sinalização e movimentação de cargas com guindastes.",
    longDescription: `Curso completo de Rigger (sinalizador).

O que você aprende:
- Tipos de guindastes e equipamentos
- Acessórios de içamento
- Cálculo de peso e centro de gravidade
- Sinalização padronizada
- Planejamento de içamento
- Segurança em operações de guindaste

Essencial para operações offshore.`,
    price: "R$ 950,00",
    priceValue: 950,
    duration: "40 horas",
    imageUrl: "/placeholder.svg?height=400&width=600&text=Rigger",
    keywords: ["rigger", "guindaste", "movimentação", "carga", "sinalização"],
    targetAudience: "Profissionais envolvidos em operações de içamento e movimentação de cargas.",
    prerequisites: ["CBSP válido", "Experiência na área industrial"],
    expectedResults: ["Certificado de Rigger", "Habilitação para sinalização", "Conhecimento em segurança de içamento"],
  },
]

export const courseCategories = ["Todos", "Segurança", "Operações", "Técnico", "Gestão", "Manutenção", "Qualificação"]

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Carlos Silva",
    role: "Técnico de Segurança",
    text: "A Nauta Treinamentos foi fundamental para minha carreira offshore. Os instrutores são extremamente capacitados e o conteúdo é muito atualizado.",
    rating: 5,
    avatarUrl: "/placeholder.svg?height=80&width=80&text=CS",
  },
  {
    id: "2",
    name: "Ana Rodrigues",
    role: "Engenheira de Produção",
    text: "Fiz o curso de CBSP e fiquei impressionada com a infraestrutura e o profissionalismo da equipe. Recomendo!",
    rating: 5,
    avatarUrl: "/placeholder.svg?height=80&width=80&text=AR",
  },
  {
    id: "3",
    name: "João Mendes",
    role: "Operador de Guindaste",
    text: "Graças ao curso de Rigger da Nauta, consegui uma excelente posição em uma das maiores empresas offshore do país.",
    rating: 5,
    avatarUrl: "/placeholder.svg?height=80&width=80&text=JM",
  },
  {
    id: "4",
    name: "Mariana Costa",
    role: "Coordenadora de Logística",
    text: "Cursos de alta qualidade com foco na prática. A Nauta realmente se preocupa com o aprendizado e a empregabilidade dos alunos.",
    rating: 5,
    avatarUrl: "/placeholder.svg?height=80&width=80&text=MC",
  },
]

export const mockUser: User = {
  id: "user123",
  name: "João da Silva",
  email: "usuario@nautatreinamentos.com",
  phone: "(21) 98765-4321",
  cpf: "123.456.789-00",
  avatarUrl: "/placeholder.svg?height=200&width=200&text=JS",
  role: "user",
}

export const mockAdminUser: User = {
  id: "admin123",
  name: "Admin Nauta",
  email: "admin@nautatreinamentos.com",
  phone: "(21) 99999-9999",
  cpf: "000.000.000-00",
  avatarUrl: "/placeholder.svg?height=200&width=200&text=AD",
  role: "admin",
}

export const mockUserCourses: UserCourse[] = [
  {
    id: "uc1",
    courseId: "1",
    name: "CBSP - Curso Básico de Segurança em Plataformas",
    progress: 75,
    imageUrl: "/placeholder.svg?height=200&width=300&text=CBSP",
    certificateAvailable: false,
  },
  {
    id: "uc2",
    courseId: "2",
    name: "NR-35 - Trabalho em Altura",
    progress: 100,
    imageUrl: "/placeholder.svg?height=200&width=300&text=NR-35",
    certificateAvailable: true,
  },
  {
    id: "uc3",
    courseId: "5",
    name: "Soldador Offshore",
    progress: 30,
    imageUrl: "/placeholder.svg?height=200&width=300&text=Soldador",
    certificateAvailable: false,
  },
]

export const mockUserCertificates: UserCertificate[] = [
  {
    id: "cert1",
    courseName: "NR-35 - Trabalho em Altura",
    issueDate: "15/03/2024",
    downloadUrl: "/certificates/cert1.pdf",
  },
  {
    id: "cert2",
    courseName: "NR-33 - Espaço Confinado",
    issueDate: "22/01/2024",
    downloadUrl: "/certificates/cert2.pdf",
  },
]

export const mockCartItems: CartItem[] = [
  {
    id: "cart1",
    courseId: "3",
    name: "Operação de Empilhadeira",
    price: "R$ 800,00",
    priceValue: 800,
    quantity: 1,
    imageUrl: "/placeholder.svg?height=100&width=150&text=Empilhadeira",
  },
  {
    id: "cart2",
    courseId: "6",
    name: "Rigger - Movimentação de Cargas",
    price: "R$ 950,00",
    priceValue: 950,
    quantity: 1,
    imageUrl: "/placeholder.svg?height=100&width=150&text=Rigger",
  },
]

export const homeBenefits: HomeBenefit[] = [
  {
    icon: "Award",
    title: "Certificação Reconhecida",
    description: "Certificados válidos em todo território nacional e aceitos pelas principais empresas do setor.",
  },
  {
    icon: "Users",
    title: "Instrutores Experientes",
    description:
      "Equipe com vasta experiência offshore, trazendo casos reais e conhecimento prático para a sala de aula.",
  },
  {
    icon: "Clock",
    title: "Horários Flexíveis",
    description: "Turmas em diversos horários para se adequar à sua rotina, incluindo opções de finais de semana.",
  },
  {
    icon: "Shield",
    title: "Segurança e Qualidade",
    description: "Instalações modernas e seguras, com equipamentos de última geração para treinamentos práticos.",
  },
]

export const qualityStats: QualityStat[] = [
  {
    icon: "Users",
    value: "10.000+",
    label: "Alunos Formados",
  },
  {
    icon: "Award",
    value: "98%",
    label: "Taxa de Aprovação",
  },
  {
    icon: "Star",
    value: "4.9/5",
    label: "Avaliação Média",
  },
  {
    icon: "BookOpen",
    value: "50+",
    label: "Cursos Disponíveis",
  },
]

export const exampleDetailedCourse: Course = {
  id: "example",
  name: "Curso Exemplo - Detalhado",
  category: "Exemplo",
  shortDescription: "Este é um curso exemplo para demonstrar a página de detalhes.",
  longDescription: `Este curso exemplo mostra como será exibida a página de detalhes de um curso.

Aqui você pode adicionar uma descrição completa e detalhada do curso, incluindo:
- Objetivos de aprendizagem
- Metodologia aplicada
- Recursos disponíveis
- Benefícios para sua carreira

O conteúdo pode ser formatado e organizado da melhor forma para atrair e informar os alunos.`,
  price: "R$ 999,00",
  priceValue: 999,
  duration: "20 horas",
  imageUrl: "/placeholder.svg?height=400&width=600&text=Curso+Exemplo",
  modules: [
    {
      id: "ex1",
      title: "Módulo 1: Fundamentos",
      content: "Introdução aos conceitos básicos e fundamentais do curso.",
    },
    {
      id: "ex2",
      title: "Módulo 2: Prática Avançada",
      content: "Aplicação prática dos conhecimentos com exercícios e simulações.",
    },
    {
      id: "ex3",
      title: "Módulo 3: Certificação",
      content: "Preparação para a avaliação final e obtenção do certificado.",
    },
  ],
  faq: [
    {
      id: "exf1",
      question: "Como funciona o curso?",
      answer: "O curso é dividido em módulos teóricos e práticos, com acompanhamento de instrutores especializados.",
    },
    {
      id: "exf2",
      question: "Quanto tempo tenho para concluir?",
      answer: "Você tem acesso ao conteúdo por 6 meses a partir da data de matrícula.",
    },
  ],
  targetAudience: "Profissionais interessados em aprender sobre o tema.",
  prerequisites: ["Interesse na área", "Disponibilidade de tempo"],
  expectedResults: ["Certificado de conclusão", "Conhecimento aplicável", "Networking com outros profissionais"],
}
