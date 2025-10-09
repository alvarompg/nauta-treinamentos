// Componente IconTitleDescriptionCard: Card com ícone, título e descrição
// Usado para exibir benefícios, valores da empresa e outras informações destacadas

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

// Interface para as props do componente
interface IconTitleDescriptionCardProps {
  icon: LucideIcon // Componente de ícone do Lucide React
  title: string // Título do card
  description: string // Descrição/texto do card
  iconColor?: string // Cor do ícone (opcional, padrão: teal)
}

export default function IconTitleDescriptionCard({
  icon: Icon, // Renomeia 'icon' para 'Icon' (convenção React para componentes)
  title,
  description,
  iconColor = "text-teal-600", // Cor padrão do ícone
}: IconTitleDescriptionCardProps) {
  return (
    // Card principal com efeitos de hover
    <Card className="shadow-md hover:shadow-lg transition-shadow rounded-xl h-full">
      {/* Header: Ícone e título */}
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {/* Container do ícone com fundo colorido */}
        <div className={`bg-teal-100 p-3 rounded-full`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>

        {/* Título */}
        <CardTitle className="text-lg font-semibold text-neutral-800">{title}</CardTitle>
      </CardHeader>

      {/* Conteúdo: Descrição */}
      <CardContent>
        <p className="text-sm text-neutral-600">{description}</p>
      </CardContent>
    </Card>
  )
}

// Props padrão para o componente (fallback)
import { ShieldCheck } from "lucide-react" // Ícone de exemplo
IconTitleDescriptionCard.defaultProps = {
  icon: ShieldCheck,
  title: "Título Padrão",
  description: "Descrição padrão para o card, ilustrando seu uso.",
  iconColor: "text-teal-600",
}
