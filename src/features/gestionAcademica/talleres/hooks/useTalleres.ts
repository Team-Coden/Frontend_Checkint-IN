// ==========================================
// Hook personalizado para gestión de Talleres
// ==========================================

import { useState, useMemo } from "react";
import type { Taller, TallerStats } from "../types";

export const useTalleres = (initialData: Taller[]) => {
  const [talleres, setTalleres] = useState<Taller[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab] = useState<string>("todos");
  const [filterEstado, setFilterEstado] = useState<string>("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Filtrado de talleres
  const filteredTalleres = useMemo(() => {
    let filtered = talleres;

    // Filter by tab (estado)
    if (activeTab !== "todos") {
      filtered = filtered.filter((taller) => taller.estado === activeTab);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (taller) =>
          taller.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          taller.codigo_titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by estado
    if (filterEstado !== "todos") {
      filtered = filtered.filter((taller) => taller.estado === filterEstado);
    }

    return filtered;
  }, [talleres, searchTerm, activeTab, filterEstado]);

  // Paginación
  const paginatedTalleres = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTalleres.slice(startIndex, endIndex);
  }, [filteredTalleres, currentPage]);

  const totalPages = Math.ceil(filteredTalleres.length / itemsPerPage);

  // Estadísticas
  const stats: TallerStats = useMemo(() => {
    return {
      total: talleres.length,
      activos: talleres.filter((t) => t.estado === "Activo").length,
      inactivos: talleres.filter((t) => t.estado === "Inactivo").length,
      enMantenimiento: talleres.filter((t) => t.estado === "En Mantenimiento").length,
    };
  }, [talleres]);

  // CRUD operations
  const addTaller = (newTaller: Taller) => {
    setTalleres([...talleres, newTaller]);
  };

  const updateTaller = (updatedTaller: Taller) => {
    setTalleres(talleres.map((t) => (t.id === updatedTaller.id ? updatedTaller : t)));
  };

  const deleteTaller = (id: number) => {
    setTalleres(talleres.filter((t) => t.id !== id));
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  return {
    talleres,
    filteredTalleres,
    paginatedTalleres,
    currentPage,
    totalPages,
    setCurrentPage,
    resetPage,
    stats,
    searchTerm,
    setSearchTerm,
    filterEstado,
    setFilterEstado,
    addTaller,
    updateTaller,
    deleteTaller,
  };
};
