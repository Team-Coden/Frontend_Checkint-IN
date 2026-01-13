"use client"

import { useState } from "react"
import {
  FileText,
  User,
  Calendar,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  Upload,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "../../shared/components/ui/button"
import { Input } from "../../shared/components/ui/input"
import { Badge } from "../../shared/components/ui/badge"
import { Card, CardContent } from "../../shared/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shared/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../shared/components/ui/dialog"
import Main from "../main/pages/page"


type DocumentStatus = "pendiente" | "aprobado" | "rechazado"

interface Document {
  id: string
  name: string
  status: DocumentStatus
  uploadDate: string
  fileUrl?: string
}

interface Student {
  id: string
  name: string
  idNumber: string
  program: string
  documents: Document[]
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Juan Pérez",
    idNumber: "1234573",
    program: "Taller de Software",
    documents: [
      { id: "d1", name: "Cédula", status: "pendiente", uploadDate: "2024-01-15" },
      { id: "d2", name: "Curriculum Vitae", status: "pendiente", uploadDate: "2024-01-15" },
      { id: "d3", name: "Anexo IV", status: "pendiente", uploadDate: "2024-01-16" },
      { id: "d4", name: "Anexo V", status: "pendiente", uploadDate: "2024-01-16" },
      { id: "d5", name: "Acta de nacimiento", status: "pendiente", uploadDate: "2024-01-17" },
      { id: "d6", name: "Cédula de Padres", status: "pendiente", uploadDate: "2024-01-17" },
      { id: "d7", name: "Tarjeta de Vacunación", status: "pendiente", uploadDate: "2024-01-18" },
    ],
  },
  {
    id: "2",
    name: "Carolin Paulino",
    idNumber: "4037743378",
    program: "Taller de Software",
    documents: [
      { id: "d8", name: "Cédula", status: "aprobado", uploadDate: "2024-01-10" },
      { id: "d9", name: "Curriculum Vitae", status: "aprobado", uploadDate: "2024-01-10" },
      { id: "d10", name: "Anexo IV", status: "pendiente", uploadDate: "2024-01-12" },
    ],
  },
  {
    id: "3",
    name: "Rochael Rodriguez",
    idNumber: "1234873",
    program: "Taller de Software",
    documents: [
      { id: "d11", name: "Cédula", status: "aprobado", uploadDate: "2024-01-08" },
      { id: "d12", name: "Curriculum Vitae", status: "rechazado", uploadDate: "2024-01-08" },
      { id: "d13", name: "Anexo IV", status: "pendiente", uploadDate: "2024-01-09" },
      { id: "d14", name: "Anexo V", status: "pendiente", uploadDate: "2024-01-09" },
    ],
  },
  {
    id: "4",
    name: "Maria Contreras",
    idNumber: "7456345",
    program: "Gestión",
    documents: [
      { id: "d15", name: "Cédula", status: "aprobado", uploadDate: "2024-01-05" },
      { id: "d16", name: "Acta de nacimiento", status: "aprobado", uploadDate: "2024-01-05" },
    ],
  },
  {
    id: "5",
    name: "José Lin",
    idNumber: "845742",
    program: "Gestión",
    documents: [
      { id: "d17", name: "Cédula", status: "pendiente", uploadDate: "2024-01-20" },
      { id: "d18", name: "Curriculum Vitae", status: "pendiente", uploadDate: "2024-01-20" },
      { id: "d19", name: "Anexo IV", status: "pendiente", uploadDate: "2024-01-20" },
    ],
  },
  {
    id: "6",
    name: "Rafaelina Pichardo",
    idNumber: "9384756",
    program: "Taller de Software",
    documents: [
      { id: "d20", name: "Cédula", status: "aprobado", uploadDate: "2024-01-03" },
      { id: "d21", name: "Curriculum Vitae", status: "aprobado", uploadDate: "2024-01-03" },
      { id: "d22", name: "Anexo IV", status: "aprobado", uploadDate: "2024-01-04" },
      { id: "d23", name: "Anexo V", status: "aprobado", uploadDate: "2024-01-04" },
    ],
  },
]

