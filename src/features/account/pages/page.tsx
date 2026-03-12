"use client"

import { useState } from "react"
import {
  User,
  Shield,
  Mail,
  Settings,
} from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Separator } from "@/shared/components/ui/separator"
import { Badge } from "@/shared/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import Main from "@/features/main/pages/page"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")

  const tabs = [
    { id: "profile", label: "Perfil", icon: User },
    { id: "security", label: "Seguridad", icon: Shield },
    { id: "notifications", label: "Notificaciones", icon: Mail },
    { id: "preferences", label: "Preferencias", icon: Settings },
  ]

  return (
    <Main>
      <div className="flex-1 space-y-4 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Configuración de Cuenta</h2>
            <p className="text-muted-foreground">
              Gestiona la configuración y preferencias de tu cuenta
            </p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </Button>
              );
            })}
          </div>

          <Separator />

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información del Perfil</CardTitle>
                  <CardDescription>
                    Actualiza tu información personal y datos de contacto
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" defaultValue="Juan" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input id="lastName" defaultValue="Pérez" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" defaultValue="juan.perez@ejemplo.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Número de Teléfono</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografía</Label>
                    <Input id="bio" placeholder="Cuéntanos sobre ti" />
                  </div>

                  <div className="flex gap-3">
                    <Button size="sm">Guardar Cambios</Button>
                    <Button variant="outline" size="sm">Cancelar</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estado de la Cuenta</CardTitle>
                  <CardDescription>
                    Tu información y estado actual de la cuenta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Tipo de Cuenta</Label>
                      <Badge variant="secondary">Premium</Badge>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Miembro Desde</Label>
                      <p className="text-sm">Enero 2024</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Última Actividad</Label>
                      <p className="text-sm">Hace 2 horas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cambiar Contraseña</CardTitle>
                  <CardDescription>
                    Actualiza tu contraseña para mantener tu cuenta segura
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Contraseña Actual</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">Nueva Contraseña</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button size="sm">Actualizar Contraseña</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Autenticación de Dos Factores</CardTitle>
                  <CardDescription>
                    Añade una capa extra de seguridad a tu cuenta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Activar 2FA</p>
                      <p className="text-xs text-muted-foreground">
                        Usa una aplicación autenticadora para generar códigos
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Activar</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notificaciones por Correo</CardTitle>
                  <CardDescription>
                    Elige qué notificaciones por correo quieres recibir
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Actualizaciones del Producto</p>
                        <p className="text-xs text-muted-foreground">
                          Noticias sobre características y actualizaciones del producto
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Configurar</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Alertas de Seguridad</p>
                        <p className="text-xs text-muted-foreground">
                          Notificaciones de seguridad importantes
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Configurar</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Actividad de la Cuenta</p>
                        <p className="text-xs text-muted-foreground">
                          Notificaciones sobre la actividad de tu cuenta
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Configurar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Apariencia</CardTitle>
                  <CardDescription>
                    Personaliza el aspecto y la sensación de tu cuenta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Idioma</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Español</option>
                      <option>Inglés</option>
                      <option>Francés</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Zona Horaria</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>UTC-05:00 Tiempo del Este</option>
                      <option>UTC-06:00 Tiempo Central</option>
                      <option>UTC-07:00 Tiempo de Montaña</option>
                      <option>UTC-08:00 Tiempo del Pacífico</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Formato de Fecha</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacidad</CardTitle>
                  <CardDescription>
                    Gestiona tu configuración de privacidad y preferencias de datos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Visibilidad del Perfil</p>
                      <p className="text-xs text-muted-foreground">
                        Controla quién puede ver la información de tu perfil
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Gestionar</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Exportar Datos</p>
                      <p className="text-xs text-muted-foreground">
                        Descarga tus datos personales
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Exportar</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Main>
  )
}
