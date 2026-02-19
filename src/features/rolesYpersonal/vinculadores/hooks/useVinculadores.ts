'use client';

import { useState, useMemo } from "react";
import type { Vinculador, VinculadorFormData } from "../types";
import { initialVinculadorData } from "../types/mockData";

export const useVinculadores = () => {
  const [vinculadores, setVinculadores] = useState<Vinculador[]>(initialVinculadorData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Filter logic
  const filteredVinculadores = useMemo(() => {
    return vinculadores.filter((vinculador) => {
      const matchesSearch =
        vinculador.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vinculador.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vinculador.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vinculador.nombre_centro.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "todos" || vinculador.estado === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [vinculadores, searchTerm, statusFilter]);

  // Pagination logic
  const paginatedVinculadores = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredVinculadores.slice(startIndex, endIndex);
  }, [filteredVinculadores, currentPage]);

  const totalPages = Math.ceil(filteredVinculadores.length / itemsPerPage);

  const resetPage = () => {
    setCurrentPage(1);
  };

  // Stats calculation
  const stats = useMemo(() => {
    return {
      total: vinculadores.length,
      activos: vinculadores.filter(v => v.estado === "activo").length,
      inactivos: vinculadores.filter(v => v.estado === "inactivo").length,
    };
  }, [vinculadores]);

  // CRUD operations
  const createVinculador = (newVinculador: VinculadorFormData) => {
    const vinculador: Vinculador = {
      ...newVinculador,
      id: Date.now(),
      id_contacto: Date.now(),
      fecha_creacion: new Date().toISOString().split('T')[0],
      nombre_contacto: `${newVinculador.nombre} ${newVinculador.apellido}`,
      nombre_centro: `Centro ${newVinculador.id_centro_trabajo}`,
    };
    setVinculadores([...vinculadores, vinculador]);
  };

  const updateVinculador = (updatedVinculador: Vinculador) => {
    setVinculadores(vinculadores.map((v) => (v.id === updatedVinculador.id ? updatedVinculador : v)));
  };

  const formatDate = (date?: Date) => date?.toLocaleDateString('es-ES');

  const deleteVinculador = (id: number) => {
    setVinculadores(
      vinculadores.map((v) =>
        v.id === id ? { ...v, estado: "inactivo", deletedAt: formatDate(new Date()) } : v
      )
    );
  };

  const restoreVinculador = (id: number) => {
    setVinculadores(
      vinculadores.map((v) =>
        v.id === id ? { ...v, estado: "activo", deletedAt: undefined } : v
      )
    );
  };

  const permanentlyDeleteVinculador = (id: number) => {
    setVinculadores(vinculadores.filter((v) => v.id !== id));
  };

  return {
    vinculadores,
    filteredVinculadores,
    paginatedVinculadores,
    currentPage,
    totalPages,
    setCurrentPage,
    resetPage,
    stats,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    createVinculador,
    updateVinculador,
    deleteVinculador,
    restoreVinculador,
    permanentlyDeleteVinculador,
  };
};
