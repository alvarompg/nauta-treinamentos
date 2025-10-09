"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NovoCursoPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/admin/cursos/editar/novo")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
    </div>
  )
}
