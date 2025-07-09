// Nova Página de Curso - Interface estilo Udemy
// Esta página oferece uma experiência de aprendizado completa com:
// - Área principal de conteúdo (esquerda)
// - Sidebar de módulos e aulas (direita, recolhível)
// - Navegação entre aulas e acompanhamento de progresso
"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  courses,
  mockUserCourses,
  mockQuizzes,
  type Course,
  type Quiz,
  type UserCourse,
  type Lesson,
  type CourseSection,
} from "@/lib/data"
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
  Menu,
  CheckCircle,
  XCircle,
  AlertCircle,
  Video,
  FileText,
  FileQuestion,
  Download,
  Clock,
  PlayCircle,
  BookOpen,
} from "lucide-react"

// Importar a função de confete
import { triggerConfetti } from "@/lib/utils"

// --- Funções Auxiliares ---

// getCourseDetails: Busca os detalhes de um curso pelo ID
const getCourseDetails = (courseId: string): Course | undefined => {
  return courses.find((c) => c.id === courseId)
}

// getUserCourseProgress: Busca o progresso do usuário em um curso
const getUserCourseProgress = (courseId: string): UserCourse | undefined => {
  return mockUserCourses.find((uc) => uc.courseId === courseId)
}

// getQuizDetails: Busca os detalhes de um quiz pelo ID
const getQuizDetails = (quizId: string): Quiz | undefined => {
  return mockQuizzes.find((q) => q.id === quizId)
}

