"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "../../../../shared/components/ui/card"
import { Button } from "../../../../shared/components/ui/button"
import { Input } from "../../../../shared/components/ui/input"
import { Badge } from "../../../../shared/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../shared/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../shared/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../shared/components/ui/dropdown-menu"
import { Label } from "../../../../shared/components/ui/label"
import { Briefcase, Search, MoreVertical, Eye, Edit, Trash2, FileDown, User } from "lucide-react"
import Main from "@/features/main/pages/page"

interface Plaza {
  id: string
  centro: string
  titulo: string
  nombre: string
  baseMinima?: string
  genero: string
  descripcion?: string
  estado: "Activa" | "Ocupada" | "Cerrada"
  fechaCreacion: string
}

// Sample data
const initialPlazas: Plaza[] = [
  {
    id: "1",
    centro: "Tech Solutions S.A.",
    titulo: "Desarrollador",
    nombre: "Plaza de Desarrollo Frontend",
    baseMinima: "$800",
    genero: "Ambos",
    descripcion: "Plaza para desarrollo de interfaces web modernas",
    estado: "Activa",
    fechaCreacion: "10/12/2024",
  },
  {
    id: "2",
    centro: "Innovatech Corp",
    titulo: "Diseñador",
    nombre: "Plaza de Diseño UX/UI",
    genero: "Ambos",
    estado: "Ocupada",
    fechaCreacion: "08/12/2024",
  },
]

export default function PlazasPage() {
    
  const [plazas, setPlazas] = useState<Plaza[]>(initialPlazas)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEstado, setFilterEstado] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    centro: "",
    titulo: "",
    nombre: "",
    baseMinima: "",
    genero: "",
    descripcion: "",
  })

  const filteredPlazas = plazas.filter((plaza) => {
    const matchesSearch =
      plaza.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plaza.centro.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plaza.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterEstado === "all" || plaza.estado === filterEstado
    return matchesSearch && matchesFilter
  })

  const handleExport = () => {
    console.log("[v0] Exportando plazas:", filteredPlazas)
    // Simulate export
    alert("Exportando plazas...")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Registrando nueva plaza:", formData)

    const newPlaza: Plaza = {
      id: String(plazas.length + 1),
      centro: formData.centro,
      titulo: formData.titulo,
      nombre: formData.nombre,
      baseMinima: formData.baseMinima,
      genero: formData.genero,
      descripcion: formData.descripcion,
      estado: "Activa",
      fechaCreacion: new Date().toLocaleDateString("es-ES"),
    }

    setPlazas([...plazas, newPlaza])
    setIsDialogOpen(false)
    setFormData({
      centro: "",
      titulo: "",
      nombre: "",
      baseMinima: "",
      genero: "",
      descripcion: "",
    })
  }

  const handleDelete = (id: string) => {
    console.log("[v0] Eliminando plaza:", id)
    setPlazas(plazas.filter((p) => p.id !== id))
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Activa":
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">{estado}</span>
          </div>
        )
      case "Ocupada":
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-xs font-medium text-blue-700 dark:text-blue-400">{estado}</span>
          </div>
        )
      case "Cerrada":
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-950/30 border border-gray-200 dark:border-gray-800">
            <div className="h-2 w-2 rounded-full bg-gray-500" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-400">{estado}</span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Main>
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Plazas de Centros de Trabajo</h1>
              <p className="text-muted-foreground mt-2">
                Gestiona las plazas disponibles en los centros de trabajo y bolsas
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Actions Bar */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar centro o bolsa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterEstado} onValueChange={setFilterEstado}>
                <SelectTrigger className="w-full lg:w-[180px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="Activa">Activa</SelectItem>
                  <SelectItem value="Ocupada">Ocupada</SelectItem>
                  <SelectItem value="Cerrada">Cerrada</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleExport}>
                <FileDown className="h-4 w-4 mr-2" />
                Ver Listado
              </Button>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Briefcase className="h-4 w-4 mr-2" />
                Nueva Plaza
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Plazas Display */}
        {filteredPlazas.length === 0 ? (
          <Card>
            <CardContent className="py-16">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No hay plazas activas que coincidan con la búsqueda
                </h3>
                <p className="text-sm text-muted-foreground">Intenta ajustar los filtros o crea una nueva plaza</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredPlazas.map((plaza) => (
              <Card key={plaza.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-1">{plaza.nombre}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              {plaza.centro}
                            </span>
                            <span>•</span>
                            <Badge variant="outline">{plaza.titulo}</Badge>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(plaza.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-3 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Estado</p>
                          {getEstadoBadge(plaza.estado)}
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Género</p>
                          <p className="text-sm font-medium text-foreground flex items-center gap-2">
                            <User className="h-3 w-3" />
                            {plaza.genero}
                          </p>
                        </div>
                        {plaza.baseMinima && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Base Mínima</p>
                            <p className="text-sm font-medium text-foreground">{plaza.baseMinima}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Fecha de Creación</p>
                          <p className="text-sm font-medium text-foreground">{plaza.fechaCreacion}</p>
                        </div>
                      </div>

                      {plaza.descripcion && <p className="text-sm text-muted-foreground pt-2">{plaza.descripcion}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Register Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Nueva Plaza
            </DialogTitle>
            <DialogDescription>Registra una nueva plaza en el centro de trabajo</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="centro">Centro de Trabajo</Label>
                <Select
                  value={formData.centro}
                  onValueChange={(value) => setFormData({ ...formData, centro: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un centro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tech Solutions S.A.">Tech Solutions S.A.</SelectItem>
                    <SelectItem value="Innovatech Corp">Innovatech Corp</SelectItem>
                    <SelectItem value="Digital Dynamics">Digital Dynamics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="titulo">Título</Label>
                <Select
                  value={formData.titulo}
                  onValueChange={(value) => setFormData({ ...formData, titulo: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un título" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Desarrollador">Desarrollador</SelectItem>
                    <SelectItem value="Diseñador">Diseñador</SelectItem>
                    <SelectItem value="Analista">Analista</SelectItem>
                    <SelectItem value="Gestor">Gestor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre de Plaza</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="nombre"
                    placeholder="Ej: Plaza de Desarrollo Frontend"
                    className="pl-10"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="baseMinima">Base mínima (opcional)</Label>
                <Input
                  id="baseMinima"
                  placeholder="Ej: $800"
                  value={formData.baseMinima}
                  onChange={(e) => setFormData({ ...formData, baseMinima: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="genero">Género permitido</Label>
                <Select
                  value={formData.genero}
                  onValueChange={(value) => setFormData({ ...formData, genero: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ambos">Ambos</SelectItem>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Femenino">Femenino</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción (opcional)</Label>
                <Input
                  id="descripcion"
                  placeholder="Describe las características de la plaza"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
    </Main>
  )
}
