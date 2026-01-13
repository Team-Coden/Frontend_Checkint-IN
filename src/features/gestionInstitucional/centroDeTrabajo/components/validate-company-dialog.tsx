"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../../shared/components/ui/dialog"
import { Button } from "../../../../shared/components/ui/button"
import { Input } from "../../../../shared/components/ui/input"
import { ScrollArea } from "../../../../shared/components/ui/scroll-area"
import { CheckCircle, XCircle, AlertCircle, Search } from "lucide-react"

interface ValidateCompanyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock data de empresas para validar
const companiesData = [
  {
    id: 1,
    nombre: "Constructora del Norte S.A.",
    rfc: "CDN890123ABC",
    status: "validado",
    centros: 3,
    ultimaValidacion: "2024-01-10",
  },
  {
    id: 2,
    nombre: "Servicios Industriales MX",
    rfc: "SIM901234DEF",
    status: "pendiente",
    centros: 2,
    ultimaValidacion: null,
  },
  {
    id: 3,
    nombre: "Logística Express",
    rfc: "LEX012345GHI",
    status: "rechazado",
    centros: 1,
    ultimaValidacion: "2023-12-15",
  },
]

export function ValidateCompanyDialog({ open, onOpenChange }: ValidateCompanyDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [companies] = useState(companiesData)

  const filteredCompanies = companies.filter(
    (company) =>
      company.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.rfc.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleValidate = (id: number, nombre: string) => {
    console.log("[v0] Validando empresa:", id, nombre)
    // Aquí iría la lógica para validar la empresa
  }

  const handleReject = (id: number, nombre: string) => {
    console.log("[v0] Rechazando empresa:", id, nombre)
    // Aquí iría la lógica para rechazar la empresa
  }

  const getStatusBadge = (status: string) => {
    if (status === "validado") {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
          <CheckCircle className="h-3.5 w-3.5" />
          Validado
        </div>
      )
    } else if (status === "pendiente") {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
          <AlertCircle className="h-3.5 w-3.5" />
          Pendiente
        </div>
      )
    } else {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20">
          <XCircle className="h-3.5 w-3.5" />
          Rechazado
        </div>
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Validar Empresas</DialogTitle>
          <DialogDescription>
            Revise y valide la información de las empresas registradas en el sistema
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o RFC..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {filteredCompanies.map((company) => (
                <div
                  key={company.id}
                  className="border rounded-lg p-5 bg-card hover:border-primary/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{company.nombre}</h3>
                          <p className="text-sm text-muted-foreground mt-1">RFC: {company.rfc}</p>
                        </div>
                        {getStatusBadge(company.status)}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                        <div>
                          <span className="font-medium">Centros de trabajo:</span>
                          <p className="text-muted-foreground">{company.centros}</p>
                        </div>
                        <div>
                          <span className="font-medium">Última validación:</span>
                          <p className="text-muted-foreground">{company.ultimaValidacion || "Sin validar"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleValidate(company.id, company.nombre)}
                        disabled={company.status === "validado"}
                        className="gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Validar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(company.id, company.nombre)}
                        disabled={company.status === "rechazado"}
                        className="gap-2"
                      >
                        <XCircle className="h-4 w-4" />
                        Rechazar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredCompanies.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No se encontraron empresas</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
