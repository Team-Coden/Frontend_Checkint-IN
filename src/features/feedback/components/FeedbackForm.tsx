import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Button } from "../../../shared/components/ui/button"
import {
  Send,
  MessageSquare,
  AlertCircle,
  Lightbulb,
  TrendingUp,
} from "lucide-react"
import { useState } from "react"

interface FeedbackFormProps {
  onSubmit: (feedback: {
    type: string
    title: string
    description: string
  }) => void
}

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: ''
  })

  const feedbackTypes = [
    { value: 'mejora', label: 'Mejora', icon: TrendingUp },
    { value: 'error', label: 'Error', icon: AlertCircle },
    { value: 'sugerencia', label: 'Sugerencia', icon: Lightbulb },
    { value: 'otro', label: 'Otro', icon: MessageSquare },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.type && formData.title && formData.description) {
      onSubmit(formData)
      setFormData({ type: '', title: '', description: '' })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Enviar Feedback
        </CardTitle>
        <CardDescription>
          Tu opinión es importante para nosotros. Todos los comentarios son revisados por nuestro equipo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Tipo de Feedback
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Selecciona un tipo</option>
              {feedbackTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Título
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Resumen de tu feedback"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              placeholder="Describe tu feedback en detalle..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={!formData.type || !formData.title || !formData.description}
          >
            <Send className="h-4 w-4 mr-2" />
            Enviar Feedback
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
