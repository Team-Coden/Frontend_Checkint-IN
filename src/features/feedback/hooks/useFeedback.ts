import { useState, useMemo } from "react";
import type { Feedback, FeedbackStats } from "../types";

interface UseFeedbackProps {
  initialData: Feedback[];
  itemsPerPage?: number;
}

export function useFeedback({ initialData, itemsPerPage = 10 }: UseFeedbackProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipo, setFilterTipo] = useState("todos");
  const [filterEstado, setFilterEstado] = useState("todos");
  const [filterPrioridad, setFilterPrioridad] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrado de feedbacks
  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((feedback) => {
      const matchesSearch = 
        feedback.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.asunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.mensaje.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.modulo.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTipo = filterTipo === "todos" || feedback.tipo === filterTipo;
      const matchesEstado = filterEstado === "todos" || feedback.estado === filterEstado;
      const matchesPrioridad = filterPrioridad === "todos" || feedback.prioridad === filterPrioridad;

      return matchesSearch && matchesTipo && matchesEstado && matchesPrioridad;
    });
  }, [feedbacks, searchTerm, filterTipo, filterEstado, filterPrioridad]);

  // Paginación
  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);
  const paginatedFeedbacks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredFeedbacks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredFeedbacks, currentPage, itemsPerPage]);

  // Estadísticas
  const stats = useMemo((): FeedbackStats => {
    return {
      total: feedbacks.length,
      pendientes: feedbacks.filter(f => f.estado === 'Pendiente').length,
      enRevision: feedbacks.filter(f => f.estado === 'En Revisión').length,
      resueltos: feedbacks.filter(f => f.estado === 'Resuelto').length,
      cerrados: feedbacks.filter(f => f.estado === 'Cerrado').length,
      quejas: feedbacks.filter(f => f.tipo === 'Queja').length,
      sugerencias: feedbacks.filter(f => f.tipo === 'Sugerencia').length,
      felicitaciones: feedbacks.filter(f => f.tipo === 'Felicitación').length,
      otros: feedbacks.filter(f => f.tipo === 'Otro').length,
    };
  }, [feedbacks]);

  // CRUD operations
  const addFeedback = (newFeedback: Omit<Feedback, 'id' | 'fechaCreacion'>) => {
    const feedback: Feedback = {
      ...newFeedback,
      id: Math.max(...feedbacks.map(f => f.id), 0) + 1,
      fechaCreacion: new Date().toISOString().split('T')[0],
    };
    setFeedbacks([...feedbacks, feedback]);
  };

  const updateFeedback = (updatedFeedback: Feedback) => {
    setFeedbacks(feedbacks.map(f => 
      f.id === updatedFeedback.id 
        ? { ...updatedFeedback, fechaActualizacion: new Date().toISOString().split('T')[0] }
        : f
    ));
  };

  const deleteFeedback = (id: number) => {
    setFeedbacks(feedbacks.filter(f => f.id !== id));
  };

  // Opciones para filtros
  const modulosDisponibles = useMemo(() => {
    const modulos = [...new Set(feedbacks.map(f => f.modulo))];
    return modulos.sort();
  }, [feedbacks]);

  return {
    // Data
    feedbacks,
    filteredFeedbacks,
    paginatedFeedbacks,
    stats,
    modulosDisponibles,
    
    // Pagination
    currentPage,
    totalPages,
    setCurrentPage,
    
    // Filters
    searchTerm,
    setSearchTerm,
    filterTipo,
    setFilterTipo,
    filterEstado,
    setFilterEstado,
    filterPrioridad,
    setFilterPrioridad,
    
    // CRUD
    addFeedback,
    updateFeedback,
    deleteFeedback,
  };
}
