import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { Testimonial } from "@/lib/data"
import { Star } from "lucide-react"

interface TestimonialItemProps {
  testimonial: Testimonial
}

export default function TestimonialItem({ testimonial }: TestimonialItemProps) {
  return (
    <Card className="h-full flex flex-col justify-between shadow-lg rounded-xl overflow-hidden">
      <CardContent className="p-6 flex-grow">
        <div className="flex mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
          ))}
        </div>
        <blockquote className="text-neutral-600 italic mb-4">"{testimonial.quote}"</blockquote>
      </CardContent>
      <div className="bg-slate-50 p-6 flex items-center gap-4">
        {testimonial.avatarUrl && (
          <Image
            src={testimonial.avatarUrl || "/placeholder.svg"}
            alt={`Foto de ${testimonial.name}`}
            width={48}
            height={48}
            className="rounded-full"
          />
        )}
        <div>
          <p className="font-semibold text-neutral-800">{testimonial.name}</p>
          <p className="text-sm text-teal-600">{testimonial.role}</p>
        </div>
      </div>
    </Card>
  )
}

// Default props for Next.js
TestimonialItem.defaultProps = {
  testimonial: {
    id: "default-testimonial",
    quote: "Este é um depoimento padrão para demonstração. O curso foi excelente!",
    name: "Aluno Satisfeito",
    role: "Participante do Curso",
    avatarUrl: "/placeholder.svg?width=48&height=48&text=AS",
  },
}
