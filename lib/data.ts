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
  quizAttempts?: QuizAttempt[]
  isCompleted?: boolean
}

export interface QuizAttempt {
  quizId: string
  attemptsMade: number
  bestScore: number
  passed: boolean
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
  icon: any
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
  imageUrl?: string
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

const cbspCourseSections: CourseSection[] = [
  {
    id: "sec1",
    title: "Módulo 1: Introdução à Segurança Offshore",
    lessons: [
      {
        id: "l1-1",
        title: "Bem-vindo ao Curso CBSP",
        type: "video",
        duration: "8 min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        hasResources: true,
      },
      {
        id: "l1-2",
        title: "O que é Segurança Offshore?",
        type: "text",
        duration: "5 min",
        textContent: `A segurança offshore é um conjunto de práticas, normas e procedimentos destinados a proteger trabalhadores, equipamentos e o meio ambiente em instalações marítimas, especialmente plataformas de petróleo e gás.

**Principais Aspectos da Segurança Offshore:**

1. **Prevenção de Acidentes**: Implementação de barreiras físicas e procedimentais para evitar incidentes.

2. **Resposta a Emergências**: Treinamento e equipamentos para lidar com situações de crise.

3. **Saúde Ocupacional**: Monitoramento das condições de trabalho e saúde dos trabalhadores.

4. **Proteção Ambiental**: Medidas para prevenir vazamentos e contaminação marinha.

**Por que é tão importante?**

O ambiente offshore apresenta riscos únicos:
- Isolamento geográfico
- Condições climáticas adversas
- Presença de materiais inflamáveis
- Operações complexas 24/7

A NR-37 é a norma regulamentadora brasileira que estabelece os requisitos mínimos de segurança para este ambiente.`,
        imageUrl: "/placeholder.svg?height=400&width=800&text=Plataforma+Offshore",
      },
      {
        id: "l1-3",
        title: "Legislação e Normas - NR-37",
        type: "text",
        duration: "10 min",
        textContent: `A Norma Regulamentadora 37 (NR-37) estabelece os requisitos de segurança e saúde em plataformas de petróleo.

**Objetivos da NR-37:**

• Garantir permanentemente a segurança e a saúde dos trabalhadores que atuam em plataformas de petróleo

• Estabelecer requisitos mínimos de segurança, saúde e condições de vivência a bordo das plataformas

• Definir responsabilidades e direitos de operadores, empresas contratadas e trabalhadores

**Principais Exigências:**

1. **Gestão de Segurança**: Sistema de gestão integrado com análise de riscos
2. **Treinamentos Obrigatórios**: CBSP e cursos específicos para cada função
3. **Equipamentos de Proteção**: EPIs adequados para cada atividade
4. **Procedimentos de Emergência**: Planos detalhados de abandono e combate a incêndio
5. **Condições de Vivência**: Alojamentos, alimentação e áreas de lazer adequadas

**Responsabilidades do Trabalhador:**

- Participar dos treinamentos obrigatórios
- Usar corretamente os EPIs
- Comunicar situações de risco
- Seguir os procedimentos de segurança`,
        imageUrl: "/placeholder.svg?height=400&width=800&text=Documentos+NR-37",
      },
      {
        id: "l1-4",
        title: "Quiz - Módulo 1",
        type: "quiz",
        duration: "10 min",
        quizId: "quiz-mod1",
      },
    ],
  },
  {
    id: "sec2",
    title: "Módulo 2: Equipamentos de Proteção",
    lessons: [
      {
        id: "l2-1",
        title: "EPIs Obrigatórios em Plataformas",
        type: "video",
        duration: "12 min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        hasResources: true,
      },
      {
        id: "l2-2",
        title: "Capacetes e Proteção da Cabeça",
        type: "text",
        duration: "7 min",
        textContent: `O capacete de segurança é um dos EPIs mais importantes em ambientes offshore, protegendo contra impactos, quedas de objetos e choques elétricos.

**Tipos de Capacetes:**

1. **Classe A**: Proteção contra impactos e penetração
2. **Classe B**: Proteção adicional contra choques elétricos de alta voltagem
3. **Classe C**: Versão mais leve, sem proteção elétrica

**Componentes do Capacete:**

• **Casco**: Parte externa resistente a impactos
• **Carneira**: Sistema de ajuste interno
• **Suspensão**: Absorve energia do impacto
• **Jugular**: Tira de fixação sob o queixo

**Cuidados e Manutenção:**

- Inspecionar antes de cada uso
- Substituir em caso de impacto ou danos visíveis
- Não pintar ou furar o casco
- Armazenar em local seco e ventilado
- Validade média: 5 anos a partir da fabricação`,
        imageUrl: "/placeholder.svg?height=400&width=800&text=Capacete+de+Seguranca",
      },
      {
        id: "l2-3",
        title: "Coletes Salva-Vidas e Equipamentos de Flutuação",
        type: "text",
        duration: "8 min",
        textContent: `Em plataformas offshore, os equipamentos de flutuação são essenciais para situações de emergência no mar.

**Tipos de Equipamentos:**

**1. Colete Salva-Vidas (PFD - Personal Flotation Device)**
- Flutuabilidade mínima de 150N
- Equipado com apito e luz de sinalização
- Fita refletiva para visibilidade
- Deve virar pessoa inconsciente de bruços para cima

**2. Colete Inflável**
- Acionamento manual ou automático
- Mais confortável para uso prolongado
- Requer manutenção regular

**3. Boia Salva-Vidas**
- Distribuídas em pontos estratégicos
- Para resgate de pessoa no mar
- Equipadas com retinida (corda)

**Como Vestir Corretamente:**

1. Passar os braços pelas aberturas
2. Fechar todos os fechos e fivelas
3. Ajustar as tiras firmemente
4. Verificar se não há folgas
5. Testar o apito e a luz

**Inspeção Diária:**
- Verificar costuras e fechos
- Testar mecanismo de inflação (se aplicável)
- Confirmar presença de acessórios
- Checar validade dos cilindros`,
        imageUrl: "/placeholder.svg?height=400&width=800&text=Colete+Salva-Vidas",
      },
      {
        id: "l2-4",
        title: "Quiz - Módulo 2",
        type: "quiz",
        duration: "8 min",
        quizId: "quiz-mod2",
      },
    ],
  },
  {
    id: "sec3",
    title: "Módulo 3: Primeiros Socorros",
    lessons: [
      {
        id: "l3-1",
        title: "Introdução aos Primeiros Socorros",
        type: "video",
        duration: "15 min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: "l3-2",
        title: "RCP - Ressuscitação Cardiopulmonar",
        type: "text",
        duration: "12 min",
        textContent: `A Ressuscitação Cardiopulmonar (RCP) é uma técnica vital que pode salvar vidas em casos de parada cardiorrespiratória.

**Quando Aplicar RCP:**
- Vítima inconsciente
- Ausência de respiração normal
- Ausência de pulso

**Passo a Passo da RCP em Adultos:**

**1. Verifique a Segurança**
- Certifique-se de que o local é seguro
- Use EPIs se disponíveis

**2. Verifique a Consciência**
- Toque nos ombros da vítima
- Pergunte: "Você está bem?"

**3. Chame Ajuda**
- Peça para alguém ligar para emergência
- Solicite um DEA (Desfibrilador)

**4. Inicie as Compressões Torácicas**
- Posicione as mãos no centro do peito
- Braços esticados, ombros alinhados
- 30 compressões profundas (5-6 cm)
- Frequência: 100-120 por minuto

**5. Faça 2 Ventilações**
- Incline a cabeça para trás
- Eleve o queixo
- Feche o nariz e sopre 2 vezes

**6. Continue o Ciclo 30:2**
- Não pare até socorro chegar
- Revezamento a cada 2 minutos

**Com DEA:**
- Ligue o aparelho
- Coloque as pás conforme indicado
- Siga as instruções de voz
- Afaste-se durante o choque`,
        imageUrl: "/placeholder.svg?height=400&width=800&text=RCP+Tecnica",
      },
      {
        id: "l3-3",
        title: "Controle de Hemorragias",
        type: "text",
        duration: "8 min",
        textContent: `O controle de hemorragias é fundamental em ambientes offshore onde o socorro pode demorar.

**Tipos de Hemorragia:**

**1. Hemorragia Arterial**
- Sangue vermelho vivo
- Jato pulsátil
- MAIS GRAVE - ação imediata

**2. Hemorragia Venosa**
- Sangue vermelho escuro
- Fluxo contínuo
- Grave, mas mais controlável

**3. Hemorragia Capilar**
- Sangramento lento
- Pequenos ferimentos
- Geralmente para sozinha

**Técnicas de Controle:**

**Compressão Direta:**
1. Coloque gaze ou pano limpo sobre o ferimento
2. Pressione firmemente com a mão
3. Mantenha por pelo menos 10 minutos
4. Não remova o primeiro curativo

**Elevação do Membro:**
- Eleve acima do nível do coração
- Combine com compressão direta

**Torniquete (último recurso):**
- Use apenas em hemorragias que ameacem a vida
- Aplique 5-7 cm acima do ferimento
- Anote o horário de aplicação
- NÃO afrouxe após aplicado

**Pontos de Pressão:**
- Artéria braquial (braço)
- Artéria femoral (coxa)
- Use quando compressão direta não funcionar`,
        imageUrl: "/placeholder.svg?height=400&width=800&text=Controle+Hemorragia",
      },
      {
        id: "l3-4",
        title: "Quiz - Módulo 3",
        type: "quiz",
        duration: "10 min",
        quizId: "quiz-mod3",
      },
    ],
  },
  {
    id: "sec4",
    title: "Módulo 4: Combate a Incêndio",
    lessons: [
      {
        id: "l4-1",
        title: "Classes de Incêndio e Extintores",
        type: "video",
        duration: "18 min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        hasResources: true,
      },
      {
        id: "l4-2",
        title: "Técnicas de Combate a Incêndio",
        type: "text",
        duration: "15 min",
        textContent: `O combate a incêndio em plataformas offshore requer conhecimento específico devido aos riscos únicos do ambiente.

**Classes de Incêndio:**

**Classe A** - Materiais Sólidos
- Madeira, papel, tecidos
- Extintor: Água ou espuma

**Classe B** - Líquidos Inflamáveis
- Óleo, gasolina, solventes
- Extintor: Pó químico ou CO2

**Classe C** - Equipamentos Elétricos
- Painéis, motores, cabos
- Extintor: CO2 ou pó químico

**Classe D** - Metais Combustíveis
- Magnésio, titânio
- Extintor: Pó especial

**Técnica PEAS para Uso de Extintor:**

**P** - Puxe o pino de segurança
**E** - Empunhe a mangueira
**A** - Aponte para a base do fogo
**S** - Aperte o gatilho e Solte em movimentos

**Procedimentos em Plataforma:**

1. Ao detectar fogo, acione o alarme
2. Avalie a situação rapidamente
3. Se pequeno, use extintor mais próximo
4. Se grande, evacue imediatamente
5. Feche portas para conter fumaça
6. Nunca use elevadores
7. Dirija-se ao ponto de reunião`,
        imageUrl: "/placeholder.svg?height=400&width=800&text=Combate+Incendio",
      },
      {
        id: "l4-3",
        title: "Quiz - Módulo 4",
        type: "quiz",
        duration: "8 min",
        quizId: "quiz-mod4",
      },
    ],
  },
  {
    id: "sec5",
    title: "Módulo 5: Abandono de Plataforma",
    lessons: [
      {
        id: "l5-1",
        title: "Procedimentos de Evacuação",
        type: "video",
        duration: "20 min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        hasResources: true,
      },
      {
        id: "l5-2",
        title: "Uso de Botes Salva-Vidas",
        type: "text",
        duration: "12 min",
        textContent: `Os botes salva-vidas são equipamentos essenciais para abandono de plataforma em situações de emergência.

**Tipos de Embarcações de Salvamento:**

**1. Bote Salva-Vidas Fechado (Totalmente Enclausurado)**
- Capacidade: 50-150 pessoas
- Proteção contra fogo e fumaça
- Sistema de ar comprimido
- Lançamento por gravidade ou queda livre

**2. Baleeira de Resgate**
- Embarcação rápida
- Para resgates no mar
- Operada por tripulação treinada

**3. Balsas Infláveis**
- Acionamento automático ou manual
- Capacidade variada
- Kit de sobrevivência incluído

**Procedimento de Embarque:**

1. Vista o colete salva-vidas corretamente
2. Dirija-se ao ponto de reunião designado
3. Aguarde instruções do comandante
4. Entre no bote de forma ordenada
5. Sente-se e prenda o cinto de segurança
6. Mantenha braços junto ao corpo durante o lançamento

**Dentro do Bote:**
- Siga instruções do mestre do bote
- Não abra escotilhas sem autorização
- Distribua peso uniformemente
- Acione equipamentos de sinalização quando ordenado

**Kit de Sobrevivência:**
- Água potável e rações
- Sinalizadores e espelho
- Rádio de emergência
- Medicamentos básicos
- Cobertor térmico`,
        imageUrl: "/placeholder.svg?height=400&width=800&text=Bote+Salva-Vidas",
      },
      {
        id: "l5-3",
        title: "Sobrevivência no Mar",
        type: "text",
        duration: "10 min",
        textContent: `Conhecer técnicas de sobrevivência no mar pode ser a diferença entre a vida e a morte em situações de emergência.

**Princípios Básicos de Sobrevivência:**

**Proteção:**
- Mantenha-se seco se possível
- Use roupas para proteção térmica
- Cubra a cabeça para reduzir perda de calor

**Localização:**
- Permaneça próximo ao local do naufrágio
- Use sinalizadores quando avistar socorro
- Espelho de sinalização durante o dia

**Água:**
- NUNCA beba água do mar
- Racionalize água potável
- Colete água da chuva

**Alimentação:**
- Rações de emergência devem ser racionadas
- Não coma se não tiver água

**Hipotermia - O Maior Perigo:**

A água conduz calor 25x mais rápido que o ar.

**Posição HELP (Heat Escape Lessening Posture):**
- Cruze os braços sobre o peito
- Junte as pernas
- Mantenha-se o mais imóvel possível

**Posição Aglomerada (Grupo):**
- Forme um círculo apertado
- Compartilhe calor corporal
- Mantenha crianças no centro

**Sinais de Hipotermia:**
- Tremores intensos
- Confusão mental
- Fala arrastada
- Perda de coordenação

**Tempo de Sobrevivência na Água:**
- 20°C: várias horas
- 15°C: 2-6 horas
- 10°C: 1-2 horas
- 5°C: 30-60 minutos`,
        imageUrl: "/placeholder.svg?height=400&width=800&text=Sobrevivencia+Mar",
      },
      {
        id: "l5-4",
        title: "Quiz - Módulo 5",
        type: "quiz",
        duration: "10 min",
        quizId: "quiz-mod5",
      },
    ],
  },
  {
    id: "sec-final",
    title: "Avaliação Final",
    lessons: [
      {
        id: "l-final",
        title: "Prova Final - CBSP",
        type: "quiz",
        duration: "30 min",
        quizId: "quiz-final",
      },
    ],
  },
]

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
    courseSections: cbspCourseSections,
    finalQuizId: "quiz-final",
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
    progress: 25,
    imageUrl: "/placeholder.svg?height=200&width=300&text=CBSP",
    certificateAvailable: false,
    completedLessonIds: ["l1-1", "l1-2", "l1-3", "l1-4"],
    quizAttempts: [{ quizId: "quiz-mod1", attemptsMade: 1, bestScore: 100, passed: true }],
    isCompleted: false,
  },
  {
    id: "uc2",
    courseId: "2",
    name: "NR-35 - Trabalho em Altura",
    progress: 100,
    imageUrl: "/placeholder.svg?height=200&width=300&text=NR-35",
    certificateAvailable: true,
    completedLessonIds: [],
    quizAttempts: [],
    isCompleted: true,
  },
  {
    id: "uc3",
    courseId: "5",
    name: "Soldador Offshore",
    progress: 30,
    imageUrl: "/placeholder.svg?height=200&width=300&text=Soldador",
    certificateAvailable: false,
    completedLessonIds: [],
    quizAttempts: [],
    isCompleted: false,
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
    id: "quiz-mod1",
    title: "Quiz - Módulo 1: Introdução à Segurança Offshore",
    description: "Teste seus conhecimentos sobre os conceitos básicos de segurança em plataformas offshore.",
    passingScore: 70,
    maxAttempts: 3,
    questions: [
      {
        id: "q1-1",
        text: "Qual é a principal norma regulamentadora que trata de segurança em plataformas offshore no Brasil?",
        options: [
          { id: "q1-1a", text: "NR-35" },
          { id: "q1-1b", text: "NR-37" },
          { id: "q1-1c", text: "NR-33" },
          { id: "q1-1d", text: "NR-10" },
        ],
        correctOptionId: "q1-1b",
        explanation: "A NR-37 é a norma regulamentadora específica para segurança e saúde em plataformas de petróleo.",
      },
      {
        id: "q1-2",
        text: "Qual das seguintes NÃO é uma responsabilidade do trabalhador segundo a NR-37?",
        options: [
          { id: "q1-2a", text: "Participar dos treinamentos obrigatórios" },
          { id: "q1-2b", text: "Usar corretamente os EPIs" },
          { id: "q1-2c", text: "Elaborar o plano de emergência da plataforma" },
          { id: "q1-2d", text: "Comunicar situações de risco" },
        ],
        correctOptionId: "q1-2c",
        explanation: "A elaboração do plano de emergência é responsabilidade da operadora, não do trabalhador.",
      },
      {
        id: "q1-3",
        text: "O que significa a sigla CBSP?",
        options: [
          { id: "q1-3a", text: "Curso Básico de Segurança Profissional" },
          { id: "q1-3b", text: "Curso Básico de Segurança em Plataformas" },
          { id: "q1-3c", text: "Certificado Brasileiro de Segurança Petroleira" },
          { id: "q1-3d", text: "Capacitação Básica de Salvamento em Plataformas" },
        ],
        correctOptionId: "q1-3b",
        explanation: "CBSP significa Curso Básico de Segurança em Plataformas, obrigatório para trabalho offshore.",
      },
    ],
  },
  {
    id: "quiz-mod2",
    title: "Quiz - Módulo 2: Equipamentos de Proteção",
    description: "Avalie seus conhecimentos sobre EPIs utilizados em plataformas offshore.",
    passingScore: 70,
    maxAttempts: 3,
    questions: [
      {
        id: "q2-1",
        text: "Qual classe de capacete oferece proteção contra choques elétricos de alta voltagem?",
        options: [
          { id: "q2-1a", text: "Classe A" },
          { id: "q2-1b", text: "Classe B" },
          { id: "q2-1c", text: "Classe C" },
          { id: "q2-1d", text: "Classe D" },
        ],
        correctOptionId: "q2-1b",
        explanation:
          "A Classe B oferece proteção adicional contra choques elétricos de alta voltagem além de impactos.",
      },
      {
        id: "q2-2",
        text: "Qual é a flutuabilidade mínima de um colete salva-vidas para uso offshore?",
        options: [
          { id: "q2-2a", text: "50N" },
          { id: "q2-2b", text: "100N" },
          { id: "q2-2c", text: "150N" },
          { id: "q2-2d", text: "200N" },
        ],
        correctOptionId: "q2-2c",
        explanation: "Coletes salva-vidas para uso offshore devem ter flutuabilidade mínima de 150N.",
      },
      {
        id: "q2-3",
        text: "Qual é a vida útil média de um capacete de segurança?",
        options: [
          { id: "q2-3a", text: "2 anos" },
          { id: "q2-3b", text: "3 anos" },
          { id: "q2-3c", text: "5 anos" },
          { id: "q2-3d", text: "10 anos" },
        ],
        correctOptionId: "q2-3c",
        explanation: "A validade média de um capacete de segurança é de 5 anos a partir da data de fabricação.",
      },
    ],
  },
  {
    id: "quiz-mod3",
    title: "Quiz - Módulo 3: Primeiros Socorros",
    description: "Teste seus conhecimentos sobre técnicas de primeiros socorros.",
    passingScore: 70,
    maxAttempts: 3,
    questions: [
      {
        id: "q3-1",
        text: "Qual é a frequência correta de compressões torácicas na RCP em adultos?",
        options: [
          { id: "q3-1a", text: "60-80 por minuto" },
          { id: "q3-1b", text: "80-100 por minuto" },
          { id: "q3-1c", text: "100-120 por minuto" },
          { id: "q3-1d", text: "120-140 por minuto" },
        ],
        correctOptionId: "q3-1c",
        explanation: "A frequência correta é de 100 a 120 compressões por minuto conforme diretrizes atuais.",
      },
      {
        id: "q3-2",
        text: "Qual é a proporção correta de compressões para ventilações na RCP?",
        options: [
          { id: "q3-2a", text: "15:1" },
          { id: "q3-2b", text: "15:2" },
          { id: "q3-2c", text: "30:1" },
          { id: "q3-2d", text: "30:2" },
        ],
        correctOptionId: "q3-2d",
        explanation: "O ciclo correto é de 30 compressões para cada 2 ventilações.",
      },
      {
        id: "q3-3",
        text: "Quando o torniquete deve ser utilizado para controle de hemorragia?",
        options: [
          { id: "q3-3a", text: "Em qualquer hemorragia" },
          { id: "q3-3b", text: "Como primeira opção sempre" },
          { id: "q3-3c", text: "Apenas em hemorragias que ameacem a vida" },
          { id: "q3-3d", text: "Nunca deve ser utilizado" },
        ],
        correctOptionId: "q3-3c",
        explanation: "O torniquete é último recurso, usado apenas em hemorragias graves que ameacem a vida.",
      },
    ],
  },
  {
    id: "quiz-mod4",
    title: "Quiz - Módulo 4: Combate a Incêndio",
    description: "Avalie seus conhecimentos sobre prevenção e combate a incêndio.",
    passingScore: 70,
    maxAttempts: 3,
    questions: [
      {
        id: "q4-1",
        text: "Qual tipo de extintor deve ser usado em incêndios de Classe C (equipamentos elétricos)?",
        options: [
          { id: "q4-1a", text: "Água" },
          { id: "q4-1b", text: "Espuma" },
          { id: "q4-1c", text: "CO2 ou pó químico" },
          { id: "q4-1d", text: "Espuma aquosa" },
        ],
        correctOptionId: "q4-1c",
        explanation: "Em equipamentos elétricos, deve-se usar CO2 ou pó químico para não conduzir eletricidade.",
      },
      {
        id: "q4-2",
        text: "Na técnica PEAS para uso de extintor, o que significa a letra 'A'?",
        options: [
          { id: "q4-2a", text: "Acionar o alarme" },
          { id: "q4-2b", text: "Apontar para a base do fogo" },
          { id: "q4-2c", text: "Apertar o gatilho" },
          { id: "q4-2d", text: "Aproximar-se do fogo" },
        ],
        correctOptionId: "q4-2b",
        explanation: "PEAS: Puxe o pino, Empunhe a mangueira, Aponte para a base, Solte em movimentos.",
      },
      {
        id: "q4-3",
        text: "Qual classe de incêndio envolve líquidos inflamáveis?",
        options: [
          { id: "q4-3a", text: "Classe A" },
          { id: "q4-3b", text: "Classe B" },
          { id: "q4-3c", text: "Classe C" },
          { id: "q4-3d", text: "Classe D" },
        ],
        correctOptionId: "q4-3b",
        explanation: "Classe B envolve líquidos inflamáveis como óleo, gasolina e solventes.",
      },
    ],
  },
  {
    id: "quiz-mod5",
    title: "Quiz - Módulo 5: Abandono de Plataforma",
    description: "Teste seus conhecimentos sobre procedimentos de evacuação e sobrevivência.",
    passingScore: 70,
    maxAttempts: 3,
    questions: [
      {
        id: "q5-1",
        text: "Em caso de abandono de plataforma, qual é o procedimento correto?",
        options: [
          { id: "q5-1a", text: "Pular imediatamente no mar" },
          { id: "q5-1b", text: "Aguardar instruções e seguir para o ponto de reunião" },
          { id: "q5-1c", text: "Tentar apagar o incêndio sozinho" },
          { id: "q5-1d", text: "Ligar para familiares primeiro" },
        ],
        correctOptionId: "q5-1b",
        explanation:
          "O procedimento correto é aguardar instruções da equipe de segurança e seguir para o ponto de reunião.",
      },
      {
        id: "q5-2",
        text: "Qual é a posição HELP usada para sobrevivência no mar?",
        options: [
          { id: "q5-2a", text: "Nadar vigorosamente para manter o calor" },
          { id: "q5-2b", text: "Braços cruzados sobre o peito, pernas juntas, manter-se imóvel" },
          { id: "q5-2c", text: "Boiar de costas com braços e pernas abertos" },
          { id: "q5-2d", text: "Mergulhar frequentemente para se proteger" },
        ],
        correctOptionId: "q5-2b",
        explanation:
          "HELP (Heat Escape Lessening Posture): braços cruzados, pernas juntas, imóvel para conservar calor.",
      },
      {
        id: "q5-3",
        text: "Por que NUNCA se deve beber água do mar em situação de sobrevivência?",
        options: [
          { id: "q5-3a", text: "Porque tem gosto ruim" },
          { id: "q5-3b", text: "Porque aumenta a desidratação devido ao sal" },
          { id: "q5-3c", text: "Porque pode conter bactérias" },
          { id: "q5-3d", text: "Porque é muito fria" },
        ],
        correctOptionId: "q5-3b",
        explanation: "A água do mar contém muito sal, o que aumenta a desidratação e pode ser fatal.",
      },
    ],
  },
  {
    id: "quiz-final",
    title: "Prova Final - CBSP",
    description: "Avaliação final do Curso Básico de Segurança em Plataformas. Você precisa de 70% para ser aprovado.",
    passingScore: 70,
    maxAttempts: 3,
    questions: [
      {
        id: "qf-1",
        text: "Qual é a principal norma regulamentadora que trata de segurança em plataformas offshore no Brasil?",
        options: [
          { id: "qf-1a", text: "NR-35" },
          { id: "qf-1b", text: "NR-37" },
          { id: "qf-1c", text: "NR-33" },
          { id: "qf-1d", text: "NR-10" },
        ],
        correctOptionId: "qf-1b",
        explanation: "A NR-37 é a norma regulamentadora específica para segurança e saúde em plataformas de petróleo.",
      },
      {
        id: "qf-2",
        text: "Qual é a frequência correta de compressões torácicas na RCP em adultos?",
        options: [
          { id: "qf-2a", text: "60-80 por minuto" },
          { id: "qf-2b", text: "80-100 por minuto" },
          { id: "qf-2c", text: "100-120 por minuto" },
          { id: "qf-2d", text: "120-140 por minuto" },
        ],
        correctOptionId: "qf-2c",
        explanation: "A frequência correta é de 100 a 120 compressões por minuto conforme diretrizes atuais.",
      },
      {
        id: "qf-3",
        text: "Qual tipo de extintor deve ser usado em incêndios de Classe B (líquidos inflamáveis)?",
        options: [
          { id: "qf-3a", text: "Água pressurizada" },
          { id: "qf-3b", text: "Pó químico ou CO2" },
          { id: "qf-3c", text: "Espuma aquosa apenas" },
          { id: "qf-3d", text: "Jato de ar comprimido" },
        ],
        correctOptionId: "qf-3b",
        explanation: "Para líquidos inflamáveis (Classe B), deve-se usar pó químico ou CO2.",
      },
      {
        id: "qf-4",
        text: "Qual é a flutuabilidade mínima exigida para coletes salva-vidas offshore?",
        options: [
          { id: "qf-4a", text: "50N" },
          { id: "qf-4b", text: "100N" },
          { id: "qf-4c", text: "150N" },
          { id: "qf-4d", text: "200N" },
        ],
        correctOptionId: "qf-4c",
        explanation: "Coletes salva-vidas para uso offshore devem ter flutuabilidade mínima de 150N.",
      },
      {
        id: "qf-5",
        text: "Em caso de hemorragia grave, qual deve ser a primeira ação?",
        options: [
          { id: "qf-5a", text: "Aplicar torniquete imediatamente" },
          { id: "qf-5b", text: "Fazer compressão direta sobre o ferimento" },
          { id: "qf-5c", text: "Lavar o ferimento com água" },
          { id: "qf-5d", text: "Elevar o membro sem fazer pressão" },
        ],
        correctOptionId: "qf-5b",
        explanation: "A compressão direta é a primeira técnica a ser aplicada para controle de hemorragias.",
      },
      {
        id: "qf-6",
        text: "O que significa a posição HELP na sobrevivência no mar?",
        options: [
          { id: "qf-6a", text: "Help Emergency Life Position" },
          { id: "qf-6b", text: "Heat Escape Lessening Posture" },
          { id: "qf-6c", text: "Horizontal Emergency Landing Position" },
          { id: "qf-6d", text: "High Energy Life Protection" },
        ],
        correctOptionId: "qf-6b",
        explanation: "HELP significa Heat Escape Lessening Posture (Postura de Redução de Perda de Calor).",
      },
      {
        id: "qf-7",
        text: "Qual é o procedimento correto ao detectar um incêndio em uma plataforma?",
        options: [
          { id: "qf-7a", text: "Combater o incêndio sozinho imediatamente" },
          { id: "qf-7b", text: "Acionar o alarme e avaliar a situação" },
          { id: "qf-7c", text: "Evacuar sem avisar ninguém" },
          { id: "qf-7d", text: "Usar o elevador para sair rapidamente" },
        ],
        correctOptionId: "qf-7b",
        explanation: "Ao detectar fogo, deve-se primeiro acionar o alarme e então avaliar a situação antes de agir.",
      },
      {
        id: "qf-8",
        text: "Qual a proporção correta de compressões para ventilações na RCP?",
        options: [
          { id: "qf-8a", text: "15:1" },
          { id: "qf-8b", text: "15:2" },
          { id: "qf-8c", text: "30:1" },
          { id: "qf-8d", text: "30:2" },
        ],
        correctOptionId: "qf-8d",
        explanation: "O ciclo correto da RCP é de 30 compressões para cada 2 ventilações.",
      },
      {
        id: "qf-9",
        text: "A partir de qual altura o trabalho é considerado trabalho em altura segundo a NR-35?",
        options: [
          { id: "qf-9a", text: "1 metro" },
          { id: "qf-9b", text: "2 metros" },
          { id: "qf-9c", text: "3 metros" },
          { id: "qf-9d", text: "5 metros" },
        ],
        correctOptionId: "qf-9b",
        explanation:
          "Segundo a NR-35, trabalho em altura é toda atividade executada acima de 2 metros do nível inferior.",
      },
      {
        id: "qf-10",
        text: "Qual é a validade do certificado CBSP?",
        options: [
          { id: "qf-10a", text: "1 ano" },
          { id: "qf-10b", text: "2 anos" },
          { id: "qf-10c", text: "3 anos" },
          { id: "qf-10d", text: "5 anos" },
        ],
        correctOptionId: "qf-10b",
        explanation: "O certificado CBSP tem validade de 2 anos, após esse período é necessário fazer reciclagem.",
      },
    ],
  },
  // Mantendo os quizzes antigos para compatibilidade
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
