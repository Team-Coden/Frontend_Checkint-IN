"use client";

import { useState } from "react";
import { MessageSquare, Search, Filter, Download, Plus } from "lucide-react";
import { Button } from "../../../shared/components/ui/button";
import { Card, CardHeader, CardContent } from "../../../shared/components/ui/card";
import { Input } from "../../../shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/components/ui/select";

import { useFeedback } from "../hooks/useFeedback";
import { StatsCards } from "../components/StatsCards";
import { FeedbackCard } from "../components/FeedbackCard";
import {
  CreateFeedbackDialog,
  ViewFeedbackDialog,
  DeleteFeedbackDialog,
} from "../components/FeedbackDialogs";
import type { Feedback } from "../types";
import Main from "@/features/main/pages/page";

// ==========================================
// Datos dummy para desarrollo
// ==========================================
const initialData: Feedback[] = [
  {
    id: 1,
    usuario: "Juan Pérez",
    email: "juan.perez@email.com",
    tipo: "Sugerencia",
    modulo: "Dashboard",
    asunto: "Mejorar visualización de métricas",
    mensaje: "Sería útil poder personalizar los widgets del dashboard y poder exportar los gráficos en diferentes formatos.",
    estado: "Pendiente",
    prioridad: "Media",
    fechaCreacion: "2025-01-15",
  },
  {
    id: 2,
    usuario: "María García",
    email: "maria.garcia@email.com",
    tipo: "Queja",
    modulo: "Documentación",
    asunto: "Problema al subir archivos grandes",
    mensaje: "El sistema se bloquea cuando intento subir archivos mayores a 10MB. Necesito poder subir documentos más grandes para mi trabajo.",
    estado: "En Revisión",
    prioridad: "Alta",
    fechaCreacion: "2025-02-20",
    fechaActualizacion: "2025-02-21",
  },
  {
    id: 3,
    usuario: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    tipo: "Felicitación",
    modulo: "Evaluaciones",
    asunto: "Excelente sistema de calificación",
    mensaje: "El nuevo sistema de evaluaciones es muy intuitivo y ha mejorado mucho nuestra productividad. ¡Felicidades al equipo de desarrollo!",
    estado: "Resuelto",
    prioridad: "Baja",
    fechaCreacion: "2025-03-10",
    respuesta: "Gracias por tu feedback. Nos alegra que el sistema te sea útil.",
    calificacion: 5,
  },
  {
    id: 4,
    usuario: "Ana Martínez",
    email: "ana.martinez@email.com",
    tipo: "Sugerencia",
    modulo: "Pasantías",
    asunto: "Notificaciones automáticas",
    mensaje: "Sería útil recibir notificaciones automáticas cuando se acerca la fecha de entrega de informes de pasantías.",
    estado: "Pendiente",
    prioridad: "Media",
    fechaCreacion: "2025-01-20",
  },
  {
    id: 5,
    usuario: "Luis Hernández",
    email: "luis.hernandez@email.com",
    tipo: "Queja",
    modulo: "Personal",
    asunto: "Error en asignación de roles",
    mensaje: "No puedo asignar roles a nuevos usuarios. El sistema muestra un error de permisos incluso siendo administrador.",
    estado: "En Revisión",
    prioridad: "Urgente",
    fechaCreacion: "2025-02-15",
    fechaActualizacion: "2025-02-16",
  },
  {
    id: 6,
    usuario: "Sofía López",
    email: "sofia.lopez@email.com",
    tipo: "Sugerencia",
    modulo: "Gestión Institucional",
    asunto: "Reportes personalizados",
    mensaje: "Necesitaría poder generar reportes personalizados con filtros específicos para presentar a la dirección.",
    estado: "Resuelto",
    prioridad: "Media",
    fechaCreacion: "2025-03-05",
    respuesta: "Hemos agregado la funcionalidad de reportes personalizados. Revisa la nueva sección en el menú.",
    calificacion: 4,
  },
  {
    id: 7,
    usuario: "Diego Torres",
    email: "diego.torres@email.com",
    tipo: "Felicitación",
    modulo: "Dashboard",
    asunto: "Rendimiento mejorado",
    mensaje: "El dashboard ahora carga mucho más rápido. La mejora de rendimiento es muy notable.",
    estado: "Cerrado",
    prioridad: "Baja",
    fechaCreacion: "2025-01-25",
    respuesta: "Gracias por tu comentario. Seguimos trabajando en optimizar el rendimiento.",
    calificacion: 5,
  },
  {
    id: 8,
    usuario: "Lucía Ramírez",
    email: "lucia.ramirez@email.com",
    tipo: "Otro",
    modulo: "Soporte",
    asunto: "Duda sobre exportación de datos",
    mensaje: "¿Es posible exportar todos los datos de una vez o solo se pueden exportar por módulos específicos?",
    estado: "Resuelto",
    prioridad: "Baja",
    fechaCreacion: "2025-02-10",
    respuesta: "Actualmente solo se puede exportar por módulos, pero estamos evaluando agregar exportación completa.",
    calificacion: 3,
  },
  {
    id: 9,
    usuario: "Roberto Silva",
    email: "roberto.silva@email.com",
    tipo: "Sugerencia",
    modulo: "Evaluaciones",
    asunto: "Plantillas de evaluación",
    mensaje: "Podrían agregar plantillas predefinidas para diferentes tipos de evaluaciones para ahorrar tiempo.",
    estado: "Pendiente",
    prioridad: "Media",
    fechaCreacion: "2025-03-12",
  },
  {
    id: 10,
    usuario: "Patricia Morales",
    email: "patricia.morales@email.com",
    tipo: "Queja",
    modulo: "Documentación",
    asunto: "Búsqueda de documentos lenta",
    mensaje: "La búsqueda de documentos tarda demasiado tiempo cuando hay muchos archivos cargados.",
    estado: "En Revisión",
    prioridad: "Alta",
    fechaCreacion: "2025-02-25",
    fechaActualizacion: "2025-02-26",
  },
  {
    id: 11,
    usuario: "Jorge Vargas",
    email: "jorge.vargas@email.com",
    tipo: "Sugerencia",
    modulo: "Pasantías",
    asunto: "Historial de cambios",
    mensaje: "Sería útil tener un historial de todos los cambios realizados en las pasantías para auditoría.",
    estado: "Pendiente",
    prioridad: "Baja",
    fechaCreacion: "2025-01-18",
  },
  {
    id: 12,
    usuario: "Elena Castro",
    email: "elena.castro@email.com",
    tipo: "Felicitación",
    modulo: "Soporte",
    asunto: "Excelente atención al cliente",
    mensaje: "El equipo de soporte respondió muy rápido a mi problema y lo solucionaron de inmediato.",
    estado: "Resuelto",
    prioridad: "Baja",
    fechaCreacion: "2025-03-08",
    respuesta: "Gracias por tu confianza. Nuestro objetivo es siempre brindar el mejor servicio.",
    calificacion: 5,
  }
];

