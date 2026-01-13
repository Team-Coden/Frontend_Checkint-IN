"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, User, BookOpen, X, Check, File } from "lucide-react"
import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent } from "../../../shared/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/components/ui/select"
import { Label } from "../../../shared/components/ui/label"
import { Input } from "../../../shared/components/ui/input"
import Main from "@/features/main/pages/page"


interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  file: File
}

const talleres = ["Taller de Software", "Taller de Hardware", "Gestión Empresarial", "Recursos Humanos", "Contabilidad"]

const estudiantes = [
  { id: "1", name: "Juan Pérez", idNumber: "1234573" },
  { id: "2", name: "Carolin Paulino", idNumber: "4037743378" },
  { id: "3", name: "Rochael Rodriguez", idNumber: "1234873" },
  { id: "4", name: "Maria Contreras", idNumber: "7456345" },
  { id: "5", name: "José Lin", idNumber: "845742" },
  { id: "6", name: "Rafaelina Pichardo", idNumber: "9384756" },
]

const tiposDocumento = [
  "Cédula",
  "Curriculum Vitae",
  "Anexo IV",
  "Anexo V",
  "Acta de Nacimiento",
  "Cédula de Padres",
  "Tarjeta de Vacunación",
  "Certificado Médico",
  "Carta de Recomendación",
  "Otro",
]

export default function SubirDocumentosPage() {
  const [selectedTaller, setSelectedTaller] = useState<string>("")
  const [selectedEstudiante, setSelectedEstudiante] = useState<string>("")
  const [selectedTipoDoc, setSelectedTipoDoc] = useState<string>("")
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const newFiles: UploadedFile[] = Array.from(files).map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      type: file.type,
      size: file.size,
      file: file,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const handleUpload = async () => {
    if (!selectedTaller || !selectedEstudiante || uploadedFiles.length === 0) {
      alert("Por favor completa todos los campos y selecciona al menos un archivo")
      return
    }

    setIsUploading(true)

    // Simulate upload
    setTimeout(() => {
      console.log("[v0] Subiendo documentos:", {
        taller: selectedTaller,
        estudiante: selectedEstudiante,
        tipoDocumento: selectedTipoDoc,
        archivos: uploadedFiles.map((f) => f.name),
      })

      alert(`${uploadedFiles.length} documento(s) subido(s) exitosamente`)

      // Reset form
      setSelectedTaller("")
      setSelectedEstudiante("")
      setSelectedTipoDoc("")
      setUploadedFiles([])
      setIsUploading(false)
    }, 2000)
  }

  const canUpload = selectedTaller && selectedEstudiante && uploadedFiles.length > 0

  return (
    <Main>
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Subir Documentos</h1>
              <p className="text-muted-foreground">Sube los documentos y explora el portal del tutor de CheckInt</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <Card>
          <CardContent className="space-y-6 pt-6">
            {/* Selection Fields */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="taller" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Taller
                </Label>
                <Select value={selectedTaller} onValueChange={setSelectedTaller}>
                  <SelectTrigger id="taller">
                    <SelectValue placeholder="Selecciona un taller" />
                  </SelectTrigger>
                  <SelectContent>
                    {talleres.map((taller) => (
                      <SelectItem key={taller} value={taller}>
                        {taller}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estudiante" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Estudiante
                </Label>
                <Select value={selectedEstudiante} onValueChange={setSelectedEstudiante}>
                  <SelectTrigger id="estudiante">
                    <SelectValue placeholder="Selecciona un estudiante" />
                  </SelectTrigger>
                  <SelectContent>
                    {estudiantes.map((estudiante) => (
                      <SelectItem key={estudiante.id} value={estudiante.id}>
                        {estudiante.name} - {estudiante.idNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="tipo-doc" className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Tipo de Documento
                </Label>
                <Select value={selectedTipoDoc} onValueChange={setSelectedTipoDoc}>
                  <SelectTrigger id="tipo-doc">
                    <SelectValue placeholder="Selecciona el tipo de documento" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposDocumento.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Upload Area */}
            {selectedTaller && selectedEstudiante ? (
              <div className="space-y-4">
                <Label>Archivos a Subir</Label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`relative rounded-lg border-2 border-dashed transition-colors ${
                    isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
                  }`}
                >
                  <Input
                    type="file"
                    multiple
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="absolute inset-0 z-10 cursor-pointer opacity-0"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <p className="mt-4 text-lg font-medium">Arrastra archivos aquí</p>
                    <p className="mt-1 text-sm text-muted-foreground">o haz clic para seleccionar archivos</p>
                    <p className="mt-2 text-xs text-muted-foreground">PDF, DOC, DOCX, JPG, PNG (máx. 10MB)</p>
                  </div>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Archivos Seleccionados ({uploadedFiles.length})</Label>
                    <div className="space-y-2">
                      {uploadedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between rounded-lg border bg-muted/30 p-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <File className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeFile(file.id)} className="h-8 w-8">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 py-16">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <Upload className="h-10 w-10 text-primary" />
                </div>
                <p className="mt-6 text-lg font-medium text-primary">
                  ¡Selecciona un taller y un estudiante para comenzar!
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Sube los documentos y explora el portal del tutor de CheckInt
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedTaller("")
                  setSelectedEstudiante("")
                  setSelectedTipoDoc("")
                  setUploadedFiles([])
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleUpload} disabled={!canUpload || isUploading}>
                {isUploading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Subiendo...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Subir Documentos
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Formatos Aceptados</p>
                <p className="font-semibold">PDF, DOC, IMG</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Upload className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tamaño Máximo</p>
                <p className="font-semibold">10 MB por archivo</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <Check className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Verificación</p>
                <p className="font-semibold">Automática</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Main>
  )
}
