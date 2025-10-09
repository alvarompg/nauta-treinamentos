// Componente TestimonialItem: Exibe um depoimento individual de aluno
// Usado na homepage e outras páginas para mostrar feedback dos estudantes

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { Testimonial } from "@/lib/data"
import { Star } from "lucide-react"

// Interface para as props do componente
interface TestimonialItemProps {
  testimonial: Testimonial // Dados do depoimento
}

export default function TestimonialItem({ testimonial }: TestimonialItemProps) {
  return (
    // Card principal do depoimento
    <Card className="h-full flex flex-col justify-between shadow-lg rounded-xl overflow-hidden">
      {/* Conteúdo principal: Avaliação e texto */}
      <CardContent className="p-6 flex-grow">
        {/* Estrelas de avaliação (sempre 5 estrelas) */}
        <div className="flex mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
          ))}
        </div>

        {/* Texto do depoimento */}
        <blockquote className="text-neutral-600 italic mb-4">"{testimonial.quote}"</blockquote>
      </CardContent>

      {/* Footer: Informações do autor */}
      <div className="bg-slate-50 p-6 flex items-center gap-4">
        {/* Avatar do autor (se disponível) */}
        {testimonial.avatarUrl && (
          <Image
            src={testimonial.avatarUrl || "/placeholder.svg"}
            alt={`Foto de ${testimonial.name}`}
            width={48}
            height={48}
            className="rounded-full"
          />
        )}

        {/* Nome e cargo do autor */}
        <div>
          <p className="font-semibold text-neutral-800">{testimonial.name}</p>
          <p className="text-sm text-teal-600">{testimonial.role}</p>
        </div>
      </div>
    </Card>
  )
}

// Props padrão para o componente (fallback)
TestimonialItem.defaultProps = {
  testimonial: {
    id: "default-testimonial",
    quote: "Este é um depoimento padrão para demonstração. O curso foi excelente!",
    name: "Aluno Satisfeito",
    role: "Participante do Curso",
    avatarUrl: "/placeholder.svg?width=48&height=48&text=AS",
  },
}
