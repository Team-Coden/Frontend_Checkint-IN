'use client';

import { useState, useMemo } from "react";
import type { Supervisor, SupervisorStats, SupervisorFormData } from "../types";
import { initialSupervisorData } from "../types/mockData";

export const useSupervisores = () => {
  const [supervisores, setSupervisores] = useState<Supervisor[]>(initialSupervisorData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Filter logic
  const filteredSupervisores = useMemo(() => {
    return supervisores.filter((supervisor) => {
      const matchesSearch =
        supervisor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supervisor.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supervisor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supervisor.nombre_centro.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "todos" || supervisor.estado === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [supervisores, searchTerm, statusFilter]);

  // Pagination logic
  const paginatedSupervisores = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredSupervisores.slice(startIndex, endIndex);
  }, [filteredSupervisores, currentPage]);

  const totalPages = Math.ceil(filteredSupervisores.length / itemsPerPage);

  const resetPage = () => {
    setCurrentPage(1);
  };

  // Stats calculation
  const stats: SupervisorStats = useMemo(() => {
    return {
      total: supervisores.length,
      activos: supervisores.filter(s => s.estado === "activo").length,
      inactivos: supervisores.filter(s => s.estado === "inactivo").length,
    };
  }, [supervisores]);

  // CRUD operations
  const addSupervisor = (newSupervisor: SupervisorFormData) => {
    const supervisor: Supervisor = {
      ...newSupervisor,
      id: `S-${Date.now()}`,
      nombre_centro: `Centro ${newSupervisor.id_centro_trabajo}`,
      fecha_contratacion: new Date().toISOString().split('T')[0],
      estado: "activo",
    };
    setSupervisores([...supervisores, supervisor]);
  };

  const updateSupervisor = (updatedSupervisor: Supervisor) => {
    setSupervisores(supervisores.map((s) => (s.id === updatedSupervisor.id ? updatedSupervisor : s)));
  };

  const formatDate = (date?: Date) => date?.toLocaleDateString('es-ES');

  const deleteSupervisor = (id: string) => {
    setSupervisores(
      supervisores.map((s) =>
        s.id === id ? { ...s, estado: "inactivo", deletedAt: formatDate(new Date()) } : s
      )
    );
  };

  const restoreSupervisor = (id: string) => {
    setSupervisores(
      supervisores.map((s) =>
        s.id === id ? { ...s, estado: "activo", deletedAt: undefined } : s
      )
    );
  };

  const permanentlyDeleteSupervisor = (id: string) => {
    setSupervisores(supervisores.filter((s) => s.id !== id));
  };

  return {
    supervisores,
    filteredSupervisores,
    paginatedSupervisores,
    currentPage,
    totalPages,
    setCurrentPage,
    resetPage,
    stats,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    addSupervisor,
    updateSupervisor,
    deleteSupervisor,
    restoreSupervisor,
    permanentlyDeleteSupervisor,
  };
};
