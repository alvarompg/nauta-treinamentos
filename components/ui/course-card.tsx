"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { Course } from "@/lib/data"
import { triggerConfetti } from "@/lib/utils" // Import confetti utility
import { ShoppingCartIcon, Eye } from "lucide-react" // Added Eye icon

interface CourseCardProps {
  course: Course
  onAddToCart?: (course: Course) => void // Optional callback
}

export default function CourseCard({ course, onAddToCart }: CourseCardProps) {
  const handleAddToCart = () => {
    triggerConfetti(100, 70, 0.6) // Trigger confetti
    // playSuccessSound(); // Optional: play sound
    if (onAddToCart) {
      onAddToCart(course)
    }
    console.log(`Added ${course.name} to cart (simulated)`)
    // In a real app, you'd update global cart state here
  }

  const hasDiscount = course.originalPriceValue && course.originalPriceValue > course.priceValue

  return (
    <Card className="flex flex-col overflow-hidden rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] h-full">
      <CardHeader className="p-0">
        <Image
          src={course.imageUrl || "/placeholder.svg?width=400&height=250&text=Curso"}
          alt={`Imagem do curso ${course.name}`}
          width={400}
          height={250}
          className="object-cover w-full h-48 md:h-56"
        />
      </CardHeader>
      <CardContent className="flex-grow p-5 space-y-3">
        <div className="flex justify-between items-center">
          <span className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {course.category}
          </span>
          {course.duration && <span className="text-xs text-muted-foreground">{course.duration}</span>}
        </div>
        <CardTitle className="text-xl font-semibold text-neutral-800 leading-tight">{course.name}</CardTitle>
        <CardDescription className="text-sm text-neutral-600 min-h-[3.5rem] line-clamp-3">
          {course.shortDescription}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-5 flex flex-col gap-3 bg-slate-50">
        <div className="w-full text-center">
          {hasDiscount ? (
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl font-bold text-red-600">{course.price}</span>
              <span className="text-sm text-muted-foreground line-through">
                R$ {course.originalPriceValue?.toFixed(2).replace(".", ",")}
              </span>
            </div>
          ) : (
            <p className="text-xl font-bold text-teal-600 mb-2">{course.price}</p>
          )}
        </div>
        <div className="w-full flex gap-2">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="flex-1 border-teal-600 text-teal-600 hover:bg-teal-50 hover:text-teal-700 bg-transparent"
          >
            <Link href={`/curso-vitrine?id=${course.id}`}>
              <Eye className="mr-1 h-4 w-4" /> Ver Mais
            </Link>
          </Button>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-neutral-900"
          >
            <ShoppingCartIcon className="mr-1 h-4 w-4" /> Adicionar
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

CourseCard.defaultProps = {
  course: {
    id: "default-1",
    slug: "default-curso",
    name: "Curso Padrão Incrível",
    category: "Padrão",
    shortDescription: "Uma breve descrição do curso padrão para demonstração.",
    price: "R$ 0,00",
    priceValue: 0,
    imageUrl: "/placeholder.svg?width=400&height=250&text=Curso+Padrão",
    duration: "N/A",
  },
}
