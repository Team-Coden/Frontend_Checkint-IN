import { Eye, Trash2, Star, Calendar, User, Mail } from "lucide-react";
import { Button } from "../../../shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card";
import type { Feedback } from "../types";

interface FeedbackCardProps {
  feedback: Feedback;
  onView: (feedback: Feedback) => void;
  onDelete: (feedback: Feedback) => void;
}

export function FeedbackCard({ 
  feedback, 
  onView, 
  onDelete
}: FeedbackCardProps) {
  return (
    <Card className="border hover:shadow-lg transition-all duration-200 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded">
                {feedback.tipo}
              </span>
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded">
                {feedback.prioridad}
              </span>
            </div>
            <CardTitle className="text-base leading-tight line-clamp-2">
              {feedback.asunto}
            </CardTitle>
          </div>
          
          {/* Calificación si existe */}
          {feedback.calificacion && (
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{feedback.calificacion}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        {/* Usuario y Email */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-3 w-3 text-muted-foreground" />
            <span className="font-medium">{feedback.usuario}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-3 w-3" />
            <span className="truncate">{feedback.email}</span>
          </div>
        </div>

        {/* Mensaje */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Mensaje:</p>
          <p className="text-sm line-clamp-3 bg-muted/50 p-2 rounded">
            {feedback.mensaje}
          </p>
        </div>

        {/* Módulo y Fecha */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="font-medium">{feedback.modulo}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{feedback.fechaCreacion}</span>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2 pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(feedback)}
            className="gap-1 flex-1"
          >
            <Eye className="h-3 w-3" />
            Ver
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(feedback)}
            className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-3 w-3" />
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
