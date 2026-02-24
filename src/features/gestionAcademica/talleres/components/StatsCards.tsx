// ==========================================
// Componente de tarjetas de estadísticas
// ==========================================

"use client";

import { Card, CardContent } from "../../../../shared/components/ui/card";
import { Wrench, CheckCircle, User, XCircle } from "lucide-react";
import type { TallerStats } from "../types";

export const StatsCards = ({ stats }: { stats: TallerStats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total */}
      <Card className="border bg-card hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Talleres</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stats.total}</p>
            </div>
            <div className="p-3 rounded-full bg-slate-100">
              <Wrench className="h-5 w-5 text-slate-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activos */}
      <Card className="border bg-card hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Activos</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.activos}</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-100">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inactivos */}
      <Card className="border bg-card hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Inactivos</p>
              <p className="text-2xl font-bold text-gray-600 mt-1">{stats.inactivos}</p>
            </div>
            <div className="p-3 rounded-full bg-gray-100">
              <XCircle className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* En Mantenimiento */}
      <Card className="border bg-card hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">En Mantenimiento</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">{stats.enMantenimiento}</p>
            </div>
            <div className="p-3 rounded-full bg-amber-100">
              <User className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
