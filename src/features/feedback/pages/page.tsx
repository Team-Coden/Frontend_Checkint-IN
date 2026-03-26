/**
 * page.tsx (Feedback Page)
 * 
 * Página principal del sistema de Feedback de Plavet.
 * Esta es la página que el usuario ve cuando navega a la sección de Feedback.
 * 
 * Funcionalidades:
 *   - Muestra una lista de feedbacks enviados por los usuarios
 *   - Permite buscar feedbacks por texto
 *   - Permite filtrar feedbacks por categoría (mejora, error, sugerencia)
 *   - Permite votar (me gusta / no me gusta) en cada feedback
 *   - Permite responder a un feedback (abre un modal)
 *   - Permite eliminar un feedback
 *   - Permite enviar nuevo feedback (se envía a Web3Forms + se muestra en la lista)
 *   - Guarda todos los feedbacks en localStorage (persiste al recargar la página)
 */

// -------- IMPORTACIONES --------

// Componentes UI reutilizables (tarjetas y badges)
import { Card, CardContent } from "../../../shared/components/ui/card"
import { Badge } from "../../../shared/components/ui/badge"

// Iconos de lucide-react
import {
  MessageSquare,  // Icono de mensaje (categoría general)
  Search,         // Icono de lupa (barra de búsqueda)
  TrendingUp,     // Icono de tendencia (categoría mejora)
  Clock,          // Icono de reloj (última actualización)
  AlertCircle,    // Icono de alerta (categoría error)
  Lightbulb,      // Icono de bombilla (categoría sugerencia)
} from "lucide-react"

// Hooks de React
import { useState, useEffect } from "react"

// Layout principal que envuelve toda la página
import Main from "../../main/pages/page"

// Componentes del módulo de feedback
import { FeedbackCard } from "../components/FeedbackCard"    // Tarjeta individual de feedback
import { FeedbackForm } from "../components/FeedbackForm"    // Formulario para enviar feedback
import { ReplyModal } from "../components/ReplyModal"        // Modal para responder a un feedback

