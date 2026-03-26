/**
 * ReplyModal.tsx
 * 
 * Modal (ventana emergente) que se abre cuando el usuario presiona "Responder" en un feedback.
 * Muestra:
 *   1. El feedback original (título, autor, descripción)
 *   2. Las respuestas anteriores que ya existen
 *   3. Un campo de texto para escribir una nueva respuesta
 *   4. Botones de "Cancelar" y "Enviar Respuesta"
 */

// Importaciones
import { Button } from "../../../shared/components/ui/button"
import {
  Send,           // Icono de enviar
  X,              // Icono de cerrar (X)
  MessageSquare,  // Icono de mensaje
  User,           // Icono de usuario (avatar)
} from "lucide-react"
import { useState } from "react"

// -------- TIPOS DE DATOS --------

/** Estructura de una respuesta individual */
interface Reply {
  id: string       // ID único de la respuesta
  author: string   // Nombre del autor
  message: string  // Texto de la respuesta
  date: Date       // Fecha de la respuesta
}

/** Estructura del feedback al que se está respondiendo */
interface Feedback {
  id: string          // ID único del feedback
  title: string       // Título del feedback
  description: string // Descripción del feedback
  category: string    // Categoría del feedback
  author: string      // Autor del feedback
  date: Date          // Fecha del feedback
  status: string      // Estado del feedback
  votes: number       // Votos del feedback
  replies: Reply[]    // Lista de respuestas existentes
}

/**
 * Props que recibe este componente:
 * - feedback: el feedback al que se va a responder (null si el modal está cerrado)
 * - onClose: función para cerrar el modal
 * - onSubmit: función que se llama al enviar la respuesta (recibe el ID del feedback y el texto)
 */
interface ReplyModalProps {
  feedback: Feedback | null   // null = modal cerrado
  onClose: () => void
  onSubmit: (feedbackId: string, reply: string) => void
}

export function ReplyModal({ feedback, onClose, onSubmit }: ReplyModalProps) {
  // Estado para el texto que el usuario escribe en el campo de respuesta
  const [replyText, setReplyText] = useState('')

  // Estado para controlar si se está enviando (deshabilita botones)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Si no hay feedback seleccionado, no se renderiza nada (modal cerrado)
  if (!feedback) return null

  /**
   * Función que se ejecuta al enviar la respuesta.
   * 1. Valida que el texto no esté vacío
   * 2. Llama a onSubmit para guardar la respuesta
   * 3. Limpia el campo de texto
   * 4. Cierra el modal
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyText.trim()) return  // No enviar si está vacío

    setIsSubmitting(true)
    try {
      await onSubmit(feedback.id, replyText.trim())  // Envía la respuesta al componente padre
      setReplyText('')   // Limpia el campo de texto
      onClose()          // Cierra el modal
    } finally {
      setIsSubmitting(false)  // Siempre desactiva el estado de envío
    }
  }

  // -------- INTERFAZ VISUAL (JSX) --------
  return (
    // Fondo oscuro semi-transparente que cubre toda la pantalla
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      
      {/* Contenedor del modal (caja blanca centrada) */}
      <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        
        {/* ======== ENCABEZADO DEL MODAL ======== */}
        <div className="flex items-center justify-between p-6 border-b">
          {/* Título del feedback y a quién se responde */}
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">{feedback.title}</h3>
              <p className="text-sm text-muted-foreground">
                Respondiendo a {feedback.author}
              </p>
            </div>
          </div>
          {/* Botón X para cerrar el modal */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* ======== CUERPO DEL MODAL ======== */}
        <div className="flex flex-col h-[60vh]">
          
          {/* ---- Feedback Original (el mensaje al que se responde) ---- */}
          <div className="p-6 border-b bg-muted/30">
            <div className="flex items-start gap-3">
              {/* Avatar del autor */}
              <div className="shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
              </div>
              {/* Contenido del feedback original */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">{feedback.author}</span>
                  <span className="text-sm text-muted-foreground">
                    {feedback.date.toLocaleDateString('es-ES')}
                  </span>
                </div>
                <p className="text-sm">{feedback.description}</p>
              </div>
            </div>
          </div>

          {/* ---- Respuestas Anteriores (lista scrolleable) ---- */}
          <div className="flex-1 overflow-y-auto p-6">
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">
              Respuestas anteriores ({feedback.replies.length})
            </h4>
            
            {/* Si no hay respuestas, muestra un mensaje vacío */}
            {feedback.replies.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No hay respuestas todavía</p>
              </div>
            ) : (
              // Si hay respuestas, las muestra una por una
              <div className="space-y-4">
                {feedback.replies.map((reply) => (
                  <div key={reply.id} className="flex items-start gap-3">
                    {/* Avatar de quien respondió */}
                    <div className="shrink-0">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                    </div>
                    {/* Contenido de la respuesta */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{reply.author}</span>
                        <span className="text-sm text-muted-foreground">
                          {reply.date.toLocaleDateString('es-ES')}
                        </span>
                      </div>
                      <p className="text-sm">{reply.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ---- Formulario para Escribir una Nueva Respuesta ---- */}
          <div className="p-6 border-t">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campo de texto para la respuesta */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tu respuesta
                </label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Escribe tu respuesta aquí..."
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  required
                />
              </div>
              
              {/* Botones de Cancelar y Enviar */}
              <div className="flex justify-end gap-2">
                {/* Botón Cancelar - cierra el modal sin enviar */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                {/* Botón Enviar - envía la respuesta */}
                <Button
                  type="submit"
                  disabled={!replyText.trim() || isSubmitting}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Enviando...' : 'Enviar Respuesta'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
