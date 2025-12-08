"use client"

import { useState } from "react"
import { CheckCircle, XCircle, AlertCircle, Trophy, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { triggerConfetti } from "@/lib/utils"
import type { Quiz, QuizAttempt } from "@/lib/data"

interface QuizLessonProps {
  quiz: Quiz
  previousAttempts?: QuizAttempt
  onComplete?: (passed: boolean, score: number) => void
  isFinalExam?: boolean
}

export default function QuizLesson({ quiz, previousAttempts, onComplete, isFinalExam }: QuizLessonProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [result, setResult] = useState<{
    score: number
    passed: boolean
    feedback: Record<string, boolean>
  } | null>(null)
  const [attemptsMade, setAttemptsMade] = useState(previousAttempts?.attemptsMade || 0)

  const canAttempt = attemptsMade < quiz.maxAttempts

  const handleAnswerChange = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  const handleSubmit = () => {
    let correctCount = 0
    const feedback: Record<string, boolean> = {}

    quiz.questions.forEach((question) => {
      const isCorrect = answers[question.id] === question.correctOptionId
      feedback[question.id] = isCorrect
      if (isCorrect) correctCount++
    })

    const score = Math.round((correctCount / quiz.questions.length) * 100)
    const passed = score >= quiz.passingScore

    setResult({ score, passed, feedback })
    setShowResults(true)
    setAttemptsMade((prev) => prev + 1)

    if (passed) {
      triggerConfetti(200, 100, 0.5)
    }

    onComplete?.(passed, score)
  }

  const handleRetry = () => {
    setAnswers({})
    setCurrentQuestion(0)
    setShowResults(false)
    setResult(null)
  }

  const answeredQuestions = Object.keys(answers).length
  const progressPercentage = (answeredQuestions / quiz.questions.length) * 100

  // Modo de resultado
  if (showResults && result) {
    return (
      <div className="space-y-6">
        {/* Resultado geral */}
        <Card className={`border-2 ${result.passed ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"}`}>
          <CardContent className="pt-6">
            <div className="text-center">
              {result.passed ? (
                <Trophy className="h-16 w-16 text-green-600 mx-auto mb-4" />
              ) : (
                <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
              )}
              <h2 className={`text-2xl font-bold mb-2 ${result.passed ? "text-green-800" : "text-red-800"}`}>
                {result.passed ? "Parabéns! Você foi aprovado!" : "Não foi dessa vez..."}
              </h2>
              <p className="text-3xl font-bold mb-4">
                <span className={result.passed ? "text-green-600" : "text-red-600"}>{result.score}%</span>
              </p>
              <p className="text-neutral-600">
                {result.passed
                  ? isFinalExam
                    ? "Você concluiu o curso com sucesso! Seu certificado está disponível."
                    : "Continue para a próxima aula."
                  : `Você precisava de ${quiz.passingScore}% para ser aprovado.`}
              </p>
              {!result.passed && attemptsMade < quiz.maxAttempts && (
                <p className="text-sm text-neutral-500 mt-2">Tentativas restantes: {quiz.maxAttempts - attemptsMade}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Revisão das respostas */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-neutral-800">Revisão das Respostas</h3>
          {quiz.questions.map((question, index) => {
            const isCorrect = result.feedback[question.id]
            const userAnswer = answers[question.id]
            const correctAnswer = question.options.find((opt) => opt.id === question.correctOptionId)
            const userAnswerText = question.options.find((opt) => opt.id === userAnswer)?.text

            return (
              <Card
                key={question.id}
                className={`border-2 ${isCorrect ? "border-green-300 bg-green-50/50" : "border-red-300 bg-red-50/50"}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <CardTitle className={`text-base ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                        Pergunta {index + 1} - {isCorrect ? "Correta" : "Incorreta"}
                      </CardTitle>
                      <CardDescription className="text-neutral-700 mt-1 font-medium">{question.text}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className={`p-3 rounded-lg ${isCorrect ? "bg-green-100" : "bg-red-100"}`}>
                    <p className="text-sm">
                      <span className="font-medium text-neutral-600">Sua resposta: </span>
                      <span className={isCorrect ? "text-green-700 font-medium" : "text-red-700 font-medium"}>
                        {userAnswerText || "Não respondida"}
                      </span>
                    </p>
                  </div>
                  {!isCorrect && (
                    <div className="p-3 rounded-lg bg-green-100">
                      <p className="text-sm">
                        <span className="font-medium text-neutral-600">Resposta correta: </span>
                        <span className="text-green-700 font-medium">{correctAnswer?.text}</span>
                      </p>
                    </div>
                  )}
                  {question.explanation && (
                    <div className="p-3 rounded-lg bg-blue-50 border-l-4 border-blue-400">
                      <p className="text-sm text-blue-800">
                        <span className="font-semibold">Explicação: </span>
                        {question.explanation}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Botão tentar novamente */}
        {!result.passed && attemptsMade < quiz.maxAttempts && (
          <div className="text-center">
            <Button onClick={handleRetry} className="bg-teal-600 hover:bg-teal-700">
              <RotateCcw className="h-4 w-4 mr-2" />
              Tentar Novamente
            </Button>
          </div>
        )}
      </div>
    )
  }

  // Modo de prova
  return (
    <div className="space-y-6">
      {/* Cabeçalho do quiz */}
      <div className="bg-slate-50 rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-neutral-800">{quiz.title}</h3>
            {quiz.description && <p className="text-sm text-neutral-600 mt-1">{quiz.description}</p>}
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-neutral-500">
              Nota mínima: <strong className="text-teal-600">{quiz.passingScore}%</strong>
            </span>
            <span className="text-neutral-500">
              Tentativa:{" "}
              <strong>
                {attemptsMade + 1}/{quiz.maxAttempts}
              </strong>
            </span>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-neutral-500 mb-1">
            <span>Progresso</span>
            <span>
              {answeredQuestions}/{quiz.questions.length} questões
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      {/* Alerta se não pode mais tentar */}
      {!canAttempt && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Limite de Tentativas Atingido</AlertTitle>
          <AlertDescription>
            Você atingiu o número máximo de {quiz.maxAttempts} tentativas para este quiz.
          </AlertDescription>
        </Alert>
      )}

      {/* Questões */}
      {canAttempt && (
        <>
          <div className="space-y-6">
            {quiz.questions.map((question, index) => (
              <Card key={question.id} className="border shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-neutral-800 flex items-start gap-3">
                    <span className="bg-teal-100 text-teal-700 text-sm font-bold px-2.5 py-1 rounded-full">
                      {index + 1}
                    </span>
                    <span className="flex-1">{question.text}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={answers[question.id] || ""}
                    onValueChange={(value) => handleAnswerChange(question.id, value)}
                    className="space-y-3"
                  >
                    {question.options.map((option) => (
                      <div key={option.id} className="relative">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={option.id} id={`${question.id}-${option.id}`} className="mt-0.5" />
                          <Label
                            htmlFor={`${question.id}-${option.id}`}
                            className={`text-neutral-700 cursor-pointer flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200 block ${
                              answers[question.id] === option.id
                                ? "border-teal-500 bg-teal-50"
                                : "border-slate-200 hover:border-teal-300 hover:bg-slate-50"
                            }`}
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

          {/* Botão de submissão */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={handleSubmit}
              disabled={answeredQuestions < quiz.questions.length}
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 px-8"
            >
              {answeredQuestions < quiz.questions.length
                ? `Responda todas as questões (${answeredQuestions}/${quiz.questions.length})`
                : "Enviar Respostas"}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