export default function DocumentosPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("todos")
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null)
  const [selectedDocument, setSelectedDocument] = useState<{ student: Student; document: Document } | null>(null)

  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case "aprobado":
        return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
      case "pendiente":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
      case "rechazado":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
    }
  }

  const getStatusText = (status: DocumentStatus) => {
    switch (status) {
      case "aprobado":
        return "Aprobado"
      case "pendiente":
        return "Pendiente"
      case "rechazado":
        return "Rechazado"
    }
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.idNumber.includes(searchTerm)

    if (statusFilter === "todos") return matchesSearch

    return matchesSearch && student.documents.some((doc) => doc.status === statusFilter)
  })

  const handleApproveDocument = (studentId: string, docId: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
              ...student,
              documents: student.documents.map((doc) =>
                doc.id === docId ? { ...doc, status: "aprobado" as DocumentStatus } : doc,
              ),
            }
          : student,
      ),
    )
    console.log("[v0] Documento aprobado:", { studentId, docId })
  }

  const handleRejectDocument = (studentId: string, docId: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
              ...student,
              documents: student.documents.map((doc) =>
                doc.id === docId ? { ...doc, status: "rechazado" as DocumentStatus } : doc,
              ),
            }
          : student,
      ),
    )
    console.log("[v0] Documento rechazado:", { studentId, docId })
  }

  const handleDeleteDocument = (studentId: string, docId: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
              ...student,
              documents: student.documents.filter((doc) => doc.id !== docId),
            }
          : student,
      ),
    )
    console.log("[v0] Documento eliminado:", { studentId, docId })
  }

  const handleDownloadDocument = (doc: Document) => {
    console.log("[v0] Descargando documento:", doc.name)
    alert(`Descargando: ${doc.name}`)
  }

  return (
    <Main>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Gestión de Documentos</h1>
              <p className="text-muted-foreground">Administra y revisa los documentos de los estudiantes</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar estudiante..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="aprobado">Aprobado</SelectItem>
                    <SelectItem value="rechazado">Rechazado</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => (window.location.href = "/documentos/subir")}>
                  <Upload className="mr-2 h-4 w-4" />
                  Subir Documentos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students List */}
        <div className="space-y-3">
          {filteredStudents.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No se encontraron estudiantes</p>
              </CardContent>
            </Card>
          ) : (
            filteredStudents.map((student) => {
              const isExpanded = expandedStudent === student.id
              const pendingDocs = student.documents.filter((d) => d.status === "pendiente").length
              const approvedDocs = student.documents.filter((d) => d.status === "aprobado").length
              const rejectedDocs = student.documents.filter((d) => d.status === "rechazado").length

              return (
                <Card key={student.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardContent className="p-0">
                    {/* Student Header */}
                    <div className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{student.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              {student.idNumber}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {student.program}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {pendingDocs > 0 && (
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-700 border-amber-500/20">
                            {pendingDocs} Pendiente{pendingDocs !== 1 && "s"}
                          </Badge>
                        )}
                        {approvedDocs > 0 && (
                          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20">
                            {approvedDocs} Aprobado{approvedDocs !== 1 && "s"}
                          </Badge>
                        )}
                        {rejectedDocs > 0 && (
                          <Badge variant="outline" className="bg-red-500/10 text-red-700 border-red-500/20">
                            {rejectedDocs} Rechazado{rejectedDocs !== 1 && "s"}
                          </Badge>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setExpandedStudent(isExpanded ? null : student.id)}
                        >
                          {isExpanded ? (
                            <>
                              Ocultar <ChevronUp className="ml-2 h-4 w-4" />
                            </>
                          ) : (
                            <>
                              Ver Documentos <ChevronDown className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Documents List */}
                    {isExpanded && (
                      <div className="border-t bg-muted/30 p-6">
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {student.documents.map((doc) => (
                            <div
                              key={doc.id}
                              className="flex items-center justify-between rounded-lg border bg-background p-4 transition-all hover:shadow-sm"
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">{doc.name}</p>
                                  <p className="text-xs text-muted-foreground">{doc.uploadDate}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className={getStatusColor(doc.status)}>
                                  {getStatusText(doc.status)}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => setSelectedDocument({ student, document: doc })}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </div>

      {/* Document Details Dialog */}
      <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles del Documento</DialogTitle>
            <DialogDescription>Gestiona el documento de {selectedDocument?.student.name}</DialogDescription>
          </DialogHeader>
          {selectedDocument && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Nombre del Documento</label>
                  <p className="text-muted-foreground">{selectedDocument.document.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Estado</label>
                  <div className="mt-1">
                    <Badge variant="outline" className={getStatusColor(selectedDocument.document.status)}>
                      {getStatusText(selectedDocument.document.status)}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Fecha de Subida</label>
                  <p className="text-muted-foreground">{selectedDocument.document.uploadDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Estudiante</label>
                  <p className="text-muted-foreground">{selectedDocument.student.name}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button onClick={() => handleDownloadDocument(selectedDocument.document)} className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar
                </Button>
                {selectedDocument.document.status !== "aprobado" && (
                  <Button
                    onClick={() => {
                      handleApproveDocument(selectedDocument.student.id, selectedDocument.document.id)
                      setSelectedDocument(null)
                    }}
                    variant="outline"
                    className="flex-1 border-emerald-500/50 text-emerald-700 hover:bg-emerald-500/10"
                  >
                    Aprobar
                  </Button>
                )}
                {selectedDocument.document.status !== "rechazado" && (
                  <Button
                    onClick={() => {
                      handleRejectDocument(selectedDocument.student.id, selectedDocument.document.id)
                      setSelectedDocument(null)
                    }}
                    variant="outline"
                    className="flex-1 border-red-500/50 text-red-700 hover:bg-red-500/10"
                  >
                    Rechazar
                  </Button>
                )}
                <Button
                  onClick={() => {
                    handleDeleteDocument(selectedDocument.student.id, selectedDocument.document.id)
                    setSelectedDocument(null)
                  }}
                  variant="outline"
                  className="border-red-500/50 text-red-700 hover:bg-red-500/10"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Main>
  )
}
