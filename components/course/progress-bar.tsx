"use client"

import { CheckCircle, Circle, Trophy } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { CourseSection, UserCourse } from "@/lib/data"

interface CourseProgressBarProps {
  sections: CourseSection[]
  userProgress: UserCourse
  className?: string
}

export default function CourseProgressBar({ sections, userProgress, className }: CourseProgressBarProps) {
  // Calcula o total de aulas e aulas concluídas
  const totalLessons = sections.reduce((sum, section) => sum + section.lessons.length, 0)
  const completedLessons = userProgress.completedLessonIds?.length || 0
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  // Calcula progresso por seção
  const sectionProgress = sections.map((section) => {
    const sectionLessons = section.lessons.length
    const completedInSection = section.lessons.filter((lesson) =>
      userProgress.completedLessonIds?.includes(lesson.id),
    ).length
    return {
      id: section.id,
      title: section.title,
      total: sectionLessons,
      completed: completedInSection,
      percentage: sectionLessons > 0 ? Math.round((completedInSection / sectionLessons) * 100) : 0,
    }
  })

  return (
    <div className={className}>
      {/* Barra principal de progresso */}
      <div className="bg-white rounded-lg border p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className={`h-5 w-5 ${progressPercentage === 100 ? "text-amber-500" : "text-slate-400"}`} />
            <span className="font-semibold text-neutral-800">Progresso do Curso</span>
          </div>
          <span className="text-lg font-bold text-teal-600">{progressPercentage}%</span>
        </div>
        <Progress value={progressPercentage} className="h-3" />
        <p className="text-sm text-neutral-500 mt-2">
          {completedLessons} de {totalLessons} aulas concluídas
        </p>
      </div>

      {/* Progresso por módulo */}
      <div className="bg-white rounded-lg border p-4">
        <h4 className="font-semibold text-neutral-800 mb-4">Progresso por Módulo</h4>
        <div className="space-y-4">
          {sectionProgress.map((section) => (
            <div key={section.id} className="flex items-center gap-3">
              {section.percentage === 100 ? (
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-slate-300 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-700 truncate">{section.title}</span>
                  <span className="text-neutral-500 ml-2">
                    {section.completed}/{section.total}
                  </span>
                </div>
                <Progress value={section.percentage} className="h-1.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
