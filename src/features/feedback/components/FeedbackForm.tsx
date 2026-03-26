/**
 * FeedbackForm.tsx
 * 
 * Formulario principal para enviar feedback.
 * Este componente hace DOS cosas al enviar:
 *   1. Envía los datos a Web3Forms (para que lleguen al correo del admin)
 *   2. Llama a onSubmit() para añadir el feedback a la lista visible en la página
 * 
 * Campos del formulario:
 *   - Nombre: quién envía el feedback
 *   - Email: correo de contacto
 *   - Tipo: categoría (mejora, error, sugerencia, otro)
 *   - Título: resumen corto del feedback
 *   - Descripción: explicación detallada
 */

// Importaciones de componentes UI reutilizables (Card, Button)
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Button } from "../../../shared/components/ui/button"

// Iconos de la librería lucide-react
import {
  Send,           // Icono de enviar (avión de papel)
  MessageSquare,  // Icono de mensaje (para tipo "otro")
  AlertCircle,    // Icono de alerta (para tipo "error")
  Lightbulb,      // Icono de bombilla (para tipo "sugerencia")
  TrendingUp,     // Icono de tendencia (para tipo "mejora")
} from "lucide-react"

import { useState } from "react"

/**
 * Props que recibe este componente:
 * - onSubmit: función que se ejecuta cuando el feedback se envía exitosamente.
 *             Recibe los datos del formulario para añadirlos a la lista de feedbacks.
 */
interface FeedbackFormProps {
  onSubmit: (feedback: {
    type: string        // Tipo/categoría del feedback (mejora, error, sugerencia, otro)
    title: string       // Título corto del feedback
    description: string // Descripción detallada del feedback
    name: string        // Nombre de quien envía
    email: string       // Email de quien envía
  }) => void
}

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  // -------- ESTADOS DEL COMPONENTE --------

  // Estado que guarda los valores de todos los campos del formulario
  const [formData, setFormData] = useState({
    name: '',         // Nombre del usuario
    email: '',        // Email del usuario
    type: '',         // Tipo de feedback seleccionado
    title: '',        // Título del feedback
    description: ''   // Descripción detallada
  })

  // Controla si el formulario se está enviando (para deshabilitar el botón)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mensaje que se muestra debajo del botón (éxito o error)
  const [resultMessage, setResultMessage] = useState("")

  // -------- TIPOS DE FEEDBACK DISPONIBLES --------
  // Cada tipo tiene un valor interno, un texto visible y un icono
  const feedbackTypes = [
    { value: 'mejora', label: 'Mejora', icon: TrendingUp },
    { value: 'error', label: 'Error', icon: AlertCircle },
    { value: 'sugerencia', label: 'Sugerencia', icon: Lightbulb },
    { value: 'otro', label: 'Otro', icon: MessageSquare },
  ]

  // -------- FUNCIÓN DE ENVÍO DEL FORMULARIO --------
  /**
   * Se ejecuta cuando el usuario presiona "Enviar Feedback".
   * Pasos:
   *   1. Valida que todos los campos estén llenos
   *   2. Muestra "Enviando..." al usuario
   *   3. Crea un FormData con los datos + la clave de Web3Forms
   *   4. Envía los datos a la API de Web3Forms
   *   5. Si sale bien: muestra éxito, llama onSubmit(), limpia el formulario
   *   6. Si falla: muestra mensaje de error
   *   7. Después de 4 segundos, limpia el mensaje de resultado
   */
  const handleSubmit = async (e: React.FormEvent) => {
    // Evita que la página se recargue
    e.preventDefault()
    
    // Verifica que todos los campos estén llenos antes de enviar
    if (!formData.name || !formData.email || !formData.type || !formData.title || !formData.description) return

    // Activa el estado de "enviando" (deshabilita el botón y cambia su texto)
    setIsSubmitting(true)
    setResultMessage("Enviando...")

    // Crea un objeto FormData para enviar a Web3Forms
    const formPayload = new FormData()
    formPayload.append("access_key", "0f13fe42-1d70-48a0-8db3-920f77d5026f")  // Clave de Web3Forms
    formPayload.append("name", formData.name)         // Nombre del usuario
    formPayload.append("email", formData.email)       // Email del usuario
    formPayload.append("type", formData.type)         // Tipo de feedback
    formPayload.append("title", formData.title)       // Título del feedback
    formPayload.append("message", formData.description) // La descripción se envía como "message" a Web3Forms

    try {
      // Envía los datos a la API de Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload
      })

      // Lee la respuesta de Web3Forms
      const data = await response.json()

      if (data.success) {
        // ✅ Envío exitoso:
        setResultMessage("¡Feedback enviado exitosamente!")
        onSubmit(formData)  // Avisa al componente padre para que añada el feedback a la lista
        setFormData({ name: '', email: '', type: '', title: '', description: '' })  // Limpia el formulario
      } else {
        // ❌ Web3Forms respondió con error:
        setResultMessage("Error al enviar el feedback. Intenta nuevamente.")
      }
    } catch {
      // ❌ Error de red (sin internet, servidor caído, etc.):
      setResultMessage("Error de conexión. Verifica tu internet.")
    }

    // Desactiva el estado de "enviando"
    setIsSubmitting(false)

    // Después de 4 segundos, limpia el mensaje de resultado para que desaparezca
    setTimeout(() => {
      setResultMessage("")
    }, 4000)
  }

  // -------- FUNCIÓN PARA ACTUALIZAR CAMPOS --------
  /**
   * Actualiza un campo específico del formulario.
   * Ejemplo: handleInputChange('name', 'Juan') → actualiza formData.name = 'Juan'
   */
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // -------- INTERFAZ VISUAL (JSX) --------
  return (
    // Card = contenedor con borde y sombra (componente UI reutilizable)
    <Card>
      {/* Encabezado de la tarjeta con título y descripción */}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Enviar Feedback
        </CardTitle>
        <CardDescription>
          Tu opinión es importante para nosotros. Todos los comentarios son revisados por nuestro equipo.
        </CardDescription>
      </CardHeader>

      {/* Contenido de la tarjeta: el formulario */}
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Fila con Nombre y Email lado a lado en pantallas grandes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Campo: Nombre */}
            <div>
              <label className="block text-sm font-medium mb-2">Nombre</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Tu nombre"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Campo: Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          {/* Campo: Tipo de Feedback (dropdown/select) */}
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
              {/* Renderiza cada opción de tipo de feedback */}
              {feedbackTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Campo: Título del feedback */}
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
          
          {/* Campo: Descripción detallada */}
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
          
          {/* Botón de envío - se deshabilita si falta algún campo o si ya se está enviando */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !formData.name || !formData.email || !formData.type || !formData.title || !formData.description}
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? "Enviando..." : "Enviar Feedback"}
          </Button>

          {/* Mensaje de resultado (éxito en verde, error en rojo) */}
          {resultMessage && (
            <p className={`text-center text-sm font-medium mt-2 ${resultMessage.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
              {resultMessage}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
