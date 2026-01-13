"use client"

import { Card } from "../../../../shared/components/ui/card"
import { Button } from "../../../../shared/components/ui/button"
import { MoreVertical, MapPin, Users, Calendar, Eye, Edit, Trash2, CheckCircle2, Clock, XCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../shared/components/ui/dropdown-menu"
import { useMemo } from "react"

const workCenters = [
  {
    id: "CT-001",
    name: "Centro Administrativo Principal",
    location: "Ciudad de México",
    employees: 156,
    status: "active",
    validated: true,
    createdAt: "15 Ene 2024",
  },
  {
    id: "CT-002",
    name: "Planta de Producción Norte",
    location: "Monterrey, NL",
    employees: 342,
    status: "active",
    validated: true,
    createdAt: "22 Feb 2024",
  },
  {
    id: "CT-003",
    name: "Almacén Regional Centro",
    location: "Querétaro, Qro",
    employees: 89,
    status: "rejected",
    validated: false,
    createdAt: "10 Mar 2024",
  },
  {
    id: "CT-004",
    name: "Oficina Comercial Sur",
    location: "Guadalajara, Jal",
    employees: 67,
    status: "active",
    validated: true,
    createdAt: "05 Abr 2024",
  },
  {
    id: "CT-005",
    name: "Centro de Distribución Oeste",
    location: "Culiacán, Sin",
    employees: 124,
    status: "pending",
    validated: false,
    createdAt: "18 May 2024",
  },
]

interface WorkCentersTableProps {
  searchTerm: string
  statusFilter: string | null
}

export function WorkCentersTable({ searchTerm, statusFilter }: WorkCentersTableProps) {
  const filteredCenters = useMemo(() => {
    let filtered = workCenters

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (center) =>
          center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          center.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          center.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtrar por estado
    if (statusFilter) {
      filtered = filtered.filter((center) => center.status === statusFilter)
    }

    return filtered
  }, [searchTerm, statusFilter])

  const handleView = (id: string) => {
    console.log("[v0] Ver detalles de:", id)
    alert(`Ver detalles del centro ${id}`)
  }

  const handleEdit = (id: string) => {
    console.log("[v0] Editar centro:", id)
    alert(`Editar centro ${id}`)
  }

  const handleDelete = (id: string) => {
    console.log("[v0] Eliminar centro:", id)
    if (confirm(`¿Estás seguro de eliminar el centro ${id}?`)) {
      alert(`Centro ${id} eliminado`)
    }
  }

  const getStatusComponent = (status: string) => {
    switch (status) {
      case "active":
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Activo</span>
          </div>
        )
      case "pending":
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
            <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Pendiente</span>
          </div>
        )
      case "rejected":
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
            <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            <span className="text-sm font-medium text-rose-700 dark:text-rose-300">Rechazado</span>
          </div>
        )
      default:
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-950/30 border border-gray-200 dark:border-gray-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{status}</span>
          </div>
        )
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Centros de Trabajo Registrados</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {filteredCenters.length === workCenters.length
            ? "Lista completa de todos los centros"
            : `Mostrando ${filteredCenters.length} de ${workCenters.length} centros`}
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-muted/50 text-sm font-medium text-muted-foreground">
            <div className="col-span-3">Centro de Trabajo</div>
            <div className="col-span-2">Ubicación</div>
            <div className="col-span-2">Empleados</div>
            <div className="col-span-2">Estado</div>
            <div className="col-span-2">Fecha Registro</div>
            <div className="col-span-1"></div>
          </div>

          {/* Table Rows */}
          <div className="divide-y">
            {filteredCenters.length === 0 ? (
              <div className="px-6 py-12 text-center text-muted-foreground">No se encontraron centros de trabajo</div>
            ) : (
              filteredCenters.map((center) => {
                return (
                  <div
                    key={center.id}
                    className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="col-span-3 space-y-1">
                      <div className="font-medium">{center.name}</div>
                      <div className="text-xs text-muted-foreground">{center.id}</div>
                    </div>

                    <div className="col-span-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{center.location}</span>
                    </div>

                    <div className="col-span-2 flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{center.employees}</span>
                    </div>

                    <div className="col-span-2 flex items-center gap-2">
                      {getStatusComponent(center.status)}
                      
                    </div>

                    <div className="col-span-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{center.createdAt}</span>
                    </div>

                    <div className="col-span-1 flex items-center justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => handleView(center.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(center.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(center.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      <div className="p-4 border-t bg-muted/20">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Mostrando {filteredCenters.length} de {workCenters.length} centros de trabajo
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Anterior
            </Button>
            <Button variant="outline" size="sm">
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