// --- Componente Principal ---
export default function CursoPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string

  // --- Estados Principais ---
  const [course, setCourse] = useState<Course | null>(null)
  const [userProgress, setUserProgress] = useState<UserCourse | null>(null)
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null)
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null)

  // --- Estados da Sidebar ---
  const [sidebarVisible, setSidebarVisible] = useState(false) // Começa fechada no mobile
  const [expandedSections, setExpandedSections] = useState<string[]>([]) // Seções expandidas no acordeão

  // --- Estados do Quiz ---
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [quizResult, setQuizResult] = useState<{
    score: number
    passed: boolean
    feedback: Record<string, boolean | undefined>
    explanations: Record<string, string | undefined>
  } | null>(null)
  const [quizAttemptsMade, setQuizAttemptsMade] = useState(0)

  // --- Estados Mobile ---
  const [isMobile, setIsMobile] = useState(false)

  // --- Efeito de Inicialização ---
  // Carrega os dados do curso e progresso do usuário quando a página é montada
  useEffect(() => {
    const courseData = getCourseDetails(courseId)
    const userProgressData = getUserCourseProgress(courseId)

    if (courseData) {
      setCourse(courseData)
      // Define todas as seções como expandidas por padrão
      if (courseData.courseSections) {
        setExpandedSections(courseData.courseSections.map((s) => s.id))
        // Seleciona a primeira aula do primeiro módulo
        const firstSection = courseData.courseSections[0]
        if (firstSection && firstSection.lessons.length > 0) {
          setCurrentSectionId(firstSection.id)
          setCurrentLessonId(firstSection.lessons[0].id)
        }
      }
    }

    if (userProgressData) {
      setUserProgress(userProgressData)
    } else if (courseData) {
      // Inicializa progresso básico se não existir
      setUserProgress({
        id: `uc-${courseId}`,
        courseId: courseId,
        name: courseData.name,
        progress: 0,
        imageUrl: courseData.imageUrl,
        completedLessonIds: [],
        quizAttempts: [],
        isCompleted: false,
        certificateAvailable: false,
      })
    }
  }, [courseId])

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // No desktop, sidebar começa aberta
      if (!mobile) {
        setSidebarVisible(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // --- Aula Atual (Memoizada) ---
  // Calcula qual aula está atualmente selecionada
  const currentLesson: Lesson | null = useMemo(() => {
    if (!course || !currentSectionId || !currentLessonId) return null
    const section = course.courseSections?.find((s) => s.id === currentSectionId)
    return section?.lessons.find((l) => l.id === currentLessonId) || null
  }, [course, currentSectionId, currentLessonId])

  // --- Efeito para Carregar Quiz ---
  // Quando a aula atual muda e é um quiz, carrega os dados do quiz
  useEffect(() => {
    if (currentLesson?.type === "quiz" && currentLesson.quizId) {
      const quizData = getQuizDetails(currentLesson.quizId)
      setActiveQuiz(quizData || null)
      setQuizResult(null)
      setQuizAnswers({})
      // Atualiza tentativas do quiz
      const attemptData = userProgress?.quizAttempts?.find((qa) => qa.quizId === currentLesson.quizId)
      setQuizAttemptsMade(attemptData?.attemptsMade || 0)
    } else {
      setActiveQuiz(null)
    }
  }, [currentLesson, userProgress])

  // --- Funções de Navegação ---

  // handleSelectLesson: Seleciona uma aula específica
  const handleSelectLesson = (sectionId: string, lessonId: string) => {
    setCurrentSectionId(sectionId)
    setCurrentLessonId(lessonId)
    setQuizResult(null)
    // Fecha a sidebar no mobile após selecionar
    if (isMobile) {
      setSidebarVisible(false)
    }
  }

  // toggleSectionExpansion: Expande/colapsa uma seção na sidebar
  const toggleSectionExpansion = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  // toggleSidebar: Alterna a visibilidade da sidebar
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }

  // --- Funções de Progresso ---

  // calculateProgress: Calcula o progresso geral do curso
  const calculateProgress = (): number => {
    if (!course || !course.courseSections || !userProgress || !userProgress.completedLessonIds) return 0
    const totalLessons = course.courseSections.reduce((sum, section) => sum + section.lessons.length, 0)
    if (totalLessons === 0) return 0
    const completedCount = userProgress.completedLessonIds.length
    return Math.round((completedCount / totalLessons) * 100)
  }

  // calculateSectionProgress: Calcula o progresso de uma seção específica
  const calculateSectionProgress = (section: CourseSection): { completed: number; total: number; duration: string } => {
    const total = section.lessons.length
    const completed = section.lessons.filter((lesson) => userProgress?.completedLessonIds?.includes(lesson.id)).length

    // Calcula duração total da seção (soma das durações das aulas)
    const totalMinutes = section.lessons.reduce((sum, lesson) => {
      if (lesson.duration) {
        const match = lesson.duration.match(/(\d+)\s*min/)
        return sum + (match ? Number.parseInt(match[1]) : 0)
      }
      return sum
    }, 0)

    const duration = totalMinutes > 60 ? `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m` : `${totalMinutes}m`

    return { completed, total, duration }
  }

  // markLessonComplete: Marca uma aula como concluída
  const markLessonComplete = (lessonIdToMark: string) => {
    if (!userProgress || userProgress.completedLessonIds?.includes(lessonIdToMark)) return

    const updatedProgressData = {
      ...userProgress,
      completedLessonIds: [...(userProgress.completedLessonIds || []), lessonIdToMark],
    }

    // Verifica conclusão do curso
    const totalLessons = course?.courseSections?.reduce((sum, section) => sum + section.lessons.length, 0) || 0
    const allLessonsDone = updatedProgressData.completedLessonIds.length === totalLessons

    let finalQuizPassed = true
    if (course?.finalQuizId) {
      const finalQuizAttempt = updatedProgressData.quizAttempts?.find((qa) => qa.quizId === course.finalQuizId)
      finalQuizPassed = finalQuizAttempt?.passed || false
    }

    if (allLessonsDone && finalQuizPassed) {
      updatedProgressData.isCompleted = true
      updatedProgressData.progress = 100
      alert("Parabéns! Curso concluído e certificado gerado!")
    }

    setUserProgress(updatedProgressData)
  }

  // toggleLessonCompletion: Alterna o status de conclusão de uma aula (via checkbox)
  const toggleLessonCompletion = (lessonId: string) => {
    if (!userProgress) return

    const isCompleted = userProgress.completedLessonIds?.includes(lessonId)
    let updatedCompletedIds: string[]

    if (isCompleted) {
      // Remove da lista de concluídas
      updatedCompletedIds = userProgress.completedLessonIds?.filter((id) => id !== lessonId) || []
    } else {
      // Adiciona à lista de concluídas
      updatedCompletedIds = [...(userProgress.completedLessonIds || []), lessonId]
    }

    const updatedProgressData = {
      ...userProgress,
      completedLessonIds: updatedCompletedIds,
    }

    setUserProgress(updatedProgressData)
  }

  // --- Funções do Quiz ---

  // handleQuizSubmit: Processa a submissão de um quiz
  const handleQuizSubmit = () => {
    if (!activeQuiz || !userProgress) return

    let score = 0
    const feedback: Record<string, boolean | undefined> = {}
    const explanations: Record<string, string | undefined> = {}

    // Avalia cada questão
    activeQuiz.questions.forEach((q) => {
      const isCorrect = quizAnswers[q.id] === q.correctOptionId
      if (isCorrect) score++
      feedback[q.id] = isCorrect
      explanations[q.id] = q.explanation
    })

    const percentageScore = Math.round((score / activeQuiz.questions.length) * 100)
    const passed = percentageScore >= activeQuiz.passingScore

    setQuizResult({ score: percentageScore, passed, feedback, explanations })

    // Adicionar confete se passou no quiz
    if (passed) {
      triggerConfetti(150, 90, 0.6)
    }

    // Atualiza tentativas do quiz
    const updatedAttempts = (userProgress.quizAttempts || []).filter((qa) => qa.quizId !== activeQuiz.id)
    const currentAttemptData = userProgress.quizAttempts?.find((qa) => qa.quizId === activeQuiz.id)
    const newAttemptsMade = (currentAttemptData?.attemptsMade || 0) + 1

    updatedAttempts.push({
      quizId: activeQuiz.id,
      attemptsMade: newAttemptsMade,
      bestScore: Math.max(percentageScore, currentAttemptData?.bestScore || 0),
      passed: passed || currentAttemptData?.passed || false,
    })

    const updatedUserProgress = { ...userProgress, quizAttempts: updatedAttempts }
    setQuizAttemptsMade(newAttemptsMade)

    if (passed) {
      markLessonComplete(currentLessonId!)
    }

    setUserProgress(updatedUserProgress)
  }

  // handleAnswerChange: Atualiza a resposta selecionada em uma questão
  const handleAnswerChange = (questionId: string, optionId: string) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  // --- Funções de Navegação entre Aulas ---

  // getNextLesson: Encontra a próxima aula no curso
  const getNextLesson = (): { sectionId: string; lessonId: string } | null => {
    if (!course || !currentSectionId || !currentLessonId || !course.courseSections) return null

    const currentSectionIndex = course.courseSections.findIndex((s) => s.id === currentSectionId)
    if (currentSectionIndex === -1) return null

    const currentSection = course.courseSections[currentSectionIndex]
    const currentLessonIndex = currentSection.lessons.findIndex((l) => l.id === currentLessonId)

    // Próxima aula na mesma seção
    if (currentLessonIndex < currentSection.lessons.length - 1) {
      return { sectionId: currentSectionId, lessonId: currentSection.lessons[currentLessonIndex + 1].id }
    }
    // Primeira aula da próxima seção
    else if (currentSectionIndex < course.courseSections.length - 1) {
      const nextSection = course.courseSections[currentSectionIndex + 1]
      if (nextSection.lessons && nextSection.lessons.length > 0) {
        return { sectionId: nextSection.id, lessonId: nextSection.lessons[0].id }
      }
    }
    return null
  }

  // getPreviousLesson: Encontra a aula anterior no curso
  const getPreviousLesson = (): { sectionId: string; lessonId: string } | null => {
    if (!course || !currentSectionId || !currentLessonId || !course.courseSections) return null

    const currentSectionIndex = course.courseSections.findIndex((s) => s.id === currentSectionId)
    if (currentSectionIndex === -1) return null

    const currentSection = course.courseSections[currentSectionIndex]
    const currentLessonIndex = currentSection.lessons.findIndex((l) => l.id === currentLessonId)

    // Aula anterior na mesma seção
    if (currentLessonIndex > 0) {
      return { sectionId: currentSectionId, lessonId: currentSection.lessons[currentLessonIndex - 1].id }
    }
    // Última aula da seção anterior
    else if (currentSectionIndex > 0) {
      const prevSection = course.courseSections[currentSectionIndex - 1]
      if (prevSection.lessons && prevSection.lessons.length > 0) {
        return { sectionId: prevSection.id, lessonId: prevSection.lessons[prevSection.lessons.length - 1].id }
      }
    }
    return null
  }

  // navigateLesson: Navega para a próxima ou anterior aula
  const navigateLesson = (direction: "next" | "prev") => {
    const targetLesson = direction === "next" ? getNextLesson() : getPreviousLesson()
    if (targetLesson) {
      if (direction === "next" && currentLessonId && currentLesson?.type !== "quiz") {
        markLessonComplete(currentLessonId)
      }
      handleSelectLesson(targetLesson.sectionId, targetLesson.lessonId)
    } else if (direction === "next" && currentLessonId && currentLesson?.type !== "quiz") {
      markLessonComplete(currentLessonId)
    }
  }

  // --- Função para obter ícone da aula ---
  const getLessonIcon = (lesson: Lesson) => {
    switch (lesson.type) {
      case "video":
        return <PlayCircle className="h-4 w-4" />
      case "text":
        return <FileText className="h-4 w-4" />
      case "quiz":
        return <FileQuestion className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  // --- Renderização Condicional ---
  if (!course || !userProgress) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-neutral-600">Carregando curso...</p>
          </div>
        </div>
      </div>
    )
  }

  const overallProgress = calculateProgress()

  // --- JSX da Página ---
  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header do Curso - Mobile Optimized */}
      <header className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Link
            href="/meus-cursos"
            className="flex items-center text-sm hover:text-teal-300 transition-colors flex-shrink-0"
          >
            <ChevronLeft className={`${isMobile ? "h-6 w-6" : "h-5 w-5"} mr-1`} />
            {!isMobile && "Voltar"}
          </Link>
          <div className="flex-1 min-w-0">
            {isMobile ? (
              <div className="overflow-hidden">
                <h1 className="text-lg font-semibold whitespace-nowrap animate-marquee">{course.name}</h1>
              </div>
            ) : (
              <h1 className="text-lg font-semibold truncate">{course.name}</h1>
            )}
          </div>
        </div>
        {!isMobile && (
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-slate-300">Progresso: </span>
              <span className="font-medium">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="w-32 h-2 bg-slate-700 [&>div]:bg-teal-400" />
          </div>
        )}
      </header>

      {/* Layout Principal - Mobile Optimized */}
      <div className="flex flex-1 overflow-hidden">
        {/* Área Principal de Conteúdo */}
        <main
          className={`flex-1 overflow-y-auto transition-all duration-300 ${
            isMobile ? "w-full" : sidebarVisible ? "mr-80" : "mr-0"
          }`}
        >
          <div className={`${isMobile ? "p-4" : "p-6"} max-w-4xl mx-auto`}>
            {currentLesson ? (
              <div className="space-y-6">
                {/* Cabeçalho da Aula */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="text-teal-600 flex-shrink-0">{getLessonIcon(currentLesson)}</div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-neutral-800 mb-2">{currentLesson.title}</h2>
                      {currentLesson.duration && (
                        <div className="flex items-center text-sm text-neutral-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {currentLesson.duration}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Conteúdo da Aula */}
                <div className="bg-white rounded-lg shadow-sm border">
                  {/* Conteúdo de Vídeo */}
                  {currentLesson.type === "video" && (
                    <div className="p-6">
                      <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center text-white relative mb-4">
                        <Video className="h-16 w-16 opacity-50" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-sm opacity-75">Player de Vídeo</p>
                            <p className="text-xs opacity-50">(Placeholder)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Conteúdo de Texto */}
                  {currentLesson.type === "text" && (
                    <div className="p-6">
                      <div className="prose prose-neutral max-w-none">
                        <p className="text-neutral-700 leading-relaxed">
                          {currentLesson.textContent || "Conteúdo textual da aula será exibido aqui."}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Conteúdo de Quiz */}
                  {currentLesson.type === "quiz" && activeQuiz && (
                    <div className="p-6">
                      {!quizResult ? (
                        <div className="space-y-6">
                          {/* Alerta de limite de tentativas */}
                          {quizAttemptsMade >= activeQuiz.maxAttempts && (
                            <Alert variant="destructive">
                              <AlertCircle className="h-4 w-4" />
                              <AlertTitle>Limite de Tentativas Atingido</AlertTitle>
                              <AlertDescription>
                                Você atingiu o número máximo de {activeQuiz.maxAttempts} tentativas para este quiz.
                              </AlertDescription>
                            </Alert>
                          )}

                          <div className="text-sm text-neutral-600 mb-4">
                            Tentativa {Math.min(quizAttemptsMade + 1, activeQuiz.maxAttempts)} de{" "}
                            {activeQuiz.maxAttempts}
                          </div>

                          {/* Questões do Quiz com melhor design */}
                          <div className="space-y-6">
                            {activeQuiz.questions.map((question, index) => (
                              <Card key={question.id} className="border-slate-200 shadow-sm">
                                <CardHeader className="pb-4">
                                  <CardTitle className="text-lg font-semibold text-neutral-800">
                                    Pergunta {index + 1}:
                                  </CardTitle>
                                  <CardDescription className="text-base text-neutral-700 leading-relaxed">
                                    {question.text}
                                  </CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <RadioGroup
                                    onValueChange={(value) => handleAnswerChange(question.id, value)}
                                    value={quizAnswers[question.id] || ""}
                                    className="space-y-3"
                                  >
                                    {question.options.map((option) => (
                                      <div key={option.id} className="relative">
                                        <div className="flex items-center space-x-3">
                                          <RadioGroupItem
                                            value={option.id}
                                            id={`${question.id}-${option.id}`}
                                            className="mt-1"
                                          />
                                          <Label
                                            htmlFor={`${question.id}-${option.id}`}
                                            className="text-neutral-700 cursor-pointer flex-1 py-3 px-4 rounded-lg border-2 border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition-all duration-200 block"
                                          >
                                            {option.text}
                                          </Label>
                                        </div>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </CardContent>
                              </Card>
                            ))}
                          </div>

                          {/* Botão de Submissão */}
                          <div className="flex justify-center pt-6">
                            <Button
                              onClick={handleQuizSubmit}
                              disabled={quizAttemptsMade >= activeQuiz.maxAttempts}
                              className="bg-teal-600 hover:bg-teal-700 px-8 py-3 text-lg font-medium"
                            >
                              Conferir resposta
                            </Button>
                          </div>
                        </div>
                      ) : (
                        // Resultado do Quiz com cores melhoradas
                        <div className="space-y-6">
                          <Alert
                            variant={quizResult.passed ? "default" : "destructive"}
                            className={
                              quizResult.passed
                                ? "bg-green-50 border-green-300 text-green-800"
                                : "bg-red-50 border-red-300 text-red-800"
                            }
                          >
                            {quizResult.passed ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                            <AlertTitle className="font-semibold">
                              Resultado: {quizResult.score}% - {quizResult.passed ? "Aprovado!" : "Não Aprovado"}
                            </AlertTitle>
                            <AlertDescription>
                              {quizResult.passed
                                ? "Parabéns! Você foi aprovado neste quiz."
                                : `Você precisava de ${activeQuiz.passingScore}% para ser aprovado.`}
                            </AlertDescription>
                          </Alert>

                          {/* Feedback das Questões com cores claras */}
                          <div className="space-y-4">
                            {activeQuiz.questions.map((question, index) => {
                              const isCorrect = quizResult.feedback[question.id]
                              const userAnswer = quizAnswers[question.id]
                              const correctAnswer = question.options.find((opt) => opt.id === question.correctOptionId)
                              const userAnswerText = question.options.find((opt) => opt.id === userAnswer)?.text

                              return (
                                <Card
                                  key={question.id}
                                  className={`border-2 ${
                                    isCorrect ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"
                                  }`}
                                >
                                  <CardHeader>
                                    <CardTitle className="text-base flex items-center gap-2">
                                      {isCorrect ? (
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                      ) : (
                                        <XCircle className="h-5 w-5 text-red-600" />
                                      )}
                                      <span className={isCorrect ? "text-green-800" : "text-red-800"}>
                                        Pergunta {index + 1} - {isCorrect ? "Correta" : "Incorreta"}
                                      </span>
                                    </CardTitle>
                                    <CardDescription className="text-neutral-700 font-medium">
                                      {question.text}
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className={`p-3 rounded-lg ${isCorrect ? "bg-green-100" : "bg-red-100"}`}>
                                      <p className="text-sm font-medium">
                                        <span className="text-neutral-600">Sua resposta: </span>
                                        <span className={isCorrect ? "text-green-700" : "text-red-700"}>
                                          {userAnswerText || "Não respondida"}
                                        </span>
                                      </p>
                                    </div>
                                    {!isCorrect && (
                                      <div className="p-3 rounded-lg bg-green-100">
                                        <p className="text-sm font-medium">
                                          <span className="text-neutral-600">Resposta correta: </span>
                                          <span className="text-green-700">{correctAnswer?.text}</span>
                                        </p>
                                      </div>
                                    )}
                                    {quizResult.explanations[question.id] && (
                                      <div className="p-3 rounded-lg bg-blue-50 border-l-4 border-blue-400">
                                        <p className="text-sm text-blue-800">
                                          <span className="font-medium">💡 Explicação: </span>
                                          {quizResult.explanations[question.id]}
                                        </p>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              )
                            })}
                          </div>

                          {/* Botão para Tentar Novamente */}
                          {quizAttemptsMade < activeQuiz.maxAttempts && !quizResult.passed && (
                            <div className="flex justify-center pt-4">
                              <Button
                                onClick={() => {
                                  setQuizResult(null)
                                  setQuizAnswers({})
                                }}
                                className="bg-teal-600 hover:bg-teal-700"
                              >
                                Tentar Novamente
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Navegação entre Aulas - Mobile Optimized */}
                <div className="flex justify-between items-center bg-white rounded-lg shadow-sm border p-4">
                  <Button
                    onClick={() => navigateLesson("prev")}
                    disabled={!getPreviousLesson()}
                    variant="outline"
                    className={`flex items-center gap-2 ${isMobile ? "px-3" : ""}`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {!isMobile && "Anterior"}
                  </Button>

                  <div className="text-sm text-neutral-500">
                    {currentLesson.type !== "quiz" && !userProgress.completedLessonIds?.includes(currentLessonId!) && (
                      <Button
                        onClick={() => markLessonComplete(currentLessonId!)}
                        variant="outline"
                        size="sm"
                        className="text-teal-600 border-teal-600 hover:bg-teal-50"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {isMobile ? "Concluir" : "Marcar como Concluída"}
                      </Button>
                    )}
                  </div>

                  <Button
                    onClick={() => navigateLesson("next")}
                    disabled={!getNextLesson()}
                    className={`flex items-center gap-2 bg-teal-600 hover:bg-teal-700 ${isMobile ? "px-3" : ""}`}
                  >
                    {!isMobile && "Próxima"}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <p className="text-neutral-500">Selecione uma aula para começar</p>
              </div>
            )}
          </div>
        </main>

        {/* Sidebar de Conteúdo do Curso - Mobile Optimized */}
        <aside
          className={`fixed ${isMobile ? "inset-0" : "right-0 top-0 h-full"} bg-white border-l border-slate-200 shadow-lg transition-transform duration-300 z-40 select-none ${
            sidebarVisible ? "translate-x-0" : "translate-x-full"
          } ${isMobile ? "w-full" : ""}`}
          style={isMobile ? {} : { width: "320px", userSelect: "none" }}
        >
          {/* Header da Sidebar - Mobile Optimized */}
          <div className="flex items-center justify-between p-4 border-b bg-slate-50">
            <h3 className="font-semibold text-neutral-800">Conteúdo do curso</h3>
            <Button
              onClick={() => setSidebarVisible(false)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-slate-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Lista de Seções e Aulas - Mobile Optimized */}
          <div className={`overflow-y-auto h-full ${isMobile ? "pb-4" : "pb-20"}`}>
            {course.courseSections?.map((section) => {
              const sectionProgress = calculateSectionProgress(section)
              const isExpanded = expandedSections.includes(section.id)

              return (
                <div key={section.id} className="border-b border-slate-100">
                  <Collapsible open={isExpanded} onOpenChange={() => toggleSectionExpansion(section.id)}>
                    <CollapsibleTrigger className="w-full p-4 text-left hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-neutral-800 text-sm mb-1">{section.title}</h4>
                          <p className="text-xs text-neutral-500">
                            {sectionProgress.completed}/{sectionProgress.total} | {sectionProgress.duration}
                          </p>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-neutral-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-neutral-500" />
                        )}
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="pb-2">
                        {section.lessons.map((lesson) => {
                          const isCompleted = userProgress.completedLessonIds?.includes(lesson.id)
                          const isActive = currentLessonId === lesson.id

                          return (
                            <div
                              key={lesson.id}
                              className={`flex items-center gap-3 p-3 mx-2 rounded cursor-pointer transition-colors ${
                                isActive ? "bg-teal-100 border-l-4 border-teal-500" : "hover:bg-slate-50"
                              }`}
                              onClick={() => handleSelectLesson(section.id, lesson.id)}
                            >
                              <Checkbox
                                checked={isCompleted}
                                onCheckedChange={() => toggleLessonCompletion(lesson.id)}
                                onClick={(e) => e.stopPropagation()}
                                className="data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                              />
                              <div className="text-teal-600">{getLessonIcon(lesson)}</div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-neutral-800 truncate">{lesson.title}</p>
                                {lesson.duration && <p className="text-xs text-neutral-500">{lesson.duration}</p>}
                              </div>
                              {/* Botão de Recursos (placeholder) */}
                              {lesson.hasResources && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs px-2 py-1 h-6 bg-transparent"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    // Implementar funcionalidade de recursos
                                  }}
                                >
                                  <Download className="h-3 w-3 mr-1" />
                                  Recursos
                                </Button>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              )
            })}
          </div>
        </aside>

        {/* Mobile Course Content Button */}
        {isMobile && (
          <div className="fixed bottom-4 left-4 right-4 z-50">
            <Button
              onClick={toggleSidebar}
              className="w-full bg-teal-600 hover:bg-teal-700 shadow-lg flex items-center justify-center gap-2"
            >
              <Menu className="h-4 w-4" />
              Conteúdo do curso
            </Button>
          </div>
        )}

        {/* Botão para Mostrar Sidebar (quando oculta) */}
        {!sidebarVisible && !isMobile && (
          <Button
            onClick={() => setSidebarVisible(true)}
            className="fixed right-4 top-20 z-50 bg-teal-600 hover:bg-teal-700 shadow-lg"
            size="sm"
          >
            <Menu className="h-4 w-4 mr-1" />
            Conteúdo
          </Button>
        )}
      </div>
    </div>
  )
}
