"use client"

import { Input } from "../../../../shared/components/ui/input"
import { Button } from "../../../../shared/components/ui/button"
import { Search, Filter, Download, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../../shared/components/ui/dropdown-menu"

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  statusFilter: string | null
  setStatusFilter: (status: string | null) => void
}

export function SearchBar({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }: SearchBarProps) {
  const handleExport = () => {
    console.log("[v0] Exportando datos...")
    // Aquí iría la lógica real de exportación
    alert("Exportando datos a CSV...")
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Buscar centros de trabajo por nombre, ubicación o código..."
          className="pl-10 h-12 bg-card"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => setSearchTerm("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-12 gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filtros
            {statusFilter && (
              <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">1</span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => setStatusFilter(null)}>Todos los estados</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setStatusFilter("active")}>Activos</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pendientes</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>Rechazados</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" className="h-12 gap-2 bg-transparent" onClick={handleExport}>
        <Download className="h-4 w-4" />
        Exportar
      </Button>
    </div>
  )
}
