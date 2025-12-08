"use client"

import Image from "next/image"
import { BookOpen, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { Lesson } from "@/lib/data"
import type { JSX } from "react/jsx-runtime" // Import JSX to fix the undeclared variable error

interface TextLessonProps {
  lesson: Lesson
  onComplete?: () => void
}

export default function TextLesson({ lesson, onComplete }: TextLessonProps) {
  const [showFullContent, setShowFullContent] = useState(true)

  // Formata o conteúdo de texto com markdown básico
  const formatContent = (content: string) => {
    if (!content) return null

    const lines = content.split("\n")
    const formattedLines: JSX.Element[] = []

    lines.forEach((line, index) => {
      // Títulos com **
      if (line.startsWith("**") && line.endsWith("**")) {
        formattedLines.push(
          <h3 key={index} className="text-lg font-bold text-neutral-800 mt-6 mb-3">
            {line.replace(/\*\*/g, "")}
          </h3>,
        )
      }
      // Títulos que terminam com :
      else if (line.endsWith(":") && line.length < 50 && !line.startsWith("-") && !line.startsWith("•")) {
        formattedLines.push(
          <h4 key={index} className="text-base font-semibold text-neutral-700 mt-4 mb-2">
            {line}
          </h4>,
        )
      }
      // Itens de lista com -
      else if (line.trim().startsWith("-") || line.trim().startsWith("•")) {
        formattedLines.push(
          <li key={index} className="text-neutral-600 ml-4 mb-1">
            {line.replace(/^[-•]\s*/, "")}
          </li>,
        )
      }
      // Itens numerados
      else if (/^\d+\./.test(line.trim())) {
        formattedLines.push(
          <li key={index} className="text-neutral-600 ml-4 mb-2 list-decimal">
            {line.replace(/^\d+\.\s*/, "")}
          </li>,
        )
      }
      // Linha vazia
      else if (line.trim() === "") {
        formattedLines.push(<br key={index} />)
      }
      // Texto normal
      else {
        formattedLines.push(
          <p key={index} className="text-neutral-700 mb-3 leading-relaxed">
            {line}
          </p>,
        )
      }
    })

    return formattedLines
  }

  return (
    <div className="space-y-6">
      {/* Imagem principal da aula (se houver) */}
      {lesson.imageUrl && (
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
          <Image src={lesson.imageUrl || "/placeholder.svg"} alt={lesson.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-flex items-center gap-1 bg-teal-600 text-white text-xs px-2 py-1 rounded">
              <BookOpen className="h-3 w-3" />
              Leitura
            </span>
          </div>
        </div>
      )}

      {/* Informações da aula */}
      <div className="flex items-center gap-4 text-sm text-neutral-500">
        {lesson.duration && (
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Tempo estimado: {lesson.duration}
          </span>
        )}
      </div>

      {/* Conteúdo da aula */}
      <div className="bg-white rounded-lg border p-6">
        <div
          className={`prose prose-neutral max-w-none ${!showFullContent ? "max-h-96 overflow-hidden relative" : ""}`}
        >
          {formatContent(lesson.textContent || "Conteúdo da aula não disponível.")}

          {!showFullContent && (
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
          )}
        </div>

        {/* Botão para expandir/recolher (se conteúdo for longo) */}
        {lesson.textContent && lesson.textContent.length > 1000 && (
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-teal-600 border-teal-600 hover:bg-teal-50"
            >
              {showFullContent ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Recolher conteúdo
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Expandir conteúdo
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Dica de conclusão */}
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
        <p className="text-sm text-teal-800">
          <strong>Dica:</strong> Leia todo o conteúdo com atenção antes de prosseguir para a próxima aula. Você pode
          marcar esta aula como concluída quando terminar a leitura.
        </p>
      </div>
    </div>
  )
}
