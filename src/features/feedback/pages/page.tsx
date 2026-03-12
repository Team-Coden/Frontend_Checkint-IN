import { Card, CardContent } from "../../../shared/components/ui/card"
import { Badge } from "../../../shared/components/ui/badge"
import {
  MessageSquare,
  Search,
  TrendingUp,
  Clock,
  AlertCircle,
  Lightbulb,
} from "lucide-react"
import { useState } from "react"
import Main from "../../main/pages/page"
import { FeedbackCard } from "../components/FeedbackCard"
import { FeedbackForm } from "../components/FeedbackForm"
import { ReplyModal } from "../components/ReplyModal"

export default function FeedbackPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFeedback, setSelectedFeedback] = useState<{
    id: string
    title: string
    description: string
    category: string
    author: string
    date: Date
    status: string
    votes: number
    replies: Array<{
      id: string
      author: string
      message: string
      date: Date
    }>
  } | null>(null)
  const [feedbacks, setFeedbacks] = useState([
    {
      id: '1',
      title: 'Mejora en el dashboard',
      description: 'Sería útil tener más filtros en el dashboard principal para encontrar información más rápido.',
      category: 'mejora',
      author: 'Usuario Anónimo',
      date: new Date('2024-03-10'),
      status: 'en-revisión',
      votes: 15,
      replies: [
        {
          id: 'r1',
          author: 'Equipo de Soporte',
          message: 'Gracias por tu sugerencia. Estamos evaluando implementar filtros avanzados en el dashboard.',
          date: new Date('2024-03-11')
        }
      ]
    },
    {
      id: '2',
      title: 'Error al generar reportes',
      description: 'El sistema genera un error cuando intento exportar reportes en formato PDF desde la sección de pasantías.',
      category: 'error',
      author: 'Usuario Anónimo',
      date: new Date('2024-03-09'),
      status: 'resuelto',
      votes: 8,
      replies: [
        {
          id: 'r2',
          author: 'Equipo Técnico',
          message: 'Hemos solucionado el problema. Por favor intenta nuevamente.',
          date: new Date('2024-03-10')
        },
        {
          id: 'r3',
          author: 'Usuario Anónimo',
          message: '¡Funciona perfectamente ahora! Gracias por la rápida solución.',
          date: new Date('2024-03-10')
        }
      ]
    },
    {
      id: '3',
      title: 'Excelente sistema',
      description: 'La plataforma es muy intuitiva y ha mejorado mucho nuestra gestión de pasantías.',
      category: 'sugerencia',
      author: 'Usuario Anónimo',
      date: new Date('2024-03-08'),
      status: 'implementado',
      votes: 23,
      replies: [
        {
          id: 'r4',
          author: 'Equipo CHECKiNT',
          message: '¡Nos alegra saber que te gusta la plataforma! Seguimos trabajando para mejorarla.',
          date: new Date('2024-03-09')
        }
      ]
    }
  ])

  const categories = [
    { value: 'all', label: 'Todas', icon: MessageSquare },
    { value: 'mejora', label: 'Mejoras', icon: TrendingUp },
    { value: 'error', label: 'Errores', icon: AlertCircle },
    { value: 'sugerencia', label: 'Sugerencias', icon: Lightbulb },
  ]

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesCategory = selectedCategory === 'all' || feedback.category === selectedCategory
    const matchesSearch = feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleVote = (feedbackId: string, voteType: 'up' | 'down') => {
    setFeedbacks(prev => prev.map(feedback => 
      feedback.id === feedbackId 
        ? { ...feedback, votes: voteType === 'up' ? feedback.votes + 1 : feedback.votes - 1 }
        : feedback
    ))
  }

  const handleReply = (feedbackId: string) => {
    const feedback = feedbacks.find(f => f.id === feedbackId)
    if (feedback) {
      setSelectedFeedback(feedback)
    }
  }

  const handleSubmitReply = (feedbackId: string, replyMessage: string) => {
    const newReply = {
      id: Date.now().toString(),
      author: 'Usuario Anónimo',
      message: replyMessage,
      date: new Date()
    }

    setFeedbacks(prev => prev.map(feedback => 
      feedback.id === feedbackId 
        ? { ...feedback, replies: [...feedback.replies, newReply] }
        : feedback
    ))
  }

  return (
    <Main>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="border-b relative overflow-hidden bg-primary-foreground">
          <div className="container mx-auto px-6 py-16 lg:py-24 relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-6 text-sm font-medium">
                Centro de Feedback y Sugerencias
              </Badge>
              
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Comparte tu <span className="text-primary">experiencia</span>
              </h1>
              
              <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg leading-relaxed md:text-xl">
                Tu opinión nos ayuda a mejorar. Comparte tus ideas, reporta problemas o sugiere mejoras 
                para hacer CHECKiNT aún mejor.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="flex gap-2">
                {categories.map(category => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                      selectedCategory === category.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background hover:bg-muted'
                    }`}
                  >
                    <category.icon className="h-4 w-4" />
                    <span className="text-sm">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feedback List */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Feedback Reciente ({filteredFeedbacks.length})
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Última actualización: hace 2 horas</span>
              </div>
            </div>

            <div className="space-y-6">
              {filteredFeedbacks.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No se encontró feedback</h3>
                    <p className="text-muted-foreground text-center">
                      No hay feedback que coincida con tu búsqueda. Intenta con otros filtros.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredFeedbacks.map(feedback => (
                  <FeedbackCard
                    key={feedback.id}
                    feedback={feedback}
                    categories={categories}
                    onVote={handleVote}
                    onReply={handleReply}
                  />
                ))
              )}
            </div>
          </div>
        </section>

        {/* Submit Feedback */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Comparte tu <span className="text-primary">feedback</span>
                </h2>
                <p className="text-lg">
                  Ayúdanos a mejorar compartiendo tu experiencia y sugerencias
                </p>
              </div>

              <FeedbackForm 
                onSubmit={(feedback) => {
                  console.log('New feedback:', feedback)
                  const newFeedback = {
                    ...feedback,
                    id: Date.now().toString(),
                    author: 'Usuario Anónimo',
                    date: new Date(),
                    status: 'en-revisión' as const,
                    votes: 0,
                    replies: [],
                    category: feedback.type
                  }
                  setFeedbacks(prev => [...prev, newFeedback])
                }}
              />
            </div>
          </div>
        </section>
      </div>
      
      {/* Reply Modal */}
      <ReplyModal
        feedback={selectedFeedback}
        onClose={() => setSelectedFeedback(null)}
        onSubmit={handleSubmitReply}
      />
    </Main>
  )
}
