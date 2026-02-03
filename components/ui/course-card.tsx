// Componente CourseCard: Card individual para exibir informações de um curso
// Usado nas páginas de listagem de cursos e na homepage

"use client" // Client Component para interatividade

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { Course } from "@/lib/data"
// import { triggerConfetti } from "@/lib/utils" // DESATIVADO: Confete removido conforme solicitação
import { Eye } from "lucide-react" // Removido ShoppingCartIcon

// Interface para as props do componente
interface CourseCardProps {
  course: Course // Dados do curso
  onAddToCart?: (course: Course) => void // Função opcional para adicionar ao carrinho
}

export default function CourseCard({ course, onAddToCart }: CourseCardProps) {
  // URL do WhatsApp para compra direta
  const whatsappUrl = "https://api.whatsapp.com/send/?phone=%2B5511992704147&text&type=phone_number&app_absent=0"

  // Função para redirecionar para WhatsApp (Compre Já!)
  const handleBuyNow = () => {
    // Redireciona para o WhatsApp para finalizar a compra
    window.open(whatsappUrl, "_blank")
    
    // Callback opcional caso seja necessário tracking
    if (onAddToCart) {
      onAddToCart(course)
    }

    console.log(`[v0] Redirecionando para WhatsApp - Treinamento: ${course.name}`)
  }

  // Verifica se o treinamento tem desconto (preço original maior que atual)
  const hasDiscount = course.originalPriceValue && course.originalPriceValue > course.priceValue

  return (
    // Card principal com efeitos de hover
    <Card className="flex flex-col overflow-hidden rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] h-full">
      {/* Header: Imagem do treinamento */}
      <CardHeader className="p-0">
        <Image
          src={course.imageUrl || "/placeholder.svg?width=400&height=250&text=Treinamento"}
          alt={`Imagem do treinamento ${course.name}`}
          width={400}
          height={250}
          className="object-cover w-full h-48 md:h-56"
        />
      </CardHeader>

      {/* Conteúdo: Informações do treinamento */}
      <CardContent className="flex-grow p-5 space-y-3">
        {/* Linha superior: Categoria e duração */}
        <div className="flex justify-between items-center">
          {/* Badge da categoria */}
          <span className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {course.category}
          </span>
          {/* Duração (se disponível) */}
          {course.duration && <span className="text-xs text-muted-foreground">{course.duration}</span>}
        </div>

        {/* Título do treinamento */}
        <CardTitle className="text-xl font-semibold text-neutral-800 leading-tight">{course.name}</CardTitle>

        {/* Descrição do treinamento */}
        <CardDescription className="text-sm text-neutral-600 min-h-[3.5rem] line-clamp-3">
          {course.shortDescription}
        </CardDescription>
      </CardContent>

      {/* Footer: Preço e botões */}
      <CardFooter className="p-5 flex flex-col gap-3 bg-slate-50">
        {/* Área do preço */}
        <div className="w-full text-center">
          {hasDiscount ? (
            // Preço com desconto
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl font-bold text-red-600">{course.price}</span>
              <span className="text-sm text-muted-foreground line-through">
                R$ {course.originalPriceValue?.toFixed(2).replace(".", ",")}
              </span>
            </div>
          ) : (
            // Preço normal
            <p className="text-xl font-bold text-teal-600 mb-2">{course.price}</p>
          )}
        </div>

        {/* Botões de ação */}
        <div className="w-full flex gap-2">
          {/* Botão "Ver Mais" - Leva para página de detalhes do treinamento */}
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

          {/* Botão "Compre Já!" - Redireciona para WhatsApp */}
          <Button
            size="sm"
            onClick={handleBuyNow}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-neutral-900 font-semibold"
          >
            Compre Já!
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

// Props padrão para o componente (fallback)
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
