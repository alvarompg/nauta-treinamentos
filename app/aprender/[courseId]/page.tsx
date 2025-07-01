// Página de Aprendizado do Curso (Estilo Udemy)
// Exibe o conteúdo do curso, permite navegação entre aulas,
// quizzes e acompanha o progresso do usuário.
"use client" // Necessário para hooks como useState, useEffect, useParams

import { useState, useEffect, useMemo } from "react" // Hooks do React
import { useParams, useRouter } from "next/navigation" // Hooks do Next.js para navegação e parâmetros de rota
import Link from "next/link" // Componente para navegação
import Navbar from "@/components/layout/navbar" // Barra de navegação principal
import Footer from "@/components/layout/footer" // Rodapé principal
import { Button } from "@/components/ui/button" // Componente de Botão
import { Progress } from "@/components/ui/progress" // Componente de Barra de Progresso
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion" // Componente Acordeão para seções
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card" // Componente Card para layout
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert" // Componente Alerta para feedback
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group" // Componente RadioGroup para quizzes
import { Label } from "@/components/ui/label" // Componente Label
import {
  courses,
  mockUserCourses,
  mockQuizzes,
  mockUserCertificates,
  type Course,
  type Quiz,
  type UserCourse,
  type Lesson,
} from "@/lib/data" // Dados mockados
import { ChevronLeft, CheckCircle, XCircle, AlertCircle, Video, FileTextIcon } from "lucide-react" // Ícones

// --- Funções Auxiliares para buscar dados (simulando chamadas de API) ---

// getCourseDetails: Busca os detalhes de um curso pelo ID.
const getCourseDetails = (courseId: string): Course | undefined => {
  // Procura o curso na lista de cursos mockados.
  return courses.find((c) => c.id === courseId)
}

// getUserCourseProgress: Busca o progresso de um usuário em um curso específico.
const getUserCourseProgress = (courseId: string): UserCourse | undefined => {
  // Procura o progresso do usuário na lista mockada.
  // Em um app real, isso viria do backend, associado ao usuário logado.
  return mockUserCourses.find((uc) => uc.courseId === courseId)
}

// getQuizDetails: Busca os detalhes de um quiz pelo ID.
const getQuizDetails = (quizId: string): Quiz | undefined => {
  // Procura o quiz na lista de quizzes mockados.
  return mockQuizzes.find((q) => q.id === quizId)
}

