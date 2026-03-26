/**
 * FeedbackCard.tsx
 * 
 * Tarjeta que muestra UN feedback individual en la lista.
 * Cada tarjeta incluye:
 *   - Categoría (mejora, error, sugerencia) con su badge de color
 *   - Estado (en revisión, resuelto, implementado) con su badge de color
 *   - Título y descripción del feedback
 *   - Información del autor y fecha
 *   - Contador de respuestas y votos totales
 *   - Botones de Me gusta / No me gusta (con contadores independientes)
 *   - Botón de Responder (abre el modal de respuesta)
 *   - Botón de Eliminar (basurero rojo)
 *   - Sección de respuestas previas (si las hay)
 */

// Importaciones de componentes UI reutilizables
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Badge } from "../../../shared/components/ui/badge"
import { Button } from "../../../shared/components/ui/button"

// Iconos de lucide-react
import {
  ThumbsUp,    // Icono de pulgar arriba (me gusta)
  ThumbsDown,  // Icono de pulgar abajo (no me gusta)
  Send,        // Icono de enviar (para botón responder)
  Clock,       // Icono de reloj (para fecha)
  Users,       // Icono de personas (para autor)
  Trash2,      // Icono de basurero (para eliminar)
} from "lucide-react"

// -------- TIPOS DE DATOS --------

/**
 * Estructura de un Feedback individual.
 * Cada feedback contiene toda esta información:
 */
interface Feedback {
  id: string           // ID único del feedback (se genera con Date.now())
  title: string        // Título corto del feedback
  description: string  // Descripción detallada
  category: string     // Categoría: 'mejora', 'error', 'sugerencia', 'otro'
  author: string       // Nombre de quien lo envió
  date: Date           // Fecha de creación
  status: string       // Estado: 'en-revisión', 'resuelto', 'implementado'
  votes: number        // Votos totales (upvotes - downvotes)
  replies: Array<{     // Lista de respuestas a este feedback
    id: string         // ID único de la respuesta
    author: string     // Autor de la respuesta
    message: string    // Texto de la respuesta
    date: Date         // Fecha de la respuesta
  }>
  userVote?: 'up' | 'down'  // Voto actual del usuario ('up', 'down', o undefined si no votó)
  upvotes?: number           // Conteo de votos positivos (me gusta)
  downvotes?: number         // Conteo de votos negativos (no me gusta)
}

/**
 * Props que recibe este componente:
 * - feedback: los datos del feedback a mostrar
 * - categories: lista de categorías para buscar el nombre de la categoría
 * - onVote: función que se llama al dar like/dislike
 * - onReply: función que se llama al presionar "Responder"
 * - onDelete: función opcional para eliminar el feedback
 */
interface FeedbackCardProps {
  feedback: Feedback
  categories: Array<{ value: string; label: string }>
  onVote: (id: string, voteType: 'up' | 'down') => void
  onReply: (id: string) => void
  onDelete?: (id: string) => void
}

