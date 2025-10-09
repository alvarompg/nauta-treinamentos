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
  completedLessonIds?: string[]
  quizAttempts?: any[] // QuizAttempt
  isCompleted?: boolean
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

export interface TimelineEvent {
  id: string
  year: string
  title: string
  description: string
  icon: any // Lucide icon component
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  avatarUrl?: string
}

export interface CompanyValue {
  id: string
  icon: string
  title: string
  description: string
}

export interface Quiz {
  id: string
  title: string
  description?: string
  passingScore: number
  maxAttempts: number
  questions: QuizQuestion[]
}

export interface QuizQuestion {
  id: string
  text: string
  options: QuizOption[]
  correctOptionId: string
  explanation?: string
}

export interface QuizOption {
  id: string
  text: string
}

export interface Lesson {
  id: string
  title: string
  type: "video" | "text" | "quiz"
  duration?: string
  videoUrl?: string
  textContent?: string
  quizId?: string
  hasResources?: boolean
}

export interface CourseSection {
  id: string
  title: string
  lessons: Lesson[]
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

export const companyTimeline: TimelineEvent[] = [
  {
    id: "t1",
    year: "2010",
    title: "Fundação da Nauta",
    description:
      "Iniciamos nossas atividades com o objetivo de oferecer treinamentos de excelência para o setor offshore brasileiro.",
    icon: require("lucide-react").Anchor,
  },
  {
    id: "t2",
    year: "2013",
    title: "Certificação Internacional",
    description:
      "Conquistamos certificações internacionais que validam a qualidade dos nossos treinamentos e instrutores.",
    icon: require("lucide-react").Award,
  },
  {
    id: "t3",
    year: "2016",
    title: "Expansão Nacional",
    description: "Abrimos novas unidades em diferentes estados, ampliando nosso alcance e capacidade de atendimento.",
    icon: require("lucide-react").MapPin,
  },
  {
    id: "t4",
    year: "2019",
    title: "10.000 Alunos Formados",
    description:
      "Atingimos a marca de 10 mil profissionais capacitados, consolidando nossa posição como referência no mercado.",
    icon: require("lucide-react").Users,
  },
  {
    id: "t5",
    year: "2022",
    title: "Plataforma Digital",
    description:
      "Lançamos nossa plataforma de ensino online, oferecendo flexibilidade e acesso remoto aos nossos cursos.",
    icon: require("lucide-react").Monitor,
  },
]

export const teamMembers: TeamMember[] = [
  {
    id: "tm1",
    name: "Capitão Roberto Alves",
    role: "Diretor Técnico",
    bio: "30 anos de experiência em operações offshore, ex-comandante de plataformas e especialista em segurança marítima.",
    avatarUrl: "/placeholder.svg?height=100&width=100&text=RA",
  },
  {
    id: "tm2",
    name: "Dra. Marina Santos",
    role: "Coordenadora Pedagógica",
    bio: "Doutora em Educação com especialização em treinamentos técnicos e desenvolvimento de metodologias de ensino.",
    avatarUrl: "/placeholder.svg?height=100&width=100&text=MS",
  },
  {
    id: "tm3",
    name: "Eng. Carlos Mendes",
    role: "Instrutor Sênior",
    bio: "Engenheiro mecânico com 20 anos de atuação em plataformas offshore e certificações internacionais em soldagem.",
    avatarUrl: "/placeholder.svg?height=100&width=100&text=CM",
  },
  {
    id: "tm4",
    name: "Juliana Costa",
    role: "Gerente de Qualidade",
    bio: "Especialista em gestão da qualidade e compliance, responsável por manter nossos padrões de excelência.",
    avatarUrl: "/placeholder.svg?height=100&width=100&text=JC",
  },
  {
    id: "tm5",
    name: "Pedro Oliveira",
    role: "Coordenador de Segurança",
    bio: "Técnico de segurança do trabalho com vasta experiência em NR-37 e treinamentos de emergência offshore.",
    avatarUrl: "/placeholder.svg?height=100&width=100&text=PO",
  },
  {
    id: "tm6",
    name: "Ana Ferreira",
    role: "Instrutora de Primeiros Socorros",
    bio: "Enfermeira e paramédica com certificações internacionais em atendimento de emergência e resgate.",
    avatarUrl: "/placeholder.svg?height=100&width=100&text=AF",
  },
]

export const companyValues: CompanyValue[] = [
  {
    id: "v1",
    icon: "Shield",
    title: "Segurança em Primeiro Lugar",
    description:
      "A segurança dos nossos alunos e profissionais é nossa prioridade máxima em todos os treinamentos e operações.",
  },
  {
    id: "v2",
    icon: "Target",
    title: "Excelência e Qualidade",
    description:
      "Buscamos constantemente a excelência em nossos serviços, mantendo os mais altos padrões de qualidade.",
  },
  {
    id: "v3",
    icon: "Heart",
    title: "Compromisso com o Aluno",
    description:
      "Estamos comprometidos com o sucesso profissional de cada aluno, oferecendo suporte completo em sua jornada.",
  },
  {
    id: "v4",
    icon: "Lightbulb",
    title: "Inovação Contínua",
    description:
      "Investimos em tecnologia e metodologias inovadoras para proporcionar a melhor experiência de aprendizado.",
  },
]

export const mockQuizzes: Quiz[] = [
  {
    id: "quiz1",
    title: "Quiz: Fundamentos de Segurança Offshore",
    description: "Teste seus conhecimentos sobre os conceitos básicos de segurança em plataformas offshore.",
    passingScore: 70,
    maxAttempts: 3,
    questions: [
      {
        id: "q1",
        text: "Qual é a principal norma regulamentadora que trata de segurança em plataformas offshore no Brasil?",
        options: [
          { id: "q1a", text: "NR-35" },
          { id: "q1b", text: "NR-37" },
          { id: "q1c", text: "NR-33" },
          { id: "q1d", text: "NR-10" },
        ],
        correctOptionId: "q1b",
        explanation: "A NR-37 é a norma regulamentadora específica para segurança e saúde em plataformas de petróleo.",
      },
      {
        id: "q2",
        text: "Qual equipamento de proteção individual (EPI) é obrigatório para todos os trabalhadores em plataformas offshore?",
        options: [
          { id: "q2a", text: "Capacete e óculos de proteção" },
          { id: "q2b", text: "Colete salva-vidas e capacete" },
          { id: "q2c", text: "Luvas e botas de segurança" },
          { id: "q2d", text: "Todos os anteriores" },
        ],
        correctOptionId: "q2d",
        explanation:
          "Todos os EPIs mencionados são obrigatórios em diferentes situações em plataformas offshore para garantir a segurança dos trabalhadores.",
      },
      {
        id: "q3",
        text: "Em caso de abandono de plataforma, qual é o procedimento correto?",
        options: [
          { id: "q3a", text: "Pular imediatamente no mar" },
          { id: "q3b", text: "Aguardar instruções e seguir para o ponto de reunião" },
          { id: "q3c", text: "Tentar apagar o incêndio sozinho" },
          { id: "q3d", text: "Ligar para familiares primeiro" },
        ],
        correctOptionId: "q3b",
        explanation:
          "O procedimento correto é aguardar as instruções da equipe de segurança e seguir de forma ordenada para o ponto de reunião designado.",
      },
    ],
  },
  {
    id: "quiz2",
    title: "Quiz: Trabalho em Altura - NR-35",
    description: "Avalie seus conhecimentos sobre segurança em trabalhos em altura.",
    passingScore: 75,
    maxAttempts: 3,
    questions: [
      {
        id: "q4",
        text: "A partir de qual altura é considerado trabalho em altura segundo a NR-35?",
        options: [
          { id: "q4a", text: "1 metro" },
          { id: "q4b", text: "2 metros" },
          { id: "q4c", text: "3 metros" },
          { id: "q4d", text: "5 metros" },
        ],
        correctOptionId: "q4b",
        explanation:
          "Segundo a NR-35, trabalho em altura é toda atividade executada acima de 2 metros do nível inferior onde haja risco de queda.",
      },
      {
        id: "q5",
        text: "Qual é o principal sistema de proteção contra quedas?",
        options: [
          { id: "q5a", text: "Cinto de segurança tipo paraquedista" },
          { id: "q5b", text: "Capacete" },
          { id: "q5c", text: "Luvas antiderrapantes" },
          { id: "q5d", text: "Botas com solado aderente" },
        ],
        correctOptionId: "q5a",
        explanation:
          "O cinto de segurança tipo paraquedista, quando conectado a um ponto de ancoragem adequado, é o principal sistema de proteção contra quedas.",
      },
    ],
  },
  {
    id: "quiz3",
    title: "Quiz: Espaços Confinados - NR-33",
    description: "Teste seus conhecimentos sobre trabalho seguro em espaços confinados.",
    passingScore: 70,
    maxAttempts: 3,
    questions: [
      {
        id: "q6",
        text: "O que caracteriza um espaço confinado?",
        options: [
          { id: "q6a", text: "Qualquer ambiente fechado" },
          {
            id: "q6b",
            text: "Área não projetada para ocupação contínua, com meios limitados de entrada e saída",
          },
          { id: "q6c", text: "Apenas tanques e silos" },
          { id: "q6d", text: "Ambientes sem iluminação" },
        ],
        correctOptionId: "q6b",
        explanation:
          "Espaço confinado é qualquer área não projetada para ocupação humana contínua, com meios limitados de entrada e saída e ventilação insuficiente.",
      },
      {
        id: "q7",
        text: "Qual é a função do vigia em trabalhos em espaços confinados?",
        options: [
          { id: "q7a", text: "Entrar no espaço confinado para ajudar" },
          { id: "q7b", text: "Monitorar os trabalhadores e acionar emergência se necessário" },
          { id: "q7c", text: "Operar equipamentos dentro do espaço" },
          { id: "q7d", text: "Fazer a limpeza do local" },
        ],
        correctOptionId: "q7b",
        explanation:
          "O vigia deve permanecer do lado de fora, monitorando constantemente os trabalhadores e acionando os procedimentos de emergência se necessário.",
      },
    ],
  },
]
