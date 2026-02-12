import "../../../App.css"
import { AppSidebar } from "@/shared/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb"
import { Separator } from "@/shared/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar"
import { ModeToggle } from "../components/mode-toggle"
import { useBreadcrumbs } from "../../../shared/hooks/useBreadcrumbs"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"   

export default function Main({ children }: { children?: React.ReactNode }) {
  const breadcrumbs = useBreadcrumbs()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleInicioClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowConfirmDialog(true)
  }

  const handleConfirmNavigation = () => {
    window.location.href = "/"
  } 

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            <Breadcrumb>
              <BreadcrumbList>

                {/* Inicio */}
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink 
                    href="/" 
                    className="text-foreground hover:text-foreground cursor-pointer"
                    onClick={handleInicioClick}
                  >
                    Inicio
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator className="hidden md:block" />

                {/* Breadcrumb dinámico */}
                {breadcrumbs.map((bc, i) => (
                  <BreadcrumbItem key={i}>
                    {bc.isLast ? (
                      <BreadcrumbPage>{bc.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={bc.href} className="text-foreground hover:text-foreground">
                        {bc.label}
                      </BreadcrumbLink>
                    )}
                    {!bc.isLast && <BreadcrumbSeparator />}
                  </BreadcrumbItem>
                ))}

              </BreadcrumbList>
            </Breadcrumb>

            <div className="grow" />
          
           
          </div>
        </header>
        <div className="absolute top-4 right-4">
        <ModeToggle/>
        </div>

        <main className="p-6 md:p-10">
          {children}
        </main>

        {/* Confirmation Dialog for Inicio */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                ¿Regresar a la página principal?
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                ¿Está seguro que desea regresar a la página principal? Perderá cualquier progreso no guardado en la página actual.
              </p>
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmDialog(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleConfirmNavigation}
                  className="flex-1"
                >
                  Regresar al Inicio
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  )
}
