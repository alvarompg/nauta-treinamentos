import { Award, Users, Clock, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface IconTitleDescriptionCardProps {
  icon: string
  title: string
  description: string
}

const iconMap = {
  Award: Award,
  Users: Users,
  Clock: Clock,
  Shield: Shield,
}

export default function IconTitleDescriptionCard({ icon, title, description }: IconTitleDescriptionCardProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Award

  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow h-full">
      <CardContent className="flex flex-col items-center text-center p-6 h-full">
        <div className="mb-4 p-3 bg-teal-100 rounded-full">
          <IconComponent className="h-8 w-8 text-teal-600" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-800 mb-2">{title}</h3>
        <p className="text-sm text-neutral-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
