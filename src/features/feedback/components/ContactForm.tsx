/**
 * ContactForm.tsx
 * 
 * Formulario de contacto básico que envía datos a Web3Forms.
 * Este es el componente más simple de contacto, sin estilos avanzados.
 * Se usa como referencia o componente alternativo al FeedbackForm.
 */

import React, { useState } from 'react';

export default function ContactForm() {
  // Estado para mostrar mensajes al usuario ("Sending...", "Form Submitted Successfully", "Error")
  const [result, setResult] = useState("");

  /**
   * Función que se ejecuta cuando el usuario presiona "Submit Form".
   * 1. Previene que la página se recargue (comportamiento normal de un formulario HTML)
   * 2. Muestra "Sending...." mientras se envía
   * 3. Recoge los datos del formulario (nombre, email, mensaje)
   * 4. Añade la clave secreta de Web3Forms para autenticación
   * 5. Envía todo a la API de Web3Forms
   * 6. Muestra un mensaje de éxito o error según la respuesta
   */
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Evita que el navegador recargue la página al enviar el formulario
    event.preventDefault();

    // Muestra al usuario que el formulario se está enviando
    setResult("Sending....");

    // Recoge todos los campos del formulario automáticamente
    const formData = new FormData(event.currentTarget);

    // Añade la clave de acceso de Web3Forms (identifica tu cuenta)
    formData.append("access_key", "0f13fe42-1d70-48a0-8db3-920f77d5026f");

    // Envía los datos a la API de Web3Forms usando fetch
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",   // Método POST para enviar datos
      body: formData     // Los datos del formulario como cuerpo de la petición
    });

    // Convierte la respuesta del servidor a formato JSON para leerla
    const data = await response.json();

    // Si Web3Forms confirma que recibió los datos correctamente
    if (data.success) {
      setResult("Form Submitted Successfully");  // Muestra mensaje de éxito
      event.currentTarget.reset();                 // Limpia todos los campos del formulario
    } else {
      setResult("Error");  // Muestra mensaje de error si algo falló
    }
  };

  return (
    // Formulario HTML simple con los campos básicos
    <form onSubmit={onSubmit}>
      {/* Campo para el nombre del usuario */}
      <input type="text" name="name" required/>

      {/* Campo para el email del usuario */}
      <input type="email" name="email" required/>

      {/* Campo para el mensaje / feedback del usuario */}
      <textarea name="message" required></textarea>

      {/* Botón para enviar el formulario */}
      <button type="submit">Submit Form</button>

      {/* Muestra el estado del envío (Sending... / Success / Error) */}
      <span>{result}</span>
    </form>
  );
}
