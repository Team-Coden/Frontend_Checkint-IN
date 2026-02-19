'use client';

import { useState, useMemo } from "react";
import type { Estudiante, EstudianteStats } from "../types";

export const useEstudiantes = (initialData: Estudiante[]) => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab] = useState<string>("todos");
  const [filterEstado, setFilterEstado] = useState<string>("todos");
  const [filterCarrera] = useState<string>("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const filteredEstudiantes = useMemo(() => {
    return estudiantes.filter((estudiante) => {
      const matchesSearch =
        estudiante.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estudiante.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estudiante.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estudiante.cedula.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (estudiante.carrera &&
          estudiante.carrera.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesTab =
        activeTab === "todos" ||
        estudiante.estado.toLowerCase() === activeTab.toLowerCase();

      const matchesFilter =
        filterEstado === "todos" || estudiante.estado === filterEstado;

      const matchesCarrera =
        filterCarrera === "todos" || estudiante.carrera === filterCarrera;

      return matchesSearch && matchesTab && matchesFilter && matchesCarrera;
    });
  }, [estudiantes, searchTerm, activeTab, filterEstado, filterCarrera]);

  // Pagination logic
  const paginatedEstudiantes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredEstudiantes.slice(startIndex, endIndex);
  }, [filteredEstudiantes, currentPage]);

  const totalPages = Math.ceil(filteredEstudiantes.length / itemsPerPage);

  const resetPage = () => {
    setCurrentPage(1);
  };

  const stats = useMemo(
    (): EstudianteStats => ({
      total: estudiantes.length,
      activos: estudiantes.filter((e) => e.estado === "Activo").length,
      inactivos: estudiantes.filter((e) => e.estado === "Inactivo").length,
      suspendidos: estudiantes.filter((e) => e.estado === "Suspendido").length,
    }),
    [estudiantes]
  );

  const addEstudiante = (newEstudiante: Omit<Estudiante, "id" | "fechaIngreso">) => {
    const estudiante: Estudiante = {
      ...newEstudiante,
      id: Date.now(),
      fechaIngreso: new Date().toISOString().split("T")[0],
    };
    setEstudiantes([...estudiantes, estudiante]);
  };

  const updateEstudiante = (updatedEstudiante: Estudiante) => {
    setEstudiantes(estudiantes.map((e) => (e.id === updatedEstudiante.id ? updatedEstudiante : e)));
  };

  const deleteEstudiante = (id: number) => {
    setEstudiantes(estudiantes.filter((e) => e.id !== id));
  };

  return {
    estudiantes,
    filteredEstudiantes,
    paginatedEstudiantes,
    currentPage,
    totalPages,
    setCurrentPage,
    resetPage,
    stats,
    searchTerm,
    setSearchTerm,
    filterEstado,
    setFilterEstado,
    addEstudiante,
    updateEstudiante,
    deleteEstudiante,
  };
};