// --- Componente Principal da Página de Aprendizado ---
export default function AprenderCursoPage() {
  // useParams: Hook para acessar os parâmetros dinâmicos da rota (ex: [courseId]).
  const params = useParams()
  // useRouter: Hook para controle de navegação.
  const router = useRouter()
  // courseId: ID do curso obtido da URL.
  const courseId = params.courseId as string

  // --- Estados do Componente ---
  // course: Armazena os dados do curso atual.
  const [course, setCourse] = useState<Course | null>(null)
  // userProgress: Armazena o progresso do usuário no curso atual.
  const [userProgress, setUserProgress] = useState<UserCourse | null>(null)
  // currentSectionId: ID da seção da aula atual.
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null)
  // currentLessonId: ID da aula atual.
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null)

  // activeQuiz: Armazena os dados do quiz ativo (se a aula atual for um quiz).
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null)
  // quizAnswers: Armazena as respostas selecionadas pelo usuário para o quiz ativo.
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({}) // { questionId: optionId }
  // quizResult: Armazena o resultado do quiz após a submissão.
  const [quizResult, setQuizResult] = useState<{
    score: number
    passed: boolean
    feedback: Record<string, boolean | undefined> // { questionId: isCorrect }
    explanations: Record<string, string | undefined> // { questionId: explanationText }
  } | null>(null)
  // quizAttemptsMade: Número de tentativas feitas no quiz atual.
  const [quizAttemptsMade, setQuizAttemptsMade] = useState(0)

  // useEffect: Executado quando o courseId ou o quiz ativo muda.
  // Responsável por carregar os dados do curso e o progresso do usuário.
  useEffect(() => {
    // Busca os dados do curso e do progresso.
    const courseData = getCourseDetails(courseId)
    const userProgressData = getUserCourseProgress(courseId)

    if (courseData) {
      setCourse(courseData) // Define o curso no estado.
      // Se o curso tiver seções, define a primeira seção e aula como ativas.
      if (courseData.courseSections && courseData.courseSections.length > 0) {
        const firstSection = courseData.courseSections[0]
        setCurrentSectionId(firstSection.id)
        if (firstSection.lessons && firstSection.lessons.length > 0) {
          setCurrentLessonId(firstSection.lessons[0].id)
        }
      }
    }

    if (userProgressData) {
      setUserProgress(userProgressData) // Define o progresso do usuário no estado.
      // Se houver um quiz ativo, atualiza o número de tentativas feitas.
      const currentQuizId = activeQuiz?.id
      if (currentQuizId) {
        const attemptData = userProgressData.quizAttempts?.find((qa) => qa.quizId === currentQuizId)
        setQuizAttemptsMade(attemptData?.attemptsMade || 0)
      }
    } else if (courseData) {
      // Se não houver progresso salvo, inicializa um progresso básico (para demonstração).
      setUserProgress({
        id: `uc-${courseId}`, // ID único para o progresso
        courseId: courseId,
        name: courseData.name,
        progress: 0,
        imageUrl: courseData.imageUrl,
        completedLessonIds: [],
        quizAttempts: [],
        isCompleted: false,
        certificateAvailable: false
      })
    }
  }, [courseId, activeQuiz?.id]) // Dependências do efeito.

  // useMemo: Hook para memorizar o valor da aula atual.
  // Evita recálculos desnecessários se as dependências não mudarem.
  const currentLesson: Lesson | null = useMemo(() => {
    if (!course || !currentSectionId || !currentLessonId) return null
    const section = course.courseSections?.find((s) => s.id === currentSectionId)
    return section?.lessons.find((l) => l.id === currentLessonId) || null
  }, [course, currentSectionId, currentLessonId]) // Dependências da memoização.

  // useEffect: Executado quando a aula atual (currentLesson) ou o progresso do usuário muda.
  // Responsável por carregar os dados do quiz se a aula atual for do tipo quiz.
  useEffect(() => {
    if (currentLesson?.type === "quiz" && currentLesson.quizId) {
      const quizData = getQuizDetails(currentLesson.quizId)
      setActiveQuiz(quizData || null) // Define o quiz ativo.
      setQuizResult(null) // Reseta o resultado do quiz anterior.
      setQuizAnswers({}) // Limpa as respostas anteriores.
      // Atualiza o número de tentativas para o novo quiz.
      const attemptData = userProgress?.quizAttempts?.find((qa) => qa.quizId === currentLesson.quizId)
      setQuizAttemptsMade(attemptData?.attemptsMade || 0)
    } else {
      setActiveQuiz(null) // Se não for aula de quiz, limpa o quiz ativo.
    }
  }, [currentLesson, userProgress]) // Dependências do efeito.

  // handleSelectLesson: Chamada quando o usuário clica em uma aula na sidebar.
  // sectionId: ID da seção da aula clicada.
  // lessonId: ID da aula clicada.
  const handleSelectLesson = (sectionId: string, lessonId: string) => {
    setCurrentSectionId(sectionId) // Define a seção atual.
    setCurrentLessonId(lessonId) // Define a aula atual.
    setQuizResult(null) // Reseta o resultado de qualquer quiz anterior.
  }

  // calculateProgress: Calcula o progresso geral do usuário no curso.
  // Retorna a porcentagem de aulas concluídas.
  const calculateProgress = (): number => {
    if (!course || !course.courseSections || !userProgress || !userProgress.completedLessonIds) return 0
    // Conta o total de aulas no curso.
    const totalLessons = course.courseSections.reduce((sum, section) => sum + section.lessons.length, 0)
    if (totalLessons === 0) return 0
    // Conta o número de aulas concluídas pelo usuário.
    const completedCount = userProgress.completedLessonIds.length
    return Math.round((completedCount / totalLessons) * 100)
  }

  // markLessonComplete: Marca uma aula como concluída pelo usuário.
  // lessonIdToMark: ID da aula a ser marcada como concluída.
  const markLessonComplete = (lessonIdToMark: string) => {
    // Se não houver progresso ou a aula já estiver completa, não faz nada.
    if (!userProgress || userProgress.completedLessonIds?.includes(lessonIdToMark)) return

    // Cria um novo objeto de progresso com a aula adicionada à lista de concluídas.
    const updatedProgressData = {
      ...userProgress,
      completedLessonIds: [...(userProgress.completedLessonIds || []), lessonIdToMark],
    }

    // Recalcula o progresso geral.
    // (Nota: a função calculateProgress usa o estado userProgress, então para obter o valor
    // mais atualizado após esta mudança, precisaríamos passar updatedProgressData para ela,
    // ou chamar setUserProgress e depois recalcular num useEffect. Para simplificar a simulação,
    // vamos atualizar o estado e o progresso percentual virá na próxima renderização ou cálculo.)

    // Simula a atualização do progresso no "banco de dados" (mockUserCourses).
    const userCourseIndex = mockUserCourses.findIndex(uc => uc.id === updatedProgressData.id);
    if (userCourseIndex !== -1) {
        mockUserCourses[userCourseIndex] = {
            ...mockUserCourses[userCourseIndex],
            completedLessonIds: updatedProgressData.completedLessonIds,
        };
    }

    // Verifica se todas as aulas foram concluídas.
    const totalLessons = course?.courseSections?.reduce((sum, section) => sum + section.lessons.length, 0) || 0
    const allLessonsDone = (updatedProgressData.completedLessonIds?.length || 0) === totalLessons

    // Verifica se o quiz final (se houver) foi aprovado.
    let finalQuizPassed = true // Assume true se não houver quiz final.
    if (course?.finalQuizId) {
      const finalQuizAttempt = updatedProgressData.quizAttempts?.find((qa) => qa.quizId === course.finalQuizId)
      finalQuizPassed = finalQuizAttempt?.passed || false
    }

    // Se todas as aulas estiverem concluídas e o quiz final aprovado, marca o curso como completo.
    if (allLessonsDone && finalQuizPassed) {
      updatedProgressData.isCompleted = true
      updatedProgressData.progress = 100 // Garante que o progresso seja 100%.
      // Simula a geração de certificado.
      alert("Parabéns! Curso concluído e certificado gerado (simulação).")
      // Em um app real, aqui você atualizaria o backend e talvez o estado global.
      // Atualiza o mock de certificados para refletir a conclusão.
      const existingCert = mockUserCertificates.find(cert => cert.userCourseId === updatedProgressData.id);
      if (!existingCert && course) {
        mockUserCertificates.push({
          id: `cert-${Date.now()}`,
          userCourseId: updatedProgressData.id,
          courseName: course.name,
          issueDate: new Date().toLocaleDateString('pt-BR'),
          downloadUrl: "#" // Placeholder
        });
      }
      if (userCourseIndex !== -1) {
        mockUserCourses[userCourseIndex].isCompleted = true;
        mockUserCourses[userCourseIndex].progress = 100;
        mockUserCourses[userCourseIndex].certificateAvailable = true;
      }
    }
    // Atualiza o estado do progresso do usuário no componente.
    // O progresso percentual será recalculado na próxima renderização.
    setUserProgress(updatedProgressData)
  }

  // handleQuizSubmit: Chamada quando o usuário envia as respostas de um quiz.
  const handleQuizSubmit = () => {
    if (!activeQuiz || !userProgress) return // Se não houver quiz ativo ou progresso, não faz nada.

    let score = 0 // Pontuação inicial.
    const feedback: Record<string, boolean | undefined> = {} // Feedback por questão.
    const explanations: Record<string, string | undefined> = {} // Explicações por questão.

    // Itera sobre cada questão do quiz para verificar as respostas.
    activeQuiz.questions.forEach((q) => {
      const isCorrect = quizAnswers[q.id] === q.correctOptionId // Verifica se a resposta está correta.
      if (isCorrect) score++ // Incrementa a pontuação se correta.
      feedback[q.id] = isCorrect // Armazena o feedback (true se correta, false se incorreta).
      explanations[q.id] = q.explanation // Armazena a explicação da questão.
    })

    // Calcula a pontuação percentual.
    const percentageScore = Math.round((score / activeQuiz.questions.length) * 100)
    // Verifica se o usuário foi aprovado.
    const passed = percentageScore >= activeQuiz.passingScore

    // Define o resultado do quiz no estado para exibição.
    setQuizResult({ score: percentageScore, passed, feedback, explanations })

    // Atualiza os dados de tentativas do quiz no progresso do usuário.
    // Filtra a tentativa anterior deste quiz (se houver) para substituí-la.
    const updatedAttemptsArray = (userProgress.quizAttempts || []).filter((qa) => qa.quizId !== activeQuiz.id)
    // Encontra os dados da tentativa atual (antes desta submissão).
    const currentAttemptData = userProgress.quizAttempts?.find((qa) => qa.quizId === activeQuiz.id)
    // Incrementa o número de tentativas feitas.
    const newAttemptsMadeCount = (currentAttemptData?.attemptsMade || 0) + 1

    // Adiciona os dados da nova tentativa.
    updatedAttemptsArray.push({
      quizId: activeQuiz.id,
      attemptsMade: newAttemptsMadeCount,
      bestScore: Math.max(percentageScore, currentAttemptData?.bestScore || 0), // Mantém a melhor pontuação.
      passed: passed || currentAttemptData?.passed || false, // Se já passou antes, mantém como passado.
    })

    // Cria um novo objeto de progresso do usuário com as tentativas atualizadas.
    const updatedUserProgressData = { ...userProgress, quizAttempts: updatedAttemptsArray }
    // Atualiza o estado do número de tentativas feitas para o quiz atual.
    setQuizAttemptsMade(newAttemptsMadeCount)

    // Se o usuário foi aprovado no quiz:
    if (passed) {
      markLessonComplete(currentLessonId!) // Marca a "aula" do quiz como concluída.
      // Se este for o quiz final do curso:
      if (activeQuiz.id === course?.finalQuizId) {
        // Verifica novamente se todas as aulas do curso foram concluídas.
        const totalLessons = course?.courseSections?.reduce((sum, section) => sum + section.lessons.length, 0) || 0
        const allLessonsDone = (updatedUserProgressData.completedLessonIds?.length || 0) === totalLessons
        if (allLessonsDone) {
          // Se sim, marca o curso como completo.
          updatedUserProgressData.isCompleted = true
          updatedUserProgressData.progress = 100
          alert("Parabéns! Curso concluído e certificado gerado (simulação).")
          // Atualiza o mock de certificados para refletir a conclusão.
          const existingCert = mockUserCertificates.find(cert => cert.userCourseId === updatedUserProgressData.id);
          if (!existingCert && course) {
            mockUserCertificates.push({
              id: `cert-${Date.now()}`,
              userCourseId: updatedUserProgressData.id,
              courseName: course.name,
              issueDate: new Date().toLocaleDateString('pt-BR'),
              downloadUrl: "#" // Placeholder
            });
          }
          const userCourseIndex = mockUserCourses.findIndex(uc => uc.id === updatedUserProgressData.id);
          if (userCourseIndex !== -1) {
            mockUserCourses[userCourseIndex].isCompleted = true;
            mockUserCourses[userCourseIndex].progress = 100;
            mockUserCourses[userCourseIndex].certificateAvailable = true;
          }
        }
      }
    }
    // Atualiza o estado do progresso do usuário.
    setUserProgress(updatedUserProgressData)

    // Simula a atualização do progresso no "banco de dados" (mockUserCourses).
    const userCourseIndex = mockUserCourses.findIndex(uc => uc.id === updatedUserProgressData.id);
    if (userCourseIndex !== -1) {
        mockUserCourses[userCourseIndex] = {
            ...mockUserCourses[userCourseIndex],
            quizAttempts: updatedUserProgressData.quizAttempts,
            // isCompleted e progress já são atualizados dentro da lógica de aprovação
        };
    }
  }

  // handleAnswerChange: Chamada quando o usuário seleciona uma opção de resposta no quiz.
  // questionId: ID da questão.
  // optionId: ID da opção selecionada.
  const handleAnswerChange = (questionId: string, optionId: string) => {
    // Atualiza o estado das respostas do quiz.
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  // getNextLesson: Determina qual é a próxima aula no curso.
  // Retorna um objeto { sectionId, lessonId } ou null se for a última aula.
  const getNextLesson = (): { sectionId: string; lessonId: string } | null => {
    if (!course || !currentSectionId || !currentLessonId || !course.courseSections) return null
    const currentSectionIndex = course.courseSections.findIndex((s) => s.id === currentSectionId)
    if (currentSectionIndex === -1) return null

    const currentSection = course.courseSections[currentSectionIndex]
    const currentLessonIndexInSection = currentSection.lessons.findIndex((l) => l.id === currentLessonId)

    // Se houver próxima aula na seção atual:
    if (currentLessonIndexInSection < currentSection.lessons.length - 1) {
      return { sectionId: currentSectionId, lessonId: currentSection.lessons[currentLessonIndexInSection + 1].id }
    }
    // Se for a última aula da seção atual, mas houver próximas seções:
    else if (currentSectionIndex < course.courseSections.length - 1) {
      const nextSection = course.courseSections[currentSectionIndex + 1]
      // Garante que a próxima seção tenha aulas.
      if (nextSection.lessons && nextSection.lessons.length > 0) {
        return { sectionId: nextSection.id, lessonId: nextSection.lessons[0].id }
      }
    }
    return null // É a última aula do curso.
  }

  // getPreviousLesson: Determina qual é a aula anterior no curso.
  // Retorna um objeto { sectionId, lessonId } ou null se for a primeira aula.
  const getPreviousLesson = (): { sectionId: string; lessonId: string } | null => {
    if (!course || !currentSectionId || !currentLessonId || !course.courseSections) return null
    const currentSectionIndex = course.courseSections.findIndex((s) => s.id === currentSectionId)
    if (currentSectionIndex === -1) return null

    const currentSection = course.courseSections[currentSectionIndex]
    const currentLessonIndexInSection = currentSection.lessons.findIndex((l) => l.id === currentLessonId)

    // Se houver aula anterior na seção atual:
    if (currentLessonIndexInSection > 0) {
      return { sectionId: currentSectionId, lessonId: currentSection.lessons[currentLessonIndexInSection - 1].id }
    }
    // Se for a primeira aula da seção atual, mas houver seções anteriores:
    else if (currentSectionIndex > 0) {
      const prevSection = course.courseSections[currentSectionIndex - 1]
      // Garante que a seção anterior tenha aulas.
      if (prevSection.lessons && prevSection.lessons.length > 0) {
        return { sectionId: prevSection.id, lessonId: prevSection.lessons[prevSection.lessons.length - 1].id }
      }
    }
    return null // É a primeira aula do curso.
  }

  // navigateLesson: Navega para a próxima ou anterior aula.
  // direction: "next" ou "prev".
  const navigateLesson = (direction: "next" | "prev") => {
    const targetLesson = direction === "next" ? getNextLesson() : getPreviousLesson()
    if (targetLesson) {
      // Se for para a próxima aula e a aula atual não for um quiz, marca a aula atual como concluída.
      if (direction === "next" && currentLessonId && currentLesson?.type !== 'quiz') {
        markLessonComplete(currentLessonId)
      }
      // Seleciona a nova aula.
      handleSelectLesson(targetLesson.sectionId, targetLesson.lessonId)
    } else if (direction === "next" && currentLessonId && currentLesson?.type !== 'quiz') {
        // Se for a última aula e não for quiz, marca como concluída ao tentar avançar.
        markLessonComplete(currentLessonId);
    }
  }

  // --- Renderização Condicional ---
  // Se o curso ou o progresso do usuário ainda não foram carregados, exibe uma mensagem de carregamento.
  if (!course || !userProgress) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4">Carregando dados do curso...</main>
        <Footer />
      </div>
    )
  }

  // Calcula o progresso geral para exibição.
  const overallProgress = calculateProgress()

  // --- JSX da Página ---
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      {/* Barra de Navegação Principal */}
      <Navbar />

      {/* Cabeçalho Específico da Página de Aprendizado */}
      <header className="sticky top-16 z-40 bg-slate-800 text-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Link para voltar para "Meus Cursos" */}
          <Link href="/meus-cursos" className="flex items-center text-sm hover:text-teal-300 transition-colors">
            <ChevronLeft className="h-5 w-5 mr-1" /> Voltar para Meus Cursos
          </Link>
          {/* Título do Curso (visível em telas maiores) */}
          <h1 className="text-lg font-semibold truncate hidden md:block">{course.name}</h1>
          {/* Barra de Progresso do Curso */}
          <div className="w-32 md:w-48">
            <div className="flex items-center text-xs mb-0.5 justify-between">
              <span>Progresso:</span>
              <span className="font-medium">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2 bg-slate-600 [&>div]:bg-teal-400" />
          </div>
        </div>
      </header>

      {/* Conteúdo Principal da Página (Layout Flexível: Sidebar + Área de Conteúdo) */}
      <main className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar de Conteúdo do Curso (Navegação entre Aulas) */}
        <aside className="w-full md:w-80 lg:w-96 bg-white border-r border-slate-200 p-4 md:p-6 overflow-y-auto md:h-[calc(100vh-8rem)] md:sticky md:top-32">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Conteúdo do Curso</h2>
          {/* Acordeão para listar seções e aulas */}
          <Accordion type="multiple" defaultValue={course.courseSections?.map((s) => s.id)} className="w-full">
            {course.courseSections?.map((section) => (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger className="text-md font-medium hover:no-underline text-neutral-700 text-left">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1 pl-1">
                    {section.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <button
                          onClick={() => handleSelectLesson(section.id, lesson.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-md text-sm flex items-center gap-2.5 transition-colors
                            ${currentLessonId === lesson.id ? "bg-teal-100 text-teal-700 font-medium" : "hover:bg-slate-100 text-neutral-600"}`}
                        >
                          {/* Ícone de Concluído ou Ícone da Aula */}
                          {userProgress.completedLessonIds?.includes(lesson.id) ? (
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          ) : (
                            // Renderiza o ícone específico da aula (ex: PlaySquare, FileTextIcon)
                            <FileTextIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          )}
                          <span className="flex-grow truncate">{lesson.title}</span>
                          {/* Duração da aula (se houver) */}
                          {lesson.duration && <span className="text-xs text-muted-foreground ml-auto">{lesson.duration}</span>}
                        </button>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </aside>

        {/* Área de Conteúdo da Aula (Vídeo, Texto, Quiz) */}
        <section className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto">
          {currentLesson ? (
            // Card para envolver o conteúdo da aula
            <Card className="shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl text-neutral-800">{currentLesson.title}</CardTitle>
                {/* Descrição (duração do vídeo) se aplicável */}
                {currentLesson.type === "video" && currentLesson.duration && (
                  <CardDescription>Duração do vídeo: {currentLesson.duration}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Conteúdo do Vídeo */}
                {currentLesson.type === "video" && (
                  <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center text-white relative">
                    <Video className="h-16 w-16 opacity-50" />
                    <p className="absolute text-sm">Player de Vídeo (Placeholder)</p>
                    {/* Em um app real, aqui iria o componente do player de vídeo:
                        <ReactPlayer url={currentLesson.videoUrl} width="100%" height="100%" controls /> */}
                  </div>
                )}
                {/* Conteúdo Textual */}
                {currentLesson.type === "text" && (
                  <div className="prose prose-sm sm:prose-base max-w-none text-neutral-700 leading-relaxed">
                    <p>{currentLesson.textContent || "Conteúdo textual da aula indisponível."}</p>
                  </div>
                )}
                {/* Conteúdo do Quiz */}
                {currentLesson.type === "quiz" && activeQuiz && (
                  <div className="space-y-6">
                    {/* Se o resultado do quiz ainda não foi mostrado */}
                    {!quizResult ? (
                      <>
                        {/* Alerta se o limite de tentativas foi atingido */}
                        {quizAttemptsMade >= activeQuiz.maxAttempts && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Limite de Tentativas Atingido</AlertTitle>
                            <AlertDescription>
                              Você atingiu o número máximo de {activeQuiz.maxAttempts} tentativas para este quiz.
                            </AlertDescription>
                          </Alert>
                        )}
                        <p className="text-sm text-muted-foreground">
                          Tentativa {Math.min(quizAttemptsMade + 1, activeQuiz.maxAttempts)} de {activeQuiz.maxAttempts}.
                        </p>
                        {/* Formulário do Quiz (RadioGroup) */}
                        <div className="space-y-4">
                          {activeQuiz.questions.map((q, qIndex) => (
                            <div key={q.id} className="p-4 border rounded-md bg-slate-50">
                              <p className="font-medium mb-3 text-neutral-700">
                                {qIndex + 1}. {q.text}
                              </p>
                              <RadioGroup
                                onValueChange={(value) => handleAnswerChange(q.id, value)}
                                value={quizAnswers[q.id] || ""} // Garante que a opção selecionada seja refletida
                                className="space-y-2"
                              >
                                {q.options.map((opt) => (
                                  <div key={opt.id} className="flex items-center space-x-2">
                                    <RadioGroupItem value={opt.id} id={`${q.id}-${opt.id}`} />
                                    <Label htmlFor={`${q.id}-${opt.id}`} className="font-normal text-neutral-600">
                                      {opt.text}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>
                          ))}
                        </div>
                        {/* Botão para Enviar Respostas (desabilitado se limite de tentativas atingido) */}
                        <Button
                          onClick={handleQuizSubmit}
                          disabled={quizAttemptsMade >= activeQuiz.maxAttempts}
                          className="bg-teal-600 hover:bg-teal-700"
                        >
                          Enviar Respostas
                        </Button>
                      </>
                    ) : (
                      // Se o resultado do quiz já foi mostrado
                      <div className="space-y-4">
                        <Alert
                          variant={quizResult.passed ? "default" : "destructive"}
                          className={quizResult.passed ? "bg-green-50 border-green-300 text-green-800" : "bg-red-50 border-red-300 text-red-800"}
                        >
                          {quizResult.passed ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                          <AlertTitle className="font-semibold">
                            Resultado do Quiz: {quizResult.score}% - {quizResult.passed ? "Aprovado!" : "Não Aprovado"}
                          </AlertTitle>
                        </Alert>
                        {/* Exibe o feedback para cada questão */}
                        {activeQuiz.questions.map((q) => (
                          <div key={q.id} className="p-4 border rounded-md bg-slate-50">
                            <p className="font-medium mb-3 text-neutral-700">
                              {q.text}
                            </p>
                            <p className="text-sm text-neutral-600">
                              Resposta: {quizAnswers[q.id] ? q.options.find(opt => opt.id === quizAnswers[q.id])?.text : "Não respondido"}
                            </p>
                            <p className="text-sm text-neutral-600">
                              {quizResult.feedback[q.id] === true ? "Correto!" : quizResult.feedback[q.id] === false ? "Incorreto!" : "Não respondido"}
                            </p>
                            {quizResult.explanations[q.id] && (
                              <p className="text-sm text-neutral-600">
                                Explicação: {quizResult.explanations[q.id]}
                              </p>
                            )}
                          </div>
                        ))}
                        {/* Botão para Tentar Novamente */}
                        <Button
                          onClick={() => setQuizResult(null)}
                          className="bg-teal-600 hover:bg-teal-700"
                        >
                          Tentar Novamente
                        </Button>
                      </div>
                    )}
                )}
              </CardContent>
            </Card>
          ) : (
            // Se não houver aula atual selecionada
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-neutral-600">Selecione uma aula na sidebar.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )\
}
