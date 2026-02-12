"use client";

import { TableCell, TableRow } from "../../../../shared/components/ui/table";
import {
  Building2,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "../../../../shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../shared/components/ui/dropdown-menu";
import type { Pasantia } from "../types";

interface Props {
  pasantia: Pasantia;
  onView: (pasantia: Pasantia) => void;
  onEdit: (pasantia: Pasantia) => void;
  onDelete: (id: string) => void;
  onUpdateEstado: (id: string, estado: Pasantia["estado"]) => void;
}

const getEstadoBadge = (estado: Pasantia["estado"]) => {
  const styles = {
    activa: "bg-emerald-50 text-emerald-700 border-emerald-200",
    completada: "bg-blue-50 text-blue-700 border-blue-200",
    suspendida: "bg-red-50 text-red-700 border-red-200",
    pendiente: "bg-amber-50 text-amber-700 border-amber-200",
  };
  const icons = {
    activa: <CheckCircle className="h-3.5 w-3.5" />,
    completada: <CheckCircle className="h-3.5 w-3.5" />,
    suspendida: <AlertCircle className="h-3.5 w-3.5" />,
    pendiente: <AlertCircle className="h-3.5 w-3.5" />,
  };
  const labels = {
    activa: "Activa",
    completada: "Completada",
    suspendida: "Suspendida",
    pendiente: "Pendiente",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[estado]}`}>
      {icons[estado]}
      {labels[estado]}
    </span>
  );
};

export const PasantiaTableRow = ({ pasantia, onView, onEdit, onDelete, onUpdateEstado }: Props) => (
  <TableRow className="hover:bg-muted/30">
    <TableCell className="font-medium text-primary">{pasantia.id}</TableCell>
    <TableCell>
      <div>
        <p className="font-medium">{pasantia.estudiante}</p>
        <p className="text-xs text-muted-foreground">{pasantia.matricula}</p>
      </div>
    </TableCell>
    <TableCell>{pasantia.taller}</TableCell>
    <TableCell>
      <div className="flex items-center gap-2">
        <Building2 className="h-4 w-4 text-muted-foreground" />
        {pasantia.centroTrabajo}
      </div>
    </TableCell>
    <TableCell>{pasantia.tutor}</TableCell>
    <TableCell>
      <div className="w-32">
        <div className="flex items-center justify-between text-xs mb-1">
          <span>{pasantia.horasCompletadas}h</span>
          <span className="text-muted-foreground">{pasantia.horasRequeridas}h</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${(pasantia.horasCompletadas / pasantia.horasRequeridas) * 100}%` }}
          />
        </div>
      </div>
    </TableCell>
    <TableCell>{getEstadoBadge(pasantia.estado)}</TableCell>
    <TableCell className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onView(pasantia)}>
            <Eye className="h-4 w-4 mr-2" />
            Ver detalles
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdit(pasantia)}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </DropdownMenuItem>
          {pasantia.estado === "activa" && (
            <>
              <DropdownMenuItem onClick={() => onUpdateEstado(pasantia.id, "completada")}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Marcar completada
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdateEstado(pasantia.id, "suspendida")}>
                <AlertCircle className="h-4 w-4 mr-2" />
                Suspender
              </DropdownMenuItem>
            </>
          )}
          {pasantia.estado === "pendiente" && (
            <DropdownMenuItem onClick={() => onUpdateEstado(pasantia.id, "activa")}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Activar
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => onDelete(pasantia.id)}
            className="text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
);