// ======================================================================
// COMPONENTE PRINCIPAL: FeedbackPage
// ======================================================================
export default function FeedbackPage() {

  // -------- ESTADOS DEL COMPONENTE --------

  // Categoría seleccionada en el filtro ('all' = todas)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Texto que el usuario escribe en la barra de búsqueda
  const [searchTerm, setSearchTerm] = useState('')

  // Feedback seleccionado para responder (null = modal cerrado)
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

  /**
   * Lista de todos los feedbacks.
   * Se inicializa leyendo desde localStorage para que los datos
   * persistan cuando el usuario recarga la página.
   * 
   * Cada feedback tiene:
   *   - id, title, description, category, author, date, status
   *   - votes: diferencia entre upvotes y downvotes
   *   - replies: lista de respuestas
   *   - userVote: voto actual del usuario ('up', 'down', o undefined)
   *   - upvotes: conteo de votos positivos
   *   - downvotes: conteo de votos negativos
   */
  const [feedbacks, setFeedbacks] = useState<Array<{
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
    userVote?: 'up' | 'down'
    upvotes?: number
    downvotes?: number
  }>>(() => {
    // Esta función se ejecuta UNA SOLA VEZ al cargar la página
    // Intenta leer los feedbacks guardados en localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('plavet_feedbacks')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          // Las fechas se guardan como texto en JSON, hay que convertirlas de nuevo a Date
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return parsed.map((f: any) => ({
            ...f,
            date: new Date(f.date),  // Convierte la fecha del feedback
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            replies: f.replies.map((r: any) => ({ ...r, date: new Date(r.date) }))  // Convierte fechas de respuestas
          }))
        } catch (e) {
          console.error('Error loading feedbacks from local storage', e)
        }
      }
    }
    // Si no hay nada guardado o hubo error, empieza con lista vacía
    return []
  })

  /**
   * Efecto que se ejecuta cada vez que cambia la lista de feedbacks.
   * Guarda automáticamente los feedbacks en localStorage para que
   * no se pierdan al recargar la página.
   */
  useEffect(() => {
    localStorage.setItem('plavet_feedbacks', JSON.stringify(feedbacks))
  }, [feedbacks])

  // -------- CATEGORÍAS DISPONIBLES --------
  // Cada categoría tiene un valor interno, un texto visible y un icono
  const categories = [
    { value: 'all', label: 'Todas', icon: MessageSquare },
    { value: 'mejora', label: 'Mejoras', icon: TrendingUp },
    { value: 'error', label: 'Errores', icon: AlertCircle },
    { value: 'sugerencia', label: 'Sugerencias', icon: Lightbulb },
  ]

  // -------- FILTRADO DE FEEDBACKS --------
  /**
   * Filtra los feedbacks según:
   *   1. La categoría seleccionada (si es 'all', muestra todos)
   *   2. El texto de búsqueda (busca en título y descripción)
   */
  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesCategory = selectedCategory === 'all' || feedback.category === selectedCategory
    const matchesSearch = feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // ======================================================================
  // FUNCIONES DE ACCIÓN (handlers)
  // ======================================================================

  /**
   * handleVote - Maneja los votos de Me Gusta / No Me Gusta
   * 
   * Lógica de votación (un solo voto por usuario):
   *   - Si el usuario da click al MISMO botón que ya votó → quita su voto (toggle)
   *   - Si el usuario da click a un botón DIFERENTE → cambia su voto
   *   - Si el usuario no había votado → registra un nuevo voto
   * 
   * @param feedbackId - ID del feedback que se está votando
   * @param voteType - Tipo de voto: 'up' (me gusta) o 'down' (no me gusta)
   */
  const handleVote = (feedbackId: string, voteType: 'up' | 'down') => {
    setFeedbacks(prev => prev.map(feedback => {
      // Solo modifica el feedback que coincide con el ID
      if (feedback.id !== feedbackId) return feedback;
      
      // Obtiene los contadores actuales de votos
      let newUpvotes = feedback.upvotes !== undefined ? feedback.upvotes : feedback.votes;
      let newDownvotes = feedback.downvotes || 0;
      let newUserVote: 'up' | 'down' | undefined = voteType;

      if (feedback.userVote === voteType) {
        // CASO 1: El usuario hizo click en el MISMO botón que ya tenía
        // → Quita su voto (toggle off)
        if (voteType === 'up') newUpvotes--;
        if (voteType === 'down') newDownvotes--;
        newUserVote = undefined;  // Ya no tiene voto
      } else {
        // CASO 2: El usuario votó algo diferente o es su primer voto
        if (voteType === 'up') {
          newUpvotes++;  // Suma un me gusta
          if (feedback.userVote === 'down') newDownvotes--;  // Si antes tenía dislike, lo quita
        } else {
          newDownvotes++;  // Suma un no me gusta
          if (feedback.userVote === 'up') newUpvotes--;  // Si antes tenía like, lo quita
        }
      }

      // Devuelve el feedback actualizado con los nuevos contadores
      return {
        ...feedback,
        upvotes: newUpvotes,
        downvotes: newDownvotes,
        votes: newUpvotes - newDownvotes,  // Votos totales = likes - dislikes
        userVote: newUserVote              // Guarda qué botón tiene activo el usuario
      }
    }))
  }

  /**
   * handleReply - Abre el modal de respuesta para un feedback específico
   * Busca el feedback en la lista y lo pone en selectedFeedback (que abre el modal)
   */
  const handleReply = (feedbackId: string) => {
    const feedback = feedbacks.find(f => f.id === feedbackId)
    if (feedback) {
      setSelectedFeedback(feedback)
    }
  }

  /**
   * handleDelete - Elimina un feedback de la lista
   * Lo filtra de la lista y automáticamente se borra del localStorage
   * (gracias al useEffect que guarda cada vez que cambia la lista)
   */
  const handleDelete = (feedbackId: string) => {
    setFeedbacks(prev => prev.filter(f => f.id !== feedbackId))
  }

  /**
   * handleSubmitReply - Agrega una nueva respuesta a un feedback
   * Crea un objeto de respuesta con ID único, autor anónimo y fecha actual,
   * y lo añade al array de replies del feedback correspondiente
   */
  const handleSubmitReply = (feedbackId: string, replyMessage: string) => {
    const newReply = {
      id: Date.now().toString(),     // ID único basado en la fecha actual
      author: 'Usuario Anónimo',     // Por ahora todas las respuestas son anónimas
      message: replyMessage,         // El texto de la respuesta
      date: new Date()               // Fecha y hora actual
    }

    // Añade la respuesta al feedback correspondiente
    setFeedbacks(prev => prev.map(feedback => 
      feedback.id === feedbackId 
        ? { ...feedback, replies: [...feedback.replies, newReply] }  // Agrega la respuesta al final
        : feedback  // Los demás feedbacks no se modifican
    ))
  }

  // ======================================================================
  // INTERFAZ VISUAL (JSX)
  // ======================================================================
  return (
    <Main>
      <div className="min-h-screen bg-background">

        {/* ======== SECCIÓN HERO (banner de bienvenida) ======== */}
        <section className="border-b relative overflow-hidden bg-primary-foreground">
          <div className="container mx-auto px-6 py-16 lg:py-24 relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              {/* Badge decorativo */}
              <Badge variant="secondary" className="mb-6 text-sm font-medium">
                Centro de Feedback y Sugerencias
              </Badge>
              
              {/* Título principal de la página */}
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Comparte tu <span className="text-primary">experiencia</span>
              </h1>
              
              {/* Descripción debajo del título */}
              <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg leading-relaxed md:text-xl">
                Tu opinión nos ayuda a mejorar. Comparte tus ideas, reporta problemas o sugiere mejoras 
                para hacer Plavet aún mejor.
              </p>
            </div>
          </div>
        </section>

        {/* ======== SECCIÓN DE BÚSQUEDA Y FILTROS ======== */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              
              {/* Barra de búsqueda con icono de lupa */}
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
              
              {/* Botones de filtro por categoría */}
              <div className="flex gap-2">
                {categories.map(category => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    // Cambia el estilo si está seleccionado (fondo primario) o no (borde)
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                      selectedCategory === category.value
                        ? 'bg-primary text-primary-foreground'       // Seleccionado: fondo con color primario
                        : 'bg-background hover:bg-muted'             // No seleccionado: fondo neutro
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

        {/* ======== SECCIÓN: LISTA DE FEEDBACKS ======== */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            {/* Encabezado con contador y última actualización */}
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Feedback Reciente ({filteredFeedbacks.length})
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Última actualización: hace 2 horas</span>
              </div>
            </div>

            {/* Lista de tarjetas de feedback */}
            <div className="space-y-6">
              {filteredFeedbacks.length === 0 ? (
                // Si no hay feedbacks, muestra un mensaje indicando que la lista está vacía
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
                // Si hay feedbacks, renderiza una FeedbackCard por cada uno
                filteredFeedbacks.map(feedback => (
                  <FeedbackCard
                    key={feedback.id}        // Clave única para React
                    feedback={feedback}      // Datos del feedback
                    categories={categories}  // Lista de categorías (para mostrar el nombre)
                    onVote={handleVote}       // Función para votar
                    onReply={handleReply}     // Función para abrir modal de respuesta
                    onDelete={handleDelete}   // Función para eliminar
                  />
                ))
              )}
            </div>
          </div>
        </section>

        {/* ======== SECCIÓN: FORMULARIO PARA ENVIAR NUEVO FEEDBACK ======== */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-2xl">
              {/* Título de la sección */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Comparte tu <span className="text-primary">feedback</span>
                </h2>
                <p className="text-lg">
                  Ayúdanos a mejorar compartiendo tu experiencia y sugerencias
                </p>
              </div>

              {/* Componente FeedbackForm
                  Cuando el usuario envía un feedback:
                  1. FeedbackForm lo envía a Web3Forms (para que llegue al correo)
                  2. FeedbackForm llama a esta función onSubmit
                  3. Aquí creamos el objeto completo del feedback y lo añadimos a la lista */}
              <FeedbackForm 
                onSubmit={(feedback) => {
                  console.log('New feedback:', feedback)

                  // Crea el objeto completo del feedback con todos los campos necesarios
                  const newFeedback = {
                    ...feedback,                                    // Datos del formulario (name, email, type, title, description)
                    id: Date.now().toString(),                      // ID único basado en la fecha actual
                    author: feedback.name || 'Usuario Anónimo',     // Usa el nombre del formulario, o "Anónimo" si está vacío
                    date: new Date(),                               // Fecha y hora actual
                    status: 'en-revisión' as const,                 // Estado inicial: en revisión
                    votes: 1,                                       // Empieza con 1 voto (el del autor)
                    upvotes: 1,                                     // 1 like inicial (del autor)
                    downvotes: 0,                                   // 0 dislikes iniciales
                    replies: [],                                    // Sin respuestas al inicio
                    category: feedback.type                         // La categoría viene del campo "type" del formulario
                  }

                  // Añade el nuevo feedback AL INICIO de la lista para que aparezca primero
                  setFeedbacks(prev => [newFeedback, ...prev])
                }}
              />
            </div>
          </div>
        </section>
      </div>
      
      {/* ======== MODAL DE RESPUESTA ========
          Se muestra solo cuando selectedFeedback no es null.
          Se cierra cuando el usuario presiona "Cancelar" o envía una respuesta. */}
      <ReplyModal
        feedback={selectedFeedback}                      // El feedback al que se responde (null = cerrado)
        onClose={() => setSelectedFeedback(null)}        // Cierra el modal poniendo selectedFeedback en null
        onSubmit={handleSubmitReply}                     // Función que guarda la respuesta
      />
    </Main>
  )
}
