import { Eye, Edit, Trash2, Star } from "lucide-react";
import { Button } from "../../../shared/components/ui/button";
import { Badge } from "../../../shared/components/ui/badge";
import type { Feedback } from "../types";

interface FeedbackTableRowProps {
  feedback: Feedback;
  onView: (feedback: Feedback) => void;
  onEdit: (feedback: Feedback) => void;
  onDelete: (feedback: Feedback) => void;
}

export function FeedbackTableRow({ feedback, onView, onEdit, onDelete }: FeedbackTableRowProps) {
  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "Queja":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">
            Queja
          </Badge>
        );
      case "Sugerencia":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">
            Sugerencia
          </Badge>
        );
      case "Felicitación":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
            Felicitación
          </Badge>
        );
      case "Otro":
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200">
            Otro
          </Badge>
        );
      default:
        return <Badge variant="outline">{tipo}</Badge>;
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200">
            Pendiente
          </Badge>
        );
      case "En Revisión":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">
            En Revisión
          </Badge>
        );
      case "Resuelto":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
            Resuelto
          </Badge>
        );
      case "Cerrado":
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200">
            Cerrado
          </Badge>
        );
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  const getPrioridadBadge = (prioridad: string) => {
    switch (prioridad) {
      case "Urgente":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">
            Urgente
          </Badge>
        );
      case "Alta":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200">
            Alta
          </Badge>
        );
      case "Media":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200">
            Media
          </Badge>
        );
      case "Baja":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
            Baja
          </Badge>
        );
      default:
        return <Badge variant="outline">{prioridad}</Badge>;
    }
  };

  return (
    <tr className="hover:bg-muted/50 transition-colors">
      <td className="font-medium">{feedback.id}</td>
      <td>
        <div>
          <div className="font-medium">{feedback.usuario}</div>
          <div className="text-sm text-muted-foreground">{feedback.email}</div>
        </div>
      </td>
      <td>{getTipoBadge(feedback.tipo)}</td>
      <td>
        <div>
          <div className="font-medium truncate max-w-[200px]" title={feedback.asunto}>
            {feedback.asunto}
          </div>
          <div className="text-sm text-muted-foreground">{feedback.modulo}</div>
        </div>
      </td>
      <td>{getPrioridadBadge(feedback.prioridad)}</td>
      <td>{getEstadoBadge(feedback.estado)}</td>
      <td>{feedback.fechaCreacion}</td>
      <td className="text-right">
        <div className="flex items-center justify-end gap-2">
          {feedback.calificacion && (
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{feedback.calificacion}</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(feedback)}
            className="gap-1"
          >
            <Eye className="h-4 w-4" />
            Ver
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(feedback)}
            className="gap-1"
          >
            <Edit className="h-4 w-4" />
            Editar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(feedback)}
            className="gap-1 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
            Eliminar
          </Button>
        </div>
      </td>
    </tr>
  );
}
