import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface IconTitleDescriptionCardProps {
  icon: LucideIcon
  title: string
  description: string
  iconColor?: string
}

export default function IconTitleDescriptionCard({
  icon: Icon,
  title,
  description,
  iconColor = "text-teal-600",
}: IconTitleDescriptionCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow rounded-xl h-full">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className={`bg-teal-100 p-3 rounded-full`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <CardTitle className="text-lg font-semibold text-neutral-800">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-neutral-600">{description}</p>
      </CardContent>
    </Card>
  )
}

// Default props for Next.js
import { ShieldCheck } from "lucide-react" // Example icon
IconTitleDescriptionCard.defaultProps = {
  icon: ShieldCheck,
  title: "Título Padrão",
  description: "Descrição padrão para o card, ilustrando seu uso.",
  iconColor: "text-teal-600",
}
