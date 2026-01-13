import { Card } from "../../../../shared/components/ui/card"
import { Building2, CheckCircle2, AlertCircle, Archive } from "lucide-react"

const stats = [
  {
    title: "Centros Activos",
    value: "24",
    icon: Building2,
    description: "En operación",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    title: "Validados",
    value: "18",
    icon: CheckCircle2,
    description: "Empresas verificadas",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Pendientes",
    value: "6",
    icon: AlertCircle,
    description: "Requieren validación",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    title: "Archivados",
    value: "12",
    icon: Archive,
    description: "Inactivos o eliminados",
    color: "text-muted-foreground",
    bgColor: "bg-muted",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
              <div className={`${stat.bgColor} ${stat.color} p-3 rounded-xl`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