export function FeedbackCard({ feedback, categories, onVote, onReply, onDelete }: FeedbackCardProps) {
  
  // -------- FUNCIONES AUXILIARES PARA COLORES Y TEXTOS --------

  /**
   * Devuelve las clases CSS de color según el estado del feedback.
   * Verde = implementado, Azul = resuelto, Amarillo = en revisión, Gris = pendiente
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implementado':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'resuelto':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'en-revisión':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  /**
   * Convierte el valor interno del estado a texto legible en español.
   * Ejemplo: 'en-revisión' → 'En Revisión'
   */
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'implementado':
        return 'Implementado'
      case 'resuelto':
        return 'Resuelto'
      case 'en-revisión':
        return 'En Revisión'
      default:
        return 'Pendiente'
    }
  }

  // -------- INTERFAZ VISUAL (JSX) --------
  return (
    // Card con efecto hover (sombra más fuerte al pasar el mouse)
    <Card className="transition-all hover:shadow-lg">

      {/* ======== ENCABEZADO: Categoría, Estado, Título y Descripción ======== */}
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Badges de categoría y estado */}
            <div className="flex items-center gap-2 mb-2">
              {/* Badge de categoría (busca el nombre en la lista de categorías) */}
              <Badge variant="secondary" className="text-xs">
                {categories.find(c => c.value === feedback.category)?.label}
              </Badge>
              {/* Badge de estado con color dinámico */}
              <Badge className={getStatusColor(feedback.status)} variant="secondary">
                {getStatusLabel(feedback.status)}
              </Badge>
            </div>
            {/* Título del feedback */}
            <CardTitle className="text-lg mb-2">{feedback.title}</CardTitle>
            {/* Descripción del feedback */}
            <CardDescription>{feedback.description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      {/* ======== CONTENIDO: Info del autor, votos y acciones ======== */}
      <CardContent className="space-y-4">
        
        {/* Fila de información: autor, fecha, contadores */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          {/* Lado izquierdo: Autor y Fecha */}
          <div className="flex items-center gap-4">
            {/* Nombre del autor con icono de personas */}
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{feedback.author}</span>
            </div>
            {/* Fecha formateada en español (día/mes/año) */}
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{feedback.date.toLocaleDateString('es-ES')}</span>
            </div>
          </div>
          {/* Lado derecho: Contadores de respuestas y votos */}
          <div className="flex items-center gap-2">
            <span>{feedback.replies.length} respuestas</span>
            <span>•</span>
            <span>{feedback.votes} votos</span>
          </div>
        </div>
        
        {/* ======== BOTONES DE ACCIÓN: Like, Dislike, Responder, Eliminar ======== */}
        <div className="flex items-center gap-2">
          
          {/* Botón ME GUSTA (👍)
              - Se pone "default" (relleno) si el usuario ya votó 'up'
              - Se pone "outline" (borde) si no ha votado o votó 'down'
              - Muestra el contador de upvotes */}
          <Button
            variant={feedback.userVote === 'up' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onVote(feedback.id, 'up')}
            className="flex items-center gap-1"
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{feedback.upvotes !== undefined ? feedback.upvotes : feedback.votes}</span>
          </Button>

          {/* Botón NO ME GUSTA (👎)
              - Misma lógica que el de arriba pero para 'down'
              - Muestra el contador de downvotes */}
          <Button
            variant={feedback.userVote === 'down' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onVote(feedback.id, 'down')}
            className="flex items-center gap-1"
          >
            <ThumbsDown className="h-4 w-4" />
            <span>{feedback.downvotes || 0}</span>
          </Button>

          {/* Botón RESPONDER - Abre el modal de respuesta */}
          <Button
            size="sm"
            onClick={() => onReply(feedback.id)}
            className="flex items-center gap-1"
          >
            <Send className="h-4 w-4" />
            <span>Responder</span>
          </Button>

          {/* Botón ELIMINAR (basurero rojo)
              - Solo se muestra si se pasó la función onDelete
              - Elimina el feedback de la lista y del localStorage */}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(feedback.id)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50/50 flex items-center gap-1 px-2"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* ======== SECCIÓN DE RESPUESTAS (solo si hay respuestas) ======== */}
        {feedback.replies.length > 0 && (
          <div className="mt-4 pt-4 border-t space-y-3">
            {/* Título de la sección */}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Respuestas</p>
            
            {/* Lista de respuestas - cada una en una cajita gris */}
            {feedback.replies.map((reply) => (
              <div key={reply.id} className="bg-muted/40 rounded-md p-3 text-sm">
                {/* Autor y fecha de la respuesta */}
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-foreground">{reply.author}</span>
                  <span className="text-xs text-muted-foreground">{reply.date.toLocaleDateString('es-ES')}</span>
                </div>
                {/* Texto de la respuesta */}
                <p className="text-muted-foreground text-sm">{reply.message}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
