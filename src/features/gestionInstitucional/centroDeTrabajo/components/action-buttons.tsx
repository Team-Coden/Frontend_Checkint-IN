"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../../../../shared/components/ui/button"
import { Plus, History, BadgeCheck } from "lucide-react"
import { RegisterCenterDialog } from "./register-center-dialog"
import { HistoryDialog } from "./history-dialog"
import { ValidateCompanyDialog } from "./validate-company-dialog"

export function ActionButtons() {
  const [registerOpen, setRegisterOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [validateOpen, setValidateOpen] = useState(false)

  return (
    <>
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => setRegisterOpen(true)}
            className="flex-1 h-auto py-4 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <div className="bg-primary-foreground/20 p-2 rounded-lg">
              <Plus className="h-5 w-5" />
            </div>
            <div className="text-center sm:text-left">
              <div className="font-semibold">Registrar Nuevo Centro</div>
              <div className="text-xs opacity-90">Añadir centro de trabajo</div>
            </div>
          </Button>

          <Button
            onClick={() => setHistoryOpen(true)}
            variant="outline"
            className="flex-1 h-auto py-4 flex flex-col sm:flex-row items-center justify-center gap-3 bg-transparent"
          >
            <div className="bg-muted p-2 rounded-lg">
              <History className="h-5 w-5" />
            </div>
            <div className="text-center sm:text-left">
              <div className="font-semibold">Historial</div>
              <div className="text-xs text-muted-foreground">Ver centros eliminados</div>
            </div>
          </Button>

          <Button
            onClick={() => setValidateOpen(true)}
            variant="outline"
            className="flex-1 h-auto py-4 flex flex-col sm:flex-row items-center justify-center gap-3 bg-transparent"
          >
            <div className="bg-muted p-2 rounded-lg">
              <BadgeCheck className="h-5 w-5" />
            </div>
            <div className="text-center sm:text-left">
              <div className="font-semibold">Validar Empresa</div>
              <div className="text-xs text-muted-foreground">Verificar información</div>
            </div>
          </Button>
        </div>
      </Card>

      <RegisterCenterDialog open={registerOpen} onOpenChange={setRegisterOpen} />
      <HistoryDialog open={historyOpen} onOpenChange={setHistoryOpen} />
      <ValidateCompanyDialog open={validateOpen} onOpenChange={setValidateOpen} />
    </>
  )
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-card text-card-foreground rounded-xl border shadow-sm ${className}`}>{children}</div>
}
