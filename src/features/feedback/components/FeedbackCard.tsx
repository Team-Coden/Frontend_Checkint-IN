import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Badge } from "../../../shared/components/ui/badge"
import { Button } from "../../../shared/components/ui/button"
import {
  ThumbsUp,
  ThumbsDown,
  Send,
  Clock,
  Users,
} from "lucide-react"

interface Feedback {
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
}

interface FeedbackCardProps {
  feedback: Feedback
  categories: Array<{ value: string; label: string }>
  onVote: (id: string, voteType: 'up' | 'down') => void
  onReply: (id: string) => void
}

export function FeedbackCard({ feedback, categories, onVote, onReply }: FeedbackCardProps) {
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

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {categories.find(c => c.value === feedback.category)?.label}
              </Badge>
              <Badge className={getStatusColor(feedback.status)} variant="secondary">
                {getStatusLabel(feedback.status)}
              </Badge>
            </div>
            <CardTitle className="text-lg mb-2">{feedback.title}</CardTitle>
            <CardDescription>{feedback.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{feedback.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{feedback.date.toLocaleDateString('es-ES')}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>{feedback.replies.length} respuestas</span>
            <span>•</span>
            <span>{feedback.votes} votos</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onVote(feedback.id, 'up')}
            className="flex items-center gap-1"
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{feedback.votes}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onVote(feedback.id, 'down')}
            className="flex items-center gap-1"
          >
            <ThumbsDown className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            onClick={() => onReply(feedback.id)}
            className="flex items-center gap-1"
          >
            <Send className="h-4 w-4" />
            <span>Responder</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
