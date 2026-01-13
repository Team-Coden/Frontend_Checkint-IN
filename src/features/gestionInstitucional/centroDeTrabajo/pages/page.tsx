"use client"

import { useState } from "react"
import { StatsCards } from "../components/stats-cards"
import { ActionButtons } from "../components/action-buttons"
import { SearchBar } from "../components/search-bar"
import { WorkCentersTable } from "../components/work-centers-table"
import Main from "@/features/main/pages/page"

export default function CentroDeTrabajoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  return (
    <Main>
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="font-sans text-4xl font-bold tracking-tight text-balance">Centro de Trabajo</h1>
          <p className="text-muted-foreground text-lg">
            Gestiona y administra todos los centros de trabajo de la empresa
          </p>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Action Buttons */}
        <ActionButtons />

        {/* Search Bar */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Work Centers Table */}
        <WorkCentersTable searchTerm={searchTerm} statusFilter={statusFilter} />
      </div>
    </div>
    </Main>
  )
}