export default function FeedbackPage() {
  const {
    filteredFeedbacks,
    stats,
    modulosDisponibles,
    searchTerm,
    setSearchTerm,
    filterTipo,
    setFilterTipo,
    filterEstado,
    setFilterEstado,
    filterPrioridad,
    setFilterPrioridad,
    addFeedback,
    deleteFeedback,
  } = useFeedback({ initialData });

  // Estados locales para control de UI
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  // Handlers de acciones
  const handleView = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsViewDialogOpen(true);
  };

  const handleDeleteRequest = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedFeedback) {
      deleteFeedback(selectedFeedback.id);
      setIsDeleteDialogOpen(false);
    }
  };

  // Export functionality
  const handleExport = () => {
    const csvContent = [
      ['ID', 'Usuario', 'Email', 'Tipo', 'Módulo', 'Asunto', 'Mensaje', 'Estado', 'Prioridad', 'Fecha Creación', 'Fecha Actualización'],
      ...filteredFeedbacks.map(feedback => [
        feedback.id,
        feedback.usuario,
        feedback.email,
        feedback.tipo,
        feedback.modulo,
        feedback.asunto,
        feedback.mensaje.replace(/\n/g, ' '), // Reemplazar saltos de línea
        feedback.estado,
        feedback.prioridad,
        feedback.fechaCreacion,
        feedback.fechaActualizacion || ''
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `feedback_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset page when filters change
  const handleFilterChange = (value: string, filterType: 'tipo' | 'estado' | 'prioridad') => {
    switch (filterType) {
      case 'tipo':
        setFilterTipo(value);
        break;
      case 'estado':
        setFilterEstado(value);
        break;
      case 'prioridad':
        setFilterPrioridad(value);
        break;
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <Main>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground text-balance">
                Centro de Feedback
              </h1>
            </div>
            <p className="text-muted-foreground ml-12">
              Gestiona el feedback y sugerencias de los usuarios sobre todos los módulos del sistema
            </p>
          </div>

          {/* Stats Cards */}
          <StatsCards stats={stats} />

          {/* Main Content */}
          <Card className="border">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExport}
                    className="gap-2 bg-transparent text-foreground"
                  >
                    <Download className="h-4 w-4" /> Exportar
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setIsDialogOpen(true)}
                    className="gap-2 bg-primary hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4" /> Nuevo Feedback
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por usuario, email, asunto o mensaje..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex gap-2">
                  <Select value={filterTipo} onValueChange={(value) => handleFilterChange(value, 'tipo')}>
                    <SelectTrigger className="w-full md:w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="Queja">Queja</SelectItem>
                      <SelectItem value="Sugerencia">Sugerencia</SelectItem>
                      <SelectItem value="Felicitación">Felicitación</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterEstado} onValueChange={(value) => handleFilterChange(value, 'estado')}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                      <SelectItem value="En Revisión">En Revisión</SelectItem>
                      <SelectItem value="Resuelto">Resuelto</SelectItem>
                      <SelectItem value="Cerrado">Cerrado</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterPrioridad} onValueChange={(value) => handleFilterChange(value, 'prioridad')}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todas</SelectItem>
                      <SelectItem value="Urgente">Urgente</SelectItem>
                      <SelectItem value="Alta">Alta</SelectItem>
                      <SelectItem value="Media">Media</SelectItem>
                      <SelectItem value="Baja">Baja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                Mostrando {filteredFeedbacks.length} feedbacks encontrados
              </p>

              {/* Feedback Cards por Sección */}
              {filteredFeedbacks.length > 0 ? (
                <div className="space-y-8">
                  {/* Sección Pendientes */}
                  <div>
                    <h3 className="text-lg font-semibold text-orange-600 mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      Pendientes ({filteredFeedbacks.filter(f => f.estado === 'Pendiente').length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredFeedbacks
                        .filter(feedback => feedback.estado === 'Pendiente')
                        .map((feedback) => (
                          <FeedbackCard
                            key={feedback.id}
                            feedback={feedback}
                            onView={handleView}
                            onDelete={handleDeleteRequest}
                          />
                        ))}
                    </div>
                  </div>

                  {/* Sección En Revisión */}
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      En Revisión ({filteredFeedbacks.filter(f => f.estado === 'En Revisión').length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredFeedbacks
                        .filter(feedback => feedback.estado === 'En Revisión')
                        .map((feedback) => (
                          <FeedbackCard
                            key={feedback.id}
                            feedback={feedback}
                            onView={handleView}
                            onDelete={handleDeleteRequest}
                          />
                        ))}
                    </div>
                  </div>

                  {/* Sección Resueltos */}
                  <div>
                    <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Resueltos ({filteredFeedbacks.filter(f => f.estado === 'Resuelto').length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredFeedbacks
                        .filter(feedback => feedback.estado === 'Resuelto')
                        .map((feedback) => (
                          <FeedbackCard
                            key={feedback.id}
                            feedback={feedback}
                            onView={handleView}
                            onDelete={handleDeleteRequest}
                          />
                        ))}
                    </div>
                  </div>

                  {/* Sección Cerrados */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      Cerrados ({filteredFeedbacks.filter(f => f.estado === 'Cerrado').length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredFeedbacks
                        .filter(feedback => feedback.estado === 'Cerrado')
                        .map((feedback) => (
                          <FeedbackCard
                            key={feedback.id}
                            feedback={feedback}
                            onView={handleView}
                            onDelete={handleDeleteRequest}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border py-16 text-center">
                  <div className="p-4 rounded-full bg-muted mb-4 inline-block">
                    <Search className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No hay feedbacks que coincidan
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Intenta ajustar los filtros o crea un nuevo feedback
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* --- Dialogos y Modales --- */}
        
        <DeleteFeedbackDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
          feedbackAsunto={selectedFeedback?.asunto}
        />

        <CreateFeedbackDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={addFeedback}
          modulos={modulosDisponibles}
        />

        <ViewFeedbackDialog
          open={isViewDialogOpen}
          onOpenChange={setIsViewDialogOpen}
          feedback={selectedFeedback}
        />
      </div>
    </Main>
  );
}
