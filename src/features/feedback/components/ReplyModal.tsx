import { Button } from "../../../shared/components/ui/button"
import {
  Send,
  X,
  MessageSquare,
  User,
} from "lucide-react"
import { useState } from "react"

interface Reply {
  id: string
  author: string
  message: string
  date: Date
}

interface Feedback {
  id: string
  title: string
  description: string
  category: string
  author: string
  date: Date
  status: string
  votes: number
  replies: Reply[]
}

interface ReplyModalProps {
  feedback: Feedback | null
  onClose: () => void
  onSubmit: (feedbackId: string, reply: string) => void
}

export function ReplyModal({ feedback, onClose, onSubmit }: ReplyModalProps) {
  const [replyText, setReplyText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!feedback) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyText.trim()) return

    setIsSubmitting(true)
    try {
      await onSubmit(feedback.id, replyText.trim())
      setReplyText('')
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">{feedback.title}</h3>
              <p className="text-sm text-muted-foreground">
                Respondiendo a {feedback.author}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col h-[60vh]">
          {/* Feedback Original */}
          <div className="p-6 border-b bg-muted/30">
            <div className="flex items-start gap-3">
              <div className="shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
              </div>
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

          {/* Respuestas Anteriores */}
          <div className="flex-1 overflow-y-auto p-6">
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">
              Respuestas anteriores ({feedback.replies.length})
            </h4>
            
            {feedback.replies.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No hay respuestas todavía</p>
              </div>
            ) : (
              <div className="space-y-4">
                {feedback.replies.map((reply) => (
                  <div key={reply.id} className="flex items-start gap-3">
                    <div className="shrink-0">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                    </div>
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

          {/* Formulario de Respuesta */}
          <div className="p-6 border-t">
            <form onSubmit={handleSubmit} className="space-y-4">
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
              
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
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
